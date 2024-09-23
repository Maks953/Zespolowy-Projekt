# -*- coding: utf-8 -*-

# Create your views here.

from rest_framework.viewsets import ViewSet

from . import serializers


class DemoView(ViewSet):
    serializer_class = serializers.DemoSerializer

    pass
