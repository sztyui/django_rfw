from django.conf.urls import url
from system import views

urlpatterns = [
    url(r'^', views.index)
    url(r'^stations/$', views.stations),
    url(r'^get_station/(?P<pk>[0-9]+)/$', views.get_station),
    url(r'^packages/$', views.packages),
    url(r'^get_package/(?P<pk>[0-9]+)/$', views.get_package)
]