import django
from django.contrib.auth.models import Permission, User
from django.db.models.query_utils import Q
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, HttpResponseRedirect
from .models import Producto, Categoria, Carrito
from .forms import FormProducto, Producto
from django.urls import reverse
from django.contrib.auth.decorators import permission_required, login_required
#import pywhatkit

def home(request):
    if "cart.html" not in request.session:
            request.session["cart.html"] = []
    nuevos = Producto.objects.all().order_by('-fecha')[:3]
    productos = Producto.objects.all().order_by('-fecha')[3:10]

    return render(request, 'index.html', {
        'productos': productos,
        'nuevos': nuevos,
        'cart.html': request.session["carrito"]


    })



@permission_required('TIENDA.add_producto')
def agregar(request):

    data = {"form": FormProducto()}
    if request.method == "POST":
        form = FormProducto(data=request.POST, files=request.FILES)
        if form.is_valid():
            form.save()
            return redirect('index.html')
        



@permission_required('TIENDA.change_producto')
def editar(request, id_producto):
    producto = get_object_or_404(Producto, id=id_producto)
    if request.method == 'POST':
        form = FormProducto(data=request.POST,
                            files=request.FILES, instance=producto)
        if form.is_valid():
            form.save()
            return redirect('index.html')



@permission_required('TIENDA.delete_producto')
def eliminar(request, articulo_id):
    producto = get_object_or_404(Producto, id=articulo_id)
    producto.delete()
    return redirect('index.html')





    

def checkout(request):
    productos = []
    total = 0
    for id in request.session['carrito']:
        productos.append(get_object_or_404(Producto, id=id))
        total += Producto.objects.get(id=id).precio
    print(total)        
    
    return render(request, 'cart.html', {
        'carrito': request.session['carrito'],
        'productos': productos,
        'total': total
    })
    
def borrar_carrito(request):
    request.session['carrito'] = [] 
    return redirect("tienda:checkout")

@login_required
def confirmar_pedido(request):
    usuario = User.objects.get(username=request.user)    
    cart = Carrito.objects.create(usuario = usuario)
    cart.save()
    for id in request.session['cart.html']:        
        cart.lista.add(Producto.objects.get(id=id))
    request.session['cart.html'] = []
    
    return redirect("index.html") 
        
        
def acerca(request):
    return render(request, 'about.html')