from django.db import models
from user.models import User


class Paste(models.Model):
    content = models.TextField()
    name = models.CharField(max_length=150)
    language = models.CharField(max_length=20)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    creation_dttm = models.DateTimeField()

    def __str__(self):
        return self.name
