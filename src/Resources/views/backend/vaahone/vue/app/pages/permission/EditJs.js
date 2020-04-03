import GlobalComponents from '../../vaahvue/helpers/GlobalComponents'

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

    },
    data()
    {
        return {
            is_content_loading: false,
            is_btn_loading: null,
            labelPosition: 'on-border',
            params: {},
            status: null,
        }
    },
    watch: {
        $route(to, from) {
            this.updateView(this.$route)
        }
    },
    mounted() {
        //----------------------------------------------------
        this.onLoad();
        //----------------------------------------------------
        console.log(this.root.base_url);

        //----------------------------------------------------
        //----------------------------------------------------
    },
    methods: {
        //---------------------------------------------------------------------
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
        },//---------------------------------------------------------------------
        getItem: function () {

            this.$Progress.start();
            this.is_content_loading = true;

            this.params = {};

            let url = this.ajax_url+'/item/'+this.id;
            this.$vaah.ajax(url, this.params, this.getItemAfter);
        },
        //---------------------------------------------------------------------
        getItemAfter: function (data, res) {

            console.log(data);

            let items = {};

            data.forEach(function (item) {
                    items[item.name] = item.value;
            });

            this.title = items.name;

            this.$Progress.finish();
            this.is_content_loading = false;


            if(data)
            {
                this.update('active_item', items);
            }
        },
        //---------------------------------------------------------------------
        updateDetail: function (data) {

            this.status = data;

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


            console.log(data);

            if(data){
                this.update('list', data.list);

                this.getItem();

                if(this.status == 'close'){
                    console.log('status11',this.status);
                    window.location = this.root.base_url+'/backend#/vaah/permission';
                }else{
                    window.location = this.root.base_url+'/backend#/vaah/permission/view/'+this.id;
                }

            }


            this.$Progress.finish();
        },
        //---------------------------------------------------------------------

        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
    }
}
