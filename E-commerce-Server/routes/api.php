<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ProductController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::post('/add_update_product/{id?}', [ProductController::class, "addOrUpdateProduct"]);
Route::post('/delete_product/{id}', [ProductController::class, "deleteProduct"]);