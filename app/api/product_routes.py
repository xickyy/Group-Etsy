from flask import Blueprint, jsonify, redirect, render_template
from app.models import Product
from ..forms.product_form import ProductForm
from flask_login import current_user

product_routes = Blueprint('products', __name__)

@product_routes.route('/', methods=["GET"])
def products():
    """
    Query for all products and returns them in a list of product dictionaries.
    """
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}

@product_routes.route('/', methods=['POST'])
def add_products():
    """
    This function creates a new product.
    """
    form = ProductForm()
    if form.validate_on_submit():
        product = Product(
            title = form.title.data,
            description = form.description.data,
            price = form.price.data,
            imageURL = form.imageURL.data,
            userId = current_user.id
            # userId -> flask_login (current_user method, key into .id) ---> DONE
        )
        db.sesson.add(product)
        db.session.commit()
        return product.to_dict()
  