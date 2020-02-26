from django.conf.urls import url

from gallery import views

urlpatterns = [
    url(r'^gallery_feed/', views.gallery_feed, name='gallery_feed'),
    url(r'^show_gallery/', views.show_gallery, name='show_gallery')
]    
