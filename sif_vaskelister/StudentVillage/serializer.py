from rest_framework import serializers

from .models import StudentVillage


class StudentVillageSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentVillage
        fields = "__all__"
