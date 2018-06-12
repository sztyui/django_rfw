from rest_framework import serializers
from system.models import Station

class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ('id', 'created', 'name', 'weight', 'price', 'order')