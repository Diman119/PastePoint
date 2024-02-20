from django.db import models
from user.models import User
from paste.models import Paste


class Comment(models.Model):
    text = models.CharField(max_length=500)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    paste = models.ForeignKey(Paste, on_delete=models.CASCADE)
    creation_dttm = models.DateTimeField()

    def __str__(self):
        return self.text
