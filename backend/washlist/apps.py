from django.apps import AppConfig


class WashlistConfig(AppConfig):
    name = "Washlist"

    def ready(self):
        import Washlist.signals.TemplateListItem
        import Washlist.jobs
