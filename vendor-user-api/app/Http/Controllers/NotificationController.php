<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotificationController extends Controller
{


    public function getNotifications($userId)
    {
        if (auth()->id() != $userId) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $notifications = DB::table('events')
            ->join('vendors', 'events.vendor_id', '=', 'vendors.id')
            ->join('users', 'events.user_id', '=', 'users.id')
            ->leftJoin('reviews', 'events.id', '=', 'reviews.event_id')
            ->where('events.user_id', $userId)
            ->where('events.vendor_id', '!=', 0) // Assuming 0 or null means no vendor
            ->orderBy('events.eventDate', 'desc')
            ->select(
                'events.id',
                'events.user_id',
                'users.fullName',
                'events.eventType',
                'events.eventDate',
                'vendors.id as vendor_id',
                'vendors.businessName',
                DB::raw('COALESCE(reviews.rating, 0) as rating'),
                DB::raw('COALESCE(reviews.title, "") as title'),
                DB::raw('COALESCE(reviews.comment, "") as comment'),
                'reviews.created_at'
            )
            ->get();

        return response()->json($notifications);
    }
}
