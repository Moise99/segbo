<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\AcdetailUpdateRequest;
use App\Models\Acdetail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    // public function destroy(Request $request): RedirectResponse
    // {
    //     $request->validate([
    //         'password' => ['required', 'current_password'],
    //     ]);

    //     $user = $request->user();

    //     Auth::logout();

    //     $user->delete();

    //     $request->session()->invalidate();
    //     $request->session()->regenerateToken();

    //     return Redirect::to('/');
    // }

    public function acdedit(){

        $acdetail = DB::table('acdetails')->where('user_id', Auth::user()->id)->first();
        return Inertia::render('Profile/Details', [
            'acdetail' => $acdetail,
        ]);
    }

    public function acdupdate(AcdetailUpdateRequest $request, $id): RedirectResponse
    {
        try {
            $acdetail = Acdetail::findOrFail($id);

            $data = $request->validated();

            // if not photo -> remove line
            if (!$request->hasFile('photo')) {
                unset($data['photo']);
                dd($data);
            } else {
                //(data);
                if ($acdetail->photo && Storage::disk('public')->exists($acdetail->photo)) {
                    Storage::disk('public')->delete($acdetail->photo);
                }

                $file = $request->file('photo');
                $filename = Auth::user()->id.'_'.time().'_'.uniqid().'.'.$file->getClientOriginalExtension();
                $path = $file->storeAs('becomesegbo_images', $filename, 'public');
                $data['photo'] = $path;
            }

            $acdetail->update($data);

        } catch (\Exception $e) {
        return redirect()->back()->with('error', 'Error' . "-------- " . now() . $e->getMessage());
        }

        return redirect()->route('acdetail.edit')->with('success', 'Profile update with success.' . "---- " . now());
    }


}
