# A3 战斗波次系统 — 实现完成

## 完成时间
2026-06-18 23:00

## 目标
Boss战不再是单打独斗，而是3-5波的连续战斗：先清小兵，再打精锐，最终面对Boss本尊。

## 设计决策

### 波次结构
- **波次数**：Boss等级决定 — Lv<30: 3波，Lv30-49: 4波，Lv≥50: 5波
- **波次编排**：前1-2波=minion(1-2个区域敌人)，中间0-2波=elite(精锐化敌人)，最后1波=Boss
- **理由**：Boss等级越高，战斗越应该像一场"攻城"而非单挑。3波起步保证最低复杂度。

### 波间休息
- **触发时机**：当前波全部敌人击败 → endBattle拦截 → 显示休息界面而非胜利
- **选项**：
  1. 🧪 使用药水（HP<70%且有药水时出现）
  2. ✨ 强化祝福（花费20MP，获得攻击+15%/防御+15%一回合buff）
  3. ⚔️ 直接继续
- **下一波预览**：显示敌人名称和emoji

### 奖励分配
- **波次间**：30% XP + 少量金币(2-5 + lv*0.3) + 30%材料掉率
- **最终波(Boss)**：完整endBattle奖励（100% XP + 完整掉落 + Boss战利品）

### 临时Buff机制
- 强化祝福通过 `_waveTempAtk`/`_waveTempDef` 存储
- 在 `calcAtk()`/`calcDef()` 中读取，加到基础值上
- 战斗结束后在 `afterBattleContinue()` 清除

### 追踪变量
- `G._waveNoDamage`：每波开始重置，受伤时置false
- `G._waveBattlesCompleted`：完成的波次Boss战总数
- `G._wavePerfectClear`：全程无伤完成的波次Boss战

## 新增成就(3)
| ID | 名称 | 条件 | 奖励 |
|----|------|------|------|
| wave_survivor | 波次生存者 | 完成1场3波+Boss战 | 500g |
| wave_perfect | 无伤通关者 | 全程无伤完成波次Boss战 | 2000g |
| wave_5boss | 连战之主 | 完成5场波次Boss战 | 3000g |

## 代码变更
1. `startBattleWith()` — 新增 wave/totalWaves/waves 字段
2. `startBossFight()` — 调用 `_generateBossWaves()` 生成波次配置
3. `_generateBossWaves()` — 新函数，根据Boss等级和区域敌人生成波次
4. `_showWaveIntermission()` — 新函数，渲染波间休息界面
5. `_usePotionInWave()` / `_buffBeforeWave()` / `_continueNextWave()` — 波间交互
6. `endBattle()` — 新增波次拦截逻辑：还有波次时显示休息而非胜利
7. `calcAtk()` / `calcDef()` — 读取 `_waveTempAtk`/`_waveTempDef`
8. `afterBattleContinue()` — 清除波次临时buff
9. `renderBattle()` — 波次进度条显示
10. 成就数组 +3 条目
11. CSS `.wave-progress` / `.wave-status` / `.wave-next`

## 文件状态
- 文件：`龙途_手机试玩版_V25.html`
- 行数：18697行
- 大小：1010256 bytes (~987KB)
- 函数数：324
- JS语法：✅ 通过

## 风险点
- `_showBossInfo()` 仍显示Boss单体属性，没有体现波次预览 — 后续可优化
- 波次小兵使用 `scaleEnemy()` 已含DIFF_SCALE(0.75)，elite额外乘2.5再scale，可能有双缩放问题 — 需实测
- 波次间如果玩家逃跑，`fleeBattle()` 不清除波次状态 — 已有逻辑会回到miniMap，波次数据随G.battle清除而消失，但boss未击败下次还可触发
