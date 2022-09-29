import requests
import time
import constants


def facebook_posts(msg: str = None):
    hora = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    msg_data = {"message": msg, "access_token": constants.FACEBOOK_TOKEN}

    url_post = (
        f"https://graph.facebook.com/{constants.FACEBOOK_API_VERSION}/me/feed"
    )
    response = requests.post(url_post, data=msg_data)
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
    return response.json


def facebook_profile(image_url: str):
    msg_data = {"picture": image_url, "access_token": constants.FACEBOOK_TOKEN}
    url_api = f"https://graph.facebook.com/{constants.FACEBOOK_API_VERSION}/me/picture"
    response = requests.post(url_api, data=msg_data)
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
