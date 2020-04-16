from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _

from .models import User


class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + ((_("Kollektiv"), {"fields": ("dormroom",)}),)


admin.site.register(User, UserAdmin)
