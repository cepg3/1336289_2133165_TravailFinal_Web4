from django.shortcuts import render
from api import models
from rest_framework import viewsets


class CardViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows cards to be viewed or edited.
    """
    queryset = models.Card.objects.all().order_by('title')
    serializer_class = models.CardSerializer


class BugCardViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows bug cards to be viewed or edited.
    """
    queryset = models.BugCard.objects.all().order_by('title')
    serializer_class = models.BugCardSerializer


class UserCardViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows user cards to be viewed or edited.
    """
    queryset = models.UserCard.objects.all().order_by('title')
    serializer_class = models.UserCardSerializer


class StartCardViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows start cards to be viewed or edited.
    """
    queryset = models.StartCard.objects.all().order_by('title')
    serializer_class = models.StartCardSerializer


class MiddleCardViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows middle cards to be viewed or edited.
    """
    queryset = models.MiddleCard.objects.all().order_by('title')
    serializer_class = models.MiddleCardSerializer


class EndCardViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows end cards to be viewed or edited.
    """
    queryset = models.EndCard.objects.all().order_by('title')
    serializer_class = models.EndCardSerializer


class PlayerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows players to be viewed or edited.
    """
    queryset = models.Player.objects.all().order_by('username')
    serializer_class = models.PlayerSerializer


class GameViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows games to be viewed or edited.
    """
    queryset = models.Game.objects.all().order_by('join_code')
    serializer_class = models.GameSerializer


class LeaderBoardPointsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows leader board points to be viewed or edited.
    """
    queryset = models.LeaderBoardPoints.objects.all().order_by('points')
    serializer_class = models.LeaderBoardPointsSerializer
