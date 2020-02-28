from django.db import models
from django.utils.translation import gettext_lazy as _

from washlist.models.Templates import TemplateWashList


class StudentVillage(models.Model):
    name = models.CharField(max_length=80, default="", help_text="Navn på studentby")
    templateWashList = models.ForeignKey(
        TemplateWashList, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = _("Studentby")
        verbose_name_plural = _("Studentbyer")
