from rest_framework import viewsets, permissions, mixins
from .models import Paste
from .serializers import PasteListSerializer, SinglePasteSerializer, CreatePasteSerializer
from datetime import datetime


class FavoritesViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PasteListSerializer
    queryset = Paste.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.favorites.all()


class MyPastesViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PasteListSerializer
    queryset = Paste.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Paste.objects.filter(author=self.request.user.id)


class SinglePasteViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SinglePasteSerializer
    queryset = Paste.objects.all()


class CreatePasteViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    serializer_class = CreatePasteSerializer
    queryset = Paste.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(
            author=self.request.user,
            creation_dttm=datetime.now()
        )

        return super().perform_create(serializer)
