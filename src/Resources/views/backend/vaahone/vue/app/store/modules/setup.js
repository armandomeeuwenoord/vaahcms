import {VaahHelper as Vaah} from "../../vaahvue/helpers/VaahHelper";
import AutoComplete from '../../vaahvue/reusable/AutoComplete'

//---------Variables
let base_url = document.getElementsByTagName('base')[0].getAttribute("href");
//---------/Variables

let ajax_url = base_url+"/vaahcms/setup";


export default {
    namespaced: true,
    //=========================================================================
    state: {
        ajax_url: ajax_url,
        assets: null,
        assets_is_fetching: false,
        config:{
            env:{
                app_env: null,
                app_name: "VaahCMS",
                app_url: null,
                app_timezone: null,
                db_connection: null,
                db_host: null,
                db_port: null,
                db_database: null,
                db_username: null,
                db_password: null,
                mail_driver: null,
                mail_host: null,
                mail_port: null,
                mail_username: null,
                mail_password: null,
                mail_encryption: null,
            }
        }
    },
    //=========================================================================
    mutations:{
        updateState: function (state, payload) {
            state[payload.key] = payload.value;
        },
        //-----------------------------------------------------------------
    },
    //=========================================================================
    actions:{
        //-----------------------------------------------------------------
        async getAssets({ state, commit, dispatch, getters }) {

            if(state.assets_is_fetching === false && !state.assets)
            {
                let payload = {
                    key: 'assets_is_fetching',
                    value: true
                };
                commit('updateState', payload);

                let url = state.ajax_url+'/assets';
                let params = {};
                let data = await Vaah.ajax(url, params);
                payload = {
                    key: 'assets',
                    value: data.data.data
                };

                commit('updateState', payload);
            }
        },
        //-----------------------------------------------------------------
        updateView({ state, commit, dispatch, getters }, payload) {
            let list_view = false;
            if(payload && payload.name && payload.name == 'reg.list')
            {
                list_view = true;
            }
            let view = {
                key: 'list_view',
                value: list_view
            }
            commit('updateState', view);
        },
        //-----------------------------------------------------------------
    },
    //=========================================================================
    getters:{
        state(state) {return state;},
        ajax_url(state) {return state.ajax_url;},
        assets(state) {return state.assets;},
        config(state) {return state.config;},
    }

}
