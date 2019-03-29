<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Poll;
use App\Models\Option;

class PollController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('home');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $input = $request->only('name', 'email', 'title', 'multiple', 'description', 'date_close', 'location');
            $input['user_id'] = 1; //thay the khi lam chuc nang login
            DB::beginTransaction();

            $pollId = Poll::insertGetId($input);

            $inputOption = $request->only('options');
            $inputOption = $inputOption['options'];

            foreach ($inputOption as $key => $value) {
                $option = new Option;
                $option->name = $value;
                $option->poll_id = $pollId;
                $option->save();
            }
            DB::commit();

            return response()
                ->json(['message' => 'Success: Add successfully']);
        } catch (Exception $e) {
            DB::rollBack();

            return response()
                ->json(['message' => 'Failed: Add failed']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
