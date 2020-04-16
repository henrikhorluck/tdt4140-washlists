from django.contrib import admin

from .models.Templates import TemplateListItem, TemplateWashList
from .models.WashLists import ListItem

# Register your models here.

admin.site.register(ListItem)
admin.site.register(TemplateListItem)
admin.site.register(TemplateWashList)
