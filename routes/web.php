<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'HomeController@index');

Route::namespace('Admin')->group(function(){
    Route::resource('admin', 'HomeController');
});

Route::resource('poll', 'PollController');

Route::namespace('User')->prefix('api')->group(function(){
    Route::resource('vote', 'VoteController');
});

Route::view('/{any}', 'home')
    ->where('any', '.*');
