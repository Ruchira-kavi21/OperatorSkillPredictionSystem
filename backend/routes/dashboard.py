from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import func

from models.user import User
from models.prediction import Prediction


dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/dashboard-stats", methods=["GET"])
@jwt_required()
def get_dashboard_stats():

    try:

        user_id = int(get_jwt_identity())

        user = User.query.get(user_id)

        if not user:

            return jsonify({
                "success": False,
                "message": "User not found."
            }), 404


        # Dashboard is only available for Admin and IE Team
        if user.role not in ["ADMIN", "IE"]:

            return jsonify({
                "success": False,
                "message": "You do not have permission to access dashboard data."
            }), 403


        # Total predictions
        total_predictions = Prediction.query.count()


        # Average confidence
        average_confidence = (
            Prediction.query.with_entities(
                func.avg(Prediction.confidence)
            ).scalar()
        )


        # Average efficiency
        average_efficiency = (
            Prediction.query.with_entities(
                func.avg(Prediction.efficiency)
            ).scalar()
        )


        # Skill distribution
        skill_results = (
            Prediction.query
            .with_entities(
                Prediction.predicted_skill,
                func.count(Prediction.id)
            )
            .group_by(Prediction.predicted_skill)
            .all()
        )

        skill_distribution = {
            "A+": 0,
            "A": 0,
            "B": 0,
            "C": 0
        }

        for skill, count in skill_results:

            skill_distribution[skill] = count


        # Recent predictions
        recent_predictions = (
            Prediction.query
            .order_by(Prediction.prediction_time.desc())
            .limit(5)
            .all()
        )

        recent_data = []

        for prediction in recent_predictions:

            recent_data.append({

                "id": prediction.id,
                "style": prediction.style,
                "operation": prediction.operation,
                "prediction": prediction.predicted_skill,
                "confidence": prediction.confidence,
                "prediction_time": prediction.prediction_time.strftime(
                    "%Y-%m-%d %H:%M:%S"
                )
            })


        return jsonify({

            "success": True,
            "stats": {

                "total_predictions": total_predictions,
                "average_confidence": round(
                    float(average_confidence or 0),
                    2
                ),

                "average_efficiency": round(
                    float(average_efficiency or 0),
                    2
                ),

                "skill_distribution": skill_distribution
            },
            "recent_predictions": recent_data
        }), 200


    except Exception as error:

        return jsonify({
            "success": False,
            "message": str(error)
        }), 500