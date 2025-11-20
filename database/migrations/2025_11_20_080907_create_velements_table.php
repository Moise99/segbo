<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('velements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('element_id')->constrained('elements')->onDelete('cascade');
            $table->unsignedBigInteger('viewers')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('velements');
    }
};
