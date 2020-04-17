from django.contrib.auth.models import Group
from django.db import models
from django.db.models import Q
from django.utils.translation import gettext_lazy as _

from Washlist.models.Templates import TemplateWashList


class StudentVillage(models.Model):
    name = models.CharField(max_length=80, default="", help_text="Navn på studentby")
    templateWashList = models.ForeignKey(
        TemplateWashList,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="villages",
    )
    managers = models.ManyToManyField(
        "SIFUser.User",  # This is a string to avoid circular imports
        related_name="manager_villages",
        # symmetrical=True, # Gives integrityerror in admin-panel
        limit_choices_to=Q(groups__name="Manager"),
        help_text="Managerene for studentbyen",
        blank=True,
    )

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = _("Studentby")
        verbose_name_plural = _("Studentbyer")
