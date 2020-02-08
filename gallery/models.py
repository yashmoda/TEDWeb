from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Gallery(models.Model):
    description = models.CharField(max_length = 256)
    image = models.ImageField(null = True, blank = True, upload_to = '')
    year = models.IntegerField()
    is_deleted = models.BooleanField(default = False)
    modified = models.DateTimeField(auto_now = True , auto_now_add=False)
    created = models.DateTimeField(auto_now=False, auto_now_add=True)

def __str__(self):
    return self.name
