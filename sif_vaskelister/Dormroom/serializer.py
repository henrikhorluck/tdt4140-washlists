from rest_framework import serializers

from .models import Dormroom


class DormroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dormroom
        fields = ("id", "number", "village", "residents")
