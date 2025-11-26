<?php

use Illuminate\Support\Facades\Route;

// This is a REST API only project.
// All API routes should be defined in routes/api.php

Route::get('/health', function() {
    return response()->json([
        'status' => 'ok'
    ]);
});

// Swagger API Documentation
Route::get('/docs', function() {
    return view('api-docs');
});

Route::get('/', function() {
    return redirect('/docs');
});