# V26 八项Bug修复 - 2026-06-21

## 目标
根据用户反馈修复8个游戏体验问题，优化移动端布局。

## 修复清单

| # | 问题 | 修复 | 代码位置 |
|---|------|------|----------|
| 1 | 破碎堡垒解锁过晚(ch3才出现) | CHAPTER_UNLOCKS中fortress移至ch2_forest_warning完成时解锁 | JS CHAPTER_UNLOCKS |
| 2 | 首次战斗血量不满 | **非bug**，属设计——需在旅店休息恢复HP，增加低HP小地图进入警告 | enterMiniMap() |
| 3 | 守卫队长罗兰德出现在旅店 | 罗兰德移至城主厅(sceneLordHall)和训练场(sceneTraining)，从innNpcMap/铁匠铺/商店移除 | innNpcMap/NPC_DIALOGS |
| 4 | 小地图返回城镇与传送卷轴功能重叠 | leaveMiniMap()已有免费回城+传送卷轴选择逻辑，未改动但确认 | leaveMiniMap() |
| 5 | 出售确认双击不便 | 改为弹窗确认模式（_sellModal替代双击） | sellItem() |
| 6 | 铁匠铺出售界面无分类 | 复用_shopSellTab（装备/材料/全部），增加同品合并显示 | renderSmithSell() |
| 7 | 商店买药剂自动使用 | 所有consumable类型物品放入背包，玩家手动使用 | buyItem() |
| 8 | 战斗界面移动端溢出 | CSS紧凑化：敌人卡片6px padding、HP条4px、日志70px、动作按钮40px/44px最小、小地图200px高、100dvh | CSS @media |

## 额外优化
- 低HP（<50%）进入小地图时弹出提醒："⚠️ HP不足50%!建议先去旅店休息"
- body使用100dvh替代100vh（移动端浏览器地址栏适配）

## 验证结果
- JS语法: ✅ 通过
- CSS平衡: 664/664 = 0 ✅
- 函数数: 335
- 文件大小: 867KB
- Git commit: 12149a7 → 92efe06 (rebase后)
- GitHub Pages: https://shawnleelx.github.io/ltcs/ ✅

## 关键发现
- CHAPTER_UNLOCKS原来fortress在ch3_complete下，逻辑矛盾——玩家ch2森林警告后就应知道堡垒存在
- 罗兰德同时出现在旅店、铁匠铺、商店的NPC列表中，实际只需要在城主厅和训练场
- buyItem中consumable有两条路径：teleport/dmgType放入背包，heal/restore自动使用——统一为全部入包
