# koa-template

## 前言

本课程只适合学过 `nodeJs` 的同学。

## 一、Koa2安装

创建一个空白目录，然后进入终端，并在终端对koa进行安装：

```bash
# 项目初始化
cnpm init -y
# 安装koa
cnpm i koa -S
```

## 二、入口文件

在项目根目录创建 `app.js` 文件，并在上一步操作中，生成的 `package.json` 里配置：

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
  },
}
```

在 `app.js` 中：

```js
const Koa = require('koa');
const app = new Koa();
const port = 9000;

/* 
	解释下面这段代码：
	app.use()方法是：将给定的中间件方法添加到此应用程序。简单说就是调用中间件
	app.use() 返回 this, 因此可以链式表达
*/
app.use(async (ctx)=>{
    ctx.body = "Hello, Koa";
  	// ctx.body是ctx.response.body的简写
})

app.listen(port, ()=>{
    console.log('Server is running at http://localhost:'+port);
})
```

然后运行 `npm start` ，并在浏览器输入 `http://localhost:9000/` 即可看到页面效果。

## 三、洋葱模型

<img src="https://segmentfault.com/img/bV6DZG/view?w=478&h=435" style="1px solid" />

`Koa` 和 `Express` 都会使用到中间件，Express的中间件是顺序执行，从第一个中间件执行到最后一个中间件，发出响应：

<img src="https://upload-images.jianshu.io/upload_images/3663059-b6acea9ec3f0a8f9.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/883/format/webp" style="border: 1px solid" />

Koa是从第一个中间件开始执行，遇到 `next` 进入下一个中间件，一直执行到最后一个中间件，在逆序，执行上一个中间件 `next` 之后的代码，一直到第一个中间件执行结束才发出响应。

<img src="https://upload-images.jianshu.io/upload_images/3663059-03622ea2a9ffce2a.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/814/format/webp" style="border: 1px solid" />

对于这个洋葱模型，我们用代码来解释一下。

假如把上面的代码改写成：

```js
const Koa = require('koa2');
const app = new Koa();
const port = 9000;

app.use(async (ctx, next)=>{
    console.log(1)
    await next();
    console.log(1)
})

app.use(async (ctx, next)=>{
    console.log(2)
    await next();
    console.log(2)
})

app.use(async (ctx)=>{
    console.log(3)
})

app.listen(port, ()=>{
    console.log('Server is running at http://localhost:'+port);
})
```

那么在浏览器刷新后，控制台得到的顺序是：

```
1
2
3
2
1
```

现在可以看到，我们通过 `next`可以先运行下个中间件，等中间件结束后，再继续运行当前 `next()` 之后的代码。

## 四、路由安装

当需要匹配不同路由时，可以安装：

```
npm i koa-router
```

将 `app.js` 修改：

```js
const Koa = require('koa2');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const port = 9000;

router.get('/', async (ctx)=>{
    ctx.body = "首页";
})

router.get('/list', async (ctx)=>{
    ctx.body = "列表页";
})


app.use(router.routes(), router.allowedMethods());

app.listen(port, ()=>{
    console.log('Server is running at http://localhost:'+port);
})
```

