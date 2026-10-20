import { phrase, term, unit } from "../types";

export const a1 = unit("a1", "cs", "Computer basics", "计算机基础", [
  term("jisuanji", "计算机", "jì suàn jī", "computer", [["计算", "calculate"], ["机", "machine"]], {
    note: "Everyday speech says 电脑; 计算机 is the formal / academic word (计算机科学 = computer science).",
  }),
  term("yingjian", "硬件", "yìng jiàn", "hardware", [["硬", "hard"], ["件", "item"]]),
  term("ruanjian", "软件", "ruǎn jiàn", "software", [["软", "soft"], ["件", "item"]], { note: "Taiwan: 軟體." }),
  term("caozuoxitong", "操作系统", "cāo zuò xì tǒng", "operating system", [["操作", "operate"], ["系统", "system"]], {
    acceptedEnglish: ["os"],
  }),
  term("chuliqi", "处理器", "chǔ lǐ qì", "processor", [["处理", "handle / process"], ["器", "device"]], {
    acceptedEnglish: ["cpu"],
    note: "The CPU is 中央处理器; in conversation people just say CPU.",
  }),
  term("neicun", "内存", "nèi cún", "memory (RAM)", [["内", "inside"], ["存", "store"]], {
    acceptedEnglish: ["memory", "ram"],
  }),
  term("yingpan", "硬盘", "yìng pán", "hard drive", [["硬", "hard"], ["盘", "disk / plate"]], {
    acceptedEnglish: ["hard disk", "disk"],
  }),
  term("wenjian", "文件", "wén jiàn", "file", [["文", "writing"], ["件", "item"]]),
  term("wenjianjia", "文件夹", "wén jiàn jiā", "folder", [["文件", "file"], ["夹", "clip / holder"]], {
    acceptedEnglish: ["directory"],
  }),
  term("wangluo", "网络", "wǎng luò", "network", [["网", "net"], ["络", "mesh of threads"]]),
], [
  phrase("anzhuangruanjian", "install software", [["安装", "ān zhuāng", "install"], "ruanjian"]),
  phrase("xiezairuanjian", "uninstall software", [["卸载", "xiè zài", "uninstall"], "ruanjian"]),
  phrase("chongqidiannao", "restart the computer", [["重启", "chóng qǐ", "restart"], ["电脑", "diàn nǎo", "computer"]], { acceptedEnglish: ["reboot the computer"] }),
  phrase("baocunwenjian", "save a file", [["保存", "bǎo cún", "save"], "wenjian"], { acceptedEnglish: ["save the file"] }),
  phrase("xinjianwenjianjia", "create a new folder", [["新建", "xīn jiàn", "create new"], "wenjianjia"], { acceptedEnglish: ["new folder", "make a folder"] }),
  phrase("lianjiewangluo", "connect to the network", [["连接", "lián jiē", "connect"], "wangluo"], { note: "Casually: 连网 / 联网." }),
  phrase("neicunbuzu", "out of memory", ["neicun", ["不足", "bù zú", "insufficient"]], { blank: 1, acceptedEnglish: ["not enough memory"] }),
]);

export const a2 = unit("a2", "cs", "Programming basics", "编程入门", [
  term("biancheng", "编程", "biān chéng", "programming", [["编", "weave / compile"], ["程", "program"]], {
    acceptedEnglish: ["coding"],
  }),
  term("chengxu", "程序", "chéng xù", "program", [["程", "procedure"], ["序", "sequence"]], {
    note: "程序员 = programmer. Taiwan: 程式.",
  }),
  term("daima", "代码", "dài mǎ", "code", [["代", "stand in for"], ["码", "code / number"]], {
    acceptedEnglish: ["source code"],
  }),
  term("bianchengyuyan", "编程语言", "biān chéng yǔ yán", "programming language", [["编程", "programming"], ["语言", "language"]]),
  term("bianliang", "变量", "biàn liàng", "variable", [["变", "change"], ["量", "quantity"]]),
  term("changliang", "常量", "cháng liàng", "constant", [["常", "constant / usual"], ["量", "quantity"]]),
  term("shujuleixing", "数据类型", "shù jù lèi xíng", "data type", [["数据", "data"], ["类型", "type / kind"]], {
    acceptedEnglish: ["type"],
  }),
  term("zhengshu", "整数", "zhěng shù", "integer", [["整", "whole"], ["数", "number"]], { acceptedEnglish: ["int"] }),
  term("fudianshu", "浮点数", "fú diǎn shù", "floating-point number", [["浮", "float"], ["点", "point"], ["数", "number"]], {
    acceptedEnglish: ["float", "floating point number", "floating point"],
  }),
  term("zifuchuan", "字符串", "zì fú chuàn", "string", [["字符", "character"], ["串", "a string of (一串)"]]),
  term("buerzhi", "布尔值", "bù ěr zhí", "boolean", [["布尔", "Boole (sound loan)"], ["值", "value"]], {
    acceptedEnglish: ["boolean value", "bool"],
  }),
], [
  phrase("xiedaima", "write code", [["写", "xiě", "write"], "daima"]),
  phrase("yunxingchengxu", "run a program", [["运行", "yùn xíng", "run"], "chengxu"], { acceptedEnglish: ["run the program"] }),
  phrase("shengmingbianliang", "declare a variable", [["声明", "shēng míng", "declare"], "bianliang"]),
  phrase("geibianliangfuzhi", "assign a value to a variable", [["给", "gěi", "to"], "bianliang", ["赋值", "fù zhí", "assign a value"]], { blank: 2, acceptedEnglish: ["assign a variable"] }),
  phrase("dingyichangliang", "define a constant", [["定义", "dìng yì", "define"], "changliang"]),
  phrase("zhuanhuanshujuleixing", "convert the data type", [["转换", "zhuǎn huàn", "convert"], "shujuleixing"], { acceptedEnglish: ["type conversion", "cast the type"], note: "As a noun: 类型转换 (type conversion)." }),
  phrase("pinjiezifuchuan", "concatenate strings", [["拼接", "pīn jiē", "piece together"], "zifuchuan"], { acceptedEnglish: ["string concatenation"] }),
]);

export const a3 = unit("a3", "cs", "Control flow & functions", "控制流与函数", [
  term("tiaojianyuju", "条件语句", "tiáo jiàn yǔ jù", "conditional statement", [["条件", "condition"], ["语句", "sentence / statement"]], {
    acceptedEnglish: ["conditional", "if statement"],
  }),
  term("xunhuan", "循环", "xún huán", "loop", [["循", "follow"], ["环", "ring"]]),
  term("hanshu", "函数", "hán shù", "function", [["函", "envelope / contain"], ["数", "number"]], {
    note: "Same word as a function in math class.",
  }),
  term("canshu", "参数", "cān shù", "parameter", [["参", "take part"], ["数", "number"]], {
    acceptedEnglish: ["argument", "param", "arg"],
  }),
  term("fanhuizhi", "返回值", "fǎn huí zhí", "return value", [["返回", "go back"], ["值", "value"]]),
  term("diaoyong", "调用", "diào yòng", "call (a function)", [["调", "summon / dispatch"], ["用", "use"]], {
    acceptedEnglish: ["call", "invoke", "function call"],
    note: "调 is diào here, unlike tiáo in 调试 (debugging).",
  }),
  term("digui", "递归", "dì guī", "recursion", [["递", "pass along"], ["归", "return"]], { acceptedEnglish: ["recursive"] }),
  term("zuoyongyu", "作用域", "zuò yòng yù", "scope", [["作用", "effect / role"], ["域", "region"]]),
], [
  phrase("diaoyonghanshu", "call a function", ["diaoyong", "hanshu"], { acceptedEnglish: ["invoke a function"] }),
  phrase("dingyihanshu", "define a function", [["定义", "dìng yì", "define"], "hanshu"]),
  phrase("chuanrucanshu", "pass in an argument", [["传入", "chuán rù", "pass in"], "canshu"], { acceptedEnglish: ["pass a parameter", "pass an argument"], note: "Casually just 传参." }),
  phrase("fanhuijieguo", "return a result", [["返回", "fǎn huí", "return"], ["结果", "jié guǒ", "result"]]),
  phrase("tiaochuxunhuan", "break out of a loop", [["跳出", "tiào chū", "jump out"], "xunhuan"], { acceptedEnglish: ["break the loop", "exit the loop"] }),
  phrase("xianrusixunhuan", "get stuck in an infinite loop", [["陷入", "xiàn rù", "fall into"], ["死循环", "sǐ xún huán", "infinite (\"dead\") loop"]], { acceptedEnglish: ["infinite loop"] }),
  phrase("diguidiaoyong", "recursive call", ["digui", "diaoyong"], { blank: 1 }),
]);

export const a4 = unit("a4", "cs", "Object-oriented programming", "面向对象", [
  term("duixiang", "对象", "duì xiàng", "object", [["对", "facing"], ["象", "image / figure"]], {
    note: "Yes, the same word as 找对象 (finding a partner). 面向对象 = object-oriented.",
  }),
  term("lei", "类", "lèi", "class", [["类", "kind / category"]]),
  term("shili", "实例", "shí lì", "instance", [["实", "real"], ["例", "example"]]),
  term("fangfa", "方法", "fāng fǎ", "method", [["方", "way"], ["法", "method / law"]]),
  term("shuxing", "属性", "shǔ xìng", "property", [["属", "belong to"], ["性", "nature"]], {
    acceptedEnglish: ["attribute"],
    note: "Used for both object properties and HTML attributes.",
  }),
  term("jicheng", "继承", "jì chéng", "inheritance", [["继", "continue"], ["承", "receive"]], {
    acceptedEnglish: ["inherit"],
    note: "Same word as inheriting an estate.",
  }),
  term("fengzhuang", "封装", "fēng zhuāng", "encapsulation", [["封", "seal"], ["装", "pack"]], { acceptedEnglish: ["encapsulate"] }),
  term("duotai", "多态", "duō tài", "polymorphism", [["多", "many"], ["态", "form / state"]]),
  term("jiekou", "接口", "jiē kǒu", "interface", [["接", "connect"], ["口", "opening"]], {
    note: "Also the everyday word for an API (see 后端与接口).",
  }),
], [
  phrase("chuangjianduixiang", "create an object", [["创建", "chuàng jiàn", "create"], "duixiang"]),
  phrase("shilihualei", "instantiate a class", [["实例化", "shí lì huà", "instantiate"], "lei"]),
  phrase("jichengfulei", "inherit from a parent class", ["jicheng", ["父类", "fù lèi", "parent class"]], { acceptedEnglish: ["extend a parent class", "inherit from a superclass"] }),
  phrase("chongxiefangfa", "override a method", [["重写", "chóng xiě", "rewrite / override"], "fangfa"]),
  phrase("shixianjiekou", "implement an interface", [["实现", "shí xiàn", "implement"], "jiekou"]),
  phrase("fangwenshuxing", "access a property", [["访问", "fǎng wèn", "access"], "shuxing"]),
]);

export const a5 = unit("a5", "cs", "Data structures", "数据结构", [
  term("shuzu", "数组", "shù zǔ", "array", [["数", "number"], ["组", "group"]]),
  term("lianbiao", "链表", "liàn biǎo", "linked list", [["链", "chain"], ["表", "list / table"]]),
  term("zhan", "栈", "zhàn", "stack", [["栈", "storehouse / inn (栈房)"]], { note: "堆 (duī) is the heap; 堆栈 can mean either the stack or a call stack." }),
  term("duilie", "队列", "duì liè", "queue", [["队", "line / team"], ["列", "row"]]),
  term("haxibiao", "哈希表", "hā xī biǎo", "hash table", [["哈希", "hash (sound loan)"], ["表", "table"]], {
    acceptedEnglish: ["hash map", "hashmap", "hashtable"],
    note: "Also called 散列表.",
  }),
  term("shu", "树", "shù", "tree", [["树", "tree"]]),
  term("erchashu", "二叉树", "èr chā shù", "binary tree", [["二", "two"], ["叉", "fork"], ["树", "tree"]]),
  term("tu", "图", "tú", "graph", [["图", "picture / diagram"]]),
  term("jiedian", "节点", "jié diǎn", "node", [["节", "joint / knot"], ["点", "point"]]),
  term("zhizhen", "指针", "zhǐ zhēn", "pointer", [["指", "point at"], ["针", "needle"]]),
], [
  phrase("ruzhan", "push onto the stack", [["入", "rù", "enter"], "zhan"], { acceptedEnglish: ["push"] }),
  phrase("chuzhan", "pop off the stack", [["出", "chū", "exit"], "zhan"], { acceptedEnglish: ["pop"] }),
  phrase("charujiedian", "insert a node", [["插入", "chā rù", "insert"], "jiedian"]),
  phrase("shanchujiedian", "delete a node", [["删除", "shān chú", "delete"], "jiedian"], { acceptedEnglish: ["remove a node"] }),
  phrase("fanzhuanlianbiao", "reverse a linked list", [["翻转", "fān zhuǎn", "flip"], "lianbiao"], { note: "The classic interview question." }),
  phrase("kongzhizhen", "null pointer", [["空", "kōng", "empty"], "zhizhen"], { note: "空指针异常 = NullPointerException." }),
]);

export const a6 = unit("a6", "cs", "Algorithms", "算法", [
  term("suanfa", "算法", "suàn fǎ", "algorithm", [["算", "calculate"], ["法", "method"]]),
  term("paixu", "排序", "pái xù", "sorting", [["排", "arrange"], ["序", "order"]], { acceptedEnglish: ["sort"] }),
  term("chazhao", "查找", "chá zhǎo", "search", [["查", "check"], ["找", "find"]], { acceptedEnglish: ["lookup", "find", "searching"] }),
  term("erfenchazhao", "二分查找", "èr fēn chá zhǎo", "binary search", [["二分", "split in two"], ["查找", "search"]]),
  term("bianli", "遍历", "biàn lì", "traversal", [["遍", "all over"], ["历", "go through"]], { acceptedEnglish: ["traverse", "iterate", "iteration"] }),
  term("shijianfuzadu", "时间复杂度", "shí jiān fù zá dù", "time complexity", [["时间", "time"], ["复杂", "complicated"], ["度", "degree"]]),
  term("kongjianfuzadu", "空间复杂度", "kōng jiān fù zá dù", "space complexity", [["空间", "space"], ["复杂", "complicated"], ["度", "degree"]]),
  term("dongtaiguihua", "动态规划", "dòng tài guī huà", "dynamic programming", [["动态", "dynamic"], ["规划", "plan"]], { acceptedEnglish: ["dp"] }),
  term("tanxinsuanfa", "贪心算法", "tān xīn suàn fǎ", "greedy algorithm", [["贪心", "greedy"], ["算法", "algorithm"]]),
], [
  phrase("bianlishuzu", "iterate over an array", ["bianli", "shuzu"], { acceptedEnglish: ["traverse an array", "loop over an array"] }),
  phrase("duishuzupaixu", "sort an array", [["对", "duì", "(marks the object)"], "shuzu", "paixu"], { blank: 2 }),
  phrase("shejisuanfa", "design an algorithm", [["设计", "shè jì", "design"], "suanfa"]),
  phrase("jiangdishijianfuzadu", "reduce the time complexity", [["降低", "jiàng dī", "lower"], "shijianfuzadu"], { acceptedEnglish: ["lower the time complexity"] }),
  phrase("shuati", "grind LeetCode problems", [["刷", "shuā", "brush / grind through"], ["题", "tí", "problems"]], { acceptedEnglish: ["grind leetcode", "practice problems"], note: "刷题 = grinding practice problems, as in interview prep." }),
]);

export const a7 = unit("a7", "cs", "Systems & concurrency", "系统与并发", [
  term("jincheng", "进程", "jìn chéng", "process", [["进", "advance"], ["程", "course / journey"]]),
  term("xiancheng", "线程", "xiàn chéng", "thread", [["线", "thread / line"], ["程", "course"]]),
  term("bingfa", "并发", "bìng fā", "concurrency", [["并", "side by side"], ["发", "send off"]], { acceptedEnglish: ["concurrent"] }),
  term("bingxing", "并行", "bìng xíng", "parallelism", [["并", "side by side"], ["行", "go"]], { acceptedEnglish: ["parallel"] }),
  term("tongbu", "同步", "tóng bù", "synchronous", [["同", "same"], ["步", "step"]], { acceptedEnglish: ["sync", "synchronization", "synchronize"] }),
  term("yibu", "异步", "yì bù", "asynchronous", [["异", "different"], ["步", "step"]], { acceptedEnglish: ["async"] }),
  term("suo", "锁", "suǒ", "lock", [["锁", "lock"]], { acceptedEnglish: ["mutex"] }),
  term("sisuo", "死锁", "sǐ suǒ", "deadlock", [["死", "dead"], ["锁", "lock"]]),
  term("neicunxielou", "内存泄漏", "nèi cún xiè lòu", "memory leak", [["内存", "memory"], ["泄漏", "leak"]]),
  term("bianyiqi", "编译器", "biān yì qì", "compiler", [["编", "compile"], ["译", "translate"], ["器", "tool"]], {
    note: "编译 = compile.",
  }),
  term("jieshiqi", "解释器", "jiě shì qì", "interpreter", [["解释", "explain"], ["器", "tool"]]),
], [
  phrase("chuangjianxiancheng", "create a thread", [["创建", "chuàng jiàn", "create"], "xiancheng"], { acceptedEnglish: ["spawn a thread"] }),
  phrase("shadiaojincheng", "kill a process", [["杀掉", "shā diào", "kill off"], "jincheng"], { note: "Also 杀进程." }),
  phrase("jiasuo", "acquire a lock", [["加", "jiā", "add"], "suo"], { acceptedEnglish: ["lock", "take a lock"] }),
  phrase("shifangsuo", "release a lock", [["释放", "shì fàng", "release"], "suo"], { acceptedEnglish: ["unlock"] }),
  phrase("fashengsisuo", "a deadlock occurs", [["发生", "fā shēng", "occur"], "sisuo"], { acceptedEnglish: ["deadlock happens"] }),
  phrase("bianyidaima", "compile code", [["编译", "biān yì", "compile"], "daima"], { acceptedEnglish: ["compile the code"] }),
  phrase("yibuzhixing", "run asynchronously", ["yibu", ["执行", "zhí xíng", "execute"]], { blank: 1, acceptedEnglish: ["execute asynchronously"] }),
]);

export const a8 = unit("a8", "cs", "Networking", "计算机网络", [
  term("hulianwang", "互联网", "hù lián wǎng", "internet", [["互", "mutual"], ["联", "link"], ["网", "net"]], { acceptedEnglish: ["the internet"] }),
  term("xieyi", "协议", "xié yì", "protocol", [["协", "cooperate"], ["议", "discuss"]], { note: "Also means an agreement or contract." }),
  term("ipdizhi", "IP地址", "IP dì zhǐ", "IP address", [["IP", "IP"], ["地址", "address"]]),
  term("yuming", "域名", "yù míng", "domain name", [["域", "domain"], ["名", "name"]], { acceptedEnglish: ["domain"] }),
  term("duankou", "端口", "duān kǒu", "port", [["端", "end"], ["口", "opening"]]),
  term("daikuan", "带宽", "dài kuān", "bandwidth", [["带", "band"], ["宽", "width"]]),
  term("yanchi", "延迟", "yán chí", "latency", [["延", "delay"], ["迟", "late"]], { acceptedEnglish: ["delay", "lag"] }),
  term("shujubao", "数据包", "shù jù bāo", "packet", [["数据", "data"], ["包", "package"]], { acceptedEnglish: ["data packet"] }),
  term("fanghuoqiang", "防火墙", "fáng huǒ qiáng", "firewall", [["防", "guard against"], ["火", "fire"], ["墙", "wall"]]),
  term("luyouqi", "路由器", "lù yóu qì", "router", [["路", "road"], ["由", "via"], ["器", "device"]]),
], [
  phrase("jiexiyuming", "resolve a domain name", [["解析", "jiě xī", "parse / resolve"], "yuming"], { note: "DNS 解析 = DNS resolution." }),
  phrase("kaifangduankou", "open a port", [["开放", "kāi fàng", "open up"], "duankou"]),
  phrase("duankoubeizhanyong", "the port is already in use", ["duankou", ["被占用", "bèi zhàn yòng", "be occupied"]], { blank: 1, acceptedEnglish: ["port in use", "port already in use"] }),
  phrase("wangluoyanchigao", "high network latency", ["wangluo", "yanchi", ["高", "gāo", "high"]], { blank: 2, acceptedEnglish: ["the network is laggy"] }),
  phrase("peizhifanghuoqiang", "configure the firewall", [["配置", "pèi zhì", "configure"], "fanghuoqiang"]),
  phrase("fasongshujubao", "send a packet", [["发送", "fā sòng", "send"], "shujubao"], { acceptedEnglish: ["send packets"] }),
]);

export const a9 = unit("a9", "cs", "Databases", "数据库", [
  term("shujuku", "数据库", "shù jù kù", "database", [["数据", "data"], ["库", "storehouse"]], { acceptedEnglish: ["db"], note: "Taiwan: 資料庫." }),
  term("guanxixingshujuku", "关系型数据库", "guān xì xíng shù jù kù", "relational database", [["关系", "relation"], ["型", "type"], ["数据库", "database"]]),
  term("biao", "表", "biǎo", "table", [["表", "table / form"]]),
  term("hang", "行", "háng", "row", [["行", "row / line"]], { note: "Read háng, as in this app's name 行话 (jargon)." }),
  term("ziduan", "字段", "zì duàn", "field", [["字", "character"], ["段", "section"]], { acceptedEnglish: ["column"] }),
  term("zhujian", "主键", "zhǔ jiàn", "primary key", [["主", "main"], ["键", "key"]]),
  term("waijian", "外键", "wài jiàn", "foreign key", [["外", "outside"], ["键", "key"]]),
  term("chaxun", "查询", "chá xún", "query", [["查", "check"], ["询", "inquire"]]),
  term("suoyin", "索引", "suǒ yǐn", "index", [["索", "search"], ["引", "lead"]]),
  term("shiwu", "事务", "shì wù", "transaction", [["事", "matter"], ["务", "affair"]], { note: "Not 事物 (things), which sounds the same." }),
], [
  phrase("lianjieshujuku", "connect to the database", [["连接", "lián jiē", "connect"], "shujuku"]),
  phrase("jianbiao", "create a table", [["建", "jiàn", "build"], "biao"]),
  phrase("zhixingchaxun", "run a query", [["执行", "zhí xíng", "execute"], "chaxun"], { acceptedEnglish: ["execute a query"] }),
  phrase("jiasuoyin", "add an index", [["加", "jiā", "add"], "suoyin"]),
  phrase("charushuju", "insert data", [["插入", "chā rù", "insert"], ["数据", "shù jù", "data"]], { acceptedEnglish: ["insert a row"] }),
  phrase("tijiaoshiwu", "commit a transaction", [["提交", "tí jiāo", "commit"], "shiwu"]),
]);

export const csUnits = [a1, a2, a3, a4, a5, a6, a7, a8, a9];
