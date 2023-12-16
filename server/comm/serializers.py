# serializers.py

from rest_framework import serializers
from .models import Tag, BlogPost, Comment, Like, Follow, Topic
from users.models import CustomUserModel as User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'
        
class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'
    
class BlogPostSerializer(serializers.ModelSerializer):
    topic = TopicSerializer()
    user = UserSerializer(read_only=True)  # Mark the author field as read-only

    class Meta:
        model = BlogPost
        fields = '__all__'


    def create(self, validated_data):
        # Extract the nested data
        topic_data = validated_data.pop('topic')

        # Create or get the related objects
        topic_instance, _ = Topic.objects.get_or_create(**topic_data)

        # Get the current user from the request
        user = self.context['request'].user

        # Update the validated_data with the related instances and user
        # validated_data['author'] = user
        validated_data['topic'] = topic_instance

        # Create the BlogPost instance
        blog_post = BlogPost.objects.create(**validated_data)
        return blog_post



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
