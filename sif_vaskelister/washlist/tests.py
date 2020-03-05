from django.test import TestCase

from Dormroom.models import Dormroom
from StudentVillage.models import StudentVillage
from washlist.models.Templates import TemplateListItem, TemplateWashList
from washlist.models.WashLists import ListItem, WashList


class WashListTemplateTest(TestCase):
    list = None

    def setUp(self):
        village = StudentVillage.objects.create(name="Moholt")
        room = Dormroom.objects.create(number=1, village=village)
        self.list = WashList.objects.create(dormroom=room)
        temp_list = TemplateWashList.objects.create(title="Moholt")
        village.templateWashList = temp_list
        village.save()

    def test_add_to_template_adds_to_each_list(self):
        desc = "Vask badet"
        temp_list = TemplateWashList.objects.get(title="Moholt")

        TemplateListItem.objects.create(description=desc, washlist=temp_list).save()
        self.assertEqual(desc, ListItem.objects.get(washlist=self.list).description)
