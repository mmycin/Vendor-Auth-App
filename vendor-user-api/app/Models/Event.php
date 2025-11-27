<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $user_id
 * @property int|null $vendor_id
 * @property string $eventType
 * @property \Illuminate\Support\Carbon $eventDate
 * @property string|null $description
 * @property string|null $dietaryRestrictions
 * @property float|null $budgetMin
 * @property float|null $budgetMax
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'vendor_id',
        'eventType',
        'eventDate',
        'description',
        'dietaryRestrictions',
        'budgetMin',
        'budgetMax',
    ];

    protected $casts = [
        'eventDate' => 'datetime',
        'budgetMin' => 'decimal:4',
        'budgetMax' => 'decimal:4',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }

    public function review()
    {
        return $this->hasOne(Review::class);
    }
}
