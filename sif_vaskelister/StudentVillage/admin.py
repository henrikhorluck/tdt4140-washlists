from django.contrib import admin
from django.utils.translation import gettext as _

from .models import StudentVillage


class StudentVillageAdmin(admin.ModelAdmin):
    filter_horizontal = ("managers",)
    fieldsets = (
        (_("Navn"), {"fields": ("name",)}),
        (_("Managere"), {"fields": ("managers",)}),
        (_("Vaskeliste mal"), {"fields": ("templateWashList",)}),
    )


admin.site.register(StudentVillage, StudentVillageAdmin)
