# -*- coding: utf-8 -*-

from rest_framework.views import exception_handler
from .response import APIResponse


def common_exception_handler(exc, context):
    ret = exception_handler(exc, context)

    if not ret:
        if isinstance(exc, KeyError):
            return APIResponse(msg='key error')
        return APIResponse(msg=f'{str(exc)}')
    else:
        msg = ''
        for k, v in ret.data.items():
            msg += k
            msg += str(v[0].replace('Ensure this field', ''))

        return APIResponse(msg=msg)
