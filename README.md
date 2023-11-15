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