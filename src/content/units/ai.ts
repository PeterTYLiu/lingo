import { phrase, term, unit } from "../types";

export const c1 = unit("c1", "ai", "Machine learning", "机器学习", [
  term("rengongzhineng", "人工智能", "rén gōng zhì néng", "artificial intelligence", [["人工", "man-made"], ["智能", "intelligence"]], {
    acceptedEnglish: ["ai"],
    note: "In everyday talk people just say AI.",
  }),
  term("jiqixuexi", "机器学习", "jī qì xué xí", "machine learning", [["机器", "machine"], ["学习", "learn"]], { acceptedEnglish: ["ml"] }),
  term("shenduxuexi", "深度学习", "shēn dù xué xí", "deep learning", [["深度", "depth"], ["学习", "learn"]], { acceptedEnglish: ["dl"] }),
  term("shenjingwangluo", "神经网络", "shén jīng wǎng luò", "neural network", [["神经", "nerve"], ["网络", "network"]], { acceptedEnglish: ["neural net"] }),
  term("moxing", "模型", "mó xíng", "model", [["模", "mold"], ["型", "form / type"]], { acceptedEnglish: ["ai model", "ml model"] }),
  term("xunlian", "训练", "xùn liàn", "training", [["训", "instruct"], ["练", "drill"]], { acceptedEnglish: ["train"] }),
  term("shujuji", "数据集", "shù jù jí", "dataset", [["数据", "data"], ["集", "collection"]], { acceptedEnglish: ["data set"] }),
  term("tuili", "推理", "tuī lǐ", "inference", [["推", "push / deduce"], ["理", "reason"]], {
    acceptedEnglish: ["reasoning"],
    note: "Also means reasoning: a reasoning model is 推理模型.",
  }),
  term("guonihe", "过拟合", "guò nǐ hé", "overfitting", [["过", "over"], ["拟合", "fit (a curve)"]], { acceptedEnglish: ["overfit"] }),
  term("suanli", "算力", "suàn lì", "compute", [["算", "calculate"], ["力", "power"]], { acceptedEnglish: ["computing power", "compute power"] }),
  term("xianka", "显卡", "xiǎn kǎ", "graphics card", [["显", "display"], ["卡", "card"]], {
    acceptedEnglish: ["gpu", "video card"],
    note: "The chip itself is GPU, formally 图形处理器.",
  }),
], [
  phrase("xunlianmoxing", "train a model", ["xunlian", "moxing"], { acceptedEnglish: ["train the model"] }),
  phrase("biaozhushuju", "label data", [["标注", "biāo zhù", "annotate"], ["数据", "shù jù", "data"]], { acceptedEnglish: ["annotate data", "label the data"] }),
  phrase("tiaocan", "tune hyperparameters", [["调", "tiáo", "adjust"], ["参", "cān", "parameters"]], {
    acceptedEnglish: ["tune parameters", "hyperparameter tuning"],
    note: "调 is tiáo here. Self-mocking slang: 调参侠, a \"tuning hero\" who only tweaks knobs.",
  }),
  phrase("paomoxing", "run a model", [["跑", "pǎo", "run"], "moxing"], { acceptedEnglish: ["run the model"], note: "跑 (run) is the casual verb for running code." }),
  phrase("suanlibugou", "not enough compute", ["suanli", ["不够", "bù gòu", "not enough"]], { blank: 1, acceptedEnglish: ["insufficient compute"] }),
]);

export const c2 = unit("c2", "ai", "Large language models", "大模型", [
  term("dayuyanmoxing", "大语言模型", "dà yǔ yán mó xíng", "large language model", [["大", "big"], ["语言", "language"], ["模型", "model"]], {
    acceptedEnglish: ["llm"],
    note: "Usually shortened to 大模型.",
  }),
  term("tishici", "提示词", "tí shì cí", "prompt", [["提示", "hint / prompt"], ["词", "words"]], { acceptedEnglish: ["prompts"] }),
  term("shangxiawen", "上下文", "shàng xià wén", "context", [["上下", "above and below"], ["文", "text"]]),
  term("shangxiawenchuangkou", "上下文窗口", "shàng xià wén chuāng kǒu", "context window", [["上下文", "context"], ["窗口", "window"]]),
  term("ciyuan", "词元", "cí yuán", "token (LLM)", [["词", "word"], ["元", "unit"]], {
    acceptedEnglish: ["token", "tokens"],
    note: "In practice almost everyone just says token. Not the same as 令牌, an auth token.",
  }),
  term("huanjue", "幻觉", "huàn jué", "hallucination", [["幻", "illusion"], ["觉", "sense"]], { acceptedEnglish: ["hallucinations"] }),
  term("yuxunlian", "预训练", "yù xùn liàn", "pre-training", [["预", "in advance"], ["训练", "train"]], { acceptedEnglish: ["pretraining", "pretrain"] }),
  term("weitiao", "微调", "wēi tiáo", "fine-tuning", [["微", "slight"], ["调", "adjust"]], {
    acceptedEnglish: ["fine tuning", "finetuning", "fine-tune"],
    note: "调 is tiáo here, as in 调参.",
  }),
  term("duomotai", "多模态", "duō mó tài", "multimodal", [["多", "many"], ["模态", "modality"]], { acceptedEnglish: ["multi-modal", "multimodality"] }),
  term("xiangliang", "向量", "xiàng liàng", "vector", [["向", "direction"], ["量", "quantity"]], {
    acceptedEnglish: ["embedding"],
    note: "A vector database is 向量数据库; an embedding is 嵌入 or 向量表示.",
  }),
  term("jiansuozengqiangshengcheng", "检索增强生成", "jiǎn suǒ zēng qiáng shēng chéng", "retrieval-augmented generation", [["检索", "retrieve"], ["增强", "enhance"], ["生成", "generate"]], {
    acceptedEnglish: ["rag", "retrieval augmented generation"],
    note: "Usually just called RAG.",
  }),
  term("kaiyuanmoxing", "开源模型", "kāi yuán mó xíng", "open-source model", [["开源", "open source"], ["模型", "model"]], {
    acceptedEnglish: ["open source model", "open-weight model", "open weights model"],
  }),
  term("canshuliang", "参数量", "cān shù liàng", "parameter count", [["参数", "parameter"], ["量", "amount"]], { acceptedEnglish: ["number of parameters", "model size"] }),
], [
  phrase("xietishici", "write a prompt", [["写", "xiě", "write"], "tishici"], { acceptedEnglish: ["write prompts"] }),
  phrase("wenai", "ask the AI", [["问", "wèn", "ask"], ["AI", "AI", "AI"]], { acceptedEnglish: ["ask ai", "ask an ai"] }),
  phrase("chuxianhuanjue", "hallucinate", [["出现", "chū xiàn", "appear"], "huanjue"], { acceptedEnglish: ["start hallucinating", "have hallucinations"] }),
  phrase("weitiaomoxing", "fine-tune a model", ["weitiao", "moxing"], { acceptedEnglish: ["fine-tune the model", "finetune a model"] }),
  phrase("diaoyongdamoxing", "call an LLM", ["diaoyong", ["大模型", "dà mó xíng", "large model (LLM)"]], { acceptedEnglish: ["call the llm", "call a large model"] }),
  phrase("shangxiawentaichang", "the context is too long", ["shangxiawen", ["太长", "tài cháng", "too long"]], { blank: 1, acceptedEnglish: ["context too long"] }),
]);

export const c3 = unit("c3", "ai", "AI coding", "AI编程", [
  term("zhinengti", "智能体", "zhì néng tǐ", "agent", [["智能", "intelligent"], ["体", "body / entity"]], {
    acceptedEnglish: ["ai agent", "agents"],
    note: "Many devs just say Agent.",
  }),
  term("bianchengzhushou", "编程助手", "biān chéng zhù shǒu", "coding assistant", [["编程", "programming"], ["助手", "assistant"]], {
    acceptedEnglish: ["ai coding assistant", "programming assistant"],
  }),
  term("daimabuquan", "代码补全", "dài mǎ bǔ quán", "code completion", [["代码", "code"], ["补全", "fill in"]], { acceptedEnglish: ["autocomplete", "code autocomplete"] }),
  term("gongjudiaoyong", "工具调用", "gōng jù diào yòng", "tool calling", [["工具", "tool"], ["调用", "call"]], { acceptedEnglish: ["tool use", "tool call", "function calling"] }),
  term("gongzuoliu", "工作流", "gōng zuò liú", "workflow", [["工作", "work"], ["流", "flow"]], { acceptedEnglish: ["workflows"] }),
  term("zidonghua", "自动化", "zì dòng huà", "automation", [["自动", "automatic"], ["化", "-ize"]], { acceptedEnglish: ["automate"] }),
  term("shaxiang", "沙箱", "shā xiāng", "sandbox", [["沙", "sand"], ["箱", "box"]], { acceptedEnglish: ["sandboxing"], note: "Also 沙盒." }),
  term("quanxian", "权限", "quán xiàn", "permission", [["权", "rights"], ["限", "limit"]], { acceptedEnglish: ["permissions", "access rights"] }),
  term("fenweibiancheng", "氛围编程", "fēn wéi biān chéng", "vibe coding", [["氛围", "atmosphere / vibe"], ["编程", "programming"]], {
    acceptedEnglish: ["vibecoding"],
    note: "A literal translation; plenty of people just say vibe coding.",
  }),
  term("tishicigongcheng", "提示词工程", "tí shì cí gōng chéng", "prompt engineering", [["提示词", "prompt"], ["工程", "engineering"]]),
], [
  phrase("rangaixiedaima", "have AI write the code", [["让", "ràng", "let / have"], ["AI", "AI", "AI"], ["写", "xiě", "write"], "daima"], {
    blank: 2,
    acceptedEnglish: ["let ai write the code", "get ai to write code"],
  }),
  phrase("shengchengdaima", "generate code", [["生成", "shēng chéng", "generate"], "daima"], { acceptedEnglish: ["generate the code"] }),
  phrase("geiquanxian", "grant permission", [["给", "gěi", "give"], "quanxian"], { acceptedEnglish: ["give permission", "grant permissions"], note: "Formal: 授予权限." }),
  phrase("jieshouxiugai", "accept the changes", [["接受", "jiē shòu", "accept"], ["修改", "xiū gǎi", "changes / edits"]], { acceptedEnglish: ["accept changes", "accept the edits"] }),
  phrase("chexiaoxiugai", "undo the changes", [["撤销", "chè xiāo", "undo"], ["修改", "xiū gǎi", "changes / edits"]], { acceptedEnglish: ["revert the changes", "undo changes"] }),
  phrase("zaishaxiangliyunxing", "run it in a sandbox", [["在", "zài", "in"], "shaxiang", ["里", "lǐ", "inside"], ["运行", "yùn xíng", "run"]], {
    blank: 3,
    acceptedEnglish: ["run in a sandbox"],
  }),
  phrase("zidonghuagongzuoliu", "automated workflow", ["zidonghua", "gongzuoliu"], { acceptedEnglish: ["automate the workflow"] }),
]);

export const aiUnits = [c1, c2, c3];
