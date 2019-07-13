import sys, pygame
from test.snake import *
from test.snakeBody import *
from test.collisionManager import *
from test.apple import *
from random import randrange

pygame.init()

screen = pygame.display.set_mode((400,400),0,32)

width, height = pygame.display.get_surface().get_size()

screen.fill((255,255,255))

snakeHead = SnakeHead((0,0,0), width/2, height/2, 25, 25, randrange(4))
cm = CollisionManager()
apple = Apple(randrange(16) * 25, randrange(16) * 25, 25, 25)

while 1:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                if snakeHead.getDirection() == 1 or snakeHead.getDirection() == 3:
                    pass
                else:
                    snakeHead.setDirection(3)

            if event.key == pygame.K_RIGHT:
                if snakeHead.getDirection() == 3 or snakeHead.getDirection() == 1:
                    pass
                else:
                    snakeHead.setDirection(1)

            if event.key == pygame.K_UP:
                if snakeHead.getDirection() == 2 or snakeHead.getDirection() == 0:
                    pass
                else:
                    snakeHead.setDirection(0)

            if event.key == pygame.K_DOWN:
                if snakeHead.getDirection() == 0 or snakeHead.getDirection() == 2:
                    pass
                else:
                    snakeHead.setDirection(2)

    for bodyPart in snakeHead.getBody():
        bodyPart.move()
    snakeHead.move(25)

    if cm.collidesWithWall(snakeHead):
        pygame.quit()
        sys.exit()

    for bodyPart in snakeHead.getBody():
        if cm.collidesWith(snakeHead, bodyPart):
            pygame.quit()
            sys.exit()

    if cm.collidesWith(snakeHead, apple):
        snakeBodyPart = snakeBody(snakeHead, len(snakeHead.getBody()))
        snakeHead.setBody(snakeBodyPart)
        del apple
        apple = Apple(randrange(16) * 25, randrange(16) * 25, 25, 25)

    screen.fill((255,255,255))
    snakeHead.drawSnakeHead(screen)
    apple.drawApple(screen)

    for bodyPart in snakeHead.getBody():
        bodyPart.drawBodyPart(screen)

    pygame.display.update()
    pygame.time.delay(140)
