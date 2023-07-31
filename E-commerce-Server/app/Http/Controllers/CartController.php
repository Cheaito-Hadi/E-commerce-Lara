<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;


class CartController extends Controller
{
    function addToCart (Request $request) 
    {
        $cart = new Cart;
        $cart -> user_id = $request -> user_id;
        $cart -> product_id = $request -> product_id;
        $cart -> save();

        return json_encode(["cart_products" => $cart]);
    }

    public function viewCart(Request $request){

        $carts = Cart::all() -> where('user_id', $request-> user_id);
        foreach($carts as $cart){
            $price = Product::find($cart -> product_id) -> price;
            $name = Product::find($cart -> product_id) -> name;
            $cart -> name = $name;
            $cart -> price = $price;
        }
        return json_encode(["carts" => $carts]);
    }
}
