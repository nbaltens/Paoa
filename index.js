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

// Run through all purchase Buttons to add item when clicked
for(let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers();
        addToCart(carts[i])
        setItemInStorage(newObj);
        totalCost(newObj);
    })
}

// function to check local storage on each page to see how many items are in cart
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('.cartCount').textContent = productNumbers;
    }
}

// function to add items to local storage and to cart when clicked
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
                <div class="quantity">QTY: ${item.inCart}</div>
                <div class="itemPriceCart">$${item.inCart * item.itemprice}</div>
                
                </div>
             
            `
        });

        productContainer.innerHTML += `
        <button class="clearCart" onClick="clearCart()">Clear Cart</button>
            <div class="cartTotal">
                <h4 class="basketTotalTitle">
                TOTAL
                </h4>
                <h4 class="basketTotal">
                    $${cartCost}.00
                </h4>
                <button class="checkoutBtn" id="myBtn">Checkout</button>
            </div>
            `
    }

}

function clearCart() {
    localStorage.clear()
    location.reload();
}

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
