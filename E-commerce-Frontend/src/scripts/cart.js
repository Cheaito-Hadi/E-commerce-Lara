class Cart{
    constructor(id, name, price, total){
        this.id = id;
        this.name = name;
        this.price = price;
        this.total = total;
    }

    listingCart(){
        return ` <div class="cart-product">
        <div class="product">
            <span class="product-name">Product 1</span>
            <span class="product-price">$10</span>
        </div>
    </div>
        `
    }
    listingTotal() {
        return `<span>Total:</span>
        `
    }
    
}

const cart_objects = [];

function showCarts() {
    const user_logged= localStorage.getItem('user_id')
    let formdata = new FormData();
    formdata.append("user_id", user_logged);

    fetch("http://127.0.0.1:8000/api/show_cart", {
        method: 'POST',
        body: formdata,
    })
    .then(response => response.json())
        .then(data => { console.log(JSON.stringify(data))
            data.carts.forEach(ele => {
                const product = new Cart(
                    ele.id,
                    ele.name,
                    ele.price,
                    ele.total,
                );

                favorites_objects.push(product);
                document.querySelector('.container').innerHTML += product.listingCart();
            });
 })
}