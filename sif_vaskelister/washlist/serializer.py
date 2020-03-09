from rest_framework import serializers

from StudentVillage.serializer import StudentVillageSerializer
from washlist.models.Templates import TemplateListItem, TemplateWashList
from washlist.models.WashLists import ListItem


class ListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListItem
        fields = "__all__"


class TemplateListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemplateListItem
        fields = "__all__"


class TemplateWashListSerializer(serializers.ModelSerializer):
    villages = StudentVillageSerializer(many=True)
    template_items = TemplateListItemSerializer(many=True)

    class Meta:
        model = TemplateWashList
        fields = ("id", "title", "villages", "template_items")
