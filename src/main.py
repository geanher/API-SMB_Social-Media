from fastapi import FastAPI
import time
import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore

import constants

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
app.update_date = 'Ago 01 2022'


@app.get("/")
def home_page():
    return {"page": app.home}


@app.get("/status-api")
def status_api():
    return {
        "Status": "Active",
        "Version": app.version,
        "update date": app.update_date,

    }


@app.get("/post/")
def publish(msj: str, hour: int, min: int, day: int, month: int):
    job_id = app.scheduler.add_job(publicar, 'date', run_date=datetime.datetime(2022, month, day, hour, min, 0),
                                   args=[msj, ])
    return 'job_id.id'


@app.get("/get-job/")
def publish():
    for x in app.scheduler.get_jobs():
        print(f'>> {x}')
    return 'return list'


def publicar(msg: str = 'Default msj'):
    hora = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
    print(f'Publish {msg} at time : {hora}')
