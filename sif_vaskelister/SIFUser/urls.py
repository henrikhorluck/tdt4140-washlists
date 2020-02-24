from rest_framework import routers

from .views import GroupViewSet, UserViewSet

router = routers.DefaultRouter()

router.register("users", UserViewSet)
router.register("groups", GroupViewSet)


urlpatterns = router.urls
