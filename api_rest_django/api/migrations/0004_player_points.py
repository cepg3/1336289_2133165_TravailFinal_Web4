# Generated by Django 5.0.3 on 2024-03-20 16:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_card_text'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='points',
            field=models.IntegerField(default=0),
        ),
    ]
