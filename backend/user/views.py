from rest_framework import viewsets, mixins, views, response
from .models import User
from .serializers import CreateUserSerializer, UserSerializer


class CreateUserViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    serializer_class = CreateUserSerializer
    queryset = User.objects.all()

    def perform_create(self, serializer):
        user = User.objects.create_user(**serializer.validated_data)
        user.set_password(serializer.validated_data['password'])
        return user


class UserCurrent(views.APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return response.Response(serializer.data)

    def patch(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return response.Response(status=201, data=serializer.data)
        return response.Response(status=400, data="wrong parameters")
