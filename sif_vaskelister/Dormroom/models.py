from django.db import models
from django.utils.translation import gettext_lazy as _

from StudentVillage.models import StudentVillage


class Dormroom(models.Model):
    number = models.SmallIntegerField(help_text=_("Kollektivnummer i studentby"))
    village = models.ForeignKey(StudentVillage, on_delete=models.CASCADE)

    def __unicode__(self):
        return f"Kollektiv {self.number}, {self.village}"

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["number", "village"], name="unique_dorm")
        ]
        verbose_name = _("Kollektiv")
        verbose_name_plural = _("Kollektiver")
