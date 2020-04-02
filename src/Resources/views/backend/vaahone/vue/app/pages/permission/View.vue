<script src="./ViewJs.js"></script>
<template>
    <div class="column" v-if="page.assets">
        <div class="block" v-if="is_content_loading">
            <Loader/>
        </div>

        <div class="card" v-else>
            <!--header-->
            <header class="card-header">

                <div class="card-header-title">
                    <span>#{{id}} / </span>
                    <span>{{title}}</span>
                </div>

                <div class="card-header-buttons">

                    <div class="field has-addons is-pulled-right">
                        <p v-if="is_editable" class="control">
                            <b-button icon-left="edit"
                                      :loading="is_btn_loading"
                                      @click="updateDetail">
                                Save
                            </b-button>
                        </p>

                        <p v-if="is_editable" class="control">


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
                            <button @click="toogleEdit" class="button" slot="trigger">
                                <b-icon icon="caret-down"></b-icon>
                            </button>
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

                    <b-table v-if="!is_editable"
                            class="is-full-width"
                            :striped="true"
                            :data="item"
                            :mobile-cards="true">

                        <template slot-scope="props">

                            <b-table-column field="type" label="">
                                {{props.row.name}}
                            </b-table-column>

                            <b-table-column field="description" label="">
                               : {{props.row.value}}
                            </b-table-column>
                        </template>
                    </b-table>

                    <b-table v-else
                            class="is-full-width"
                            :striped="true"
                            :data="item"
                            :mobile-cards="true">

                        <template v-if=" props.row.name !== 'Created by' &&
                                     props.row.name !== 'Id' &&
                                     props.row.name !== 'Updated by' &&
                                     props.row.name !== 'Deleted by' &&
                                     props.row.name !== 'Created at' &&
                                     props.row.name !== 'Deleted at' &&
                                     props.row.name !== 'Count users' &&
                                     props.row.name !== 'Count roles' &&
                                      props.row.name !== 'Updated at'" slot-scope="props">

                            <b-table-column field="type" label="">
                                {{props.row.name}}
                            </b-table-column>

                            <b-table-column v-if="props.row.name === 'Is active'" field="description" label="">
                                <b-select placeholder="Select a character" v-model="props.row.value" icon="account">
                                        <option value=1>Yes</option>
                                        <option value=0>No</option>
                                </b-select>
                            </b-table-column>

                            <b-table-column v-else field="description" label="">

                                <b-field>
                                    <b-input v-model="props.row.value"></b-input>
                                </b-field>
                            </b-table-column>
                        </template>
                    </b-table>



                </div>
            </div>
            <!--/content-->





        </div>




    </div>
</template>


