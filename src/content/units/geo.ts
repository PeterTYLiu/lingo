import { phrase, term, unit } from "../types";

export const d1 = unit("d1", "geo", "Maps & coordinates", "地图与坐标", [
  term("dilixinxixitong", "地理信息系统", "dì lǐ xìn xī xì tǒng", "geographic information system", [["地理", "geography"], ["信息", "information"], ["系统", "system"]], {
    acceptedEnglish: ["gis", "geographic information systems"],
    note: "In conversation everyone says GIS.",
  }),
  term("ditu", "地图", "dì tú", "map", [["地", "land"], ["图", "picture"]]),
  term("zuobiao", "坐标", "zuò biāo", "coordinates", [["坐", "sit"], ["标", "mark"]], { acceptedEnglish: ["coordinate"] }),
  term("jingdu", "经度", "jīng dù", "longitude", [["经", "warp / meridian"], ["度", "degree"]], {
    note: "经纬度 = longitude and latitude; Chinese puts longitude first.",
  }),
  term("weidu", "纬度", "wěi dù", "latitude", [["纬", "weft / parallel"], ["度", "degree"]]),
  term("bilichi", "比例尺", "bǐ lì chǐ", "scale", [["比例", "ratio"], ["尺", "ruler"]], { acceptedEnglish: ["map scale"] }),
  term("ditutouying", "地图投影", "dì tú tóu yǐng", "map projection", [["地图", "map"], ["投影", "projection"]], { acceptedEnglish: ["projection"] }),
  term("zuobiaoxi", "坐标系", "zuò biāo xì", "coordinate system", [["坐标", "coordinates"], ["系", "system"]], {
    acceptedEnglish: ["coordinate reference system", "crs"],
    note: "Maps in China must use the offset GCJ-02 system, nicknamed 火星坐标系 (\"Mars coordinates\").",
  }),
  term("gaocheng", "高程", "gāo chéng", "elevation", [["高", "height"], ["程", "measure"]], {
    acceptedEnglish: ["height"],
    note: "Everyday word: 海拔 (altitude above sea level).",
  }),
  term("tuli", "图例", "tú lì", "legend", [["图", "map / chart"], ["例", "example"]], { acceptedEnglish: ["map legend", "key"] }),
], [
  phrase("kanditu", "read a map", [["看", "kàn", "look at"], "ditu"], { acceptedEnglish: ["look at a map", "check the map"] }),
  phrase("huoqujingweidu", "get the latitude and longitude", [["获取", "huò qǔ", "obtain"], ["经纬度", "jīng wěi dù", "longitude and latitude"]], {
    acceptedEnglish: ["get lat long", "get the coordinates", "get latitude and longitude"],
  }),
  phrase("zuobiaozhuanhuan", "coordinate conversion", ["zuobiao", ["转换", "zhuǎn huàn", "convert"]], {
    blank: 1,
    acceptedEnglish: ["convert coordinates", "coordinate transformation"],
  }),
  phrase("fangdaditu", "zoom in on the map", [["放大", "fàng dà", "enlarge"], "ditu"], { acceptedEnglish: ["zoom in", "zoom in the map"] }),
  phrase("suoxiaoditu", "zoom out on the map", [["缩小", "suō xiǎo", "shrink"], "ditu"], { acceptedEnglish: ["zoom out", "zoom out the map"] }),
  phrase("huizhiditu", "draw a map", [["绘制", "huì zhì", "draw"], "ditu"], { acceptedEnglish: ["make a map", "draw the map"] }),
]);

export const d2 = unit("d2", "geo", "Spatial data", "空间数据", [
  term("shiliangshuju", "矢量数据", "shǐ liàng shù jù", "vector data", [["矢量", "vector"], ["数据", "data"]], {
    note: "矢量 is the GIS and physics word for vector; machine learning says 向量.",
  }),
  term("shangeshuju", "栅格数据", "shān gé shù jù", "raster data", [["栅格", "grid / lattice"], ["数据", "data"]], { acceptedEnglish: ["raster"] }),
  term("tuceng", "图层", "tú céng", "layer", [["图", "map"], ["层", "layer"]], { acceptedEnglish: ["map layer"] }),
  term("yaosu", "要素", "yào sù", "feature", [["要", "essential"], ["素", "element"]], { acceptedEnglish: ["map feature", "geographic feature"] }),
  term("shuxingbiao", "属性表", "shǔ xìng biǎo", "attribute table", [["属性", "attribute"], ["表", "table"]]),
  term("kongjianshujuku", "空间数据库", "kōng jiān shù jù kù", "spatial database", [["空间", "space"], ["数据库", "database"]], {
    acceptedEnglish: ["geodatabase", "spatial db"],
  }),
  term("kongjiansuoyin", "空间索引", "kōng jiān suǒ yǐn", "spatial index", [["空间", "space"], ["索引", "index"]]),
  term("huanchongqu", "缓冲区", "huǎn chōng qū", "buffer", [["缓冲", "cushion"], ["区", "zone"]], {
    acceptedEnglish: ["buffer zone"],
    note: "Same word as a memory buffer in programming.",
  }),
  term("diejiafenxi", "叠加分析", "dié jiā fēn xī", "overlay analysis", [["叠加", "superimpose"], ["分析", "analysis"]], { acceptedEnglish: ["overlay"] }),
  term("fenbianlv", "分辨率", "fēn biàn lǜ", "resolution", [["分辨", "distinguish"], ["率", "rate"]], { acceptedEnglish: ["spatial resolution"] }),
  term("tuopu", "拓扑", "tuò pū", "topology", [["拓扑", "(sound loan of topo-)"]]),
  term("dilibianma", "地理编码", "dì lǐ biān mǎ", "geocoding", [["地理", "geography"], ["编码", "encode"]], {
    note: "The reverse, address from coordinates, is 逆地理编码.",
  }),
], [
  phrase("tianjiatuceng", "add a layer", [["添加", "tiān jiā", "add"], "tuceng"], { acceptedEnglish: ["add a map layer"] }),
  phrase("yincangtuceng", "hide a layer", [["隐藏", "yǐn cáng", "hide"], "tuceng"], { acceptedEnglish: ["hide the layer", "turn off a layer"] }),
  phrase("jianlihuanchongqu", "create a buffer", [["建立", "jiàn lì", "set up"], "huanchongqu"], { acceptedEnglish: ["make a buffer", "build a buffer"] }),
  phrase("kongjianchaxun", "spatial query", [["空间", "kōng jiān", "spatial"], "chaxun"], { blank: 1, acceptedEnglish: ["run a spatial query"] }),
  phrase("chuangjiankongjiansuoyin", "create a spatial index", [["创建", "chuàng jiàn", "create"], "kongjiansuoyin"], { acceptedEnglish: ["build a spatial index"] }),
]);

export const d3 = unit("d3", "geo", "Surveying & remote sensing", "测绘与遥感", [
  term("cehui", "测绘", "cè huì", "surveying and mapping", [["测", "measure"], ["绘", "draw"]], {
    acceptedEnglish: ["geomatics", "surveying", "surveying & mapping"],
    note: "测绘工程 is the university major for geomatics.",
  }),
  term("celiang", "测量", "cè liáng", "measurement", [["测", "measure"], ["量", "measure"]], { acceptedEnglish: ["measure", "survey"] }),
  term("quanzhanyi", "全站仪", "quán zhàn yí", "total station", [["全站", "total station"], ["仪", "instrument"]]),
  term("weixingdingwei", "卫星定位", "wèi xīng dìng wèi", "satellite positioning", [["卫星", "satellite"], ["定位", "locate"]], {
    acceptedEnglish: ["gnss", "gps", "satellite navigation"],
    note: "北斗 (BeiDou) is China's own system; GPS is the American one.",
  }),
  term("yaogan", "遥感", "yáo gǎn", "remote sensing", [["遥", "distant"], ["感", "sense"]]),
  term("weixingyingxiang", "卫星影像", "wèi xīng yǐng xiàng", "satellite imagery", [["卫星", "satellite"], ["影像", "image"]], {
    acceptedEnglish: ["satellite image", "satellite images"],
  }),
  term("hangpai", "航拍", "háng pāi", "aerial photography", [["航", "fly"], ["拍", "shoot"]], { acceptedEnglish: ["aerial photo", "aerial photos", "drone photography"] }),
  term("wurenji", "无人机", "wú rén jī", "drone", [["无人", "unmanned"], ["机", "machine"]], { acceptedEnglish: ["uav"] }),
  term("dianyun", "点云", "diǎn yún", "point cloud", [["点", "point"], ["云", "cloud"]]),
  term("jiguangleida", "激光雷达", "jī guāng léi dá", "lidar", [["激光", "laser"], ["雷达", "radar"]]),
  term("shuzigaochengmoxing", "数字高程模型", "shù zì gāo chéng mó xíng", "digital elevation model", [["数字", "digital"], ["高程", "elevation"], ["模型", "model"]], {
    acceptedEnglish: ["dem"],
  }),
  term("jingdu-precision", "精度", "jīng dù", "accuracy", [["精", "precise"], ["度", "degree"]], {
    acceptedEnglish: ["precision"],
    note: "Sounds just like 经度 (longitude); context tells them apart.",
  }),
], [
  phrase("feiwurenji", "fly a drone", [["飞", "fēi", "fly"], "wurenji"], { acceptedEnglish: ["fly the drone"] }),
  phrase("caijidianyun", "capture a point cloud", [["采集", "cǎi jí", "collect"], "dianyun"], { acceptedEnglish: ["collect point clouds", "collect point cloud data"] }),
  phrase("jieyiyingxiang", "interpret satellite imagery", [["解译", "jiě yì", "interpret"], "weixingyingxiang"], { acceptedEnglish: ["interpret satellite images"] }),
  phrase("tigaojingdu", "improve accuracy", [["提高", "tí gāo", "raise"], "jingdu-precision"], { acceptedEnglish: ["increase accuracy", "improve precision"] }),
  phrase("paowaiye", "do fieldwork", [["跑", "pǎo", "run"], ["外业", "wài yè", "fieldwork"]], {
    acceptedEnglish: ["go out in the field", "do field surveys"],
    note: "外业 is fieldwork; 内业 is the office processing that follows.",
  }),
]);

export const geoUnits = [d1, d2, d3];
