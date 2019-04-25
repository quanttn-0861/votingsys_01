<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Mail;
use App\Mail\SendInvitationParticipants;
use App\Http\Controllers\PollController;

class JobSendInvitationParticipants implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $email;
    protected $linkUser;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($email, $linkUser)
    {
        $this->email = $email;
        $this->linkUser = $linkUser;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        echo 'Start send email';

        Mail::to($this->email)->send(new SendInvitationParticipants($this->linkUser));

        echo 'End send mail';
    }
}
