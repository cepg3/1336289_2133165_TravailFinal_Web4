# Generated by Django 5.0.3 on 2024-03-20 19:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_game_points_to_win'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='last_played',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
