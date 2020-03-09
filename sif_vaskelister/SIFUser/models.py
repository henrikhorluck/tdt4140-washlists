from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from Dormroom.models import Dormroom


class User(AbstractUser):
    dormroom = models.ForeignKey(
        Dormroom,
        help_text="Kollektivet personen bor i",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="residents",
    )

    @property
    def is_manager(self):
        return self.groups.filter(name="Manager").exists() or self.is_superuser

    @property
    def is_student(self):
        return self.groups.filter(name="Student").exists() or self.is_superuser

    class Meta:
        verbose_name = _("Bruker")
        verbose_name_plural = _("Brukere")
