# -*- coding: utf-8 -*-

from django.core.mail import send_mail


def send_email(subject, message, recipient_list):
    send_mail(subject=subject,
              message=message,
              from_email='shiqiayu@gmail.com',
              recipient_list=recipient_list)
