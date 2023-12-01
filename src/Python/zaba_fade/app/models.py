from django.db import models


class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    pwd = models.CharField(max_length=500)
    email = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Appointment(models.Model):
    id = models.AutoField(primary_key=True)
    client = models.ForeignKey(
        User, on_delete=models.CASCADE, default=None, blank=True, null=True
    )
    dateTime = models.DateTimeField()
