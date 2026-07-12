<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Http\Requests\Portal\UpdatePasswordRequest;
use App\Http\Requests\Portal\UpdateProfileRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function show(Request $request, string $userType): Response
    {
        return Inertia::render('Portal/Profile', [
            'portal' => [
                'userType' => $userType,
                'roleLabel' => $request->user()->userTypeLabel(),
            ],
        ]);
    }

    public function update(UpdateProfileRequest $request, string $userType): RedirectResponse
    {
        $request->user()->update($request->validated());

        return back()->with('status', 'Profile updated.');
    }

    public function updatePassword(UpdatePasswordRequest $request, string $userType): RedirectResponse
    {
        $request->user()->forceFill([
            'password' => $request->validated('password'),
        ])->save();

        return back()->with('status', 'Password updated.');
    }
}
