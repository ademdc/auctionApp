from django.conf.urls import include, url
from rest_framework import routers

from .api import AuctionViewSet, RegistrationAPI, LoginAPI, UserAPI, LogoutAPI
#from .views import Logout
router = routers.DefaultRouter()
router.register('auctions', AuctionViewSet)

urlpatterns = [
    #url("^", include(router.urls)),
    url("^auth/register/$", RegistrationAPI.as_view()),
    url("^auth/login/$", LoginAPI.as_view()),
    url("^auth/user/$", UserAPI.as_view()),
    url("^auth/logout/$", LogoutAPI.as_view()),

]