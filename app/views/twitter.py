from flask import Blueprint, render_template, make_response, jsonify, request, current_app, config, Config
from flask_cors import CORS
import csv
import re
import json
import os
import pandas as pd
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from sklearn.feature_extraction.text import CountVectorizer
import tweepy

vader = SentimentIntensityAnalyzer()

twitter = Blueprint('twitter', __name__)
CORS(twitter)


@twitter.route('/twitter', methods = ['GET', 'POST'])
# route handling
def return_tweets():

    t = []
    df = pd.DataFrame()

    query = request.get_json()
    # Authenticate to Twitter
    auth = tweepy.AppAuthHandler(current_app.config['API_KEY'], current_app.config['API_SECRET'])
    api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)
    tweets = tweepy.Cursor(api.search, tweet_mode='extended', lang='en', q=query).items(10)



    for tweet in tweets:
        # if tweets is None:
        #     t.append({'text':'','profile_pic': '','user_screen_name':
        #     '','created_at': ''})
        # else:
        t.append({'text': tweet.full_text,'profile_pic': tweet.user.profile_image_url,'user_screen_name':
        tweet.user.screen_name,'created_at': tweet.created_at})
        df['text'] = [tweet.full_text.encode('utf-8')]
        df.to_csv('/Users/rachel/Desktop/Code/sentiment-analysis/app/views/twitter_text.csv', mode='a')
        print(df)

    
    return jsonify({'tweets': t})


@twitter.route('/twitter/words', methods = ['GET'])
def twitter_analyze():
    return jsonify('meow')
    

@twitter.route('/twitter/ngrams', methods = ['GET'])
def twitter_ngrams_analyze():
    return jsonify('meow')


@twitter.errorhandler(404)
def not_found():
    """Page not found."""
    return make_response(render_template("404.html"), 404)


@twitter.errorhandler(400)
def bad_request():
    """Bad request."""
    return make_response(render_template("400.html"), 400)


@twitter.errorhandler(500)
def server_error():
    """Internal server error."""
    return make_response(render_template("500.html"), 500)
