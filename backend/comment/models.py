from django.db import models
from user.models import User


class Comment(models.Model):
    text = models.CharField(max_length=500)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    creation_dttm = models.DateTimeField()

    def __str__(self):
        return self.text
