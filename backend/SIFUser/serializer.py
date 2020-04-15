from django.contrib.auth.models import Group

from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "dormroom",
            "groups",
            "manager_villages",
            "is_manager",
            "is_student",
            "is_superuser",
        )


class GroupSerializer(serializers.ModelSerializer):
    user_set = UserSerializer(many=True)

    class Meta:
        model = Group
        fields = ("id", "name", "user_set", "permissions")
