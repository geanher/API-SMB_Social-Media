from ast import Constant
import time
from fastapi import FastAPI, Depends
import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
import requests

import constants
import services
import services_db
import models
import schemas

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
        "Status": "Running",
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
    date_id = f"{year}{month}{day}T{hour}:{minuts}"
    job_id = app.scheduler.add_job(
        services.instagram_media_post,
        "date",
        run_date=datetime.datetime(year, month, day, hour, minuts, 0),
        args=[url_pic, text_pic, date_id],
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
        args=[msj],
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
def post_text_all(
    msj: str,
    day: int,
    month: int,
    year: int,
    hour: int,
    min: int,
    db: Session = Depends(get_db),
):
    post_text_fb(msj, day, month, year, hour, min, db)
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


@app.get("/stats/posts/facebook")
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


@app.get("/stats/post/facebook")
def post_stats_facebook(db: Session = Depends(get_db)):
    new_post_list = []
    url_post_list = f"https://graph.facebook.com/{constants.FACEBOOK_API_VERSION}/me/feed?limit=5&access_token={constants.FACEBOOK_TOKEN}"

    curl = requests.get(url_post_list)

    post_list = curl.json()["data"]
    for post in post_list:
        post_id = post["id"]
        created_time = post["created_time"]
        created_time = services.utc_to_local(created_time)
        url_feed_reaction = f"https://graph.facebook.com/{constants.FACEBOOK_API_VERSION}/{post_id}/insights?metric=post_reactions_by_type_total&access_token={constants.FACEBOOK_TOKEN}"
        response_reactions = requests.get(url_feed_reaction)
        reactions = response_reactions.json()["data"][0]["values"]
        try:
            url = ""
            message = post["message"]
        except:
            message: models.Messages = services_db.get_message_by_date(
                created_time, db
            )
            if message:
                url = message.url
                message = message.message

        new_post = {
            "Id": post["id"],
            "Message": message,
            "url": url,
            "Reaction": reactions,
            "created_time": post["created_time"],
        }
        new_post_list.append(new_post)
    return new_post_list
