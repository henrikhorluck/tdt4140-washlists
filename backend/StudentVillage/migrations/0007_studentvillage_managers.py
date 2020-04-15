# Generated by Django 3.0.3 on 2020-03-09 12:18

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("StudentVillage", "0006_auto_20200229_1420"),
    ]

    operations = [
        migrations.AddField(
            model_name="studentvillage",
            name="managers",
            field=models.ManyToManyField(
                blank=True,
                help_text="Managerene for studentbyen",
                limit_choices_to=models.Q(groups__name="Manager"),
                related_name="manager_villages",
                to=settings.AUTH_USER_MODEL,
            ),
        )
    ]