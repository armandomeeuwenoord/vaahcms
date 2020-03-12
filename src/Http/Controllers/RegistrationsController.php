<?php

namespace WebReinvent\VaahCms\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use WebReinvent\VaahCms\Entities\Registration;

class RegistrationsController extends Controller
{

    public $theme;

    //----------------------------------------------------------
    public function __construct()
    {
        $this->theme = vh_get_backend_theme();
    }
    //----------------------------------------------------------
    public function getAssets(Request $request)
    {

        $data['country_calling_code'] = vh_get_country_list();
        $data['country'] = vh_get_country_list();
        $data['country_code'] = vh_get_country_list();
        $data['registration_statuses'] = vh_registration_statuses();
        $data['name_titles'] = vh_name_titles();

        $response['status'] = 'success';
        $response['data'] = $data;

        return response()->json($response);
    }
    //----------------------------------------------------------
    public function postCreate(Request $request)
    {
        $rules = array(
            'name' => 'required',
        );

        $validator = \Validator::make( $request->all(), $rules);
        if ( $validator->fails() ) {

            $errors             = errorsToArray($validator->errors());
            $response['status'] = 'failed';
            $response['messages'] = $errors;
            return response()->json($response);
        }

        $data = [];

        $response['status'] = 'failed';
        $response['errors'][] = 'error';

        $response['status'] = 'success';
        $response['messages'][] = 'Saved';
        $response['data'] = $data;

        return response()->json($response);

    }
    //----------------------------------------------------------
    public function getList(Request $request)
    {

        $list = Registration::getList($request);

        $response['status'] = 'success';
        $response['data']['list'] = $list;

        return response()->json($response);

    }

    //----------------------------------------------------------
    public function getItem(Request $request, $id)
    {

        $reg = Registration::find($id);

        $response['status'] = 'success';
        $response['data'] = $reg->recordForFormElement();

        return response()->json($response);

    }
    //----------------------------------------------------------
    public function postStore(Request $request)
    {
        $response = Registration::store($request);
        return response()->json($response);
    }
    //----------------------------------------------------------

    //----------------------------------------------------------
    public function postActions(Request $request, $action)
    {
        $rules = array(
            'action' => 'required',
            'inputs' => 'required',
        );

        $validator = \Validator::make( $request->all(), $rules);
        if ( $validator->fails() ) {

            $errors             = errorsToArray($validator->errors());
            $response['status'] = 'failed';
            $response['errors'] = $errors;
            return response()->json($response);
        }

        $response = [];

        switch ($request->action)
        {

            //------------------------------------
            case 'bulk_change_status':

                $response = Registration::bulkStatusChange($request);

                break;
            //------------------------------------
            case 'bulk_delete':

                $response = Registration::bulkDelete($request);

                break;
            //------------------------------------
            case 'bulk_restore':

                $response = Registration::bulkRestore($request);

                break;

            //------------------------------------
            //------------------------------------

        }

        return response()->json($response);

    }
    //----------------------------------------------------------

    //----------------------------------------------------------
    //----------------------------------------------------------
    //----------------------------------------------------------


}