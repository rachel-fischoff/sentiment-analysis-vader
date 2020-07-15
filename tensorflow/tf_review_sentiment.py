import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Import numpy and pandas
import numpy as np
import pandas as pd


path = tf.keras.utils.get_file('reviews.csv', 
                               'https://drive.google.com/uc?id=13ySLC_ue6Umt9RJYSeM2t-V0kCv-4C-P')
print (path)

# Read the csv file
dataset = pd.read_csv(path)

# Review the first few entries in the dataset
dataset.head()

# Get the reviews from the text column
reviews = dataset['text'].tolist()

#Tokenize the text
#Create the tokenizer, specify the OOV token, tokenize the text, then inspect the word index.
tokenizer = Tokenizer(oov_token="<OOV>")
tokenizer.fit_on_texts(reviews)

word_index = tokenizer.word_index
print(len(word_index))
print(word_index)


# Generate sequences for the reviews
# Generate a sequence for each review. Set the max length to match the longest review. 
# Add the padding zeros at the end of the review for reviews that are not as long as the longest one


sequences = tokenizer.texts_to_sequences(reviews)
padded_sequences = pad_sequences(sequences, padding='post')

# What is the shape of the vector containing the padded sequences?
# The shape shows the number of sequences and the length of each one.
print(padded_sequences.shape)

# What is the first review?
print (reviews[0])

# Show the sequence for the first review
print(padded_sequences[0])

# Try printing the review and padded sequence for other elements.