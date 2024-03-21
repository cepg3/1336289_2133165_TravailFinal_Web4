from datetime import timedelta
from django.utils import timezone
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
    
    @action(detail=True, methods=['get'], url_path='taken')
    def taken(self, request, pk=None):
        if not isinstance(pk, str):
            # If the username is not a string, return a 404
            return Response(status=404)
        
        try:
            player = models.Player.objects.filter(username=pk).first()
            if player:
                return Response({'taken': True})
            
            raise models.Player.DoesNotExist
        except models.Player.DoesNotExist:
            return Response({'taken': False})
    
    def get_queryset(self):
        username = self.request.query_params.get('username', None)
        if username is not None:
            return models.Player.objects.filter(username=username)
        return models.Player.objects.all()
    


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
    
    @action(detail=True, methods=['get'], url_path='can-join')
    def can_join(self, request, pk=None):
        if not isinstance(pk, str):
            # If the join code is not a string, return a 404
            return Response(status=404)
        
        try:
            game = models.Game.objects.get(join_code=pk)
            if game.players.count() < 6:
                return Response({'can_join': True})
            else:
                return Response({'can_join': False})
        except models.Game.DoesNotExist:
            return Response({'can_join': False})
    
    def retrieve(self, request, *args, **kwargs):
        # Checks if the last played move of the game is more than 15 minutes ago
        game = self.get_object()
        if game.last_played + timedelta(minutes=15) < timezone.now():
            for player in game.players.all():
                if player.is_in_game:
                    player.delete()
            
            game.delete()
            return Response(status=404)
        
        return super().retrieve(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        # Deletes all games that have a last played move more than 15 minutes ago
        for game in models.Game.objects.all():
            if game.last_played + timedelta(minutes=15) < timezone.now():
                for player in game.players.all():
                    if player.is_in_game:
                        player.delete()
                
                game.delete()
        
        return super().list(request, *args, **kwargs)

    @action(detail=True, methods=['patch'], url_path='join')
    def join(self, request, pk=None):
        if not isinstance(pk, str):
            # If the join code is not a string, return a 404
            return Response(status=404)
        
        try:
            game = models.Game.objects.get(id=pk)
            if game.players.count() < 6:
                # Get the player id from the request body
                playerId = request.data.get('playerId', None)
                if playerId is not None:
                    player = models.Player.objects.get(id=playerId)
                    player.is_in_game = True
                    player.save()
                    game.players.add(player)
                    game.save()
                    return Response(self.serializer_class(game).data)
                else:
                    return Response(self.serializer_class(game).data)
            else:
                return Response(status=400)
        except models.Game.DoesNotExist:
            return Response(status=404)
    
    @action(detail=True, methods=['get'], url_path='by_join_code')
    def by_join_code(self, request, pk=None):
        if not isinstance(pk, str):
            # If the join code is not a string, return a 404
            return Response(status=404)
        
        try:
            game = models.Game.objects.get(join_code=pk)
            return Response(self.serializer_class(game).data)
        except models.Game.DoesNotExist:
            return Response(status=404)
    
    @action(detail=True, methods=['put'], url_path='start')
    def start(self, request, pk=None):
        if not isinstance(pk, str):
            # If the join code is not a string, return a 404
            return Response(status=404)
        
        try:
            game = models.Game.objects.get(id=pk)
            game.is_started = True
            game.save()
            for player in game.players.all():
                player.is_in_game = True
                player.save()
                
            # Give all the cards randomly to the players
            startCards = models.StartCard.objects.all()
            middleCards = models.MiddleCard.objects.all()
            endCards = models.EndCard.objects.all()
            
            for player in game.players.all():
                for _ in range(3):
                    player.start_card = startCards.order_by('?').first()
                    player.middle_card = middleCards.order_by('?').first()
                    player.end_card = endCards.order_by('?').first()
                    player.save()
                
            return Response(self.serializer_class(game).data)
        except models.Game.DoesNotExist:
            return Response(status=404)


class LeaderBoardPointsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows leader board points to be viewed or edited.
    """
    queryset = models.LeaderBoardPoints.objects.all().order_by('points')
    serializer_class = serializers.LeaderBoardPointsSerializer
