from django.utils import timezone
from django.utils.timezone import now

from oauth2_provider.admin import AccessToken, Application
from rest_framework.test import APITestCase

from SIFUser.models import User


class AuthTestMixin(APITestCase):
    def setUp(self):
        self.user = User.objects.create(email="test@example.com", password="hunter2")
        self.application = Application.objects.create(
            name="Test Application",
            redirect_uris="http://localhost",
            user=self.user,
            client_type=Application.CLIENT_CONFIDENTIAL,
            authorization_grant_type=Application.GRANT_AUTHORIZATION_CODE,
        )

    @property
    def auth(self):
        AccessToken.objects.create(
            application=self.application,
            token="123456789",
            scope="read write",
            user=self.user,
            expires=now() + timezone.timedelta(minutes=10),
        )
        return "Bearer 123456789"
