from django.db import models

from StudentVillage.models import StudentVillage


class Dorm(models.Model):
    number = models.SmallIntegerField(help_text="Kollektivnummer i studentby")
    village = models.ForeignKey(StudentVillage, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("number", "village")
