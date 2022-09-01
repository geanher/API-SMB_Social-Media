import requests
import time
import constants

def facebook_posts(msg: str = None):
    hora = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
    response = requests.get('https://datassd.mykukun.com/dev/formatter.api/', verify=False)
    print(f'Publish {msg} at time : {hora}')
    msg_data = {
        'message':msg,
        'access_token': constants.FACEBOOK_TOKEN
        }

    url_post = f'https://graph.facebook.com/{constants.FACEBOOK_API_VERSION}/me/feed'
    print(url_post)
    response = requests.post(url_post, data=msg_data)
    print(f'{response.status_code} >> {response.text}')
    return response.json

def facebook_media_post(url: str):
    msg_data = {
        'url':url,
        'access_token': constants.FACEBOOK_TOKEN
        }

    url_post = f'https://graph.facebook.com/{constants.FACEBOOK_API_VERSION}/me/photos'
    response = requests.post(url_post, data=msg_data)
    return response.json

def facebook_profile(image_url: str):
    msg_data = {
    'picture':image_url,
    'access_token': constants.FACEBOOK_TOKEN
    }
    url_api = f'https://graph.facebook.com/{constants.FACEBOOK_API_VERSION}/me/picture'
    response = requests.post(url_api, data=msg_data)
    return response.json
