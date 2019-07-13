class CollisionManager:
    def __init__(self):
        pass

    def collidesWith(self, element_1, element_2):
        if (element_1.getX_Position() == element_2.getX_Position()) and (element_1.getY_Position() == element_2.getY_Position()):
                return True
        return False

    def collidesWithWall(self, element_1):
        if element_1.getX_Position() == 0 or element_1.getX_Position() == 400:
            return True
        if element_1.getY_Position() == 0 or element_1.getY_Position() == 400:
            return True

        return False
