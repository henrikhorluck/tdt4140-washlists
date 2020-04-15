from rest_framework import routers

from .views import GroupViewSet, ProfileViewSet, UserViewSet

router = routers.SimpleRouter()

router.register("users", UserViewSet, basename="user")
router.register("groups", GroupViewSet)
router.register("profile", ProfileViewSet, basename="profile")


urlpatterns = router.urls
