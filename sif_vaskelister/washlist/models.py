from django.db import models

from Dormroom.models import Dormroom


class WashList(models.Model):
    title = models.CharField(max_length=250, default="")
    dorm_room = models.OneToOneField(Dormroom, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class ListItem(models.Model):
    washlist = models.ForeignKey(WashList, on_delete=models.CASCADE)
    item_name = models.CharField(
        max_length=150, default="", help_text="Hva skal vaskes?"
    )
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.item_name
