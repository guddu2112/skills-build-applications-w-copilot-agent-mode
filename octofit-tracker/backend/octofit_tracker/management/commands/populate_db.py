from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear collections
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Users
        ironman = User.objects.create(name='Iron Man', email='ironman@marvel.com', team='Marvel', is_superhero=True)
        captain = User.objects.create(name='Captain America', email='cap@marvel.com', team='Marvel', is_superhero=True)
        batman = User.objects.create(name='Batman', email='batman@dc.com', team='DC', is_superhero=True)
        superman = User.objects.create(name='Superman', email='superman@dc.com', team='DC', is_superhero=True)

        # Activities
        Activity.objects.create(user='Iron Man', type='Running', duration=30)
        Activity.objects.create(user='Captain America', type='Cycling', duration=45)
        Activity.objects.create(user='Batman', type='Swimming', duration=60)
        Activity.objects.create(user='Superman', type='Flying', duration=120)

        # Leaderboard
        Leaderboard.objects.create(team='Marvel', points=75)
        Leaderboard.objects.create(team='DC', points=180)

        # Workouts
        Workout.objects.create(name='Push Ups', difficulty='Easy')
        Workout.objects.create(name='Pull Ups', difficulty='Medium')
        Workout.objects.create(name='Squats', difficulty='Hard')

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data'))
