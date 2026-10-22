/**
 * Other Mandarin a Mainland developer would give for a term's English, accepted
 * in the translate exercise alongside the term's own hanzi. Keep these to genuine
 * synonyms; every entry must contain Chinese characters (never a bare "API").
 */
export const translations: Record<string, string[]> = {
  // a1 Computer basics
  jisuanji: ["电脑"],
  chuliqi: ["中央处理器"],
  neicun: ["运存"],
  yingpan: ["磁盘"],
  wenjianjia: ["目录"],
  wangluo: ["网"],
  anzhuangruanjian: ["装软件"],
  chongqidiannao: ["重启计算机"],
  baocunwenjian: ["存文件"],
  xinjianwenjianjia: ["创建文件夹"],
  lianjiewangluo: ["连网", "联网"],
  neicunbuzu: ["内存不够"],

  // b1 Web basics
  wangye: ["页面"],
  lianjie: ["超链接"],
  dakaiwangye: ["打开页面"],
  shuaxinyemian: ["刷新网页"],
  fangwenwangzhan: ["打开网站"],
  dajianfuwuqi: ["搭服务器", "架设服务器"],
  zuoqianduan: ["搞前端", "写前端"],

  // a2 Programming basics
  daima: ["源代码", "源码"],
  shujuleixing: ["类型"],
  zhengshu: ["整型"],
  fudianshu: ["浮点", "浮点型"],
  buerzhi: ["布尔", "布尔型"],
  xiedaima: ["敲代码"],
  yunxingchengxu: ["跑程序", "执行程序"],
  shengmingbianliang: ["定义变量"],
  geibianliangfuzhi: ["变量赋值"],
  dingyichangliang: ["声明常量"],
  zhuanhuanshujuleixing: ["转换类型", "类型转换"],
  pinjiezifuchuan: ["连接字符串"],

  // a3 Control flow & functions
  tiaojianyuju: ["判断语句"],
  dingyihanshu: ["声明函数"],
  chuanrucanshu: ["传参", "传递参数"],
  tiaochuxunhuan: ["退出循环"],
  xianrusixunhuan: ["进入死循环"],

  // b2 HTML & CSS
  hemoxing: ["盒子模型"],
  tanxingbuju: ["flex布局", "弹性盒子"],
  wanggebuju: ["grid布局"],
  xiangyingshisheji: ["响应式布局", "响应式"],
  tianjiayangshi: ["加样式"],
  rangyuansujuzhong: ["元素居中"],
  bihebiaoqian: ["关闭标签"],
  shipeiyidongduan: ["适配手机端"],
  gaibuju: ["修改布局"],

  // b3 JavaScript
  shijianjiantingqi: ["监听器", "事件监听"],
  shijianmaopao: ["冒泡"],
  huidiaohanshu: ["回调"],
  bianliangtisheng: ["提升"],
  bangdingshijian: ["绑事件"],
  zuzhimaopao: ["阻止事件冒泡"],
  daorumokuai: ["引入模块"],
  zhixingjiaoben: ["运行脚本", "跑脚本"],

  // a4 Object-oriented programming
  chuangjianduixiang: ["新建对象"],
  chongxiefangfa: ["覆盖方法"],
  fangwenshuxing: ["获取属性", "读取属性"],

  // a5 Data structures
  zhan: ["堆栈"],
  haxibiao: ["散列表"],
  jiedian: ["结点"],
  ruzhan: ["压栈"],
  chuzhan: ["弹栈"],
  charujiedian: ["添加节点"],
  shanchujiedian: ["删节点"],
  fanzhuanlianbiao: ["反转链表"],

  // b4 Frontend frameworks
  ku: ["函数库", "类库"],
  danyeyingyong: ["单页面应用"],
  yinruku: ["导入库"],
  gengxinzhuangtai: ["修改状态"],
  luyoutiaozhuan: ["页面跳转"],

  // b5 Backend & APIs
  zhuangtaima: ["响应码"],
  shenfenyanzheng: ["认证", "身份认证", "鉴权"],
  diaojiekou: ["调用接口", "请求接口"],
  faqingqiu: ["发送请求"],
  jiaoyanlingpai: ["验证令牌"],
  huihuaguoqi: ["会话失效"],

  // a6 Algorithms
  chazhao: ["搜索", "检索"],
  erfenchazhao: ["二分搜索", "二分法"],
  tanxinsuanfa: ["贪心", "贪心法"],
  duishuzupaixu: ["数组排序", "给数组排序"],
  jiangdishijianfuzadu: ["减少时间复杂度"],

  // a9 Databases
  guanxixingshujuku: ["关系数据库"],
  biao: ["表格", "数据表"],
  ziduan: ["列"],
  lianjieshujuku: ["连数据库"],
  jianbiao: ["创建表"],
  jiasuoyin: ["建索引", "添加索引"],
  charushuju: ["写入数据"],

  // b6 Version control & teamwork
  banbenkongzhi: ["版本管理"],
  cangku: ["代码库", "代码仓库"],
  daimashencha: ["代码评审", "代码审核"],
  tuisongdaima: ["推代码"],
  qiefenzhi: ["切换分支"],
  tipr: ["提交PR", "发PR"],
  hebingpr: ["合PR"],
  tiissue: ["提交issue"],
  guanbiissue: ["关issue"],

  // b7 Testing & debugging
  danyuanceshi: ["单测"],
  baocuo: ["抛错"],
  xiufu: ["修", "修好"],
  xiubug: ["修复bug", "改bug"],
  fuxianbug: ["重现bug"],
  paoceshi: ["运行测试"],
  xiedanyuanceshi: ["写单测"],
  daduandian: ["加断点", "设断点"],
  charizhi: ["看日志"],
  paochuyichang: ["抛异常"],

  // a7 Systems & concurrency
  neicunxielou: ["内存泄露"],
  chuangjianxiancheng: ["新建线程"],
  shadiaojincheng: ["杀进程", "结束进程"],
  fashengsisuo: ["出现死锁"],

  // a8 Networking
  hulianwang: ["因特网"],
  duankou: ["端口号"],
  yanchi: ["时延", "延时"],
  shujubao: ["包"],
  jiexiyuming: ["域名解析"],
  kaifangduankou: ["打开端口", "开端口"],
  duankoubeizhanyong: ["端口占用"],
  wangluoyanchigao: ["网络延迟大"],
  peizhifanghuoqiang: ["设置防火墙"],
  fasongshujubao: ["发数据包"],

  // b8 Deployment & ops
  shangxian: ["发布"],
  shengchanhuanjing: ["线上环境", "正式环境"],
  fuzaijunheng: ["负载平衡"],
  bushushangxian: ["上线"],
  faban: ["发布版本"],
  goujianjingxiang: ["打镜像"],
  fuwuqidangji: ["服务器挂了"],
  peizhihuanjing: ["搭环境", "搭建环境"],

  // b9 Performance & security
  anquanloudong: ["漏洞"],
  kuazhanjiaobengongji: ["跨站脚本"],
  qinghuancun: ["清除缓存", "清理缓存"],
  youhuaxingneng: ["性能优化"],
  jiamishuju: ["数据加密"],
  xiufuloudong: ["修漏洞"],
  fangzhisqlzhuru: ["防SQL注入"],
};
