# Generated by Django 3.0.3 on 2020-02-29 14:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("Dormroom", "0004_auto_20200229_1420"),
        ("SIFUser", "0005_merge_20200228_1005"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="dormroom",
            field=models.ForeignKey(
                blank=True,
                help_text="Kollektivet personen bor i",
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="residents",
                to="Dormroom.Dormroom",
            ),
        )
    ]
