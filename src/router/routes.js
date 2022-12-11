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
    },
    // profile
    {
        path: "/profile",
        name: "profile",
        component: () => import("../pages/profile/index.vue"),
    },
    {
        path: "/profile/edit",
        name: "profile-edit",
        component: () => import("../pages/profile/edit.vue"),
    },
    {
        path: "/profile/change-password",
        name: "profile-change-password",
        component: () => import("../pages/profile/changePassword.vue"),
    },
];

export default routes;