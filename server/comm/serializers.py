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
        fields = ["id"]


class TopicCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id']


class TopicListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'


class BlogPostListSerializer(serializers.ModelSerializer):
    topic = TopicListSerializer()
    user = UserSerializer()

    class Meta:
        model = BlogPost
        fields = '__all__'


class BlogPostSerializer(serializers.ModelSerializer):
    # Use PrimaryKeyRelatedField to expect an ID
    topic = serializers.PrimaryKeyRelatedField(queryset=Topic.objects.all())
    # Mark the author field as read-only
    author = UserSerializer(read_only=True)

    class Meta:
        model = BlogPost
        fields = '__all__'

    def create(self, validated_data):
        # Get the user_id from the validated_data, or default to the currently authenticated user's id
        user_id = validated_data.pop('user_id', None)
        if user_id is None:
            user = self.context['request'].user
        else:
            user = User.objects.get(id=user_id)

        # Extract the nested data
        topic_instance = validated_data.pop('topic')

        # Create the BlogPost instance with the topic and author set
        blog_post = BlogPost.objects.create(
            topic=topic_instance, **validated_data)

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
