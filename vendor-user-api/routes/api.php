<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\NotificationController;

Route::controller(AuthController::class)->group(function () {
    Route::post('Users/login', 'login');
    Route::post('Users/register', 'register');
    Route::post('Users/google-login', 'googleLogin');
    Route::post('logout', 'logout')->middleware('auth:api');
    Route::post('refresh', 'refresh')->middleware('auth:api');
    Route::get('me', 'me')->middleware('auth:api');
});

Route::controller(UserController::class)->middleware('auth:api')->group(function () {
    Route::get('Users', 'index');
    Route::get('Users/{id}', 'show');
    Route::put('Users/{id}', 'update');
    Route::delete('Users/{id}', 'destroy');
});

Route::controller(VendorController::class)->group(function () {
    // Specific routes MUST come before parameterized routes
    Route::get('Vendors/searchall', 'search');
    Route::get('Vendors/byUser/{userId}', 'getByUser');
    Route::post('Vendors/byUser/{userId}', 'store')->middleware('auth:api');
    Route::post('Vendors/favorite', 'addFavorite')->middleware('auth:api');
    Route::delete('Vendors/favorite', 'removeFavorite')->middleware('auth:api');
    
    // Parameterized routes come last
    Route::get('Vendors/{id}', 'show')->where('id', '[0-9]+');
    Route::put('Vendors/{id}', 'update')->middleware('auth:api');
    Route::delete('Vendors/{id}', 'destroy')->middleware('auth:api');
});

Route::controller(EventController::class)->middleware('auth:api')->group(function () {
    // Specific routes first
    Route::get('events/user/{userId}', 'getUserEvents');
    Route::get('events/vendor/{vendorId}', 'getVendorEvents');
    
    // Standard CRUD
    Route::get('events', 'index');
    Route::post('events', 'store');
    Route::get('events/{id}', 'show');
    Route::put('events/{id}', 'update');
    Route::delete('events/{id}', 'destroy');
});

Route::controller(MessageController::class)->middleware('auth:api')->group(function () {
    Route::post('messages/send', 'send');
    Route::get('messages/chat-users/{userId}', 'getChatUsers');
    Route::get('messages/conversation/{userId}/{otherUserId}', 'getConversation');
});

Route::controller(ReviewController::class)->group(function () {
    Route::get('reviews/event/{eventId}', 'getByEvent');
    Route::post('reviews', 'save')->middleware('auth:api');
});

Route::controller(NotificationController::class)->middleware('auth:api')->group(function () {
    Route::get('notifications/{userId}', 'getNotifications');
});
