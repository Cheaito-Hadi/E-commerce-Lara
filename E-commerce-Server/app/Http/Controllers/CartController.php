<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Support\Facades\DB;



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
           $total = 0;
    $carts = DB::table('carts')
        ->join('products', 'products.id', '=', 'carts.product_id')
        ->select('products.name', 'products.price')
        ->where('carts.user_id', $request->user_id)
        ->get();

    foreach ($carts as $cart) {
        $total += intval($cart->price);
    }

    return json_encode(["carts" => $carts, "total" => $total]);
    }
}
