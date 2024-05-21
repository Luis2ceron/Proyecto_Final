// Función para renderizar el botón de PayPal
function renderizarBotonPayPal(total) {
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: total.toString()
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Pago completado por ' + details.payer.name.given_name);
                localStorage.removeItem('carrito');
                window.location.href = 'success.html';
            });
        }
    }).render('#paypal-button-container');
}

// Función para pagar con PayU (PSE)
function pagarConPayU(total) {
    const payuData = {
        merchantId: 'YOUR_MERCHANT_ID',
        accountId: 'YOUR_ACCOUNT_ID',
        description: 'Compra en la tienda en línea',
        referenceCode: 'ORDEN-123',
        amount: total,
        tax: 0,
        taxReturnBase: 0,
        buyerEmail: 'correo@ejemplo.com',
        responseUrl: 'URL_DE_RESPUESTA',
        confirmationUrl: 'URL_DE_CONFIRMACION'
    };

    window.PayUPaymentPlus.pay(payuData);
}

// Obtener el total del carrito desde localStorage
function obtenerTotalCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    return carrito.reduce((sum, producto) => sum + producto.precio, 0);
}

// Calcular el total y renderizar los botones de pago
const total = obtenerTotalCarrito();
renderizarBotonPayPal(total);

document.getElementById('pagar-pse-btn').addEventListener('click', () => {
    pagarConPayU(total);
});