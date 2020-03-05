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
    let productNumbers = sessionStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('.cartCount').textContent = productNumbers;
    }
    
}
// set cart count and local storage count
function cartNumbers() {
    let productNumbers = sessionStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if(productNumbers) {
        sessionStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cartCount').textContent = productNumbers + 1;
    } else {
        sessionStorage.setItem('cartNumbers', 1);
        document.querySelector('.cartCount').textContent = 1;
    }
}

// increment cart acording to product count

function incrementCart() {
    let productNumbers = sessionStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    sessionStorage.setItem('cartNumbers', productNumbers + 1);
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
    sessionStorage.setItem('totalCost', totalVal);
}

// decremet cart acording to product count
function decrementCart() {
    let quantityNum = event.target.parentElement.querySelector('.quantityNum')
    let quantityCalc = event.target.parentElement.querySelector('.quantityNum').textContent;
    let productNumbers = sessionStorage.getItem('cartNumbers');
    if(quantityNum.textContent == 1) {
        return;
    } else {
    productNumbers = parseInt(productNumbers);
    sessionStorage.setItem('cartNumbers', productNumbers - 1);
    document.querySelector('.cartCount').textContent = productNumbers - 1;
    quantityCalc--
    quantityNum.textContent = quantityCalc 

    
    let cartItemPrice = quantityNum.parentElement.parentElement.querySelector(".itemPriceInCart").textContent;
    cartItemPrice = parseInt(cartItemPrice)
    let total = document.querySelector(".basketTotalValue");
    let totalVal = total.textContent
    totalVal = parseInt(totalVal)
    totalVal -= cartItemPrice;
    total.textContent = totalVal
    sessionStorage.setItem('totalCost', totalVal);
    }
}

//  Removes item from cart when X icon is clicked.
function xIconFunction() {
    
    let xIcon = document.querySelectorAll(".cartXIcon");
    
    for(let i = 0; i < xIcon.length; i++) {
        xIcon[i].addEventListener('click', () => {

        let item = xIcon[i].parentElement.querySelector(".tag").innerText;
        let localProducts = sessionStorage.getItem("productsInCart");
        localProducts = JSON.parse(localProducts);
        delete localProducts[item];
        sessionStorage.setItem("productsInCart", JSON.stringify(localProducts));
        let itemWhole = xIcon[i].parentElement;
        itemWhole.remove()


        let quantityNum = itemWhole.querySelector('.quantityNum').textContent;
        let productNumbers = sessionStorage.getItem('cartNumbers');
        productNumbers = parseInt(productNumbers);
        quantityNum = parseInt(quantityNum)
        let cartIcon = document.querySelector('.cartCount');
        cartIcon.textContent = productNumbers - quantityNum;
        sessionStorage.setItem("cartNumbers", cartIcon.textContent )
            

    let cartItemPrice = itemWhole.querySelector(".itemPriceInCart").textContent
    cartItemPrice *= quantityNum; 
    cartItemPrice = parseInt(cartItemPrice)
    let total = document.querySelector(".basketTotalValue");
    let totalVal = total.textContent
    totalVal = parseInt(totalVal)
    totalVal -= cartItemPrice;
    total.textContent = totalVal 
    sessionStorage.setItem('totalCost', totalVal);


        })
        
    }

}



// set items as objects in local storage
function setItemInStorage(product) {
    let cartItems = sessionStorage.getItem('productsInCart');
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
    sessionStorage.setItem('productsInCart', JSON.stringify(cartItems));   
    
}

// set total cost in local storage
function totalCost(product) {
    let cartCost = sessionStorage.getItem('totalCost');
    let productPrice = parseInt(product.itemprice)
    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        sessionStorage.setItem("totalCost", cartCost + productPrice)
    } else {
        sessionStorage.setItem("totalCost", product.itemprice);
    }
}

// display what is in local storage on Cart HTML page
function displayCart() {
    let cartItems = sessionStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector(".products");
    let cartCost = sessionStorage.getItem('totalCost');
 
    if(cartItems && productContainer) {

        productContainer.innerHTML = '';

        Object.values(cartItems).map(item => {
        
            productContainer.innerHTML += `
                <div class="product">
                    <div class="cartXIcon"><i class="far fa-times-circle xIcon"></i></div>
                    <div><img class="cart-product-image" src=${item.itemimg}></div>
                    <div class="itemTitleCart"><span class="tag">${item.tag}</span>${item.itemtitle}</div>
                    <div class="cartItemSize"><span>Size: </span>${item.itemsize}</div>
                <div class="quantity"><i class="fas fa-chevron-circle-up upBtn" onClick="incrementCart()"></i><span class="quantityNum" value="${item.inCart}"> ${item.inCart}</span><i class="fas fa-chevron-circle-down downBtn" onClick="decrementCart()"></i></div>
                
                
                <div class="itemPriceCart" value="${item.itemprice}">$<span class="itemPriceInCart">${item.inCart * item.itemprice}</span></div>
                
                </div>
             
            `
        });

        productContainer.innerHTML += `
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


// create object out of item clicked on
function addToCart(item) {
    const wholeItem = item.parentElement.parentElement;
    const itemTitle = wholeItem.getElementsByClassName('title')[0].innerText;
    const tag = wholeItem.getElementsByClassName('tag')[0].innerText;
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
            this.tag = tag;
            this.inCart = 0;
            
        }
    }
    newObj = new Itemobj(itemTitle, itemImg, itemPrice, itemSize, tag, inCart);
    return newObj;
}


onLoadCartNumbers();
displayCart();
xIconFunction()



// MODAL

let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
let shoppingCartTotal = document.querySelector('.basketTotalValue')
console.log(shoppingCartTotal)

    btn.onclick = () => {
        if(shoppingCartTotal.textContent == 0) {
            alert("No Items In Cart")
        } else {
            modal.style.display = "block";
        }
      }
      span.onclick = () => {
        modal.style.display = "none";
      }
      window.onclick = (event) => {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

