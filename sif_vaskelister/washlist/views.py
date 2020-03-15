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
    """
    The view for viewing the template washlists. The TemplateWashList is connected to up to several
    [Dormrooms](/api/dormroom/). You can add TemplateListItems to each of the list by sending a `POST` to
    [TemplateListItem](/api/template_washlistitem/).
    When doing so, the backend will add a `ListItem` to each of the conencted Dormrooms, with the same text,
    as the [TemplateListItem](/api/template_washlistitem/).
    """

    permission_classes = [permissions.IsAuthenticatedOrTokenHasScope]
    queryset = TemplateWashList.objects.all()
    serializer_class = TemplateWashListSerializer
    required_scopes = ["read", "write"]


class TemplateListItemViewSet(viewsets.ModelViewSet):
    """
    `TemplateListItem` is connected to a [TemplateWashList](/api/template_washlist/). When adding an object to this
    endpoint, you also add a [ListItem](/api/washlistitem/) to each of the [Dormrooms](/api/dormroom/) that
    [TemplateWashList](/api/template_washlist/) is connected to.
    """

    permission_classes = [permissions.IsAuthenticatedOrTokenHasScope]
    queryset = TemplateListItem.objects.all()
    serializer_class = TemplateListItemSerializer
    required_scopes = ["read", "write"]
