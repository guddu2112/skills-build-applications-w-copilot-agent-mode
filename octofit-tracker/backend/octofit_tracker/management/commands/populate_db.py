from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime, timedelta
import random

class Command(BaseCommand):
    help = 'Populate the octofit_db database with comprehensive test data'

    def handle(self, *args, **kwargs):
        # Clear collections
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write('Creating comprehensive sample data...')

        # Create Teams (5+ teams)
        teams_data = [
            {'name': 'Marvel Heroes'},
            {'name': 'DC Legends'},
            {'name': 'Fitness Warriors'},
            {'name': 'Iron Wolves'},
            {'name': 'Thunder Hawks'},
            {'name': 'Phoenix Squad'},
            {'name': 'Lightning Bolts'}
        ]
        
        teams = []
        for team_data in teams_data:
            team = Team.objects.create(**team_data)
            teams.append(team)
            self.stdout.write(f'Created team: {team.name}')

        # Create Users (20+ users with diverse profiles)
        users_data = [
            # Marvel Heroes Team
            {'name': 'Tony Stark', 'email': 'tony.stark@marvel.com', 'team': 'Marvel Heroes', 'is_superhero': True},
            {'name': 'Steve Rogers', 'email': 'steve.rogers@marvel.com', 'team': 'Marvel Heroes', 'is_superhero': True},
            {'name': 'Natasha Romanoff', 'email': 'natasha.romanoff@marvel.com', 'team': 'Marvel Heroes', 'is_superhero': True},
            {'name': 'Bruce Banner', 'email': 'bruce.banner@marvel.com', 'team': 'Marvel Heroes', 'is_superhero': True},
            
            # DC Legends Team
            {'name': 'Clark Kent', 'email': 'clark.kent@dc.com', 'team': 'DC Legends', 'is_superhero': True},
            {'name': 'Bruce Wayne', 'email': 'bruce.wayne@dc.com', 'team': 'DC Legends', 'is_superhero': True},
            {'name': 'Diana Prince', 'email': 'diana.prince@dc.com', 'team': 'DC Legends', 'is_superhero': True},
            {'name': 'Barry Allen', 'email': 'barry.allen@dc.com', 'team': 'DC Legends', 'is_superhero': True},
            
            # Fitness Warriors Team
            {'name': 'Mike Johnson', 'email': 'mike.johnson@fitness.com', 'team': 'Fitness Warriors', 'is_superhero': False},
            {'name': 'Sarah Williams', 'email': 'sarah.williams@fitness.com', 'team': 'Fitness Warriors', 'is_superhero': False},
            {'name': 'David Brown', 'email': 'david.brown@fitness.com', 'team': 'Fitness Warriors', 'is_superhero': False},
            {'name': 'Emily Davis', 'email': 'emily.davis@fitness.com', 'team': 'Fitness Warriors', 'is_superhero': False},
            
            # Iron Wolves Team
            {'name': 'Alex Rodriguez', 'email': 'alex.rodriguez@ironwolves.com', 'team': 'Iron Wolves', 'is_superhero': False},
            {'name': 'Jessica Martinez', 'email': 'jessica.martinez@ironwolves.com', 'team': 'Iron Wolves', 'is_superhero': False},
            {'name': 'Chris Wilson', 'email': 'chris.wilson@ironwolves.com', 'team': 'Iron Wolves', 'is_superhero': False},
            
            # Thunder Hawks Team
            {'name': 'Rachel Green', 'email': 'rachel.green@thunderhawks.com', 'team': 'Thunder Hawks', 'is_superhero': False},
            {'name': 'James Thompson', 'email': 'james.thompson@thunderhawks.com', 'team': 'Thunder Hawks', 'is_superhero': False},
            {'name': 'Lisa Anderson', 'email': 'lisa.anderson@thunderhawks.com', 'team': 'Thunder Hawks', 'is_superhero': False},
            
            # Phoenix Squad Team
            {'name': 'Kevin Miller', 'email': 'kevin.miller@phoenixsquad.com', 'team': 'Phoenix Squad', 'is_superhero': False},
            {'name': 'Amanda Taylor', 'email': 'amanda.taylor@phoenixsquad.com', 'team': 'Phoenix Squad', 'is_superhero': False},
            
            # Lightning Bolts Team
            {'name': 'Ryan Jackson', 'email': 'ryan.jackson@lightningbolts.com', 'team': 'Lightning Bolts', 'is_superhero': False},
            {'name': 'Michelle White', 'email': 'michelle.white@lightningbolts.com', 'team': 'Lightning Bolts', 'is_superhero': False}
        ]

        users = []
        for user_data in users_data:
            user = User.objects.create(**user_data)
            users.append(user)
            self.stdout.write(f'Created user: {user.name} ({user.team})')

        # Create Activities (50+ activities with realistic data)
        activity_types = [
            'Running', 'Cycling', 'Swimming', 'Weight Training', 'Yoga',
            'CrossFit', 'Boxing', 'Rock Climbing', 'Basketball', 'Tennis',
            'Soccer', 'Volleyball', 'Pilates', 'HIIT', 'Cardio',
            'Strength Training', 'Martial Arts', 'Dance Fitness', 'Rowing', 'Hiking'
        ]

        activities_data = []
        for i in range(60):  # Create 60 activities
            user = random.choice(users)
            activity_type = random.choice(activity_types)
            duration = random.randint(15, 180)  # 15 to 180 minutes
            
            activities_data.append({
                'user': user.name,
                'type': activity_type,
                'duration': duration
            })

        for activity_data in activities_data:
            activity = Activity.objects.create(**activity_data)

        self.stdout.write(f'Created {len(activities_data)} activities')

        # Create Leaderboard entries (one for each team)
        leaderboard_data = []
        for team in teams:
            # Calculate points based on team activities
            team_users = [u.name for u in users if u.team == team.name]
            team_activities = [a for a in activities_data if a['user'] in team_users]
            
            # Calculate points: 1 point per minute of activity + bonus for variety
            total_minutes = sum(a['duration'] for a in team_activities)
            activity_variety_bonus = len(set(a['type'] for a in team_activities)) * 10
            total_points = total_minutes + activity_variety_bonus + random.randint(50, 200)
            
            leaderboard_data.append({
                'team': team.name,
                'points': total_points
            })

        for leaderboard_entry in leaderboard_data:
            leaderboard = Leaderboard.objects.create(**leaderboard_entry)
            self.stdout.write(f'Created leaderboard entry: {leaderboard.team} - {leaderboard.points} points')

        # Create Workouts (25+ comprehensive workouts)
        workouts_data = [
            # Beginner/Easy Workouts
            {'name': 'Morning Stretch Routine', 'difficulty': 'Easy'},
            {'name': 'Basic Push-ups', 'difficulty': 'Easy'},
            {'name': 'Wall Sits', 'difficulty': 'Easy'},
            {'name': 'Gentle Yoga Flow', 'difficulty': 'Easy'},
            {'name': 'Walking Meditation', 'difficulty': 'Easy'},
            {'name': 'Light Cardio Dance', 'difficulty': 'Easy'},
            {'name': 'Beginner Pilates', 'difficulty': 'Easy'},
            
            # Intermediate/Medium Workouts
            {'name': 'HIIT Circuit Training', 'difficulty': 'Medium'},
            {'name': 'Bodyweight Strength', 'difficulty': 'Medium'},
            {'name': 'Kickboxing Combo', 'difficulty': 'Medium'},
            {'name': 'Vinyasa Yoga', 'difficulty': 'Medium'},
            {'name': 'Core Power Workout', 'difficulty': 'Medium'},
            {'name': 'Functional Fitness', 'difficulty': 'Medium'},
            {'name': 'Tabata Training', 'difficulty': 'Medium'},
            {'name': 'Boxing Fundamentals', 'difficulty': 'Medium'},
            {'name': 'Resistance Band Training', 'difficulty': 'Medium'},
            
            # Advanced/Hard Workouts
            {'name': 'Extreme HIIT Challenge', 'difficulty': 'Hard'},
            {'name': 'Olympic Lifting', 'difficulty': 'Hard'},
            {'name': 'Advanced Calisthenics', 'difficulty': 'Hard'},
            {'name': 'Crossfit WOD', 'difficulty': 'Hard'},
            {'name': 'Spartan Race Training', 'difficulty': 'Hard'},
            {'name': 'Advanced Powerlifting', 'difficulty': 'Hard'},
            {'name': 'Military Bootcamp', 'difficulty': 'Hard'},
            {'name': 'Elite Athlete Training', 'difficulty': 'Hard'},
            {'name': 'Ironman Preparation', 'difficulty': 'Hard'},
            {'name': 'UFC Fighter Conditioning', 'difficulty': 'Hard'}
        ]

        for workout_data in workouts_data:
            workout = Workout.objects.create(**workout_data)
            self.stdout.write(f'Created workout: {workout.name} ({workout.difficulty})')

        # Summary statistics
        total_users = User.objects.count()
        total_teams = Team.objects.count()
        total_activities = Activity.objects.count()
        total_leaderboard = Leaderboard.objects.count()
        total_workouts = Workout.objects.count()

        self.stdout.write(
            self.style.SUCCESS(
                f'\n✅ Database populated successfully!\n'
                f'📊 Summary:\n'
                f'   👥 Users: {total_users}\n'
                f'   🏆 Teams: {total_teams}\n'
                f'   🏃 Activities: {total_activities}\n'
                f'   📈 Leaderboard entries: {total_leaderboard}\n'
                f'   💪 Workouts: {total_workouts}\n'
            )
        )
