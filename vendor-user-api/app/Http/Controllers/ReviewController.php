<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Event;
use Illuminate\Http\Request;

class ReviewController extends Controller
{


    /**
     * Get review by event ID.
     *
     * @param int $eventId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getByEvent($eventId)
    {
        $review = Review::where('event_id', $eventId)->first();

        if (!$review) {
            return response()->json([
                'event_id' => $eventId,
                'rating' => 0,
                'title' => "",
                'comment' => "",
                'created_at' => null
            ]);
        }

        return response()->json($review);
    }

    /**
     * Save (create or update) a review.
     * 
     * @bodyParam eventId int required Event ID. Example: 1
     * @bodyParam rating float required Rating (1-5). Example: 4.5
     * @bodyParam title string Review title. Example: Great service!
     * @bodyParam comment string Review comment. Example: The catering was excellent.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function save(Request $request)
    {
        $request->validate([
            'eventId' => 'required|integer',
            'rating' => 'required|numeric',
            'title' => 'nullable|string',
            'comment' => 'nullable|string',
        ]);

        $event = Event::find($request->eventId);
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        // Ensure the user creating the review is the event owner
        if (auth()->id() != $event->user_id) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $review = Review::updateOrCreate(
            ['event_id' => $request->eventId],
            [
                'user_id' => $event->user_id,
                'vendor_id' => $event->vendor_id, // Assuming event has vendor_id
                'rating' => $request->rating,
                'title' => $request->title,
                'comment' => $request->comment,
            ]
        );

        return response()->json(['message' => 'Review saved successfully']);
    }
}
