import VaahVueClickToCopy from 'vaah-vue-clicktocopy'

let namespace = 'permission';

export default {
    computed: {
        root() {return this.$store.getters['root/state']},
        page() {return this.$store.getters[namespace+'/state']},
        ajax_url() {return this.$store.getters[namespace+'/state'].ajax_url},
        query_string() {return this.$store.getters[namespace+'/state'].query_string},
    },
    components:{
        'vh-copy': VaahVueClickToCopy,
    },

    data()
    {
        let obj = {
            icon_copy: "<i class='fas fa-copy'></i>"
        };

        return obj;
    },
    created() {
    },
    mounted(){

    },

    watch: {

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
        setRowClass: function(row, index)
        {

            if(this.page.active_item && row.id == this.page.active_item.id)
            {
                return 'is-selected';
            }

            if(row.deleted_at != null)
            {
                return 'is-danger';
            }

        },
        //---------------------------------------------------------------------
        setActiveItem: function (item) {
            this.update('active_item', item);
            this.$router.push({name: 'perm.view', params:{id:item.id}})
        },
        //---------------------------------------------------------------------
        changeStatus: function (id) {
            console.log('--->', this.page.query_string);
            let url = this.ajax_url+'/changeStatus';
            let params = {
                id: id,
                query_string: this.page.query_string,
            };
            this.$vaah.ajax(url, params, this.changeStatusAfter);
        },
        //---------------------------------------------------------------------
        changeStatusAfter: function (data,res) {
            this.update('is_list_loading', false);
            this.update('list', data.list);

            if(data.list.total === 0)
            {
                this.update('list_is_empty', true);
            }else{
                this.update('list_is_empty', false);
            }
        },
        //---------------------------------------------------------------------
        getRole: function (item) {
            this.update('active_item', item);
            this.$router.push({name: 'perm.role', params:{id:item.id}})
        },
        //---------------------------------------------------------------------
        copiedData: function (data) {

            this.$vaah.toastSuccess(['copied']);

            // alertify.success('copied');

            this.$vaah.console(data, 'copied data');

        }
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
    }
}
