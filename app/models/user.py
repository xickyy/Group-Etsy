from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    image_URL = db.Column(db.String)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    products = db.relationship("Product", back_populates="user")
    reviews = db.relationship("Review", back_populates="user")
    cart_items = db.relationship("CartItem", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'imageURL': self.image_URL,
            'email': self.email,
            'username': self.username,
            'products': { product.id: product.to_dict() for product in self.products },
            'reviews': { review.id: review.to_dict() for review in self.reviews },
            'cartItems': { cart_item.id: cart_item.to_dict() for cart_item in self.cart_items }
        }

    def to_dict_flat_user(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'imageURL': self.image_URL,
            'email': self.email,
            'username': self.username
        }