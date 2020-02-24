from rest_framework import serializers

from .models import StudentVillage


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentVillage
        fields = ("name",)
