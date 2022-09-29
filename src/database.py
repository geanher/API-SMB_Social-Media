from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import constants

# connection to DB (orm = SQLAlchemy)
# eng = (
#     "mysql+pymysql://"
#     + constants.MYSQL_USER
#     + ":"
#     + constants.MYSQL_PASS
#     + "@"
#     + constants.MYSQL_NAME_HOST
#     + "/"
#     + constants.MYSQL_NAME
# )

eng = constants.URL_DB
engine = create_engine(eng)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
