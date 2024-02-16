from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    favorites = models.ManyToManyField('paste.Paste', related_name='favorited_by', blank=True)
