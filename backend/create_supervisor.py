from app import app
from database import db

from models.user import User

from flask_bcrypt import Bcrypt

bcrypt = Bcrypt(app)

with app.app_context():

    password = bcrypt.generate_password_hash("123456").decode("utf-8")

    admin = User(

        full_name="supervisor1",

        email="supervisor@system.com",

        password=password,

        role="SUPERVISOR"

    )

    db.session.add(admin)

    db.session.commit()

    print("Supervisor Created Successfully")