from django.conf.urls import url
from system import views

urlpatterns = [
    url(r'^', views.stations),
    url(r'^stations/$', views.stations),
    url(r'^get_station/(?P<pk>[0-9]+)/$', views.get_station),
]