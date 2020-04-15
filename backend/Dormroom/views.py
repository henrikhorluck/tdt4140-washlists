from oauth2_provider.contrib.rest_framework import permissions
from rest_framework import viewsets

from .models import Dormroom
from .serializer import DormroomSerializer


class DormroomViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrTokenHasScope]
    required_scopes = ["read", "write"]
    queryset = Dormroom.objects.all()
    serializer_class = DormroomSerializer
