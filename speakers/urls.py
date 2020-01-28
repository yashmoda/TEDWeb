from django.conf.urls import url
from speakers import views

urlpatterns = [
    url(r'^speaker_application', views.speaker_application, name="speaker_application"),
    url(r'^previous_speakers', views.previous_speakers, name="previous_speakers"),
    url(r'^current_speakers', views.current_speakers, name="current_speakers"),
    url(r'^speaker_details', views.speaker_details, name="speaker_details")
]