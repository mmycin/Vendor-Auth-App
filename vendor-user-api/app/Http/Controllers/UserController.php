<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{


    /**
     * Get all users.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(User::all());
    }

    /**
     * Get user by ID.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    /**
     * Update a user profile.
     * 
     * @bodyParam fullName string Full name. Example: John Updated
     * @bodyParam phone string Phone number. Example: 9876543210
     * @bodyParam address string Address. Example: 456 New St
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Authorization check: Ensure user can only update their own profile
        if (auth()->id() != $id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'fullName' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $id,
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'role' => 'sometimes|string',
            'area' => 'nullable|string',
            'password' => 'nullable|string|min:6',
        ]);

        $data = $request->except(['password']);

        if ($request->has('password') && !empty($request->password)) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return response()->json($user); // 204 No Content is also valid, but .NET returns NoContent()
    }

    /**
     * Delete a user.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Authorization check
        if (auth()->id() != $id) {
             // Admin check could go here
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $user->delete();

        return response()->json(null, 204);
    }
}
