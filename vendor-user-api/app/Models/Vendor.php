<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $user_id
 * @property string $businessName
 * @property string|null $contactName
 * @property string|null $businessPhone
 * @property string|null $businessEmail
 * @property string|null $businessAddress
 * @property string|null $serviceArea
 * @property string|null $serviceType
 * @property string|null $cuisineStyle
 * @property string|null $cuisineRegion
 * @property string|null $dining
 * @property string|null $dietaryType
 * @property string|null $description
 * @property string|null $imageUrl
 * @property string|null $website
 * @property string|null $instagram
 * @property string|null $facebook
 * @property string|null $linkedin
 * @property string|null $offer
 * @property \Illuminate\Support\Carbon|null $offerFrom
 * @property \Illuminate\Support\Carbon|null $offerTo
 * @property bool $featured
 * @property bool $instantQuoteAvailable
 * @property float $ratingAverage
 * @property int $reviewCount
 * @property int $listings
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class Vendor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'businessName',
        'contactName',
        'businessPhone',
        'businessEmail',
        'businessAddress',
        'serviceArea',
        'serviceType',
        'cuisineStyle',
        'cuisineRegion',
        'dining',
        'dietaryType',
        'description',
        'imageUrl',
        'website',
        'instagram',
        'facebook',
        'linkedin',
        'offer',
        'offerFrom',
        'offerTo',
        'featured',
        'instantQuoteAvailable',
        'ratingAverage',
        'reviewCount',
        'listings',
    ];

    protected $casts = [
        'offerFrom' => 'datetime',
        'offerTo' => 'datetime',
        'featured' => 'boolean',
        'instantQuoteAvailable' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function events()
    {
        return $this->hasMany(Event::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function favoritedBy()
    {
        return $this->hasMany(FavoriteVendor::class);
    }
}
