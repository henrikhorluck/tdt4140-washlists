from django.contrib.auth.models import AbstractUser
from django.db import models

from Dorm.models import Dorm


class User(AbstractUser):
    dorm = models.ForeignKey(Dorm, on_delete=models.SET_NULL)
