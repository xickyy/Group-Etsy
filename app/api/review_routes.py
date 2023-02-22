from flask import Blueprint, jsonify, redirect, render_template
from app.models import Review
from app.forms import ReviewForm
from flask_login import current_user

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/products/:productId/reviews', methods=["GET"])
def reviews():
    reviews = Review.query.all()
    return {'reviews': [review.to_dict() for review in reviews]}


@review_routes.route('/products/:productId/reviews', methods=["POST"])
def add_reviews():
    form = ReviewForm(
        if form.validate_on_submit():
            review = Review(
                body = form.body.data,
                stars = form.stars.data,
                userId = current_user.id,
                productId = #unsure atm
            )
            db.session.add(review)
            db.session.commit()
            #not sure if we need a redirect or what to return
    )