<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Favorite;
use App\Models\Product;


class FavoriteController extends Controller
{
    function getFavorites()
    {

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
