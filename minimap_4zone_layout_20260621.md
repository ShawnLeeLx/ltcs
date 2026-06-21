# V26 小地图四区域固定布局 - 2026-06-21

## 目标
将小地图界面改为四区域固定布局，所有区域不随页面滚动。

## 布局结构（从下往上）

### ① 底部导航栏
5个固定按钮：状态👤 / 背包🎒 / 装备⚔️ / 任务📜 / 存档💾
- 小地图模式切换为mm-nav-5类
- 离开小地图时恢复原始5按钮（城镇/背包/角色/装备/存档）

### ② 控制区域（固定高度110px）
- 左侧：3×3方向键（⬆⬅●➡⬇），36px方形按钮
- 右侧：操作按钮3列网格（场景动作+回城+世界地图）
- 移除了冗余按钮：标记📌、观察四周🌿（普通房间时保留一个观察按钮）

### ③ 地图区域（flex-grow弹性填充）
- 紧凑头部：地图名+探索%+天气+雷达+路径提示（一行内联）
- 房间信息行（类型图标+名称+提示）
- SVG地图：cellSize从52px缩至36px，显示更多地块
- flex:1 1 auto + min-height:0 让地图自动填满剩余空间

### ④ 顶部状态栏
- 保持原有Lv/HP/MP/金币
- 小地图模式改为position:relative，参与flex布局

## CSS新增
- `body.mm-layout`：切换整体为flex纵向，overflow:hidden
- `body.mm-layout #game`：flex:1, display:flex, flex-direction:column
- `.mm-zone-map`：flex:1, 弹性填充
- `.mm-zone-ctrl`：flex:0 0 auto, 固定高度区域
- `.mm-dpad`：110px宽方向键区
- `.mm-acts`：3列grid操作按钮
- `.mm-map-flex`：地图flex容器

## 辅助函数
- `_setMiniMapNav()`：切换底部导航为5功能按钮
- `_leaveMiniMapLayout()`：恢复原始导航，移除mm-layout类

## JS函数替换
- `renderMiniMap()`：完全重写为四区域布局
- `leaveMiniMap()`：开头调用_leaveMiniMapLayout()
- `_goWorldMapFromMiniMap()`：开头调用_leaveMiniMapLayout()
- `renderGridMap()`：cellSize 52→36

## 验证
- JS语法: ✅ 通过
- CSS平衡: 690/690 = 0 ✅
- 函数数: 337
- 文件大小: 869KB
- Git: f6e428f
