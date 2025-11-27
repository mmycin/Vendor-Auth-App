<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use App\Models\FavoriteVendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VendorController extends Controller
{


    /**
     * Get a vendor by ID.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $vendor = Vendor::find($id);

        if (!$vendor) {
            return response()->json(['message' => 'Vendor not found'], 404);
        }

        return response()->json($vendor);
    }

    /**
     * Get vendor by User ID.
     *
     * @param int $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getByUser($userId)
    {
        $vendor = Vendor::where('user_id', $userId)->first();

        if (!$vendor) {
            return response()->json(['message' => 'Vendor not found'], 404);
        }

        return response()->json($vendor);
    }

    /**
     * Create a new vendor profile.
     * 
     * @bodyParam businessName string required The name of the business. Example: Catering Co
     * @bodyParam contactName string The contact person name. Example: Jane Smith
     * @bodyParam businessPhone string The business phone number. Example: 555-1234
     * @bodyParam businessEmail string The business email. Example: info@cateringco.com
     * @bodyParam businessAddress string The business address. Example: 789 Business Ave
     * @bodyParam serviceArea string The service area. Example: Toronto
     * @bodyParam serviceType string The type of service. Example: Catering
     * @bodyParam cuisineStyle string The cuisine style. Example: Italian
     * @bodyParam cuisineRegion string The cuisine region. Example: Tuscany
     * @bodyParam dining string Dining type. Example: Casual
     * @bodyParam dietaryType string Dietary type. Example: Vegan
     * @bodyParam description string Description of the business. Example: Premium catering services
     * @bodyParam imageUrl string URL of the vendor image. Example: https://example.com/image.jpg
     * @bodyParam website string Website URL. Example: https://cateringco.com
     * @bodyParam instagram string Instagram handle. Example: @cateringco
     * @bodyParam facebook string Facebook handle. Example: cateringco
     * @bodyParam linkedin string LinkedIn handle. Example: cateringco
     * @bodyParam offer string Current offer. Example: 10% off
     * @bodyParam offerFrom date Offer start date. Example: 2025-01-01
     * @bodyParam offerTo date Offer end date. Example: 2025-12-31
     * @bodyParam featured boolean Whether the vendor is featured. Example: false
     * @bodyParam instantQuoteAvailable boolean Whether instant quote is available. Example: true
     *
     * @param Request $request
     * @param int $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request, $userId)
    {
        // Ensure the authenticated user is the one creating the vendor profile
        if (auth()->id() != $userId) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'businessName' => 'required|string|max:255',
            'contactName' => 'nullable|string|max:255',
            'businessPhone' => 'nullable|string|max:50',
            'businessEmail' => 'nullable|email|max:255',
            'businessAddress' => 'nullable|string',
            'serviceArea' => 'nullable|string|max:255',
            'serviceType' => 'nullable|string|max:255',
            'cuisineStyle' => 'nullable|string|max:255',
            'cuisineRegion' => 'nullable|string|max:255',
            'dining' => 'nullable|string|max:255',
            'dietaryType' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'imageUrl' => 'nullable|string|url|max:255',
            'website' => 'nullable|string|url|max:255',
            'instagram' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'linkedin' => 'nullable|string|max:255',
            'offer' => 'nullable|string|max:255',
            'offerFrom' => 'nullable|date',
            'offerTo' => 'nullable|date',
            'featured' => 'boolean',
            'instantQuoteAvailable' => 'boolean',
        ]);

        $data = $request->all();
        $data['user_id'] = $userId;

        $vendor = Vendor::create($data);

        return response()->json($vendor, 201);
    }

    /**
     * Update a vendor profile.
     * 
     * @bodyParam businessName string The name of the business. Example: Updated Catering Co
     * @bodyParam contactName string The contact person name. Example: Jane Smith
     * @bodyParam businessPhone string The business phone number. Example: 555-1234
     * @bodyParam businessEmail string The business email. Example: info@cateringco.com
     * @bodyParam businessAddress string The business address. Example: 789 Business Ave
     * @bodyParam serviceArea string The service area. Example: Toronto
     * @bodyParam serviceType string The type of service. Example: Catering
     * @bodyParam cuisineStyle string The cuisine style. Example: Italian
     * @bodyParam cuisineRegion string The cuisine region. Example: Tuscany
     * @bodyParam dining string Dining type. Example: Casual
     * @bodyParam dietaryType string Dietary type. Example: Vegan
     * @bodyParam description string Description of the business. Example: Premium catering services
     * @bodyParam imageUrl string URL of the vendor image. Example: https://example.com/image.jpg
     * @bodyParam website string Website URL. Example: https://cateringco.com
     * @bodyParam instagram string Instagram handle. Example: @cateringco
     * @bodyParam facebook string Facebook handle. Example: cateringco
     * @bodyParam linkedin string LinkedIn handle. Example: cateringco
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
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

    /**
     * Delete a vendor profile.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
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

    /**
     * Search for vendors.
     * 
     * @queryParam city string Filter by service area. Example: Toronto
     * @queryParam searchText string Search in business name, description, etc. Example: catering
     * @queryParam isOffer boolean Filter vendors with active offers. Example: true
     * @queryParam isFavorite boolean Filter user's favorite vendors (requires userId). Example: false
     * @queryParam userId int User ID for favorite filtering. Example: 1
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function search(Request $request)
    {
        $query = Vendor::query();

        if ($request->has('city') && !empty($request->city)) {
            $city = trim($request->city);
            $query->where('serviceArea', $city);
        }

        if ($request->has('searchText') && !empty($request->searchText)) {
            $words = explode(' ', trim($request->searchText));
            $query->where(function ($q) use ($words) {
                foreach ($words as $word) {
                    $q->orWhere('businessName', 'LIKE', "%{$word}%")
                      ->orWhere('contactName', 'LIKE', "%{$word}%")
                      ->orWhere('businessPhone', 'LIKE', "%{$word}%")
                      ->orWhere('businessEmail', 'LIKE', "%{$word}%")
                      ->orWhere('businessAddress', 'LIKE', "%{$word}%")
                      ->orWhere('serviceType', 'LIKE', "%{$word}%")
                      ->orWhere('cuisineStyle', 'LIKE', "%{$word}%")
                      ->orWhere('cuisineRegion', 'LIKE', "%{$word}%")
                      ->orWhere('dining', 'LIKE', "%{$word}%")
                      ->orWhere('dietaryType', 'LIKE', "%{$word}%")
                      ->orWhere('description', 'LIKE', "%{$word}%");
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

    /**
     * Add a vendor to favorites.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
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

    /**
     * Remove a vendor from favorites.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
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
