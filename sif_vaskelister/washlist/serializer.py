from rest_framework import serializers

from washlist.models.Templates import TemplateListItem, TemplateWashList
from washlist.models.WashLists import ListItem, WashList


class WashListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WashList
        fields = ("id", "title", "dormroom", "items")
        depth = 2


class ListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListItem
        fields = "__all__"


class TemplateListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemplateListItem
        fields = "__all__"


class TemplateWashListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemplateWashList
        fields = "__all__"
