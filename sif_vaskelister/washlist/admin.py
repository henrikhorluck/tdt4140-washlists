from django.contrib import admin

from washlist.models.Templates import TemplateListItem, TemplateWashList
from washlist.models.WashLists import ListItem, WashList

# Register your models here.

admin.site.register(WashList)
admin.site.register(ListItem)
admin.site.register(TemplateListItem)
admin.site.register(TemplateWashList)
