# Community-Correction-React
> 毕设
- 微服务架构
- 前后端分离架构

后端链接: [github地址](https://github.com/xieyuquanxx/Community-Correction-SpringCloud)
## 开发环境

- React
- Ant Design
- Vite
- React-Router-Dom
- Axios
- [ahooks](https://ahooks.js.org/zh-CN/guide)

## 操作
### 配置
```bash
git clone https://github.com/xieyuquanxx/Community-Correction-React.git
npm install
```
### 启动项目
```bash
npm run dev
or
yarn run dev 
```

### 打包项目
```bash
npm run build
```

## 任务列表
- [x] 调查评估。
- [x] 不准出境。
- [x] 接收入矫。包括:交付接收、入矫登记、矫正小组、入矫矫正方案、入矫宣告、逾期报到或未报到。
  - [x] 交付接收
  - [x] 入矫登记
  - [x] 矫正小组
  - [x] 入矫宣告
  - [x] 逾期报到/未报到
- [x] 分类管理。
- [ ] 个别化矫正。包括:矫正方案、方案库。
  - [x] 矫正方案
  - [ ] 方案库
- [ ] 日常管理。包括:定期报到、日常报告、实地查访、通信联络、信息化核查、公安情报核查、病情复查诊断、脱管处置、被羁押处置。
  - [x] 定期报到
  - [x] 日常报告
- [ ] 业务审批。包括:禁止令(进入特定场所审批)、会客、外出、经常性跨市县活动、迁居/执行地变更、病情复查延期/暂予监外执行、减免考核。
  - [x] 禁止令
  - [x] 会客
- [ ] 考核奖惩。包括:计分考核、奖励、处罚
  - [x] 计分考核
  - [ ] 奖励
  - [ ] 处罚
- [x] 终止矫正
- [ ] 解除矫正
  - [x] 解矫办理
  - [x] 解矫宣告
  - [ ] 特赦

## Mini Tools
- [ ] TS接口变成Java数据类


## Features
1. 全局流程代办通知
2. TODO：生成通知书

## Bugs
1. 分类管理-管理审批 设置step无效 ✅
2. 审批界面：显示审批流程节点有延迟（step保留原来的值，需强制刷新）✅
   - 解决办法：在useRequest里请求审批信息时，将debounceWait去掉就可以实现瞬间刷新（不过一次查看会渲染3次！😭）
3. 调查评估 -- 调查评估意见书编辑无法正常显示信息 ✅

## 二级菜单

**术语:**
> 委托方: 法院、侦查机关、检察院、公安、监狱局、监狱

> 承办方: 县级社矫机构；配合：司法所；监督：县级检察院

> 业务流程：委托方向承办方出具《调查评估委托函》，承办方收到委托文书后通知监督方；
> 无法开展的调查评估，承办方可以退回；承办方可以指派司法所参与调查评估；
> 承办方完成调查评估后，及时向委托方提交《调查评估意见书》，并抄送监督方。

### 调查评估

- 功能
  - 接收委托方的《调查评估委托函》
  - 可以退回/接收委托
  - 新增调查评估任务，可以查看流程节点
  - 编辑/提交《调查评估意见书》
  - 延长调查期限
  - 查询调查评估