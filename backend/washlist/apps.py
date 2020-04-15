from django.apps import AppConfig


class WashlistConfig(AppConfig):
    name = "washlist"

    def ready(self):
        import washlist.signals.TemplateListItem
        import washlist.jobs
