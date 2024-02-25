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
        Schema::create('soutenirs', function (Blueprint $table) {
            $table->string('matricule');
            $table->unsignedBigInteger('idorg');
            $table->string('annee_univ');
            $table->integer('note');
            $table->string('président');
            $table->string('examinateur');
            $table->string('rapporteur_int');
            $table->string('rapporteur_ext');
            $table->timestamps();

            $table->foreign('matricule')->references('matricule')->on('etudiants');
            $table->foreign('idorg')->references('idorg')->on('organismes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('soutenirs');
    }
};