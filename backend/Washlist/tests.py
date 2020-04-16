from django.test import TestCase
from django.urls import reverse

from rest_framework import status

from Dormroom.models import Dormroom
from SIFUser.mixins import AuthTestMixin
from StudentVillage.models import StudentVillage
from Washlist.jobs import reset_washlists
from Washlist.models.Templates import TemplateListItem, TemplateWashList
from Washlist.models.WashLists import ListItem
from Washlist.serializer import TemplateWashListSerializer


class WashListTemplateTest(TestCase):
    room = None

    def setUp(self):
        village = StudentVillage.objects.create(name="Moholt")
        self.room = Dormroom.objects.create(number=1, village=village)

        temp_list = TemplateWashList.objects.create(title="Moholt")
        village.templateWashList = temp_list
        village.save()

    def test_add_to_template_adds_to_each_list(self):
        desc = "Vask badet"
        temp_list = TemplateWashList.objects.get(title="Moholt")

        TemplateListItem.objects.create(description=desc, washlist=temp_list).save()
        self.assertEqual(desc, ListItem.objects.get(dormroom=self.room).description)


class WeeklyResetOfWashlistsTest(TestCase):
    def setUp(self):
        """
        Create a Washlist item that is completed
        the method also sets up a village and a room to relate the Washlist item to
        satisfy the db constraints
        """

        village = StudentVillage.objects.create(name="Moholt")
        self.room = Dormroom.objects.create(number=1, village=village)

        temp_list = TemplateWashList.objects.create(title="Moholt")
        village.templateWashList = temp_list
        village.save()

        self.item = ListItem.objects.create(
            pk=1, dormroom=self.room, desc="Vask badet", completed=True
        )
        self.item.save()

    def test_job_resets_items(self):
        """
        Test that job to reset Washlist items when run manually actually rests the databases
        Washlist items
        """
        reset_washlists()
        self.assertEqual(False, ListItem.objects.get(pk=1).completed)


class WashlistTemplateAPITest(AuthTestMixin):
    def setUp(self):
        super().setUp()
        self.temp_list = TemplateWashList.objects.create(title="Moholt")
        village = StudentVillage.objects.create(
            name="Moholt", templateWashList=self.temp_list
        )
        self.room = Dormroom.objects.create(number=1, village=village)
        self.item = ListItem.objects.create(
            pk=1, dormroom=self.room, desc="Vask badet", completed=True
        )

    def test_get_template_list(self):
        url = reverse("templatewashlist-list")
        response = self.client.get(url, HTTP_AUTHORIZATION=self.auth)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data[0],
            TemplateWashListSerializer(
                TemplateWashList.objects.get(title="Moholt")
            ).data,
        )

    def test_get_detail_template_list(self):
        url = reverse("templatewashlist-detail", args=[1])
        response = self.client.get(url, HTTP_AUTHORIZATION=self.auth)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data,
            TemplateWashListSerializer(
                TemplateWashList.objects.get(title="Moholt")
            ).data,
        )

    def test_add_template_washlist(self):
        url = reverse("templatewashlist-list")
        response = self.client.post(
            url, {"title": "Tyholt", "village": 1}, HTTP_AUTHORIZATION=self.auth
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            response.data,
            TemplateWashListSerializer(
                TemplateWashList.objects.get(title="Tyholt")
            ).data,
        )

    def test_partial_update(self):
        url = reverse("templatewashlist-detail", args=[1])
        response = self.client.patch(
            url, {"title": "Berg"}, HTTP_AUTHORIZATION=self.auth
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data,
            TemplateWashListSerializer(TemplateWashList.objects.get(title="Berg")).data,
        )

    def test_destroy(self):
        url = reverse("templatewashlist-detail", args=[1])
        response = self.client.delete(url, HTTP_AUTHORIZATION=self.auth)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(TemplateWashList.objects.count(), 0)
