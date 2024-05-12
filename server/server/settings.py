

from datetime import timedelta
from pathlib import Path
from decouple import config
import os
import dj_database_url
import environ

env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False)
)


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Take environment variables from .env file
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-_%0qfn(5&1(n3an2#-nm5_p90uk=96s5zck6-d037077%s-$bs"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["https://aletheia-5c7905ea51aa.herokuapp.com/",
                 '127.0.0.1', 'localhost:8000', '*']


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "comm",
    # corsheader
    "corsheaders",
    # rest-framework
    'rest_framework',
    'rest_framework.authtoken',
    # dj-rest-auth
    'dj_rest_auth.registration',
    'dj_rest_auth',
    # allauth
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    # allauth social accounts
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    # local app
    "users",
]

# rest-framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'dj_rest_auth.jwt_auth.JWTCookieAuthentication',
    )
}

# simple jwt
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(hours=2),
}

# rest auth
REST_AUTH = {
    'USE_JWT': True,
    'JWT_AUTH_COOKIE': 'access',
    'JWT_AUTH_REFRESH_COOKIE': 'refresh',
    'JWT_AUTH_HTTPONLY': True,
    'SESSION_LOGIN': False,
    'OLD_PASSWORD_FIELD_ENABLED': True,
}

MIDDLEWARE = [
    # cors header middleware
    "corsheaders.middleware.CorsMiddleware",
    # all auth middleware
    'allauth.account.middleware.AccountMiddleware',
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
]
CORS_ALLOW_CREDENTIALS = True

ROOT_URLCONF = "server.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "server.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases
MYSQL_PASSWORD = env('DB_PASSWORD')


# Database
DATABASES = {
    'default': dj_database_url.config(
        default='mysql://bf8dcc9f2c5ad4:8b0c8365@us-cluster-east-01.k8s.cleardb.net/heroku_09edf888fd01591',
        conn_max_age=0,
    )
}

DATABASE_POOL_ARGS = {
    'max_overflow': 10,
    'pool_size': 5,
    'recycle': 300,
}
# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


STORAGES = {
    # media file (image) management
    "default": {
        "BACKEND": "storages.backends.s3boto3.S3StaticStorage",
    },

    # css and json management
    "staticfiles": {
        "BACKEND": "storages.backends.s3boto3.S3StaticStorage",
    }
}


AWS_S3_ACCESS_KEY_ID = env('AWS_ACCESS_KEY')
AWS_S3_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = env('AWS_STORAGE_BUCKET_NAME')
AWS_S3_REGION_NAME = env('AWS_S3_REGION_NAME')
AWS_QUERYSTRING_EXPIRE = 600

# AWS_S3_CUSTOM_DOMAIN="https://d2t1gk8m0oqna0.cloudfront.net"


# todo Resolve private key error / create RSA key with public key + private key access
# AWS_CLOUDFRONT_KEY_ID=env.str("AWS_CLOUDFRONT_KEY_ID").strip()
# AWS_CLOUDFRONT_KEY=env.str("AWS_CLOUDFRONT_KEY", multiline=True).encode('ascii').strip()


# allauth
SITE_ID = 1
# Set the username field for Allauth
ACCOUNT_USER_MODEL_USERNAME_FIELD = "username"
ACCOUNT_USERNAME_REQUIRED = True
ACCOUNT_EMAIL_REQUIRED = True  # using email as authenticaiton
ACCOUNT_AUTHENTICATION_METHOD = 'username'
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'


# Email Configuration
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = env("EMAIL")
EMAIL_HOST_PASSWORD = env("EMAIL_PASSWORD")

# Custom user model
AUTH_USER_MODEL = "users.CustomUserModel"
