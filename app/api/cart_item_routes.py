from flask import Blueprint, jsonify, redirect, render_template, request
from app.models import CartItem, db
from flask_login import current_user
from ..forms.cart_form import CartForm 


cart_item_routes = Blueprint('cart_items', __name__)

@cart_item_routes.route('/', methods=["GET"])
def cart_items():
    """
    Query for all cart items and returns them in a list of cart item dictionaries.
    """
    cart_items = CartItem.query.filter(CartItem.user_id == current_user.id).all()
    return {'cartItems': [cart_item.to_dict() for cart_item in cart_items]}

@cart_item_routes.route('/', methods=["POST"])
def add_items():
    """
    Add item to cart
    """
    form = CartForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        cart = CartItem(
            user_id = current_user.id,
            product_id = form.productId.data
        )        
        db.session.add(cart)
        db.session.commit()
        return cart.to_dict()
    return {"errors" : "error"}