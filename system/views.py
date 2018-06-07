from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from system.models import Station, Package
from system.serializers import StationSerializer, PackageSerializer

@csrf_exempt
def stations(request):
    if request.method == 'GET':
        stations = Station.objects.all()
        ser = StationSerializer(stations, many=True)
        return JsonResponse(ser.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        ser = StationSerializer(data=data)
        if ser.is_valid():
            ser.save()
            return JsonResponse(ser.data, status=201)
        else:
            return JsonResponse(ser.errors, status=400)
    else:
        return HttpResponse(500)

@csrf_exempt
def get_station(request, pk):
    try:
        station = Station.objects.get(pk=pk)
    except Station.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        ser = StationSerializer(station)
        return JsonResponse(ser.data)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        ser = StationSerializer(station, data=data)
        if ser.is_valid():
            ser.save()
            JsonResponse(ser.data)
        else:
            return JsonResponse(ser.errors, status=400)
    elif request.method == 'DELETE':
        station.delete()
        return HttpResponse(status=204)

