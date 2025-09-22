<?php


use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ElementController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    // Routes for Element
    Route::get('/element/create', [ElementController::class, 'create'])->name('element.create');
    Route::post('/element/store', [ElementController::class, 'store'])->name('element.store');
    Route::get('/element/list', [ElementController::class, 'list'])->name('element.list');
    Route::get('/element/{id}/edit/', [ElementController::class, 'edit'])->name('element.edit');
    Route::put('/element/{id}/update', [ElementController::class, 'update'])->name('element.update');
    Route::delete('/element/{id}/destroy', [ElementController::class, 'destroy'])->name('element.destroy');
});

require __DIR__.'/auth.php';
