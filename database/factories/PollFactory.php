<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Poll::class, function (Faker $faker) {

    return [
        'user_id' => $faker->randomElement(App\Models\User::all()->pluck('id')->toArray()),
        'title' => $faker->text,
        'description' => $faker->paragraph,
        'location' => $faker->address,
        'status' => $faker->boolean,
        'multiple' => $faker->boolean,
        'name' => $faker->name,
        'email' => $faker->email,
    ];
});
