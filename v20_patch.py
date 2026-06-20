#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# V20 patch script: enrich ch4-ch12 story content

import re

with open('龙途_手机试玩版_V20.html', 'r', encoding='utf-8') as f:
    content = f.read()

# ============================================================
# 1. REPLACE STORY ARRAY (ch4-ch12 sections)
# ============================================================

old_story_end = content.find('  // ─── Chapter 4: Misty Hollow')
if old_story_end == -1:
    print("ERROR: Could not find ch4 start marker")
    exit(1)

# Find the closing ]; of STORY array
story_start = content.find('var STORY = [')
if story_start == -1:
    print("ERROR: Could not find 'var STORY = ['")
    exit(1)

# Find the matching ]; for STORY array
# We need to find the ] that closes var STORY = [
bracket_count = 0
story_end = -1
in_string = False
escape_next = False
i = story_start + len('var STORY = [')
for j in range(i, len(content)):
    c = content[j]
    if escape_next:
        escape_next = False
        continue
    if c == '\\' and in_string:
        escape_next = True
        continue
    if c == '"' or c == "'":
        if not in_string:
            in_string = c
        elif in_string == c:
            in_string = False
        continue
    if not in_string:
        if c == '[':
            bracket_count += 1
        elif c == ']':
            if bracket_count == 0:
                story_end = j
                break
            bracket_count -= 1

if story_end == -1:
    print("ERROR: Could not find end of STORY array")
    exit(1)

print(f"STORY array: {story_start} to {story_end}")

# Build new STORY content (keeping ch1-ch3, replacing ch4-ch12)
# First, extract ch1-ch3 portion
ch1_start = content.find('  {', story_start)
# Find the line that contains 'ch4_mist' id
ch4_marker = content.find("    id: 'ch4_mist'", story_start)
if ch4_marker == -1:
    print("ERROR: Could not find ch4_mist marker")
    exit(1)

ch1_ch3 = content[story_start:ch4_marker].rstrip()

# New ch4-ch12 content
new_ch4_to_ch12 = '''
  // ─── Chapter 4: Misty Hollow (Lv 10-20) ───
  {
    id: 'ch4_mist_enter',
    chapter: '第四章',
    title: '迷雾深渊·入谷',
    entry: '击败矿洞首领后,你发现了一本布满尘埃的日志。日志提到了一处叫「雾隐谷」的地方,那里据传是精灵族失落的家园遗址。日志的最后一页被撕掉了,只留下一行字:「唯有真诚之心,才能穿过迷雾。」\\n\\n你站在雾隐谷的入口。雾气像活物一样蠕动着,阳光无法穿透。风从谷中吹来,带着淡淡的甜味——像某种花粉,又像是……记忆。',
    objectives: [
      { id:'ch4_talk_mist', desc:'与雾中精灵交谈', type:'talk_to_npc', npc:'mist_spirit' },
      { id:'ch4_find_clue1', desc:'在谷口找到破损的精灵石碑', type:'find_clue', clueId:'clue_elf_stele' },
      { id:'ch4_reach_lv10', desc:'达到10级再深入', type:'reach_level', level:10 }
    ],
    next: 'ch4_mist_deep',
    reward: { xp:150, gold:100 }
  },
  {
    id: 'ch4_mist_deep',
    chapter: '第四章',
    title: '迷雾深渊·精灵遗迹',
    entry: '雾中精灵告诉你,雾隐谷曾经是精灵族的圣地。千年前,暗影第一次蔓延时,精灵们在这里设置了三座符文石阵,用来净化暗影。\\n\\n「但是,」她抬头看着你,眼神中带着某种古老的悲伤,「三座石阵中,有两座已经失效了。只剩下最后一座,就在谷的最深处。」\\n\\n你在谷中探索时,无意间踢到了什么东西——是一具骷髅,穿着早已腐朽的黑色铠甲。胸甲上刻着一个符号:黑铁兄弟会的徽记。',
    objectives: [
      { id:'ch4_visit_ruins', desc:'探索精灵遗迹', type:'visit_location', location:'misthollow' },
      { id:'ch4_win8', desc:'击败8只暗影迷雾兽', type:'win_battles', count:8 },
      { id:'ch4_find_clue2', desc:'找到黑铁兄弟会的日志', type:'find_clue', clueId:'clue_blackiron_log' }
    ],
    next: 'ch4_mist_choice',
    reward: { xp:200, gold:120 }
  },
  {
    id: 'ch4_mist_choice',
    chapter: '第四章',
    title: '迷雾深渊·符文抉择',
    entry: '精灵遗迹的尽头,三座符文石阵出现在你面前。两座已经黯淡无光,只有最后一座还在微弱地闪烁。\\n\\n雾中精灵说:「三座石阵对应三条道路——力量、智慧、自然。触摸其中一座,它将赋予你永久的加护。但代价是……你只能选择一条路。」\\n\\n符文石散发着不同颜色的光芒,在浓雾中格外醒目。',
    objectives: [
      { id:'ch4_make_choice', desc:'在符文石阵前做出选择', type:'make_choice', choiceId:'ch4_mist' },
      { id:'ch4_defeat_boss', desc:'击败雾隐守护者', type:'defeat_boss', location:'misthollow' },
      { id:'ch4_find_treasure', desc:'在石阵深处找到宝箱', type:'find_treasure', location:'misthollow' }
    ],
    next: 'ch5_jade_enter',
    reward: { xp:250, gold:150 }
  },
  // ─── Chapter 5: Jade Marsh (Lv 15-25) ───
  {
    id: 'ch5_jade_enter',
    chapter: '第五章',
    title: '翡翠沼泽·毒瘴',
    entry: '离开雾隐谷时,雾中精灵塞给你一片晶莹的叶子。「拿着它,去翡翠沼泽。那里的毒气……普通人是受不了的。」\\n\\n翡翠沼泽。曾经是精灵族的花园,如今却是一片被黑魔法侵蚀的死亡之地。你屏住呼吸踏入沼泽,绿色的水面泛着诡异的荧光。\\n\\n远处,一座半沉没的精灵神庙露出了水面。而更远处,有什么东西在沼泽深处发光——绿色的,像一只巨大的眼睛。',
    objectives: [
      { id:'ch5_talk_witch', desc:'与沼泽巫医交谈,获取解毒药剂', type:'talk_to_npc', npc:'swamp_witch' },
      { id:'ch5_visit_marsh', desc:'穿越翡翠沼泽', type:'visit_location', location:'jademarsh' },
      { id:'ch5_reach_lv15', desc:'达到15级', type:'reach_level', level:15 }
    ],
    next: 'ch5_jade_temple',
    reward: { xp:200, gold:150 }
  },
  {
    id: 'ch5_jade_temple',
    chapter: '第五章',
    title: '翡翠沼泽·沉没神殿',
    entry: '沼泽巫医的解毒药剂让你能在毒气中呼吸。你朝着那座半沉没的神庙走去。\\n\\n神庙内部已经大部分被水淹没。你在齐腰深的水中跋涉,忽然踩到了什么东西——是台阶。台阶向下延伸,通往水下的更深处。\\n\\n在水下,你看到了令人震撼的景象:一座完整的精灵神殿,被绿色的结界保护着,丝毫没有渗水。殿中央,放着一颗跳动的绿色心脏——翡翠之心。',
    objectives: [
      { id:'ch5_explore_temple', desc:'探索沉没的神庙', type:'visit_location', location:'jademarsh' },
      { id:'ch5_win10', desc:'击败10只沼泽变异生物', type:'win_battles', count:10 },
      { id:'ch5_find_jade_heart', desc:'取得翡翠之心', type:'find_clue', clueId:'clue_jade_heart' }
    ],
    next: 'ch5_jade_choice',
    reward: { xp:300, gold:200 }
  },
  {
    id: 'ch5_jade_choice',
    chapter: '第五章',
    title: '翡翠沼泽·心之抉择',
    entry: '你拿到了翡翠之心。它在我手中微微跳动,像一颗真正的心脏。\\n\\n突然,神庙开始震动。结界出现了裂痕,毒水涌了进来。一个声音在水中回响:「将心归还于地,或带走它……你的选择将决定这片沼泽的命运。」\\n\\n你看了看翡翠之心,又看了看正在崩塌的神庙。时间不多了。',
    objectives: [
      { id:'ch5_make_choice', desc:'对翡翠之心做出抉择', type:'make_choice', choiceId:'ch5_jade' },
      { id:'ch5_escape', desc:'从崩塌的神庙中逃脱', type:'visit_location', location:'jademarsh' },
      { id:'ch5_reach_lv18', desc:'达到18级', type:'reach_level', level:18 }
    ],
    next: 'ch6_sunspire_enter',
    reward: { xp:350, gold:250 }
  },
  // ─── Chapter 6: Sunspire (Lv 20-30) ───
  {
    id: 'ch6_sunspire_enter',
    chapter: '第六章',
    title: '日冕高塔·学术之都',
    entry: '带着翡翠之心(或者它的碎片,取决于你的选择),你来到了南方的学术之都——日冕塔。\\n\\n这座城市与你所见过的任何地方都不同。高耸的白色塔楼直插云霄,学者们穿着蓝色长袍在街道上匆匆走过,每个人都在低声讨论着什么。\\n\\n你在城门口被拦下了。守卫仔细端详着你手中的翡翠之心,然后二话不说,带你去了最高的那座塔——大贤者伊兰的居所。',
    objectives: [
      { id:'ch6_talk_ilan', desc:'与大贤者伊兰交谈', type:'talk_to_npc', npc:'sage_ilan' },
      { id:'ch6_visit_sunspire', desc:'参观日冕高塔', type:'visit_location', location:'sunspire' },
      { id:'ch6_reach_lv20', desc:'达到20级', type:'reach_level', level:20 }
    ],
    next: 'ch6_sunspire_research',
    reward: { xp:250, gold:200 }
  },
  {
    id: 'ch6_sunspire_research',
    chapter: '第六章',
    title: '日冕高塔·古代文献',
    entry: '大贤者伊兰认出了翡翠之心。「这是精灵文明鼎盛时期的造物,」她轻声说,「它可以净化暗影……但需要一个足够纯净的宿主。」\\n\\n她带你去了日冕塔的禁书库。那里收藏着第一纪元留下的文献——关于暗影起源、关于龙族陨落、关于三个封印点的真相。\\n\\n「你要去龙域,」伊兰合上一本厚重的古籍,「但通往龙域的道路已经被风暴封锁。你必须先穿越风暴角。」',
    objectives: [
      { id:'ch6_read_scrolls', desc:'阅读第一纪元文献', type:'find_clue', clueId:'clue_first_age' },
      { id:'ch6_talk_captain', desc:'与风暴船长交谈,了解风暴角的情况', type:'talk_to_npc', npc:'captain_storm' },
      { id:'ch6_win5', desc:'在日冕塔周围击败5只暗影生物', type:'win_battles', count:5 }
    ],
    next: 'ch6_sunspire_choice',
    reward: { xp:350, gold:250 }
  },
  {
    id: 'ch6_sunspire_choice',
    chapter: '第六章',
    title: '日冕高塔·临行抉择',
    entry: '出发前夜,伊兰为你举行了一场送别仪式。但她私下对你说了一句话:「如果……我是说如果,你在龙域发现了暗影的真相,而这个真相会毁掉你现在所相信的一切——你会怎么做?」\\n\\n你还没来得及回答,她就消失了。只留下桌上的一封信,上面写着:「此信到达风暴角时开启。」\\n\\n风暴角的风暴在远处咆哮,你握紧了翡翠之心。',
    objectives: [
      { id:'ch6_make_choice', desc:'在临行前做出选择', type:'make_choice', choiceId:'ch6_sunspire' },
      { id:'ch6_visit_stormcape', desc:'前往风暴角', type:'visit_location', location:'stormcape' },
      { id:'ch6_reach_lv25', desc:'达到25级', type:'reach_level', level:25 }
    ],
    next: 'ch7_dragon_enter',
    reward: { xp:400, gold:300 }
  },
  // ─── Chapter 7-12: Dragon Domain ───
  {
    id: 'ch7_dragon_enter',
    chapter: '第七章',
    title: '龙之门槛·边境',
    entry: '风暴角的尽头,北方的荒原在你面前展开。狂风夹杂着雪花,气温骤降。\\n\\n龙域边境的守卫认出了你手中的翡翠之心。「你要去龙神殿?」守卫的声音变得低沉,「那里已经沦陷了。暗影从北方蔓延,龙族要么逃走了,要么……被感染了。」\\n\\n他递给你一块龙鳞,还带着微温。「如果你遇到了一头叫霜翼的巨龙……告诉它,边境守卫还在坚守。」',
    objectives: [
      { id:'ch7_visit_dragonreach', desc:'抵达龙域边境', type:'visit_location', location:'dragonreach' },
      { id:'ch7_talk_karis', desc:'与龙族后裔卡里斯交谈', type:'talk_to_npc', npc:'karis' },
      { id:'ch7_talk_eric', desc:'与人类指挥官埃里克交谈', type:'talk_to_npc', npc:'eric' }
    ],
    next: 'ch7_dragon_choice',
    reward: { xp:350, gold:250 }
  },
  {
    id: 'ch7_dragon_choice',
    chapter: '第七章',
    title: '龙之门槛·阵营抉择',
    entry: '卡里斯和埃里克对如何处理暗影有截然不同的看法。\\n\\n卡里斯认为,暗影是龙族的宿敌,必须用龙族的方式解决——找到暗影的源头,用龙火将它烧尽。埃里克则认为,暗影是一种瘟疫,需要用人类的战术和纪律来隔离和清除。\\n\\n「选边站队的时候到了,」卡里斯盯着你,「你手里拿着翡翠之心。它选择的是哪一边?」',
    objectives: [
      { id:'ch7_make_choice', desc:'在龙族与人类之间做出选择', type:'make_choice', choiceId:'ch7_dragon' },
      { id:'ch7_visit_icereef', desc:'探索冰礁港', type:'visit_location', location:'icereef' },
      { id:'ch7_reach_lv28', desc:'达到28级', type:'reach_level', level:28 }
    ],
    next: 'ch8_temple_enter',
    reward: { xp:450, gold:350 }
  },
  {
    id: 'ch8_temple_enter',
    chapter: '第八章',
    title: '龙神殿·废墟',
    entry: '冰礁港的幸存者告诉你,霜翼巨龙还困在龙神殿深处。它或许还保留着最后的理智。\\n\\n龙神殿的巨门已经半开。曾经的圣地如今只剩下沉默的龙形雕像和蔓延的暗影。你点燃火把,踏入这座曾经辉煌的圣殿。\\n\\n墙上的龙形浮雕已经残缺不全,有些被砸碎了,有些被暗影覆盖。但最令你不安的是——你听到了呼吸声。巨大的、沉重的呼吸声,从神殿深处传来。',
    objectives: [
      { id:'ch8_visit_temple', desc:'进入龙神殿', type:'visit_location', location:'dragontemple' },
      { id:'ch8_talk_spirit', desc:'与古龙之魂对话', type:'talk_to_npc', npc:'ancient_dragon_spirit' },
      { id:'ch8_win10', desc:'击败10只被暗影感染的龙族守卫', type:'win_battles', count:10 }
    ],
    next: 'ch8_temple_boss',
    reward: { xp:500, gold:400 }
  },
  {
    id: 'ch8_temple_boss',
    chapter: '第八章',
    title: '龙神殿·霜翼',
    entry: '神殿最深处的殿堂,霜翼巨龙蜷缩在那里。它的翅膀已经有一半变成了暗影的黑色,眼睛也只剩一只还保持着龙族的金色。\\n\\n「你来了,」它的声音直接在你的脑海中响起,「我等了很久了。那个拿翡翠之心的人……你终于来了。」\\n\\n它伸出一只巨爪,爪心中躺着一片龙鳞。「带着这片鳞去灰烬平原。那里有一座火山,是第一纪元终结的地方……也是暗影诞生的地方。」',
    objectives: [
      { id:'ch8_defeat_boss', desc:'击败被暗影腐蚀的霜翼分身', type:'defeat_boss', location:'dragontemple' },
      { id:'ch8_get_scale', desc:'取得霜翼龙鳞', type:'find_clue', clueId:'clue_frost_scale' },
      { id:'ch8_reach_lv30', desc:'达到30级', type:'reach_level', level:30 }
    ],
    next: 'ch9_ash_enter',
    reward: { xp:600, gold:450 }
  },
  {
    id: 'ch9_ash_enter',
    chapter: '第九章',
    title: '灰烬平原·焦土',
    entry: '霜翼留下的龙鳞在你胸口微微发烫。你按照它的指引,来到了灰烬平原。\\n\\n这里一望无际。地面上覆盖着厚厚的火山灰,每走一步都会扬起灰色的尘埃。远处,一座活火山正在喷发,岩浆映红了半边天空。\\n\\n「第一纪元终结于一场大火。」你在日冕塔读到的这句话,在这里有了全新的意义。这就是那个「大火」的遗迹吗?',
    objectives: [
      { id:'ch9_visit_ash', desc:'穿越灰烬平原', type:'visit_location', location:'ashplains' },
      { id:'ch9_talk_wanderer', desc:'与灰烬行者交谈', type:'talk_to_npc', npc:'ash_wanderer' },
      { id:'ch9_reach_lv35', desc:'达到35级', type:'reach_level', level:35 }
    ],
    next: 'ch9_ash_volcano',
    reward: { xp:500, gold:400 }
  },
  {
    id: 'ch9_ash_volcano',
    chapter: '第九章',
    title: '灰烬平原·火山口',
    entry: '灰烬行者告诉你,火山的喷发不是自然现象。「有人在火山深处进行某种仪式,」他说,「暗影的源头不在龙神殿。它在这座火山的最深处。每一次喷发,都让暗影更接近地面。」\\n\\n你爬上火山口。岩浆的炽热让你汗流浃背。在火山口边缘,你看到了令人震惊的景象——岩浆之中,有什么东西在涌动。炽热的岩壁上刻满了你不认识的符文。',
    objectives: [
      { id:'ch9_explore_volcano', desc:'探索火山口', type:'visit_location', location:'volcano' },
      { id:'ch9_win15', desc:'在火山口击败15只熔岩元素', type:'win_battles', count:15 },
      { id:'ch9_find_clue', desc:'解读岩壁上的符文', type:'find_clue', clueId:'clue_volcano_runes' }
    ],
    next: 'ch10_volcano_deep',
    reward: { xp:700, gold:500 }
  },
  {
    id: 'ch10_volcano_deep',
    chapter: '第十章',
    title: '深渊火口·地底裂缝',
    entry: '岩壁上的符文告诉你一个惊人的真相:暗影不是天然存在的力量。它是被创造出来的。\\n\\n第一纪元,龙族和精灵族联合创造了一种力量,用来对抗一个更强大的敌人。那种力量就是暗影。但暗影失控了,它反噬了创造者。\\n\\n「钥匙在深渊之门,」符文的最后一行写道,「只有用龙族和精灵的力量同时开启,才能重新封印暗影。」\\n\\n地面突然裂开。一条通往地底的裂缝出现在你面前。',
    objectives: [
      { id:'ch10_enter_abyss', desc:'进入地底裂缝', type:'visit_location', location:'abyssgate' },
      { id:'ch10_talk_seer', desc:'与炎先知交谈', type:'talk_to_npc', npc:'flame_seer' },
      { id:'ch10_reach_lv40', desc:'达到40级', type:'reach_level', level:40 }
    ],
    next: 'ch10_volcano_boss',
    reward: { xp:800, gold:600 }
  },
  {
    id: 'ch10_volcano_boss',
    chapter: '第十章',
    title: '深渊火口·守护者',
    entry: '地底裂缝的尽头,是一个巨大的洞穴。洞穴中央,一座石桥横跨在无底的深渊之上。\\n\\n石桥的另一端,站着一头巨大的熔岩巨兽——火山守护者。它的身体由凝固的岩浆构成,每走一步,地面都在震动。\\n\\n「钥匙……」它的声音像岩浆翻涌,「你还没有资格拿走钥匙……」',
    objectives: [
      { id:'ch10_defeat_boss', desc:'击败火山守护者', type:'defeat_boss', location:'volcano' },
      { id:'ch10_get_key', desc:'取得深渊之门钥匙', type:'find_clue', clueId:'clue_abyss_key' },
      { id:'ch10_find_treasure', desc:'在守护者巢穴找到宝箱', type:'find_treasure', location:'volcano' }
    ],
    next: 'ch11_abyss_enter',
    reward: { xp:1000, gold:700 }
  },
  {
    id: 'ch11_abyss_enter',
    chapter: '第十一章',
    title: '深渊之门·入口',
    entry: '你拿到了深渊之门的钥匙。这是一把由凝固的暗影和龙鳞熔铸而成的奇特钥匙,拿在手里时,你会听到低语声。\\n\\n深渊之门位于灰烬平原的最深处。当你走近时,门上的符文开始发光——不是红色,而是紫色。暗影的紫色。\\n\\n门缓缓打开。黑暗从门缝中涌出,带着刺骨的寒意。你点燃火把,踏入了黑暗。',
    objectives: [
      { id:'ch11_visit_abyss', desc:'进入深渊之门', type:'visit_location', location:'abyssgate' },
      { id:'ch11_talk_gatekeeper', desc:'与深渊守门人交谈', type:'talk_to_npc', npc:'gatekeeper_abyss' },
      { id:'ch11_reach_lv50', desc:'达到50级', type:'reach_level', level:50 }
    ],
    next: 'ch11_abyss_choice',
    reward: { xp:900, gold:650 }
  },
  {
    id: 'ch11_abyss_choice',
    chapter: '第十一章',
    title: '深渊之门·动机抉择',
    entry: '深渊守门人是一个没有面孔的影子。「你来了,」它的声音从四面八方传来,「在你继续之前,我必须问你一个问题。」\\n\\n「你是为了拯救这个世界,还是为了证明自己?」\\n\\n深渊中回荡着这个问题。你想起了这一路上的所有人——白城的罗兰德、铁岭的汉克、雾中精灵、大贤者伊兰……你是为了他们吗?还是为了你自己?',
    objectives: [
      { id:'ch11_make_choice', desc:'回答守门人的问题', type:'make_choice', choiceId:'ch11_abyss' },
      { id:'ch11_enter_shadow', desc:'进入暗影领域', type:'visit_location', location:'shadowrealm' },
      { id:'ch11_win20', desc:'在深渊中击败20只暗影生物', type:'win_battles', count:20 }
    ],
    next: 'ch12_throne_enter',
    reward: { xp:1200, gold:800 }
  },
  {
    id: 'ch12_throne_enter',
    chapter: '第十二章',
    title: '王者宝座·暗影领域',
    entry: '暗影领域比你想像的更加……美丽。\\n\\n这里没有你想象中的黑暗和恐怖。相反,这里是一片紫色的原野,天空中漂浮着暗影的光点,像萤火虫一样。远处,一座由黑色水晶筑成的王座矗立在平原中央。\\n\\n「欢迎来到我的领域,」一个声音在你脑海中响起,「我是暗影龙王。也是……第一纪元的创造者之一。」\\n\\n你愣住了。创造者?',
    objectives: [
      { id:'ch12_visit_throne', desc:'前往暗影王座', type:'visit_location', location:'throneofages' },
      { id:'ch12_talk_dragon', desc:'与暗影龙王对话', type:'talk_to_npc', npc:'shadow_dragon' },
      { id:'ch12_reach_lv60', desc:'达到60级', type:'reach_level', level:60 }
    ],
    next: 'ch12_throne_final',
    reward: { xp:1500, gold:1000 }
  },
  {
    id: 'ch12_throne_final',
    chapter: '第十二章',
    title: '王者宝座·最终抉择',
    entry: '暗影龙王告诉你真相:暗影确实是最初的创造者之一。但它在第一纪元末期被背叛了——被它自己的同伴。\\n\\n「他们把我封印在这里,」暗影龙王的声音中带着千年积累的悲伤,「因为我发现了暗影的终极秘密——它可以毁灭,也可以创造。我的同伴们只看到了它的毁灭面。」\\n\\n「现在,选择在你手中。杀死我,暗影将永远消失,但这个世界的生命力也会随之枯竭。或者……接受我,让暗影与光明共存。」',
    objectives: [
      { id:'ch12_make_choice', desc:'对暗影龙王做出最终抉择', type:'make_choice', choiceId:'ch12_final' },
      { id:'ch12_defeat_boss', desc:'与暗影龙王决战(如果选择战斗)', type:'defeat_boss', location:'throneofages' },
      { id:'ch12_find_ending', desc:'见证结局', type:'find_clue', clueId:'clue_true_ending' }
    ],
    next: null,
    reward: { xp:3000, gold:2000 }
  }
'''

# Replace ch4 to end of STORY array
new_story_content = ch1_ch3.rstrip() + new_ch4_to_ch12.lstrip()

# Now replace in content
content = content[:ch4_marker] + new_story_content + content[story_end:]

print("STORY array updated successfully!")
print(f"New content length: {len(new_story_content)} chars")

# Write output
with open('龙途_手机试玩版_V20.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("V20 patch applied successfully!")
