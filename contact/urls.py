from django.conf.urls import url

from contact import views

urlpatterns = [
    url(r'^contact_us/', views.contact_us)
]