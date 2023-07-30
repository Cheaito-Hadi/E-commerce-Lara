<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function addOrUpdateProduct(Request $request, $id = "add")
    {
        if($id == "add"){
            $product = new Product;
        }else{
            $product = Product::find($id);
        }

        $product->id = $request-> id;
        $product->name = $request->name ? $request->name : $product->name;
        $product->description = $request->description ? $request->description : $product->description;
        $product->price = $request->price ? $request->price : $product->price;
        $product->category = $request->category ? $request->category : $product->category;
        $file_name = time()."product_image".".".$request->img_path->extension();
        $request -> img_path->move(storage_path('images'),$file_name);
        $product->img_path = storage_path("images")."\\".$file_name;
        $product->save();

        return json_encode(["products" => $product]);
    }

    function deleteProduct($id){
        Product::find($id)->delete();
        return json_encode(["success" => true]);
    }

    function getProducts()
    {   
        $products = Product::all();
        foreach($products as $product) 
        {
            // return $product->img_path;
            $image64 = base64_encode(file_get_contents($product->img_path));
            $product -> img_path = $image64;
        }
        return json_encode(["products" => $products]);
    }

}
