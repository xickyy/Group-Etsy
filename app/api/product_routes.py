from flask import Blueprint, jsonify, redirect, render_template, request
from app.models import Product, Review, db
from ..forms.product_form import ProductForm
from ..forms.review_form import ReviewForm
from flask_login import current_user
from flask_login import login_required

product_routes = Blueprint('products', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

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


@product_routes.route('/new', methods=['POST'])
@login_required
def add_products():
    """
    This function creates a new product.
    """
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

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
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@product_routes.route('/<int:product_id>', methods=["PUT"])
def edits_a_product(product_id):
    """
    Edits a product by ID.
    """
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        product = Product.query.get(product_id)

        for key, value in data.items():
            setattr(product, key, value)
        db.session.commit()
        return product.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@product_routes.route('/<int:product_id>', methods=["DELETE"])
def deletes_a_product(product_id):
    """
    Deletes a product by ID.
    """
    product = Product.query.get(product_id)
    db.session.delete(product)
    db.session.commit()
    return {'message': 'Product has been deleted!'}

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
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review(
            body = form.body.data,
            stars = form.stars.data,
            user_id = current_user.id,
            product_id = product_id
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()

@product_routes.route('/<int:product_id>/reviews/<int:review_id>', methods=["PUT"])
def edits_a_review(product_id, review_id):
    """
    Edits a review by ID.
    """
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        review = Review.query.get(review_id)

        for key, value in data.items():
            setattr(review, key, value)
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@product_routes.route('/<int:product_id>/reviews/<int:review_id>', methods=["DELETE"])
def deletes_a_review(product_id, review_id):
    """
    Deletes a review by ID.
    """
    review = Review.query.get(review_id)
    db.session.delete(review)
    db.session.commit()
    return {'message': 'Your review has been deleted!'}

@product_routes.route('/reviews/current_user', methods=["GET"])
def get_reviews_by_user():
    """
    Get reviews from current user
    """
    reviews = Review.query.filter(Review.user_id == current_user.id).all()
    return {'reviews': [review.to_dict() for review in reviews]}
