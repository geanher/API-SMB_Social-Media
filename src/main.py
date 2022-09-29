from ast import Constant
from fastapi import FastAPI, Depends
import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore

import constants
import services
import services_db
import models

import database
from sqlalchemy.orm import Session

# database.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

app.scheduler = BackgroundScheduler()
jobstores = {"default": SQLAlchemyJobStore(url=constants.URL_DB)}
app.scheduler.configure(jobstores=jobstores)

app.scheduler.start()
app.home = "HOME"
app.version = "0.0.1"
app.update_date = "SEP 28 2022"
app.dev = "Gerly Andres Hernandez"

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home_page():
    return {"page": app.home}


@app.get("/status-api")
def status_api():
    return {
        "Status": "Active",
        "Version": app.version,
        "update date": app.update_date,
        "dev": app.dev,
    }


@app.get("/view_messages/next")
def view_next_messages(db: Session = Depends(get_db)):
    next = services_db.next_message(db)
    return next


@app.get("/view_messages/history")
def view_history_messages(
    limit: int = 15,
    db: Session = Depends(get_db),
):
    last = services_db.last_messages(limit, db)
    return last


@app.get("/view_messages/status")
def view_status_messages():
    return {}


@app.get("/post/media/fb")
def post_media_fb(
    url_pic: str,
    text_pic: str,
    day: int,
    month: int,
    year: int,
    hour: int,
    minuts: int,
    db: Session = Depends(get_db),
):
    job_id = app.scheduler.add_job(
        services.facebook_media_post,
        "date",
        run_date=datetime.datetime(year, month, day, hour, minuts, 0),
        args=[url_pic, text_pic],
    )

    services_db.insert_message(
        db, text_pic, url_pic, year, month, day, hour, minuts, "1", job_id.id
    )
    return "pass"


@app.get("/post/media/ig")
def post_media_ig(
    url_pic: str,
    text_pic: str,
    day: int,
    month: int,
    year: int,
    hour: int,
    minuts: int,
    db: Session = Depends(get_db),
):
    job_id = app.scheduler.add_job(
        services.instagram_media_post,
        "date",
        run_date=datetime.datetime(year, month, day, hour, minuts, 0),
        args=[url_pic, text_pic],
    )
    services_db.insert_message(
        db, text_pic, url_pic, year, month, day, hour, minuts, "2", job_id.id
    )


@app.get("/post/media/all")
def post_media_all():
    pass


@app.get("/post/text/fb")
def post_text_fb(
    msj: str,
    day: int,
    month: int,
    year: int,
    hour: int,
    minuts: int,
    db: Session = Depends(get_db),
):
    job_id = app.scheduler.add_job(
        services.facebook_posts,
        "date",
        run_date=datetime.datetime(year, month, day, hour, minuts, 0),
        args=[
            msj,
        ],
    )

    services_db.insert_message(
        db,
        msj,
        "DOES NOT APPLY",
        year,
        month,
        day,
        hour,
        minuts,
        "1",
        job_id.id,
    )
    return "pass"


@app.get("/post/text/all")
def post_text_all(msj: str, day: int, month: int, hour: int, min: int):
    post_text_fb(msj, day, month, hour, min)
    return "pass"


@app.get("/change/profile-picture/fb")
def change_profile_picture(
    image_url: str,
    day: int,
    month: int,
    year: str,
    hour: int,
    minuts: int,
    db: Session = Depends(get_db),
):
    job_id = app.scheduler.add_job(
        services.facebook_profile,
        "date",
        run_date=datetime.datetime(year, month, day, hour, minuts, 0),
        args=[
            image_url,
        ],
    )
    services_db.insert_message(
        db,
        "",
        image_url,
        year,
        month,
        day,
        hour,
        minuts,
        "1",
        job_id.id,
    )
    return "pass"


@app.get("/change/profile-picture/all")
def change_all_profile_picture(
    image_url: str,
    day: int,
    month: int,
    year: str,
    hour: int,
    minuts: int,
):
    change_profile_picture(image_url, day, month, year, hour, minuts)
    pass


@app.get("/stats/general")
def general_stats(image_url: str):
    pass


@app.get("/stats/post")
def post_stats():
    pass


@app.get("/stop_job")
def stop_job(id: str):
    result = "undefined"
    try:
        app.scheduler.remove_job(id)
        result = "succesfull"
    except:
        result = "unsuccesfull"
    return result
