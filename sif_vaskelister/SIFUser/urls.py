from django.urls import path

from rest_framework.urlpatterns import format_suffix_patterns

from .views import UserDetails, UserList

urlpatterns = [
    path("users/", UserList.as_view()),
    path("users/<int:pk>/", UserDetails.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
