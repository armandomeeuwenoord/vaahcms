let namespace = 'permission';
export default {
    name: "TableTrStatus",
    props: ['value', 'label', 'is_copiable', 'is_upper_case'],
    computed: {
        root() {return this.$store.getters['root/state']},
        page() {return this.$store.getters[namespace+'/state']},
        ajax_url() {return this.$store.getters[namespace+'/state'].ajax_url},
        item() {return this.$store.getters[namespace+'/state'].active_item},
    },
    components:{

    },

    data()
    {
        let obj = {

            data:[
                {
                    'name':'Yes',
                    'value': 1,
                },
                {
                    'name':'No',
                    'value': 1,
                },
            ]

        };

        return obj;
    },
    created() {
    },
    mounted(){

        //---------------------------------------------------------

        //---------------------------------------------------------
        //---------------------------------------------------------
        //---------------------------------------------------------
        //---------------------------------------------------------

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
        changeStatus: function(status)
        {
            this.$Progress.start();

            let params = {
                inputs: [this.item.id],
                data: {status: status}
            };

            let url = this.ajax_url+'/actions/bulk-change-status';
            this.$vaah.ajax(url, params, this.changeStatusAfter);
        },
        //---------------------------------------------------------------------
        changeStatusAfter: function (data, res) {
            let action = this.page.bulk_action.action;
            if(data)
            {
                this.$root.$emit('eResetBulkActions');
                this.$root.$emit('eReloadItem');
                this.$root.$emit('eReloadList');
            } else
            {
                this.$Progress.finish();
            }
        },
        //---------------------------------------------------------------------
        sendVerificationMail: function()
        {
            this.$Progress.start();

            let params = {
                inputs: [this.item.id],
                data: null
            };

            let url = this.ajax_url+'/actions/send-verification-mail';
            this.$vaah.ajax(url, params, this.sendVerificationMailAfter);
        },
        //---------------------------------------------------------------------
        sendVerificationMailAfter: function (data, res) {
            let action = this.page.bulk_action.action;
            if(data)
            {
                this.$root.$emit('eResetBulkActions');
                this.$root.$emit('eReloadItem');
            } else
            {
                this.$Progress.finish();
            }
        },
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
    }
}
