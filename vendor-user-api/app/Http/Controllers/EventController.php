<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Get all events.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Get all events (admin only, or could be filtered by user)
        $events = Event::with(['user', 'vendor'])->get();
        return response()->json($events);
    }

    /**
     * Get event by ID.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $event = Event::with(['user', 'vendor', 'review'])->find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        return response()->json($event);
    }

    /**
     * Get events for a specific user.
     *
     * @param int $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserEvents($userId)
    {
        // Check authorization
        if (!auth('api')->check()) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        if (auth('api')->id() != $userId) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $events = Event::with(['vendor', 'review'])
            ->where('user_id', $userId)
            ->orderBy('eventDate', 'desc')
            ->get();

        return response()->json($events);
    }

    /**
     * Get events for a specific vendor.
     *
     * @param int $vendorId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getVendorEvents($vendorId)
    {
        // Check if user owns this vendor
        if (!auth('api')->check()) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $vendor = \App\Models\Vendor::find($vendorId);
        if (!$vendor) {
            return response()->json(['message' => 'Vendor not found'], 404);
        }

        if (auth('api')->id() != $vendor->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $events = Event::with(['user', 'review'])
            ->where('vendor_id', $vendorId)
            ->orderBy('eventDate', 'desc')
            ->get();

        return response()->json($events);
    }

    /**
     * Create a new event.
     * 
     * @bodyParam user_id int required User ID creating the event. Example: 1
     * @bodyParam vendor_id int Vendor ID (optional). Example: 1
     * @bodyParam eventType string required Type of event. Example: Wedding
     * @bodyParam eventDate date required Date of event. Example: 2025-12-25
     * @bodyParam description string Description of event. Example: Christmas wedding celebration
     * @bodyParam dietaryRestrictions string Dietary restrictions. Example: Vegetarian options needed
     * @bodyParam budgetMin float Minimum budget. Example: 5000
     * @bodyParam budgetMax float Maximum budget. Example: 10000
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        if (!auth('api')->check()) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'vendor_id' => 'nullable|integer|exists:vendors,id',
            'eventType' => 'required|string|max:255',
            'eventDate' => 'required|date',
            'description' => 'nullable|string',
            'dietaryRestrictions' => 'nullable|string',
            'budgetMin' => 'nullable|numeric|min:0',
            'budgetMax' => 'nullable|numeric|min:0',
        ]);

        // Ensure user can only create events for themselves
        if (auth('api')->id() != $validated['user_id']) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $event = Event::create($validated);

        return response()->json([
            'message' => 'Event created successfully',
            'event' => $event->load(['user', 'vendor'])
        ], 201);
    }

    /**
     * Update an event.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        if (!auth('api')->check()) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        if (auth('api')->id() != $event->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'vendor_id' => 'nullable|integer|exists:vendors,id',
            'eventType' => 'sometimes|string|max:255',
            'eventDate' => 'sometimes|date',
            'description' => 'nullable|string',
            'dietaryRestrictions' => 'nullable|string',
            'budgetMin' => 'nullable|numeric|min:0',
            'budgetMax' => 'nullable|numeric|min:0',
        ]);

        $event->update($validated);

        return response()->json([
            'message' => 'Event updated successfully',
            'event' => $event->fresh(['user', 'vendor'])
        ]);
    }

    /**
     * Delete an event.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        if (!auth('api')->check()) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        if (auth('api')->id() != $event->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $event->delete();

        return response()->json([
            'message' => 'Event deleted successfully'
        ]);
    }
}
