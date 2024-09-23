# -*- coding: utf-8 -*-
import os

from django.core.cache import cache
from django.core.mail import send_mail
from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action

from base.response import APIResponse
from utils.auxiliary import random_number_code
from . import serializers


class UserView(ViewSet):

    @action(methods=['post'], detail=False)
    def code(self, request, *args, **kwargs):
        email = request.data.get('email')

        code = random_number_code()
        result = send_mail(subject='Activation Code for your account',
                           message=f'Please Check Out Your Signup Code: {code}',
                           from_email=os.environ.get('EMAIL_HOST_USER'),
                           recipient_list=[email]
                           )
        key = f'signup_cache_{email}'
        cache.set(key, code, 180)

        if result:
            return APIResponse(msg='ok')
        else:
            return APIResponse(code=1000, msg='send fail')

    @action(methods=['post'], detail=False)
    def signup(self, request, *args, **kwargs):
        serializer = serializers.SignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return APIResponse(msg='ok')

    @action(methods=['post'], detail=False)
    def login(self, request, *args, **kwargs):
        serializer = serializers.LoginSerializer(data=request.data)

        if serializer.is_valid():
            token = serializer.context['token']
            return APIResponse(msg='ok', token=token)
        else:
            return APIResponse(code=1000, msg=serializer.errors['non_field_errors'][0])
