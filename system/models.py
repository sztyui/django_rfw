from django.db import models

# Create your models here.

class Station(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, blank=False, default='')
    weight = models.FloatField(default=1)
    price = models.FloatField(default=0)
    order = models.AutoField(primary_key=True)

    class Meta:
        ordering = ('order', )

class Package(models.Model):
    weight = models.FloatField(default=1)
    price = models.FloatField(default=0)
