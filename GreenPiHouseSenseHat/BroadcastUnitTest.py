import unittest
import BroadcastSender as b

class TestStringMethods(unittest.TestCase):
    O = (0,0,0)
    X = (200,200,200)
    R = (255,0,0)

    logo_up = [
        O, O, O, X, X, O, O, O,
        O, O, X, X, X, X, O, O,
        O, X, X, X, X, X, X, O,
        X, X, O, X, X, O, X, X,
        X, O, O, X, X, O, O, X,
        O, O, O, X, X, O, O, O,
        O, O, O, X, X, O, O, O,
        O, O, O, X, X, O, O, O,
    ]

    logo_down = [
        O, O, O, X, X, O, O, O,
        O, O, O, X, X, O, O, O,
        O, O, O, X, X, O, O, O,    
        X, O, O, X, X, O, O, X,
        X, X, O, X, X, O, X, X,
        O, X, X, X, X, X, X, O,
        O, O, X, X, X, X, O, O,
        O, O, O, X, X, O, O, O,
    ]

    def test_pixels(self):
        self.assertEqual(b.compareValues(19,45), logo_down)
        self.assertEqual(b.compareValues(20,44), logo_down)
        self.assertEqual(b.compareValues(20,46), logo_up)
        self.assertEqual(b.compareValues(21,45), logo_up)

if __name__ == '__main__':
    unittest.main()