<?php

namespace WebReinvent\VaahCms\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use WebReinvent\VaahCms\Libraries\VaahSetup;

class IsInstalled
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {

    	if(!VaahSetup::isInstalled())
        {
            if ($request->ajax()) {

                $response['status'] = 'failed';
                $response['errors'][] = 'Application is not installed.';
                if(env('APP_DEBUG'))
                {
                    $response['hint'][] = '';
                }
                return response()->json($response);

            } else {

                $url = \URL::route('vh.backend').'#/setup';
                return redirect()->to($url);
            }
        }


        return $next($request);
    }
}
