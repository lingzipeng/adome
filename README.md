# demo

## 注册页面

```js
//用于注册模型

const registerData = ref({

  username:'',

  password:'',

  rePassword:''

})
```

## 定义检验规则

```js
//检验密码函数

const checkRePassword = (rule, value, callback) => {

 if (value === '') {

  callback(new Error('请再次确认密码'))

 } else if (value !== registerData.value.password){

   callback(new Error('请确保两次输入的密码一样'))

 } else {

  callback()

 }

}



//定义检验规则

const rules={

  username: [

​    { required: true, message: '请填写用户名', trigger: 'blur' },

​    { min: 5, max: 16, message: '用户名长度为5~16个字符', trigger: 'blur' },

  ],

  password: [

​    { required: true, message: '请填写用户名', trigger: 'blur' },

​    { min: 5, max: 16, message: '用户名长度为5~16个字符', trigger: 'blur' },

  ],

  rePassword: [

​    {validator:checkRePassword, trigger:'blur'}

  ]

}
```

## 注册接口

```js
import request from '@/utils/request.js'

//注册

export const registerService = (registerData) => {

  var params = new URLSearchParams()

  for (let key in registerData) {

​    params.append(key, registerData[key])

  }

  return request.post('/user/register', params)

}
```

```js
//注册事件的函数

const register = async () => {

  let result = await registerService(registerData.value);

  if (result.code == 0){

​    alert('注册成功！')

  } else {

​    alert('注册失败！')

  }

}
```



## 跨域解决

```js
const baseURL = '/api';
```

```js
 server:{

  proxy:{

   '/api':{

​    target:'http://localhost:8080',

​    changeOrigin:true,

​    rewrite:(path)=>path.replace(/^\/api/,'')

   }

  }

 }
```

注册成功

![image-20231115154933387](C:/Users/lingzipeng/AppData/Roaming/Typora/typora-user-images/image-20231115154933387.png)

## 登录

复用注册内容

```js
//登录

export const loginService = (registerData) => {

  var params = new URLSearchParams()

  for (let key in registerData) {

​    params.append(key, registerData[key])

  }

  return request.post('/user/login', params)

}
```

```js
//登录事件函数

const login = async () => {

 let result = await loginService(registerData.value);

 if (result.code === 0) {

  alert("登录成功！");

 } else {

  alert("登录失败！");

 }

};
```



## 清空数据效果

```js
//清空数据

const clearRegisterData = () => {

 registerData.value = {

  username: "",

  password: "",

  rePassword: "",

 };

};
```

![image-20231115162506054](C:/Users/lingzipeng/AppData/Roaming/Typora/typora-user-images/image-20231115162506054.png)

## 拦截器优化

```js
if(result.data.code === 0){

​      return result.data;

​    }

​    //操作失败

​    ElMessage.error(result.data.msg?result.data.msg:'服务异常')

​    return Promise.reject(result.data)
```

引用elementui-plus的样式

```js
import { ElMessage } from 'element-plus';
```

## 主页面



## 路由

```js
import { createRouter,createWebHistory } from "vue-router";

import loginVue from '@/views/Login.vue'

import layoutVue from '@/views/Layout.vue'

const routes = [

  { path: '/login', component: loginVue},

  { path: '/', component: layoutVue}

]

//创建路由器

const router = createRouter({

  history: createWebHistory(),

  routes: routes

});

export default router
```

## 子路由

```js
const routes = [

  { path: '/login', component: loginVue},

  { path: '/', component: layoutVue,redirect: '/article/manage',children:[

​    { path: '/article/category', component: ArticleCategoryVue },

​    { path: 'article/manage', component: ArticleManageVue },

​    { path: '/user/info', component: UserInfoVue},

​    { path: '/user/avatar', component: UserAvatarVue},

​    { path: '/user/password', component:UserResetPasswordVue},

  ]}

]
```

## 文章分类列表查询

接收数据

```js
const ArticleCategoryList = async()=>{

  let result = await ArticleCategoryListService();

  categorys.value = result.data;

}

ArticleCategoryList();
```

## Pinia状态管理库

```js
import {defineStore} from 'pinia'

import {ref} from 'vue'

export const useTokenStore = defineStore('token', ()=>{

  const token = ref('')

  const setToken = (newToken)=>{

​    token.value = newToken

  }

  const removeToken = () =>{

​    token.value = ''

  }

  return {

​    token,setToken,removeToken

  }

})
```

## 请求拦截器

```js
//添加请求拦截器

instance.interceptors.request.use(

  (config)=>{

​    //在发送之前

​    let TokenStore = useTokenStore()

​    if(TokenStore.token){

​      config.headers.Authorization=TokenStore.token

​    }

​    return config

  },

  //错误

  (err)=>{

​    Promise.reject(err)

  }

)
```

## 添加文章分类功能

```js
const addCategory = async() =>{

  let result = await articleCategoryAddService(categoryModel.value);

  ElMessage.success(result.msg? result.msg:'添加成功')



  ArticleCategoryList();

  dialogVisible.value=false;

}
```

## 编辑分类，弹窗展示

```js
//展示编辑弹窗

const showDialog = (row) => {

  dialogVisible.value = true;

  title.value = '编辑分类'

  //数据拷贝

  categoryModel.value.categoryName = row.categoryName;

  categoryModel.value.categoryAlias = row.categoryAlias;

  categoryModel.value.id = row.id

}
```

## 调用接口

```js
//编辑分类

const updateCategory = async()=>{

  //调用接口

  let result = await ArticleCategoryUpdateService(categoryModel.value);

  ElMessage.success(result.msg?result.msg:'修改成功')

  //刷新页面

  ArticleCategoryList();

  dialogVisible.value = false;

}



//清空数据模型的数据

const clearData = () =>{

  categoryModel.value.categoryName='';

  categoryModel.value.categoryAlias='';

}
```

## 删除分类

```js
//删除分类  给删除按钮绑定事件

const deleteCategory = (row) => {

  ElMessageBox.confirm(

​    '你确认删除该分类信息吗？',

​    '温馨提示',

​    {

​      confirmButtonText: '确认',

​      cancelButtonText: '取消',

​      type: 'warning',

​    }

  )

​    .then(() => {

​      //用户点击了确认

​      let result = articleCategoryDeleteService(row.id);

​      ElMessageBox.success(result.massage?result.massage:'删除成功')

​      //刷新页面

​      ArticleCategoryList();

​    })

​    .catch(() => {

​      //用户点击了取消

​      ElMessage({

​        type: 'info',

​        message: '取消删除',

​      })

​    })

}
```

