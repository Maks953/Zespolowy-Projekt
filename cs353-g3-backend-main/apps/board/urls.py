# -*- coding: utf-8 -*-

from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path('lane/', views.LaneView.as_view()),
    path('card/', views.CardView.as_view()),
    path('', views.BoardView.as_view()),
    path('<path:pk>', views.BoardView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
