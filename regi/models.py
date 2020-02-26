from django.db import models

# Create your models here.
class Registration(models.Model):
    name= models.CharField(max_length = 255)
    phone= models.CharField(max_length = 10)
    email_id = models.CharField(max_length = 255)

    def __str__(self):
        return self.name