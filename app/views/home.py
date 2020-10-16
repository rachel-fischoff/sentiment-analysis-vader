from flask import Blueprint, render_template, make_response, request, jsonify
from flask_cors import CORS
import json, csv, re
import pandas as pd
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

nltk.download("vader_lexicon")

home = Blueprint("home", __name__)
CORS(home)

vader = SentimentIntensityAnalyzer()


@home.route("/home/pos", methods=["GET"])
# route handler function
def get_pos_examples():
    # use pandas to read the csv
    df = pd.read_csv(
        "/Users/rachel/Desktop/Code/sentiment-analysis/app/views/sample_text_1.csv"
    )
    df["scores"] = df["ngrams"].apply(lambda ngrams: vader.polarity_scores(ngrams))
    df = df.to_dict(orient="list")
    # print(df)
    return jsonify(df)


@home.route("/home/neg", methods=["GET"])
# route handler function
def get_neg_examples():
    new_words = {
        "thugs": -3.4,
        "hoodlums": -3.4,
        "looters": -3.4,
        "arsonists": -2.9,
        "kindest": 3.0,
    }
    vader.lexicon.update(new_words)

    # use pandas to read the csv
    df = pd.read_csv(
        "/Users/rachel/Desktop/Code/sentiment-analysis/app/views/sample_text_2.csv"
    )
    df["scores"] = df["ngrams"].apply(lambda ngrams: vader.polarity_scores(ngrams))
    df = df.to_dict(orient="list")
    return jsonify(df)


# defining the get route for each word and each of their score
@home.route("/home/pos/words", methods=["GET"])
# route handler function
def return_pos_words():
    # adds total word column to the csv
    df = pd.read_csv(
        "/Users/rachel/Desktop/Code/sentiment-analysis/app/views/words_sample_1.csv"
    )

    # open the text file
    with open(
        "/Users/rachel/Desktop/Code/sentiment-analysis/app/views/sample_text_1.txt", "r"
    ) as infile:
        text_analysis = [infile.read()]

        # print(text_analysis, text_analysis[0], 'txt analysis + text analysis [0]')
        # read warning
        ordered_list = re.sub(r"[^\w]", " ", text_analysis[0].lower()).split()
        # print(ordered_list, 'ordered_list')

        # use pandas to read the csv
        df = pd.read_csv(
            "/Users/rachel/Desktop/Code/sentiment-analysis/app/views/words_sample_1.csv"
        )
        df["scores"] = df["ngrams"].apply(lambda ngrams: vader.polarity_scores(ngrams))

        scored_list = df.values.tolist()
        print(scored_list, "list")

        # printing original list
        # print ("The original list is : " + str(scored_list))

        # printing sort order list
        # print ("The sort order list is : " + str(ordered_list))

        # using list comprehension
        # to sort according to other list
        res = [tuple for x in ordered_list for tuple in scored_list if tuple[0] == x]

        # printing result
        # print ("The sorted list is : " + str(res))

        return jsonify(res)


# defining the get route for each word and each of their score
@home.route("/home/neg/words", methods=["GET"])
# route handler function
def return_neg_words():
    # adds total word column to the csv
    df = pd.read_csv(
        "/Users/rachel/Desktop/Code/sentiment-analysis/app/views/words_sample_2.csv"
    )

    new_words = {
        "thugs": -3.4,
        "hoodlums": -3.4,
        "looters": -3.4,
        "arsonists": -2.9,
        "kindest": 3.0,
    }
    vader.lexicon.update(new_words)

    # open the text file
    with open(
        "/Users/rachel/Desktop/Code/sentiment-analysis/app/views/sample_text_2.txt", "r"
    ) as infile:
        text_analysis = [infile.read()]

        # print(text_analysis, text_analysis[0], 'txt analysis + text analysis [0]')
        # read warning
        ordered_list = re.sub(r"[^\w]", " ", text_analysis[0].lower()).split()
        # print(ordered_list, 'ordered_list')

        # use pandas to read the csv
        df = pd.read_csv(
            "/Users/rachel/Desktop/Code/sentiment-analysis/app/views/words_sample_2.csv"
        )
        df["scores"] = df["ngrams"].apply(lambda ngrams: vader.polarity_scores(ngrams))

        scored_list = df.values.tolist()
        # print(scored_list, 'list')

        # printing original list
        # print ("The original list is : " + str(scored_list))

        # printing sort order list
        # print ("The sort order list is : " + str(ordered_list))

        # using list comprehension
        # to sort according to other list
        res = [tuple for x in ordered_list for tuple in scored_list if tuple[0] == x]

        # printing result
        # print ("The sorted list is : " + str(res))

    return jsonify(res)


@home.errorhandler(404)
def not_found():
    """Page not found."""
    return make_response(render_template("404.html"), 404)


@home.errorhandler(400)
def bad_request():
    """Bad request."""
    return make_response(render_template("400.html"), 400)


@home.errorhandler(500)
def server_error():
    """Internal server error."""
    return make_response(render_template("500.html"), 500)
