from djongo import models

class Team(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=100)
    class Meta:
        db_table = 'teams'
