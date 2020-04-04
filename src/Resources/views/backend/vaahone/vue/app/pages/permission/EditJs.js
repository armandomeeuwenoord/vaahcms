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
            title: null,
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

            this.$Progress.finish();
            this.is_content_loading = false;


            if(data)
            {
                this.title =  data.name;
                this.update('active_item', data);
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

                this.$root.$emit('eReloadList');

                if(this.status == 'close'){
                    this.update('active_item',null);
                    this.$router.push({name: 'perm.list'});
                }else{
                    this.$root.$emit('eReloadItem');
                    this.$router.push({name: 'perm.view', params:{id:this.id}});
                }

            }


            this.$Progress.finish();
        },
        //---------------------------------------------------------------------
        exit: function()
        {
            this.update('active_item',null);

            this.$router.push({name: 'perm.list'})
        },
        //---------------------------------------------------------------------

        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
    }
}
