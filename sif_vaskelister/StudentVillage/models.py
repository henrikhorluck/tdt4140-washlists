from django.db import models
from django.utils.translation import gettext_lazy as _


class StudentVillage(models.Model):
    name = models.CharField(max_length=75)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = _("Studenby")
        verbose_name_plural = _("Studentbyer")
