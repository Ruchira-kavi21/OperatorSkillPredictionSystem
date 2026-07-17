from flask import Flask
from flask_cors import CORS
from Config import Config
from database import db
from models.user import User
from routes.auth import auth_bp
from flask_bcrypt import Bcrypt
from models.prediction import Prediction
from routes.history import history_bp
from routes.dashboard import dashboard_bp

from flask_jwt_extended import JWTManager
from routes.prediction import prediction_bp

app = Flask(__name__)

app.config.from_object(Config)

db.init_app(app)

with app.app_context():
    db.create_all()

jwt = JWTManager(app)
bcrypt = Bcrypt(app)
app.register_blueprint(auth_bp)
# Enable CORS
CORS(app)

# Register Routes
app.register_blueprint(prediction_bp)
app.register_blueprint(history_bp)
app.register_blueprint(dashboard_bp)

@app.route("/")
def home():
    return {
        "message": "Operator Skill Prediction API Running"
    }
with app.app_context():
    db.create_all()
if __name__ == "__main__":
    app.run(debug=True)