from django.db import models

# Create your models here.

SPONSORS_STATUS = ((1, 'Applied'), (2, 'Reviewing'), (3, 'Accepted'), (4, 'Rejected'))

class SponsorApplicationData(models.Model):
    name = models.Charfield(max_length = 150)
    domain = models.Charfield(max_length = 150)
    POC = models.Charfield(max_length = 150)
    ContactNo. = models.Charfield(max_length = 11)
    Email = models.Charfield(max_length = 100)
    Logo = models.ImageField()
    status = model.IntegerField(choices = SPONSORS_STATUS)
    created_at =
    updated_at =

    def __str__(self):
        return self.name

class SponsorData(models.Model):
    name = models.Charfield(max_length = 150)
    domain = model.Charfield(max_length = 150)
    Website = models.URLField(max_length = 256)
    Image = models.ImageField()
    is_previous = models.BooleanField()
    is_deleted = models.BooleanField(default = False)
    created_at =
    updated_at =

def __str__(self):
    return self.name
