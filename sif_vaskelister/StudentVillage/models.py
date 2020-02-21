from django.db import models
from django.utils.translation import gettext_lazy as _


class StudentVillage(models.Model):
    class Meta:
        verbose_name = _("Studenby")
        verbose_name_plural = _("Studentbyer")
