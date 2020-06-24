from flask import Flask
from .views.home import home
from .views.text import text
from .views.twitter import twitter

app = Flask(__name__, instance_relative_config=True)
app.register_blueprint(home, text, twitter)
app.config.from_object('config')
app.config.from_pyfile('config.py')