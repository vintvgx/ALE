from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from comm.views import UserViewSet, TopicViewSet, TagViewSet, BlogPostViewSet, CommentViewSet, LikeViewSet, FollowViewSet
from users.views import email_confirmation, reset_password_confirm

router = routers.DefaultRouter()

router.register(r'users', UserViewSet)
router.register(r'tags', TagViewSet)
router.register(r'topics', TopicViewSet)
router.register(r'blogposts', BlogPostViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'likes', LikeViewSet)
router.register(r'follows', FollowViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include(router.urls)),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('dj-rest-auth/registration/account-confirm-email/<str:key>/', email_confirmation),
    path('reset/password/confirm/<int:uid>/<str:token>/', reset_password_confirm, name="password_reset_confirm"),
]
