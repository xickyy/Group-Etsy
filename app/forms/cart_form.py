from flask_wtf import FlaskForm
from wtforms import  SubmitField, IntegerField
from app.models import CartItem

class CartForm(FlaskForm):
    productId = IntegerField('')
    submit = SubmitField('Submit')