from flask import Flask
from flask_cors import CORS

def create_app(config_file):
    app = Flask(__name__, instance_relative_config=True)

    CORS(app)

    # app.config.from_object('config')
    app.config.from_pyfile('config.py')

    from .views.home import home
    from .views.text import text
    from .views.twitter import twitter

    app.register_blueprint(home)
    app.register_blueprint(twitter)
    app.register_blueprint(text)
 
    if __name__ == '__main__':
        app.run(debug=True, port=5000)
    
    return app

# logging.basicConfig(level=logging.INFO)

    

