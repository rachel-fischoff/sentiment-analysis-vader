import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    BASE_DIR = basedir
    DEBUG = False


class ProductionConfig(Config):
    DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class HerokuConfig(ProductionConfig):
    @classmethod
    def init_app(cls, app):
        ProductionConfig.init_app(app)

    import logging
    from logging import StreamHandler
    file_handler = StreamHandler()
    file_handler.setLevel(logging.WARNING)
    app.logger.addHandler(file_handler)



