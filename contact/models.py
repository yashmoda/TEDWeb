from django.db import models

# Create your models here.
class Queries(models.Model):
    name= models.CharField(max_length= 255)
    phone= models.CharField(max_length = 10)
    query= models.TextField()
    status= models.BooleanField(default=False)
    def __str__(self):
        return self.name


