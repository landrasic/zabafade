import json
from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import *
from .serializer import *

# class UserView(APIView):
#     def get(self, request):
#         output = [{"name": output.name,
#                    "pwd": output.pdw,
#                    "appointment": output.appointment}
#                    for output in User.objects.all()]
#         return Response(output)
#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data)


class UserView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserSingleView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class AppointmentView(generics.ListCreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        queryset = Appointment.objects.all()
        clientId = self.request.query_params.get("client")

        if clientId:
            queryset = queryset.filter(client=clientId)

        return queryset


class UserAppointmentView(APIView):
    def get(self, request):
        users = User.objects.all()
        appointments = Appointment.objects.all()

        output = [
            {
                "id": output.id,
                "name": output.name,
                "email": output.email,
                "appointment": {
                    "id": list(
                        filter(lambda x: x.client.id == output.id, appointments)
                    )[0].id,
                    "dateTime": list(
                        filter(lambda x: x.client.id == output.id, appointments)
                    )[0].dateTime,
                }
                if list(filter(lambda x: x.client.id == output.id, appointments)) != []
                else None,
            }
            for output in users
        ]
        return Response(output)
