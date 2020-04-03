<script src="./EditJs.js"></script>
<template>
    <div class="column" v-if="page.assets">

        <div class="card">

            <!--header-->
            <header v-if="item" class="card-header">

                <div class="card-header-title">
                    <span>#{{id}}&nbsp;/&nbsp;</span>
                    <span>{{item.name}}</span>
                </div>


                <div class="card-header-buttons">

                    <div class="field has-addons is-pulled-right">
                        <p class="control">
                            <b-button icon-left="edit"
                                      :loading="is_btn_loading"
                                      @click="updateDetail('save')">
                                Save
                            </b-button>
                        </p>

                        <p class="control">


                            <b-dropdown aria-role="list" position="is-bottom-left">
                                <button class="button" slot="trigger">
                                    <b-icon icon="caret-down"></b-icon>
                                </button>

                                <b-dropdown-item @click="updateDetail('close')" aria-role="listitem">
                                    <b-icon icon="check"></b-icon>
                                    Save & Close
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
                <div class="block" v-if="item">

                    <b-field label="Slug" :label-position="labelPosition">
                        <b-input v-model="item.slug"></b-input>
                    </b-field>

                    <b-field label="Detail" :label-position="labelPosition">
                        <b-input type="textarea" v-model="item.details"></b-input>
                    </b-field>

                    <b-field label="Title" :label-position="labelPosition">
                        <b-select placeholder="- Select a title -" v-model="item.is_active">
                            <option value="">- Select a title -</option>
                            <option value=1>Yes</option>
                            <option value=0>No</option>
                        </b-select>
                    </b-field>

                </div>
            </div>
            <!--/content-->





        </div>




    </div>
</template>


