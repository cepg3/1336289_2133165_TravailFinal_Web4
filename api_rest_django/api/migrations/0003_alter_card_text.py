# Generated by Django 5.0.3 on 2024-03-12 18:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_card_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='text',
            field=models.CharField(max_length=250, unique=True),
        ),
    ]
