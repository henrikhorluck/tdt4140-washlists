from django.contrib import admin
from django.contrib.auth.models import Group
from django.urls import include, path

from oauth2_provider.contrib.rest_framework import TokenHasScope
from rest_framework import generics, permissions, serializers


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ("name",)


class GroupList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasScope]
    required_scopes = ["groups"]
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


# Setup the URLs and include login URLs for the browsable API.
urlpatterns = [
    path("admin/", admin.site.urls),
    path("o/", include("oauth2_provider.urls", namespace="oauth2_provider")),
    path("groups/", GroupList.as_view()),
    path("", include("SIFUser.urls")),
]
