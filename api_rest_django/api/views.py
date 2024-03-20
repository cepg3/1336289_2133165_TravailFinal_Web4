from django.shortcuts import render
from api import serializers, models
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action


class CardViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows cards to be viewed or edited.
    """
    queryset = models.Card.objects.all().order_by('text')
    serializer_class = serializers.CardSerializer


class BugCardViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows bug cards to be viewed or edited.
    """
    queryset = models.BugCard.objects.all().order_by('text')
    serializer_class = serializers.BugCardSerializer


class UserCardViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows user cards to be viewed or edited.
    """
    queryset = models.UserCard.objects.all().order_by('text')
    serializer_class = serializers.UserCardSerializer


class StartCardViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows start cards to be viewed or edited.
    """
    queryset = models.StartCard.objects.all().order_by('text')
    serializer_class = serializers.StartCardSerializer


class MiddleCardViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows middle cards to be viewed or edited.
    """
    queryset = models.MiddleCard.objects.all().order_by('text')
    serializer_class = serializers.MiddleCardSerializer


class EndCardViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows end cards to be viewed or edited.
    """
    queryset = models.EndCard.objects.all().order_by('text')
    serializer_class = serializers.EndCardSerializer


class PlayerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows players to be viewed or edited.
    """
    queryset = models.Player.objects.all().order_by('username')
    serializer_class = serializers.PlayerSerializer


class GameViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows games to be viewed or edited.
    """
    queryset = models.Game.objects.all().order_by('join_code')
    serializer_class = serializers.GameSerializer
    
    @action(detail=True, methods=['get'], url_path='exists')
    def exists(self, request, pk=None):
        if not isinstance(pk, str):
            # If the join code is not a string, return a 404
            return Response(status=404)
        
        try:
            game = models.Game.objects.get(join_code=pk)
            return Response({'exists': True})
        except models.Game.DoesNotExist:
            return Response({'exists': False})


class LeaderBoardPointsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows leader board points to be viewed or edited.
    """
    queryset = models.LeaderBoardPoints.objects.all().order_by('points')
    serializer_class = serializers.LeaderBoardPointsSerializer
