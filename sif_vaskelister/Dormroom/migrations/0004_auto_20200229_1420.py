# Generated by Django 3.0.3 on 2020-02-29 14:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('StudentVillage', '0006_auto_20200229_1420'),
        ('Dormroom', '0003_merge_20200228_1005'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dormroom',
            name='village',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Dormrooms', to='StudentVillage.StudentVillage'),
        ),
    ]
