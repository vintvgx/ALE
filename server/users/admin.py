from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUserModel

class UserAdminCustom(UserAdmin):
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (("Personal info"), {"fields": ("username", "first_name", "last_name", "avatar")}),
        (
            ("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username", "first_name", "last_name", "email", "password1", "password2", "avatar",
                ),
            },
        ),
    )
    list_display = ("username", "first_name", "last_name", "date_joined", "avatar", "is_staff",)
    search_fields = ("username", "first_name", "last_name", "email")
    ordering = ("username",)
    readonly_fields = ['date_joined', 'last_login']
    list_filter = ("is_active",)  # Add a valid field for list_filter

admin.site.register(CustomUserModel, UserAdminCustom)
