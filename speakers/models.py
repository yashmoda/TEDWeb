from __future__ import unicode_literals

from django.db import models

# Create your models here.

SPEAKER_STATUS = ((1, 'Applied'), (2, 'Reviewing'), (3, 'Accepted'), (4, 'Rejected'))


class SpeakerApplicationData(models.Model):
    name = models.CharField(max_length=255)
    domain = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField()
    email = models.EmailField()
    phone_no = models.CharField(max_length=10)
    profile = models.FileField()
    status = models.IntegerField(choices=SPEAKER_STATUS)
    created_at =
    updated_at =

    def __str__(self):
        return self.name


class SpeakerData(models.Model):
    name = models.CharField(max_length=255)
    domain = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField()
    talk_link = models.URLField(null=True, blank=True)
    is_previous = models.BooleanField()
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_created=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name