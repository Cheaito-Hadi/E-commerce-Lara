<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\CartController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::post('/add_update_product/{id?}', [ProductController::class, "addOrUpdateProduct"]);
Route::post('/delete_product/{id}', [ProductController::class, "deleteProduct"]);
Route::get('/show_products', [ProductController::class, "getProducts"]);
Route::post('/add_favorite', [FavoriteController::class, "addFavorites"]);
Route::post('/show_favorite', [FavoriteController::class, "getFavorites"]);
Route::get('/show_cart', [CartController::class, "viewCart"]);
Route::post('/add_cart', [CartController::class, "addToCart"]);