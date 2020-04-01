<script src="./ViewJs.js"></script>
<template>
    <div class="column" v-if="page.assets">
        <div class="block" v-if="is_content_loading">
            <Loader/>
        </div>

        <div class="card" v-else>
            <!--header-->
            <header class="card-header">

                <div v-if="item && item[0]" class="card-header-title">
                    <span>#{{item[0].value}} / </span>
                    <span>{{item[1].value}}</span>
                </div>

                <div class="card-header-buttons">

                    <div class="field has-addons is-pulled-right">
                        <p class="control">
                            <b-button icon-left="edit"
                                      :loading="is_btn_loading"
                                      @click="create('save')">
                                Save
                            </b-button>
                        </p>

                        <p class="control">


                            <b-dropdown aria-role="list" position="is-bottom-left">
                                <button class="button" slot="trigger">
                                    <b-icon icon="caret-down"></b-icon>
                                </button>

                                <b-dropdown-item aria-role="listitem">
                                    <b-icon icon="check"></b-icon>
                                    Save & Close
                                </b-dropdown-item>
                                <b-dropdown-item aria-role="listitem">
                                    <b-icon icon="plus"></b-icon>
                                    Save & New
                                </b-dropdown-item>

                            </b-dropdown>


                        </p>

                        <p class="control">
                            <b-button tag="router-link"
                                      :to="{name: 'perm.list'}"
                                      icon-left="times">
                            </b-button>
                        </p>



                    </div>


                </div>

            </header>
            <!--/header-->

            <!--content-->
            <div class="card-content">
                <div class="block"  v-if="item">

                    <b-table
                            class="is-full-width"
                            :striped="true"
                            :data="item"
                            :mobile-cards="true">

                        <template slot-scope="props">

                            <b-table-column field="type" label="">
                                {{props.row.name}}
                            </b-table-column>

                            <b-table-column field="description" label="">
                               :   {{props.row.value}}
                            </b-table-column>
                        </template>
                    </b-table>



                </div>
            </div>
            <!--/content-->





        </div>




    </div>
</template>


