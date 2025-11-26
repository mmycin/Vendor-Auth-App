<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;

$user = User::where('email', 'john@example.com')->first();

if ($user) {
    $token = Auth::guard('api')->attempt([
        'email' => 'john@example.com',
        'password' => 'password123'
    ]);
    
    echo "Token: " . var_export($token, true) . PHP_EOL;
    echo "Type: " . gettype($token) . PHP_EOL;
    echo "Length: " . (is_string($token) ? strlen($token) : 'N/A') . PHP_EOL;
} else {
    echo "User not found" . PHP_EOL;
}
