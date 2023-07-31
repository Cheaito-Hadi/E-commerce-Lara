<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Favorite;
use App\Models\Product;


class FavoriteController extends Controller
{
    public function getFavorites(Request $request){

        $favorites = Favorite::all() -> where('user_id', $request-> user_id);
        foreach($favorites as $favorite){
            $price = Product::find($favorite -> product_id) -> price;
            $name = Product::find($favorite -> product_id) -> name;
            $favorite -> name = $name;
            $favorite -> price = $price;
        }
        return json_encode(["favorites" => $favorites]);
    }

    function addFavorites(Request $request)
    {
        $favorite = new Favorite;
        $favorite -> user_id = $request -> user_id;
        $favorite -> product_id = $request -> product_id;
        $favorite -> save();

        return json_encode(["favorite_product" => $favorite]);
    }
}
