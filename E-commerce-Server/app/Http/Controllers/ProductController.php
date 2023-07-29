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
        $product->img_path = $request->img_path ? $request->img_path : $product->img_path;
        $product->save();

        return json_encode(["products" => $product]);
    }

    function deleteProduct($id){
        Product::find($id)->delete();
        return json_encode(["success" => true]);
    }

}
