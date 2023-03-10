from .db import db, environment, SCHEMA, add_prefix_for_prod

class CartItem(db.Model):
    __table_name__: 'cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))

    user = db.relationship("User", back_populates="cart_items")
    product = db.relationship("Product", back_populates="cart_items")


    def to_dict(self):
        print(dir(self.product))
        return {
            'id': self.id,
            # 'user': self.user.to_dict_flat_user(),
            'user': self.user_id,
            # 'product': self.product_id,
            'product': self.product.to_dict_cart_product()
            # 'product': [ prod.to_dict_cart_product() for prod in self.product ]
        }