var Mock = require('mockjs'); // 用mockjs模拟生成数据
let mr = Mock.Random;

// wayBill 接口
let mapWayBill = (n) => {
  let wayBill = [];
  for (var i = 0; i < n; i++) {
    wayBill.push({
      id: 10000 + i,
      gDate: '@date',
      aDate: '@date()',
      start: '@province()',
      destination: '@province()',
      wayBillNum: '@id()',
      driver: '@cname()',
      tel: '@increment(13800000)',
      weight: '@pick(["8.0", "10.0", "12.0", "15.0", "20.0", "25.0", "30.0"])',
      totalCount: n,
    });
  }
  return wayBill;
};

// vehicles 接口
let mapVehicles = (n) => {
  let vehicle = [];
  for (var i = 0; i < n; i++) {
    vehicle.push({
      id: i + 1,
      img: mr.image('200x200', mr.color()),
      license: /[A-Z]{1,2}[0-9]{3,4}/,
      load: '@pick(["8.0", "10.0", "12.0", "15.0", "20.0", "25.0", "30.0"])',
      belonging: '@pick(["自有车辆", "外雇车辆"])',
      service: '@date()',
      brand: '@cword(3)',
      speed: '@float(50, 100, 1, 2)',
      totalCount: n,
    });
  }
  return vehicle;
};

// funds 接口
let mapFunds = (n) => {
  let fund = [];
  for (var i = 0; i < n; i++) {
    fund.push({
      id: i + 1,
      img: mr.image('200x200', '#eaf3f7'),
      date: '@date()',
      name: '@cname()',
      content:
        '@pick(["买菜", "停车费", "油钱", "车辆维修", "生活缴费", "其他费用"])',
      count: '@integer(1, 20)',
      cost: '@float(1, 1000, 1, 2)',
      totalCount: n,
    });
  }
  return fund;
};

// staff 接口
let mapStaff = (n) => {
  let staff = [];
  for (var i = 0; i < n; i++) {
    staff.push({
      id: i + 1,
      img: mr.image('200x200', '#4184e0'),
      name: '@cname()',
      position: '@pick(["司机", "车队长", "调度员", "会计", "经理"])',
      salary: '@integer(4000, 8000)',
      oilConsumption: '@float(17, 30, 1, 2)',
      fine: '@float(0, 20, 0, 1)',
      totalCount: n,
    });
  }
  return staff;
};

// mylog 接口
let mapLog = (n) => {
  let mylog = [];
  for (var i = 0; i < n; i++) {
    mylog.push({
      id: i + 1,
      name: '管理员',
      method: '@pick(["查询", "增加", "删除", "修改"])',
      date: '@datetime()',
      ip: '@url()',
      totalCount: n,
    });
  }
  return mylog;
};

module.exports = Mock.mock({
  wayBill: mapWayBill(100),
  vehicles: mapVehicles(50),
  funds: mapFunds(100),
  staff: mapStaff(30),
  // notices 接口
  'notices|10': [
    {
      'id|+1': 1,
      date: '@date()',
      content: '@cparagraph()',
      'readers|1-2': ['管理员', '用户'],
      totalCount: 10,
    },
  ],
  // usersControl 接口
  usersControl: [
    {
      id: 1,
      name: '杜拉拉',
      role: '管理员',
      tel: '12309872084',
      permission: ['运单查询', '人员考核', '系统设置'],
      totalCount: 8,
    },
    {
      id: 2,
      name: '李明',
      role: '管理员',
      tel: '12302324384',
      permission: ['车辆信息', '系统设置'],
      totalCount: 8,
    },
    {
      id: 3,
      name: '韩蕾蕾',
      role: '用户',
      tel: '12312735784',
      permission: ['运单查询', '经费管理'],
      totalCount: 8,
    },
    {
      id: 4,
      name: '小丽',
      role: '用户',
      tel: '12820445084',
      permission: ['运单查询'],
      totalCount: 8,
    },
    {
      id: 5,
      name: '杜拉拉',
      role: '管理员',
      tel: '12309872084',
      permission: ['经费管理', '人员考核', '系统设置'],
      totalCount: 8,
    },
    {
      id: 6,
      name: '李明',
      role: '管理员',
      tel: '12302324384',
      permission: ['经费管理', '系统设置'],
      totalCount: 8,
    },
    {
      id: 7,
      name: '韩蕾蕾',
      role: '用户',
      tel: '12312735784',
      permission: ['运单查询', '经费管理'],
      totalCount: 8,
    },
    {
      id: 8,
      name: '小丽',
      role: '用户',
      tel: '12820445084',
      permission: ['运单查询'],
      totalCount: 8,
    },
  ],
  'mylog|10': [
    {
      'id|+1': 1,
      name: '管理员',
      request: '查询',
      method: 'POST',
      content: '【公开模块】登录',
      time: '2021-07-05 14:04:43',
    },
  ],
});
