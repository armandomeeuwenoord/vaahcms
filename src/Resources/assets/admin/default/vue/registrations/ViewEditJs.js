import TForm from './../reusable/TableFormGenerator';
import TView from './../reusable/TableViewGenerator';

    export default {

        props: ['urls', 'id'],
        computed:{
            ajax_url(){
                let ajax_url = this.$store.state.urls.registrations;
                return ajax_url;
            }
        },
        components:{
            't-form': TForm,
            't-view': TView,
        },
        data()
        {
            let obj = {
                assets: null,
                columns: null,
                edit: false,
                item: null
            };

            return obj;
        },
        watch: {

            id: function (newVal, oldVal) {
                this.getDetails();
            }

        },
        created() {

        },
        mounted() {

            //---------------------------------------------------------------------
            this.getDetails();
            //---------------------------------------------------------------------
            //---------------------------------------------------------------------
            //---------------------------------------------------------------------
            //---------------------------------------------------------------------

        },
        methods: {
            //---------------------------------------------------------------------
            //---------------------------------------------------------------------
            getDetails: function () {

                var url = this.ajax_url+"/view/"+this.id;

                console.log(url, 'url-->');

                var params = {};
                this.$vaahcms.ajax(url, params, this.getDetailsAfter);
            },
            //---------------------------------------------------------------------
            getDetailsAfter: function (data) {
                this.columns = null;
                this.columns = data;
                this.$vaahcms.stopNprogress();
            },
            //---------------------------------------------------------------------
            updateItem: function (item) {
                this.item = item;

                this.$vaahcms.console(this.item, 'this.item');

            },
            //---------------------------------------------------------------------
            toggleEdit: function () {
                if(this.edit === true)
                {
                    this.edit = false;
                } else
                {
                    this.edit = true;
                }
            },
            //---------------------------------------------------------------------
            store: function () {
                var url = this.ajax_url+"/store";
                var params = this.item;

                this.$vaahcms.console(params, 'params');

                this.$vaahcms.ajax(url, params, this.storeAfter);
            },
            //---------------------------------------------------------------------
            storeAfter: function (data) {

                this.edit = false;

                this.item = data;
                this.id = data.id;

                this.$root.$emit('eListReload');
            },

            //---------------------------------------------------------------------
            //---------------------------------------------------------------------
            //---------------------------------------------------------------------
        }
    }