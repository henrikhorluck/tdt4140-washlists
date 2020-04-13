from django.contrib.auth.models import Permission

from rest_framework import status
from rest_framework.reverse import reverse

from SIFUser.mixins import AuthTestMixin


class UserAPITest(AuthTestMixin):
    def setUp(self):
        super().setUp()
        self.user.user_permissions.add(Permission.objects.get(codename="add_user"))
        self.user.save()

    def test_unauthrized_user_cannot_create_user(self):
        self.user.user_permissions.remove(Permission.objects.get(codename="add_user"))
        self.user.save()
        url = reverse("user-list")
        response = self.client.post(
            url,
            {"id": 69, "username": "test_user", "password": "hunter2"},
            HTTP_AUTHORIZATION=self.auth,
        )

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_user_ignores_id(self):
        url = reverse("user-list")
        response = self.client.post(
            url,
            {"id": 69, "username": "test_user", "password": "hunter2"},
            HTTP_AUTHORIZATION=self.auth,
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["id"], 2)

    def test_create_user_does_not_return_password(self):

        url = reverse("user-list")
        response = self.client.post(
            url,
            {
                "username": "the_undertaker",
                "first_name": "the",
                "last_name": "undertaker",
                "email": "test@test.org",
                "password": "hunter2",
            },
            HTTP_AUTHORIZATION=self.auth,
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            response.data,
            {
                "id": 2,
                "username": "the_undertaker",
                "email": "test@test.org",
                "first_name": "the",
                "last_name": "undertaker",
                "dormroom": None,
                "groups": [],
                "manager_villages": [],
                "is_manager": False,
                "is_student": False,
                "is_superuser": False,
            },
        )
