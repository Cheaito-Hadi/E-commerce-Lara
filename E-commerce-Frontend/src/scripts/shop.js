class Product {
    constructor(id, name, description, price, category, img_path) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.img_path = img_path;
    }

    viewProducts() {
        return ` <div class="product">
        <div class="description"><span class="description-span"><b>Description:</b> ${this.description}</span>
        <div class="fav-cart">
                        <div><span class="favorite-icon">&#10084;</span></div>
                        <div class="detail-txt">Cart</div>
                    </div>
                </div>
            <div class="product-wrapper">
                <div class="img-container">
                    <img src="data:image/png;base64,${this.img_path}" width="200" height="200">
                </div>
                <div class="product-container">
                    <div class="details">
                        <div class="detail-txt">Name: <span class="txt">${this.name}</span></div>
                        <div class="detail-txt">Category: <span class="txt">${this.price}</span></div>
                        <div class="detail-txt">Price: <span class="txt">${this.category}</span></div>
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
                card.addEventListener('mouseenter', () => {
                    const info = card.querySelector('.product-wrapper');
                    const description = card.querySelector('.description');
                    info.style.display = 'none';
                    description.style.display = 'flex';
                });
                card.addEventListener('mouseleave', () => {
                    const info = card.querySelector('.product-wrapper');
                    const description = card.querySelector('.description');
                    info.style.display = 'block';
                    description.style.display = 'none';
                });
            });
        });
}

showDashboard();