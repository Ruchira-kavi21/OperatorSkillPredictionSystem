from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.user import User
from models.prediction import Prediction


history_bp = Blueprint("history", __name__)


@history_bp.route("/history", methods=["GET"])
@jwt_required()
def get_history():

    try:

        user_id = int(get_jwt_identity())

        user = User.query.get(user_id)

        if not user:
            return jsonify({
                "success": False,
                "message": "User not found."
            }), 404

        if user.role in ["ADMIN", "IE"]:
            predictions = Prediction.query.order_by(
                Prediction.prediction_time.desc()
            ).all()

        else:
            predictions = Prediction.query.filter_by(
                user_id=user_id
            ).order_by(
                Prediction.prediction_time.desc()
            ).all()
        history = []

        for prediction in predictions:

            history.append({

                "id": prediction.id,
                "style": prediction.style,
                "operation": prediction.operation,
                "line_number": prediction.line_number,
                "smv": prediction.smv,
                "actual_output": prediction.actual_output,
                "target_output": prediction.target_output,
                "efficiency": prediction.efficiency,
                "prediction": prediction.predicted_skill,
                "confidence": prediction.confidence,
                "prediction_time": prediction.prediction_time.strftime(
                    "%Y-%m-%d %H:%M:%S"
                )
            })

        return jsonify({
            "success": True,
            "history": history
        }), 200

    except Exception as error:

        return jsonify({
            "success": False,
            "message": str(error)
        }), 500