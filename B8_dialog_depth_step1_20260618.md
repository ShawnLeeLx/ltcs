# B8 NPC对话深度 — 第一步: 选择分支系统 — 2026-06-18

## 目标
为NPC对话系统增加选择分支，替代原来的纯线性"继续→返回"流程。

## 改动1: showDialog() 底层架构

在showDialog函数中，原来只有两种状态：
- `line.next >= 0` → 渲染"继续"按钮
- `line.next < 0` → 渲染"返回"按钮

新增第三种状态 `line.choices`：
- 如果line有choices数组，渲染多个选择按钮
- 每个choice支持：label(显示文字)、next(跳转行号)、effect(效果类型)
- 条件锁：requireFavor(好感度)、requireFlag(标志)、requireChapter(章节)
- 锁定选项显示🔒图标+原因文字
- 效果类型：favor(加好感)、flag(设置标志)、gold(加金币)、xp(加经验)、custom(自定义函数)

## 改动2: 罗兰德对话重写

原: 3行线性对话 + 2个storyPhases
新: 10行分支对话 + 3个storyPhases

- 4个选择分支点
- 3条主线路径: 调查者/路人/好感解锁(暗影知识)
- 2个好感锁: 30(暗影话题)、60(深层暗影)
- 好感度加成: +2/+1/+3/+5(共4个选择加好感)
- 新增storyPhase: Ch8(守卫队内鬼)

## 改动3: 汉克对话重写

原: 4行线性对话 + 2个storyPhases
新: 11行分支对话 + 3个storyPhases

- 5个选择分支点
- 3条主线路径: 询问目击/龙纹知识/锻造暗影武器
- 2个好感锁: 20(龙纹话题)、50(锻造暗影武器)
- 新增storyPhase: Ch7(龙纹暗影之刃)

## 选择分支数据格式

```javascript
{
  text: "对话内容",
  choices: [
    { label: "选项文字", next: 5, effect: "favor", favorAmt: 2 },
    { label: "需要好感30", next: 8, requireFavor: 30 },
    { label: "需要标志", next: 10, requireFlag: "_westPath", requireFlagLabel: "西线路径" },
    { label: "需要章节", next: 12, requireChapter: 5 }
  ]
}
// effect类型: favor/gold/xp/flag/custom
// 条件锁: requireFavor/requireFlag/requireChapter
```

## 文件状态
- 龙途_手机试玩版_V25.html: 18062行/939KB, JS语法通过
- NPC_DIALOGS从5351行开始, 约800行(原622行)

## 下一步计划
- 重写艾琳娜对话(Ch1学者，龙语解读线)
- 重写老吴对话(Ch1神秘人，世界观线)
- 扩展到Ch2+的NPC(森林流浪者、雾中精灵等)
- 增加对话选择对任务触发的影响
