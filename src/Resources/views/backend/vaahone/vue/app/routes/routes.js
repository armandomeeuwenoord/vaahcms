let routes;
let routes_list=[];


routes= [
    { path: '*', redirect: '/' }
];



//----------Middleware
import GetAssets from './middleware/GetAssets'
import GetSetupStatus from './middleware/GetSetupStatus'
import IsLoggedIn from './middleware/IsLoggedIn'
import GetBackendAssets from './middleware/GetBackendAssets'
//----------LayoutApp




/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
import LayoutPublic from "./../layouts/Public";


import SignIn from "./../pages/SignIn";
import ForgotPassword from "./../pages/ForgotPassword";

let routes_frontend =     {
    path: '/',
    component: LayoutPublic,
    props: true,
    meta: {
        middleware: [
            GetAssets
        ]
    },
    children: [
        {
            path: '/',
            name: 'sign.in',
            component: SignIn,
            props: true,
            meta: {
                middleware: [
                    GetAssets
                ]
            },
        },
        {
            path: '/forgot-password',
            name: 'forgot.password',
            component: ForgotPassword,
            props: true,
            meta: {
                middleware: [
                    GetAssets
                ]
            },
        }

    ]
};

routes.push(routes_frontend);

/*
|--------------------------------------------------------------------------
| Setup Routes
|--------------------------------------------------------------------------
*/

import SetupIndex from "./../pages/setup/Index";
import InstallIndex from "./../pages/setup/install/Index";
import InstallConfiguration from "./../pages/setup/install/Configuration";
import InstallMigrate from "./../pages/setup/install/Migrate";
import InstallDependencies from "./../pages/setup/install/Dependencies";
import InstallAccount from "./../pages/setup/install/Account";


routes_list =     {
    path: '/setup',
    component: LayoutPublic,
    props: true,
    meta: {
        middleware: [
            GetAssets
        ]
    },
    children: [
        {
            path: '/',
            name: 'setup.index',
            component: SetupIndex,
            props: true,
            meta: {
                middleware: [
                    GetAssets
                ]
            },
        },
        {
            path: 'install',
            name: 'setup.install',
            component: InstallIndex,
            props: true,
            meta: {
                middleware: [
                    GetAssets,
                    GetSetupStatus,
                ]
            },
            children: [
                {
                    path: '/',
                    name: 'setup.install.configuration',
                    component: InstallConfiguration,
                    props: true,
                    meta: {
                        middleware: [
                            GetAssets,
                            GetSetupStatus,
                        ]
                    },
                },
                {
                    path: 'migrate',
                    name: 'setup.install.migrate',
                    component: InstallMigrate,
                    props: true,
                    meta: {
                        middleware: [
                            GetAssets,
                            GetSetupStatus,
                        ]
                    },
                },
                {
                    path: 'dependencies',
                    name: 'setup.install.dependencies',
                    component: InstallDependencies,
                    props: true,
                    meta: {
                        middleware: [
                            GetAssets,
                            GetSetupStatus,
                        ]
                    },
                },
                {
                    path: 'account',
                    name: 'setup.install.account',
                    component: InstallAccount,
                    props: true,
                    meta: {
                        middleware: [
                            GetAssets,
                            GetSetupStatus,
                        ]
                    },
                },
            ]
        },


    ]
};

routes.push(routes_list);


/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
import LayoutBackend from "./../layouts/Backend";
import Index from "./../pages/dashboard/Index";

let routes_backend =     {
    path: '/vaah',
    component: LayoutBackend,
    props: true,
    meta: {
        middleware: [
            IsLoggedIn,
            GetBackendAssets
        ]
    },
    children: [
        {
            path: '/',
            name: 'dashboard.index',
            component: Index,
            props: true,
            meta: {
                middleware: [
                    IsLoggedIn,
                    GetBackendAssets
                ]
            },
        }

    ]
};

routes.push(routes_backend);


/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

import RegList from "./../pages/registrations/List";
import RegCreate from "./../pages/registrations/Create";
import RegView from "./../pages/registrations/View";
import RegEdit from "./../pages/registrations/Edit";

let routes_reg =     {
    path: '/vaah/registrations',
    component: LayoutBackend,
    props: true,
    meta: {
        middleware: [
            IsLoggedIn,
            GetBackendAssets
        ]
    },
    children: [
        {
            path: '/',
            name: 'reg.list',
            component: RegList,
            props: true,
            meta: {
                middleware: [
                    IsLoggedIn,
                    GetBackendAssets
                ]
            },
            children: [
                {
                    path: 'create',
                    name: 'reg.create',
                    component: RegCreate,
                    props: true,
                    meta: {
                        middleware: [
                            IsLoggedIn,
                            GetBackendAssets
                        ]
                    },
                },
                {
                    path: 'view/:id',
                    name: 'reg.view',
                    component: RegView,
                    props: true,
                    meta: {
                        middleware: [
                            IsLoggedIn,
                            GetBackendAssets
                        ]
                    },
                },
                {
                    path: 'edit/:id',
                    name: 'reg.edit',
                    component: RegEdit,
                    props: true,
                    meta: {
                        middleware: [
                            IsLoggedIn,
                            GetBackendAssets
                        ]
                    },
                }

            ]
        }

    ]
};

routes.push(routes_reg);


export default routes;
