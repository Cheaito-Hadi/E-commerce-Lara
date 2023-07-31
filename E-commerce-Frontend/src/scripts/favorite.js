class Favorite{
    constructor(id, name, price, img_path){
        this.id = id;
        this.name = name;
        this.price = price;
        this.img_path = img_path;
    }

    viewFavorites () {
        return `<div class="product">
        <div class="product-wrapper">
            <div class="img-container">
                <img src="data:image/png;base64,${this.img_path}" width="200" height="200">
            </div>
            <div class="product-container">
                <div class="details">
                    <div class="detail-txt">Name: <span class="txt">${this.name}</span></div>
                    <div class="detail-txt">Price: <span class="txt">$ ${this.price}</span></div>
                </div>
            </div>
        </div>
    </div>
    `
    }
}

const favorites_objects = [];

function showFavorites() {
    const user_logged= localStorage.getItem('user_id')
    let formdata = new FormData();
    formdata.append("user_id", user_logged);

    fetch("http://127.0.0.1:8000/api/show_favorite", {
        method: 'POST',
        body: formdata,
    })
    .then(response => response.json())
        .then(data => { console.log(JSON.stringify(data))
            data.favorites.forEach(ele => {
                const product = new Favorite(
                    ele.id,
                    ele.name,
                    ele.price,
                    ele.img_path,
                );

                favorites_objects.push(product);
                document.querySelector('.container').innerHTML += product.viewFavorites();
            });
 })
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
showFavorites();



