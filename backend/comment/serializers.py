from rest_framework import serializers
from .models import Comment
from user.serializers import BasicUserSerializer


class CreateCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['paste', 'text']


class ViewCommentSerializer(serializers.ModelSerializer):
    author = BasicUserSerializer()

    def to_representation(self, instance):
        representation = super(ViewCommentSerializer, self).to_representation(instance)
        representation['creation_dt'] = instance.creation_dttm.strftime('%d.%m.%Y')
        return representation

    class Meta:
        model = Comment
        fields = ['id', 'author', 'text']
