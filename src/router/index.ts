import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../Vue/pages/Home.vue';
import ProjectDetail from '../Vue/pages/ProjectDetail.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/project/:projectId',
    name: 'ProjectDetail',
    component: ProjectDetail,
    props: true, // This allows route params to be passed as props
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Or just createWebHistory()
  routes,
});

export default router;
