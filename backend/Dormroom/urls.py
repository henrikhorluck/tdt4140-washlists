from rest_framework import routers

from .views import DormroomViewSet

router = routers.SimpleRouter()

router.register("dormroom", DormroomViewSet)

urlpatterns = router.urls
