# V9 三项核心修复

## 目标
1. 玩家不知道自己是谁、目标是什么
2. 游戏难度调至当前75%
3. 地图移动体验：玩家固定居中，地图滚动

## 修复内容

### 1. 玩家身份与目标
- **开场页面重写**：sceneIntro()从一句简短描述改为完整叙事——龙陨故事、你是谁、你的目标
- 移除独立的"世界观"按钮（内容已整合进开场）
- **起源确认页加目标提示**：sceneOriginStory()新增"🎯 你的目标"金色卡片，明确告诉玩家：探索龙陨之地→追寻龙鳞秘密→开辟商路→走到最后

### 2. 难度降至75%
- 新增全局 `DIFF_SCALE = 0.75` 常量 + `scaleEnemy()` 函数
- 三个敌人创建点全部应用：
  - miniMapBattle() — 普通遇敌
  - miniMapElite() — 精锐（HP×3×0.75, ATK×2.5×0.75）
  - startBossFight() — Boss战
- 以后调整难度只需改 DIFF_SCALE 一个数字

### 3. 摄像机跟随系统（核心重写）
- **替换scrollToPlayer为camera-follow系统**：
  - `centerMapOnPlayer()` — 即时居中（首次进入）
  - `centerMapOnPlayerAnimated()` — 动画居中（移动时）
- **动画原理**：
  1. 先瞬间定位到旧位置（transition:none）
  2. 强制reflow
  3. 开启transition:transform 0.18s ease-out
  4. 设置新位置transform → CSS自动插值动画
- **视觉效果**：玩家金色圆点固定在屏幕中央，地图在脚下滑动
- 地图容器从 `overflow:auto`（scrollbar滚动）改为 `overflow:hidden`（CSS transform移动）
- 容器固定高度320px + 深色背景 + 圆角边框

## 产出
- `龙途_手机试玩版_V9.html` (420KB)，8项验证✅，JS语法✅
- game_v5.js — 5处修改
