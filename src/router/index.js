import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import AccountView from "../views/AccountView.vue";
import ProfileSection from "../views/account/ProfileSection.vue";
import EditProfile from "../views/account/EditProfile.vue";
import AddSong from "../views/account/AddSong.vue";
import DeleteSong from "../views/account/DeleteSong.vue";
import AddVideo from "../views/account/AddVideo.vue";
import DeleteVideo from "../views/account/DeleteVideo.vue";
import AddPost from "../views/account/AddPost.vue";
import EditPost from "../views/account/EditPost.vue";
import Posts from "../views/account/PostsSection.vue";
import PostsById from "../views/account/PostsById.vue";
import { useUserStore } from "@/store/user-store";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/register",
        beforeEnter: (to, from, next) => {
            useUserStore().id
                ? next("/account/profile/" + useUserStore().id)
                : next();
        },
        name: "register",
        component: RegisterView,
    },
    {
        path: "/login",
        beforeEnter: (to, from, next) => {
            useUserStore().id
                ? next("/account/profile/" + useUserStore().id)
                : next();
        },

        name: "login",
        component: LoginView,
    },
    {
        path: "/account",
        beforeEnter: (to, from, next) => {
            useUserStore().id ? next() : next("/login");
        },
        component: AccountView,
        children: [
            {
                path: "profile/:id",
                name: "ProfileSection",
                component: ProfileSection,
            },
            {
                path: "edit-profile",
                name: "EditProfile",
                component: EditProfile,
            },
            {
                path: "add-song",
                name: "AddSong",
                component: AddSong,
            },
            {
                path: "delete-song",
                name: "DeleteSong",
                component: DeleteSong,
            },
            {
                path: "add-video",
                name: "AddVideo",
                component: AddVideo,
            },
            {
                path: "delete-video",
                name: "DeleteVideo",
                component: DeleteVideo,
            },
            {
                path: "add-post",
                name: "AddPost",
                component: AddPost,
            },
            {
                path: "edit-post/:id",
                name: "EditPost",
                component: EditPost,
            },
            {
                path: "posts",
                name: "Posts",
                component: Posts,
            },
            {
                path: "post-by-id/:id",
                name: "PostsById",
                component: PostsById,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
