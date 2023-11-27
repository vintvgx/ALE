
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from comm.views import UserViewSet, TagViewSet, BlogPostViewSet, CommentViewSet, LikeViewSet, FollowViewSet

router = routers.DefaultRouter()

router.register(r'users', UserViewSet)
router.register(r'tags', TagViewSet)
router.register(r'blogposts', BlogPostViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'likes', LikeViewSet)
router.register(r'follows', FollowViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include(router.urls)),
]
