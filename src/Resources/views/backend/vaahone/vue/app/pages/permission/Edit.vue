<script src="./EditJs.js"></script>
<template>
    <div class="column" v-if="page.assets">

        <div class="block" v-if="is_content_loading">
            <Loader/>
        </div>

        <div class="card" v-else>
            <!--header-->
            <header v-if="item" class="card-header">

                <div class="card-header-title">
                    <span>{{title}}</span>
                </div>


                <div class="card-header-buttons">

                    <div class="field has-addons is-pulled-right">
                        <p class="control">
                            <b-button type="is-light">
                                <vh-copy
                                        :data="item.id"
                                        :confirm_dialog="'buefy'">
                                    <small><b>#{{item.id}}</b></small>
                                </vh-copy>
                            </b-button>
                        </p>
                        <p class="control">
                            <b-button type="is-light"
                                      icon-left="edit"
                                      :loading="is_btn_loading"
                                      @click="updateDetail('save')">
                                Save
                            </b-button>
                        </p>

                        <p class="control">


                            <b-dropdown aria-role="list" position="is-bottom-left">
                                <button class="button is-light" slot="trigger">
                                    <b-icon icon="caret-down"></b-icon>
                                </button>

                                <b-dropdown-item @click="updateDetail('close')" aria-role="listitem">
                                    <b-icon icon="check"></b-icon>
                                    Save & Close
                                </b-dropdown-item>

                            </b-dropdown>


                        </p>

                        <p class="control">
                            <b-button type="is-light"
                                      @click="exit()"
                                      icon-left="times">
                            </b-button>
                        </p>



                    </div>


                </div>

            </header>
            <!--/header-->

            <!--content-->
            <div class="card-content">
                <div class="block" v-if="item">

                    <b-field label="Name" :label-position="labelPosition">
                        <b-input name="permission-name" dusk="permission-name" v-model="item.name"></b-input>
                    </b-field>

                    <b-field label="Detail" :label-position="labelPosition">
                        <b-input name="permission-detail" dusk="permission-detail" type="textarea" v-model="item.details"></b-input>
                    </b-field>

                    <b-field label="Is Active" :label-position="labelPosition">
                        <b-radio-button name="permission-is_active" dusk="permission-is_active"
                                        v-model="item.is_active"
                                        :native-value=1>
                            <span>Yes</span>
                        </b-radio-button>

                        <b-radio-button type="is-danger" name="permission-is_active" dusk="permission-is_active"
                                        v-model="item.is_active"
                                        :native-value=0>
                            <span>No</span>
                        </b-radio-button>
                    </b-field>

                </div>
            </div>
            <!--/content-->





        </div>




    </div>
</template>


