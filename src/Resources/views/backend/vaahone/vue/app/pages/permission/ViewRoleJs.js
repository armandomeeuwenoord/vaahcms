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
            is_btn_loading: false,
            is_content_loading: false,
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

            let url = this.ajax_url+'/role/'+this.id;
            this.$vaah.ajax(url, this.params, this.getItemAfter);
        },
        //---------------------------------------------------------------------
        getItemAfter: function (data, res) {

            this.$Progress.finish();
            this.is_content_loading = false;

            if(data)
            {
                this.update('active_item', data);
            }

        },
        //---------------------------------------------------------------------

        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
    }
}
