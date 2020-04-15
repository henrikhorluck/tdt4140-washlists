from rest_framework import serializers

from SIFUser.serializer import UserSerializer

from .models import StudentVillage


class StudentVillageSerializer(serializers.ModelSerializer):
    managers = UserSerializer(many=True)
    dormrooms = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = StudentVillage
        fields = "__all__"
