<template>
    <navbar>
        <a class="navbar-brand">后台管理</a>
        <ul class="nav navbar-nav ml-auto">
            <Dropdown class="nav-item">
                <a href="javascript:void(0)">
                    <span slot="button">
                        <img src="static/img/avatars/6.jpg" class="img-avatar" alt="o">
                        <span class="d-md-down-none">admin</span>
                    </span>
                </a>
                <Dropdown-menu slot="list">
                    <Dropdown-item>
                        <p class="dropdown-itemp">
                            <Icon type="alert"></Icon>
                            Updates<span class="badge badge-info">42</span>
                        </p>
                    </Dropdown-item>
                    <Dropdown-item>
                        <p class="dropdown-itemp">
                            <Icon type="chatbox-working"></Icon>
                            Messages<span class="badge badge-success">42</span>
                        </p>

                    </Dropdown-item>
                    <Dropdown-item>
                        <p class="dropdown-itemp">
                            <Icon type="chatbox-working"></Icon>
                            Messages<span class="badge badge-danger">42</span>
                        </p>

                    </Dropdown-item>
                    <Dropdown-item divided>
                        <p class="dropdown-itemp">
                            <Icon type="android-contact"></Icon>
                            Profile
                        </p>

                    </Dropdown-item>
                    <Dropdown-item>
                        <p class="dropdown-itemp">
                            <Icon type="android-settings"></Icon>
                            Settings
                        </p>
                    </Dropdown-item>

                    <Dropdown-item><a href="" @click="Logout">
                        <p class="dropdown-itemp">
                            <Icon type="power"></Icon>
                            Logout
                        </p>
                    </a></Dropdown-item>

                </Dropdown-menu>
            </Dropdown>
        </ul>
    </navbar>
</template>
<script>

    import navbar from './Navbar'

    /**
     * 顶部
     */
    export default {
        name: 'header',
        components: {
            navbar,

        },
        methods: {
            Logout(e) {
                e.preventDefault();
                this.$store.dispatch('LogOut').then(() => {
                    this.$router.push({path: '/login'});
                }).catch(err => {
                    this.$message.error(err);
                });
            },
            click() {
                // do nothing
            },
        }
    }
</script>

<style type="text/css" scoped>
    .dropdown-itemp {
        text-align: left;
        font-size: 15px;
        padding: 10px;
    }

    .navbar-nav {
        margin-right: 20px;
    }

    .header-item .ivu-dropdown-item {
        padding: 15px;
    }

    .header-item {
        width: 130px;
        /*background-color: #20a8d8;*/
        /*background-color: white;*/

        height: 55px;


    }

    .header-item a {
        color: white !important;

    }

</style>
