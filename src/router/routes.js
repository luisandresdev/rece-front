import auth from '../middleware/auth';

const routes = [
    // auth
    {
        path: "/",
        redirect: { name: "login" },
    },
    {
        path: '/auth/login',
        name: 'login',
        component: () => import('../pages/auth/login.vue'),
    },
    {
        path: '/auth/register',
        name: 'register',
        component: () => import('../pages/auth/register.vue'),
    },
    {
        path: '/auth/recover-password',
        name: 'recover_password',
        component: () => import('../pages/auth/recover_password.vue'),
        meta: {
            middleware: [auth,]
        },
    },
    // profile
    {
        path: "/profile",
        name: "profile",
        component: () => import("../pages/profile/index.vue"),
        meta: {
            middleware: [auth,]
        },
    },
    {
        path: "/profile/edit",
        name: "profile-edit",
        component: () => import("../pages/profile/edit.vue"),
        meta: {
            middleware: [auth,]
        },
    },
    {
        path: "/profile/change-password",
        name: "profile-change-password",
        component: () => import("../pages/profile/changePassword.vue"),
        meta: {
            middleware: [auth,]
        },
    },
    //categories
    {
        path: "/categories",
        name: "categories",
        component: () => import("../pages/categories/index.vue"),
        meta: {
            middleware: [auth,]
        },
    },
    // etiquetas
    {
        path: "/tags",
        name: "tags",
        component: () => import("../pages/tags/index.vue"),
        meta: {
            middleware: [auth,]
        },
    },
];

export default routes;