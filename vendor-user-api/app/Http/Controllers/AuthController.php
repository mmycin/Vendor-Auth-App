<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Vendor;

class AuthController extends Controller
{


    /**
     * Login user and return JWT token.
     * 
     * @unauthenticated
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        $token = auth('api')->attempt($credentials);

        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = auth('api')->user();
        // Load vendor relationship to check if user is a vendor
        $user->load('vendor');

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user,
        ]);
    }

    /**
     * Register a new user.
     * 
     * @unauthenticated
     * @bodyParam fullName string required Full name. Example: John Doe
     * @bodyParam email string required Email address. Example: john@example.com
     * @bodyParam password string required Password. Example: password123
     * @bodyParam phone string Phone number. Example: 1234567890
     * @bodyParam address string Address. Example: 123 Main St
     * @bodyParam role string Role (Customer/Vendor). Example: Customer
     * @bodyParam area string Area/Location. Example: Downtown
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $request->validate([
            'fullName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'role' => 'nullable|string',
            'area' => 'nullable|string',
        ]);

        $user = User::create([
            'fullName' => $request->fullName,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'address' => $request->address,
            'role' => $request->role ?? 'Customer',
            'area' => $request->area,
        ]);

        // If role is Vendor, we might want to initialize a vendor record, 
        // but the .NET app does it in a separate step or implicitly.
        // We'll stick to creating the user here.

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
        ], 201);
    }

    /**
     * Logout the user (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth('api')->logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => auth('api')->user(),
            'authorisation' => [
                'token' => auth('api')->refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $user = auth('api')->user();
        $user->load('vendor');
        return response()->json($user);
    }
}
