
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences


with open ('text.txt', 'r') as infile:
    sentences = [infile.read()]
    print(sentences)

 #prepare the data
 #  create the tokenizer
 #  tokenize the words
 #  create sequences for the sentences
 #  make the sequences all the same length    

#  The high level steps to prepare text to be used in a machine learning model are:

# Tokenize the words to get numerical values for them
# Create numerical sequences of the sentences
# Adjust the sequences to all be the same length.

# Optionally set the max number of words to tokenize.
# The out of vocabulary (OOV) token represents words that are not in the index.
# Call fit_on_text() on the tokenizer to generate unique numbers for each word
tokenizer = Tokenizer(num_words = 100, oov_token="<OOV>")
tokenizer.fit_on_texts(sentences)

# Examine the word index
word_index = tokenizer.word_index
print(word_index)

# Get the number for a given word
print(word_index['scared'])

sequences = tokenizer.texts_to_sequences(sentences)
print (sequences)

padded = pad_sequences(sequences)
print("\nWord Index = " , word_index)
print("\nSequences = " , sequences)
print("\nPadded Sequences:")
print(padded)

# Specify a max length for the padded sequences
padded = pad_sequences(sequences, maxlen=15)
print(padded)

# Put the padding at the end of the sequences
padded = pad_sequences(sequences, maxlen=15, padding="post")
print(padded)

# Limit the length of the sequences, you will see some sequences get truncated
padded = pad_sequences(sequences, maxlen=3)
print(padded)