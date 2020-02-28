from django.contrib.auth.decorators import permission_required

from oauth2_provider.contrib.rest_framework import permissions
from rest_framework import viewsets
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView

from .models import StudentVillage
from .serializer import StudentVillageSerializer


class StudentVillageViewSet(RetrieveUpdateAPIView, ListCreateAPIView, viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticatedOrTokenHasScope]
    queryset = StudentVillage.objects.all()
    serializer_class = StudentVillageSerializer
    required_scopes = ["read", "write"]

    @permission_required("StudentVillage.change_studentvillage")
    def put(self, request, *args, **kwargs):
        super().put(self, request, *args, **kwargs)

    @permission_required("Studentvillage.add_studentvillage")
    def create_studentvillage(self, request, *args, **kwargs):
        super().post(self, request, *args, **kwargs)
