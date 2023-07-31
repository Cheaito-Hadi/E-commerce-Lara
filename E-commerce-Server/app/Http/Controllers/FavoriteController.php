<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Favorite;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class FavoriteController extends Controller
{
    public function getFavorites(Request $request){

//         SELECT products.name,products.price,products.img_path 
// from products 
// INNER JOIN favorites
// ON favorites.product_id = products.id
// where favorites.user_id = 8

        $favorites = DB::table('favorites')
         -> join('products', 'products.id', '=', 'favorites.product_id')
         -> select('products.name','products.price', 'products.img_path')
         -> where('favorites.user_id', $request -> user_id)
         -> get();

         foreach($favorites as $favorite) 
        {
            $image64 = base64_encode(file_get_contents($favorite->img_path));
            $favorite -> img_path = $image64;
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
