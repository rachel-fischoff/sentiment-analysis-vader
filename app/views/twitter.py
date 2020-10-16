from flask import Blueprint, render_template, make_response, jsonify, request, current_app
from flask_cors import CORS
import csv
import re
import pandas as pd
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from sklearn.feature_extraction.text import CountVectorizer
import tweepy
from dotenv import load_dotenv

import os

load_dotenv()

API_KEY = os.getenv("API_KEY")
API_SECRET = os.getenv("API_SECRET")
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
TOKEN_SECRET = os.getenv("TOKEN_SECRET")


vader = SentimentIntensityAnalyzer()

twitter = Blueprint('twitter', __name__)
CORS(twitter)

new_words = {
    'protest': 0,
    'protesters': 0
}
vader.lexicon.update(new_words)


@twitter.route('/twitter', methods=['GET', 'POST'])
# route handling
def return_tweets():

    query = request.get_json()
    print(query)
    # Authenticate to Twitter
    auth = tweepy.AppAuthHandler(
        API_KEY, API_SECRET)
    api = tweepy.API(auth, wait_on_rate_limit=True,
                     wait_on_rate_limit_notify=True)

    # create data frame for text + list t for twitter info
    df = pd.DataFrame()
    t = []

    for tweet in api.search(lang='en', q=query, result_type='recent', count='1'):

        print(tweet)
        if ('RT @' not in tweet.text) and (not tweet.retweeted):

            t.append({'text': tweet.text, 'profile_pic': tweet.user.profile_image_url_https, 'user_screen_name':
                      tweet.user.screen_name, 'created_at': tweet.created_at, 'id': tweet.id_str})
            df['text'] = [tweet.text]
            df.to_csv('/Users/rachel/Desktop/Code/sentiment-analysis/app/views/twitter_text.csv',
                      encoding='utf-8', mode='a')
            text_file = open('/Users/rachel/Desktop/Code/sentiment-analysis/app/views/twitter.txt', 'w')
            n=text_file.write(tweet.text)
            text_file.close()

    return jsonify({'tweets': t})


@twitter.route('/twitter/words', methods=['GET'])
def twitter_analyze():

    df = pd.read_csv(
        '/Users/rachel/Desktop/Code/sentiment-analysis/app/views/twitter_text.csv')
    df_list = df['text'].tolist()
    # print(df_list)

    for text in df_list:

        vectorizer = CountVectorizer(analyzer='word', ngram_range=(
            1, 4), token_pattern=r'\b\w+\b', min_df=1, stop_words=None)
        X = vectorizer.fit_transform([text])
        ngrams = vectorizer.get_feature_names()
        print(X.toarray(), 'x to array')

    # print(ngrams)
    # return jsonify(ngrams)

    # write ngrams to csv
    with open('/Users/rachel/Desktop/Code/sentiment-analysis/app/views/ngram_twitter_vader.csv', mode='w', newline='') as csv_file:
        fieldnames = ['ngrams']
        ngram_writer = csv.DictWriter(
            csv_file, delimiter=',', fieldnames=fieldnames)
        ngram_writer.writeheader()

        for ngram in ngrams:

            ngram_writer.writerow({'ngrams': ngram})

    # return jsonify()

    # adds total word column to the csv
    df = pd.read_csv(
        '/Users/rachel/Desktop/Code/sentiment-analysis/app/views/ngram_twitter_vader.csv')
    df['total_words'] = [len(x.split()) for x in df['ngrams'].tolist()]
    # sorts values by total words
    df = df.sort_values(by=['total_words'])
    # writes the sorted column to the ngram.csv
    df = df.to_csv(
        r'/Users/rachel/Desktop/Code/sentiment-analysis/app/views/ngram_twitter_vader.csv', index=False, header=True)

    # create a new csv with the singular words and scores only -
    df = pd.read_csv(
        '/Users/rachel/Desktop/Code/sentiment-analysis/app/views/ngram_twitter_vader.csv')
    df = df.loc[df['total_words'] == 1]
    df = df.to_csv(
        r'/Users/rachel/Desktop/Code/sentiment-analysis/app/views/words_twitter.csv', index=False, header=True)

    # # order the list
    ordered_list = re.sub(r"[^\w]", " ", text.lower()).split()
    # # print(ordered_list, 'ordered_list')

    # use pandas to read the csv
    df = pd.read_csv(
        '/Users/rachel/Desktop/Code/sentiment-analysis/app/views/words_twitter.csv')
    df['scores'] = df['ngrams'].apply(
        lambda ngrams: vader.polarity_scores(ngrams))

    scored_list = df.values.tolist()
    # print(scored_list, 'list')

    # # printing original list
    # print ("The original list is : " + str(scored_list))

    # # printing sort order list
    # print ("The sort order list is : " + str(ordered_list))

    # using list comprehension
    # to sort according to other list
    res = [tuple for x in ordered_list for tuple in scored_list if tuple[0] == x]

    # printing result
    print("The sorted list is : " + str(res))

    return jsonify(res)


@twitter.route('/twitter/ngrams', methods=['GET'])
def twitter_ngrams_analyze():
    # use pandas to read the csv
    df = pd.read_csv(
        '/Users/rachel/Desktop/Code/sentiment-analysis/app/views/ngram_twitter_vader.csv', engine='python')
    # # I need to remove those double quotes
    df['scores'] = df['ngrams'].apply(
        lambda ngrams: vader.polarity_scores(ngrams))
    # # df['score'] = df['score'].str.strip('"')
    df = df.to_dict(orient='list')
    # print(df)
    return jsonify(df)


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
