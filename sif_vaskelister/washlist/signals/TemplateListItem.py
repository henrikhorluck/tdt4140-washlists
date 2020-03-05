from django.db.models import Q
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from Dormroom.models import Dormroom
from StudentVillage.models import StudentVillage
from washlist.models.Templates import TemplateListItem
from washlist.models.WashLists import ListItem, WashList


@receiver(signal=post_save, sender=TemplateListItem)
def handle_template_change(sender, instance: TemplateListItem, created, **kwargs):
    # Adds the new element in the template, to all washlists, that use the template
    if created:
        villages = StudentVillage.objects.filter(templateWashList=instance.washlist)
        rooms = Q()
        for v in villages:
            rooms |= Q(village=v)

        for r in Dormroom.objects.filter(rooms):
            if r.washlist is None:
                r.washlist = WashList.objects.create(
                    title=f"Kollektiv {r.number} sin vaskeliste", dormroom=r
                )
            ListItem.objects.create(template=instance, washlist=r.washlist)
