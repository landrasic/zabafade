from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "pwd", "email"]


class AppointmentSerializer(serializers.ModelSerializer):
    dateTime = serializers.DateTimeField(input_formats=["%d-%m-%Y %H:%M"])

    class Meta:
        model = Appointment
        fields = ["id", "client", "dateTime"]
