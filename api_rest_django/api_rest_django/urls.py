from django.contrib import admin
from django.urls import path
from api import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'cards', views.CardViewSet)
router.register(r'bugcards', views.BugCardViewSet)
router.register(r'usercards', views.UserCardViewSet)
router.register(r'startcards', views.StartCardViewSet)
router.register(r'middlecards', views.MiddleCardViewSet)
router.register(r'endcards', views.EndCardViewSet)
router.register(r'players', views.PlayerViewSet)
router.register(r'games', views.GameViewSet)
router.register(r'leaderboardpoints', views.LeaderBoardPointsViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
]

urlpatterns += router.urls
