from rest_framework import serializers

from Dormroom.models import Dormroom
from StudentVillage.serializer import StudentVillageSerializer
from Washlist.models.Templates import TemplateListItem, TemplateWashList
from Washlist.models.WashLists import ListItem


class ListItemSerializer(serializers.ModelSerializer):
    dormroom_id = serializers.PrimaryKeyRelatedField(
        queryset=Dormroom.objects.all(), source="dormroom"
    )
    description = serializers.CharField(max_length=150, help_text="Hva skal vaskes?")

    def create(self, validated_data):
        if "description" in validated_data:
            validated_data["desc"] = validated_data["description"]
            del validated_data["description"]
        return ListItem.objects.create(**validated_data)

    class Meta:
        model = ListItem
        fields = ["id", "description", "completed", "dormroom_id", "template"]


class TemplateListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemplateListItem
        fields = "__all__"


class TemplateWashListSerializer(serializers.ModelSerializer):
    villages = StudentVillageSerializer(many=True, required=False)
    template_items = TemplateListItemSerializer(many=True, required=False)

    class Meta:
        model = TemplateWashList
        fields = ("id", "title", "villages", "template_items")
