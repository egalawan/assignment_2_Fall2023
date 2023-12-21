import os
from flask import Flask, send_from_directory


def create_app():
    from flask_json import FlaskJSON
    from flask_cors import CORS
    from api.routes import api_blueprint

    app = Flask(__name__, static_folder='build', template_folder='templates')
    app.register_blueprint(api_blueprint, url_prefix="/api")
    app.config['UPLOAD_FOLDER'] = '/tmp'

    json = FlaskJSON()
    json.init_app(app)
    CORS(app)

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "" and os.path.exists(os.path.join(app.root_path, 'build', path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", debug=True)
