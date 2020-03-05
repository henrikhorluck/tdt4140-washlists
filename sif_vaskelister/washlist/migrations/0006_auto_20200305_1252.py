# Generated by Django 3.0.3 on 2020-03-05 12:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("Dormroom", "0005_auto_20200305_1252"),
        ("washlist", "0005_auto_20200305_1154"),
    ]

    operations = [
        migrations.RemoveField(model_name="listitem", name="washlist"),
        migrations.AddField(
            model_name="listitem",
            name="dormroom",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="items",
                to="Dormroom.Dormroom",
            ),
            preserve_default=False,
        ),
        migrations.DeleteModel(name="WashList"),
    ]
