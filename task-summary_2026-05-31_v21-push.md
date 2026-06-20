# V21 开发推进 - 2026-05-31

## 目标
在V21基础上继续推进"龙途传说"开发，修复系统缺陷并增加高价值功能。

## 已完成改动

### 1. Boss掉落表补全（严重缺失修复）
- **问题**：15个Boss完全缺少材料掉落表（ENEMY_MAT_DROPS），玩家打Boss只能获得装备掉落和药水
- **修复**：为全部15个Boss添加了完整掉落表（boss_wolf_alpha → boss_ancient_king）
- 掉落设计：Boss保证uncommon+材料，有rare/epic概率，后期Boss增加dragon_heart/dragon_bone等稀有材料
- 现在全部41个敌人都有掉落表

### 2. 锻造配方扩展（11→20个）
- **问题**：CRAFT_RECIPES只有11个配方，中间级别断档；world_tree_leaf材料完全无用
- **新增9个配方**：
  - 中级uncommon：战争之锤、毒蛇之刃(附毒)、蛛丝法袍
  - 中级rare：风暴戒指、月光护符、烈焰拳套(附火)、暗影之靴(闪避)
  - 终局epic：世界树枝杖(使用world_tree_leaf)、虚空铠甲(使用primordial_shard)
- 覆盖gloves/boots/ring等新slot，补足中期装备空白

### 3. 区域连通性修复（重大路径bug）
- **问题**：LOC_CONNECTIONS中4个区域之间几乎无法通行——Region1→2只能单向，Region2→3和3→4完全断开
- **修复6条关键路径**：
  - darkforest ↔ misthollow（森林→迷雾谷）
  - coastcave ↔ misthollow（海洞→迷雾谷）
  - ironridge ↔ dragonreach（铁岭→龙域）
  - snowpeak ↔ icereef（雪峰→冰礁港）
  - windisland ↔ dragonreach（风神岛→龙域）
  - volcano ↔ abyssgate（火山→深渊之门）
- BFS验证：白城可达全部22个地点 ✅

### 4. 深渊潜行难度曲线优化
- **问题**：线性+8%/层，50层后HP膨胀到5x，100层8x，200层16x
- **改为递减曲线**：`1 + 0.08 * floor * (1 - floor/500)`
- 新数值：Floor 50=4.54x, Floor 100=7.35x, Floor 200=10.58x
- 高层数仍有增长但不会失控

### 5. 成就系统（全新功能）
- **36个成就**，分8类：战斗(8)、探索(5)、财富(3)、锻造(3)、等级(4)、故事(4)、深渊(3)、NPC(3)、公会(2)
- `checkAchievements()` 在8个关键行为触发：战斗胜利、升级、锻造完成、章节完成、探索区域、100%探索、NPC关系升级、任务完成
- `sceneAchievements()` 成就展示页：网格布局、进度条、解锁/未解锁状态
- 角色信息页添加🏆成就入口按钮
- 追踪变量：_battleCount, _bossKills, _perfectBattles, _exploredLocs, _fullExploreCount, _craftCount, _questComplete, _completedChapters, _friendCount, _soulmateCount

## 文件状态
- 龙途_手机试玩版_V21.html：12468行，534KB，JS语法通过 ✅
- 龙途_手机试玩版_V20.html：已同步V21 ✅

## 决策与理由
- Boss掉落保证uncommon+而非common，理由：Boss应该是奖励性体验
- 成就用网格2列而非列表，理由：手机竖屏下2列格子视觉更好
- 好友/灵魂羁绊计数用去重追踪（_achNpcTracked），理由：避免NPC多次升级重复计数
- 深渊曲线用递减公式而非硬分层，理由：平滑过渡，不需要手动调参
