<template>
    <div class="navigation-add">
        <i-form :label-width="80">
            <Form-item label="模板名称">
                <i-input v-model="name" placeholder="导航名称"></i-input>
            </Form-item>
            <Form-item label="路径">
                <i-input v-model="path" placeholder="路径"></i-input>
            </Form-item>
            <Form-item label="图标">
                <i-input v-model="icon" placeholder="图标"></i-input>
            </Form-item>
            <Form-item label="组件">
                <i-input v-model="component" placeholder="组件"></i-input>
            </Form-item>
            <Form-item label="是否隐藏">
                <i-input v-model="hidden" placeholder="是否隐藏"></i-input>
            </Form-item>
            <Form-item label="重定向">
                <i-input v-model="redirect" placeholder="重定向"></i-input>
            </Form-item>
        </i-form>
        <Button type="primary" @click="add()">添加</Button>
    </div>

</template>

<script>
    import axiosService from "../../utils/axiosService";
    export default {
        name: "NavigationAdd",
        data () {
            return {
                name:"",
                path:"",
                icon:"ios-add",
                component:"",
                hidden:0,
                redirect:"",
                icon_lists:[
                    "ios-add",
                    "md-add",
                    "ios-add-circle",
                    "ios-add-circle-outline",
                    "md-add-circle",
                    "ios-alarm",
                    "ios-alarm-outline",
                    "md-alarm",
                    "ios-albums",
                    "ios-albums-outline",
                    "md-albums",
                    "ios-alert",
                    "ios-alert-outline",
                    "md-alert",
                    "ios-american-football",
                ]
            }
        },
        methods:{
            add:function(){
                axiosService.getService().post('/Admin/Navigation/create',{
                    name:this.name,
                    path:this.path,
                    icon:this.icon,
                    component:this.component,
                    hidden:this.hidden,
                    redirect:this.redirect,
                }).then((data)=>{
                    console.log(data.data);
                });
            },
        }
    }
</script>

<style scoped>

</style>
