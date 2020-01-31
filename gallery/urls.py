from django.conf.urls import url

from gallery import views

urlpatterns = [
    url(r'^home/', views.show_home, name='home'),
    url(r'^gallery_feed/', views.gallery_feed, name='gallery_feed')

]    