# V7 Bug修复任务总结

## 目标
修复用户提出的9项问题（原11项，合并后9项），从P0到P2逐一排查根因并修复。

## 修复清单

### P0 已修
1. **#10 战败后按钮消失卡死** → 根因：V4模板CSS中 `.battle-result { display: none; }` (legacy兼容代码)把战败结果div隐藏，后面的覆盖样式优先级不足。修复：删除legacy display:none块。
2. **#6 任务进度地点错误** → 根因：endBattle()遍历G.quests时无地点过滤，坠星湖畔战斗也更新幽暗森林任务。修复：加 `q.location === G.location` 检查。

### P1 已修
3. **#3 地图格子太小(40px)** → 重写renderGridMap，格子64px，全格pattern填充替代emoji。
4. **#4 地形不匹配（碎石路显示🌿）** → stone/grass/water全格pattern纹理填充，视觉与desc一致。
5. **#5 背包tab位置** → tab移到已穿戴装备区之后、物品列表之前。
6. **#7 物品数量颜色** → 数量分离为独立span，用`#7ec8e3`颜色显示。
7. **#8 背包默认装备tab** → `G._invTab` 默认值从'all'改为'equipment'。
8. **#9 状态界面** → scenePlayerInfo()新增HP/MP条（带颜色百分比条）和状态效果标签区。

### P2 已修
9. **#1 轻量教程** → 首次进入城镇显示新手指引气泡（建筑功能简介），仅显示一次。
10. **#2 badge位置** → 城主厅/公会badge移到建筑卡片右侧（与箭头同行），不再嵌在名称内。

## 产出
- `龙途_手机试玩版_V7.html` (416KB) — 5项验证全通过，JS语法OK
- `game_v5.js` — 代码已更新
- `龙途_手机试玩版_V4.html` — CSS模板已更新（legacy display:none删除、bld-badge样式调整）

## 关键决策
- 地图渲染改为SVG pattern全格填充（pWater波浪/pGrass草纹/pStone碎石），参考市面roguelike风格
- 状态界面HP/MP条用position:absolute叠加数值文本，血条颜色根据百分比变化(>50%绿/>25%橙/≤25%红)
- 教程用一次性气泡(G._townTutorialDone标记)，不打断游戏节奏

## 进度卡更新
战斗92% | 装备90% | 故事30% | 探索78% | 商贸60% | 迷宫60% | 世界30% | 任务15% | 好感40% | 赌博100% | 深潜0% | GDD约45%
