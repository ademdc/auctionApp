"""auction URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url,include
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns
from auctions import views

from auctions import endpoints

urlpatterns = [
    url(r'^api/', include(endpoints)),
    url(r'^admin/', admin.site.urls),
    url(r'^users/', views.UsersList.as_view()),
    url(r'^auctions/', views.AuctionList.as_view()),
    url(r'^auction/(?P<id>[0-9]+)', views.AuctionBid.as_view()),
    url(r'^logout/', views.Logout.as_view()),
    url(r'^api/auth/', include('knox.urls')),

]

urlpatterns = format_suffix_patterns(urlpatterns)