from djongo import models

class Activity(models.Model):
    _id = models.ObjectIdField()
    user = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    duration = models.IntegerField()
    class Meta:
        db_table = 'activities'
