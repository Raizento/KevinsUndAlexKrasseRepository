import pygame

class Apple:
    def __init__(self, x_position, y_position, height, width):
        self.color = (255,0,0)
        self.x_position = x_position
        self.y_position = y_position
        self.height = height
        self.width = width

    def drawApple(self, display):
        pygame.draw.rect(display, self.color, (self.x_position, self.y_position, self.height, self.width))

    def getX_Position(self):
        return self.x_position

    def getY_Position(self):
        return self.y_position
