from rest_framework import serializers

from SIFUser.serializer import UserSerializer
from StudentVillage.serializer import StudentVillageSerializer
from washlist.serializer import ListItemSerializer

from .models import Dormroom


class DormroomSerializer(serializers.ModelSerializer):
    village = StudentVillageSerializer()
    residents = UserSerializer(many=True)
    items = ListItemSerializer(many=True)

    class Meta:
        model = Dormroom
        fields = ("id", "number", "residents", "village", "items")
        depth = 2
