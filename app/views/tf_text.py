from flask import Blueprint, Flask, request, jsonify
from flask_cors import CORS
import json, csv, re
import pandas as pd 
from app.views.tf_ngrams import run_ngrams

# import twitter [to be added for when i implement the twitter functions]

tf = Blueprint('tf', __name__)
CORS(tf)


#defining the get route for each word and each of their score 
@tf.route('/tf/words', methods = ['GET'])

#route handler function 
def return_words ():

    #run the model to return trigrams, bigrams and unigrams with sentiment score
    run_ngrams()
    
    #open the text file 
    with open ('text.txt', 'r') as infile:
        text_analysis = [infile.read()]

    print(text_analysis, text_analysis[0], 'txt analysis + text analysis [0]')
    #read warning 
    ordered_list = re.sub("[^\w]", " ",  text_analysis[0].lower()).split()
    print(ordered_list, 'ordered_list')
    #use pandas to read the csv
    df = pd.read_csv('words.csv')
    scored_list = df.values.tolist()
    print(scored_list, 'list')

    # printing original list 
    print ("The original list is : " + str(scored_list)) 
    
    # printing sort order list 
    print ("The sort order list is : " + str(ordered_list)) 
    
    # using list comprehension 
    # to sort according to other list  
    res = [tuple for x in ordered_list for tuple in scored_list if tuple[0] == x] 
    
    # printing result 
    print ("The sorted list is : " + str(res)) 

    return jsonify(res)
    


#defining the get route for the ngrams and each of their score 
@tf.route('/tf/ngrams', methods = ['GET'])

#route handler function 
def return_ngrams ():
    #use pandas to read the csv
    df = pd.read_csv('ngram.csv')
    dict = df.to_dict(orient='list')
    print(dict)
    return jsonify(dict)
    


if __name__ == '__main__':
    app.run(debug = True, port=5000) 
