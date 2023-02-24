from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    image_URL = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey(f"{SCHEMA}.users.id"))

    user = db.relationship("User", back_populates="products")
    reviews = db.relationship("Review", back_populates="products")
    cart_items = db.relationship("CartItem", back_populates="products")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'price': self.price,
            'imageURL': self.image_URL,
            'userId': self.user_id
        }

    # To do: to_dict, relationships 