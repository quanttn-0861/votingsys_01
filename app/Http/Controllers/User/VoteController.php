<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ParticipantVote;
use App\Models\Participant;
use App\Models\Poll;
use App\Models\Option;
use App\Models\Comment;
use Illuminate\Support\Facades\DB;

class VoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pollId = 5; //thay đổi id khi get link poll
        $pollInfo = Poll::where('id', $pollId)->first();

        $participantVote = ParticipantVote::with([
            'participant',
            'option',
        ])->get();

        $pollOption = Option::where('poll_id', $pollId)->get();
        $comments =  Comment::where('poll_id', $pollId)->with([
            'user',
        ])->get();
        
        return response()->json([
                'pollInfo' => $pollInfo,
                'pollOption' => $pollOption,
                'participantVote' => $participantVote,
                'pollId' => $pollId,
                'comments' => $comments,
            ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            $inputPaticipant = $request->only('name', 'email');
            $inputPaticipant['user_id'] = 1; //thay đổi khi login

            DB::beginTransaction();
            $participantId = Participant::insertGetId($inputPaticipant);

            $inputPaticipantVote['option_id'] = $request->option;
            $inputPaticipantVote['participant_id'] = $participantId;

            ParticipantVote::create($inputPaticipantVote);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            
            return response()
                ->json(['message' => 'Failed: Add failed']);
        }
        
        return response()
            ->json(['message' => 'Success: Add successfully']);
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
