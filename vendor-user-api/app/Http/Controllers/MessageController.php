<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{


    /**
     * Send a message.
     * 
     * @bodyParam senderId int required Sender User ID. Example: 1
     * @bodyParam receiverId int required Receiver User ID. Example: 2
     * @bodyParam message string required Message content. Example: Hello, I'm interested in your services!
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function send(Request $request)
    {
        $request->validate([
            'senderId' => 'required|integer',
            'receiverId' => 'required|integer',
            'message' => 'required|string',
        ]);

        if (auth()->id() != $request->senderId) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $message = Message::create([
            'sender_id' => $request->senderId,
            'receiver_id' => $request->receiverId,
            'content' => $request->message,
            'sentAt' => now(),
            'isRead' => false,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully.',
            'data' => $message
        ]);
    }

    /**
     * Get users involved in chat with the given user.
     *
     * @param int $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getChatUsers($userId)
    {
        if (auth()->id() != $userId) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Get users who sent messages to this user
        $senders = DB::table('messages')
            ->join('users', 'messages.sender_id', '=', 'users.id')
            ->leftJoin('vendors', 'users.id', '=', 'vendors.user_id')
            ->where('messages.receiver_id', $userId)
            ->select('users.id', 'users.fullName', 'vendors.businessName');

        // Get users who received messages from this user
        $receivers = DB::table('messages')
            ->join('users', 'messages.receiver_id', '=', 'users.id')
            ->leftJoin('vendors', 'users.id', '=', 'vendors.user_id')
            ->where('messages.sender_id', $userId)
            ->select('users.id', 'users.fullName', 'vendors.businessName');

        $users = $senders->union($receivers)->distinct()->get();

        return response()->json($users);
    }

    /**
     * Get conversation between two users.
     *
     * @param int $userId
     * @param int $otherUserId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getConversation($userId, $otherUserId)
    {
        if (auth()->id() != $userId) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $messages = Message::where(function ($query) use ($userId, $otherUserId) {
                $query->where('sender_id', $userId)
                      ->where('receiver_id', $otherUserId);
            })
            ->orWhere(function ($query) use ($userId, $otherUserId) {
                $query->where('sender_id', $otherUserId)
                      ->where('receiver_id', $userId);
            })
            ->orderBy('sentAt', 'asc')
            ->get();

        return response()->json($messages);
    }
}
