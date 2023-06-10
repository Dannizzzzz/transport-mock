const jsonServer = require('json-server');
const db = require('./db.js');
const path = require('path');
const Mock = require('mockjs');

let mock = '/api'; // 定义路由根别名
var port = process.env.PORT || 5001;

// 创建服务器
// 创建json-server服务对象
const server = jsonServer.create();

// 配置json-server服务器中间件
// 静态资源托管
server.use(
  jsonServer.defaults({
    static: path.join(__dirname, '/public'),
  })
);
// 抓取body数据使用json-server中间件
server.use(jsonServer.bodyParser);

// 提取mock的随机对象
let mr = Mock.Random;
// 1. 管理员登录校验
server.post(mock + '/v1/auth/manager_login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  console.log('reg', req.body);
  username === 'admin' && password === 'admin'
    ? res.jsonp({
        err: 0,
        msg: '管理员登录成功',
        data: {
          follow: mr.integer(1, 5),
          fans: mr.integer(1, 5),
          nikename: mr.cname(),
          auth_icon: mr.image('20x20', mr.color(), mr.cword(1)),
          time: mr.integer(13, 13),
        },
        token: '1234567890123456',
      })
    : res.jsonp({
        err: 1,
        msg: '登录失败',
      });
});
// 2. 注册校验
server.post(mock + '/reg', (req, res) => {
  let username = req.body.username;
  console.log('reg', req.body);
  username !== 'admin'
    ? res.jsonp({
        err: 0,
        msg: '注册成功',
        data: {
          follow: mr.integer(0, 0),
          fans: mr.integer(0, 0),
          nikename: mr.cname(),
          icon: mr.image('20x20', mr.color(), mr.cword(1)),
          time: mr.integer(13, 13),
        },
      })
    : res.jsonp({
        err: 1,
        msg: '注册失败',
      });
});
// 3. 是否登录校验
server.get(mock + '/islogin', (req, res) => {
  // 要求前端需要此次访问 需要守卫
  if (req.headers.token && req.headers.token.length === 16) {
    res.jsonp({
      err: 0,
      msg: '自动登录成功',
    });
  } else {
    res.jsonp({
      err: 1,
      msg: '自动登录失败',
    });
  }
});

// 响应mock接口
// 创建路由对象 db为mock接口路由配置  db==object
const router = jsonServer.router(db);
// 自定义返回结构
router.render = (req, res) => {
  res.jsonp({
    err: res.statusCode,
    msg: res.statusMessage,
    data: res.locals.data,
  });
};
// 定义mock接口别名
server.use(
  jsonServer.rewriter({
    [mock + '/*']: '/$1',
  })
);
// 路由响应
server.use(router);

// 开启jsonserver服务
server.listen(port, () => {
  console.log('mock server is running');
});
