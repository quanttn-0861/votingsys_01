<?php

namespace App\Models;

use App\QueryFilter;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\Poll;
use App\Models\Participant;
use App\Models\Comment;
use App\Models\SocialAccount;
use App\Models\Activity;
use App\Models\Vote;
use Laravel\Passport\HasApiTokens;
use App\Models\Option;
use App\Models\ParticipantVote;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    const IS_ADMIN = 1;
    const ACTIVE = 1;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'chatwork_id',
        'gender',
        'avatar',
        'role',
        'is_active',
        'token_verification',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'pivot',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function polls()
    {
        return $this->hasMany(Poll::class);
    }

    public function participants()
    {
        return $this->hasMany(Participant::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function socialAccounts()
    {
        return $this->hasMany(SocialAccount::class);
    }

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    public function participantVotes()
    {
        return $this->hasManyThrough(ParticipantVote::class, Participant::class);
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = \Hash::needsRehash($value) ? bcrypt($value) : $value;
    }

    public function getAvatarPath()
    {
       return preg_match('#^(http)|(https).*$#', $this->avatar)
            ? $this->avatar
            : asset('/' . config('settings.avatar_path') . '/' . $this->avatar);
    }

    public function showGender()
    {

        $trans = trans('user.label.gender');
        $config = config('settings.gender_constant');
        $data = $trans['other'];

        if ($this->gender == $config['male']) {
            $data = $trans['male'];
        }

        if ($this->gender == $config['female']) {
            $data = $trans['female'];
        }

        if ($this->gender == $config['']) {
            $data = $trans[''];
        }

        return $data;
    }

    public function scopeFilter($query, QueryFilter $filters)
    {
        return $filters->apply($query);
    }

    public function isAdmin()
    {
        return $this->role == User::IS_ADMIN;
    }

    public function options()
    {
        return $this->belongsToMany(Option::class, 'votes')->withTimestamps();
    }

    public function getAvatarAttribute()
    {
        $avatar = $this->attributes['avatar'];

        return $this->attributes['avatar'] = preg_match('#^(http)|(https).*$#', $avatar)
            ? $avatar
            : asset('/' . config('settings.avatar_path') . '/' . $avatar);
    }

    public function haveWsmAction()
    {
        return $this->socialAccounts()->where('provider', SocialAccount::FRAMGIA_PROVIDER)->first()
            && (preg_match("/@framgia\.com$/", $this->email) || preg_match("/@sun-asterisk\.com$/", $this->email));
    }

    public function accountFramgia()
    {
        return $this->socialAccounts->where('provider', SocialAccount::FRAMGIA_PROVIDER)->first();
    }
}
