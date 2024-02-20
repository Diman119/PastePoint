from rest_framework import serializers
from .models import Paste
from user.serializers import BasicUserSerializer
from comment.serializers import ViewCommentSerializer


class PasteListSerializer(serializers.ModelSerializer):
    author = BasicUserSerializer()

    def to_representation(self, instance):
        representation = super(PasteListSerializer, self).to_representation(instance)
        representation['creation_dt'] = instance.creation_dttm.strftime('%d.%m.%Y')
        return representation

    class Meta:
        model = Paste
        fields = ['id', 'author', 'name']


class SinglePasteSerializer(PasteListSerializer):
    comment_set = ViewCommentSerializer(many=True)

    class Meta:
        model = Paste
        fields = ['id', 'author', 'name', 'content', 'language', 'comment_set']


class CreatePasteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paste
        fields = ['name', 'content', 'language']
