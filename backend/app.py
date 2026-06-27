from flask import Flask
import joblib

app = Flask(__name__)

model = joblib.load("models/skill_prediction_model.pkl")

@app.route("/")
def home():
    return {
        "message": "Operator Skill Prediction API Running"
    }

@app.route("/test-model")
def test_model():
    return {
        "message": "Model Loaded Successfully"
    }

if __name__ == "__main__":
    app.run(debug=True)