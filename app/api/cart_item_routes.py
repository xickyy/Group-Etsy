from flask import Blueprint, jsonify, redirect, render_template
from app.models import CartItem
from flask_login import current_user

cart_item_routes = Blueprint('cart_item', __name__)

@cart_item_routes.route('/', methods=["GET"])
def cart_items():
    """
    Query for all cart items and returns them in a list of cart item dictionaries.
    """
    cart_items = CartItem.query.all()
    return {'cartItems': [review.to_dict() for cart_item in cart_items]}