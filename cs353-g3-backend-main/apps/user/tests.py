# -*- coding: utf-8 -*-

import os
from django.test import TestCase
from django.core.mail import send_mail

# Create your tests here.


os.environ['DJANGO_SETTINGS_MODULE'] = 'bootstrap.settings'

if __name__ == '__main__':
    print(send_mail(
        'hello',
        '1234',
        'shiqiayu@gmail.com',
        ['yi.zhang.2023@mumail.ie'],
    ))
