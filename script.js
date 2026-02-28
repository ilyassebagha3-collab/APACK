// Loader
window.addEventListener("load", function(){ document.getElementById("loader").style.display="none"; });

// Calculate total
function calculateTotal(){
  let total = 0;
  document.querySelectorAll('.product').forEach(product => {
      let price = parseInt(product.querySelector('.price').dataset.price);
      let qty = parseInt(product.querySelector('.qty').value);
      total += price * qty;
  });
  document.getElementById("total").innerText = total + " DH";
}

// Go to checkout
function goToCheckout(){
  let cart = [];
  document.querySelectorAll('.product').forEach(product => {
      let qty = parseInt(product.querySelector('.qty').value);
      if(qty > 0){
          let name = product.querySelector('h3').innerText;
          let price = product.querySelector('.price').dataset.price;
          cart.push({name, qty, price});
      }
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("total", document.getElementById("total").innerText);
  window.location.href = "checkout.html";
}

// Checkout Page: display order summary
window.onload = function(){
  let cart = JSON.parse(localStorage.getItem("cart"));
  let summary = document.getElementById("orderSummary");
  if(cart && summary){
      summary.innerHTML = "<h3>Your Order:</h3>";
      cart.forEach(item => {
          summary.innerHTML += "<p>" + item.name + " x " + item.qty + " = " + (item.qty*item.price) + " DH</p>";
      });
      summary.innerHTML += "<p><strong>Total: " + localStorage.getItem("total") + "</strong></p>";
  }
}

// Send to WhatsApp
function sendToWhatsApp(){
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let city = document.getElementById("city").value;
  let cart = JSON.parse(localStorage.getItem("cart"));
  let total = localStorage.getItem("total");
  let message = "New Order from APACK:%0A";
  message += "Name: "+name+"%0APhone: "+phone+"%0ACity: "+city+"%0A%0AProducts:%0A";
  cart.forEach(item => {
      message += item.name + " x " + item.qty + " = " + (item.qty*item.price) + " DH%0A";
  });
  message += "%0ATotal: " + total;
  window.open("https://wa.me/212660833382?text=" + message);
}