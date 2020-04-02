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
            is_editable: false,
            is_content_loading: false,
            title: null,
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

            let url = this.ajax_url+'/item/'+this.id;
            this.$vaah.ajax(url, this.params, this.getItemAfter);
        },
        //---------------------------------------------------------------------
        getItemAfter: function (data, res) {

            console.log(data);

            data.forEach(function (item) {
                item.name =  item.name.charAt(0).toUpperCase() + item.name.slice(1);
                item.name =  item.name.replace('_',' ');
            });

            this.title = data[1].value;

            this.$Progress.finish();
            this.is_content_loading = false;


            if(data)
            {
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

        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
    }
}
