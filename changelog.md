# Changelog

All notable changes to 行话 are recorded here. Versions follow [Semantic Versioning](https://semver.org/).

## 1.4.0 — 2026-11-03

### Added
- New GIS track (地理信息, in orange on the path) with three units, each with word lessons, phrase lessons and a capstone:
  - 地图与坐标 Maps & coordinates (after Algorithms): 地理信息系统, 坐标, 经度, 纬度, 比例尺, 地图投影, 坐标系, 高程, plus phrases like 获取经纬度 and 坐标转换.
  - 空间数据 Spatial data (after Large language models): 矢量数据, 栅格数据, 图层, 要素, 空间索引, 缓冲区, 叠加分析, 地理编码, plus phrases like 添加图层 and 空间查询.
  - 测绘与遥感 Surveying & remote sensing (after Networking): 测绘, 全站仪, 卫星定位, 遥感, 无人机, 点云, 激光雷达, 数字高程模型, 精度, plus phrases like 采集点云 and 跑外业.
- Fill-in-the-blank sentences and accepted synonyms for every new term.

### Fixed
- The content test's pinyin check no longer drops ü (it compared lü as lu).

## 1.3.2 — 2026-10-27

### Fixed
- Pressing a sound button no longer nudges the content below it (most visible in multiple-choice questions with pinyin turned off).

## 1.3.1 — 2026-10-22

### Changed
- In lessons, the Check button is now blue, so it stands apart from the green Continue button.

## 1.3.0 — 2026-10-22

### Added
- New AI track (人工智能, in green on the path) with three units, each with word lessons, phrase lessons and a capstone:
  - 机器学习 Machine learning (after Data structures): 人工智能, 模型, 训练, 推理, 算力, 显卡, plus phrases like 训练模型 and 调参.
  - 大模型 Large language models (after Databases): 提示词, 上下文窗口, 幻觉, 微调, 检索增强生成, plus phrases like 写提示词 and 调用大模型.
  - AI编程 AI coding (after Testing & debugging): 智能体, 工具调用, 沙箱, 权限, 氛围编程, plus phrases like 让AI写代码 and 接受修改.
- Fill-in-the-blank sentences and accepted synonyms for every new term.

## 1.2.1 — 2026-10-22

### Changed
- No user-facing changes; release to test the deployment pipeline.

## 1.2.0 — 2026-10-22

### Added
- Translate exercise: the English is shown and you type the Mandarin with your Chinese keyboard, with no word bank. Blank slots hint at the answer's length; common synonyms are accepted (e.g. 电脑 for "computer"). Every lesson, review and capstone has one or two.

## 1.1.0 — 2026-10-22

### Added
- Fill-in-the-blank exercise: read a Mandarin sentence and type the missing word (for phrases, the missing verb), with no word bank. Every term has a sentence with context on both sides of the blank; pinyin follows the pinyin setting but never reveals the answer. Every lesson, review and capstone has one or two.

## 1.0.0

- First versioned release.
