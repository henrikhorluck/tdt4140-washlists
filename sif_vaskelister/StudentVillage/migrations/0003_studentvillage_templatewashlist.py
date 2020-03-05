# Generated by Django 3.0.3 on 2020-02-27 22:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("washlist", "0002_auto_20200227_2219"),
        ("StudentVillage", "0002_auto_20200227_2219"),
    ]

    operations = [
        migrations.AddField(
            model_name="studentvillage",
            name="templateWashList",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="washlist.TemplateWashList",
            ),
        )
    ]
