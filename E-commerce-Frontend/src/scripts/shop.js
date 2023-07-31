class Product {
    constructor(id, name, description, price, category, img_path) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.img_path = img_path;
    }

    viewProducts() {
        return ` <div class="product" data-product_id= "${this.id}">
        <div class="description"><span class="description-span"><b>Description:</b> ${this.description}</span>
        <div class="fav-cart">
                        <div><span class="favorite-icon">&#10084;</span></div>
                        <div><span id="cart-btn" class="favorite-icon">&#x1F6D2;</span></div>
                    </div>
                </div>
            <div class="product-wrapper">
                <div class="img-container">
                    <img src="data:image/png;base64,${this.img_path}" width="200" height="200">
                </div>
                <div class="product-container">
                    <div class="details">
                        <div class="detail-txt">Name: <span class="txt">${this.name}</span></div>
                        <div class="detail-txt">Price: <span class="txt">$ ${this.category}</span></div>
                        <div class="detail-txt">Category: <span class="txt">${this.price}</span></div>
                    </div>
                    
                </div>
            </div>
        </div>
        `
    }
}
const products_objects = [];
function showDashboard() {
  
    fetch("http://127.0.0.1:8000/api/show_products")
        .then(response => response.json())
        .then(data => { console.log(JSON.stringify(data))
            data.products.forEach(ele => {
                const product = new Product(
                    ele.id,
                    ele.name,
                    ele.description,
                    ele.category,
                    ele.price,
                    ele.img_path,
                );

                products_objects.push(product);
                document.querySelector('.container').innerHTML += product.viewProducts();
            });
            const productCards = document.querySelectorAll('.product');
            productCards.forEach((card) => {
            const favorite_btn = card.querySelector('.favorite-icon')
                card.addEventListener('mouseenter', () => {
                    const info = card.querySelector('.product-wrapper');
                    const description = card.querySelector('.description');
                    const product_id = card.getAttribute('data-product_id');
                    localStorage.setItem('product_id', product_id)
                    info.style.display = 'none';
                    description.style.display = 'flex';
                });
                card.addEventListener('mouseleave', () => {
                    const info = card.querySelector('.product-wrapper');
                    const description = card.querySelector('.description');
                    info.style.display = 'block';
                    description.style.display = 'none';
                });
                favorite_btn.addEventListener('click', () =>
                {
                    const favoriteData = new FormData()
                    favoriteData.append('user_id', localStorage.getItem('user_id'))
                    favoriteData.append('product_id', localStorage.getItem('product_id'))
                    fetch("http://127.0.0.1:8000/api/add_favorite", 
                    {
                        method: "POST",
                        body: favoriteData
                    })
                    .then(response => response.json())
                    .then(results => console.log(results))
                    .catch(error => console.error('error', error))
                })
            });
        });

}

function showProducts() 
{
    const role = parseInt(localStorage.getItem('role'));
    const productsDiv = document.querySelector('.nav-right div:nth-child(2)');
    if (role === 1) 
    {
        productsDiv.style.display = 'block';
    } 
    else 
    {
        productsDiv.style.display = 'none';
    }
}
showProducts();
showDashboard();