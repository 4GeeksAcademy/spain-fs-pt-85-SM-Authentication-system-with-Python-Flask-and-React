"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import re

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)



@api.route('/user', methods=['GET'])
def handle_hello():

    response_body = {
        "msg": "Hello, this is your GET /user response "
    }

    return jsonify(response_body), 200

@api.route("/signup", methods=["POST"])
def signup():
    request_data = request.json
    print(request_data)
    required_data = ["email", "password"]
    for data in required_data:
        if data not in request_data:
            return jsonify({"error": f"the field {data} is obligatory"}), 400
    email = request_data.get("email").lower()
    password = request_data.get("password")
    email_regex = re.compile(r'^[[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$')
    if not bool(email_regex.match(email)):
        return jsonify({"error": "the email is not valid"}), 400
    try:
        user_exist = db.session.execute(db.select(User).filter_by(email=email)).scalar_one()
        if user_exist:
            return jsonify({"error": "user already exist"}), 400
    except:
        pass
    new_user = User(
        email = email,
        password = password,
        is_active = True
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": new_user.serialize()}), 200

# end point para logarse
@api.route("/login", methods=["POST"])
def login():
    request_data = request.json
    required_data = ["email", "password"]
    for data in required_data:
        if data not in request_data:
            return ({"error": f"{data} field is obligatory"}), 400
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    try:
        user = db.session.execute(db.select(User).filter_by(email=email)).scalar_one()

        if email == user.email and password == user.password:
            access_token = create_access_token(identity=email)
            return jsonify(access_token=access_token), 200
        else:
            return jsonify({"msg": "Bad email or password"}), 401
    except:
         return jsonify({"msg": "Bad email or password"}), 401

# endpoint que valida si el token sirve
@api.route("/token-verify", methods=['GET'])
@jwt_required()
def token_verify():
    return jsonify({"msg": "verified"})

# enpoint para obtener el usuario logado
@api.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
