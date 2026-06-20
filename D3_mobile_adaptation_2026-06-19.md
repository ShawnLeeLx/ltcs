# D3 移动端适配 — 实现完成

## 完成时间
2026-06-19 00:30

## 目标
龙途传说在手机浏览器中可玩——触控友好、布局适配、不遮挡内容。

## 设计决策

### 响应式断点
| 断点 | 目标 | 关键调整 |
|------|------|---------|
| ≤420px | 主流手机 | 全套移动适配 |
| ≤360px | 小屏手机 | 进一步缩小字号 |
| max-height 500px + landscape | 横屏手机 | 紧凑布局，战斗不吸底 |

### 触控目标
- **所有按钮最小44px**（Apple HIG标准）
- **战斗动作48px高**，吸底sticky，不会被内容遮挡
- **移动按钮48px高**，地图可滑动控制方向

### 布局策略
- **城镇建筑**：2列网格，隐藏描述文字，只显示emoji+名称
- **敌人卡片**：纵向堆叠（原横向flex→column），宽度100%
- **底部按钮**：3列网格（原flex-wrap换行太占空间）
- **面板/模态**：全宽+圆角顶部+最大85vh可滚动
- **状态栏**：单行可横向滚动，隐藏滚动条

### 导航
- **底部导航栏**：5个快捷入口（城镇/背包/角色/装备/存档）
  - 战斗中自动隐藏（updateStatus检测G.inBattle）
  - 横屏时缩小但保留
- **边缘右滑**：左边缘30px内右滑100px+回城镇
- **双击防缩放**：300ms内连续touch自动preventDefault

### 小地图触控
- **滑动移动**：在小地图区域上下左右滑动=移动角色
- 移动按钮保留但加大到48px

### 安全区域
- `env(safe-area-inset-top/bottom)` 适配iPhone刘海/底部条
- 底部导航栏自动适配bottom padding

## 代码变更
1. CSS: `@media (max-width: 420px)` — 约100行响应式规则
2. CSS: `@media (max-width: 360px)` — 超小屏额外调整
3. CSS: `@media (max-height: 500px) and (orientation: landscape)` — 横屏
4. CSS: `@supports (padding-top: env(...))` — 安全区域
5. CSS: `.mobile-nav` — 底部导航栏样式
6. HTML: `<div id="mobileNav">` — 底部导航栏DOM
7. JS: `updateStatus()` — 战斗中隐藏导航栏
8. JS: D3 touch helpers IIFE — 双击防缩放+边缘滑动+地图滑动

## 文件状态
- 文件：`龙途_手机试玩版_V25.html`
- 行数：19028行
- 大小：1021245 bytes (~997KB)
- 函数数：324
- JS语法：✅ 通过

## 风险点
- 底部导航栏在Intro/SelectOrigin场景可能出现（需要G._currentScene检测）
- 城镇建筑2列网格在13个建筑时导致最后一行1列居中（不影响功能）
- 滑动移动可能与浏览器的overscroll行为冲突（passive listener无法preventDefault）
- 战斗sticky bottom在某些Android浏览器可能不生效（需要实测）
