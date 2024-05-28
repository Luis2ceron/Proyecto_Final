from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('book/', views.book, name='book'),
    path('shop/', views.shop, name='shop'),
    path('cart/', views.cart, name='cart'),
    path('contact/', views.contact, name='contact'),
    path('about/', views.about, name='about'),
    path('create_product/', views.create_product, name='create_product'),
    path('delete_product/<int:product_id>/', views.delete_product, name='delete_product'),
]
