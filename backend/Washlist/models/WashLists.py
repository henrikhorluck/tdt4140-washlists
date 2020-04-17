from django.db import models
from django.db.models import Q

from Dormroom.models import Dormroom
from Washlist.models.Templates import TemplateListItem


class ListItem(models.Model):
    dormroom = models.ForeignKey(
        Dormroom, on_delete=models.CASCADE, related_name="items"
    )

    desc = models.CharField(
        max_length=150, help_text="Hva skal vaskes?", null=True, blank=True
    )

    template = models.ForeignKey(
        TemplateListItem,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="based_items",
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
                check=Q(template_id__isnull=False) | Q(desc__isnull=False),
                name="Must have description from either template or self",
            )
        ]
