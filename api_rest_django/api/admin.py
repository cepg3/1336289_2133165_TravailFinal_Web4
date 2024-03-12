from django.contrib import admin
from api import models

admin.site.register(models.Card)
admin.site.register(models.BugCard)
admin.site.register(models.UserCard)
admin.site.register(models.StartCard)
admin.site.register(models.MiddleCard)
admin.site.register(models.EndCard)
admin.site.register(models.Player)
admin.site.register(models.Game)
admin.site.register(models.LeaderBoardPoints)