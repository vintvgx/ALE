# serializers.py

from rest_framework import serializers
from .models import User, Tag, BlogPost, Comment, Like, Follow

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
    # def create(self, validated_data):
    #     # Extract the avatar data from the validated data
    #     avatar_data = validated_data.pop('avatar', None)

    #     # Create the user without the avatar field
    #     user = User.objects.create(**validated_data)

    #     # If avatar data is present, save it separately
    #     if avatar_data:
    #         user.avatar.save(avatar_data.name, avatar_data)

    #     return user

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = '__all__'
