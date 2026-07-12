<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserType
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string $userType): Response
    {
        $user = $request->user();

        if (! $user instanceof User || ! in_array($userType, User::USER_TYPES, true)) {
            abort(403);
        }

        if ($user->user_type !== $userType) {
            return redirect()->route($user->portalRouteName());
        }

        return $next($request);
    }
}
