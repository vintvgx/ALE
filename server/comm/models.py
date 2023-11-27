from django.db import models
from storages.backends.s3boto3 import S3Boto3Storage

class AvatarStorage(S3Boto3Storage):
    location = 'avatars'  # Specify the S3 bucket subdirectory

class User(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    uid = models.CharField(max_length=100,  unique=True)
    bio = models.CharField(max_length=1000)
    avatar = models.ImageField(upload_to='avatars/', null=True)
    # Other user-related fields (e.g., profile picture, bio)

    def __str__(self):
        return self.username
    
class Tag(models.Model):
    name = models.CharField(max_length=255)
    # Other tag-related fields (e.g., description)

    def __str__(self):
        return self.name

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()  # Store content in a structured format (e.g., JSON)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    tags = models.ManyToManyField(Tag)

    def __str__(self):
        return self.title
    
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} - {self.created_at}'
    
class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='likes')
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} likes {self.post.title}'
    
    
class Follow(models.Model):
    follower = models.ForeignKey(User, related_name='follower', on_delete=models.CASCADE)
    following = models.ForeignKey(User, related_name='following', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.follower.username} follows {self.following.username}'