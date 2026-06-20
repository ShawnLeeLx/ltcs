# A4 剧情标志显式保存 — 完成报告

**日期**: 2026-06-16
**状态**: ✅ 100%完成
**文件**: 龙途_手机试玩版_V25.html (17830行/923KB, JS语法通过)

## 问题根源

29个剧情选择标志（`G._eastPath` 等）存在三大风险：
1. **未初始化**: `initGame()` 不含这些字段，新游戏对象中它们是 `undefined`
2. **隐式保存**: 仅靠 `JSON.parse(JSON.stringify(G))` 全量深拷贝，无显式字段列表
3. **无迁移逻辑**: 旧存档加载后新字段缺失，`if(G._eastPath)` 不报错但逻辑可能错误

## 修复内容

### 1. initGame 显式初始化（29个标志）
```js
_eastPath: false, _westPath: false, _lootBonus: 0, _socialBonus: 0,
_dragonAlly: false, _humanAlly: false, _neutralPath: false,
_altruistRoute: false, _egoRoute: false, _balanceRoute: false,
_sealChosen: false, _shadowReduction: 0, _rushPath: false,
_heartReturned: false, _heartTaken: false, _heartShard: false,
_seekTruth: false, _critBonus: 0,
_seekMercy: false, _mercyKill: false,
_purifyFrost: false, _delayFrost: false,
_destroyShadow: false, _understandShadow: false,
_resistWhisper: false, _listenWhisper: false, _shareWhisper: false,
_finalDestroy: false, _finalAccept: false, _finalSacrifice: false
```

### 2. loadGame 默认守卫
每个标志添加 `if (G._xxx === undefined) G._xxx = default`

### 3. V6→V7 版本迁移
- `_effectFlagMap`: 26个布尔标志，从 `G.storyChoices` 效果键重建
- `_effectNumMap`: 6个数值重建（`_lootBonus`×2, `_socialBonus`, `_shadowReduction`×2, `_critBonus`）
- 存档版本升至 7

### 4. 数值标志兑现（之前只设不用）
| 标志 | 兑现位置 | 效果 |
|------|----------|------|
| `_critBonus` | `calcCrit()` | +5%暴击率 |
| `_socialBonus` | `addNpcAffection()` | +10%好感度倍率 |
| `_shadowReduction` | `scaleEnemy()` | Boss/精英/深渊敌人ATK降低 |

### 5. Bug修复
- `G._altruist` → `G._altruistRoute` (2处: showStoryChoice前置条件 + 结局判定)
- `_ddEnemy` 添加 `ddEnemy:true` 标记，使 `scaleEnemy` 能识别深渊敌人

### 6. 其他字段补全
`storyChoices`, `permStats`(5维), `completedQuests`, `chaptersCompleted`, `dd`(含permBuffs), `_setCompleteCount`, `_tradeMissions`, `_weather`, `_tutorial`, `_skillCooldowns`, `_perfectBattles`, `_rareKills`, `_enemyKills`, `_fullExploredLocs`, `_fullExploreCount`, `_mapMarkers`, `achievementCount`, `storyProgress.chosenEffects`

## P2剩余任务
1. A3 战斗波次系统（中）
2. C10 经济平衡实测（小）
3. B8 NPC对话深度（大）
4. D3 移动端适配（大）
