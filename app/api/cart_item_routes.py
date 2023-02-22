from flask import Blueprint, jsonify, redirect, render_template
from app.models import CartItem
from flask_login import current_user

cart_item_routes = Blueprint('cart_item', __name__)

@cart_item_routes.route('/cart-items', methods=["GET"])
def cart_items():
    cart_items = CartItem.query.all()
    return {'cartItems': [review.to_dict() for cart_item in cart_items]}