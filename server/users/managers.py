# managers.py

from django.contrib.auth.models import BaseUserManager
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

class CustomUserManager(BaseUserManager):
    def email_validation(self, email):
        try:
            validate_email(email)
        except ValidationError:
            raise ValueError("You must provide a valid email")

    def create_user(self, email, username, first_name, last_name=None, password=None, avatar=None, **extra_fields):
        if not email:
            raise ValueError("This is a required field")
        if not username:
            raise ValueError("This is a required field")
        else:
            self.email_validation(email)
            clean_email = self.normalize_email(email)
        if not first_name:
            raise ValueError("This is a required field")

        user = self.model(
            email=clean_email,
            username=username,
            first_name=first_name,
            last_name=last_name,
            **extra_fields
        )

        user.set_password(password)

        if avatar:
            user.avatar = avatar

        user.save()
        return user
    
    def update_user(self, user, first_name=None, last_name=None, avatar=None, **extra_fields):
        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name
        if avatar:
            user.avatar = avatar

        for field, value in extra_fields.items():
            setattr(user, field, value)

        user.save()
        return user

    
    def create_superuser(self, email, username, first_name, last_name=None, password=None, **extra_fields):
        user = self.create_user(
            email=email,
            username=username,
            first_name=first_name,
            last_name=last_name,
            password=password,
            **extra_fields
        )
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return user
    
    
