<template>
    <div class="app">
        <AppHeader/>
        <div class="app-body">
            <Sidebar/>
            <main class="main">
                <breadcrumb :list="list"/>
                <div class="container-fluid">
                    <router-view></router-view>
                </div>
            </main>
            <AppAside/>
        </div>
        <AppFooter/>
    </div>
</template>

<script>
    import Sidebar from './components/Sidebar'
    import AppAside from './components/Aside'
    import AppHeader from './components/Header'
    import AppFooter from './components/Footer'
    import Breadcrumb from './components/Breadcrumb'

    export default {
        name: 'App',
        components: {
            Sidebar,
            AppAside,
            AppHeader,
            AppFooter,
            Breadcrumb
        },
        data(){
            return {
            }
        },
        computed: {
            name() {
                return this.$route.name
            },
            list() {
                return this.$route.matched
            }
        }
    }
</script>
