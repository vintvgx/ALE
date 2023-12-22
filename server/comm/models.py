from django.db import models
from storages.backends.s3boto3 import S3Boto3Storage
from users.models import CustomUserModel as User

class AvatarStorage(S3Boto3Storage):
    location = 'avatars'  # Specify the S3 bucket subdirectory

    
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
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='Users')
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='topics', default=1)
    # tags = models.ManyToManyField(Tag)

    def __str__(self):
        return self.title

    def get_cover_upload_path(instance, filename):
        # Update the path based on user's uid and blog post title
        return f'posts/{instance.user.id}/{instance.title}/cover/{filename}'

    # Set the upload_to argument to the custom function
    cover = models.ImageField(upload_to=get_cover_upload_path, null=True)
    
    def cover_exists(self):
        """
        Check if the cover image already exists in S3.
        """
        storage = AvatarStorage()
        cover_path = self.cover.name

        # Check if the file exists in S3
        return storage.exists(cover_path)

    def save(self, *args, **kwargs):
        """
        Override the save method to handle both File and URL scenarios.
        """
        if self.cover:
            if isinstance(self.cover, str) and not self.cover_exists():
                # If the cover is a URL and doesn't exist in S3, download it
                # and save as a File
                image_content = ContentFile(requests.get(self.cover).content)
                self.cover.save(self.cover.name, image_content, save=False)
            elif isinstance(self.cover, File) and not self.cover_exists():
                # If the cover is a File and doesn't exist in S3, upload it
                super().save(*args, **kwargs)

            # Delete the previous cover image if it has changed
            if self.pk and self.cover_exists():
                previous_blog_post = BlogPost.objects.get(pk=self.pk)
                previous_cover_path = previous_blog_post.cover.name

                # Check if the previous cover exists before attempting deletion
                if storage.exists(previous_cover_path):
                    storage.delete(previous_cover_path)

        # Continue with the regular save process
        super().save(*args, **kwargs)

    
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