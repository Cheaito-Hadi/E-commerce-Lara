class Cart{
    constructor(id, name, price){
        this.id = id;
        this.name = name;
        this.price = price;
    }

    listingCart(){
        return ` <div class="cart-product">
        <div class="product">
            <span class="product-name">${this.name}</span>
            <span class="product-price">$ ${this.price}</span>
        </div>
    </div>
        `
    }

}

const cart_objects = [];

function showCarts() {
    let total = 0
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
                );
                total= data.total
                cart_objects.push(product);
                document.querySelector('.new-item').innerHTML += product.listingCart();                
            });
            
            document.querySelector('.total').innerHTML += `<span>${total}</span>`
 })
}

showCarts();