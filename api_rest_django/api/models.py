from django.db import models

class Player(models.Model):
    """
    Represents a player in the game. 
    The Players can only join one game at a time. 
    There is no verification for the username, so it is possible to have two players with the same username. 
    The username is the only field that is required to create a player. 
    
    The is_in_game field is used to check if the player is in a game or not.
    """
    username = models.CharField(max_length=20)
    is_in_game = models.BooleanField(default=False)
    
    def __str__(self):
        return self.username
    
    
class Game(models.Model):
    players = models.ManyToOneRel(Player, related_name='game')