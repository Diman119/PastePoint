from django.db import models
from user.models import User


class Paste(models.Model):
    ACCESS_MODE_CHOICES = (
        (0, 'Public'),
        (1, 'Private'),
        (2, 'Password')
    )

    content = models.TextField()
    name = models.CharField(max_length=150)
    language = models.CharField(max_length=20)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    creation_dttm = models.DateTimeField()
    access_mode = models.IntegerField(choices=ACCESS_MODE_CHOICES)
    password = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.name
