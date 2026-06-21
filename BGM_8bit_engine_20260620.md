# 8-bit BGM 引擎实现

**日期**: 2026-06-20
**版本**: V26 (19419行 / 1012KB / 334函数)

## 目标
为龙途传说添加 8-bit 循环 BGM，基于已有的 SFX 引擎扩展。

## BGM 引擎架构
- 位置: V26.html SFX 模块后，约 150 行
- 核心: `BGM` IIFE 模块，与 SFX 并行
- 播放方式: setTimeout 链式调度音符序列，循环自动重播
- 音量: 独立 master gain 节点，默认 0.15（低于 SFX）
- 持久化: localStorage 存储 muted/vol 状态
- API: `BGM.play(name)`, `BGM.stop()`, `BGM.toggleMute()`, `BGM.setVol(v)`, `BGM.current()`

## 4 首 BGM 曲目

| 曲目名 | 波形 | 音量 | 调性 | 风格 |
|--------|------|------|------|------|
| town | square | 0.15 | C大调 | 欢快温馨，120bpm |
| battle | sawtooth | 0.12 | 半音阶 | 紧张快节奏，90bpm |
| abyss | sawtooth | 0.10 | D小调 | 阴郁低沉，慢板 |
| menu | triangle | 0.10 | F大调 | 柔和安静 |

## 场景 BGM 切换（11处注入）

| 场景函数 | BGM | 触发时机 |
|---------|-----|---------|
| sceneIntro() | menu | 游戏开场 |
| sceneTown() | town | 进入城镇 |
| sceneWorldMap() | town | 世界地图 |
| sceneShop() | town | 商店 |
| sceneBlacksmith() | town | 铁匠铺 |
| sceneTraining() | town | 训练场 |
| sceneGuild() | town | 公会 |
| sceneEquipment() | menu | 装备面板 |
| sceneInventory() | menu | 背包面板 |
| sceneAchievements() | menu | 成就面板 |
| startBattleWith() | battle | 战斗开始 |
| sceneDeepDive() | abyss | 深渊潜行 |
| afterBattleContinue() | town | 战斗结束回城镇 |
| endBattle(波次) | stop | 波间间歇停 BGM |
| sceneDeath() | stop | 死亡停 BGM |

## 音量控制 UI
- 位置: 右上角固定定位
- 两个按钮: 🔊(SFX) 🎵(BGM)
- 点击切换静音，图标变🔇，透明度降低
- 状态持久化到 localStorage

## 验证
- JS 语法: ✅
- CSS 平衡: 0
- BGM.play 调用: 12处(town:6, menu:4, battle:1, abyss:1)
- BGM.stop 调用: 3处
- 334 函数 / 19419 行 / 1012KB

## 部署
- GitHub API 推送 commit `db8281c`
- 线上: https://shawnleelx.github.io/ltcs/
