<template>
    <div class="delivery">
        <div class="form-box">
            <i-form :label-width="80">
                <Form-item label="模板名称">
                    <i-input v-model="name" placeholder="请输入模板名称"></i-input>
                </Form-item>
                <Form-item label="模板描述">
                    <i-input v-model="desc" placeholder="请输入模板描述"></i-input>
                </Form-item>
                <Form-item label="计费方式">
                    <Radio-group v-model="type" style="width:200px">
                        <Radio value="1">件数</Radio>
                        <Radio value="2">重量</Radio>
                    </Radio-group>
                </Form-item>
            </i-form>
            <i-table :columns="columns" :data="table"></i-table>
        </div>
        <div v-show="is_show_address_select" class="dialog">
            <div class="dialog-backdrop"></div>
            <div class="dialog-content">
                <div class="title">
                    <span>选择配送区域</span>
                    <Icon type="close" class="close-button"></Icon>
                </div>
                <div class="province-select-lists">
                    <div class="province_item"
                         v-show="province.name.length > 0"
                         v-for="(province,province_index) in data"
                         v-bind:key="province.id">
                        <Checkbox
                                :indeterminate="province.indeterminate"
                                @on-change="clickProvince(province.id,province_index)"
                                v-model="province.checked">
                            <span>{{province.name}}</span>
                        </Checkbox>
                        <Icon @click="showCityLists(province_index)" type="arrow-right-b"
                              v-show="province.icon_type !=2"></Icon>
                        <Icon @click="showCityLists(province_index)" type="arrow-down-b"
                              v-show="province.icon_type ==2"></Icon>
                        <ul class="city-lists" v-show="province.sub_show">
                            <li class="city_item" v-for="(city,city_index) in province.sub" v-bind:key="city.id">
                                <Checkbox
                                        :indeterminate="city.indeterminate"
                                        @on-change="clickCity(city.id,province_index,city_index)"
                                        v-model="city.checked">
                                    <span>{{city.name}}</span>
                                    <Icon @click="showAreaLists(province_index,city_index)" type="arrow-right-b"
                                          v-show="city.icon_type !=2"></Icon>
                                    <Icon @click="showAreaLists(province_index,city_index)" type="arrow-down-b"
                                          v-show="city.icon_type ==2"></Icon>
                                </Checkbox>
                                <ul class="area-lists" v-show="city.sub_show">
                                    <li class="area-item">
                                        <Checkbox v-for="(area,area_index) in city.sub" v-bind:key="area.id"
                                                  @on-change="clickArea(area.id,province_index,city_index,area_index)"
                                                  v-model="area.checked">
                                            <span>{{area.name}}</span>
                                        </Checkbox>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="bottom">
                    <Checkbox
                            :indeterminate="indeterminate"
                            v-model="allSelectStatus"
                            @on-change="allSelect()">
                        <span>全选</span>
                    </Checkbox>
                    <div class="bottom-right">
                        <span class="tips-span" v-show="countArea>0">已选择{{countArea}}个区域</span>
                        <i-button class="confirm" type="primary" @click="confirm()">确定</i-button>
                    </div>
                </div>
            </div>
        </div>
        <i-button class="confirm" type="primary" @click="add_item()">添加配送区域</i-button>
        <div class="form-action">
            <i-button class="confirm" type="primary" @click="get_from()">提交</i-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Delivery",
        data() {
            return {
                columns: [
                    // {
                    //     title: "可配送区域",
                    //     key: "address"
                    // },
                    {
                        title: "首件",
                        key: "first_value",
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [h('Input', {
                                props: {
                                    value:this.table[params.index].first_value
                                },
                                style: {},
                                on: {
                                    'on-change': (event) => {
                                        this.table[params.index].first_value = event.target.value;
                                    }
                                }
                            })]);
                        }
                    },
                    {
                        title: "价格",
                        key: "first_money",
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [h('Input', {
                                props: {value:this.table[params.index].first_money},
                                style: {},
                                on: {
                                    'on-change': (event) => {
                                        this.table[params.index].first_money = event.target.value;
                                    }
                                }
                            })]);
                        }
                    },
                    {
                        title: "续件",
                        key: "increase_value",
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [h('Input', {
                                props: {value:this.table[params.index].increase_value},
                                style: {},
                                on: {
                                    'on-change': (event) => {
                                        this.table[params.index].increase_value = event.target.value;
                                    }
                                }
                            })]);
                        }
                    },
                    {
                        title: "续费",
                        key: "increase_money",
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [h('Input', {
                                props: {value:this.table[params.index].increase_money},
                                style: {},
                                on: {
                                    'on-change': (event) => {
                                        this.table[params.index].increase_money = event.target.value;
                                    }
                                }
                            })]);
                        }
                    },
                    {
                        title: "操作",
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editAddress(params.index)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteAddress(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    },
                ],
                table: [],
                name: "",
                desc: "",
                type: "1",
                value: [],
                edit_index: false,
                is_show_address_select: false,
                allSelectStatus: false,
                indeterminate: false,
                countArea: 1,
                defaultData: [],
                data: [],
            }
        },
        created: function () {
            this.defaultData = require('../get-data');
        },
        methods: {
            /**
             * 获取表单
             */
            get_from() {
                console.log(
                    {
                        name: this.name,
                        desc: this.desc,
                        type: this.type,
                        table: this.table,
                    }
                );
            },
            /**
             * 添加模板
             */
            add_item() {
                this.defaultData;

                /**
                 * 获取已经选择过的区域 TODO
                 */
                // for(var index in this.defaultData){
                //
                // }
                this.selectAddress(this.defaultData);
            },
            /**
             * 编辑模板
             */
            editAddress(index) {
                this.edit_index = index;
                this.selectAddress(this.table[index].address_data);
            },
            /**
             * 删除模板
             */
            deleteAddress(index) {
                this.table.splice(index, 1);
            },
            /**
             * 显示城市列表
             */
            showCityLists(province_index) {
                if (this.data[province_index].sub_show) {
                    this.data[province_index].icon_type = 1;
                } else {
                    /**
                     * 隐藏所有
                     * @type {number}
                     */
                    this.closeAllCityLists('city');
                    /**
                     * 修改类型
                     * @type {number}
                     */
                    this.data[province_index].icon_type = 2;
                }
                this.data[province_index].sub_show = !this.data[province_index].sub_show;

            },
            /**
             * 显示区域列表
             */
            showAreaLists(province_index, city_index) {
                if (this.data[province_index].sub[city_index].sub_show) {
                    this.data[province_index].sub[city_index].icon_type = 1;
                } else {
                    /**
                     * 隐藏所有
                     * @type {number}
                     */
                    this.closeAllCityLists('province');
                    /**
                     * 修改类型
                     * @type {number}
                     */
                    this.data[province_index].sub[city_index].icon_type = 2;
                }
                this.data[province_index].sub[city_index].sub_show = !this.data[province_index].sub[city_index].sub_show;
            },
            /**
             * 关闭城市弹框
             */
            closeAllCityLists(type = 'city') {
                for (var i in this.data) {
                    if (type == 'city') {
                        this.data[i].sub_show = false;
                        this.data[i].icon_type = 1;
                    }
                    this.closeAllAreaLists(i);
                }
            },
            /**
             * 关闭所有的区域弹框
             */
            closeAllAreaLists(province_index) {
                for (var i in this.data[province_index].sub) {
                    this.data[province_index].sub[i].sub_show = false;
                }
            },
            /**
             * 选择省份
             */
            clickProvince(province_id, province_index) {
                /**
                 * 获取当前状态
                 */
                if (this.data[province_index].checked) {
                    var select_value = true;
                } else {
                    var select_value = false;
                }
                var tmp_data = this.data;
                for (var i in this.data[province_index].sub) {
                    tmp_data[province_index].sub[i].checked = select_value;
                    /**
                     * 变动区域
                     */
                    this.clickCity(this.data[province_index].sub[i].id, province_index, i);
                }
                this.data = tmp_data;
                this.showCityLists(province_index);
                /**
                 * 检查全选
                 */
                this.checkAllGroupChange(this.data, 'province');
            },
            /**
             * 城市变动
             */
            clickCity(city_id, province_index, city_index) {
                /**
                 * 获取当前状态
                 */
                if (this.data[province_index].sub[city_index].checked) {
                    var select_value = true;
                } else {
                    var select_value = false;
                }
                var tmp_data = this.data;
                for (var i in this.data[province_index].sub[city_index].sub) {
                    tmp_data[province_index].sub[city_index].sub[i].checked = select_value;
                }
                this.data = tmp_data;
                /**
                 * 显示区域
                 */
                this.showAreaLists(province_index, city_index);
                /**
                 * 检查城市全选
                 */
                this.checkAllGroupChange(this.data[province_index].sub, 'city', {province_index});
                /**
                 * 检查省份全选
                 */
                this.checkAllGroupChange(this.data[province_index].sub, 'province');
            },
            /**
             * 选择区域
             * @param area_id
             * @param province_index
             * @param city_index
             * @param area_index
             */
            clickArea(area_id, province_index, city_index, area_index) {
                /**
                 * 检查城市全选
                 */
                this.checkAllGroupChange(this.data[province_index].sub[city_index].sub, 'area', {
                    province_index,
                    city_index
                });
                /**
                 * 检查省份全选
                 */
                this.checkAllGroupChange(this.data[province_index].sub[city_index].sub, 'city', {province_index});
                /**
                 * 检查全选按钮状态
                 */
                this.checkAllGroupChange(this.data[province_index].sub[city_index].sub, 'province');
            },
            /**
             * 检查全选状态
             */
            checkAllGroupChange(pipe, type = 'area', param = {}) {
                var all_select = true;
                var is_select = false;
                for (var i in pipe) {
                    var item = pipe[i];
                    if (!item.checked) {
                        all_select = false;
                    }
                    if (item.checked) {
                        is_select = true;
                    }
                }
                if ((!all_select) && is_select) {
                    var indeterminate = true;
                } else {
                    var indeterminate = false;
                }
                var tmp_data = this.data;
                switch (type) {
                    case 'area':
                        tmp_data[param.province_index].sub[param.city_index].checked = all_select;
                        tmp_data[param.province_index].sub[param.city_index].indeterminate = indeterminate;
                        break;
                    case 'city':
                        tmp_data[param.province_index].checked = all_select;
                        tmp_data[param.province_index].indeterminate = indeterminate;
                        break;
                    case 'province':
                        this.allSelectStatus = all_select;
                        this.indeterminate = indeterminate;
                        break;
                    default:
                        break;
                }
                this.data = tmp_data;
            },
            /**
             * 全选
             */
            allSelect() {
                /**
                 * 获取状态
                 */
                if (this.allSelectStatus) {
                    /**
                     * 全选
                     */
                    var status = true;
                } else {
                    /**
                     * 全部取消
                     */
                    var status = false;
                }
                /**
                 * 循环处理
                 */
                for (var province_index in this.data) {
                    this.data[province_index].checked = status;
                    /**
                     * 选择省份
                     */
                    this.clickProvince(this.data[province_index].id, province_index);
                }
            },
            /**
             * 过滤数据
             */
            selectAddress(data) {
                this.is_show_address_select = true;
                /**
                 * 获取可用数据
                 */
                this.data = data;
            },
            /**
             * 确定
             */
            confirm() {
                /**
                 * 存储
                 */
                var address = '';

                /**
                 * 判断是修改还是添加
                 */
                if (this.table[this.edit_index] != undefined) {
                    this.table[this.edit_index] = {
                        first_value: 1,
                        first_money: 0,
                        increase_value: 1,
                        increase_money: 0,
                        address: address,
                        address_data: this.data
                    };
                } else {
                    this.table.push({
                        first_value: 1,
                        first_money: 0,
                        increase_value: 1,
                        increase_money: 0,
                        address: address,
                        address_data: this.data
                    });
                }
                /**
                 * 清空
                 * @type {Array}
                 */
                this.data = [];
                this.is_show_address_select = false;
            },
        }
    }
</script>

<style scoped>
    li {
        list-style-type: none;
    }

    .form-action {
        align-items: center;
        display: flex;
        flex-direction: column;
    }

    .dialog {
        position: relative;
    }

    .city-lists {
        display: none;
    }

    .dialog-backdrop {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .6);
        height: 100%;
        z-index: 1050;
    }

    .province-select-lists {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    .dialog-content .province-select-lists .province_item {
        width: 110px;
        line-height: 40px;
    }

    .city-lists {
        position: absolute;
        padding: 3px;
        z-index: 9999;
        background: #eee;
        display: flex;
        height: auto;
        border: 1px solid #cccccc;
        flex-direction: column;
    }

    .city-lists .city_item {
        height: 20px;
    }

    .area-lists {
        position: absolute;
        right: -100px;
        display: flex;
        flex-wrap: wrap;
        background: #ccc;
        width: 100px;
        height: 400px;
        padding: 3px;
        z-index: 9999;
        border: 1px solid #cccccc;
        flex-direction: column;
    }

    .area-lists .area-item {
        height: 20px;
    }

    .dialog-content {
        padding: 20px;
        width: 600px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 1051;
        background: #ffffff;
    }

    .dialog-content .title {
        padding-bottom: 5px;
        border-bottom: #ccc solid 1px;
    }

    .dialog-content .title .close-button {
        position: absolute;
        right: 22px;
        top: 17px;
    }

    .tips-span {
        display: inline-block;
        font-size: 12px;
        color: #9f9f9f;
        margin-right: 10px;
    }

    .bottom-right {
        position: absolute;
        right: 10px;
        bottom: 10px;
    }
</style>
