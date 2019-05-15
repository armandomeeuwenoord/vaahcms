@extends("vaahcms::admin.default.layouts.master")

@section('vaahcms_extend_admin_js')
    <script src="{{vh_get_admin_assets('assets/js/setup.js')}}"></script>
@endsection

@section('content')

    <div id="app">

        <div class="content ">

        <div class="container ht-100p">

            <!--header-->
            <div class="d-flex flex-column align-items-center justify-content-center">

                <div class="navbar-brand">
                    <a href="{{url("/")}}" class="df-logo tx-40">Vaah<span>CMS</span>
                        <small class="tx-10 mg-l-5 mg-t-15" style="letter-spacing:1px;">v{{config('vaahcms.version')}}</small>
                    </a>
                </div>

                <ul class="steps mg-t-50 mg-b-50">
                    <li class="step-item" v-bind:class="{'active': active_step == 'database'}">
                        <a href="" class="step-link">
                            <span class="step-number">1</span>
                            <span class="step-title">App & Database Details</span>
                        </a>
                    </li>
                    <li class="step-item" v-bind:class="{'active': active_step == 'run_migrations'}">
                        <a href="" class="step-link">
                            <span class="step-number">2</span>
                            <span class="step-title">Run Migrations</span>
                        </a>
                    </li>
                    <li class="step-item">
                        <a href="" class="step-link">
                            <span class="step-number">3</span>
                            <span class="step-title">Setup Admin Account</span>
                        </a>
                    </li>
                </ul>


            </div>
            <!--/header-->

            <!--form-->
            <div class="row">

                <div class="col-6 offset-3">

                    @include("vaahcms::admin.default.setup.partials.setup-db-details")
                    @include("vaahcms::admin.default.setup.partials.setup-run-migrations")

                </div>


            </div>
            <!--/form-->

            <!--footer-->
            <div class="d-flex flex-column align-items-center justify-content-center mg-t-50">
                <span class="tx-12 tx-color-03">VaahCMS is developed by <a href="https://www.webreinvent.com">WebReinvent</a></span>
            </div>
            <!--/footer-->
            
        </div>

    </div>

    </div>

@endsection