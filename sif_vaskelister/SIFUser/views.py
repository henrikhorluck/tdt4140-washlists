from django.contrib.auth.decorators import permission_required
from django.contrib.auth.models import Group

from oauth2_provider.contrib.rest_framework import permissions
from rest_framework import response, viewsets
from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateAPIView,
)

from .models import User
from .serializer import GroupSerializer, UserSerializer


class UserViewSet(RetrieveUpdateAPIView, ListCreateAPIView, viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticatedOrTokenHasScope]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    required_scopes = ["read", "write"]

    @permission_required("SIFUser.change_user")
    def put(self, request, *args, **kwargs):
        super().put(self, request, *args, **kwargs)

    @permission_required("SIFUser.add_user")
    def create_user(self, request, *args, **kwargs):
        super().post(self, request, *args, **kwargs)


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
