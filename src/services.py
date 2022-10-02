import requests
import time
import constants
from datetime import datetime, timezone


def facebook_posts(msg: str):
    msg_data = {"message": msg, "access_token": constants.FACEBOOK_TOKEN}

    url_post = (
        f"https://graph.facebook.com/{constants.FACEBOOK_API_VERSION}/me/feed"
    )
    response = requests.post(url_post, data=msg_data)
    print(
        f"response request code: {response.status_code}, data {response.text}"
    )

    return response.json


def facebook_media_post(url: str, text: str):
    msg_data = {
        "url": url,
        "access_token": constants.FACEBOOK_TOKEN,
        "alt_text": text,
    }

    url_post = (
        f"https://graph.facebook.com/{constants.FACEBOOK_API_VERSION}/me/photos"
    )
    response = requests.post(url_post, data=msg_data)
    print(
        f"response request code: {response.status_code}, data {response.text}"
    )
    return response.json


def facebook_profile(image_url: str):
    msg_data = {"picture": image_url, "access_token": constants.FACEBOOK_TOKEN}
    url_api = f"https://graph.facebook.com/{constants.FACEBOOK_API_VERSION}/me/picture"
    response = requests.post(url_api, data=msg_data)
    print(
        f"response request code: {response.status_code}, data {response.text}"
    )
    return response.json


def instagram_media_post(url: str, text: str):
    msg_data = {
        "image_url": url,
        # "access_token": constants.INSTAGRAM_TOKEN,
        "caption": text,
    }

    url_post = (
        f"https://graph.facebook.com/{constants.FACEBOOK_API_VERSION}/me/media"
    )
    response = requests.post(url_post, data=msg_data)

    id = response.json.id
    msg_data_container = {
        "creation_id": id,
    }

    url_post_container = f"https://graph.facebook.com/{constants.FACEBOOK_API_VERSION}/me/media_publish"
    response_container = requests.post(
        url_post_container, data=msg_data_container
    )

    return response.json


def utc_to_local(utc_dt):
    utc_dt = datetime.fromisoformat(utc_dt[:-5])
    utc_dt = utc_dt.replace(tzinfo=timezone.utc).astimezone(tz=None)
    utc_dt = str(utc_dt).replace(" ", "T").replace(":00-04:00", "")
    utc_dt = utc_dt.replace("-0", "-").replace("T0", "T").replace(":0", ":")
    return utc_dt
