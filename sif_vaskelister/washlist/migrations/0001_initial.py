# Generated by Django 3.0.3 on 2020-02-24 15:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='WashList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='ListItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('list_name', models.CharField(default='', help_text='Hva skal vaskes?', max_length=150)),
                ('washlist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='washlist.WashList')),
            ],
        ),
    ]
