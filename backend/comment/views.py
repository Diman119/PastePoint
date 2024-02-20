from rest_framework import viewsets, mixins, permissions
from .models import Comment
from .serializers import CreateCommentSerializer
from datetime import datetime


class CreateCommentViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    serializer_class = CreateCommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(
            author=self.request.user,
            creation_dttm=datetime.now()
        )

        return super().perform_create(serializer)
