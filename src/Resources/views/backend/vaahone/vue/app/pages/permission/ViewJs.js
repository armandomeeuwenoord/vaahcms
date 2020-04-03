import GlobalComponents from '../../vaahvue/helpers/GlobalComponents'
import TableTrView from '../../vaahvue/reusable/TableTrView'


let namespace = 'permission';

export default {
    props: ['id'],
    computed:{
        root() {return this.$store.getters['root/state']},
        page() {return this.$store.getters[namespace+'/state']},
        ajax_url() {return this.$store.getters[namespace+'/state'].ajax_url},
        item() {return this.$store.getters[namespace+'/state'].active_item},
    },
    components:{
        ...GlobalComponents,
        TableTrView,

    },
    data()
    {
        return {
            is_btn_loading: false,
            is_editable: false,
            is_content_loading: false,
            title: null,
            labelPosition: 'on-border'
        }
    },
    watch: {
        $route(to, from) {
            this.updateView();
            this.getItem();
        }
    },
    mounted() {
        //----------------------------------------------------
        this.onLoad();
        //----------------------------------------------------
        this.$root.$on('eReloadItem', this.getItem);
        //----------------------------------------------------
        //----------------------------------------------------
    },
    methods: {
        //---------------------------------------------------------------------
        update: function(name, value)
        {
            let update = {
                state_name: name,
                state_value: value,
                namespace: namespace,
            };
            this.$vaah.updateState(update);
        },
        //---------------------------------------------------------------------
        updateView: function()
        {
            this.$store.dispatch(namespace+'/updateView', this.$route);
        },
        //---------------------------------------------------------------------
        onLoad: function()
        {
            this.updateView();
            this.getAssets();
        },
        //---------------------------------------------------------------------
        async getAssets() {
            await this.$store.dispatch(namespace+'/getAssets');
            this.getItem();
        },
        //---------------------------------------------------------------------
        getItem: function () {

            this.$Progress.start();
            this.is_content_loading = true;

            this.params = {};

            let url = this.ajax_url+'/item/'+this.id;
            this.$vaah.ajax(url, this.params, this.getItemAfter);
        },
        //---------------------------------------------------------------------
        getItemAfter: function (data, res) {

            this.$Progress.finish();
            this.is_content_loading = false;


            if(data)
            {
                if(data.is_active == 1){
                    data.is_active = 'Yes';
                }else{
                    data.is_active = 'No';
                }

                if(data.created_by){
                    data.created_by = data.created_by.name;
                }

                if(data.updated_by){
                    data.updated_by = data.updated_by.name;
                }

                console.log('123check',data);

                this.title =  data.name;
                this.update('active_item', data);
            }
        },
        //---------------------------------------------------------------------
        toogleEdit: function () {

            console.log('check',this.is_editable);
            if(this.is_editable){
                this.is_editable = false;
            }else{
                this.is_editable = true;
            }
        },
        //---------------------------------------------------------------------
        actions: function (action) {

            console.log('--->action', action);

            this.$Progress.start();
            this.page.bulk_action.action = action;
            this.update('bulk_action', this.page.bulk_action);
            let params = {
                inputs: [this.item.id],
                query_string: this.page.query_string,
                data: null
            };

            let url = this.ajax_url+'/actions/'+this.page.bulk_action.action;
            this.$vaah.ajax(url, params, this.actionsAfter);

        },
        //---------------------------------------------------------------------
        actionsAfter: function (data, res) {
            let action = this.page.bulk_action.action;
            if(data)
            {
                this.resetBulkAction();
                this.$root.$emit('eReloadList');

                if(action == 'bulk-delete')
                {
                    this.$router.push({name: 'perm.list'});
                } else
                {
                    this.getItem();
                }

            } else
            {
                this.$Progress.finish();
            }
        },
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        resetBulkAction: function()
        {
            this.page.bulk_action = {
                selected_items: [],
                data: {},
                action: "",
            };
            this.update('bulk_action', this.page.bulk_action);
        },
        //---------------------------------------------------------------------
        updateDetail: function (e) {

            if(e){
                e.preventDefault();
            }

            console.log(this.item[0].value);

            this.$Progress.start();

            let params = {
                item: this.item,
                query_string: this.page.query_string,
            };

            let url = this.ajax_url+'/store';
            this.$vaah.ajax(url, params, this.updateDetailAfter);
        },
        //---------------------------------------------------------------------
        updateDetailAfter: function (data,res) {

            if(data){
                this.update('list', data.list);

                this.is_editable = false;

                this.getItem();
            }


            this.$Progress.finish();
        },
        //---------------------------------------------------------------------
        isCopiable: function (label) {

            if(
                label == 'slug'
            )
            {
                return true;
            }

            return false;

        },
        //---------------------------------------------------------------------
        isUpperCase: function (label) {

            if(
                label == 'id' || label == 'uuid'
            )
            {
                return true;
            }

            return false;

        },
        //---------------------------------------------------------------------
        confirmDelete: function()
        {
            let self = this;
            this.$buefy.dialog.confirm({
                title: 'Deleting record',
                message: 'Are you sure you want to <b>delete</b> the record? This action cannot be undone.',
                confirmText: 'Delete',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: function () {
                    self.actions('bulk-delete');
                }
            })
        },
        //---------------------------------------------------------------------
        edit: function()
        {
            console.log('check',this.item);

            this.$router.push({name: 'perm.edit', params:{id:this.item.id}})
        },
        //---------------------------------------------------------------------

        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
    }
}
