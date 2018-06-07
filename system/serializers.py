from rest_framework import serializers
from system.models import Station, Package

class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ('created', 'name', 'weight', 'price', 'order')

class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = ('weight', 'price')