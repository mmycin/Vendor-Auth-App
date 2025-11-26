<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use App\Models\FavoriteVendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VendorController extends Controller
{


    public function show($id)
    {
        $vendor = Vendor::find($id);

        if (!$vendor) {
            return response()->json(['message' => 'Vendor not found'], 404);
        }

        return response()->json($vendor);
    }

    public function getByUser($userId)
    {
        $vendor = Vendor::where('user_id', $userId)->first();

        if (!$vendor) {
            return response()->json(['message' => 'Vendor not found'], 404);
        }

        return response()->json($vendor);
    }

    public function store(Request $request, $userId)
    {
        // Ensure the authenticated user is the one creating the vendor profile
        if (auth()->id() != $userId) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'businessName' => 'required|string',
            // Add other validations as needed
        ]);

        $data = $request->all();
        $data['user_id'] = $userId;

        $vendor = Vendor::create($data);

        return response()->json($vendor, 201);
    }

    public function update(Request $request, $id)
    {
        $vendor = Vendor::find($id);

        if (!$vendor) {
            return response()->json(['message' => 'Vendor not found'], 404);
        }

        // Check if user is authenticated
        if (!auth('api')->check()) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        if (auth('api')->id() != $vendor->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Validate the request
        $validated = $request->validate([
            'businessName' => 'sometimes|string|max:255',
            'contactName' => 'sometimes|string|max:255',
            'businessPhone' => 'sometimes|string|max:50',
            'businessEmail' => 'sometimes|email|max:255',
            'businessAddress' => 'sometimes|string',
            'serviceArea' => 'sometimes|string|max:255',
            'serviceType' => 'sometimes|string|max:255',
            'cuisineStyle' => 'sometimes|string|max:255',
            'cuisineRegion' => 'sometimes|string|max:255',
            'dining' => 'sometimes|string|max:255',
            'dietaryType' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'website' => 'sometimes|url|max:255',
            'instagram' => 'sometimes|string|max:255',
            'facebook' => 'sometimes|string|max:255',
            'linkedin' => 'sometimes|string|max:255',
        ]);

        $vendor->update($validated);

        return response()->json([
            'message' => 'Vendor updated successfully',
            'vendor' => $vendor->fresh()
        ]);
    }

    public function destroy($id)
    {
        $vendor = Vendor::find($id);

        if (!$vendor) {
            return response()->json(['message' => 'Vendor not found'], 404);
        }

        if (auth()->id() != $vendor->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $vendor->delete();

        return response()->json(null, 204);
    }

    public function search(Request $request)
    {
        $query = Vendor::query();

        if ($request->has('city') && !empty($request->city)) {
            $city = strtolower(trim($request->city));
            $query->whereRaw('LOWER(serviceArea) = ?', [$city]);
        }

        if ($request->has('searchText') && !empty($request->searchText)) {
            $words = explode(' ', strtolower(trim($request->searchText)));
            $query->where(function ($q) use ($words) {
                foreach ($words as $word) {
                    $q->orWhereRaw('LOWER(businessName) LIKE ?', ["%{$word}%"])
                      ->orWhereRaw('LOWER(contactName) LIKE ?', ["%{$word}%"])
                      ->orWhereRaw('LOWER(businessPhone) LIKE ?', ["%{$word}%"])
                      ->orWhereRaw('LOWER(businessEmail) LIKE ?', ["%{$word}%"])
                      ->orWhereRaw('LOWER(businessAddress) LIKE ?', ["%{$word}%"])
                      ->orWhereRaw('LOWER(serviceType) LIKE ?', ["%{$word}%"])
                      ->orWhereRaw('LOWER(cuisineStyle) LIKE ?', ["%{$word}%"])
                      ->orWhereRaw('LOWER(cuisineRegion) LIKE ?', ["%{$word}%"])
                      ->orWhereRaw('LOWER(dining) LIKE ?', ["%{$word}%"])
                      ->orWhereRaw('LOWER(dietaryType) LIKE ?', ["%{$word}%"])
                      ->orWhereRaw('LOWER(description) LIKE ?', ["%{$word}%"]);
                }
            });
        }

        if ($request->has('isOffer') && $request->boolean('isOffer')) {
            $today = now();
            $query->whereNotNull('offer')
                  ->where('offerFrom', '<=', $today)
                  ->where('offerTo', '>=', $today);
        }

        $userId = $request->query('userId');

        if ($request->has('isFavorite') && $request->boolean('isFavorite') && $userId) {
            $favVendorIds = FavoriteVendor::where('user_id', $userId)->pluck('vendor_id');
            $query->whereIn('id', $favVendorIds);
        }

        $vendors = $query->get();

        if ($userId) {
            $favVendorIds = FavoriteVendor::where('user_id', $userId)->pluck('vendor_id')->toArray();
            $vendors->transform(function ($vendor) use ($favVendorIds) {
                $vendor->favorite = in_array($vendor->id, $favVendorIds);
                return $vendor;
            });
        }

        return response()->json($vendors);
    }

    public function addFavorite(Request $request)
    {
        $request->validate([
            'userId' => 'required|integer',
            'vendorId' => 'required|integer',
        ]);

        if (auth()->id() != $request->userId) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $exists = FavoriteVendor::where('user_id', $request->userId)
            ->where('vendor_id', $request->vendorId)
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Already in favorites.']);
        }

        FavoriteVendor::create([
            'user_id' => $request->userId,
            'vendor_id' => $request->vendorId,
        ]);

        return response()->json(['message' => 'Added to favorites.']);
    }

    public function removeFavorite(Request $request)
    {
        $userId = $request->query('userId');
        $vendorId = $request->query('vendorId');

        if (!$userId || !$vendorId) {
             return response()->json(['message' => 'Invalid data.'], 400);
        }

        if (auth()->id() != $userId) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $record = FavoriteVendor::where('user_id', $userId)
            ->where('vendor_id', $vendorId)
            ->first();

        if (!$record) {
            return response()->json(['message' => 'Favorite not found.'], 404);
        }

        $record->delete();

        return response()->json(['message' => 'Removed from favorites.']);
    }
}
