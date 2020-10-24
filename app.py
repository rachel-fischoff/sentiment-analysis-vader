from flask import Flask
from flask_cors import CORS
import os


# Factory function that creates the flask app 
def create_app():
    app = Flask(__name__, static_folder='../build', static_url_path='/')

    CORS(app)

    # app.config.from_object()
    app.config.from_pyfile('settings.py', silent=True)

    from .views.home import home
    from .views.text import text
    from .views.twitter import twitter

    app.register_blueprint(home)
    app.register_blueprint(twitter)
    app.register_blueprint(text)

    if __name__ == "__main__":
        port = int(os.environ.get("PORT", 5000))
        app.run(host='0.0.0.0', port=port)

    return app


# logging.basicConfig(level=logging.INFO)
