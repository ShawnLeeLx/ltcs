# 龙途传说 V21 继续开发 - 2026-05-31

## 目标
T0小幅度推进：补全缺失的NPC对话、实现结局系统、扩展探索体验

## 完成改动

### 1. NPC_DIALOGS 补全 ✅
新增12个缺失NPC的完整对话内容（3-4轮对话，含线索发现）：
- shopkeep_white（白城商店老板）
- jade_guardian（翡翠守护者）— 含clue_hydra_weakness
- captain_storm（风暴船长）
- karis（龙族后裔·卡里斯）
- eric（指挥官埃里克）
- frostwing_survivor（霜翼信使）
- ancient_dragon_spirit（古龙之魂）
- ash_wanderer（灰烬行者）
- flame_seer（炎先知）
- gatekeeper_abyss（深渊守门人）
- shadow_whisperer（暗影低语者）
- shadow_dragon（暗影龙王）

### 2. 结局系统 ✅
新增 `showGameEnding()` 函数，ch12完成后触发三结局展示：
- ☀️ 光明纪元（默认）：暗影消灭，安全但苍凉
- ⚖️ 平衡纪元（需seek_mercy/understand_shadow）：光暗共存，完整但危险
- 💫 英雄纪元（需altruist/purify_frost）：自我牺牲成为封印

每个结局含：独特叙事文本 + 尾声 + 冒险统计（战斗/等级/探索/好感/选择数）

故事选择界面增加前置条件检查：
- ch12c2（接受暗影）：需seek_mercy或understand_shadow，否则🔒灰掉+提示
- ch12c3（自我牺牲）：需altruist或purify_frost，否则🔒灰掉+提示

### 3. 区域NPC遭遇扩展 ✅
`_getStoryNpcForLocation()` 从4个扩展到10个区域映射：
- misthollow→mist_spirit, jademarsh→jade_guardian, ashplains→ash_wanderer
- abyssgate→gatekeeper_abyss, stormcape→captain_storm, dragontemple→karis
- snowpeak→frostwing_survivor, volcano→flame_seer, shadowrealm→shadow_whisperer
- throneofages→ancient_dragon_spirit

首次到达这些区域时自动弹出NPC对话。

### 4. 战斗线索发现扩展 ✅
`_clueMap` 从4个区域扩展到16个区域，覆盖ch1-ch12全部可探索地点。
每个区域有独特的线索ID，12%概率在战斗胜利时发现。

### 5. 宝箱掉落优化 ✅
- 新增金币掉落（5-15+等级×2）
- 新增5%概率掉落区域线索
- 保留原有的材料+装备掉落

### 6. 区域特色探索事件 ✅
新增7个区域的特色事件池（25%概率替换通用事件）：
- 湖畔、霜雪峰、火山、深渊之门、龙神殿、影界、万古王座
- 每个区域2个特色事件，奖励与区域主题匹配（如火山→龙鳞/火焰精华，深渊→暗影精华/防御+1）

## 文件信息
- 龙途_手机试玩版_V21.html：12296行，620KB，JS语法✅
- 龙途_手机试玩版_V20.html：已同步V21

## 遗留待办
1. Q4 装备属性设计（只加五维属性）— 保留现状，需更多评估
2. NPC好感度送礼在更多场景中的集成
3. 深渊潜行难度曲线的平衡性评估
4. ch4~ch12部分子章节目标可能过于模板化，需实际游玩测试
