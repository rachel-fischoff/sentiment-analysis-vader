from flask import Blueprint, render_template, make_response, jsonify, request
from flask_cors import CORS
import csv
import re
import json
import pandas as pd
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from sklearn.feature_extraction.text import CountVectorizer

text = Blueprint("text", __name__)
CORS(text)
vader = SentimentIntensityAnalyzer()


# defining the post route for the text submitted by the user
@text.route("/text", methods=["POST"])
# route handler function
def anaylze_text():
    text_data = request.get_json()

    # writes data to text file sentiment analysis
    with open(
        "/Users/rachel/Desktop/Code/sentiment-analysis/app/views/text.txt", "w"
    ) as outfile:
        json.dump(text_data["text"], outfile)
        return text_data


# defining the get route for each word and each of their score
@text.route("/text/words", methods=["GET"])

# route handler function
def return_words():
    # open the text file
    with open(
        "/Users/rachel/Desktop/Code/sentiment-analysis/app/views/text.txt", "r"
    ) as infile:
        text_analysis = [infile.read()]

        vectorizer = CountVectorizer(
            analyzer="word",
            ngram_range=(1, 4),
            token_pattern=r"\b\w+\b",
            min_df=1,
            stop_words=None,
        )
        X = vectorizer.fit_transform(text_analysis)
        ngrams = vectorizer.get_feature_names()
        print(X.toarray(), "x to array")

        # write ngrams to csv
        with open(
            "/Users/rachel/Desktop/Code/sentiment-analysis/app/views/ngram_vader.csv",
            mode="w",
            newline="",
        ) as csv_file:
            fieldnames = ["ngrams"]
            ngram_writer = csv.DictWriter(
                csv_file, delimiter=",", fieldnames=fieldnames
            )
            ngram_writer.writeheader()

            for ngram in ngrams:

                ngram_writer.writerow({"ngrams": ngram})

        # adds total word column to the csv
        df = pd.read_csv(
            "/Users/rachel/Desktop/Code/sentiment-analysis/app/views/ngram_vader.csv"
        )
        df["total_words"] = [len(x.split()) for x in df["ngrams"].tolist()]
        # sorts values by total words
        df = df.sort_values(by=["total_words"])
        # writes the sorted column to the ngram.csv
        df = df.to_csv(
            r"/Users/rachel/Desktop/Code/sentiment-analysis/app/views/ngram_vader.csv",
            index=False,
            header=True,
        )

        # create a new csv with the singular words and scores only -
        df = pd.read_csv(
            "/Users/rachel/Desktop/Code/sentiment-analysis/app/views/ngram_vader.csv"
        )
        df = df.loc[df["total_words"] == 1]
        df = df.to_csv(
            r"/Users/rachel/Desktop/Code/sentiment-analysis/app/views/words.csv",
            index=False,
            header=True,
        )

        # order the list
        ordered_list = re.sub(r"[^\w]", " ", text_analysis[0].lower()).split()
        # print(ordered_list, 'ordered_list')

        # use pandas to read the csv
        df = pd.read_csv(
            "/Users/rachel/Desktop/Code/sentiment-analysis/app/views/words.csv"
        )
        df["scores"] = df["ngrams"].apply(lambda ngrams: vader.polarity_scores(ngrams))

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


# defining the get route for the ngrams and each of their score
@text.route("/text/ngrams", methods=["GET"])

# route handler function
def return_ngrams():
    # use pandas to read the csv
    df = pd.read_csv(
        "/Users/rachel/Desktop/Code/sentiment-analysis/app/views/ngram_vader.csv",
        engine="python",
    )
    # # I need to remove those double quotes
    df["scores"] = df["ngrams"].apply(lambda ngrams: vader.polarity_scores(ngrams))
    # # df['score'] = df['score'].str.strip('"')
    df = df.to_dict(orient="list")
    print(df)
    return jsonify(df)


@text.errorhandler(404)
def not_found():
    """Page not found."""
    return make_response(render_template("404.html"), 404)


@text.errorhandler(400)
def bad_request():
    """Bad request."""
    return make_response(render_template("400.html"), 400)


@text.errorhandler(500)
def server_error():
    """Internal server error."""
    return make_response(render_template("500.html"), 500)
