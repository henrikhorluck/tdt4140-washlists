from django.contrib import admin
from django.urls import include, path

from rest_framework.routers import DefaultRouter

from Dormroom.urls import router as DormroomRouter
from SIFUser.urls import router as UserRouter
from StudentVillage.urls import router as VillageRouter

APIrouter = DefaultRouter()
APIrouter.registry.extend(UserRouter.registry)
APIrouter.registry.extend(DormroomRouter.registry)
APIrouter.registry.extend(VillageRouter.registry)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("o/", include("oauth2_provider.urls", namespace="oauth2_provider")),
    path("api/", include(APIrouter.urls)),
]
