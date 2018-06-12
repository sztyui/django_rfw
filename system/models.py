from django.db import models

# Create your models here.

class Station(models.Model):
    id = models.AutoField(primary_key=True)
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, blank=False, default='')
    weight = models.FloatField(default=1)
    price = models.FloatField(default=0)
    order = models.IntegerField()

    class Meta:
        ordering = ('order', )

