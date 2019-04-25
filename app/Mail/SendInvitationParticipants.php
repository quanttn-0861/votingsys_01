<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendInvitationParticipants extends Mailable
{
    use Queueable, SerializesModels;

    public $linkUser;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($linkUser)
    {
        $this->linkUser = $linkUser;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('[SPOLL] - Thư mời bầu chọn')
                    ->view('mailer.sendInvitationParticipants');
    }
}
