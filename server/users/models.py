from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager

# Create your models here.
class CustomUserModel(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(("Email Address"), unique=True, max_length=255)
    username = models.CharField(("Username"), unique=True, max_length=50)
    first_name = models.CharField(("First Name"), max_length=100)
    last_name = models.CharField(("Last Name"), max_length=100, null=True, blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ['first_name', 'email']

    objects = CustomUserManager()

    class Meta:
        verbose_name = ("User")
        verbose_name_plural = ("Users")

    def __str__(self):
        return self.email