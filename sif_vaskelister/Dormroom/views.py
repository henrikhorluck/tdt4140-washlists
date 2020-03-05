from django.contrib.auth.decorators import permission_required

from oauth2_provider.contrib.rest_framework import permissions
from rest_framework import viewsets
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView

from .models import Dormroom
from .serializer import DormroomSerializer


class DormroomViewSet(RetrieveUpdateAPIView, ListCreateAPIView, viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticatedOrTokenHasScope]
    required_scopes = ["read", "write"]
    queryset = Dormroom.objects.all()
    serializer_class = DormroomSerializer
    required_scopes = ["read", "write"]

    @permission_required("Dormroom.change_dormroom")
    def put(self, request, *args, **kwargs):
        super().put(self, request, *args, **kwargs)

    @permission_required("Dormroom.add_dormroom")
    def create_dormroom(self, request, *args, **kwargs):
        super().post(self, request, *args, **kwargs)
