from database import db


class Prediction(db.Model):

    __tablename__ = "prediction_history"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    style = db.Column(db.String(100), nullable=False)
    operation = db.Column(db.String(150), nullable=False)
    line_number = db.Column(db.Integer, nullable=False)
    smv = db.Column(db.Float, nullable=False)
    actual_output = db.Column(db.Integer, nullable=False)
    target_output = db.Column(db.Integer, nullable=False)
    efficiency = db.Column(db.Float, nullable=False)
    predicted_skill = db.Column(db.String(10), nullable=False)
    confidence = db.Column(db.Float, nullable=False)
    prediction_time = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )