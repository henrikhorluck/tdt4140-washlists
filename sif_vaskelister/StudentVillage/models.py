from django.db import models
from django.utils.translation import gettext_lazy as _


class StudentVillage(models.Model):
    name = models.CharField(max_length=80, default="", help_text="Navn på studentby")

    class Meta:
        verbose_name = _("Studenby")
        verbose_name_plural = _("Studentbyer")
