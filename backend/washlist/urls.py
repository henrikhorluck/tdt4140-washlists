from rest_framework import routers

from .views import ListItemViewSet, TemplateListItemViewSet, TemplateWashListViewSet

router = routers.SimpleRouter()

router.register("washlistitem", ListItemViewSet)
router.register("template_washlist", TemplateWashListViewSet)
router.register("template_washlistitem", TemplateListItemViewSet)


urlpatterns = router.urls
