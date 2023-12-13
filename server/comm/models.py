from django.db import models
from storages.backends.s3boto3 import S3Boto3Storage
from users.models import CustomUserModel as User

class AvatarStorage(S3Boto3Storage):
    location = 'avatars'  # Specify the S3 bucket subdirectory

# class User(models.Model):
#     username = models.CharField(max_length=255)
#     email = models.EmailField(unique=True)
#     uid = models.CharField(max_length=100,  unique=True)
#     bio = models.CharField(max_length=1000)
#     avatar = models.ImageField(upload_to='avatars/', null=True)
#     # Other user-related fields (e.g., profile picture, bio)

#     def __str__(self):
#         return self.username
    
class Tag(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    # Other tag-related fields (e.g., description)

    def __str__(self):
        return self.name
    
class Topic(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='topics', default=1)
    # tags = models.ManyToManyField(Tag)

    def __str__(self):
        return self.title

    def get_cover_upload_path(instance, filename):
        # Update the path based on user's uid and blog post title
        return f'posts/{instance.author.uid}/{instance.title}/cover/{filename}'

    # Set the upload_to argument to the custom function
    cover = models.ImageField(upload_to=get_cover_upload_path, null=True)

    
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