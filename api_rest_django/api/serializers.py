from api import models
from rest_framework import serializers


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Card
        fields = ('id', 'text', 'cardCategory')


class BugCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BugCard
        fields = ('id', 'text', 'cardCategory')


class UserCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserCard
        fields = ('id', 'text', 'cardCategory')


class StartCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StartCard
        fields = ('id', 'text', 'cardCategory')


class MiddleCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MiddleCard
        fields = ('id', 'text', 'cardCategory')


class EndCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EndCard
        fields = ('id', 'text', 'cardCategory')


class PlayerSerializer(serializers.ModelSerializer):
    cards = CardSerializer(many=True, required=False)

    class Meta:
        model = models.Player
        fields = ('id', 'username', 'is_in_game', 'cards', 'points')


class GameSerializer(serializers.ModelSerializer):
    player_ids = serializers.PrimaryKeyRelatedField(many=True, source='players', queryset=models.Player.objects.all())
    current_client_player_id = serializers.PrimaryKeyRelatedField(read_only=True, source='current_client_player')

    class Meta:
        model = models.Game
        fields = ('id', 'join_code', 'player_ids', 'is_possible_to_join', 'current_client_player_id', 'points_to_win', 'last_played')


class LeaderBoardPointsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.LeaderBoardPoints
        fields = ('id', 'username', 'points')
