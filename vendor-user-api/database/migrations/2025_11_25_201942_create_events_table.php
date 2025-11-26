<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('vendor_id')->nullable()->constrained()->onDelete('set null');
            $table->string('eventType')->nullable();
            $table->dateTime('eventDate')->nullable();
            $table->text('description')->nullable();
            $table->string('dietaryRestrictions')->nullable();
            $table->decimal('budgetMin', 18, 4)->nullable();
            $table->decimal('budgetMax', 18, 4)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
