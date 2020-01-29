from django.conf.urls import url

from sponsors import views

urlpatterns = [
    url(r'^sponsor_application/', views.sponsors_application, name='sponsors_application'),
    url(r'^previous_sponsors/', views.previous_sponsors, name='previous_sponsors'),
    url(r'^current_sponsors/', views.current_sponsors, name='current_sponsors')
]