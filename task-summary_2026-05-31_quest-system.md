# 任务系统扩展 V22 - 2026-05-31

## 目标
P0-2: 扩展任务系统，从7个静态任务覆盖ch1-ch3 → 26个覆盖ch1-ch12

## 改动内容

### 1. QUESTS数组新增19个静态任务
- ch4: 海岸洞穴探索(win_battles_at), 雾隐谷寻访(visit_location)
- ch5: 翠玉沼泽清剿(win_battles_at), 沼泽蛇后(defeat_boss_at)
- ch6: 日冕塔攀登(visit_location), 龙域边境巡逻(win_battles_at)
- ch7: 风暴角灯塔(visit_location), 风神岛试炼(win_battles_at)
- ch8: 神殿深处(win_battles_at), 暗影祭司讨伐(defeat_boss_at)
- ch9: 灰烬平原调查(win_battles_at), 凤凰涅槃(defeat_boss_at)
- ch10: 火山探险(win_battles_at), 火山之心(defeat_boss_at)
- ch11: 深渊之门(visit_location), 影界探险(win_battles_at), 虚空大帝讨伐(defeat_boss_at)
- ch12: 万古王座(visit_location), 最终试炼(defeat_boss_at)

### 2. completeQuest 补全奖励类型
- gold_item: 金币+随机稀有材料（修复 lake_treasure 任务奖励bug）
- unique_item: 专属装备（SIDE_QUESTS/CHAIN_QUESTS 的 uniqueItem 字段）

### 3. acceptQuest 新增 requires 前置检查
- 接取任务时检查前置任务是否完成
- 未完成时 toast 提示「🔒 需先完成: XXX」

### 4. sceneGuild 前置任务灰掉显示
- requires 未满足的任务显示为半透明+🔒图标
- 保留位置解锁过滤（未解锁区域的任务不显示）

## 任务分布
| 类型 | 数量 |
|------|------|
| 静态任务 | 26个 |
| 支线任务 | 14个 |
| 链式任务 | 8个 |
| 公会模板 | 10种 |
| **总计** | **48个** |

## 进度类型分布
- win_battles_at: 10个
- defeat_boss_at: 7个
- visit_location: 7个
- find_clue: 1个
- find_treasure: 1个

## 验证
- ✅ JS语法通过
- ✅ 48个任务ID唯一无重复
- ✅ 所有已有系统（Boss掉落/成就/深渊/结局/好感度）完好
- ✅ V22文件: 642KB / 12545行

## 遗留项
- requires 前置任务链可进一步丰富（目前大多为null，可设计任务依赖图）
- find_treasure 进度追踪依赖 _updateTreasureQuestProgress 调用时机，需实测
- deep_dive_floor / craft_item / reach_level 等进度类型尚未用于静态任务