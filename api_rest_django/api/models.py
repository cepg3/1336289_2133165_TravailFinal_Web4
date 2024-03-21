from django.db import models

class Card(models.Model):
    """
    Represents a card in the game.
    
    A card has a title and a text.
    They are used by players to create solutions to the problems of the client player.
    """
    text = models.CharField(max_length=250, unique=True)
    
    def __str__(self):
        return self.text
    
    @property
    def cardCategory(self):
        # Checks if the card is a BugCard, UserCard, StartCard, MiddleCard or EndCard.
        if hasattr(self, 'bugcard'):
            return 'Bug'
        elif hasattr(self, 'usercard'):
            return 'User'
        elif hasattr(self, 'startcard'):
            return 'Start'
        elif hasattr(self, 'middlecard'):
            return 'Middle'
        elif hasattr(self, 'endcard'):
            return 'End'
        else:
            return 'Card'

class BugCard(Card):
    """
    This type of card is used to create problems for the client player.
    """
    pass


class UserCard(Card):
    """
    This type of card is used as context for the client player's problem.
    """
    pass


class StartCard(Card):
    """
    This type of card is used to create the beginning of the technicien player's solution.
    """
    pass


class MiddleCard(Card):
    """
    This type of card is used to create the middle of the technicien player's solution.
    """
    pass


class EndCard(Card):
    """
    This type of card is used to create the end of the technicien player's solution.
    """
    pass


class Player(models.Model):
    """
    Represents a player in the game. 
    The Players can only join one game at a time. 
    There is no verification for the username, so it is possible to have two players with the same username. 
    The username is the only field that is required to create a player. 
    
    The is_in_game field is used to check if the player is in a game or not.
    """
    username = models.CharField(max_length=20, unique=True)
    is_in_game = models.BooleanField(default=False)
    cards = models.ManyToManyField(Card, related_name='players', blank=True)
    points = models.IntegerField(default=0)


    def __str__(self):
        return self.username


class Game(models.Model):
    """
    Represents a game.
    A game has a join_code that is used to join the game.
    The players field is used to store the players that are in the game.
    The is_possible_to_join field is used to check if it is possible to join the game.
    The current_client_player field is used to store the player that is the client player at the moment.
    """
    join_code = models.CharField(max_length=6, unique=True)
    players = models.ManyToManyField(Player, related_name='games', blank=True)
    is_possible_to_join = models.BooleanField(default=True)
    current_client_player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='current_game', null=True)
    points_to_win = models.IntegerField(default=10)
    last_played = models.DateTimeField(auto_now=True)
    
    @property
    def is_started(self):
        return self.current_client_player is not None


class LeaderBoardPoints(models.Model):
    """
    Represents the points of the players.
    """
    username = models.CharField(max_length=20)
    points = models.IntegerField()
    
    def __str__(self):
        return self.player.username