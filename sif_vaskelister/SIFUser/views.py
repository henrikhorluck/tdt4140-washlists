from django.contrib.auth.decorators import permission_required

from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, permissions
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView

from .models import User
from .serializer import UserSerializer


class UserDetails(RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @permission_required("SIFUser.change_user")
    def put(self, request, *args, **kwargs):
        super().put(self, request, *args, **kwargs)


class UserList(ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @permission_required("SIFUser.add_user")
    def post(self, request, *args, **kwargs):
        super.post(self, request, *args, **kwargs)
