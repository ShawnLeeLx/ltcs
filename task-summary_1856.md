# V8 三项反馈修复

## 目标
修复用户3项反馈：HP条颜色、格子大小与滚动、人物自动居中。

## 修复内容

### 1. HP条改为红色
- 位置：scenePlayerInfo() 中的HP/MP条
- 改动：`hpColor` 从三段变色(绿/橙/红)改为固定 `#e74c3c`(红色)
- MP条保持蓝色不变

### 2. 格子大小恢复44px + 修复滚动不一致
- 格子从64px恢复到44px（V4/V5的舒适大小）
- gap从3改为2
- iconSize从22降回16适配小格子
- **关键修复**：删除CSS `.mini-svg { max-height: 300px }`，此限制会把SVG压缩导致格子大小不一致（大地图被压缩、小地图不压缩，视觉上格子大小变化）
- SVG使用固定px尺寸渲染，不再被max-height压缩

### 3. 移动后自动居中人物
- 新增 `scrollToPlayer()` 函数：计算玩家格子位置，scrollTo居中，带smooth动画
- 在 `renderMiniMap()` 末尾调用 `scrollToPlayer()`
- clickGridCell和moveGrid移动后都走renderMiniMap()，所以每次移动都会自动居中
- 替换了原来无动画的scrollLeft/scrollTop直接赋值

## 产出
- `龙途_手机试玩版_V8.html` (416KB)，5项验证✅，JS语法✅
- game_v5.js — 3处修改
- 龙途_手机试玩版_V4.html — CSS修改（mini-svg max-height删除）
