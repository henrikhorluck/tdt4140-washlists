from django.contrib.auth.decorators import permission_required
from django.contrib.auth.models import Group

from oauth2_provider.contrib.rest_framework import permissions
from rest_framework import response, viewsets
from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateAPIView,
)
from rest_framework.permissions import DjangoModelPermissions

from .models import User
from .serializer import GroupSerializer, UserSerializer


class UserViewSet(RetrieveUpdateAPIView, ListCreateAPIView, viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrTokenHasScope,
        DjangoModelPermissions,
    ]
    required_scopes = ["read", "write"]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(ListAPIView, viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticatedOrTokenHasScope]
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    required_scopes = ["read", "write"]


class ProfileViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticatedOrTokenHasScope]
    required_scopes = ["read"]

    def list(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return response.Response(serializer.data)
