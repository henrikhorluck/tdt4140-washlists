from django.test import TestCase
from django.urls import reverse

from Dormroom.models import Dormroom
from SIFUser.mixins import AuthTestMixin
from StudentVillage.models import StudentVillage
from washlist.jobs import reset_washlists
from washlist.models.Templates import TemplateListItem, TemplateWashList
from washlist.models.WashLists import ListItem
from washlist.serializer import TemplateWashListSerializer


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
        Create a washlist item that is completed
        the method also sets up a village and a room to relate the washlist item to
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
        Test that job to reset washlist items when run manually actually rests the databases
        washlist items
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

    def test_get_template(self):
        url = reverse("templatewashlist-list")
        response = self.client.get(url, HTTP_AUTHORIZATION=self.auth)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data[0],
            TemplateWashListSerializer(
                TemplateWashList.objects.get(title="Moholt")
            ).data,
        )
