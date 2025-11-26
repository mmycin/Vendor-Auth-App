<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vendors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('businessName')->nullable();
            $table->string('contactName')->nullable();
            $table->string('businessPhone')->nullable();
            $table->string('businessEmail')->nullable();
            $table->string('businessAddress')->nullable();
            $table->string('serviceArea')->nullable();
            $table->string('serviceType')->nullable();
            $table->string('cuisineStyle')->nullable();
            $table->string('cuisineRegion')->nullable();
            $table->string('dining')->nullable();
            $table->string('dietaryType')->nullable();
            $table->text('description')->nullable();
            $table->string('imageUrl')->nullable();
            $table->string('website')->nullable();
            $table->string('instagram')->nullable();
            $table->string('facebook')->nullable();
            $table->string('linkedin')->nullable();
            $table->text('offer')->nullable();
            $table->dateTime('offerFrom')->nullable();
            $table->dateTime('offerTo')->nullable();
            $table->boolean('featured')->default(false);
            $table->boolean('instantQuoteAvailable')->default(false);
            $table->double('ratingAverage')->default(0);
            $table->integer('reviewCount')->default(0);
            $table->text('listings')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vendors');
    }
};
