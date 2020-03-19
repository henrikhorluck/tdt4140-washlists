from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger

from Dormroom.models import Dormroom


def reset_washlists():
    for dormroom in Dormroom.objects.all():
        for todo in dormroom.items.filter(completed=True):
            todo.completed = False
            todo.save()


scheduler = BackgroundScheduler()

scheduler.add_job(
    reset_washlists,
    id="washlist_clear",
    trigger=CronTrigger(day_of_week="thu", hour=13, minute=44, second=30),
)

scheduler.start()
