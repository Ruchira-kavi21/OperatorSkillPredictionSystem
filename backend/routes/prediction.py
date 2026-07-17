from flask import Blueprint, request, jsonify

from flask_jwt_extended import jwt_required, get_jwt_identity

from database import db
from models.prediction import Prediction

from services.predictor import predict_skill, get_metadata
from services.shap import generate_shap_explanation

prediction_bp = Blueprint("prediction", __name__)


@prediction_bp.route("/predict", methods=["POST"])
@jwt_required()

def predict():

    try:

        data = request.get_json()
        result = predict_skill(data)
        if not result["success"]:return jsonify(result), 400

        explanation = generate_shap_explanation(result["input_df"],result["prediction_index"])
        #current_user = get_jwt_identity()
        user_id = int(get_jwt_identity())

        prediction = Prediction(
            user_id=user_id,
            style=data["style"],
            operation=data["operation"],
            line_number=data["line_number"],
            smv=data["smv"],
            actual_output=data["actual_output"],
            target_output=data["target_output"],
            efficiency=data["efficiency"],
            predicted_skill=result["prediction"],
            confidence=result["confidence"]
        )

        db.session.add(prediction)
        db.session.commit()

        return jsonify({
            "success": True,
            "prediction": result["prediction"],
            "confidence": result["confidence"],
            "explanation": explanation
        })

    except Exception as error:return jsonify({
        "success": False,
        "message": str(error)
    }), 500

@prediction_bp.route("/metadata", methods=["GET"])
def metadata():
    return jsonify(get_metadata())