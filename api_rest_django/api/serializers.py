from api import models
from rest_framework import serializers


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Card
        fields = ('id', 'text')


class BugCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BugCard
        fields = ('id', 'text')


class UserCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserCard
        fields = ('id', 'text')


class StartCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StartCard
        fields = ('id', 'text')


class MiddleCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MiddleCard
        fields = ('id', 'text')


class EndCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EndCard
        fields = ('id', 'text')


class PlayerSerializer(serializers.ModelSerializer):
    cards = CardSerializer(many=True)

    class Meta:
        model = models.Player
        fields = ('id', 'username', 'is_in_game', 'cards')


class GameSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True)
    current_client_player = PlayerSerializer()

    class Meta:
        model = models.Game
        fields = ('id', 'join_code', 'players', 'is_possible_to_join', 'current_client_player')


class LeaderBoardPointsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.LeaderBoardPoints
        fields = ('id', 'username', 'points')
