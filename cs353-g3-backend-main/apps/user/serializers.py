# -*- coding: utf-8 -*-

from django.core.cache import cache
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework_jwt.serializers import jwt_payload_handler, jwt_encode_handler

from .models import User


class SignupSerializer(serializers.ModelSerializer):
    code = serializers.CharField(max_length=4, min_length=4, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'code',  'username', 'password']
        extra_kwargs = {
            'username': {'read_only': True},
            'password': {'max_length': 18, 'min_length': 3}
        }

    def validate(self, attrs):
        email = attrs.get('email')
        code = attrs.get('code')
        key = f'signup_cache_{email}'
        cache_code = cache.get(key)
        if code == cache_code:
            attrs['username'] = email
            attrs.pop('code')
            return attrs
        else:
            raise ValidationError(detail='code error')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()

    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {
            'id': {'read_only': True},
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        user = User.objects.filter(username=username).first()
        if not user:
            raise ValidationError('The account does not exist')
        if not user.check_password(password):
            raise ValidationError('Password Error')

        token = self._get_token(user)

        self.context['token'] = token
        self.context['user'] = user

        return attrs

    def _get_token(self, user):
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)

        return token
