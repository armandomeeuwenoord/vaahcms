<?php

namespace WebReinvent\VaahCms\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use WebReinvent\VaahCms\Entities\Permission;
use WebReinvent\VaahCms\Entities\Role;

class PermissionController extends Controller
{

    public $theme;

    //----------------------------------------------------------
    public function __construct()
    {
        $this->theme = vh_get_backend_theme();
    }

    public function getAssets(Request $request)
    {

        $data['country_calling_code'] = vh_get_country_list();
        $data['country'] = vh_get_country_list();
        $data['country_code'] = vh_get_country_list();
        $data['registration_statuses'] = vh_registration_statuses();
        $data['bulk_actions'] = vh_general_bulk_actions();
        $data['name_titles'] = vh_name_titles();

        $response['status'] = 'success';
        $response['data'] = $data;

        return response()->json($response);
    }

    //----------------------------------------------------------
    public function index()
    {
        return view($this->theme.'.pages.permissions');
    }
    //----------------------------------------------------------
    public function assets(Request $request)
    {

        $model = new Permission();
        $data['columns'] = $model->getFormColumns(true);
        $data['debug'] = config('vaahcms.debug');

        $response['status'] = 'success';
        $response['data'] = $data;

        return response()->json($response);
    }
    //----------------------------------------------------------
    public function store(Request $request)
    {
        $response = Permission::store($request);
        return response()->json($response);
    }
    //----------------------------------------------------------
    public function postStore(Request $request)
    {
        $response = Permission::updateDetail($request);
        return response()->json($response);
    }
    //----------------------------------------------------------
    public function getItem(Request $request, $id)
    {

        $item = Permission::where('id', $id)->withTrashed()->first();

        $response['status'] = 'success';
        $response['data'] = $item->recordForFormElement();

        return response()->json($response);

    }
    //----------------------------------------------------------
    public function getList(Request $request)
    {
        $response = Permission::getList($request);
        return response()->json($response);
    }
    //----------------------------------------------------------
    public function changeStatus(Request $request)
    {
        $response = Permission::changeStatus($request);
        return response()->json($response);
    }
    //----------------------------------------------------------
    //----------------------------------------------------------

    public function getRoles(Request $request, $id)
    {
        $item = Permission::find($id);
        $response['data']['permission'] = $item;


        if($request->has("q"))
        {
            $list = $item->roles()->where(function ($q) use ($request){
                $q->where('name', 'LIKE', '%'.$request->q.'%')
                    ->orWhere('slug', 'LIKE', '%'.$request->q.'%');
            });
        } else
        {
            $list = $item->roles();
        }

        $list->orderBy('pivot_is_active', 'desc');

        $list = $list->paginate(config('vaahcms.per_page'));

        $response['data']['list'] = $list;

        $response['status'] = 'success';

        return response()->json($response);
    }

    //----------------------------------------------------------
    //----------------------------------------------------------
    public function postActions(Request $request, $action)
    {
        $rules = array(
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

        $response['status'] = 'success';

        $inputs = $request->all();

        switch ($action)
        {

            //------------------------------------
            case 'bulk-change-status':
                $response = Permission::bulkStatusChange($request);
                break;
            //------------------------------------
            case 'bulk-trash':

                $response = Permission::bulkTrash($request);

                break;
            //------------------------------------
            case 'bulk-restore':

                $response = Permission::bulkRestore($request);

                break;

            //------------------------------------
            case 'bulk-delete':

                $response = Permission::bulkDelete($request);

                break;
            //------------------------------------
            case 'toggle_role_active_status':

                if($response['status'] == 'success')
                {
                    $item = Permission::find($inputs['inputs']['id']);
                    $item->roles()->updateExistingPivot($inputs['inputs']['role_id'], array('is_active' => $inputs['data']['is_active']));
                    $item->save();
                    Permission::recountRelations();
                    Role::recountRelations();
                    $response = Permission::getList($request->query_string);
                }

                break;
            //------------------------------------
        }

        return response()->json($response);

    }
    //----------------------------------------------------------
    //----------------------------------------------------------
    //----------------------------------------------------------


}
