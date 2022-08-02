FROM python:3.9 AS BUILDER
WORKDIR /app
COPY requirements requirements
RUN pip install --no-cache-dir --upgrade -r requirements
COPY ./src /app

CMD uvicorn main:app --host 0.0.0.0 --port 8080 