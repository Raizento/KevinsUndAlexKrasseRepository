import pygame
from random import randrange

# @author: Alexander Molitor
class SnakeHead:


    # Constructor für den Kopf der Schlange
    # @params:
    #   color      = Farbe des Kopfes
    #   x_position = X-Position, an welcher der Kopf im Raster startet
    #   y_position = Y-Position, an welcher der Kopf im Raster startet
    #   height     = Höhe des Kopfes in Pixeln
    #   width      = Breite des Kopfes in Pixeln
    #   direction  = Richtung, in welche der Kopf zeigt
    #       0   = Oben
    #       1   = Rechts
    #       2   = Unten
    #       3   = Links
    #       Wichtig für move()
    def __init__(self, color, x_position, y_position, height, width, direction):
        self.color = color
        self.x_position = x_position
        self.y_position = y_position
        self.height = height
        self.width = width
        self.direction = direction
        self.body = []

    def drawSnakeHead(self, display):
        pygame.draw.rect(display, self.color, (self.x_position, self.y_position, self.height, self.width))

    def getColor(self):
        return self.color

    def getHeight(self):
        return self.height

    def getWidth(self):
        return self.width

    def getX_Position(self):
        return self.x_position

    def setX_Position(self, x_position):
        self.x_position = x_position

    def getY_Position(self):
        return self.y_position

    def setY_Position(self, y_position):
        self.y_position = y_position


    def getDirection(self):
        return self.direction

    # Ändert die Richtung, in welche der Kopf zeigt.
    # @params:
    #   direction = Richtung, in welche der Kopf zeigt.
    #       0 = Oben
    #       1 = Rechts
    #       2 = Unten
    #       3 = Links
    def setDirection(self, direction):
        self.direction = direction

    # Bewegt die Schlange
    def move(self, blockSize):
        if self.direction == 0:
            self.setY_Position(self.getY_Position() - blockSize)
        if self.direction == 1:
            self.setX_Position(self.getX_Position() + blockSize)
        if self.direction == 2:
            self.setY_Position(self.getY_Position() + blockSize)
        if self.direction == 3:
            self.setX_Position(self.getX_Position() - blockSize)

    def getBody(self):
        return self.body

    def setBody(self, body):
        self.body.append(body)
