from __future__ import unicode_literals

from django.db import models

# Create your models here.


IMAGE_TYPE = ((1, 'Portrait'), (2, 'Landscape'))

class Gallery(models.Model):
    description = models.CharField(max_length = 256)
    image = models.ImageField(null = True, blank = True, upload_to = '')
    year = models.IntegerField()
    ImgType = models.IntegerField(choices=IMAGE_TYPE, default=1)
    is_deleted = models.BooleanField(default = False)
    modified = models.DateTimeField(auto_now = True , auto_now_add=False)
    created = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.year
