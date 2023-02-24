from flask import Blueprint, jsonify, redirect, render_template
from app.models import Review
from ..forms.review_form import ReviewForm
from flask_login import current_user

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/products/:product_id/reviews', methods=["GET"])
def reviews():
    reviews = Review.query.all()
    return {'reviews': [review.to_dict() for review in reviews]}


@review_routes.route('/products/:product_id/reviews', methods=["POST"])
def add_reviews(product_id):
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
