from __future__ import unicode_literals

from django.db import models

# Create your models here.

SPEAKER_STATUS = ((1, 'Applied'), (2, 'Reviewing'),
                  (3, 'Accepted'), (4, 'Rejected'),
                  (5, 'Previous'), (6, 'Current'))


class SpeakerApplicationData(models.Model):
    name = models.CharField(max_length=255)
    domain = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='images/speakers/')
    email = models.EmailField()
    phone_no = models.CharField(max_length=10)
    profile = models.FileField()
    status = models.IntegerField(choices=SPEAKER_STATUS)
    previous_talk_link = models.URLField()
    modified = models.DateTimeField(auto_now=True, auto_now_add=False)
    created = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.name
