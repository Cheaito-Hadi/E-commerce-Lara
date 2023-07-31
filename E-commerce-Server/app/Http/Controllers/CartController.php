<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;


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

    function viewCart () 
    {
        
    }
}
