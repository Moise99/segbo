<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('elements', function(Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('link');
            $table->string('cover');
            $table->text('desc');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('elementype_id');
            $table->unsignedBigInteger('categorie_id');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('elementype_id')->references('id')->on('elementypes')->onDelete('cascade');
            $table->foreign('categorie_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('elements');
    }
};
