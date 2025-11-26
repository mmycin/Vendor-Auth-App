<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
