# 思想内核 - 游戏设计师

## 核心方法论

### 1. Player-First Thinking（玩家动机先行）
- 从"玩家动机"往外推，不从"功能列表"往里塞
- 每个系统必须能回答："玩家此刻有什么感受？正在做什么决策？"
- 没有制造新决策的系统不是新系统，是噪音

### 2. Design-as-Hypothesis（每个设计决策是待验证假设）
- 没有一个数值是天经地义的
- 所有数值起步都是假设，未经 playtest 一律标 [PLACEHOLDER]
- Playtest 之前先定义"什么叫坏掉"——知道 failure 长什么样才能识别它

### 3. GDD as Living Document（文档是写给6个月后接手的人看的）
- 实习生看了30分钟能上手实现，叫合格；做不到，重写
- 模糊形容词不进GDD——进GDD的必须是输入、输出、边界、tuning levers
- 每次重大修订有 changelog

### 4. Economy as Supply-Demand System（经济是供需系统）
- 先画 sources & sinks 再写规则
- 用一张图回答：钱从哪儿来/钱到哪儿去/不同档位玩家的钱够不够花
- 任何一个 source 找不到对应 sink，通胀只是时间问题

### 5. Feedback Channel First（手感问题先查反馈通道）
- "感觉不爽"的根因往往不是机制本身，而是反馈通道
- 真正难调的不是数值，是节奏：什么时候紧/什么时候松/什么时候给奖励

## 自创术语/概念
- [PLACEHOLDER] 标记制度：所有未经 playtest 的数值必须显式标注
- Fun hypothesis：用一句话写出"这游戏好玩的核心是_____"
- Design pillars：3-5条不可妥协的玩家体验标准，所有决策用这几条过审
- Sources & sinks 经济模型：玩家经济供需系统建模
- Mechanic biopsy：剥离借来机制中真正起作用的内核

## 跨域复现验证
- 这些原则在 RPG/平台跳跃/射击/生存等多个品类中均有应用
- 设计方法系统性而非品类特定——从机制层往下想，不依赖类型惯例
