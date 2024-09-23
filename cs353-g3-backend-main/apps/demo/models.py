# -*- coding: utf-8 -*-

# Create your models here.

from django.db import models


class Demo(models.Model):
    name = models.CharField(max_length=255, verbose_name='name')
