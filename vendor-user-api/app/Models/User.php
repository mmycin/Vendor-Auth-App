<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

/**
 * @property int $id
 * @property string $fullName
 * @property string $email
 * @property string|null $phone
 * @property string $password
 * @property string|null $address
 * @property string $role
 * @property string|null $area
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'fullName',
        'email',
        'phone',
        'password',
        'address',
        'role',
        'area',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'nameid' => $this->id,
            'unique_name' => $this->fullName,
            'email' => $this->email,
            'role' => $this->role,
        ];
    }

    public function vendor()
    {
        return $this->hasOne(Vendor::class);
    }

    public function events()
    {
        return $this->hasMany(Event::class);
    }

    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function favoriteVendors()
    {
        return $this->hasMany(FavoriteVendor::class);
    }
}
