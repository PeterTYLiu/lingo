import { phrase, term, unit } from "../types";

export const b1 = unit("b1", "web", "Web basics", "网页基础", [
  term("wangzhan", "网站", "wǎng zhàn", "website", [["网", "net"], ["站", "station"]], { acceptedEnglish: ["site", "web site"] }),
  term("wangye", "网页", "wǎng yè", "web page", [["网", "net"], ["页", "page"]], { acceptedEnglish: ["webpage", "page"] }),
  term("liulanqi", "浏览器", "liú lǎn qì", "browser", [["浏览", "browse"], ["器", "tool"]], { acceptedEnglish: ["web browser"] }),
  term("fuwuqi", "服务器", "fú wù qì", "server", [["服务", "serve"], ["器", "machine"]]),
  term("kehuduan", "客户端", "kè hù duān", "client", [["客户", "customer"], ["端", "end"]], { acceptedEnglish: ["client side", "client-side"] }),
  term("qianduan", "前端", "qián duān", "frontend", [["前", "front"], ["端", "end"]], { acceptedEnglish: ["front end", "front-end"] }),
  term("houduan", "后端", "hòu duān", "backend", [["后", "back"], ["端", "end"]], { acceptedEnglish: ["back end", "back-end"] }),
  term("quanzhan", "全栈", "quán zhàn", "full stack", [["全", "whole"], ["栈", "stack"]], { acceptedEnglish: ["full-stack", "fullstack"] }),
  term("lianjie", "链接", "liàn jiē", "link", [["链", "chain"], ["接", "connect"]], {
    acceptedEnglish: ["hyperlink"],
    note: "A URL is 网址 (wǎng zhǐ, \"web address\").",
  }),
], [
  phrase("dakaiwangye", "open a web page", [["打开", "dǎ kāi", "open"], "wangye"]),
  phrase("shuaxinyemian", "refresh the page", [["刷新", "shuā xīn", "refresh"], ["页面", "yè miàn", "page"]], { acceptedEnglish: ["reload the page"] }),
  phrase("fangwenwangzhan", "visit a website", [["访问", "fǎng wèn", "visit / access"], "wangzhan"], { acceptedEnglish: ["access a website"] }),
  phrase("dajianfuwuqi", "set up a server", [["搭建", "dā jiàn", "put up / build"], "fuwuqi"], { acceptedEnglish: ["build a server"] }),
  phrase("zuoqianduan", "work on frontend", [["做", "zuò", "do"], "qianduan"], { note: "我是做前端的 = I'm a frontend developer." }),
  phrase("qianhouduanfenli", "frontend–backend separation", [["前后端", "qián hòu duān", "frontend and backend"], ["分离", "fēn lí", "separate"]], { blank: 1, acceptedEnglish: ["decoupled frontend and backend"] }),
]);

export const b2 = unit("b2", "web", "HTML & CSS", "页面与样式", [
  term("biaoqian", "标签", "biāo qiān", "tag", [["标", "mark"], ["签", "label"]], { acceptedEnglish: ["html tag"] }),
  term("yuansu", "元素", "yuán sù", "element", [["元", "basic unit"], ["素", "element"]], { acceptedEnglish: ["html element"] }),
  term("yangshibiao", "样式表", "yàng shì biǎo", "stylesheet", [["样式", "style"], ["表", "sheet"]], { acceptedEnglish: ["style sheet", "css"] }),
  term("xuanzeqi", "选择器", "xuǎn zé qì", "selector", [["选择", "choose"], ["器", "tool"]], { acceptedEnglish: ["css selector"] }),
  term("buju", "布局", "bù jú", "layout", [["布", "arrange"], ["局", "situation / setup"]]),
  term("hemoxing", "盒模型", "hé mó xíng", "box model", [["盒", "box"], ["模型", "model"]]),
  term("tanxingbuju", "弹性布局", "tán xìng bù jú", "flexbox", [["弹性", "elastic"], ["布局", "layout"]], {
    acceptedEnglish: ["flex layout", "flexible box", "flex"],
    note: "Devs usually just say flex.",
  }),
  term("wanggebuju", "网格布局", "wǎng gé bù jú", "grid layout", [["网格", "grid"], ["布局", "layout"]], { acceptedEnglish: ["css grid", "grid"] }),
  term("xiangyingshisheji", "响应式设计", "xiǎng yìng shì shè jì", "responsive design", [["响应", "respond"], ["式", "style"], ["设计", "design"]]),
], [
  phrase("tianjiayangshi", "add styles", [["添加", "tiān jiā", "add"], ["样式", "yàng shì", "style"]], { acceptedEnglish: ["add css", "add a style"] }),
  phrase("rangyuansujuzhong", "center an element", [["让", "ràng", "make"], "yuansu", ["居中", "jū zhōng", "be centered"]], { blank: 2, note: "The eternal question: 怎么让div居中？" }),
  phrase("shezhishuxing", "set an attribute", [["设置", "shè zhì", "set"], ["属性", "shǔ xìng", "attribute"]], { note: "属性 is taught properly in 面向对象 (OOP)." }),
  phrase("bihebiaoqian", "close a tag", [["闭合", "bì hé", "close up"], "biaoqian"]),
  phrase("shipeiyidongduan", "adapt for mobile", [["适配", "shì pèi", "adapt to"], ["移动端", "yí dòng duān", "mobile (\"mobile end\")"]], { acceptedEnglish: ["make it mobile friendly", "mobile adaptation"] }),
  phrase("gaibuju", "change the layout", [["改", "gǎi", "change"], "buju"], { acceptedEnglish: ["modify the layout"] }),
]);

export const b3 = unit("b3", "web", "JavaScript", "JavaScript", [
  term("jiaoben", "脚本", "jiǎo běn", "script", [["脚本", "screenplay"]], { note: "Same word as a film script." }),
  term("shijian", "事件", "shì jiàn", "event", [["事", "matter"], ["件", "item"]], { note: "Don't mix up with 时间 shí jiān (time)." }),
  term("shijianjiantingqi", "事件监听器", "shì jiàn jiān tīng qì", "event listener", [["事件", "event"], ["监听", "listen in"], ["器", "device"]], {
    acceptedEnglish: ["listener", "event handler"],
  }),
  term("shijianmaopao", "事件冒泡", "shì jiàn mào pào", "event bubbling", [["事件", "event"], ["冒泡", "bubble up"]], { acceptedEnglish: ["bubbling"] }),
  term("huidiaohanshu", "回调函数", "huí diào hán shù", "callback function", [["回", "back"], ["调", "call"], ["函数", "function"]], { acceptedEnglish: ["callback"] }),
  term("bibao", "闭包", "bì bāo", "closure", [["闭", "close"], ["包", "wrap"]]),
  term("yuanxinglian", "原型链", "yuán xíng liàn", "prototype chain", [["原型", "prototype"], ["链", "chain"]]),
  term("bianliangtisheng", "变量提升", "biàn liàng tí shēng", "hoisting", [["变量", "variable"], ["提升", "lift up"]], { acceptedEnglish: ["variable hoisting"] }),
  term("mokuai", "模块", "mó kuài", "module", [["模", "mold"], ["块", "block"]]),
], [
  phrase("bangdingshijian", "bind an event", [["绑定", "bǎng dìng", "bind"], "shijian"], { acceptedEnglish: ["attach an event listener", "bind an event handler"] }),
  phrase("chufashijian", "trigger an event", [["触发", "chù fā", "trigger"], "shijian"], { acceptedEnglish: ["fire an event", "dispatch an event"] }),
  phrase("zuzhimaopao", "stop propagation", [["阻止", "zǔ zhǐ", "prevent"], ["冒泡", "mào pào", "bubbling"]], { acceptedEnglish: ["stop event bubbling"] }),
  phrase("daorumokuai", "import a module", [["导入", "dǎo rù", "import"], "mokuai"]),
  phrase("daochuhanshu", "export a function", [["导出", "dǎo chū", "export"], "hanshu"]),
  phrase("zhixingjiaoben", "run a script", [["执行", "zhí xíng", "execute"], "jiaoben"], { acceptedEnglish: ["execute a script"] }),
]);

export const b4 = unit("b4", "web", "Frontend frameworks", "前端框架", [
  term("kuangjia", "框架", "kuàng jià", "framework", [["框", "frame"], ["架", "rack / structure"]]),
  term("ku", "库", "kù", "library", [["库", "storehouse"]], { acceptedEnglish: ["lib"], note: "Also 第三方库 = third-party library." }),
  term("zujian", "组件", "zǔ jiàn", "component", [["组", "assemble"], ["件", "part"]]),
  term("zhuangtai", "状态", "zhuàng tài", "state", [["状", "condition"], ["态", "state"]], { acceptedEnglish: ["status"] }),
  term("xuanran", "渲染", "xuàn rǎn", "rendering", [["渲", "wash (ink painting)"], ["染", "dye"]], { acceptedEnglish: ["render"] }),
  term("xunidom", "虚拟DOM", "xū nǐ DOM", "virtual DOM", [["虚拟", "virtual"], ["DOM", "DOM"]], { acceptedEnglish: ["vdom"] }),
  term("luyou", "路由", "lù yóu", "routing", [["路", "road"], ["由", "via"]], { acceptedEnglish: ["route", "router"] }),
  term("gouzi", "钩子", "gōu zi", "hook", [["钩", "hook"], ["子", "(noun suffix)"]], { acceptedEnglish: ["hooks"], note: "In React talk most people just say Hook." }),
  term("danyeyingyong", "单页应用", "dān yè yìng yòng", "single-page application", [["单", "single"], ["页", "page"], ["应用", "application"]], {
    acceptedEnglish: ["spa", "single page app", "single page application"],
  }),
], [
  phrase("yinruku", "import a library", [["引入", "yǐn rù", "bring in"], "ku"], { acceptedEnglish: ["add a library", "include a library"], note: "Also 导入库; a third-party library is 第三方库." }),
  phrase("fengzhuangzujian", "wrap it in a component", ["fengzhuang", "zujian"], { acceptedEnglish: ["extract a component", "encapsulate a component"], note: "把这段代码封装成组件 = extract this into a component." }),
  phrase("gengxinzhuangtai", "update state", [["更新", "gēng xīn", "update"], "zhuangtai"], { acceptedEnglish: ["update the state", "set state"] }),
  phrase("xuanranyemian", "render the page", ["xuanran", ["页面", "yè miàn", "page"]]),
  phrase("chongxinxuanran", "re-render", [["重新", "chóng xīn", "again"], "xuanran"], { acceptedEnglish: ["rerender"] }),
  phrase("luyoutiaozhuan", "route navigation", ["luyou", ["跳转", "tiào zhuǎn", "jump to"]], { blank: 1, acceptedEnglish: ["navigate to a route", "redirect"] }),
]);

export const b5 = unit("b5", "web", "Backend & APIs", "后端与接口", [
  term("jiekou-api", "接口", "jiē kǒu", "API", [["接", "connect"], ["口", "opening"]], {
    acceptedEnglish: ["api endpoint", "endpoint"],
    note: "Also means interface (OOP). In conversation, 调接口 = call an API.",
  }),
  term("qingqiu", "请求", "qǐng qiú", "request", [["请", "ask"], ["求", "seek"]]),
  term("xiangying", "响应", "xiǎng yìng", "response", [["响", "sound"], ["应", "answer"]]),
  term("zhuangtaima", "状态码", "zhuàng tài mǎ", "status code", [["状态", "status"], ["码", "code"]]),
  term("zhongjianjian", "中间件", "zhōng jiān jiàn", "middleware", [["中间", "middle"], ["件", "piece"]]),
  term("shenfenyanzheng", "身份验证", "shēn fèn yàn zhèng", "authentication", [["身份", "identity"], ["验证", "verify"]], {
    acceptedEnglish: ["auth", "authn"],
    note: "Also 认证.",
  }),
  term("shouquan", "授权", "shòu quán", "authorization", [["授", "grant"], ["权", "rights"]], { acceptedEnglish: ["authz", "authorize"] }),
  term("huihua", "会话", "huì huà", "session", [["会", "meet"], ["话", "talk"]], { note: "Also means a conversation." }),
  term("lingpai", "令牌", "lìng pái", "token", [["令", "command"], ["牌", "tablet"]], { acceptedEnglish: ["access token"], note: "Often just said as token." }),
  term("kuayu", "跨域", "kuà yù", "cross-origin (CORS)", [["跨", "step across"], ["域", "domain"]], {
    acceptedEnglish: ["cors", "cross origin", "cross-origin", "cross domain", "cross-domain"],
  }),
], [
  phrase("diaojiekou", "call an API", [["调", "diào", "call"], "jiekou-api"], { note: "Also 调用接口. 调 is diào here." }),
  phrase("faqingqiu", "send a request", [["发", "fā", "send"], "qingqiu"], { acceptedEnglish: ["make a request"] }),
  phrase("xiejiekou", "write an API endpoint", [["写", "xiě", "write"], "jiekou-api"], { acceptedEnglish: ["build an api", "write an api"] }),
  phrase("fanhuishuju", "return data", [["返回", "fǎn huí", "return"], ["数据", "shù jù", "data"]]),
  phrase("jiaoyanlingpai", "validate a token", [["校验", "jiào yàn", "check / validate"], "lingpai"], { acceptedEnglish: ["verify a token"] }),
  phrase("huihuaguoqi", "session expired", ["huihua", ["过期", "guò qī", "expire"]], { blank: 1, acceptedEnglish: ["the session has expired"] }),
  phrase("jiejuekuayu", "fix CORS issues", [["解决", "jiě jué", "solve"], "kuayu"], { acceptedEnglish: ["solve cors", "fix cors"] }),
]);

export const b6 = unit("b6", "web", "Version control & teamwork", "协作流程", [
  term("banbenkongzhi", "版本控制", "bǎn běn kòng zhì", "version control", [["版本", "version"], ["控制", "control"]]),
  term("cangku", "仓库", "cāng kù", "repository", [["仓", "warehouse"], ["库", "storehouse"]], { acceptedEnglish: ["repo"] }),
  term("fenzhi", "分支", "fēn zhī", "branch", [["分", "divide"], ["支", "branch"]]),
  term("hebing", "合并", "hé bìng", "merge", [["合", "combine"], ["并", "join"]]),
  term("tijiao", "提交", "tí jiāo", "commit", [["提", "lift"], ["交", "hand over"]], { acceptedEnglish: ["submit"], note: "Also means submitting a form." }),
  term("chongtu", "冲突", "chōng tū", "conflict", [["冲", "clash"], ["突", "burst"]], { acceptedEnglish: ["merge conflict"] }),
  term("daimashencha", "代码审查", "dài mǎ shěn chá", "code review", [["代码", "code"], ["审查", "inspect"]], {
    note: "Also 代码评审. Pull requests are usually just called PR.",
  }),
  term("xuqiu", "需求", "xū qiú", "requirement", [["需", "need"], ["求", "seek"]], {
    acceptedEnglish: ["requirements", "feature request"],
    note: "产品经理提需求: the PM files a requirement.",
  }),
  term("diedai", "迭代", "dié dài", "iteration", [["迭", "alternate / repeat"], ["代", "generation"]], { acceptedEnglish: ["sprint", "iterate"] }),
], [
  phrase("tijiaodaima", "commit code", ["tijiao", "daima"], { acceptedEnglish: ["commit the code"] }),
  phrase("tuisongdaima", "push code", [["推送", "tuī sòng", "push"], "daima"], { acceptedEnglish: ["push the code"] }),
  phrase("ladaima", "pull code", [["拉", "lā", "pull"], "daima"], { acceptedEnglish: ["pull the code"], note: "Formal: 拉取代码." }),
  phrase("qiefenzhi", "switch branches", [["切", "qiē", "switch (\"cut\")"], "fenzhi"], { acceptedEnglish: ["checkout a branch", "switch branch"], note: "Formal: 切换分支." }),
  phrase("tipr", "open a pull request", [["提", "tí", "raise / submit"], ["PR", "PR", "pull request"]], { acceptedEnglish: ["open a pr", "create a pull request"], note: "Everyone just says PR (or MR on GitLab)." }),
  phrase("hebingpr", "merge a pull request", ["hebing", ["PR", "PR", "pull request"]], { acceptedEnglish: ["merge a pr", "merge the pr"], note: "Casually: 合一下PR." }),
  phrase("tiissue", "open an issue", [["提", "tí", "raise / submit"], ["issue", "issue", "issue"]], { acceptedEnglish: ["file an issue", "create an issue"] }),
  phrase("guanbiissue", "close an issue", [["关闭", "guān bì", "close"], ["issue", "issue", "issue"]], { acceptedEnglish: ["close the issue"], note: "Casually: 关掉这个issue." }),
  phrase("jiejuechongtu", "resolve conflicts", [["解决", "jiě jué", "solve"], "chongtu"], { acceptedEnglish: ["resolve merge conflicts", "fix conflicts"] }),
  phrase("tixuqiu", "make a feature request", [["提", "tí", "raise"], "xuqiu"], { acceptedEnglish: ["file a requirement"], note: "产品又提需求了 = product filed another request." }),
  phrase("gaixuqiu", "change the requirements", [["改", "gǎi", "change"], "xuqiu"], { acceptedEnglish: ["change requirements"] }),
]);

export const b7 = unit("b7", "web", "Testing & debugging", "测试与调试", [
  term("ceshi", "测试", "cè shì", "testing", [["测", "measure"], ["试", "try"]], { acceptedEnglish: ["test"] }),
  term("danyuanceshi", "单元测试", "dān yuán cè shì", "unit test", [["单元", "unit"], ["测试", "test"]], { acceptedEnglish: ["unit testing", "unit tests"] }),
  term("jichengceshi", "集成测试", "jí chéng cè shì", "integration test", [["集成", "integrate"], ["测试", "test"]], { acceptedEnglish: ["integration testing"] }),
  term("tiaoshi", "调试", "tiáo shì", "debugging", [["调", "adjust"], ["试", "try"]], { acceptedEnglish: ["debug"], note: "调 is tiáo here, unlike diào in 调用 (call)." }),
  term("duandian", "断点", "duàn diǎn", "breakpoint", [["断", "break"], ["点", "point"]]),
  term("rizhi", "日志", "rì zhì", "log", [["日", "day"], ["志", "record"]], { acceptedEnglish: ["logs", "logging"] }),
  term("baocuo", "报错", "bào cuò", "throw an error", [["报", "report"], ["错", "error"]], { acceptedEnglish: ["error", "throws an error", "error out"] }),
  term("yichang", "异常", "yì cháng", "exception", [["异", "unusual"], ["常", "normal"]]),
  term("xiufu", "修复", "xiū fù", "fix", [["修", "repair"], ["复", "restore"]], { acceptedEnglish: ["bug fix", "repair", "patch"] }),
], [
  phrase("xiubug", "fix a bug", [["修", "xiū", "fix"], ["bug", "bug", "bug"]], { acceptedEnglish: ["fix the bug"], note: "Also 改bug. Formally 修复缺陷, but nobody says that." }),
  phrase("fuxianbug", "reproduce a bug", [["复现", "fù xiàn", "reproduce"], ["bug", "bug", "bug"]], { acceptedEnglish: ["repro a bug"] }),
  phrase("paoceshi", "run tests", [["跑", "pǎo", "run"], "ceshi"], { acceptedEnglish: ["run the tests"] }),
  phrase("ceshitongguo", "tests pass", ["ceshi", ["通过", "tōng guò", "pass"]], { blank: 1, acceptedEnglish: ["the tests passed"] }),
  phrase("xiedanyuanceshi", "write unit tests", [["写", "xiě", "write"], "danyuanceshi"]),
  phrase("daduandian", "set a breakpoint", [["打", "dǎ", "hit / set"], "duandian"], { acceptedEnglish: ["add a breakpoint"] }),
  phrase("charizhi", "check the logs", [["查", "chá", "check"], "rizhi"], { acceptedEnglish: ["look at the logs"] }),
  phrase("paochuyichang", "throw an exception", [["抛出", "pāo chū", "throw"], "yichang"]),
  phrase("buhuoyichang", "catch an exception", [["捕获", "bǔ huò", "catch"], "yichang"]),
]);

export const b8 = unit("b8", "web", "Deployment & ops", "部署与运维", [
  term("bushu", "部署", "bù shǔ", "deployment", [["部", "arrange"], ["署", "assign"]], { acceptedEnglish: ["deploy"] }),
  term("shangxian", "上线", "shàng xiàn", "go live", [["上", "up / onto"], ["线", "line"]], { acceptedEnglish: ["launch", "release", "ship"] }),
  term("shengchanhuanjing", "生产环境", "shēng chǎn huán jìng", "production environment", [["生产", "production"], ["环境", "environment"]], {
    acceptedEnglish: ["production", "prod"],
  }),
  term("ceshihuanjing", "测试环境", "cè shì huán jìng", "test environment", [["测试", "test"], ["环境", "environment"]], {
    acceptedEnglish: ["staging", "testing environment", "staging environment"],
  }),
  term("yunjisuan", "云计算", "yún jì suàn", "cloud computing", [["云", "cloud"], ["计算", "compute"]]),
  term("rongqi", "容器", "róng qì", "container", [["容", "hold"], ["器", "vessel"]]),
  term("fuzaijunheng", "负载均衡", "fù zài jūn héng", "load balancing", [["负载", "load"], ["均衡", "balance"]], { acceptedEnglish: ["load balancer"] }),
  term("huigun", "回滚", "huí gǔn", "rollback", [["回", "back"], ["滚", "roll"]], { acceptedEnglish: ["roll back"] }),
  term("jiankong", "监控", "jiān kòng", "monitoring", [["监", "watch over"], ["控", "control"]], { acceptedEnglish: ["monitor"] }),
], [
  phrase("bushushangxian", "deploy to production", ["bushu", "shangxian"], { blank: 1, acceptedEnglish: ["ship to production", "deploy and go live"] }),
  phrase("faban", "cut a release", [["发", "fā", "issue"], ["版", "bǎn", "version"]], { acceptedEnglish: ["release a version", "ship a release"] }),
  phrase("huigunbanben", "roll back a version", ["huigun", ["版本", "bǎn běn", "version"]], { acceptedEnglish: ["roll back the release"] }),
  phrase("goujianjingxiang", "build an image", [["构建", "gòu jiàn", "build"], ["镜像", "jìng xiàng", "image (\"mirror image\")"]], { acceptedEnglish: ["build a docker image"] }),
  phrase("kuorong", "scale up", [["扩", "kuò", "expand"], ["容", "róng", "capacity"]], { acceptedEnglish: ["add capacity", "scale out"] }),
  phrase("fuwuqidangji", "the server is down", ["fuwuqi", ["宕机", "dàng jī", "go down / crash"]], { blank: 1, acceptedEnglish: ["the server crashed", "server down"] }),
  phrase("peizhihuanjing", "set up the environment", [["配置", "pèi zhì", "configure"], ["环境", "huán jìng", "environment"]], { acceptedEnglish: ["configure the environment"] }),
]);

export const b9 = unit("b9", "web", "Performance & security", "性能与安全", [
  term("xingneng", "性能", "xìng néng", "performance", [["性", "nature"], ["能", "ability"]], { acceptedEnglish: ["perf"] }),
  term("youhua", "优化", "yōu huà", "optimization", [["优", "excellent"], ["化", "-ize"]], { acceptedEnglish: ["optimize"] }),
  term("huancun", "缓存", "huǎn cún", "cache", [["缓", "buffer / slow"], ["存", "store"]], { acceptedEnglish: ["caching"] }),
  term("lanjiazai", "懒加载", "lǎn jiā zài", "lazy loading", [["懒", "lazy"], ["加载", "load"]], { acceptedEnglish: ["lazy load"] }),
  term("fangdou", "防抖", "fáng dǒu", "debounce", [["防", "prevent"], ["抖", "shake"]], { acceptedEnglish: ["debouncing"] }),
  term("jieliu", "节流", "jié liú", "throttle", [["节", "restrict"], ["流", "flow"]], { acceptedEnglish: ["throttling"] }),
  term("jiami", "加密", "jiā mì", "encryption", [["加", "add"], ["密", "secret"]], { acceptedEnglish: ["encrypt"] }),
  term("anquanloudong", "安全漏洞", "ān quán lòu dòng", "security vulnerability", [["安全", "security"], ["漏洞", "leak / hole"]], {
    acceptedEnglish: ["vulnerability", "security hole"],
    note: "漏洞 alone is also used loosely for bugs.",
  }),
  term("sqlzhuru", "SQL注入", "SQL zhù rù", "SQL injection", [["SQL", "SQL"], ["注入", "inject"]]),
  term("kuazhanjiaobengongji", "跨站脚本攻击", "kuà zhàn jiǎo běn gōng jī", "cross-site scripting", [["跨站", "cross-site"], ["脚本", "script"], ["攻击", "attack"]], {
    acceptedEnglish: ["xss", "cross site scripting"],
  }),
], [
  phrase("qinghuancun", "clear the cache", [["清", "qīng", "clear"], "huancun"], { acceptedEnglish: ["clear cache"] }),
  phrase("mingzhonghuancun", "cache hit", [["命中", "mìng zhōng", "hit the target"], "huancun"], { acceptedEnglish: ["hit the cache"] }),
  phrase("youhuaxingneng", "optimize performance", ["youhua", "xingneng"], { acceptedEnglish: ["improve performance"] }),
  phrase("jiamishuju", "encrypt data", ["jiami", ["数据", "shù jù", "data"]], { acceptedEnglish: ["encrypt the data"] }),
  phrase("xiufuloudong", "patch a vulnerability", ["xiufu", ["漏洞", "lòu dòng", "hole / vulnerability"]], { acceptedEnglish: ["fix a vulnerability"] }),
  phrase("fangzhisqlzhuru", "prevent SQL injection", [["防止", "fáng zhǐ", "prevent"], "sqlzhuru"]),
]);

export const webUnits = [b1, b2, b3, b4, b5, b6, b7, b8, b9];
