import string
from sqlalchemy import Column, Integer, String

# from src.database import Base
import database


class RRSS(database.Base):
    __tablename__ = "RRSS"
    id_RRSS = Column(Integer(), primary_key=True, index=True)
    name = Column(String)


class Messages(database.Base):
    __tablename__ = "Messages"
    id_message = Column(Integer(), primary_key=True, index=True)
    message = Column(String)
    url = Column(String, index=True)
    date = Column(String)
    id_RRSS = Column(String)
    id_job = Column(String)
    created_at = Column(String)
    updated_at = Column(String)


class apscheduler_jobs(database.Base):
    __tablename__ = "apscheduler_jobs"
    id = Column(String, primary_key=True, index=True)
    next_run_time = Column(String)
