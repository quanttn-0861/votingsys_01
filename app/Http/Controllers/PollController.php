<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Poll;
use App\Models\Option;
use App\Models\Setting;
use App\Models\Link;
use App\Mail\SendInvitationParticipants;
use App\Jobs\JobSendInvitationParticipants;
use Mail;
use Carbon\Carbon;

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

            $inputOption = $request->options;
            foreach ($inputOption as $key => $value) {
                $option = new Option;
                $option->name = $value;
                $option->poll_id = $pollId;
                $option->save();
            }

            $addSetting = $request->addSetting;
            $inputAddSetting['poll_id'] = $pollId;
            if ($addSetting == 'is_wsm') {
                $inputAddSetting['type'] = config('setting.setting_poll.is_wsm');
                Setting::create($inputAddSetting);
            } elseif ($addSetting == 'required_name') {
                $inputAddSetting['type'] = config('setting.setting_poll.required_name');
                Setting::create($inputAddSetting);
            }

            $editSetting = $request->editSetting;
            $inputEditSetting['poll_id'] = $pollId;
            if ($editSetting == 'invisible_result') {
                $inputEditSetting['type'] = config('setting.setting_poll.invisible_result');
                Setting::create($inputEditSetting);
            } elseif ($editSetting == 'display_number_vote') {
                $inputEditSetting['type'] = config('setting.setting_poll.display_number_vote');
                Setting::create($inputEditSetting);
            }

            $disablePoll = $request->disablePoll;
            $inputDisablePoll['poll_id'] = $pollId;
            if ($disablePoll == true) {
                $inputDisablePoll['type'] = config('setting.setting_poll.disable_poll');
                Setting::create($inputDisablePoll);
            }
            
            $maxVote = $request->maxVote;
            $inputMaxVote['poll_id'] = $pollId;
            if ($maxVote != config('setting.setting_poll.not_setting')) {
                $inputMaxVote['type'] = config('setting.setting_poll.max_vote');
                $inputMaxVote['value'] = $maxVote;
                Setting::create($inputMaxVote);
            }

            $setPassword = $request->setPassword;
            $inputSetPassword['poll_id'] = $pollId;
            if ($setPassword != 'no_setpassword') {
                $inputSetPassword['type'] = config('setting.setting_poll.set_password');
                $inputSetPassword['value'] = $setPassword;
                Setting::create($inputSetPassword);
            }

            $linkUser = $request->linkUser;
            $inputLinkUser['token'] = $linkUser;
            $inputLinkUser['link_admin'] = config('setting.link.is_user');
            $inputLinkUser['poll_id'] = $pollId;
            Link::create($inputLinkUser);

            $linkAdmin = $request->linkAdmin;
            $inputLinkAdmin['token'] = $linkAdmin;
            $inputLinkAdmin['link_admin'] = config('setting.link.is_admin');
            $inputLinkAdmin['poll_id'] = $pollId;
            Link::create($inputLinkAdmin);

            $tagsMail = $request->tagsEmail;

            if (is_array($tagsMail)) {
                foreach ($tagsMail as $value) {
                    dispatch(new JobSendInvitationParticipants($value));
                }
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
