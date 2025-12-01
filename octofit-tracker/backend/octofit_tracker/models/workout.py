from djongo import models

class Workout(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=50)
    class Meta:
        db_table = 'workouts'
