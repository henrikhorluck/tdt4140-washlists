from django.contrib import admin

from .models import ListItem, WashList

# Register your models here.

admin.site.register(WashList)
admin.site.register(ListItem)
