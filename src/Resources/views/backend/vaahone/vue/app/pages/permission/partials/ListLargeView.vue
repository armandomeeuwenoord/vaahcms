<script src="./ListLargeViewJs.js"></script>
<template>
    <div>
        <h4 class="is-4">large view</h4>
        <b-table :data="page.list_is_empty ? [] : page.list.data"
                 :checkable="true"
                 :checked-rows.sync="page.bulk_action.selected_items"
                 checkbox-position="left"
                 :hoverable="true"
                 :row-class="setRowClass"
        >

            <template slot-scope="props">
                <b-table-column field="id" label="ID" width="40" numeric>
                    {{ props.row.id }}
                </b-table-column>

                <b-table-column field="name" label="Name">
                    {{ props.row.name }}
                </b-table-column>

                <b-table-column field="email" label="Slug">
                    {{ props.row.slug }}
                </b-table-column>

                <b-table-column field="status" label="Is Active">
                    <b-button v-if="props.row.is_active === 1" rounded size="is-small"
                              type="is-success" @click="changeStatus(props.row.id)">
                        Yes
                    </b-button>
                    <b-button v-else rounded size="is-small" type="is-danger"
                              @click="changeStatus(props.row.id)">
                        No
                    </b-button>
                </b-table-column>

                <b-table-column field="created_at" label="Roles" >
                    <b-button rounded size="is-small"
                              type="is-primary" @click="getRole(props.row)">
                        {{ props.row.count_roles }}
                    </b-button>
                </b-table-column>

                <b-table-column field="gender" label="Users">
                    {{ props.row.count_users }}
                </b-table-column>

                <b-table-column field="created_at" label="Created At">
                    {{ $vaah.fromNow(props.row.created_at) }}
                </b-table-column>


                <b-table-column field="actions" label=""
                                width="40">

                    <b-tooltip label="View" type="is-dark">
                        <b-button size="is-small"
                                  @click="setActiveItem(props.row)"
                                  icon-left="chevron-right">
                        </b-button>
                    </b-tooltip>


                </b-table-column>


            </template>

            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>Nothing here.</p>
                    </div>
                </section>
            </template>

        </b-table>
    </div>
</template>

