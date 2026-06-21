# 8-bit SFX 音效注入完成

**日期**: 2026-06-20
**版本**: V26 (19226行 / 1006KB / 327函数)

## 目标
为龙途传说添加零依赖 8-bit 复古音效系统，基于 Web Audio API。

## SFX 引擎架构
- 位置: V26.html L7588-7709 (~120行)
- 振荡器: 方波(square) + 锯齿波(sawtooth) + 自定义噪声生成器
- 包络: attack/decay/sustain/release 参数化
- 音效定义: 对象字面量，每个音效包含频率序列、波形、包络、增益
- 音量控制: `SFX.setVolume(0~1)`，持久化到 localStorage
- 静音: `SFX.toggle()`，UI按钮切换
- 初始化: `SFX.init()` 在用户首次交互时恢复 AudioContext（浏览器自动播放策略）

## 18个音效注入点

| 音效名 | 注入函数 | 场景 |
|--------|---------|------|
| attack / crit / fatal / elemental | playerAttack() | 玩家普通/暴击/致命/元素攻击 |
| poison | playerAttack() 中毒路径 | 中毒伤害 |
| stun | playerAttack() 眩晕路径 | 眩晕效果 |
| defend | doDefend() | 防御 |
| flee | doFlee() | 逃跑 |
| battleStart / bossAppear | startBattleWith() | 战斗开始 |
| battleWin | endBattle() | 战斗胜利 |
| waveClear | endBattle() 波次路径 | 波次清场 |
| levelUp | doLevelUp() | 升级 |
| learnSkill | learnSkill() | 学习技能 |
| skill | playerSkill() | 使用战斗技能 |
| originSkill | useOriginSkill() | 起源技能 |
| enemyHit | _enemyUseSkill() 物理伤害 | 敌人命中玩家 |
| enemySkill | _enemyUseSkill() | 敌人使用技能 |
| death | sceneDeath() | 玩家死亡 |
| itemGet | 战斗掉落 G.inventory.push(eqDrop) | 物品获取 |
| footstep | travelTo() | 旅行 |
| click | 全局 click 事件委托 | 按钮/UI点击 |

## 全局 UI 点击 SFX
- 委托式 `document.addEventListener('click')` 监听
- 匹配: button / .bld-clickable / .choice-btn / a
- 80ms 防抖

## 验证结果
- JS 语法: ✅ 通过
- CSS 平衡: 0 (660 opens = 660 closes)
- 文件大小: 1006KB
- 函数数: 327
- SFX.play 调用: 18处

## 部署
- GitHub API 推送成功 (commit `eef5673`)
- 线上链接: https://shawnleelx.github.io/ltcs/

## 后续可选扩展
- 更多 UI 音效: 标签切换、面板打开/关闭
- 背景音乐 (BGM): 8-bit 循环旋律
- 环境音: 城镇/森林/深渊环境白噪音
- 音效淡入淡出过渡
- 音效随机微调 (避免重复感)
