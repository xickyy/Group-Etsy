from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__: 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String)
    stars = db.Column(db.Integer)
    productId = db.Column(db.Integer, db.ForeignKey("products.id"))
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship("User", back_populates="reviews")
    products = db.relationship("Product", back_populates="reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'stars': self.stars,
            'productId': self.productId,
            'userId': self.userId
        }