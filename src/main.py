from fastapi import FastAPI
import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore

import constants
import services

app = FastAPI()

app.scheduler = BackgroundScheduler()
jobstores = {
    'default': SQLAlchemyJobStore(url=f'mysql+pymysql://{constants.MYSQL_USER}:{constants.MYSQL_PASS}@mysql-smb/{constants.MYSQL_NAME}')
    # Sqlalchemyjobstore especifica enlace de almacenamiento
}
app.scheduler.configure(jobstores=jobstores)

app.scheduler.start()
app.home = 'HOME'
app.version = '0.0.1'
app.update_date = 'Ago 14 2022'
app.dev = 'Gerly Andres Hernandez'


@app.get("/")
def home_page():
    return {"page": app.home}


@app.get("/status-api")
def status_api():
    return {
        "Status": "Active",
        "Version": app.version,
        "update date": app.update_date,
        "dev" : app.dev
    }

@app.get("/view_messages/next")
def view_next_messages():
    return {
    }
@app.get("/view_messages/history")
def view_history_messages():
    return {
    }

@app.get("/view_messages/status")
def view_status_messages():
    return {
    }

@app.get("/post/media/fb")
def post_media_fb(url_pic: str, day: int, month: int, hour: int , min: int = '0'):
    job_id = app.scheduler.add_job(services.facebook_media_post, 'date', run_date=datetime.datetime(2022, month, day, hour, min, 0),args=[url_pic, ])
    return "pass"

@app.get("/post/media/ig")
def post_media_ig():
    pass

@app.get("/post/media/all")
def post_media_all():
    pass

@app.get("/post/text/fb")
def post_text_fb(msj: str, day: int, month: int, hour: int , min: int = '0'):
    job_id = app.scheduler.add_job(services.facebook_posts, 'date', run_date=datetime.datetime(2022, month, day, hour, min, 0), args=[msj, ])
    return "pass"

@app.get("/post/text/all")
def post_text_all(msj :str, day: int, month: int, hour: int , min: int = '0'):
    post_text_fb(msj, day, month, hour, min)
    return "pass"

@app.get("/change/profile-picture/fb")
def change_profile_picture(image_url: str, day: int, month: int, hour: int , min: int = '0'):
    job_id = app.scheduler.add_job(services.facebook_profile, 'date', run_date=datetime.datetime(2022, month, day, hour, min, 0), args=[msj, ])
    return "pass"

@app.get("/change/profile-picture/all")
def change_all_profile_picture(image_url :str, day: int, month: int, hour: int , min: int = '0'):
    change_profile_picture(image_url, day, month, hour, min)
    pass

@app.get("/stats/general")
def general_stats(image_url :str):
    pass

@app.get("/stats/post")
def post_stats():
    pass
    
## no
@app.get("/get-job/")
def publish():
    for x in app.scheduler.get_jobs():
        print(f'>> {x}')
    return 'return list'



    