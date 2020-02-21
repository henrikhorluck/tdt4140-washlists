from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from Dormroom.models import Dormroom


class User(AbstractUser):
    dorm = models.ForeignKey(
        Dormroom,
        help_text="Kollektivet personen bor i",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )

    class Meta:
        verbose_name = _("Bruker")
        verbose_name_plural = _("Brukere")
