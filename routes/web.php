<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ElementController;
use App\Http\Controllers\FindController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\SubscriberController;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

    // Routes for client
    Route::get('/', [WelcomeController::class, 'topReporter'])->name('top.reporter');
    Route::get('/find/reporter', [FindController::class, 'findReporter'])->name('find.reporter');
    Route::get('/segbo/{username}', [FindController::class, 'findReporterDetails'])->name('find.more');
    Route::get('/find/article', [FindController::class, 'findArticle'])->name('find.article');
    Route::get('/segbopub/{title}', [FindController::class, 'findArticleDetails'])->name('find.pubmore');
    Route::post('/reporters/{username}/subscribe', [SubscriberController::class, 'store'])->name('subscriber.store');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth', 'verified')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/acdetail', [ProfileController::class, 'acdedit'])->name('acdetail.edit');
    Route::put('/acdetail/{id}/update', [ProfileController::class, 'acdupdate'])->name('acdetail.update');
});

Route::middleware('auth', 'verified')->group(function () {
    // Routes for Element
    Route::get('/element/create', [ElementController::class, 'create'])->name('element.create');
    Route::post('/element/store', [ElementController::class, 'store'])->name('element.store');
    Route::get('/element/list', [ElementController::class, 'list'])->name('element.list');
    Route::get('/element/{id}/edit/', [ElementController::class, 'edit'])->name('element.edit');
    Route::put('/element/{id}/update', [ElementController::class, 'update'])->name('element.update');
    Route::get('/element/{id}/endesable', [ElementController::class, 'endesable'])->name('element.endesable');
});

require __DIR__.'/auth.php';
