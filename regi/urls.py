from django.conf.urls import url
from regi import views

urlpatterns = [
    url(r'^register', views.registration, name="registration")
]