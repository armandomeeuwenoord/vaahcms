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
                    <span>#{{id}}&nbsp;/&nbsp;</span>
                    <span>{{title}}</span>
                </div>

                <div class="card-header-buttons">

                    <div class="field has-addons is-pulled-right">
                        <p v-if="!item.deleted_at" class="control">
                            <b-button icon-left="edit"
                                      :loading="is_btn_loading"
                                      @click="edit('save')">
                                Edit
                            </b-button>
                        </p>

                        <p class="control">


                            <b-dropdown v-if="item" aria-role="list" position="is-bottom-left">
                                <button class="button" slot="trigger">
                                    <b-icon icon="caret-down"></b-icon>
                                </button>

                                <b-dropdown-item aria-role="listitem"
                                                 v-if="!item.deleted_at"
                                                 @click="actions('bulk-trash')"
                                >
                                    <b-icon icon="trash"></b-icon>
                                    Trash
                                </b-dropdown-item>

                                <b-dropdown-item aria-role="listitem"
                                                 v-if="item.deleted_at"
                                                 @click="actions('bulk-restore')"
                                >
                                    <b-icon icon="trash-restore"></b-icon>
                                    Restore
                                </b-dropdown-item>
                                <b-dropdown-item aria-role="listitem"
                                                 @click="confirmDelete()"
                                >
                                    <b-icon icon="eraser"></b-icon>
                                    Delete
                                </b-dropdown-item>

                            </b-dropdown>


                        </p>

                        <p class="control">
                            <b-button
                                      @click="exit()"
                                      icon-left="times">
                            </b-button>
                        </p>



                    </div>


                </div>

            </header>
            <!--/header-->

            <b-notification type="is-danger"
                            :closable="false"
                            class="is-light is-small"
                            v-if="item && item.deleted_at"
            >
                Deleted {{$vaah.fromNow(item.deleted_at)}}
            </b-notification>

            <!--content-->
            <div class="card-content">
                <div class="block"  v-if="item">

                    <div class="b-table">

                        <div class="table-wrapper">
                            <table class="table is-hoverable">

                                <tbody>

                                <template v-for="(value, label) in item">

                                    <template>
                                        <TableTrView :value="value"
                                                     :label="label"
                                                     :is_copiable="isCopiable(label)"
                                                     :is_upper_case="isUpperCase(label)"
                                        />
                                    </template>

                                </template>

                                </tbody>



                            </table>
                        </div>

                    </div>



<!--                    <b-table v-if="!is_editable"-->
<!--                            class="is-full-width"-->
<!--                            :striped="true"-->
<!--                            :data="item"-->
<!--                            :mobile-cards="true">-->

<!--                        <template slot-scope="props">-->

<!--                            <b-table-column field="type" label="">-->
<!--                                {{props.row.name}}-->
<!--                            </b-table-column>-->

<!--                            <b-table-column field="description" label="">-->
<!--                               : {{props.row.value}}-->
<!--                            </b-table-column>-->
<!--                        </template>-->
<!--                    </b-table>-->

<!--                    <b-table v-else-->
<!--                            class="is-full-width"-->
<!--                            :striped="true"-->
<!--                            :data="item"-->
<!--                            :mobile-cards="true">-->

<!--                        <template v-if=" props.row.name !== 'Created by' &&-->
<!--                                     props.row.name !== 'Id' &&-->
<!--                                     props.row.name !== 'Updated by' &&-->
<!--                                     props.row.name !== 'Deleted by' &&-->
<!--                                     props.row.name !== 'Created at' &&-->
<!--                                     props.row.name !== 'Deleted at' &&-->
<!--                                     props.row.name !== 'Count users' &&-->
<!--                                     props.row.name !== 'Count roles' &&-->
<!--                                      props.row.name !== 'Updated at'" slot-scope="props">-->

<!--                            <b-table-column field="type" label="">-->
<!--                                {{props.row.name}}-->
<!--                            </b-table-column>-->

<!--                            <b-table-column v-if="props.row.name === 'Is active'" field="description" label="">-->
<!--                                <b-select placeholder="Select a character" v-model="props.row.value" icon="account">-->
<!--                                        <option value=1>Yes</option>-->
<!--                                        <option value=0>No</option>-->
<!--                                </b-select>-->
<!--                            </b-table-column>-->

<!--                            <b-table-column v-else field="description" label="">-->

<!--                                <b-field>-->
<!--                                    <b-input v-model="props.row.value"></b-input>-->
<!--                                </b-field>-->
<!--                            </b-table-column>-->
<!--                        </template>-->
<!--                    </b-table>-->



                </div>
            </div>
            <!--/content-->





        </div>




    </div>
</template>


