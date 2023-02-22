from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__: 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String)
    stars = db.Column(db.Integer)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship("User", back_populates="reviews")
    products = db.relationship("Product", back_populates="reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'stars': self.stars,
            'productId': self.product_id,
            'userId': self.user_id
        }