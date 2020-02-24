from rest_framework import routers

from .views import StudentVillageViewSet

router = routers.SimpleRouter()

router.register("villages", StudentVillageViewSet)


urlpatterns = router.urls
