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
                <select v-model="icon">
                    <option v-for="item in icon_lists" v-bind:value="item"><Icon v-bind:type="item"/>{{item}}</option>
                </select>
                <Select v-model="icon" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Form-item>
            <Form-item label="组件">
                <select v-model="component">
                    <option v-for="(item,key) in view_list" v-bind:value="key">{{key}}</option>
                </select>
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
    import ViewComponentLoad from "../../utils/ViewComponentLoad";
    import navigation from "../../api/navigation";
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
                view_list:ViewComponentLoad.components,
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
                ],
                cityList:[
                    {
                        value: 'New',
                        label: 'New'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
            }
        },
        methods:{
            add:function(){
                navigation.addNavigation(this.name,this.path,this.icon,this.component,this.hidden,this.redirect);
            },
        }
    }
</script>

<style scoped>

</style>
