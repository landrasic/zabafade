from django.db import models


class User(models.Model):
    name = models.CharField(max_length=50)
    pwd = models.CharField(max_length=500)
    email = models.CharField(max_length=100)
