<?php namespace WebReinvent\VaahCms\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Permission extends Model {

    use SoftDeletes;
    //-------------------------------------------------
    protected $table = 'vh_permissions';
    //-------------------------------------------------
    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];
    //-------------------------------------------------
    protected $dateFormat = 'Y-m-d H:i:s';
    //-------------------------------------------------
    protected $fillable = [
        'uid',
        'slug',
        'module',
        'section',
        'name',
        'label',
        'details',
        'count_users',
        'count_roles',
        'is_active',
        'synced_at',
        'created_by',
        'updated_by',
        'deleted_by'
    ];

    //-------------------------------------------------
    protected $appends  = [

    ];
    //-------------------------------------------------
    public function setUidAttribute( $value ) {
        $this->attributes['uid'] = strtolower( $value );
    }
    //-------------------------------------------------
    public function setSlugAttribute( $value ) {
        $this->attributes['slug'] = Str::slug( $value );
    }
    //-------------------------------------------------
    public function scopeActive( $query ) {
        return $query->where( 'is_active', 1 );
    }

    //-------------------------------------------------
    public function scopeInactive( $query ) {
        return $query->where( 'is_active', 0 );
    }

    //-------------------------------------------------
    public function scopeCreatedBy( $query, $user_id ) {
        return $query->where( 'created_by', $user_id );
    }

    //-------------------------------------------------
    public function scopeUpdatedBy( $query, $user_id ) {
        return $query->where( 'updated_by', $user_id );
    }

    //-------------------------------------------------
    public function scopeDeletedBy( $query, $user_id ) {
        return $query->where( 'deleted_by', $user_id );
    }

    //-------------------------------------------------
    public function scopeCreatedBetween( $query, $from, $to ) {
        return $query->whereBetween( 'created_at', array( $from, $to ) );
    }

    //-------------------------------------------------
    public function scopeUpdatedBetween( $query, $from, $to ) {
        return $query->whereBetween( 'updated_at', array( $from, $to ) );
    }

    //-------------------------------------------------
    public function scopeDeletedBetween( $query, $from, $to ) {
        return $query->whereBetween( 'deleted_at', array( $from, $to ) );
    }

    //-------------------------------------------------
    public function createdBy() {
        return $this->belongsTo( 'WebReinvent\VaahCms\Entities\User',
            'created_by', 'id'
        );
    }
    //-------------------------------------------------
    public function updatedBy() {
        return $this->belongsTo( 'WebReinvent\VaahCms\Entities\User',
            'updated_by', 'id'
        );
    }
    //-------------------------------------------------
    public function deletedBy() {
        return $this->belongsTo( 'WebReinvent\VaahCms\Entities\User',
            'deleted_by', 'id'
        );
    }
    //-------------------------------------------------
    public function roles() {
        return $this->belongsToMany( 'WebReinvent\VaahCms\Entities\Role',
            'vh_role_permissions', 'vh_permission_id', 'vh_role_id'
        )->withPivot('is_active');
    }
    //-------------------------------------------------
    public function getTableColumns() {
        return $this->getConnection()->getSchemaBuilder()
            ->getColumnListing($this->getTable());
    }
    //-------------------------------------------------
    public function getFormFillableColumns()
    {
        $list = [
            'name', 'slug', 'module',
            'section', 'details', 'count_users',
            'count_roles', 'is_active',
            'created_by', 'updated_by', 'deleted_by',
            'created_at', 'updated_at', 'deleted_at'
        ];

        return $list;
    }
    //-------------------------------------------------
    public function getFormColumns()
    {
        $columns = $this->getFormFillableColumns();

        $result = [];
        $i = 0;

        foreach ($columns as $column)
        {
            $result[$i] = $this->getFormElement($column);
            $i++;
        }

        return $result;
    }
    //-------------------------------------------------
    public static function getList($request)
    {

        if(isset($request->recount) && $request->recount == true)
        {
            Permission::syncPermissionsWithRoles();
            Permission::recountRelations();
        }

        if(isset($request->sort_by) && !is_null($request->sort_by))
        {

            if($request->sort_by == 'deleted_at')
            {
                $list = Permission::onlyTrashed();
            } else
            {
                $list = Permission::orderBy($request->sort_by, $request->sort_type);
            }

        } else
        {
            $list = Permission::orderBy('created_at', 'DESC');
        }

        if(isset($request->sort_by))
        {
            $list->where(function ($q) use ($request){
                $q->where('name', 'LIKE', '%'.$request->q.'%')
                    ->orWhere('slug', 'LIKE', '%'.$request->q.'%');
            });
        }

        $data['list'] = $list->paginate(config('vaahcms.per_page'));

        $response['status'] = 'success';
        $response['data'] = $data;

        return $response;
    }
    //-------------------------------------------------
    public function getFormElement($column, $value=null)
    {

        $result['name'] = $column;
        $result['value'] = $value;
        $result['type'] = 'text';
        $result['editable'] = true;
        $result['tr_class'] = "";
        $result['disabled'] = false;
        $result['label'] = slug_to_str($column);

        switch($column)
        {
            //------------------------------------------------
            case 'id':
                $result['type'] = 'text';
                $result['disabled'] = true;
                $result['tr_class'] = 'tr__disabled';
                break;
            //------------------------------------------------
            case 'created_by':
            case 'updated_by':
            case 'deleted_by':
                $result['type'] = 'select_with_ids';
                $result['editable'] = false;
                $result['inputs'] = User::getUsersForAssets();
                break;
            //------------------------------------------------
            case 'is_active':
                $result['type'] = 'select';
                $result['inputs'] = vh_is_active_options();
                break;
            //------------------------------------------------
            case 'created_at':
            case 'deleted_at':
            case 'updated_at':
            case 'count_users':
            case 'count_roles':
                $result['editable'] = false;
                break;
            //------------------------------------------------

            //------------------------------------------------
            case 'details':
                $result['type'] = 'textarea';
                break;
            //------------------------------------------------

            //------------------------------------------------
            default:
                $result['type'] = 'text';
                break;
            //------------------------------------------------
        }

        return $result;
    }
    //-------------------------------------------------
    public static function store($request)
    {
        $rules = array(
            'name' => 'required'
        );

        $validator = \Validator::make( $request->all(), $rules);
        if ( $validator->fails() ) {

            $errors             = errorsToArray($validator->errors());
            $response['status'] = 'failed';
            $response['errors'] = $errors;
            return $response;
        }

        $data = [];

        $inputs = $request->all();

        if($request->has('id'))
        {
            $item = Role::find($request->id);
        } else
        {
            $validation = static::roleValidation($request);
            if(isset($validation['status']) && $validation['status'] == 'failed')
            {
                return $validation;
            } else
            {
                $item = new Role();
                $item->is_active = 1;
            }
        }

        $item->fill($inputs);
        $item->save();

        $response['status'] = 'success';
        $response['messages'][] = 'Saved';
        $response['data'] = $item;

        return $response;


    }
    //-------------------------------------------------
    public static function roleValidation($request)
    {

        //check if user already exist with the emails
        $role = Role::where('slug', Str::slug($request->name))->first();
        if($role)
        {
            $response['status'] = 'failed';
            $response['errors'][] = 'Record already exist.';
            return $response;
        }


    }
    //-------------------------------------------------
    public function recordForFormElement()
    {
        $record = $this->toArray();

        $columns = $this->getFormFillableColumns();

        $visible = ['id'];

        $columns = array_merge($visible, $columns);

        $result = [];
        $i = 0;

        foreach ($columns as $column)
        {
            if(isset($record[$column]))
            {
                $result[$i] = $this->getFormElement($column, $record[$column]);
                $i++;
            } else
            {
                $result[$i] = $this->getFormElement($column, "");
                $i++;
            }

        }


        return $result;
    }
    //-------------------------------------------------
    public static function bulkStatusChange($request)
    {

        if(!$request->has('inputs'))
        {
            $response['status'] = 'failed';
            $response['errors'][] = 'Select IDs';
            return $response;
        }

        if(!$request->has('data'))
        {
            $response['status'] = 'failed';
            $response['errors'][] = 'Select Status';
            return $response;
        }

        foreach($request->inputs as $id)
        {
            $reg = Role::find($id);
            $reg->is_active = $request->data;
            $reg->save();
        }

        $response['status'] = 'success';
        $response['messages'][] = 'Action was successful';

        return $response;


    }
    //-------------------------------------------------
    public static function changeStatus($request)
    {
        $permission = static::find($request->id);
        if($permission->is_active == 1){
            $permission->is_active = 0;
        }else{
            $permission->is_active = 1;
        }
        $permission->save();

        $response = static::getList($request->query_string);

        $response['messages'][] = 'Status is changed.';

        return $response;

    }
    //-------------------------------------------------
    public static function bulkDelete($request)
    {

        if(!$request->has('inputs'))
        {
            $response['status'] = 'failed';
            $response['errors'][] = 'Select IDs';
            return $response;
        }

        if(!$request->has('data'))
        {
            $response['status'] = 'failed';
            $response['errors'][] = 'Select Status';
            return $response;
        }

        foreach($request->inputs as $id)
        {
            $item = Role::find($id);
            if($item)
            {
                $item->is_active = null;
                $item->save();
                $item->delete();
            }
        }

        $response['status'] = 'success';
        $response['messages'][] = 'Action was successful';

        return $response;


    }
    //-------------------------------------------------
    public static function bulkRestore($request)
    {

        if(!$request->has('inputs'))
        {
            $response['status'] = 'failed';
            $response['errors'][] = 'Select IDs';
            return $response;
        }

        if(!$request->has('data'))
        {
            $response['status'] = 'failed';
            $response['errors'][] = 'Select Status';
            return $response;
        }

        foreach($request->inputs as $id)
        {
            $item = Role::withTrashed()->where('id', $id)->first();
            if(isset($item) && isset($item->deleted_at))
            {
                $item->restore();
            }
        }

        $response['status'] = 'success';
        $response['messages'][] = 'Action was successful';

        return $response;

    }
    //-------------------------------------------------
    public static function getPermissionRoles($id)
    {
        $item = Permission::withTrashed()->where('id', $id)->first();

        if(!$item)
        {
            return false;
        }

        return $item->roles()->wherePivot('is_active', 1)->get();
    }
    //-------------------------------------------------
    public static function getPermissionRoleIds($id)
    {
        $roles = static::getPermissionRoles($id);
        return $roles->pluck('id')->toArray();
    }
    //-------------------------------------------------
    public static function countUsers($id)
    {
        $roles_ids = Permission::getPermissionRoleIds($id);

        if(!$roles_ids || !is_array($roles_ids))
        {
            return false;
        }

        $users = User::whereHas('roles', function ($q) use ($roles_ids){
            $q->whereIn('vh_roles.id', $roles_ids);
        })->count();

        return $users;
    }
    //-------------------------------------------------
    public static function syncPermissionsWithRoles()
    {

        $permissions = Permission::all()->pluck('id')->toArray();

        $roles = Role::all();

        if($roles)
        {
            foreach ($roles as $role)
            {
                if($role->id == 1)
                {
                    $pivotData = array_fill(0, count($permissions), ['is_active' => 1]);
                    $syncData  = array_combine($permissions, $pivotData);
                    $role->permissions()->syncWithoutDetaching($syncData);
                } else
                {
                    $role->permissions()->syncWithoutDetaching($permissions);
                }
            }
        }

    }
    //-------------------------------------------------
    public static function recountRelations()
    {
        $list = Permission::withTrashed()->select('id')->get();

        if($list)
        {
            foreach ($list as $item)
            {
                $roles_ids = Permission::getPermissionRoleIds($item->id);
                $item->count_roles = count($roles_ids);
                $item->count_users = Permission::countUsers($item->id);
                $item->save();
            }
        }

    }
    //-------------------------------------------------
}
