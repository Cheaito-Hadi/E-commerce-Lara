// let image64 = ""
// const input = document.getElementById("product-img");
// const convertBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//         const fileReader = new FileReader();
//         fileReader.readAsDataURL(file);

//         fileReader.onload = () => {
//             resolve(fileReader.result);
//         };

//         fileReader.onerror = (error) => {
//             reject(error);
//         };
//     });
// };

// const uploadImage = async (event) => {
//     debugger
//     const file = event.target.files[0];
//     image64 = await convertBase64(file);

// };
// input.addEventListener("change", (e) => {
//     uploadImage(e);
// });

addProduct = () =>
{
    const submit_btn = document.getElementById("submit-product")
    submit_btn.addEventListener('click', (e) => {
        e.preventDefault()

        let name = document.getElementById("product-name").value;
        let description = document.getElementById("product-description").value;
        let price = document.getElementById("product-price").value;
        let category = document.getElementById("product-category").value;
        let image = document.getElementById("product-img");
        
        let formdata = new FormData();
        formdata.append("name", name);
        formdata.append("description", description);
        formdata.append("price", price);
        formdata.append("category", category);
        formdata.append("img_path", image.files[0]);

        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        
        fetch("http://127.0.0.1:8000/api/add_update_product", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    })
}

addProduct();