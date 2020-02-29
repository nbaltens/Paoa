//   NAVBAR
function navFunction() {
    var nav = document.getElementById("myTopnav");
    if (nav.className === "topnav") {
      nav.className += " responsive";
    } else {
      nav.className = "topnav";
    }
  }


//   CART ITEM COUNTER

let carts = document.querySelectorAll('.addToCartBtn');

for(let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers();
        addToCart(carts[i])
        setItemInStorage(newObj);
        totalCost(newObj);
        
    })
}

// set cart count for cart icon
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('.cartCount').textContent = productNumbers;
    }
    
}
// set cart count and local storage count
function cartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cartCount').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cartCount').textContent = 1;
    }
}

// increment cart acording to product count

function incrementCart() {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cartCount').textContent = productNumbers + 1;
    let quantityNum = event.target.parentElement.querySelector('.quantityNum')
    let quantityCalc = event.target.parentElement.querySelector('.quantityNum').textContent;
    quantityCalc++
    quantityNum.textContent = quantityCalc 

    let cartItemPrice = quantityNum.parentElement.parentElement.querySelector(".itemPriceInCart").textContent;
    cartItemPrice = parseInt(cartItemPrice)
    let total = document.querySelector(".basketTotalValue");
    let totalVal = total.textContent
    totalVal = parseInt(totalVal)
    totalVal += cartItemPrice;
    total.textContent = totalVal 
}

// decremet cart acording to product count
function decrementCart() {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    localStorage.setItem('cartNumbers', productNumbers - 1);
    document.querySelector('.cartCount').textContent = productNumbers - 1;
    let quantityNum = event.target.parentElement.querySelector('.quantityNum')
    let quantityCalc = event.target.parentElement.querySelector('.quantityNum').textContent;
    quantityCalc--
    quantityNum.textContent = quantityCalc 
    
    let cartItemPrice = quantityNum.parentElement.parentElement.querySelector(".itemPriceInCart").textContent;
    cartItemPrice = parseInt(cartItemPrice)
    let total = document.querySelector(".basketTotalValue");
    let totalVal = total.textContent
    totalVal = parseInt(totalVal)
    totalVal -= cartItemPrice;

    total.textContent = totalVal
}
// set items as objects in local storage
function setItemInStorage(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
        if(cartItems != null){
            if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));   
    
}

// set total cost in local storage
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    let productPrice = parseInt(product.itemprice)
    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + productPrice)
    } else {
        localStorage.setItem("totalCost", product.itemprice);
    }
}

// display what is in local storage on Cart HTML page
function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
 
    if(cartItems && productContainer) {

        productContainer.innerHTML = '';

        Object.values(cartItems).map(item => {
        
            productContainer.innerHTML += `
                <div class="product">
                    <div><img class="cart-product-image" src=${item.itemimg}></div>
                    <div class="itemTitleCart">${item.itemtitle}</div>
                    <div><span>Size: </span>${item.itemsize}</div>
                <div class="quantity"><i class="fas fa-chevron-circle-up upBtn" onClick="incrementCart()"></i><span class="quantityNum" value="${item.inCart}"> ${item.inCart}</span><i class="fas fa-chevron-circle-down downBtn" onClick="decrementCart()"></i></div>
                
                
                <div class="itemPriceCart" value="${item.itemprice}">$<span class="itemPriceInCart">${item.inCart * item.itemprice}</span></div>
                
                </div>
             
            `
        });

        productContainer.innerHTML += `
        <button class="clearCart" onClick="clearCart()">Clear Cart</button>
            <div class="cartTotal">
                <h4 class="basketTotalTitle">
                TOTAL
                </h4>
                <h4 class="basketTotal" value="${cartCost}">
                    $<span class="basketTotalValue">${cartCost}</span>.00
                </h4>
                <button class="checkoutBtn" id="myBtn">Checkout</button>
            </div>
            `
    }

}

// clear cart Button function with onclick
function clearCart() {
    localStorage.clear()
    location.reload();
}

// create object out of item clicked on
function addToCart(item) {
    const wholeItem = item.parentElement.parentElement;
    const itemTitle = wholeItem.getElementsByClassName('title')[0].innerText;
    const tag = wholeItem.getElementsByClassName('title')[0].innerText;
    const itemImg = wholeItem.getElementsByClassName('imageForItem')[0].src;
    const itemPrice = wholeItem.getElementsByClassName('price')[0].innerText;
    const itemSize = wholeItem.getElementsByClassName('sizeSelector')[0].value;
    let inCart;

    class Itemobj {
        constructor(title, img, price, size, tag) {
            this.itemtitle = title;
            this.itemimg = img;
            this.itemprice = price;
            this.itemsize = size;
            this.tag = title;
            this.inCart = 0;
            
        }
    }
    newObj = new Itemobj(itemTitle, itemImg, itemPrice, itemSize, tag, inCart);
    console.log(newObj)
    return newObj;
}


onLoadCartNumbers();
displayCart();



// MODAL

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
