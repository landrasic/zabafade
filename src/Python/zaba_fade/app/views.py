from django.shortcuts import render

# from rest_framework.views import APIView
# from rest_framework.response import Response
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
