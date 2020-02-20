from django.contrib.auth.models import AbstractUser
from django.db import models

from Dorm.models import Dorm


class User(AbstractUser):
    dorm = models.ForeignKey(
        Dorm,
        help_text="Kollektivet personen bor i",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )
