<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Comment;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        try {
            $inputComment = $request->only('name', 'content', 'poll_id');

            DB::beginTransaction();

            Comment::create($inputComment);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            
            return response()
                ->json(['message' => 'Failed: Add failed']);
        }
        
        return response()
            ->json(['message' => 'Success: Add successfully']);
    }
}
