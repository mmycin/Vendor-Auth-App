<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Vendor;

class VendorTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_vendor_profile()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'api')->postJson("/api/Vendors/byUser/{$user->id}", [
            'businessName' => 'Test Business',
            'serviceArea' => 'Toronto',
        ]);

        $response->assertStatus(201)
            ->assertJsonFragment(['businessName' => 'Test Business']);
            
        $this->assertDatabaseHas('vendors', ['businessName' => 'Test Business']);
    }

    public function test_can_search_vendors()
    {
        $user = User::factory()->create();
        Vendor::create([
            'user_id' => $user->id,
            'businessName' => 'Catering Co',
            'serviceArea' => 'Toronto',
            'serviceType' => 'Catering'
        ]);

        $response = $this->getJson('/api/Vendors/searchall?city=Toronto');

        $response->assertStatus(200)
            ->assertJsonCount(1);
    }
}
