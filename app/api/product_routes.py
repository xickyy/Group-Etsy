from flask import Blueprint, jsonify, redirect, render_template, request
from app.models import Product, Review, db
from ..forms.product_form import ProductForm
from ..forms.review_form import ReviewForm
from flask_login import current_user
from flask_login import login_required

product_routes = Blueprint('products', __name__)

@product_routes.route('/', methods=["GET"])
def products():
    """
    Query for all products and returns them in a list of product dictionaries.
    """
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}


@product_routes.route('/<int:product_id>', methods=["GET"])
def product(product_id):
    """
    Query for one product.
    """
    product = Product.query.get(product_id)
    return product.to_dict()


@product_routes.route('/<int:product_id>', methods=["DELETE"])
def deletes_a_product(product_id):
    """
    Deletes a product by ID
    """
    product = Product.query.get(product_id)
    db.session.delete(product)
    db.session.commit()
    return {'message': 'Product has been deleted!'}



@product_routes.route('/new', methods=['POST'])
@login_required
def add_products():
    """
    This function creates a new product.
    """
    print("Hitting the route!", current_user)
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    if form.validate_on_submit():
        product = Product(
            title = form.title.data,
            description = form.description.data,
            price = form.price.data,
            image_URL = form.imageURL.data,
            user_id = current_user.id
        )
        db.session.add(product)
        db.session.commit()
        return product.to_dict()
    print("failed to validate")
    return {"errors" : "error"}

@product_routes.route('/<int:product_id>/reviews', methods=["GET"])
def reviews(product_id):
    """
    Query for all reviews and returns them in a list of review dictionaries.
    """
    reviews = Review.query.filter(Review.product_id == product_id).all()
    return {'reviews': [review.to_dict() for review in reviews]}

@product_routes.route('/<int:product_id>/reviews', methods=["POST"])
@login_required
def add_reviews(product_id):
    """
    This function creates a new review.
    """
    form = ReviewForm()
    if form.validate_on_submit():
        review = Review(
            body = form.body.data,
            stars = form.stars.data,
            userId = current_user.id,
            productId = product_id
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
