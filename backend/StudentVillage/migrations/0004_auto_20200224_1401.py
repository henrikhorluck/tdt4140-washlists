# Generated by Django 3.0.3 on 2020-02-24 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("StudentVillage", "0003_studentvillage_name")]

    operations = [
        migrations.AlterField(
            model_name="studentvillage",
            name="name",
            field=models.CharField(help_text="Navn på studentby", max_length=75),
        )
    ]
