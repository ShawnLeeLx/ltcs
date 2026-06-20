// ═══════════════════════════════════════════════════════════
// 龙途传说 v3 — 试玩版核心脚本
// ═══════════════════════════════════════════════════════════

// ── DATA ────────────────────────────────────────────────────

var ORIGINS = [
  {id:'warrior',name:'佣兵',emoji:'⚔',desc:'战场幸存者',str:18,agi:12,int:6,cha:8,luk:6,skill:'战吼',skillDesc:'3回合攻击+20%',weapon:'铁剑',armor:'皮甲'},
  {id:'mage',name:'学徒',emoji:'🔮',desc:'学院逃亡者',str:6,agi:8,int:18,cha:10,luk:8,skill:'奥术感知',skillDesc:'侦测魔法陷阱',weapon:'法杖',armor:'学徒袍'},
  {id:'trader',name:'行商',emoji:'💰',desc:'破产商人',str:6,agi:8,int:10,cha:18,luk:8,skill:'讨价还价',skillDesc:'首笔交易7折',weapon:'短刀',armor:'大衣'},
  {id:'ranger',name:'猎人',emoji:'🏹',desc:'森林猎人',str:10,agi:18,int:6,cha:6,luk:10,skill:'陷阱感知',skillDesc:'可见陷阱',weapon:'猎弓',armor:'皮靴'},
  {id:'gambler',name:'赌徒',emoji:'🎲',desc:'赌桌幸运儿',str:6,agi:8,int:8,cha:6,luk:18,skill:'孤注一掷',skillDesc:'胜则伤害×2，败则自伤30%',weapon:'幸运币',armor:'手套'},
  {id:'cleric',name:'朝圣者',emoji:'🙏',desc:'寻找救赎',str:6,agi:6,int:14,cha:14,luk:10,skill:'祈祷',skillDesc:'每战恢复10%HP',weapon:'圣符',armor:'斗篷'},
];

var ENEMIES = {
  goblin:{name:'哥布林',hp:35,atk:12,emoji:'👺',xp:30,goldMin:8,goldMax:15,ascii:['  /\\_/\ ',' ( o.o)','  > ^ <']},
  goblin2:{name:'哥布林战士',hp:45,atk:16,emoji:'👹',xp:40,goldMin:12,goldMax:20,ascii:['  /\\_/\ ',' ( >.<)',' />█ <\\','  |  |']},
  archer:{name:'哥布林射手',hp:30,atk:14,emoji:'🏹',xp:35,goldMin:10,goldMax:18,ascii:['   O   ','  /|\\','  / >',' /  |']},
  boss:{name:'黑暗学徒',hp:180,atk:28,emoji:'💀',xp:300,goldMin:80,goldMax:150,isBoss:true,ascii:['  _██_ ',' (ಠ_ಠ)',' /|  |\\','/ |  | \\','  ⚡ ⚡']},
};

var SKILLS = [
  {id:'fireArrow',name:'🔥 火焰箭',desc:'35-45火焰伤害',cost:15,dmgMin:35,dmgMax:45},
  {id:'heal',name:'💚 治疗术',desc:'恢复25-35HP',cost:15,healMin:25,healMax:35},
  {id:'iceArmor',name:'❄ 冰甲',desc:'防御+20%',cost:0,passive:true},
  {id:'doubleStrike',name:'⚔ 双击',desc:'攻击两次',cost:12,dmgMin:20,dmgMax:30,hits:2},
  {id:'magicMissile',name:'✨ 魔法飞弹',desc:'3枚各10-15伤害',cost:18,dmgMin:10,dmgMax:15,hits:3},
];

var SHOP = [
  {name:'精钢剑',price:180,atk:25,str:5,slot:'weapon',rarity:'fine',reqLv:3,reqStr:12,desc:'比铁剑锋利多了'},
  {name:'皮胸甲',price:150,def:20,hp:50,slot:'armor',rarity:'fine',reqLv:3,reqStr:10,desc:'不错的防护'},
  {name:'法师长袍',price:280,def:15,mp:40,int:8,slot:'armor',rarity:'rare',reqLv:5,reqInt:15,desc:'智力加成很高'},
  {name:'生命戒指',price:300,hp:80,luk:3,slot:'accessory',rarity:'rare',reqLv:5,desc:'增加生命上限'},
];

var GOODS = [
  {name:'药材',price:15,trend:'up'},
  {name:'铁器',price:8,trend:'down'},
  {name:'丝绸',price:25,trend:'stable'},
];

var NAME_PRE = ['艾','赛','卡','莱','维','安','达','洛','希','菲','索','凯','瑞','莫','伊','诺','泰','格','奥','雷'];
var NAME_SUF = ['瑞','拉','斯','娜','伦','恩','达','尔','克','特','雅','兰','蒂','尔德','里克','昂','丝','薇'];

var LOCATIONS = [
  {id:'lake',name:'坠星湖畔',x:5,y:4,desc:'宁静的湖畔，你醒来之地',connections:['whitecity','darkforest'],enemies:['goblin','goblin2'],unlocked:true},
  {id:'whitecity',name:'白城',x:2,y:2,desc:'繁华的贸易都市',connections:['lake','darkforest','fortress'],enemies:[],isTown:true,unlocked:true},
  {id:'darkforest',name:'幽暗森林',x:5,y:1,desc:'古老的森林，危险重重',connections:['lake','whitecity','mine'],enemies:['goblin2','archer'],unlocked:true},
  {id:'fortress',name:'破碎堡垒',x:0,y:1,desc:'据守的领主招募战士',connections:['whitecity'],enemies:['goblin2'],unlocked:true},
  {id:'mine',name:'暗影矿洞',x:7,y:1,desc:'深邃的矿洞，危险与宝藏并存',connections:['darkforest'],enemies:['goblin2','archer','boss'],unlocked:false},
];

// ── STATE ──────────────────────────────────────────────────

var G = null;

function initGame() {
  G = {
    name: '',
    level: 1, xp: 0, nextXp: 100, gold: 50,
    str: 10, agi: 10, int: 10, cha: 10, luk: 10,
    hp: 80, maxHp: 80, mp: 60, maxMp: 60,
    attrPts: 0, skillPts: 0, skills: [],
    inventory: [], equipment: {}, cargo: [],
    origin: null, inBattle: false, battle: null,
    location: 'lake',
    firstBattleWon: false, marketVisited: false,
    taskAccepted: false, bossDefeated: false,
    selectedTarget: 0,
    totalBattlesWon: 0, totalBattlesLost: 0,
  };
}

// ── UTILS ──────────────────────────────────────────────────

function rand(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function $(id) { return document.getElementById(id); }

function toast(msg, type) {
  var t = $('toast');
  t.textContent = msg;
  t.className = 'toast' + (type ? ' ' + type : '');
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, type === 'lvl' ? 2200 : 1600);
}

function render(html) { $('panel').innerHTML = html; }

function updateStatus() {
  var sb = $('statusBar');
  if (!G.origin) { sb.classList.remove('show'); return; }
  sb.classList.add('show');
  $('dispName').textContent = G.name ? G.name + ' ' : '';
  $('dispLv').textContent = G.level;
  $('dispGold').textContent = G.gold;
  $('dispHp').textContent = G.hp;
  $('dispMhp').textContent = G.maxHp;
  $('dispMp').textContent = G.mp;
  $('dispMmp').textContent = G.maxMp;
  $('dispXp').textContent = G.xp;
  $('dispNxp').textContent = G.nextXp;
  $('dispAp').textContent = G.attrPts;
}

function calcMaxHp() { return 80 + G.str * 5 + (G.equipment.armor ? (G.equipment.armor.hp || 0) : 0); }
function calcMaxMp() { return 60 + G.int * 3 + (G.equipment.armor ? (G.equipment.armor.mp || 0) : 0); }
function calcAtk() {
  var a = 10 + G.str * 2 + G.int;
  if (G.equipment.weapon) a += G.equipment.weapon.atk || 0;
  return a;
}
function calcDef() {
  var d = 5 + G.str;
  if (G.equipment.armor) d += G.equipment.armor.def || 0;
  return d;
}
function calcCrit() { return 5 + G.luk * 0.5; }
function calcDodge() { return G.agi * 0.4; }

function genName() {
  return NAME_PRE[rand(0, NAME_PRE.length - 1)] + NAME_SUF[rand(0, NAME_SUF.length - 1)];
}

function checkEquipReq(item) {
  if (item.reqLv && G.level < item.reqLv) return '需要Lv.' + item.reqLv;
  if (item.reqStr && G.str < item.reqStr) return '需要力量≥' + item.reqStr;
  if (item.reqInt && G.int < item.reqInt) return '需要智力≥' + item.reqInt;
  return null;
}

function doLevelUp() {
  G.level++;
  G.xp -= G.nextXp;
  G.nextXp = 100; // 固定每级100exp，简单线性
  G.attrPts += 3;
  G.skillPts += 1;
  G.maxHp = calcMaxHp();
  G.maxMp = calcMaxMp();
  G.hp = G.maxHp;
  G.mp = G.maxMp;
  toast('⬆️ 升级！Lv.' + G.level, 'lvl');
}

// ── SCENE: INTRO / NAMING ──────────────────────────────────

function sceneIntro() {
  var btns = '';
  for (var i = 0; i < ORIGINS.length; i++) {
    var o = ORIGINS[i];
    btns += '<div class="btn" onclick="selectOrigin(' + i + ')">' +
      '<span class="lbl">' + o.emoji + ' ' + o.name + '</span> — ' + o.desc +
      '<br><span style="color:#5a5a4a;font-size:10px">力' + o.str + ' 敏' + o.agi + ' 智' + o.int + ' 魅' + o.cha + ' 运' + o.luk + ' | 技能「' + o.skill + '」</span>' +
      '</div>';
  }

  render(
    '<div style="text-align:center;padding:20px 0">' +
    '<div style="font-size:24px;color:#d4a017;letter-spacing:4px;margin-bottom:4px">⚔ 龙途传说 ⚔</div>' +
    '<div style="color:#5a5a4a;font-size:11px">命运由你的选择铸造</div>' +
    '</div><hr class="divider">' +
    '<div class="scene">你是谁？选择你的<em>起源</em>——</div><hr class="divider">' +
    '<div class="choices">' + btns + '</div>'
  );
}

function selectOrigin(idx) {
  var o = ORIGINS[idx];
  G.origin = o;
  G.str = o.str; G.agi = o.agi; G.int = o.int; G.cha = o.cha; G.luk = o.luk;
  G.maxHp = calcMaxHp(); G.hp = G.maxHp;
  G.maxMp = calcMaxMp(); G.mp = G.maxMp;
  updateStatus();
  toast(o.emoji + ' 选择「' + o.name + '」');
  sceneNaming();
}

// ── SCENE: NAMING ─────────────────────────────────────────

var _nameDraft = '';

function sceneNaming() {
  _nameDraft = genName();
  renderNaming();
}

function renderNaming() {
  render(
    '<div class="scene"><em>【起名】</em></div>' +
    '<div class="scene">为你的冒险者取一个名字吧。</div>' +
    '<hr class="divider">' +
    '<input class="name-input" id="nameInput" value="' + _nameDraft + '" placeholder="输入名字..." maxlength="8" oninput="updateNameDraft()">' +
    '<div style="text-align:center;margin:8px 0">' +
    '<div class="btn" style="text-align:center" onclick="randomName()">🎲 随机生成</div>' +
    '</div>' +
    '<div class="scene" style="font-size:11px;color:#5a5a4a">这个名字将跟随你的冒险之旅。</div>' +
    '<hr class="divider">' +
    '<div class="confirm-btn" onclick="confirmName()">确认名字</div>'
  );
  setTimeout(function() { var ni = $('nameInput'); if (ni) ni.focus(); }, 50);
}

function updateNameDraft() {
  _nameDraft = $('nameInput').value.substring(0, 8);
}

function randomName() {
  _nameDraft = genName();
  renderNaming();
}

function confirmName() {
  var n = _nameDraft.trim();
  if (!n) { toast('请输入名字'); return; }
  G.name = n;
  toast('欢迎，' + G.name + '！');
  sceneWakeUp();
}

// ── SCENE: WAKE UP + ATTR ALLOC ────────────────────────────

function sceneWakeUp() {
  var o = G.origin;
  var stories = {
    warrior: '战场上尸横遍野，你从死人堆里爬出来。脑海里只有一个念头：活下去。',
    mage: '魔法学院的钟声还在耳边回响。导师说：你的天赋太危险，离开这里。',
    trader: '商队遭袭，货物被劫，你破产了。口袋里只剩几枚金币。',
    ranger: '森林深处，你追一头白鹿追了三天。然后它消失了，你来到了这里。',
    gambler: '赌桌上最后一把，你all in然后赢了。但赢家总是最先被盯上的。',
    cleric: '神庙被焚毁，你活了下来。护身符还在，但你需要一个新的开始。',
  };

  render(
    '<div class="scene"><em>【' + o.name + ' · ' + o.desc + '】</em></div>' +
    '<div class="scene">' + stories[o.id] + '</div>' +
    '<hr class="divider">' +
    '<div class="scene">你站在<em>坠星湖畔</em>，晨雾弥漫。<br>远处传来商队的驼铃声。</div>' +
    '<hr class="divider">' +

    // 分配起源基础属性 + 5点自由点
    '<div class="scene"><em>【分配自由属性点】</em></div>' +
    '<div class="scene" style="font-size:11px;color:#5a5a4a">起源已分配 ' + (o.str + o.agi + o.int + o.cha + o.luk) + ' 点基础属性。你还获得 <em>5点</em> 自由分配。</div>' +
    '<div class="pts-left" id="ptsLeft">剩余：<strong style="font-size:18px">5</strong> 点</div>' +
    buildAttrRows(o) +
    '<div class="confirm-btn" id="confirmAttrBtn" onclick="confirmOriginAttrs()">确认并出发</div>'
  );
}

function buildAttrRows(o) {
  var attrs = [
    { key: 'str', name: '⚔️ 力量', hint: '+2物攻/+5HP', orig: o.str },
    { key: 'agi', name: '🌿 敏捷', hint: '+闪避/+攻速', orig: o.agi },
    { key: 'int', name: '🧙 智力', hint: '+2魔攻/+3MP', orig: o.int },
    { key: 'cha', name: '💬 魅力', hint: '+商店折扣', orig: o.cha },
    { key: 'luk', name: '🎲 幸运', hint: '+会心/+掉落', orig: o.luk },
  ];
  var h = '';
  for (var i = 0; i < attrs.length; i++) {
    var a = attrs[i];
    var val = G['_attr_' + a.key] !== undefined ? G['_attr_' + a.key] : a.orig;
    G['_attr_' + a.key] = val;
    h += '<div class="attr-row">' +
      '<span class="attr-name">' + a.name + '</span>' +
      '<span class="attr-val" id="val_' + a.key + '">' + val + '</span>' +
      '<span class="attr-hint">' + a.hint + '</span>' +
      '<div class="attr-btns">' +
      '<button class="abtn" onclick="adjOriginAttr(\'' + a.key + '\',-1)">−</button>' +
      '<button class="abtn" onclick="adjOriginAttr(\'' + a.key + '\',1)">+</button>' +
      '</div></div>';
  }
  return h;
}

var _originAttrPts = 5;
var _originAttrBase = { str: 0, agi: 0, int: 0, cha: 0, luk: 0 };

function adjOriginAttr(key, delta) {
  var o = G.origin;
  var base = { str: o.str, agi: o.agi, int: o.int, cha: o.cha, luk: o.luk };
  var current = G['_attr_' + key];
  if (delta > 0 && _originAttrPts <= 0) return;
  if (delta < 0 && current <= base[key]) return;
  G['_attr_' + key] += delta;
  _originAttrPts -= delta;
  updateAttrUI();
}

function updateAttrUI() {
  var o = G.origin;
  var attrs = ['str', 'agi', 'int', 'cha', 'luk'];
  for (var i = 0; i < attrs.length; i++) {
    var k = attrs[i];
    var el = $('val_' + k);
    if (el) el.textContent = G['_attr_' + k];
  }
  var ptsEl = $('ptsLeft');
  var btnEl = $('confirmAttrBtn');
  if (ptsEl) ptsEl.innerHTML = '剩余：<strong style="font-size:18px">' + _originAttrPts + '</strong> 点';
  if (btnEl) btnEl.disabled = (_originAttrPts > 0);
}

function confirmOriginAttrs() {
  G.str = G['_attr_str'];
  G.agi = G['_attr_agi'];
  G.int = G['_attr_int'];
  G.cha = G['_attr_cha'];
  G.luk = G['_attr_luk'];
  G.maxHp = calcMaxHp(); G.hp = G.maxHp;
  G.maxMp = calcMaxMp(); G.mp = G.maxMp;
  _originAttrPts = 0;
  updateStatus();
  toast('属性分配完成！出发吧，冒险者！');
  sceneWorldMap();
}

// ── WORLD MAP ──────────────────────────────────────────────

function sceneWorldMap() {
  var loc = G.location;
  var cur = LOCATIONS.find(function(l) { return l.id === loc; });

  // Build ASCII map
  var mapLines = [
    '         ┌─────────────────────────┐',
    '         │    破碎堡垒    幽暗森林   暗影矿洞   │',
    '         │  (堡垒)       (森林)     (矿洞)     │',
    '         │       ★白城★                       │',
    '         │      (白城)                         │',
    '         │              坠星湖畔               │',
    '         │            (湖畔)                   │',
    '         └─────────────────────────┘',
  ];

  var html = '<div class="scene"><em>【世界地图】</em></div>';
  html += '<div class="scene" style="font-size:11px">点击地名即可前往当前位置标记为 <span style="color:#f80">★</span></div>';
  html += '<div class="world-map">';
  html += '  ┌─────────────────────────────────┐<br>';
  html += '  │    破碎堡垒    幽暗森林   暗影矿洞   │<br>';
  html += '  │   <span class="loc" onclick="travel(&quot;fortress&quot;)">[堡垒]</span>  <span class="loc" onclick="travel(&quot;darkforest&quot;)">[森林]</span>  <span class="loc" onclick="travel(&quot;mine&quot;)">[矿洞]</span>  │<br>';
  html += '  │         ★白城★                   │<br>';
  html += '  │        (白城)                    │<br>';
  html += '  │               坠星湖畔           │<br>';
  html += '  │             (湖畔)               │<br>';
  html += '  └─────────────────────────────────┘';
  html += '</div>';

  // Current location
  html += '<div class="scene"><em>当前位置：' + cur.name + '</em><br>' + cur.desc + '</div>';

  // Connections
  html += '<div class="scene" style="font-size:11px;color:#5a5a4a">可前往：';
  for (var i = 0; i < cur.connections.length; i++) {
    var cid = cur.connections[i];
    var target = LOCATIONS.find(function(l) { return l.id === cid; });
    if (target) {
      html += ' <span class="loc" onclick="travel(\'' + cid + '\')">' + target.name + '</span>';
    }
  }
  html += '</div>';

  html += '<hr class="divider"><div class="choices">';

  if (cur.isTown) {
    html += '<div class="btn" onclick="sceneTownMap()">🏰 进入' + cur.name + '</div>';
  }

  if (cur.enemies && cur.enemies.length > 0) {
    html += '<div class="btn" onclick="startFieldBattle()">⚔️ 探索（遭遇战斗）</div>';
  }

  if (G.attrPts > 0) {
    html += '<div class="btn" onclick="sceneAllocAttr()">💪 分配属性点 (' + G.attrPts + '点)</div>';
  }
  if (G.skillPts > 0) {
    html += '<div class="btn" onclick="sceneLearnSkill()">📖 学习技能 (' + G.skillPts + '点)</div>';
  }
  html += '<div class="btn" onclick="sceneInventory()">🎒 背包/装备</div>';
  html += '</div>';

  render(html);
}

function travel(destId) {
  var dest = LOCATIONS.find(function(l) { return l.id === destId; });
  if (!dest) return;
  if (!dest.unlocked) {
    toast('该地点尚未解锁');
    return;
  }
  G.location = destId;
  toast('前往 ' + dest.name);
  sceneWorldMap();
}

// ── TOWN MAP ───────────────────────────────────────────────

function sceneTownMap() {
  var loc = G.location;
  var html = '<div class="scene"><em>【' + loc.name + '】</em></div>';

  // ASCII town map
  html += '<div class="town-map">';
  html += '        ╔═══╗<br>';
  html += '        ║旅店║<br>';
  html += '        ╚═══╝<br>';
  html += '  ╔═══╗          ╔═══╗<br>';
  html += '  ║市场║          ║公会║<br>';
  html += '  ╚═══╝          ╚═══╝<br>';
  html += '        ╔═══╗<br>';
  html += '        ║铁匠║<br>';
  html += '        ╚═══╝<br>';
  html += '      ══ 广场 ══<br>';
  html += '        ↑ 你<br>';
  html += '</div>';

  html += '<div class="scene" style="font-size:11px">点击建筑进入</div>';
  html += '<hr class="divider"><div class="choices">';
  html += '<div class="btn"><span class="lbl">🏪 市场</span> — 买卖货物</div>';
  html += '<div class="btn" onclick="sceneMarket()">  ↳ 进入市场</div>';
  html += '<div class="btn"><span class="lbl">⚒️ 铁匠铺</span> — 修理/购买装备</div>';
  html += '<div class="btn" onclick="sceneSmith()">  ↳ 进入铁匠铺</div>';
  html += '<div class="btn"><span class="lbl">📜 冒险者公会</span> — 接任务</div>';
  html += '<div class="btn" onclick="sceneGuild()">  ↳ 进入公会</div>';
  html += '<div class="btn"><span class="lbl">🍺 旅店</span> — 休息恢复</div>';
  html += '<div class="btn" onclick="sceneInn()">  ↳ 进入旅店</div>';
  html += '<hr class="divider">';
  html += '<div class="btn" onclick="sceneWorldMap()">↩️ 返回城门口</div>';
  html += '</div>';
  render(html);
}

// ── BATTLE ─────────────────────────────────────────────────

function startFieldBattle() {
  var loc = LOCATIONS.find(function(l) { return l.id === G.location; });
  var eids = loc.enemies;
  if (!eids || eids.length === 0) return;

  // Random encounter
  var enemyArr = [
    Object.assign({}, ENEMIES[eids[rand(0, eids.length - 1)]], { curHp: ENEMIES[eids[rand(0, eids.length - 1)]].hp }),
    Object.assign({}, ENEMIES[eids[rand(0, eids.length - 1)]], { curHp: ENEMIES[eids[rand(0, eids.length - 1)]].hp }),
  ];

  G.battle = { enemies: enemyArr, log: [], turn: 0, defending: false, warcry: 0, gamblerUsed: false };
  G.inBattle = true;
  G.selectedTarget = 0;
  renderBattle('⚔️ 遭遇 ' + enemyArr.length + ' 只敌人！');
}

function startBossBattle() {
  var boss = Object.assign({}, ENEMIES.boss, { curHp: ENEMIES.boss.hp });
  var minion = Object.assign({}, ENEMIES.goblin2, { curHp: ENEMIES.goblin2.hp });
  G.battle = { enemies: [boss, minion], log: [], turn: 0, defending: false, warcry: 0, gamblerUsed: false };
  G.inBattle = true;
  G.selectedTarget = 0;
  renderBattle('💀 黑暗学徒出现了！');
}

function selectTarget(idx) {
  G.selectedTarget = idx;
  renderBattle(G.battle.log[G.battle.log.length - 1] || '选择攻击目标');
}

function renderBattle(msg) {
  var b = G.battle;
  var alive = b.enemies.filter(function(e) { return e.curHp > 0; });

  var html = '<div class="scene"><em>【战斗】</em> ' + (msg || '') + '</div>';

  // ASCII art enemies
  for (var i = 0; i < b.enemies.length; i++) {
    var e = b.enemies[i];
    var dead = e.curHp <= 0;
    var sel = (i === G.selectedTarget && !dead);
    var cls = 'enemy-box' + (dead ? ' dead' : '') + (sel ? ' selected' : '');

    html += '<div class="' + cls + '" onclick="' + (dead ? '' : 'selectTarget(' + i + ')') + '">';
    html += '<div class="ascii-art" style="color:' + (dead ? '#333' : e.isBoss ? '#f80' : '#6b8a5a') + '">';
    var art = e.ascii || [' ? ', ' ? ', ' ? '];
    for (var j = 0; j < art.length; j++) {
      html += art[j] + '<br>';
    }
    html += '</div>';
    html += '<div style="display:flex;justify-content:space-between;align-items:center">';
    html += '<span style="font-size:12px;color:' + (dead ? '#444' : e.isBoss ? '#f80' : '#c44') + '">' + e.emoji + ' <strong>' + e.name + '</strong>' + (e.isBoss ? ' 👑' : '') + '</span>';
    html += '<span style="font-size:12px;color:' + (dead ? '#444' : '#c44') + '">' + Math.max(0, e.curHp) + '/' + e.hp + '</span></div>';
    html += '<div class="hpbar"><div class="hpfill" style="width:' + (dead ? 0 : Math.max(1, e.curHp / e.hp * 100)) + '%"></div></div>';
    if (sel) html += '<div style="font-size:10px;color:#d4a017;text-align:center">← 你的目标</div>';
    html += '</div>';
  }

  // Player status
  var hpPct = G.hp > 0 ? Math.max(1, G.hp / G.maxHp * 100) : 0;
  var mpPct = G.mp > 0 ? Math.max(1, G.mp / G.maxMp * 100) : 0;
  var xpPct = G.xp > 0 ? Math.min(100, G.xp / G.nextXp * 100) : 0;

  html += '<hr class="divider">';
  html += '<div style="font-size:12px">❤️ HP ' + G.hp + '/' + G.maxHp + ' ';
  html += '💧 MP ' + G.mp + '/' + G.maxMp + ' ';
  html += '⚔️ 攻击 ' + calcAtk() + '</div>';
  html += '<div class="hpbar"><div class="hpfill" style="width:' + hpPct + '"></div></div>';
  html += '<div class="mpbar"><div class="mpfill" style="width:' + mpPct + '"></div></div>';
  html += '<div style="font-size:11px;color:#5a5a4a">EXP ' + G.xp + '/' + G.nextXp + ' (升级还需 ' + (G.nextXp - G.xp) + ')</div>';
  html += '<div class="xpfbar"><div class="xpfill" style="width:' + xpPct + '"></div></div>';

  // Log
  if (b.log.length > 0) {
    html += '<div style="font-size:11px;color:#7a7a6a;margin-top:4px">' +
      b.log.slice(-2).join('<br>') + '</div>';
  }

  // Check
  if (alive.length === 0) {
    html += '<hr class="divider"><div class="scene" style="text-align:center;font-size:15px">🎉 胜利！</div>';
    html += '<div class="btn confirm-btn" onclick="endBattle()">继续</div>';
    render(html); return;
  }
  if (G.hp <= 0) {
    html += '<hr class="divider"><div class="scene death-text" style="text-align:center">💀 你倒下了...</div>';
    html += '<div class="btn" onclick="sceneDeath()">查看结果</div>';
    render(html); return;
  }

  // Actions
  html += '<hr class="divider">';
  html += '<div style="font-size:11px;color:#5a5a4a;margin-bottom:4px">请选择行动（点击敌人上方选择目标）：</div>';
  html += '<div class="choices">';

  html += '<div class="btn" onclick="playerAttack()">⚔️ 攻击' + (G.selectedTarget < b.enemies.length && b.enemies[G.selectedTarget].curHp > 0 ? ' → ' + b.enemies[G.selectedTarget].name : '') + '</div>';

  if (G.origin.id === 'warrior' && !b.warcry) {
    html += '<div class="btn" onclick="useWarcry()">📢 战吼（攻击+20%×3回合）</div>';
  }
  if (G.origin.id === 'gambler' && !b.gamblerUsed) {
    html += '<div class="btn" onclick="gamblerAttack()">🎲 孤注一掷</div>';
  }
  if (G.skills.indexOf('fireArrow') >= 0) {
    html += '<div class="btn" onclick="playerSkill(\'fireArrow\')">🔥 火焰箭 (15MP)</div>';
  }
  if (G.skills.indexOf('heal') >= 0 || G.origin.id === 'cleric') {
    html += '<div class="btn" onclick="playerSkill(\'heal\')">💚 治疗术 (15MP)</div>';
  }
  html += '<div class="btn" onclick="playerDefend()">🛡️ 防御</div>';
  html += '<div class="btn" onclick="tryFlee()">🏃 逃跑</div>';
  html += '</div>';
  render(html);
}

// ── BATTLE ACTIONS ────────────────────────────────────────

function playerAttack() {
  var b = G.battle;
  var alive = b.enemies.filter(function(e) { return e.curHp > 0; });
  if (alive.length === 0) return;

  var targetIdx = G.selectedTarget;
  if (b.enemies[targetIdx].curHp <= 0) targetIdx = alive[0] ? b.enemies.indexOf(alive[0]) : 0;
  var target = b.enemies[targetIdx];

  var dmg = rand(Math.floor(calcAtk() * 0.8), Math.floor(calcAtk() * 1.2));
  if (b.warcry > 0) dmg = Math.floor(dmg * 1.2);
  var isCrit = Math.random() * 100 < calcCrit();
  if (isCrit) dmg = Math.floor(dmg * 1.5);
  target.curHp -= dmg;

  var logMsg = '⚔️ 攻击 ' + target.name + '，造成 <span style="color:#c44">' + dmg + '</span>' + (isCrit ? ' <span style="color:#f80">会心！</span>' : '');
  b.log.push(logMsg);
  if (b.warcry > 0) b.warcry--;

  setTimeout(function() { enemyTurn(); }, 300);
}

function playerSkill(sid) {
  var sk = SKILLS.find(function(s) { return s.id === sid; });
  if (!sk) return;
  if (G.mp < sk.cost) { toast('💧 MP不足！'); return; }
  G.mp -= sk.cost;
  var b = G.battle;
  var alive = b.enemies.filter(function(e) { return e.curHp > 0; });
  if (alive.length === 0) return;

  if (sid === 'heal') {
    var amt = rand(sk.healMin, sk.healMax);
    G.hp = Math.min(G.maxHp, G.hp + amt);
    b.log.push('💚 治疗术恢复 <span style="color:#5c5">' + amt + '</span> HP');
  } else {
    var targetIdx = G.selectedTarget;
    if (b.enemies[targetIdx].curHp <= 0) targetIdx = alive[0] ? b.enemies.indexOf(alive[0]) : 0;
    var target = b.enemies[targetIdx];
    if (sk.hits) {
      var total = 0;
      for (var i = 0; i < sk.hits; i++) total += rand(sk.dmgMin, sk.dmgMax);
      target.curHp -= total;
      b.log.push(sk.name + ' 命中 ' + target.name + '，造成 <span style="color:#f80">' + total + '</span> 伤害');
    } else {
      var dmg2 = rand(sk.dmgMin, sk.dmgMax);
      target.curHp -= dmg2;
      b.log.push(sk.name + ' 命中 ' + target.name + '，造成 <span style="color:#f80">' + dmg2 + '</span> 伤害');
    }
  }
  updateStatus();
  setTimeout(function() { enemyTurn(); }, 300);
}

function useWarcry() {
  G.battle.warcry = 3;
  G.battle.log.push('📢 战吼！攻击+20%持续3回合');
  setTimeout(function() { enemyTurn(); }, 300);
}

function gamblerAttack() {
  var b = G.battle;
  var winChance = 0.25 + G.luk * 0.02;
  if (Math.random() < winChance) {
    toast('🎲 孤注一掷——胜！');
    var alive = b.enemies.filter(function(e) { return e.curHp > 0; });
    var targetIdx = G.selectedTarget;
    if (b.enemies[targetIdx].curHp <= 0) targetIdx = alive[0] ? b.enemies.indexOf(alive[0]) : 0;
    var target = b.enemies[targetIdx];
    var dmg = Math.floor(calcAtk() * 2.5);
    target.curHp -= dmg;
    b.log.push('🎲 孤注一掷成功！对 ' + target.name + ' 造成 <span style="color:#f80">' + dmg + '</span>！');
  } else {
    toast('🎲 孤注一掷——败！');
    var dmg2 = Math.floor(G.hp * 0.3);
    G.hp = Math.max(1, G.hp - dmg2);
    b.log.push('🎲 孤注一掷失败！自伤 <span style="color:#c44">' + dmg2 + '</span>');
    updateStatus();
  }
  b.gamblerUsed = true;
  setTimeout(function() { enemyTurn(); }, 300);
}

function playerDefend() {
  G.battle.defending = true;
  G.battle.log.push('🛡️ 防御姿态，受伤减半');
  setTimeout(function() { enemyTurn(); }, 300);
}

function tryFlee() {
  var chance = 20 + calcDodge();
  if (Math.random() * 100 < chance) {
    toast('🏃 逃跑成功！');
    G.inBattle = false;
    G.battle = null;
    sceneWorldMap();
  } else {
    toast('❌ 逃跑失败！');
    setTimeout(function() { enemyTurn(); }, 300);
  }
}

function enemyTurn() {
  var b = G.battle;
  var alive = b.enemies.filter(function(e) { return e.curHp > 0; });

  // Cleric passive heal
  if (G.origin.id === 'cleric' && b.turn === 0) {
    var healAmt = Math.floor(G.maxHp * 0.1);
    G.hp = Math.min(G.maxHp, G.hp + healAmt);
    b.log.push('🙏 祈祷恢复 <span style="color:#5c5">' + healAmt + '</span> HP');
  }

  for (var i = 0; i < alive.length; i++) {
    var e = alive[i];
    if (Math.random() * 100 < calcDodge()) {
      b.log.push('🌿 ' + e.name + ' 攻击被你闪避！');
      continue;
    }
    var dmg = rand(Math.floor(e.atk * 0.8), Math.floor(e.atk * 1.2));
    if (b.defending) dmg = Math.floor(dmg * 0.5);
    G.hp = Math.max(0, G.hp - dmg);
    b.log.push(e.emoji + ' ' + e.name + ' 攻击，造成 <span style="color:#c44">' + dmg + '</span>');
  }

  b.turn++;
  b.defending = false;
  updateStatus();
  renderBattle('敌方回合');
}

function endBattle() {
  var b = G.battle;
  G.inBattle = false;
  var isBoss = b.enemies.some(function(e) { return e.isBoss; });

  var totalXp = 0;
  var totalGold = 0;
  for (var i = 0; i < b.enemies.length; i++) {
    var e = b.enemies[i];
    totalXp += e.xp;
    totalGold += rand(e.goldMin, e.goldMax);
  }

  G.xp += totalXp;
  G.gold += totalGold;
  G.totalBattlesWon++;

  // Level up check
  while (G.xp >= G.nextXp) {
    doLevelUp();
  }

  // Drop
  var dropText = '';
  if (Math.random() < 0.35) {
    var drops = [
      { name: '哥布林短剑', atk: 12, str: 3, slot: 'weapon', rarity: 'fine' },
      { name: '哥布林皮甲', def: 8, hp: 20, slot: 'armor', rarity: 'common' },
    ];
    var drop = drops[rand(0, drops.length - 1)];
    G.inventory.push(Object.assign({}, drop, { id: 'drop_' + Date.now() }));
    dropText = '<br>📦 掉落：<span class="rarity-' + drop.rarity + '">' + drop.name + '</span>';
  }

  if (isBoss) G.bossDefeated = true;
  G.battle = null;
  updateStatus();

  if (isBoss) {
    sceneBossVictory(totalXp, totalGold);
  } else {
    var html = '<div class="scene"><em>【战斗胜利】</em></div>';
    html += '<div class="scene">获得 ⭐' + totalXp + ' EXP | 💰' + totalGold + ' 金币' + dropText + '</div>';
    if (G.attrPts > 0) html += '<div class="btn" onclick="sceneAllocAttr()">💪 分配属性点 (' + G.attrPts + '点)</div>';
    if (G.skillPts > 0) html += '<div class="btn" onclick="sceneLearnSkill()">📖 学习技能 (' + G.skillPts + '点)</div>';
    html += '<div class="btn" onclick="sceneWorldMap()">↩️ 返回</div>';
    render(html);
  }
}

function sceneDeath() {
  G.totalBattlesLost++;
  var lossGold = Math.floor(G.gold * 0.1);
  var lossXp = Math.floor(G.xp * 0.2);
  G.gold -= lossGold;
  G.xp -= lossXp;
  if (G.xp < 0) G.xp = 0;

  var html = '<div class="scene death-text" style="text-align:center;font-size:15px">💀 战斗失败</div>';
  html += '<hr class="divider>';
  html += '<div class="scene">你被送回最近的城镇——<em>' + getTownName() + '</em>。</div>';
  html += '<div class="scene" style="color:#c44">损失：- 💰' + lossGold + ' 金币 | - ⭐' + lossXp + ' EXP</div>';
  html += '<div class="scene" style="font-size:11px;color:#5a5a4a">（当前EXP：' + G.xp + '）</div>';
  html += '<hr class="divider>';
  html += '<div class="scene">你重新站了起来，总结经验，准备再战。</div>';
  html += '<div class="btn" onclick="sceneRespawn()">🔄 恢复并继续（在城镇休息后）</div>';
  render(html);
}

function sceneRespawn() {
  G.hp = Math.floor(G.maxHp * 0.5);
  G.mp = Math.floor(G.maxMp * 0.5);
  // Move to nearest town
  var town = LOCATIONS.find(function(l) { return l.isTown && l.unlocked; });
  if (town) G.location = town.id;
  updateStatus();
  sceneTownMap();
}

function getTownName() {
  var town = LOCATIONS.find(function(l) { return l.isTown && l.unlocked; });
  return town ? town.name : '白城';
}

function sceneBossVictory(xp, gold) {
  G.battle = null;
  G.location = 'whitecity'; // Return to city after boss
  var html = '<div class="scene" style="text-align:center;font-size:16px">🏆 <em>第一章完结</em></div>';
  html += '<div class="scene" style="text-align:center">击败黑暗学徒后，他留下最后一句话：</div>';
  html += '<div class="scene" style="color:#c44;text-align:center;font-style:italic">「你以为这是结束？找到守望者...」</div>';
  html += '<hr class="divider>';
  html += '<div class="scene" style="text-align:center">获得 ⭐' + xp + ' XP | 💰' + gold + ' 金币</div>';
  html += '<div class="scene" style="text-align:center;color:#5a5a4a">白城商会将永远铭记你的恩情。</div>';
  html += '<hr class="divider>';
  html += '<div class="scene" style="text-align:center;color:#d4a017">第二章：白城阴谋（开发中）</div>';
  html += '<hr class="divider>';
  html += '<div class="btn" onclick="sceneWorldMap()">🔙 自由探索白城</div>';
  html += '<div class="btn" onclick="initGame();sceneIntro()">🔄 重新开始</div>';
  render(html);
}

// ── ATTRIBUTE ALLOCATION ───────────────────────────────────

var _attrDraft = null;

function sceneAllocAttr() {
  if (!_attrDraft) {
    _attrDraft = { str: G.str, agi: G.agi, int: G.int, cha: G.cha, luk: G.luk, pts: G.attrPts };
  }
  var attrs = [
    { key: 'str', name: '⚔️ 力量', hint: '+2物攻/+5HP', val: _attrDraft.str },
    { key: 'agi', name: '🌿 敏捷', hint: '+闪避', val: _attrDraft.agi },
    { key: 'int', name: '🧙 智力', hint: '+2魔攻/+3MP', val: _attrDraft.int },
    { key: 'cha', name: '💬 魅力', hint: '+折扣', val: _attrDraft.cha },
    { key: 'luk', name: '🎲 幸运', hint: '+会心/+掉落', val: _attrDraft.luk },
  ];

  var html = '<div class="scene"><em>【属性分配】</em></div>';
  html += '<div class="pts-left">剩余 <strong>' + _attrDraft.pts + '</strong> 点（每级固定3点）</div>';
  for (var i = 0; i < attrs.length; i++) {
    var a = attrs[i];
    html += '<div class="attr-row">';
    html += '<span class="attr-name">' + a.name + '</span>';
    html += '<span class="attr-val">' + a.val + '</span>';
    html += '<span class="attr-hint">' + a.hint + '</span>';
    html += '<div class="attr-btns">';
    html += '<button class="abtn" onclick="adjAttr(\'' + a.key + '\',-1)">−</button>';
    html += '<button class="abtn" onclick="adjAttr(\'' + a.key + '\',1)">+</button>';
    html += '</div></div>';
  }
  html += '<button class="confirm-btn" onclick="confirmAttr()" ' + (_attrDraft.pts > 0 ? 'disabled' : '') + '>确认</button>';
  html += '<button class="cancel-btn" onclick="sceneWorldMap()">返回</button>';
  render(html);
}

function adjAttr(key, delta) {
  var base = G['_' + key] !== undefined ? G['_' + key] : G[key];
  base = G[key]; // original
  var current = _attrDraft[key];
  if (delta > 0 && _attrDraft.pts <= 0) return;
  if (delta < 0 && current <= G[key]) return;
  _attrDraft[key] += delta;
  _attrDraft.pts -= delta;
  sceneAllocAttr();
}

function confirmAttr() {
  if (_attrDraft.pts > 0) { toast('还有属性点未分配'); return; }
  G.str = _attrDraft.str; G.agi = _attrDraft.agi; G.int = _attrDraft.int;
  G.cha = _attrDraft.cha; G.luk = _attrDraft.luk;
  G.maxHp = calcMaxHp(); G.hp = Math.min(G.hp, G.maxHp);
  G.maxMp = calcMaxMp(); G.mp = Math.min(G.mp, G.maxMp);
  G.attrPts = 0;
  _attrDraft = null;
  updateStatus();
  toast('✅ 属性已分配');
  sceneWorldMap();
}

// ── SKILL LEARNING ────────────────────────────────────────

function sceneLearnSkill() {
  var available = SKILLS.filter(function(s) { return G.skills.indexOf(s.id) < 0 && !s.passive; });
  var html = '<div class="scene"><em>【技能学习】技能点：' + G.skillPts + '</em></div>';
  for (var i = 0; i < available.length; i++) {
    var s = available[i];
    html += '<div class="sk-card" onclick="learnSkill(\'' + s.id + '\')">';
    html += '<div class="sk-name">' + s.name + '</div>';
    html += '<div class="sk-desc">' + s.desc + ' | 消耗 ' + s.cost + ' MP</div>';
    html += '</div>';
  }
  html += '<button class="cancel-btn" onclick="sceneWorldMap()">返回</button>';
  render(html);
}

function learnSkill(sid) {
  if (G.skillPts <= 0) return;
  G.skills.push(sid);
  G.skillPts--;
  var sk = SKILLS.find(function(s) { return s.id === sid; });
  toast('✅ 习得「' + sk.name + '」');
  if (G.skillPts > 0) sceneLearnSkill();
  else sceneWorldMap();
}

// ── MARKET ───────────────────────────────────────────────

function sceneMarket() {
  var discount = (G.origin.id === 'trader' && !G.marketVisited) ? 0.7 : 1;
  G.marketVisited = true;

  var html = '<div class="scene"><em>【市场】</em> 💰' + G.gold + '</div>';
  if (G.origin.id === 'trader' && !G.firstBattleWon) {
    html += '<div style="color:#5c5;font-size:11px">✨ 讨价还价生效！首笔交易7折</div>';
  }
  html += '<hr class="divider">';
  for (var i = 0; i < GOODS.length; i++) {
    var g = GOODS[i];
    var price = Math.floor(g.price * discount);
    var trendCls = g.trend === 'up' ? 'req-not' : (g.trend === 'down' ? 'req-met' : '');
    var trendTxt = g.trend === 'up' ? '📈 高价' : (g.trend === 'down' ? '📉 低价' : '📊 稳定');
    html += '<div class="attr-row">';
    html += '<span style="color:#b8a880">' + g.name + '</span>';
    html += '<span class="' + trendCls + '">' + trendTxt + '</span>';
    html += '<span style="color:#d4a017">💰' + price + '/单位</span>';
    html += '<div style="display:flex;gap:4px">';
    html += '<button class="btn" style="padding:3px 8px;font-size:10px" onclick="buyGoods(' + i + ',' + price + ',1)">+1</button>';
    html += '<button class="btn" style="padding:3px 8px;font-size:10px" onclick="buyGoods(' + i + ',' + price + ',10)">+10</button>';
    html += '</div></div>';
  }
  html += '<hr class="divider">';
  html += '<div style="font-size:12px">📦 货舱：' + G.cargo.length + '/100</div>';
  html += '<hr class="divider"><div class="choices">';
  html += '<div class="btn" onclick="sceneSellGoods()">💰 前往他处贩卖</div>';
  html += '<div class="btn" onclick="sceneTownMap()">↩️ 返回</div>';
  html += '</div>';
  render(html);
}

function buyGoods(idx, price, qty) {
  var cost = price * qty;
  if (G.gold < cost) { toast('💰 金币不足！'); return; }
  if (G.cargo.length + qty > 100) { toast('📦 货舱已满！'); return; }
  G.gold -= cost;
  for (var i = 0; i < qty; i++) {
    G.cargo.push({ name: GOODS[idx].name, buyPrice: price });
  }
  updateStatus();
  toast('✅ 购买 ' + qty + ' 单位' + GOODS[idx].name);
  sceneMarket();
}

function sceneSellGoods() {
  if (G.cargo.length === 0) { toast('📦 货舱为空！'); sceneMarket(); return; }
  var html = '<div class="scene"><em>【贩卖】</em></div>';
  html += '<div class="scene">选择目的地：</div>';
  html += '<div class="choices">';
  html += '<div class="btn" onclick="sellAtDest(\'lake\')">🌿 坠星湖畔（药材高价）</div>';
  html += '<div class="btn" onclick="sellAtDest(\'darkforest\')">🌲 幽暗森林（铁器短缺）</div>';
  html += '<div class="btn" onclick="sellAtDest(\'fortress\')">⚔️ 破碎堡垒（丝绸需求）</div>';
  html += '<div class="btn" onclick="sceneMarket()">↩️ 返回</div>';
  html += '</div>';
  render(html);
}

function sellAtDest(destId) {
  var dest = LOCATIONS.find(function(l) { return l.id === destId; });
  var mult = destId === 'lake' ? 1.8 : (destId === 'darkforest' ? 1.5 : 1.3);
  var total = 0;
  for (var i = 0; i < G.cargo.length; i++) {
    total += Math.floor(G.cargo[i].buyPrice * mult);
  }
  G.gold += total;
  G.cargo = [];
  G.firstBattleWon = true;
  updateStatus();
  var html = '<div class="scene"><em>【商贸结算】前往 ' + dest.name + '</em></div>';
  html += '<div style="text-align:center;font-size:20px;color:#d4a017;margin:16px 0">💰 获得 ' + total + ' 金币！</div>';
  html += '<div class="btn" onclick="sceneTownMap()">↩️ 返回白城</div>';
  render(html);
}

// ── BLACKSMITH ───────────────────────────────────────────

function sceneSmith() {
  var html = '<div class="scene"><em>【铁匠铺】</em> 💰' + G.gold + '</div>';
  html += '<div style="color:#5a5a4a;font-size:11px">装备有等级/属性要求，达到要求才能购买</div>';
  html += '<hr class="divider">';
  for (var i = 0; i < SHOP.length; i++) {
    var item = SHOP[i];
    var reqFail = checkEquipReq(item);
    var canBuy = !reqFail && G.gold >= item.price;
    var cls = 'rarity-' + item.rarity;

    html += '<div class="sk-card" style="' + (canBuy ? '' : 'opacity:0.6') + '">';
    html += '<div class="sk-name ' + cls + '">' + item.name + '</div>';
    html += '<div style="font-size:11px;color:#7a7a6a">' + item.desc + '</div>';
    html += '<div style="font-size:11px;color:' + (reqFail ? '#c44' : '#5a5a4a') + '">';
    if (item.atk) html += '⚔️+' + item.atk + ' ';
    if (item.def) html += '🛡️+' + item.def + ' ';
    if (item.hp) html += '❤️+' + item.hp + ' ';
    if (item.mp) html += '💧+' + item.mp + ' ';
    if (item.str) html += '力+' + item.str + ' ';
    if (item.int) html += '智+' + item.int + ' ';
    html += (reqFail || '已满足所有要求');
    html += '</div>';
    html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px">';
    html += '<span style="color:#d4a017">💰' + item.price + '</span>';
    if (canBuy) {
      html += '<button class="btn" style="padding:3px 10px;font-size:11px" onclick="buyItem(' + i + ')">购买</button>';
    } else {
      html += '<span style="color:#c44;font-size:11px">' + (reqFail ? reqFail : '金币不足') + '</span>';
    }
    html += '</div></div>';
  }
  html += '<div class="btn" onclick="sceneTownMap()">↩️ 返回</div>';
  render(html);
}

function buyItem(idx) {
  var item = SHOP[idx];
  if (G.gold < item.price) { toast('💰 金币不足'); return; }
  G.gold -= item.price;
  G.inventory.push(Object.assign({}, item, { id: 'item_' + Date.now() }));
  updateStatus();
  toast('✅ 购买「' + item.name + '」');
  sceneSmith();
}

// ── INVENTORY ─────────────────────────────────────────────

function sceneInventory() {
  var slots = [
    { key: 'weapon', name: '武器' },
    { key: 'armor', name: '铠甲' },
    { key: 'accessory', name: '饰品' },
  ];
  var html = '<div class="scene"><em>【背包 & 装备】</em></div>';
  html += '<div style="font-size:11px;color:#5a5a4a">已装备：</div>';
  for (var i = 0; i < slots.length; i++) {
    var slot = slots[i];
    var eq = G.equipment[slot.key];
    html += '<div class="attr-row">';
    html += '<span style="color:#7a6a4a;width:60px">' + slot.name + '：</span>';
    if (eq) {
      html += '<span class="rarity-' + eq.rarity + '">' + eq.name + '</span>';
      html += '<button class="btn" style="padding:2px 8px;font-size:10px" onclick="unequip(\'' + slot.key + '\')">卸下</button>';
    } else {
      html += '<span style="color:#333">(空)</span>';
    }
    html += '</div>';
  }

  html += '<hr class="divider"><div style="font-size:11px;color:#5a5a4a">背包（' + G.inventory.length + '件）：</div>';
  if (G.inventory.length === 0) {
    html += '<div style="color:#444;font-size:12px">空空如也</div>';
  } else {
    for (var j = 0; j < G.inventory.length; j++) {
      var item = G.inventory[j];
      var reqFail = checkEquipReq(item);
      html += '<div class="attr-row">';
      html += '<span class="rarity-' + item.rarity + '">' + item.name + '</span>';
      html += '<span style="font-size:10px;' + (reqFail ? 'color:#c44' : 'color:#5a5a4a') + '">';
      if (item.atk) html += '⚔️+' + item.atk + ' ';
      if (item.def) html += '🛡️+' + item.def + ' ';
      if (item.hp) html += '❤️+' + item.hp + ' ';
      html += (reqFail ? reqFail : '');
      html += '</span>';
      if (!reqFail) {
        html += '<button class="btn" style="padding:2px 8px;font-size:10px" onclick="equipItem(' + j + ')">装备</button>';
      } else {
        html += '<span style="color:#c44;font-size:10px">未达要求</span>';
      }
      html += '</div>';
    }
  }

  html += '<hr class="divider"><div class="scene">💰 ' + G.gold + ' 金币 | 胜' + G.totalBattlesWon + ' 败' + G.totalBattlesLost + '</div>';
  html += '<button class="cancel-btn" onclick="sceneWorldMap()">返回</button>';
  render(html);
}

function equipItem(idx) {
  var item = G.inventory[idx];
  var slot = item.slot;
  if (G.equipment[slot]) G.inventory.push(G.equipment[slot]);
  G.equipment[slot] = item;
  G.inventory.splice(idx, 1);
  G.maxHp = calcMaxHp(); G.hp = Math.min(G.hp, G.maxHp);
  G.maxMp = calcMaxMp(); G.mp = Math.min(G.mp, G.maxMp);
  updateStatus();
  toast('✅ 装备「' + item.name + '」');
  sceneInventory();
}

function unequip(slot) {
  var item = G.equipment[slot];
  if (!item) return;
  G.inventory.push(item);
  delete G.equipment[slot];
  G.maxHp = calcMaxHp(); G.hp = Math.min(G.hp, G.maxHp);
  G.maxMp = calcMaxMp(); G.mp = Math.min(G.mp, G.maxMp);
  updateStatus();
  toast('📦 卸下「' + item.name + '」');
  sceneInventory();
}

// ── GUILD ────────────────────────────────────────────────

function sceneGuild() {
  var tasks = [
    { name: '寻找失踪商队', desc: '前往坠星湖畔搜索商队残骸', reward: '150 XP + 80金', loc: 'lake' },
    { name: '采集月光草', desc: '在白城附近采集稀有草药', reward: '120 XP + 50金', loc: 'whitecity' },
    { name: '护送商队', desc: '保护商队安全到达幽暗森林', reward: '200 XP + 120金', loc: 'darkforest' },
    { name: '暗影矿洞探索', desc: '调查暗影矿洞的秘密（Boss战）', reward: '300 XP + 150金', loc: 'mine' },
  ];
  var html = '<div class="scene"><em>【冒险者公会】</em></div>';
  html += '<div style="color:#5a5a4a;font-size:11px">接待员：「新人？先接个任务吧。」</div>';
  html += '<hr class="divider">';
  for (var i = 0; i < tasks.length; i++) {
    var t = tasks[i];
    var loc = LOCATIONS.find(function(l) { return l.id === t.loc; });
    var locked = loc && !loc.unlocked;
    html += '<div class="sk-card" style="' + (locked ? 'opacity:0.5' : '') + '">';
    html += '<div class="sk-name">📜 ' + t.name + (locked ? ' 🔒' : '') + '</div>';
    html += '<div class="sk-desc">' + t.desc + '</div>';
    html += '<div style="font-size:11px;color:#5c5">奖励：' + t.reward + '</div>';
    if (!locked) {
      html += '<button class="btn" style="margin-top:4px;font-size:11px" onclick="acceptTask(' + i + ')">接取</button>';
    } else {
      html += '<div style="font-size:11px;color:#c44;margin-top:4px">该区域尚未解锁</div>';
    }
    html += '</div>';
  }
  html += '<div class="btn" onclick="sceneTownMap()">↩️ 返回</div>';
  render(html);
}

function acceptTask(idx) {
  var tasks = [
    { name: '寻找失踪商队', loc: 'lake' },
    { name: '采集月光草', loc: 'whitecity' },
    { name: '护送商队', loc: 'darkforest' },
    { name: '暗影矿洞探索', loc: 'mine' },
  ];
  var task = tasks[idx];
  G.taskAccepted = true;
  G.location = task.loc;
  toast('✅ 接受了「' + task.name + '」');
  sceneWorldMap();
}

// ── INN ─────────────────────────────────────────────────

function sceneInn() {
  var html = '<div class="scene"><em>【旅店】</em></div>';
  html += '<div style="color:#5a5a4a;font-size:11px">「住一晚10金币，保证你睡得香！」</div>';
  html += '<hr class="divider">';
  html += '<div class="scene">❤️ HP: ' + G.hp + '/' + G.maxHp + ' | 💧 MP: ' + G.mp + '/' + G.maxMp + '</div>';
  html += '<hr class="divider"><div class="choices">';
  html += '<div class="btn" onclick="rest()">🛏️ 住宿（10金币）— 完全恢复</div>';
  html += '<div class="btn" onclick="sceneTownMap()">↩️ 返回</div>';
  html += '</div>';
  render(html);
}

function rest() {
  if (G.gold < 10) { toast('💰 金币不足！'); return; }
  G.gold -= 10;
  G.hp = G.maxHp;
  G.mp = G.maxMp;
  updateStatus();
  toast('😴 休息完毕！完全恢复');
  sceneTownMap();
}

// ── BOOT ───────────────────────────────────────────────

initGame();
sceneIntro();