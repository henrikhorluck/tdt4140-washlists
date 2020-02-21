from django.db import models
from django.utils.translation import gettext_lazy as _

from StudentVillage.models import StudentVillage


class Dormroom(models.Model):
    number = models.SmallIntegerField(help_text=_("Kollektivnummer i studentby"))
    village = models.ForeignKey(StudentVillage, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.village}: Nr: {self.number}"

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["number", "village"], name="unique_dorm")
        ]
        verbose_name = _("Kollektiv")
        verbose_name_plural = _("Kollektiver")
