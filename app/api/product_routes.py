from flask import Blueprint, jsonify, redirect, render_template
from app.models import Product
from app.forms import ProductForm

product_routes = Blueprint('products', __name__)

@product_routes.route('/products')
def products():
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}

@product_routes.route('/products', methods=['POST'])
def add_products():
    form = ProductForm(
        if form.validate_on_submit():
            product = Product(
                title = form.title.data,
                description = form.description.data,
                price = form.price.data,
                imageURL = form.imageURL.data
                # userId -> flask_login (current_user method, key into .id)
            )
            db.session.add(product)
            db.session.commit()
            return redirect(f'/products/{product.id}')
    )

    # To do: render_template