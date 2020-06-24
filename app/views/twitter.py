from flask import Blueprint, render_template, make_response

twitter = Blueprint('twitter', __name__)


@twitter.errorhandler(404)
def not_found():
    """Page not found."""
    return make_response(render_template("404.html"), 404)


@twitter.errorhandler(400)
def bad_request():
    """Bad request."""
    return make_response(render_template("400.html"), 400)


@twitter.errorhandler(500)
def server_error():
    """Internal server error."""
    return make_response(render_template("500.html"), 500)

