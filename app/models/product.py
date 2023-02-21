from .db import db, environment, SCHEMA, add_prefix_for_prod
from models import User

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    imageURL = db.Column(db.String)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship("User", back_populates="products")
    reviews = db.relationship("Review", back_populates="products")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'price': self.price,
            'imageURL': self.imageURL,
            'userId': self.userId
        }

    # To do: to_dict, relationships 