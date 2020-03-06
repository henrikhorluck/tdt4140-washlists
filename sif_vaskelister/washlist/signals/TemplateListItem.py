from django.db.models.signals import post_save
from django.dispatch import receiver

from StudentVillage.models import StudentVillage
from washlist.models.Templates import TemplateListItem
from washlist.models.WashLists import ListItem


@receiver(signal=post_save, sender=TemplateListItem)
def handle_template_change(sender, instance: TemplateListItem, created, **kwargs):
    # Adds the new element in the template, to all washlists, that use the template
    if created:
        villages = StudentVillage.objects.filter(templateWashList=instance.washlist)

        for v in villages:
            for r in v.dormrooms.all():
                ListItem.objects.create(template=instance, dormroom=r)
