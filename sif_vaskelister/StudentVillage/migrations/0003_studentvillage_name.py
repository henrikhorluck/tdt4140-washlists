# Generated by Django 3.0.3 on 2020-02-24 11:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("StudentVillage", "0002_auto_20200221_1058")]

    operations = [
        migrations.AddField(
            model_name="studentvillage",
            name="name",
            field=models.CharField(default="Navnesen", max_length=75),
            preserve_default=False,
        )
    ]
