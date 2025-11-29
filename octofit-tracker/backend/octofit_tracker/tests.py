from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create(name='Test', email='test@example.com', team='Marvel', is_superhero=True)
        self.assertEqual(user.name, 'Test')
        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.team, 'Marvel')
        self.assertTrue(user.is_superhero)

class TeamModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name='Marvel')
        self.assertEqual(team.name, 'Marvel')

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        activity = Activity.objects.create(user='Test', type='Running', duration=30)
        self.assertEqual(activity.type, 'Running')
        self.assertEqual(activity.duration, 30)

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        leaderboard = Leaderboard.objects.create(team='Marvel', points=100)
        self.assertEqual(leaderboard.team, 'Marvel')
        self.assertEqual(leaderboard.points, 100)

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        workout = Workout.objects.create(name='Push Ups', difficulty='Easy')
        self.assertEqual(workout.name, 'Push Ups')
        self.assertEqual(workout.difficulty, 'Easy')
