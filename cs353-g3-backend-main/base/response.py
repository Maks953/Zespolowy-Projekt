# -*- coding: utf-8 -*-

from rest_framework.response import Response


class APIResponse(Response):
    def __init__(self, code=None, msg='ok', data=None, status=None, headers=None, content_type=None, **kwargs):
        if not code:
            code = 200 if msg == 'ok' else 1000
        api_data = {
            'code': code,
            'msg': msg
        }
        if data:
            api_data['data'] = data
        api_data.update(kwargs)

        super().__init__(data=api_data, status=status, headers=headers, content_type=content_type)
