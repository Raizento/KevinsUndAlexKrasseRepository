import pygame
from .snake import *

class snakeBody:
    def __init__(self, snakeHead, id):
        self.snakeHead = snakeHead
        self.color = self.snakeHead.getColor()
        self.height = self.snakeHead.getHeight()
        self.width = self.snakeHead.getWidth()
        self.prevX = 0
        self.prevY = 0
        self.x_position = 0
        self.y_position = 0

        self.id = id

        if self.snakeHead.getBody() == []:
            self.createFirstBodyPart(self.snakeHead)


    def getX_Position(self):
        return self.x_position

    def setX_Position(self, x_position):
        self.x_position = x_position

    def getY_Position(self):
        return self.y_position

    def setY_Position(self, y_position):
        self.y_position = y_position

    def getID(self):
        return self.id

    def getPrevPosition(self):
        return (self.prevX, self.prevY)

    def setPrevPosition(self):
        self.prevX = self.getX_Position()
        self.prevY = self.getY_Position()

    def getBodyPosition(self):
        for bodyPart in self.snakeHead.getBody():
            if bodyPart.getID() == self.getID():
                return (snakeHead.getBody()[bodyPart.getID()].getX_Position(),
                        snakeHead.getBody()[bodyPart.getID()].getY_Position())

    def getBodyPositionFromPartBefore(self):
        for i in range(len(self.snakeHead.getBody())):
            if i == self.getID():
                return (self.snakeHead.getBody()[i-1].getX_Position(),
                        self.snakeHead.getBody()[i-1].getY_Position())

    def createFirstBodyPart(self, snakeHead):
        if snakeHead.getDirection() == 0:
            self.setY_Position(snakeHead.getY_Position() + 25)

        if snakeHead.getDirection() == 1:
            self.setX_Position(snakeHead.getX_Position() - 25)

        if snakeHead.getDirection() == 2:
            self.setY_Position(snakeHead.getY_Position() - 25)

        if snakeHead.getDirection() == 3:
            self.setX_Position(snakeHead.getX_Position() + 25)

    def drawBodyPart(self, display):
        pygame.draw.rect(display, self.color, (self.x_position, self.y_position, self.height, self.width))

    def move(self):
        self.setPrevPosition()
        for i in range(len(self.snakeHead.getBody())):
            if self.getID() == 0:
                self.setX_Position(self.snakeHead.getX_Position())
                self.setY_Position(self.snakeHead.getY_Position())
            else:
                self.setX_Position(self.snakeHead.getBody()[self.getID()-1].getPrevPosition()[0])
                self.setY_Position(self.snakeHead.getBody()[self.getID()-1].getPrevPosition()[1])


#self.setX_Position(snakeHead.getBody()[bodyPart.getID()-1].getX_Position())
#self.setY_Position(snakeHead.getBody()[bodyPart.getID()-1].getY_Position())
