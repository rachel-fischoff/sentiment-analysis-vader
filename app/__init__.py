from flask import Flask
from flask_cors import CORS


# port = process.env.port || 5000 
def create_app():
    app = Flask(__name__)

    CORS(app)

    app.config.from_object('config.settings')
    app.config.from_pyfile('settings.py', silent=True)

    from .views.home import home
    from .views.text import text
    from .views.twitter import twitter

    app.register_blueprint(home)
    app.register_blueprint(twitter)
    app.register_blueprint(text)

    if __name__ == "__main__":
        app.run()

    return app


# logging.basicConfig(level=logging.INFO)
