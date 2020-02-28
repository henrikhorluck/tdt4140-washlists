from django.db import models
from django.utils.translation import gettext_lazy as _


class TemplateWashList(models.Model):
    title = models.CharField(max_length=250, default="")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _("Mal for vaskeliste")


class TemplateListItem(models.Model):
    washlist = models.ForeignKey(TemplateWashList, on_delete=models.CASCADE)
    description = models.CharField(
        max_length=150, default="", help_text="Hva skal vaskes?"
    )

    def __str__(self):
        return self.description
