from django.conf.urls import url

from home import views

urlpatterns = [
    url(r'^/', views.show_home),
    url(r'^speakers/', views.show_speakers),
    url(r'^team/', views.show_team)
]