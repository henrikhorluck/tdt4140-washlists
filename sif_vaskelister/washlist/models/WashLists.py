from django.db import models
from django.db.models import Q

from Dormroom.models import Dormroom
from washlist.models.Templates import TemplateListItem


class WashList(models.Model):
    title = models.CharField(max_length=250, default="")
    dormroom = models.OneToOneField(
        Dormroom, on_delete=models.CASCADE, blank=True, null=True
    )

    def __str__(self):
        return self.title


class ListItem(models.Model):
    washlist = models.ForeignKey(WashList, on_delete=models.CASCADE)

    desc = models.CharField(
        max_length=150, help_text="Hva skal vaskes?", null=True, blank=True
    )

    template = models.ForeignKey(
        TemplateListItem, on_delete=models.SET_NULL, null=True, blank=True
    )

    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.description

    @property
    def description(self):
        return self.template.description if self.template else self.desc

    class Meta:
        constraints = [
            models.CheckConstraint(
                check=Q(template_id__isnull=True) | Q(desc__isnull=True),
                name="Must have description",
            )
        ]
