from django.db import models

from Dormroom.models import Dormroom


class WashList(models.Model):
    def __str__(self):
        return "This is a washlist!"


class ListItem(models.Model):
    washlist = models.ForeignKey(WashList, on_delete=models.CASCADE)
    list_name = models.CharField(
        max_length=150, default="", help_text="Hva skal vaskes?"
    )

    def __str__(self):
        return f"Vask: {self.list_name}"
