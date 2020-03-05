from rest_framework import routers

from .views import (
    ListItemViewSet,
    TemplateListItemViewSet,
    TemplateWashListViewSet,
    WashListViewSet,
)

router = routers.SimpleRouter()

router.register("washlist", WashListViewSet)
router.register("washlistitem", ListItemViewSet)
router.register("template_washlist", TemplateWashListViewSet)
router.register("template_washlistitem", TemplateListItemViewSet)


urlpatterns = router.urls
