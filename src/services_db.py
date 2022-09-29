from pyexpat import model
from sqlalchemy.orm import Session
import schemas
import models


def insert_message(
    db: Session,
    message: str,
    url: str,
    year: str,
    month: str,
    day: str,
    hour: str,
    minuts: str,
    rrss: str,
    id: str,
):
    date = f"{year}-{month}-{day}T{hour}:{minuts}"
    message_insert = models.Messages(
        message=message,
        url=url,
        date=date,
        id_RRSS=rrss,
        id_job=id,
    )
    db.add(message_insert)
    db.commit()
    return "successfully"


def next_message(
    db: Session,
):
    next = (
        db.query(models.Messages, models.apscheduler_jobs)
        .filter(models.Messages.id_job == models.apscheduler_jobs.id)
        .all()
    )
    return next


def last_messages(
    limit: int,
    db: Session,
):
    last = (
        db.query(models.Messages)
        .order_by(desc(models.Messages.id_message))
        .limit(limit)
        .all()
    )
    return last
