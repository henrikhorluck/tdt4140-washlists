from oauth2_provider.contrib.rest_framework import permissions
from rest_framework import viewsets

from washlist.models.Templates import TemplateListItem, TemplateWashList
from washlist.models.WashLists import ListItem
from washlist.serializer import (
    ListItemSerializer,
    TemplateListItemSerializer,
    TemplateWashListSerializer,
)


class ListItemViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrTokenHasScope]
    queryset = ListItem.objects.all()
    serializer_class = ListItemSerializer
    required_scopes = ["read", "write"]


class TemplateWashListViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrTokenHasScope]
    queryset = TemplateWashList.objects.all()
    serializer_class = TemplateWashListSerializer
    required_scopes = ["read", "write"]


class TemplateListItemViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrTokenHasScope]
    queryset = TemplateListItem.objects.all()
    serializer_class = TemplateListItemSerializer
    required_scopes = ["read", "write"]
