from flask import Blueprint, request, jsonify

from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token

from database import db
from models.user import User

auth_bp = Blueprint("auth", __name__)

bcrypt = Bcrypt()


@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:

        return jsonify({
            "success": False,
            "message": "Email and password are required."
        }), 400

    user = User.query.filter_by(email=email).first()

    if user is None:

        return jsonify({
            "success": False,
            "message": "Invalid email or password."
        }), 401

    if not bcrypt.check_password_hash(user.password, password):

        return jsonify({
            "success": False,
            "message": "Invalid email or password."
        }), 401

    #access_token = create_access_token(identity={"id": user.id,"role": user.role})
    access_token = create_access_token(
        identity=str(user.id)
    )
    return jsonify({

        "success": True,

        "token": access_token,

        "user": {

            "id": user.id,
            "name": user.full_name,
            "email": user.email,
            "role": user.role

        }

    })