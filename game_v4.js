// ═══════════════════════════════════════════════════════════
// 龙途传说 v4 — 核心脚本
// ═══════════════════════════════════════════════════════════

// ── ORIGINS with background stories ─────────────────────────

var ORIGINS = [
  {
    id:'warrior',name:'佣兵',emoji:'⚔',desc:'战场幸存者',
    str:18,agi:12,int:6,cha:8,luk:6,
    skill:{name:'战吼',type:'增益',target:'自身',desc:'攻击+20%持续3回合',cost:0},
    startSkills:[],
    story:'战场上尸横遍野。你是唯一站起来的那个。三天后，你拖着断剑走进白城，口袋里只有敌人身上搜来的几枚铜币。没有人问你的名字，因为活下来的人不值得被记住。'
  },
  {
    id:'mage',name:'学徒',emoji:'🔮',desc:'学院逃亡者',
    str:6,agi:8,int:18,cha:10,luk:8,
    skill:{name:'奥术感知',type:'被动',target:'自身',desc:'可见隐藏魔法陷阱',cost:0},
    startSkills:['fireArrow'],
    story:'导师说你的天赋太危险。那天夜里学院起了火，你带着半本烧焦的笔记逃了出来。没有人追你，但你知道他们迟早会来。法杖是唯一相信你的东西。'
  },
  {
    id:'trader',name:'行商',emoji:'💰',desc:'破产商人',
    str:6,agi:8,int:10,cha:18,luk:8,
    skill:{name:'讨价还价',type:'被动',target:'自身',desc:'所有购买-15%',cost:0},
    startSkills:[],
    story:'商队被劫，货物化为灰烬。你站在废墟前数了数口袋，还剩五十金币和一把防身用的短刀。债主下周就会找到这里。你需要重新开始，或者永远消失。'
  },
  {
    id:'ranger',name:'猎人',emoji:'🏹',desc:'森林猎人',
    str:10,agi:18,int:6,cha:6,luk:10,
    skill:{name:'陷阱感知',type:'被动',target:'自身',desc:'自动避开普通陷阱',cost:0},
    startSkills:[],
    story:'你追一头白鹿追了三天。它带你穿过森林，来到这片从未见过的湖畔。然后它消失了，只留下蹄印和清晨的雾。你决定留下来看看这里究竟有什么。'
  },
  {
    id:'gambler',name:'赌徒',emoji:'🎲',desc:'赌桌幸运儿',
    str:6,agi:8,int:8,cha:6,luk:18,
    skill:{name:'孤注一掷',type:'攻击',target:'单体',desc:'50%几率造成250%伤害，失败自伤30%',cost:0},
    startSkills:[],
    story:'最后一局，你all in然后赢了。大赢。赢家总是最先被盯上的。三天后你带着剩下的金币逃到这里。你知道他们还在找你，但你的运气不会用完——大概。'
  },
  {
    id:'cleric',name:'朝圣者',emoji:'🙏',desc:'寻找救赎',
    str:6,agi:6,int:14,cha:14,luk:10,
    skill:{name:'祈祷',type:'治疗',target:'自身',desc:'每回合恢复10%最大HP',cost:0},
    startSkills:['heal'],
    story:'神庙被焚毁的那天，你活了下来。护身符还在胸口发烫，但你不知道它真正的作用。老人说，答案在坠星湖。所以你来了。'
  },
];

// ── ENEMIES with ASCII art ─────────────────────────────────

var ENEMIES = {
  goblin:{
    name:'哥布林',hp:35,atk:12,def:3,emoji:'👺',xp:30,goldMin:8,goldMax:15,
    art:['    ▲▲▲   ','   (◕ ◕)  ','    > v <  ','   /| |\\  ','  _/  \\_  ']
  },
  goblin2:{
    name:'哥布林战士',hp:50,atk:18,def:8,emoji:'👹',xp:50,goldMin:15,goldMax:25,
    art:['   ▄███▄  ','  (╬ಠ益ಠ) ','   />█<\\  ','  / | | \\ ','  ─────── ']
  },
  archer:{
    name:'哥布林射手',hp:35,atk:16,def:4,emoji:'🏹',xp:40,goldMin:12,goldMax:20,
    art:['     O    ','    /|\\   ','    / >   ','   /  |   ','  ¯¯¯¯¯¯  ']
  },
  wolf:{
    name:'暗影狼',hp:45,atk:20,def:6,emoji:'🐺',xp:45,goldMin:10,goldMax:18,
    art:['   /\\_/\\  ','  (•ω•)   ','  / >  <\\ ',' /  \\__/  \\',' ¯¯¯¯¯¯¯¯¯¯']
  },
  boss:{
    name:'黑暗学徒',hp:200,atk:32,def:15,emoji:'💀',xp:400,goldMin:100,goldMax:200,isBoss:true,
    art:['   ___██___  ','  /  ╲╱  \\ ',' |  (ಠ_ಠ)  |','  \\ |  | /  ','   ╰────╯   ','   ⚡    ⚡   ']
  },
};

// ── SKILLS ──────────────────────────────────────────────────

var SKILLS = [
  {id:'fireArrow',name:'🔥 火焰箭',type:'攻击',target:'单体',desc:'造成35-45火焰伤害',cost:15,dmgMin:35,dmgMax:45},
  {id:'iceBolt',name:'❄ 冰霜箭',type:'攻击',target:'单体',desc:'造成30-40冰霜伤害并减速',cost:12,dmgMin:30,dmgMax:40},
  {id:'heal',name:'💚 治疗术',type:'治疗',target:'自身',desc:'恢复25-35 HP',cost:15,healMin:25,healMax:35},
  {id:'doubleStrike',name:'⚔ 双重打击',type:'攻击',target:'单体',desc:'攻击两次，每次15-22伤害',cost:12,dmgMin:15,dmgMax:22,hits:2},
  {id:'fireball',name:'💥 火球术',type:'攻击',target:'群攻',desc:'对所有敌人造成20-30伤害',cost:25,dmgMin:20,dmgMax:30,aoe:true},
  {id:'magicMissile',name:'✨ 魔法飞弹',type:'攻击',target:'群攻',desc:'发射3枚飞弹，各10-15伤害',cost:18,dmgMin:10,dmgMax:15,missiles:3},
];

// ── SHOP ITEMS ─────────────────────────────────────────────

var SHOP_ITEMS = [
  {name:'铁剑',price:60,atk:8,slot:'weapon',rarity:'common',desc:'普通的铁剑'},
  {name:'精钢剑',price:180,atk:25,str:3,slot:'weapon',rarity:'fine',reqLv:3,reqStr:12,desc:'锋利的钢剑'},
  {name:'法师法杖',price:150,atk:12,int:5,slot:'weapon',rarity:'fine',reqLv:2,reqInt:12,desc:'提升魔法威力'},
  {name:'皮甲',price:50,def:8,hp:20,slot:'armor',rarity:'common',desc:'基础防护'},
  {name:'皮胸甲',price:150,def:20,hp:50,slot:'armor',rarity:'fine',reqLv:3,reqStr:10,desc:'不错的防护'},
  {name:'法师长袍',price:280,def:12,mp:50,int:8,slot:'armor',rarity:'rare',reqLv:5,reqInt:15,desc:'智力加成'},
  {name:'生命戒指',price:300,hp:80,luk:2,slot:'accessory',rarity:'rare',reqLv:5,desc:'增加生命'},
  {name:'迷宫钥匙',price:80,desc:'开启迷宫宝箱',consumable:true,slot:'item'},
];

// ── GOODS for trade ────────────────────────────────────────

var GOODS = [
  {name:'药材',basePrice:15},
  {name:'铁器',basePrice:12},
  {name:'丝绸',basePrice:28},
  {name:'香料',basePrice:35},
];

// ── LOCATIONS ──────────────────────────────────────────────

var LOCATIONS = {
  lake:{
    id:'lake',name:'坠星湖畔',type:'wild',
    desc:'清晨的湖面泛着薄雾。你在这里醒来，不知道自己是谁。',
    art:[
      '    ~~~~╲╱~~~~    ',
      '  ~~~坠星湖~~~    ',
      '    ~~~~~~~~      ',
      '   🌲   🌲   🌲   ',
      '  🛤️ 湖畔小径 🛤️  '
    ],
    connections:['whitecity','darkforest'],
    enemies:['goblin','wolf'],unlocked:true
  },
  whitecity:{
    id:'whitecity',name:'白城',type:'town',
    desc:'繁华的贸易都市，冒险者的聚集地。',
    art:[
      '    ┌─────┐        ',
      '    │🏰白城│        ',
      '  ┌─┴─────┴─┐      ',
      '  │ 🏪  ⚔️  📜│    ',
      '  │ 市场 铁匠 公会│',
      '  └─────────┘      '
    ],
    connections:['lake','darkforest','fortress'],
    enemies:[],unlocked:true
  },
  darkforest:{
    id:'darkforest',name:'幽暗森林',type:'wild',
    desc:'古老的森林，传说深处有宝藏。',
    art:[
      '  🌲🌲🌲🌲🌲🌲🌲  ',
      '  🌲 幽暗森林 🌲  ',
      '  🌲🌲🌲🌲🌲🌲🌲  ',
      '    ╱  🛤️  ╲      ',
      '   🌲      🌲     '
    ],
    connections:['lake','whitecity','mine'],
    enemies:['goblin2','archer','wolf'],unlocked:true
  },
  fortress:{
    id:'fortress',name:'破碎堡垒',type:'wild',
    desc:'废弃的堡垒，领主招募勇士。',
    art:[
      '   ┏━━━━━━━┓      ',
      '   ┃ 破碎堡垒┃    ',
      '   ┃  ⚔️    ┃      ',
      '   ┗━━━━━━━┛      ',
      '     ║   ║        '
    ],
    connections:['whitecity'],
    enemies:['goblin2'],unlocked:true
  },
  mine:{
    id:'mine',name:'暗影矿洞',type:'dungeon',
    desc:'深邃的矿洞，Boss出没。',
    art:[
      '   ▓▓▓▓▓▓▓▓      ',
      '   ▓暗影矿洞▓    ',
      '   ▓  ⛏️   ▓      ',
      '   ▓▓▼▓▓▓▓▓      ',
      '    ║            '
    ],
    connections:['darkforest'],
    enemies:['goblin2','archer','boss'],unlocked:false,dungeon:true
  },
};

// ── DUNGEON TEMPLATES ──────────────────────────────────────

var DUNGEON_ROOMS = {
  empty:{char:'·',name:'空地',color:'#3a3a3a'},
  visited:{char:'·',name:'已探索',color:'#2a2a3a'},
  player:{char:'@',name:'你',color:'#5c5'},
  enemy:{char:'👹',name:'敌人',color:'#c44'},
  chest:{char:'📦',name:'宝箱',color:'#d4a017'},
  event:{char:'?',name:'事件',color:'#48f'},
  exit:{char:'▼',name:'出口',color:'#d4a017'},
  wall:{char:'█',name:'墙壁',color:'#1a1a20'},
};

// ── NAME GENERATOR ─────────────────────────────────────────

var NAME_PRE = ['艾','赛','卡','莱','维','安','达','洛','希','菲','索','凯','瑞','莫','伊','诺','泰','格','奥','雷'];
var NAME_SUF = ['瑞','拉','斯','娜','伦','恩','达','尔','克','特','雅','兰','蒂','尔德','里克','昂','丝','薇'];

// ═══════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════

var G = null;

function initGame(){
  G={
    name:'',level:1,xp:0,gold:50,
    str:10,agi:10,int:10,cha:10,luk:10,
    hp:80,maxHp:80,mp:60,maxMp:60,
    attrPts:0,skillPts:0,skills:[],
    inventory:[],equipment:{},cargo:[],
    origin:null,inBattle:false,battle:null,
    location:'lake',
    selectedTarget:0,attackMode:'attack',
    keys:0,
    dungeon:null,dungeonPos:null,
    totalBattlesWon:0,totalBattlesLost:0,
  };
}

// ── UTILITY FUNCTIONS ──────────────────────────────────────

function rand(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function $(id){return document.getElementById(id)}
function clamp(v,min,max){return Math.max(min,Math.min(max,v))}

function toast(msg,type){
  var t=$('toast');
  if(!t)return;
  t.textContent=msg;
  t.className='toast'+(type?' '+type:'');
  t.classList.add('show');
  setTimeout(function(){t.classList.remove('show')},type==='lvl'?2200:1600);
}

function render(html){
  var p=$('panel');
  if(p)p.innerHTML=html;
}

function calcNextXp(lv){
  // 公式: 80 + lv*40，升级曲线更陡
  return 80 + lv * 40;
}

function calcMaxHp(){
  var base=80+G.str*5;
  if(G.equipment.armor)base+=G.equipment.armor.hp||0;
  if(G.equipment.accessory)base+=G.equipment.accessory.hp||0;
  return base;
}

function calcMaxMp(){
  var base=60+G.int*3;
  if(G.equipment.armor)base+=G.equipment.armor.mp||0;
  return base;
}

function calcAtk(){
  var a=10+G.str*2+Math.floor(G.int*0.5);
  if(G.equipment.weapon)a+=G.equipment.weapon.atk||0;
  return a;
}

function calcDef(){
  var d=5+Math.floor(G.str*0.5)+Math.floor(G.agi*0.3);
  if(G.equipment.armor)d+=G.equipment.armor.def||0;
  return d;
}

function calcCrit(){return 5+G.luk*0.5}
function calcDodge(){return G.agi*0.3}
function calcCritDmg(){return 1.5+G.luk*0.01}

function genName(){
  return NAME_PRE[rand(0,NAME_PRE.length-1)]+NAME_SUF[rand(0,NAME_SUF.length-1)];
}

function checkEquipReq(item){
  if(item.reqLv&&G.level<item.reqLv)return'需要Lv.'+item.reqLv;
  if(item.reqStr&&G.str<item.reqStr)return'需要力量≥'+item.reqStr;
  if(item.reqInt&&G.int<item.reqInt)return'需要智力≥'+item.reqInt;
  if(item.reqAgi&&G.agi<item.reqAgi)return'需要敏捷≥'+item.reqAgi;
  return null;
}

function updateStatus(){
  var sb=$('statusBar');
  if(!G||!G.origin){if(sb)sb.style.display='none';return;}
  sb.style.display='block';
  $('dispName').textContent=G.name||'';
  $('dispLv').textContent=G.level;
  $('dispGold').textContent=G.gold;
  $('dispHp').textContent=G.hp;
  $('dispMhp').textContent=G.maxHp;
  $('dispMp').textContent=G.mp;
  $('dispMmp').textContent=G.maxMp;
  $('dispXp').textContent=G.xp;
  $('dispNxp').textContent=G.nextXp||calcNextXp(G.level);
  $('dispAp').textContent=G.attrPts;
}

function doLevelUp(){
  G.level++;
  G.xp-=G.nextXp;
  G.nextXp=calcNextXp(G.level);
  G.attrPts+=3;
  G.skillPts+=1;
  G.maxHp=calcMaxHp();
  G.maxMp=calcMaxMp();
  G.hp=G.maxHp;
  G.mp=G.maxMp;
  toast('⬆️ 升级！Lv.'+G.level,'lvl');
}

// ═══════════════════════════════════════════════════════════
// SCENE: INTRO - ORIGIN SELECTION
// ═══════════════════════════════════════════════════════════

function sceneIntro(){
  var h='';
  h+='<div style="text-align:center;padding:12px 0">';
  h+='<div style="font-size:20px;color:#d4a017;letter-spacing:3px">⚔ 龙途传说 ⚔</div>';
  h+='<div style="color:#5a5a4a;font-size:10px">选择你的起源</div>';
  h+='</div><hr class="divider">';
  
  for(var i=0;i<ORIGINS.length;i++){
    var o=ORIGINS[i];
    h+='<div class="origin-card" onclick="selectOrigin('+i+')">';
    h+='<div class="oc-header">';
    h+='<span class="oc-emoji">'+o.emoji+'</span>';
    h+='<span class="oc-name">'+o.name+'</span>';
    h+='<span class="oc-desc">— '+o.desc+'</span>';
    h+='</div>';
    h+='<div class="oc-attrs">';
    h+='力'+o.str+' 敏'+o.agi+' 智'+o.int+' 魅'+o.cha+' 运'+o.luk;
    h+='</div>';
    // 技能说明
    var sk=o.skill;
    h+='<div class="oc-skill">';
    h+='<span class="os-name">【天赋】'+sk.name+'</span> ';
    h+='<span class="os-type">['+sk.type+']['+sk.target+']</span> ';
    h+='<span class="os-desc">'+sk.desc+'</span>';
    h+='</div>';
    h+='</div>';
  }
  
  render(h);
}

function selectOrigin(idx){
  var o=ORIGINS[idx];
  G.origin=o;
  G.str=o.str;G.agi=o.agi;G.int=o.int;G.cha=o.cha;G.luk=o.luk;
  G.maxHp=calcMaxHp();G.hp=G.maxHp;
  G.maxMp=calcMaxMp();G.mp=G.maxMp;
  G.skills=o.startSkills?o.startSkills.slice():[];
  G.nextXp=calcNextXp(1);
  
  toast(o.emoji+' 选择「'+o.name+'」');
  sceneOriginStory();
}

// ═══════════════════════════════════════════════════════════
// SCENE: ORIGIN STORY + NAMING
// ═══════════════════════════════════════════════════════════

function sceneOriginStory(){
  var o=G.origin;
  
  var h='';
  h+='<div class="scene"><em>【'+o.name+' · '+o.desc+'】</em></div>';
  h+='<div class="scene" style="color:#b8a880;line-height:1.8">'+o.story+'</div>';
  h+='<hr class="divider">';
  h+='<div class="scene">你站在坠星湖畔，晨雾弥漫。</div>';
  h+='<hr class="divider">';
  
  // 起名
  h+='<div class="scene"><em>【为你的冒险者命名】</em></div>';
  h+='<input class="name-input" id="nameInput" value="'+genName()+'" maxlength="8" placeholder="输入名字">';
  h+='<div style="text-align:center;margin:6px 0">';
  h+='<button class="btn center" onclick="randomizeName()" style="padding:4px 12px;font-size:11px">🎲 随机</button>';
  h+='</div>';
  h+='<button class="confirm-btn" onclick="confirmNameAndAttrs()">确认名字并分配属性</button>';
  
  render(h);
}

function randomizeName(){
  var inp=$('nameInput');
  if(inp)inp.value=genName();
}

function confirmNameAndAttrs(){
  var inp=$('nameInput');
  var n=inp?inp.value.trim():'';
  if(!n){toast('请输入名字');return;}
  G.name=n;
  toast('欢迎，'+G.name+'！');
  sceneAllocOriginAttrs();
}

// ═══════════════════════════════════════════════════════════
// SCENE: ORIGIN ATTRIBUTE ALLOCATION
// ═══════════════════════════════════════════════════════════

var _originPts=5;
var _originAttrs={};

function sceneAllocOriginAttrs(){
  var o=G.origin;
  _originPts=5;
  _originAttrs={str:o.str,agi:o.agi,int:o.int,cha:o.cha,luk:o.luk};
  renderOriginAttrs();
}

function renderOriginAttrs(){
  var o=G.origin;
  var attrs=[
    {key:'str',name:'⚔️ 力量',hint:'+物攻/+HP'},
    {key:'agi',name:'🌿 敏捷',hint:'+闪避'},
    {key:'int',name:'🧙 智力',hint:'+魔攻/+MP'},
    {key:'cha',name:'💬 魅力',hint:'+折扣'},
    {key:'luk',name:'🎲 幸运',hint:'+会心/+掉落'},
  ];
  
  var h='';
  h+='<div class="scene"><em>【分配自由属性点】</em></div>';
  h+='<div class="pts-left">剩余 <strong style="font-size:16px">'+_originPts+'</strong> 点</div>';
  h+='<div style="font-size:10px;color:#5a5a4a;text-align:center;margin-bottom:6px">起源基础 '+(_originAttrs.str+_originAttrs.agi+_originAttrs.int+_originAttrs.cha+_originAttrs.luk)+' 点 + 自由 '+(_originPts)+' 点</div>';
  
  for(var i=0;i<attrs.length;i++){
    var a=attrs[i];
    var base=o[a.key];
    var cur=_originAttrs[a.key];
    var delta=cur-base;
    var deltaStr=delta>0?'(+'+delta+')':'';
    
    h+='<div class="attr-row"'+(delta>0?' style="background:#1a2a1a"':'')+'>';
    h+='<span class="attr-name">'+a.name+'</span>';
    h+='<span class="attr-val">'+cur+'</span>';
    h+='<span class="attr-delta">'+deltaStr+'</span>';
    h+='<span class="attr-hint">'+a.hint+'</span>';
    h+='<div class="attr-btns">';
    h+='<button class="abtn" onclick="adjOriginAttr(\''+a.key+'\',-1)"'+(cur<=base?' disabled':'')+'−</button>';
    h+='<button class="abtn" onclick="adjOriginAttr(\''+a.key+'\',+1)"'+(_originPts<=0?' disabled':'')+'+</button>';
    h+='</div></div>';
  }
  
  h+='<button class="confirm-btn" onclick="confirmOriginAttrs()"'+(_originPts>0?' disabled':'')+'>确认属性</button>';
  render(h);
}

function adjOriginAttr(key,delta){
  var o=G.origin;
  var base=o[key];
  var cur=_originAttrs[key];
  
  if(delta>0&&_originPts<=0)return;
  if(delta<0&&cur<=base)return;
  
  _originAttrs[key]+=delta;
  _originPts-=delta;
  renderOriginAttrs();
}

function confirmOriginAttrs(){
  if(_originPts>0){toast('还有属性点未分配');return;}
  G.str=_originAttrs.str;
  G.agi=_originAttrs.agi;
  G.int=_originAttrs.int;
  G.cha=_originAttrs.cha;
  G.luk=_originAttrs.luk;
  G.maxHp=calcMaxHp();G.hp=G.maxHp;
  G.maxMp=calcMaxMp();G.mp=G.maxMp;
  updateStatus();
  toast('属性分配完成！');
  sceneWorldMap();
}

// ═══════════════════════════════════════════════════════════
// SCENE: WORLD MAP
// ═══════════════════════════════════════════════════════════

function sceneWorldMap(){
  var loc=G.location;
  var cur=LOCATIONS[loc];
  
  var h='';
  h+='<div class="scene"><em>【世界地图】</em></div>';
  
  // 地图渲染
  h+=renderWorldMapVisual();
  
  h+='<div class="scene" style="font-size:11px"><em>当前位置：'+cur.name+'</em> — '+cur.desc+'</div>';
  h+='<hr class="divider">';
  h+='<div class="btns">';
  
  if(cur.isTown||loc==='whitecity'){
    h+='<button class="btn" onclick="sceneTown()">🏰 进入'+cur.name+'</button>';
  }
  
  if(cur.dungeon){
    h+='<button class="btn" onclick="enterDungeon()">⚔️ 进入迷宫</button>';
  }
  
  if(cur.enemies&&cur.enemies.length>0){
    h+='<button class="btn" onclick="startExploration()">⚔️ 探索（可能遇敌）</button>';
  }
  
  if(cur.type==='dungeon'){
    h+='<button class="btn" onclick="sceneDungeon()">🗺️ 迷宫（进入迷宫地图）</button>';
    h+='<button class="btn" onclick="leaveDungeon()">↩️ 离开迷宫</button>';
  }
  
  if(G.attrPts>0)h+='<button class="btn" onclick="sceneAllocAttr()">💪 升级 ('+G.attrPts+'属性点)</button>';
  if(G.skillPts>0)h+='<button class="btn" onclick="sceneLearnSkill()">📖 学习技能 ('+G.skillPts+'点)</button>';
  h+='<button class="btn" onclick="sceneInventory()">🎒 背包/装备</button>';
  h+='<button class="btn" onclick="scenePlayerInfo()">👤 角色状态</button>';
  h+='</div>';
  
  render(h);
}

function renderWorldMapVisual(){
  var h='<div class="world-visual">';
  var loc=G.location;
  
  var spots={
    fortress:{x:2,y:1},
    darkforest:{x:5,y:2},
    mine:{x:8,y:1},
    whitecity:{x:5,y:4},
    lake:{x:5,y:6},
  };
  
  // 简单ASCII地形图
  h+='  🌲🌲🌲     🏔️🏔️🏔️     ▓▓▓      \n';
  h+='🌲🌲  幽暗  🌲🌲    ▓矿洞▓     \n';
  h+='🌲🌲🌲🌲🌲🌲🌲   ▓▓▓▓▓   ▓▓▓▓▓   \n';
  h+='   白城★★★     坠星湖     🌊  \n';
  h+='   (白城)       (湖畔)   🌊🌊  \n';
  h+='       破碎堡垒                    \n';
  h+='       (堡垒)                     \n';
  h+='</div>';
  
  // 可点击地名
  h+='<div style="font-size:11px;display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">';
  var locs=[
    {id:'whitecity',name:'白城'},
    {id:'lake',name:'坠星湖畔'},
    {id:'darkforest',name:'幽暗森林'},
    {id:'fortress',name:'破碎堡垒'},
    {id:'mine',name:'暗影矿洞'},
  ];
  for(var i=0;i<locs.length;i++){
    var l=locs[i];
    var locked=!LOCATIONS[l.id].unlocked;
    var cur=(l.id===loc);
    h+='<span onclick="'+(locked?'':'travelTo(\''+l.id+'\')')+'" style="cursor:'+(locked?'default':'pointer')+';color:'+(cur?'#f80':(locked?'#3a3a3a':'#d4a017'))+';font-size:11px">'+(cur?'★':'')+l.name+(locked?' 🔒':'')+'</span>';
  }
  h+='</div>';
  
  return h;
}

function travelTo(destId){
  var dest=LOCATIONS[destId];
  if(!dest)return;
  if(!dest.unlocked){toast('该地点尚未解锁');return;}
  G.location=destId;
  toast('前往 '+dest.name);
  sceneWorldMap();
}

// ═══════════════════════════════════════════════════════════
// SCENE: TOWN
// ═══════════════════════════════════════════════════════════

function sceneTown(){
  var h='';
  h+='<div class="scene"><em>【白城】</em></div>';
  h+=renderTownVisual();
  h+='<div class="scene" style="font-size:11px;color:#5a5a4a">点击建筑进入</div>';
  h+='<hr class="divider">';
  h+='<div class="btns">';
  h+='<button class="btn" onclick="sceneMarket()">🏪 市场 — 买卖货物</button>';
  h+='<button class="btn" onclick="sceneSmith()">⚒️ 铁匠铺 — 装备</button>';
  h+='<button class="btn" onclick="sceneGuild()">📜 公会 — 接任务</button>';
  h+='<button class="btn" onclick="sceneInn()">🍺 旅店 — 休息恢复</button>';
  h+='<button class="btn" onclick="sceneWorldMap()">↩️ 返回城门口</button>';
  h+='</div>';
  render(h);
}

function renderTownVisual(){
  var h='<div class="town-visual">';
  h+='      ┌─────────────┐\n';
  h+='      │   🏰 白城   │\n';
  h+='      └─────────────┘\n';
  h+='  ┌────────┐  ┌────────┐\n';
  h+='  │  🏪    │  │  📜    │\n';
  h+='  │ 市场  │  │  公会  │\n';
  h+='  └────────┘  └────────┘\n';
  h+='        ┌────────┐\n';
  h+='        │  ⚒️    │\n';
  h+='        │ 铁匠  │\n';
  h+='        └────────┘\n';
  h+='  ═══════════════════\n';
  h+='        广  场\n';
  h+='    ═══════════\n';
  h+='        ↑ 你\n';
  h+='      ┌────────┐\n';
  h+='      │  🍺    │\n';
  h+='      │  旅店  │\n';
  h+='      └────────┘\n';
  h+='</div>';
  
  h+='<div style="font-size:10px;color:#5a5a4a;text-align:center;margin-top:4px">';
  h+='<span class="town-bld" onclick="sceneMarket()">🏪 市场</span> · ';
  h+='<span class="town-bld" onclick="sceneSmith()">⚒️ 铁匠</span> · ';
  h+='<span class="town-bld" onclick="sceneGuild()">📜 公会</span> · ';
  h+='<span class="town-bld" onclick="sceneInn()">🍺 旅店</span>';
  h+='</div>';
  
  return h;
}

// ═══════════════════════════════════════════════════════════
// SCENE: DUNGEON
// ═══════════════════════════════════════════════════════════

function enterDungeon(){
  var W=5,H=5;
  var grid=[];
  for(var r=0;r<H;r++){grid[r]=[];for(var c=0;c<W;c++)grid[r][c]=DUNGEON_ROOMS.empty;}
  
  // 随机敌人
  var enemyCount=rand(1,3);
  var ec=[];
  for(var i=0;i<enemyCount;i++)ec.push({r:rand(0,H-1),c:rand(0,W-1)});
  
  // 宝箱
  var chest={r:rand(0,H-1),c:rand(0,W-1)};
  
  // 事件
  var eventRoom={r:rand(0,H-1),c:rand(0,W-1)};
  
  // 出口
  var exit={r:H-1,c:W-1};
  
  for(var er=0;er<ec.length;er++){
    var ep=ec[er];
    if(ep.r===0&&ep.c===0)continue;
    grid[ep.r][ep.c]=Object.assign({},DUNGEON_ROOMS.enemy);
  }
  
  grid[chest.r][chest.c]=Object.assign({},DUNGEON_ROOMS.chest);
  grid[eventRoom.r][eventRoom.c]=Object.assign({},DUNGEON_ROOMS.event);
  grid[exit.r][exit.c]=Object.assign({},DUNGEON_ROOMS.exit);
  
  G.dungeon={grid:grid,W:W,H:H,rooms:ec,chest:chest,event:eventRoom,exit:exit,visited:{}};
  G.dungeonPos={r:0,c:0};
  G.dungeon.visited['0,0']=true;
  grid[0][0]=Object.assign({},DUNGEON_ROOMS.player);
  
  toast('进入暗影矿洞');
  sceneDungeon();
}

function renderDungeonGrid(){
  var d=G.dungeon;
  var p=G.dungeonPos;
  if(!d)return '';
  
  // 重新生成当前状态
  var grid=[];
  for(var r=0;r<d.H;r++){grid[r]=[];for(var c=0;c<d.W;c++){
    var v=d.visited[r+','+c];
    grid[r][c]=v?DUNGEON_ROOMS.visited:DUNGEON_ROOMS.empty;
  }}
  
  // 放置动态元素
  for(var i=0;i<d.rooms.length;i++){
    var er=d.rooms[i];
    if(!d.visited[er.r+','+er.c]){grid[er.r][er.c]=DUNGEON_ROOMS.enemy;}
  }
  if(!d.visited[d.chest.r+','+d.chest.c])grid[d.chest.r][d.chest.c]=DUNGEON_ROOMS.chest;
  if(!d.visited[d.event.r+','+d.event.c])grid[d.event.r][d.event.c]=DUNGEON_ROOMS.event;
  grid[d.exit.r][d.exit.c]=DUNGEON_ROOMS.exit;
  grid[p.r][p.c]=DUNGEON_ROOMS.player;
  
  var h='<div class="dungeon-grid">';
  for(var r=0;r<d.H;r++){
    for(var c=0;c<d.W;c++){
      var room=grid[r][c];
      var isPlayer=p.r===r&&p.c===c;
      var isVisited=d.visited[r+','+c];
      var cls='dg-cell'+(isPlayer?' player':'')+(isVisited&&!isPlayer?' visited':'');
      var bg=isVisited&&!isPlayer?'#1a1a20':'#151520';
      h+='<div class="'+cls+'" style="font-size:16px;color:'+room.color+';background:'+bg+'">'+room.char+'</div>';
    }
  }
  h+='</div>';
  return h;
}

function sceneDungeon(){
  var d=G.dungeon;
  if(!d){toast('未在迷宫中');sceneWorldMap();return;}
  var p=G.dungeonPos;
  var room=d.grid[p.r][p.c];
  
  var h='';
  h+='<div class="scene"><em>【暗影矿洞】</em></div>';
  h+=renderDungeonGrid();
  h+='<div class="scene" style="font-size:11px">当前位置：'+room.name+'</div>';
  h+='<hr class="divider">';
  h+='<div class="btns">';
  
  if(room===DUNGEON_ROOMS.enemy){
    h+='<button class="btn" onclick="dungeonFightEnemy()">⚔️ 战斗</button>';
  } else if(room===DUNGEON_ROOMS.chest){
    h+='<button class="btn" onclick="openChest()">📦 开启宝箱'+(G.keys>0?' ('+G.keys+'把钥匙)':' 🔒(需要钥匙)')+'</button>';
  } else if(room===DUNGEON_ROOMS.event){
    h+='<button class="btn" onclick="triggerEvent()">❓ 调查事件</button>';
  } else if(room===DUNGEON_ROOMS.exit){
    h+='<button class="btn" onclick="leaveDungeon()">↩️ 离开迷宫</button>';
  } else {
    h+='<div style="font-size:11px;color:#5a5a4a;text-align:center">空地，可自由移动</div>';
  }
  
  h+='</div>';
  h+='<div class="scene" style="font-size:11px;margin-top:6px">选择移动方向：</div>';
  
  // 方向按钮
  h+='<div class="dir-btns">';
  h+='<div></div>';
  h+='<button class="dir-btn" onclick="moveInDungeon(-1,0)">↑</button>';
  h+='<div></div>';
  h+='<button class="dir-btn" onclick="moveInDungeon(0,-1)">←</button>';
  h+='<div style="font-size:10px;color:#5a5a4a;display:flex;align-items:center;justify-content:center">@</div>';
  h+='<button class="dir-btn" onclick="moveInDungeon(0,+1)">→</button>';
  h+='<div></div>';
  h+='<button class="dir-btn" onclick="moveInDungeon(+1,0)">↓</button>';
  h+='<div></div>';
  h+='</div>';
  
  h+='<button class="cancel-btn" onclick="sceneWorldMap()">↩️ 离开迷宫（传送出）</button>';
  render(h);
}

function moveInDungeon(dr,dc){
  var d=G.dungeon;
  var p=G.dungeonPos;
  var nr=p.r+dr,nc=p.c+dc;
  if(nr<0||nr>=d.H||nc<0||nc>=d.W){
    toast('无法移动到那里');
    return;
  }
  p.r=nr;p.c=nc;
  d.visited[nr+','+nc]=true;
  toast('移动到 ('+(nr+1)+','+(nc+1)+')');
  sceneDungeon();
}

function dungeonFightEnemy(){
  var eids=LOCATIONS.mine.enemies.filter(function(id){return id!=='boss';});
  var eid=eids[rand(0,eids.length-1)];
  var e=Object.assign({},ENEMIES[eid],{curHp:ENEMIES[eid].hp});
  G.battle={enemies:[e],log:[],turn:0,defending:false,warcry:0,gamblerUsed:false,arena:true};
  G.inBattle=true;
  G.selectedTarget=0;
  G.attackMode='attack';
  toast('⚔️ 遭遇敌人！');
  renderBattle('进入战斗！');
}

function openChest(){
  if(G.keys<=0){
    toast('📦 需要钥匙！可在商店购买或宝箱掉落');
    sceneDungeon();
    return;
  }
  G.keys--;
  var loot=[
    {name:'铁剑',atk:10,slot:'weapon',rarity:'fine'},
    {name:'生命药剂',type:'consumable',hp:50},
    {name:'200金币',gold:200},
  ];
  var item=loot[rand(0,loot.length-1)];
  if(item.gold)G.gold+=item.gold;
  else G.inventory.push(Object.assign({id:'drop_'+Date.now()},item));
  
  G.dungeon.visited[G.dungeon.chest.r+','+G.dungeon.chest.c]=true;
  toast('📦 开启宝箱！获得：'+item.name);
  updateStatus();
  sceneDungeon();
}

function triggerEvent(){
  var events=[
    {msg:'发现一袋金币！',gold:30},
    {msg:'发现陷阱！损失30HP',hp:30},
    {msg:'发现生命药剂',hp:50,heal:true},
    {msg:'遭遇暗影狼！',fight:true},
  ];
  var ev=events[rand(0,events.length-1)];
  G.dungeon.visited[G.dungeon.event.r+','+G.dungeon.event.c]=true;
  
  if(ev.gold){
    G.gold+=ev.gold;
    toast('💰 '+ev.msg);
  } else if(ev.hp){
    if(ev.heal){
      G.hp=Math.min(G.maxHp,G.hp+ev.hp);
      toast('💚 '+ev.msg);
    } else {
      G.hp=Math.max(1,G.hp-ev.hp);
      toast('💀 '+ev.msg);
    }
  } else if(ev.fight){
    var e=Object.assign({},ENEMIES.wolf,{curHp:ENEMIES.wolf.hp});
    G.battle={enemies:[e],log:[],turn:0,defending:false,warcry:0,gamblerUsed:false,arena:true};
    G.inBattle=true;
    G.selectedTarget=0;
    G.attackMode='attack';
    toast('⚔️ '+ev.msg);
    renderBattle('暗影狼！');
    updateStatus();
    return;
  }
  updateStatus();
  sceneDungeon();
}

function leaveDungeon(){
  if(G.dungeon&&G.dungeonPos){
    var p=G.dungeonPos;
    if(p.r===G.dungeon.exit.r&&p.c===G.dungeon.exit.c){
      toast('从出口离开迷宫');
      G.gold+=50;
      toast('💰 完成迷宫奖励：50金币');
    }
  }
  G.dungeon=null;
  G.dungeonPos=null;
  G.location='darkforest';
  updateStatus();
  sceneWorldMap();
}

// ═════════════════════════════════════════════════════════
// SCENE: BATTLE (enhanced)
// ═════════════════════════════════════════════════════════

function renderBattle(msg) {
  if (!G || !G.battle) return;
  var b = G.battle;
  var html = '';

  // Header
  html += '<div style="text-align:center;color:#d4a017;font-size:14px;margin-bottom:6px">' + (msg || '⚔️ 战斗') + '</div>';

  // Enemies
  var alive = b.enemies.filter(function(e) { return e.curHp > 0; });
  for (var i = 0; i < b.enemies.length; i++) {
    var e = b.enemies[i];
    var dead = e.curHp <= 0;
    var isSelected = (i === G.selectedTarget && !dead);
    var cls = 'enemy-box' + (dead ? ' dead' : '') + (isSelected ? ' selected' : '');

    html += '<div class="' + cls + '" onclick="' + (dead ? '' : 'selectTarget(' + i + ')') + '">';
    
    // ASCII art
    html += '<div class="eb-art" style="color:' + (dead ? '#333' : e.isBoss ? '#f80' : '#6b8a5a') + '">';
    var art = e.art || e.ascii || [' ? ', ' ? ', ' ? '];
    for (var j = 0; j < art.length; j++) {
      html += art[j] + '\n';
    }
    html += '</div>';
    
    // Name + HP
    html += '<div class="eb-info">';
    html += '<span class="eb-name">' + e.emoji + ' <strong>' + e.name + '</strong>' + (e.isBoss ? ' 👑' : '') + '</span>';
    html += '<span class="eb-hp">' + Math.max(0, e.curHp) + '/' + e.hp + '</span>';
    html += '</div>';
    
    // HP bar
    var pct = dead ? 0 : Math.max(2, e.curHp / e.hp * 100);
    html += '<div class="hpbar"><div class="hpf fill" style="width:' + pct + '%"></div></div>';
    
    if (isSelected) {
      html += '<div style="font-size:10px;color:#f80;text-align:center;margin-top:2px">← 你的目标</div>';
    }
    html += '</div>';
  }

  // Player status
  html += '<div class="player-status">';
  html += '<div class="ps-bars">';
  html += '<div class="ps-bar ps-hp">';
  html += '<div class="ps-label"><span>❤️ HP</span><span>' + G.hp + '/' + G.maxHp + '</span></div>';
  html += '<div class="hpbar"><div class="hpf fill" style="width:' + Math.max(2, G.hp / G.maxHp * 100) + '%;background:#c44"></div></div>';
  html += '</div>';
  html += '<div class="ps-bar ps-mp">';
  html += '<div class="ps-label"><span>💧 MP</span><span>' + G.mp + '/' + G.maxMp + '</span></div>';
  html += '<div class="mpbar"><div class="mpfill" style="width:' + Math.max(2, G.mp / G.maxMp * 100) + '%;background:#48f"></div></div>';
  html += '</div>';
  html += '</div>';
  
  // XP bar
  var xpNeed = G.nextXp || calcNextXp(G.level);
  html += '<div style="font-size:10px;color:#5a5a4a;margin-top:4px">EXP ' + G.xp + '/' + xpNeed + ' <span style="color:#4a4">(' + (xpNeed - G.xp) + ' needed)</span></div>';
  var xpPct = Math.min(100, G.xp / xpNeed * 100);
  html += '<div class="hpbar" style="height:6px"><div class="hpf fill" style="width:' + xpPct + '%;background:#4a4"></div></div>';
  html += '</div>';

  // Log (last 2 lines)
  if (b.log && b.log.length > 0) {
    html += '<div style="font-size:10px;color:#7a7a6a;margin:4px 0;padding:4px;background:#0a0a14;border-radius:3px">';
    html += b.log.slice(-2).join('<br>');
    html += '</div>';
  }

  // Check win/loss
  if (alive.length === 0) {
    html += '<div style="text-align:center;color:#5c5;font-size:15px;margin:8px 0">🎉 胜利！</div>';
    html += '<button class="confirm-btn" onclick="endBattle()">继续</button>';
    render(html);
    return;
  }
  if (G.hp <= 0) {
    html += '<div style="text-align:center;color:#c44;font-size:15px;margin:8px 0">💀 你倒下了...</div>';
    html += '<button class="btn" onclick="sceneDeath()" style="width:100%;margin-top:4px">查看结果</button>';
    render(html);
    return;
  }

  // Attack mode selection
  html += '<hr class="divider">';
  html += '<div style="font-size:11px;color:#5a5a4a;margin-bottom:4px">选择行动（点击上方敌人选择目标）：</div>';
  
  html += '<div class="attack-modes">';
  html += '<button class="am-btn' + (G.attackMode === 'attack' ? ' active' : '') + '" onclick="setAttackMode(\'attack\')">⚔️ 普通攻击</button>';
  
  // Show origin skill
  if (G.origin) {
    var oSkill = G.origin.skill;
    if (oSkill && oSkill.name) {
      html += '<button class="am-btn' + (G.attackMode === 'origin' ? ' active' : '') + '" onclick="setAttackMode(\'origin\')">' + oSkill.emoji + ' ' + oSkill.name + ' [' + oSkill.type + ']</button>';
    }
  }
  
  // Learned skills
  if (G.skills) {
    for (var s = 0; s < G.skills.length; s++) {
      var skId = G.skills[s];
      var sk = SKILLS.find(function(x) { return x.id === skId; });
      if (sk) {
        html += '<button class="am-btn' + (G.attackMode === skId ? ' active' : '') + (G.mp < sk.cost ? ' disabled' : '') + '" onclick="setAttackMode(\'' + skId + '\')">' + sk.name + ' [' + sk.target + '] (' + sk.cost + 'MP)</button>';
      }
    }
  }
  
  html += '<button class="am-btn' + (G.attackMode === 'defend' ? ' active' : '') + '" onclick="setAttackMode(\'defend\')">🛡️ 防御</button>';
  html += '<button class="am-btn" onclick="tryFlee()">🏃 逃跑</button>';
  html += '</div>';

  // Execute button (if mode selected and target selected)
  if (G.attackMode && G.selectedTarget >= 0) {
    var targetName = (b.enemies[G.selectedTarget] && b.enemies[G.selectedTarget].curHp > 0) ? b.enemies[G.selectedTarget].name : '无目标';
    html += '<button class="confirm-btn" onclick="executeAttack()" style="margin-top:6px">执行：' + G.attackMode + ' → ' + targetName + '</button>';
  }

  render(html);
}

function setAttackMode(mode) {
  G.attackMode = mode;
  renderBattle('选择模式：' + mode);
}

function selectTarget(idx) {
  G.selectedTarget = idx;
  renderBattle('目标：' + (G.battle.enemies[idx] ? G.battle.enemies[idx].name : '?'));
}

function executeAttack() {
  var mode = G.attackMode;
  if (!mode) { toast('请先选择行动模式'); return; }
  
  if (mode === 'attack') {
    playerAttack();
  } else if (mode === 'defend') {
    playerDefend();
  } else if (mode === 'origin') {
    // Use origin skill
    useOriginSkill();
  } else {
    // Skill
    playerSkill(mode);
  }
}

function playerAttack() {
  var b = G.battle;
  var alive = b.enemies.filter(function(e) { return e.curHp > 0; });
  if (alive.length === 0) return;

  var targetIdx = G.selectedTarget;
  if (!b.enemies[targetIdx] || b.enemies[targetIdx].curHp <= 0) {
    // Find first alive
    for (var i = 0; i < b.enemies.length; i++) {
      if (b.enemies[i].curHp > 0) { targetIdx = i; break; }
    }
  }
  var target = b.enemies[targetIdx];

  var dmg = rand(Math.floor(calcAtk() * 0.8), Math.floor(calcAtk() * 1.2));
  if (b.warcry && b.warcry > 0) dmg = Math.floor(dmg * 1.2);
  
  var isCrit = Math.random() * 100 < calcCrit();
  if (isCrit) dmg = Math.floor(dmg * (1 + calcCritDmg()));
  
  target.curHp -= dmg;
  b.log.push('⚔️ 你攻击 ' + target.name + '，造成 <span style="color:#c44">' + dmg + '</span>' + (isCrit ? ' <span style="color:#f80">会心！</span>' : ''));
  
  if (b.warcry && b.warcry > 0) b.warcry--;

  G.attackMode = null;
  setTimeout(function() { enemyTurn(); }, 400);
}

function playerDefend() {
  G.battle.defending = true;
  G.battle.log.push('🛡️ 你采取防御姿态，受伤减半');
  G.attackMode = null;
  setTimeout(function() { enemyTurn(); }, 400);
}

function useOriginSkill() {
  var o = G.origin;
  if (!o || !o.skill) return;
  
  if (o.id === 'warrior') {
    G.battle.warcry = 3;
    G.battle.log.push('📢 战吼！攻击+20% 持续3回合');
  } else if (o.id === 'gambler') {
    gamblerAttack();
    return;
  } else if (o.id === 'cleric') {
    var healAmt = Math.floor(G.maxHp * 0.1);
    G.hp = Math.min(G.maxHp, G.hp + healAmt);
    G.battle.log.push('🙏 祈祷恢复 <span style="color:#5c5">' + healAmt + '</span> HP');
  } else {
    G.battle.log.push('🔮 ' + o.skill.name + '：' + o.skill.desc);
  }
  
  G.attackMode = null;
  setTimeout(function() { enemyTurn(); }, 400);
}

function playerSkill(sid) {
  var sk = SKILLS.find(function(s) { return s.id === sid; });
  if (!sk) return;
  if (G.mp < sk.cost) { toast('💧 MP不足！'); return; }
  
  G.mp -= sk.cost;
  var b = G.battle;
  var alive = b.enemies.filter(function(e) { return e.curHp > 0; });
  
  if (sk.target === '自身' || sk.target === 'Self') {
    if (sk.healMin) {
      var heal = rand(sk.healMin, sk.healMax);
      G.hp = Math.min(G.maxHp, G.hp + heal);
      b.log.push(sk.name + ' 恢复 <span style="color:#5c5">' + heal + '</span> HP');
    }
  } else if (sk.aoe) {
    // AoE attack
    var total = 0;
    for (var i = 0; i < alive.length; i++) {
      var d = rand(sk.dmgMin, sk.dmgMax);
      alive[i].curHp -= d;
      total += d;
    }
    b.log.push(sk.name + ' [群攻] 对所有敌人造成 <span style="color:#f80">' + total + '</span> 伤害');
  } else if (sk.missiles) {
    var total2 = 0;
    var targetIdx = G.selectedTarget;
    if (!b.enemies[targetIdx] || b.enemies[targetIdx].curHp <= 0) {
      for (var j = 0; j < b.enemies.length; j++) {
        if (b.enemies[j].curHp > 0) { targetIdx = j; break; }
      }
    }
    for (var m = 0; m < sk.missiles; m++) {
      total2 += rand(sk.dmgMin, sk.dmgMax);
    }
    b.enemies[targetIdx].curHp -= total2;
    b.log.push(sk.name + ' 造成 <span style="color:#f80">' + total2 + '</span> 伤害');
  } else {
    // Single target
    var targetIdx2 = G.selectedTarget;
    if (!b.enemies[targetIdx2] || b.enemies[targetIdx2].curHp <= 0) {
      for (var k = 0; k < b.enemies.length; k++) {
        if (b.enemies[k].curHp > 0) { targetIdx2 = k; break; }
      }
    }
    var dmg2 = rand(sk.dmgMin, sk.dmgMax);
    b.enemies[targetIdx2].curHp -= dmg2;
    b.log.push(sk.name + ' [' + sk.target + '] 造成 <span style="color:#f80">' + dmg2 + '</span> 伤害');
  }
  
  G.attackMode = null;
  updateStatus();
  setTimeout(function() { enemyTurn(); }, 400);
}

function gamblerAttack() {
  var b = G.battle;
  var winChance = 0.25 + G.luk * 0.02;
  if (Math.random() < winChance) {
    toast('🎲 孤注一掷——胜！');
    var alive = b.enemies.filter(function(e) { return e.curHp > 0; });
    var targetIdx = G.selectedTarget;
    if (!b.enemies[targetIdx] || b.enemies[targetIdx].curHp <= 0) {
      for (var i = 0; i < b.enemies.length; i++) {
        if (b.enemies[i].curHp > 0) { targetIdx = i; break; }
      }
    }
    var target = b.enemies[targetIdx];
    var dmg = Math.floor(calcAtk() * 2.5);
    target.curHp -= dmg;
    b.log.push('🎲 孤注一掷成功！造成 <span style="color:#f80">' + dmg + '</span> 伤害！');
  } else {
    toast('🎲 孤注一掷——败！');
    var selfDmg = Math.floor(G.hp * 0.3);
    G.hp = Math.max(1, G.hp - selfDmg);
    b.log.push('🎲 孤注一掷失败！自伤 <span style="color:#c44">' + selfDmg + '</span>');
    updateStatus();
  }
  b.gamblerUsed = true;
  G.attackMode = null;
  setTimeout(function() { enemyTurn(); }, 400);
}

function enemyTurn() {
  var b = G.battle;
  var alive = b.enemies.filter(function(e) { return e.curHp > 0; });

  // Cleric passive
  if (G.origin && G.origin.id === 'cleric') {
    var healAmt = Math.floor(G.maxHp * 0.1);
    G.hp = Math.min(G.maxHp, G.hp + healAmt);
    b.log.push('🙏 祈祷恢复 <span style="color:#5c5">' + healAmt + '</span> HP');
  }

  for (var i = 0; i < alive.length; i++) {
    var e = alive[i];
    if (Math.random() * 100 < calcDodge()) {
      b.log.push('🌿 ' + e.name + ' 的攻击被你闪避！');
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
  renderBattle('敌方回合结束');
}

function endBattle() {
  var b = G.battle;
  G.inBattle = false;
  var isDungeon = b.dungeon;

  var totalXp = 0;
  var totalGold = 0;
  for (var i = 0; i < b.enemies.length; i++) {
    var e = b.enemies[i];
    totalXp += e.xp || 0;
    totalGold += rand(e.goldMin || 0, e.goldMax || 0);
  }

  G.xp += totalXp;
  G.gold += totalGold;
  G.totalBattlesWon++;

  // Level up check
  while (G.xp >= (G.nextXp || calcNextXp(G.level))) {
    doLevelUp();
  }

  // Drop
  var dropText = '';
  if (Math.random() < 0.35) {
    var drops = [
      { name: '哥布林短剑', atk: 12, str: 3, slot: 'weapon', rarity: 'fine' },
      { name: '哥布林皮甲', def: 8, hp: 20, slot: 'armor', rarity: 'common' },
      { name: '迷宫钥匙', desc: '开启宝箱', consumable: true, slot: 'item' },
    ];
    var drop = drops[rand(0, drops.length - 1)];
    if (drop.name === '迷宫钥匙') {
      G.keys = (G.keys || 0) + 1;
      dropText = '<br>📦 获得：<span class="rarity-' + (drop.rarity || 'common') + '">' + drop.name + '</span>';
    } else {
      G.inventory.push(Object.assign({}, drop, { id: 'drop_' + Date.now() }));
      dropText = '<br>📦 掉落：<span class="rarity-' + drop.rarity + '">' + drop.name + '</span>';
    }
  }

  G.battle = null;
  G.attackMode = null;
  updateStatus();

  var html = '';
  html += '<div class="scene"><em>【战斗胜利】</em></div>';
  html += '<div class="scene">获得 ⭐' + totalXp + ' EXP | 💰' + totalGold + ' 金币' + dropText + '</div>';
  if (G.attrPts > 0) html += '<button class="confirm-btn" onclick="sceneAllocAttr()" style="margin-top:4px">💪 分配属性点 (' + G.attrPts + '点)</button>';
  if (G.skillPts > 0) html += '<button class="confirm-btn" onclick="sceneLearnSkill()" style="margin-top:4px">📖 学习技能 (' + G.skillPts + '点)</button>';
  html += '<button class="btn" onclick="sceneWorldMap()" style="width:100%;margin-top:4px">↩️ 返回</button>';
  render(html);
}

function sceneDeath() {
  G.totalBattlesLost++;
  var lossGold = Math.floor(G.gold * 0.1);
  var lossXp = Math.floor(G.xp * 0.2);
  G.gold -= lossGold;
  G.xp -= lossXp;
  if (G.xp < 0) G.xp = 0;

  var html = '';
  html += '<div style="text-align:center;color:#c44;font-size:16px;margin:8px 0">💀 战斗失败</div>';
  html += '<div style="color:#5a5a4a;font-size:12px">你被送回最近的城镇——<em>' + getTownName() + '</em>。</div>';
  html += '<div style="color:#c44;font-size:12px;margin:4px 0">损失：- 💰' + lossGold + ' 金币 | - ⭐' + lossXp + ' EXP</div>';
  html += '<div style="font-size:11px;color:#5a5a4a">（当前EXP：' + G.xp + '）</div>';
  html += '<button class="confirm-btn" onclick="sceneRespawn()" style="margin-top:8px">🔄 恢复并继续（在城镇休息后）</button>';
  render(html);
}

function sceneRespawn() {
  G.hp = Math.floor(G.maxHp * 0.5);
  G.mp = Math.floor(G.maxMp * 0.5);
  var town = getCurrentTown();
  if (town) G.location = town.id;
  updateStatus();
  sceneTown();
}

function getTownName() {
  var town = getCurrentTown();
  return town ? town.name : '白城';
}

function getCurrentTown() {
  for (var id in LOCATIONS) {
    if (LOCATIONS[id].type === 'town' && LOCATIONS[id].unlocked) return LOCATIONS[id];
  }
  return LOCATIONS.whitecity;
}

// ═════════════════════════════════════════════════════════
// SCENE: ALLOCATE ATTRIBUTES (level up)
// ═════════════════════════════════════════════════════════

var _attrDraft = null;

function sceneAllocAttr() {
  if (!_attrDraft) {
    _attrDraft = { str: G.str, agi: G.agi, int: G.int, cha: G.cha, luk: G.luk, pts: G.attrPts };
  }
  renderAttrAlloc();
}

function renderAttrAlloc() {
  var attrs = [
    { key: 'str', name: '⚔️ 力量', hint: '+2物攻/+5HP', val: _attrDraft.str, base: G.str - (_attrDraft.str - G.str) },
    { key: 'agi', name: '🌿 敏捷', hint: '+闪避', val: _attrDraft.agi },
    { key: 'int', name: '🧙 智力', hint: '+2魔攻/+3MP', val: _attrDraft.int },
    { key: 'cha', name: '💬 魅力', hint: '+折扣', val: _attrDraft.cha },
    { key: 'luk', name: '🎲 幸运', hint: '+会心/+掉落', val: _attrDraft.luk },
  ];

  var html = '<div class="scene"><em>【分配属性点】</em> 剩余：<strong style="color:#d4a017">' + _attrDraft.pts + '</strong> 点</div>';
  html += '<div style="font-size:10px;color:#5a5a4a;margin-bottom:6px">每级固定3点，100级=300点</div>';

  for (var i = 0; i < attrs.length; i++) {
    var a = attrs[i];
    var delta = a.val - G[a.key];  // points spent this session
    html += '<div class="attr-row">';
    html += '<span class="attr-name">' + a.name + '</span>';
    html += '<span class="attr-val">' + a.val + (delta > 0 ? ' <span style="color:#5c5;font-size:10px">(+' + delta + ')</span>' : '') + '</span>';
    html += '<span class="attr-hint">' + a.hint + '</span>';
    html += '<div class="attr-btns">';
    html += '<button class="abtn" onclick="adjAttr(\'' + a.key + '\',-1)" ' + (delta <= 0 ? 'disabled' : '') + '>−</button>';
    html += '<button class="abtn" onclick="adjAttr(\'' + a.key + '\',1)" ' + (_attrDraft.pts <= 0 ? 'disabled' : '') + '>+</button>';
    html += '</div></div>';
  }

  html += '<button class="confirm-btn" onclick="confirmAttr()" ' + (_attrDraft.pts > 0 ? 'disabled' : '') + '>确认分配</button>';
  html += '<button class="cancel-btn" onclick="cancelAttr()">取消</button>';
  render(html);
}

function adjAttr(key, delta) {
  if (delta > 0 && _attrDraft.pts <= 0) return;
  var newVal = _attrDraft[key] + delta;
  if (delta < 0 && newVal < G[key]) return;  // can't go below base
  
  _attrDraft[key] = newVal;
  _attrDraft.pts -= delta;
  renderAttrAlloc();
}

function confirmAttr() {
  if (_attrDraft.pts > 0) { toast('还有 ' + _attrDraft.pts + ' 点未分配'); return; }
  G.str = _attrDraft.str;
  G.agi = _attrDraft.agi;
  G.int = _attrDraft.int;
  G.cha = _attrDraft.cha;
  G.luk = _attrDraft.luk;
  G.maxHp = calcMaxHp();
  G.hp = Math.min(G.hp, G.maxHp);
  G.maxMp = calcMaxMp();
  G.mp = Math.min(G.mp, G.maxMp);
  G.attrPts = 0;
  _attrDraft = null;
  updateStatus();
  toast('✅ 属性已分配');
  sceneWorldMap();
}

function cancelAttr() {
  _attrDraft = null;
  sceneWorldMap();
}

// ═════════════════════════════════════════════════════════
// SCENE: LEARN SKILL
// ═════════════════════════════════════════════════════════

function sceneLearnSkill() {
  var available = SKILLS.filter(function(s) {
    return G.skills.indexOf(s.id) < 0 && !s.passive;
  });
  
  var html = '<div class="scene"><em>【学习技能】</em> 技能点：<strong style="color:#d4a017">' + G.skillPts + '</strong></div>';
  
  if (available.length === 0) {
    html += '<div style="color:#5a5a4a;font-size:12px">已学完所有可用技能</div>';
  }
  
  for (var i = 0; i < available.length; i++) {
    var s = available[i];
    html += '<div class="sk-card" onclick="learnSkill(\'' + s.id + '\')">';
    html += '<div class="sk-header">';
    html += '<span class="sk-name">' + s.name + '</span>';
    html += '<span class="sk-type">[' + (s.target || '单体') + ']</span>';
    html += '</div>';
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
  if (G.skillPts > 0) {
    sceneLearnSkill();
  } else {
    sceneWorldMap();
  }
}

// ═════════════════════════════════════════════════════════
// SCENE: MARKET
// ═════════════════════════════════════════════════════════

function sceneMarket() {
  var discount = (G.origin && G.origin.id === 'trader' && !G.marketVisited) ? 0.85 : 1;
  G.marketVisited = true;

  var html = '<div class="scene"><em>【市场】</em> 💰 ' + G.gold + '</div>';
  if (discount < 1) {
    html += '<div style="color:#5c5;font-size:11px">✨ 讨价还价生效！所有购买' + Math.floor(discount * 100) + '%价格</div>';
  }
  html += '<hr class="divider">';

  for (var i = 0; i < GOODS.length; i++) {
    var g = GOODS[i];
    var price = Math.floor(g.basePrice * (Math.random() * 0.4 + 0.8));  // random price fluctuation
    g.currentPrice = price;
    var trend = Math.random() < 0.33 ? 'up' : (Math.random() < 0.5 ? 'stable' : 'down');
    g.trend = trend;
    
    var trendCls = trend === 'up' ? 'req-not' : (trend === 'down' ? 'req-met' : '');
    var trendTxt = trend === 'up' ? '📈 高价' : (trend === 'down' ? '📉 低价' : '📊 稳定');
    
    html += '<div class="attr-row">';
    html += '<span style="color:#b8a880;width:60px">' + g.name + '</span>';
    html += '<span class="' + trendCls + '" style="width:80px">' + trendTxt + '</span>';
    html += '<span style="color:#d4a017;width:80px">💰' + price + '</span>';
    html += '<div style="display:flex;gap:4px">';
    html += '<button class="abtn" style="font-size:10px" onclick="buyGoods(' + i + ',1)">买1</button>';
    html += '<button class="abtn" style="font-size:10px" onclick="buyGoods(' + i + ',5)">买5</button>';
    html += '</div></div>';
  }

  html += '<hr class="divider">';
  html += '<div style="font-size:12px;color:#5a5a4a">📦 货舱：' + G.cargo.length + '/100</div>';
  if (G.cargo.length > 0) {
    html += '<button class="btn" onclick="sellGoods()" style="width:100%;margin-top:4px">💰 前往他处贩卖</button>';
  }
  html += '<button class="cancel-btn" onclick="sceneTown()">返回</button>';
  render(html);
}

function buyGoods(idx, qty) {
  var g = GOODS[idx];
  var cost = g.currentPrice * qty;
  if (G.gold < cost) { toast('💰 金币不足！'); return; }
  if (G.cargo.length + qty > 100) { toast('📦 货舱已满！'); return; }
  G.gold -= cost;
  for (var i = 0; i < qty; i++) {
    G.cargo.push({ name: g.name, buyPrice: g.currentPrice, sellPrice: Math.floor(g.currentPrice * (1.2 + Math.random() * 0.5)) });
  }
  updateStatus();
  toast('✅ 购买 ' + qty + ' 单位 ' + g.name);
  sceneMarket();
}

function sellGoods() {
  if (G.cargo.length === 0) { toast('📦 货舱为空！'); return; }
  
  var html = '<div class="scene"><em>【贩卖】</em></div>';
  html += '<div class="scene">选择目的地（价格更高=更多利润）：</div>';
  html += '<div class="btns">';
  html += '<button class="btn" onclick="sellAt(\'lake\')">🌿 坠星湖畔（药材高价）</button>';
  html += '<button class="btn" onclick="sellAt(\'darkforest\')">🌲 幽暗森林（铁器短缺）</button>';
  html += '<button class="btn" onclick="sellAt(\'fortress\')">⚔️ 破碎堡垒（丝绸需求）</button>';
  html += '<button class="cancel-btn" onclick="sceneMarket()">返回</button>';
  html += '</div>';
  render(html);
}

function sellAt(destId) {
  var loc = LOCATIONS[destId];
  if (!loc) return;
  
  var mult = 1.0;
  var total = 0;
  for (var i = 0; i < G.cargo.length; i++) {
    var item = G.cargo[i];
    // Price varies by destination
    if (destId === 'lake' && item.name === '药材') mult = 1.8;
    else if (destId === 'darkforest' && item.name === '铁器') mult = 1.6;
    else if (destId === 'fortress' && item.name === '丝绸') mult = 1.5;
    else mult = 1.2;
    total += Math.floor(item.buyPrice * mult);
  }
  
  G.gold += total;
  G.cargo = [];
  updateStatus();
  
  var html = '';
  html += '<div style="text-align:center;color:#d4a017;font-size:18px;margin:12px 0">💰 获得 ' + total + ' 金币！</div>';
  html += '<div style="text-align:center;color:#5a5a4a;font-size:12px">在 ' + loc.name + ' 贩卖成功</div>';
  html += '<button class="confirm-btn" onclick="sceneTown()">返回城镇</button>';
  render(html);
}

// ═════════════════════════════════════════════════════════
// SCENE: SMITH
// ═════════════════════════════════════════════════════════

function sceneSmith() {
  var html = '<div class="scene"><em>【铁匠铺】</em> 💰 ' + G.gold + '</div>';
  html += '<div style="color:#5a5a4a;font-size:11px">装备有等级/属性要求，达到要求才能购买</div>';
  html += '<hr class="divider">';
  
  for (var i = 0; i < SHOP_ITEMS.length; i++) {
    var item = SHOP_ITEMS[i];
    var reqFail = checkEquipReq(item);
    var canBuy = !reqFail && G.gold >= item.price;
    
    html += '<div class="sk-card" style="' + (canBuy ? '' : 'opacity:0.6') + '">';
    html += '<div class="sk-name rarity-' + (item.rarity || 'common') + '">' + item.name + '</div>';
    html += '<div style="font-size:11px;color:#7a7a6a">' + (item.desc || '') + '</div>';
    html += '<div style="font-size:11px;color:' + (reqFail ? '#c44' : '#5a5a4a') + '">';
    if (item.atk) html += '⚔️+' + item.atk + ' ';
    if (item.def) html += '🛡️+' + item.def + ' ';
    if (item.hp) html += '❤️+' + item.hp + ' ';
    if (item.mp) html += '💧+' + item.mp + ' ';
    if (item.str) html += '力+' + item.str + ' ';
    if (item.int) html += '智+' + item.int + ' ';
    html += (reqFail || '可装备');
    html += '</div>';
    html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px">';
    html += '<span style="color:#d4a017;font-size:12px">💰' + item.price + '</span>';
    if (canBuy) {
      html += '<button class="abtn" style="font-size:10px" onclick="buyItem(' + i + ')">购买</button>';
    } else {
      html += '<span style="color:#c44;font-size:10px">' + (reqFail ? reqFail : '金币不足') + '</span>';
    }
    html += '</div></div>';
  }
  
  html += '<button class="cancel-btn" onclick="sceneTown()">返回</button>';
  render(html);
}

function buyItem(idx) {
  var item = SHOP_ITEMS[idx];
  if (G.gold < item.price) { toast('💰 金币不足'); return; }
  G.gold -= item.price;
  G.inventory.push(Object.assign({}, item, { id: 'item_' + Date.now() }));
  updateStatus();
  toast('✅ 购买「' + item.name + '」');
  sceneSmith();
}

// ═════════════════════════════════════════════════════════
// SCENE: INN
// ═════════════════════════════════════════════════════════

function sceneInn() {
  var html = '<div class="scene"><em>【旅店】</em></div>';
  html += '<div style="color:#5a5a4a;font-size:11px">「住一晚10金币，保证你睡得香！」</div>';
  html += '<hr class="divider">';
  html += '<div style="font-size:12px">❤️ HP: ' + G.hp + '/' + G.maxHp + ' | 💧 MP: ' + G.mp + '/' + G.maxMp + '</div>';
  html += '<div class="btns">';
  html += '<button class="btn" onclick="restInn()">🛏️ 住宿（10金币）— 完全恢复</button>';
  html += '<button class="cancel-btn" onclick="sceneTown()">返回</button>';
  html += '</div>';
  render(html);
}

function restInn() {
  if (G.gold < 10) { toast('💰 金币不足！'); return; }
  G.gold -= 10;
  G.hp = G.maxHp;
  G.mp = G.maxMp;
  updateStatus();
  toast('😴 休息完毕！完全恢复');
  sceneTown();
}

// ═════════════════════════════════════════════════════════
// SCENE: INVENTORY
// ═════════════════════════════════════════════════════════

function sceneInventory() {
  var html = '<div class="scene"><em>【背包 & 装备】</em></div>';
  
  // Equipped
  html += '<div style="font-size:11px;color:#5a5a4a;margin-bottom:4px">已装备：</div>';
  var slots = ['weapon', 'armor', 'accessory'];
  for (var s = 0; s < slots.length; s++) {
    var slot = slots[s];
    var eq = G.equipment[slot];
    html += '<div class="attr-row">';
    html += '<span style="color:#7a6a4a;width:60px">' + slot + '：</span>';
    if (eq) {
      html += '<span class="rarity-' + (eq.rarity || 'common') + '" style="flex:1">' + eq.name + '</span>';
      html += '<button class="abtn" style="font-size:10px" onclick="unequipItem(\'' + slot + '\')">卸下</button>';
    } else {
      html += '<span style="color:#333;flex:1">(空)</span>';
    }
    html += '</div>';
  }
  
  // Inventory
  html += '<hr class="divider">';
  html += '<div style="font-size:11px;color:#5a5a4a;margin-bottom:4px">背包（' + G.inventory.length + '件）：</div>';
  if (G.inventory.length === 0) {
    html += '<div style="color:#444;font-size:12px">空空如也</div>';
  } else {
    for (var j = 0; j < G.inventory.length; j++) {
      var item = G.inventory[j];
      var reqFail = checkEquipReq(item);
      html += '<div class="attr-row">';
      html += '<span class="rarity-' + (item.rarity || 'common') + '">' + item.name + '</span>';
      html += '<span style="font-size:10px;' + (reqFail ? 'color:#c44' : 'color:#5a5a4a') + '">';
      if (item.atk) html += '⚔️+' + item.atk + ' ';
      if (item.def) html += '🛡️+' + item.def + ' ';
      if (item.hp) html += '❤️+' + item.hp + ' ';
      html += (reqFail ? reqFail : '');
      html += '</span>';
      if (!reqFail) {
        html += '<button class="abtn" style="font-size:10px" onclick="equipItem(' + j + ')">装备</button>';
      } else {
        html += '<span style="color:#c44;font-size:10px">未达要求</span>';
      }
      html += '</div>';
    }
  }
  
  html += '<hr class="divider">';
  html += '<div style="font-size:11px;color:#5a5a4a">💰 ' + G.gold + ' 金币 | 胜' + G.totalBattlesWon + ' 败' + G.totalBattlesLost + '</div>';
  html += '<button class="cancel-btn" onclick="sceneWorldMap()">返回地图</button>';
  render(html);
}

function equipItem(idx) {
  var item = G.inventory[idx];
  var slot = item.slot;
  if (!slot) { toast('该物品无法装备'); return; }
  if (G.equipment[slot]) G.inventory.push(G.equipment[slot]);
  G.equipment[slot] = item;
  G.inventory.splice(idx, 1);
  G.maxHp = calcMaxHp(); G.hp = Math.min(G.hp, G.maxHp);
  G.maxMp = calcMaxMp(); G.mp = Math.min(G.mp, G.maxMp);
  updateStatus();
  toast('✅ 装备「' + item.name + '」');
  sceneInventory();
}

function unequipItem(slot) {
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

// ═════════════════════════════════════════════════════════
// SCENE: PLAYER INFO
// ═════════════════════════════════════════════════════════

function scenePlayerInfo() {
  var html = '<div class="scene"><em>【角色状态】</em></div>';
  html += '<div style="color:#d4a017;font-size:14px;margin-bottom:6px">' + (G.name || '无名') + '  Lv.' + G.level + '</div>';
  
  html += '<div style="background:#151520;border:1px solid #2a2a2a;border-radius:4px;padding:8px;margin:4px 0">';
  html += '<div class="attr-row"><span class="attr-name">⚔️ 力量</span><span class="attr-val">' + G.str + '</span><span class="attr-hint">物攻+' + (G.str * 2) + '</span></div>';
  html += '<div class="attr-row"><span class="attr-name">🌿 敏捷</span><span class="attr-val">' + G.agi + '</span><span class="attr-hint">闪避+' + calcDodge() + '%</span></div>';
  html += '<div class="attr-row"><span class="attr-name">🧙 智力</span><span class="attr-val">' + G.int + '</span><span class="attr-hint">魔攻+' + (G.int * 2) + '</span></div>';
  html += '<div class="attr-row"><span class="attr-name">💬 魅力</span><span class="attr-val">' + G.cha + '</span><span class="attr-hint">折扣+' + Math.floor(G.cha * 0.5) + '%</span></div>';
  html += '<div class="attr-row"><span class="attr-name">🎲 幸运</span><span class="attr-val">' + G.luk + '</span><span class="attr-hint">会心+' + calcCrit() + '%</span></div>';
  html += '</div>';
  
  html += '<div style="font-size:11px;color:#5a5a4a;margin-top:6px">战斗统计：胜' + G.totalBattlesWon + ' 败' + G.totalBattlesLost + '</div>';
  html += '<button class="cancel-btn" onclick="sceneWorldMap()">返回</button>';
  render(html);
}

// ═════════════════════════════════════════════════════════
// BOOT
// ═════════════════════════════════════════════════════════


// ═════════════════════════════════════════════════════════
// SCENE: EXPLORATION (random encounters)
// ═════════════════════════════════════════════════════════

function startExploration() {
  var loc = LOCATIONS[G.location];
  if (!loc || !loc.enemies || loc.enemies.length === 0) {
    toast('这里没有可以探索的地方');
    sceneWorldMap();
    return;
  }
  
  var roll = Math.random() * 100;
  var html = '';
  html += '<div class="scene"><em>【探索 ' + loc.name + '】</em></div>';
  
  if (roll < 35) {
    var count = rand(1, 2);
    var enemyArr = [];
    for (var i = 0; i < count; i++) {
      var eid = loc.enemies[rand(0, loc.enemies.length - 1)];
      var template = ENEMIES[eid];
      if (template) {
        enemyArr.push(Object.assign({}, template, { curHp: template.hp }));
      }
    }
    G.battle = { enemies: enemyArr, log: [], turn: 0, defending: false, warcry: 0, gamblerUsed: false };
    G.inBattle = true;
    G.selectedTarget = 0;
    G.attackMode = null;
    toast('⚔️ 遭遇敌人！');
    renderBattle('遭遇 ' + enemyArr.length + ' 只敌人！');
    return;
  } else if (roll < 50) {
    html += '<div style="text-align:center;font-size:24px;margin:12px 0">📦</div>';
    html += '<div style="text-align:center;color:#d4a017;font-size:14px;margin-bottom:8px">发现宝箱！</div>';
    if (Math.random() < 0.4) {
      html += '<div style="color:#5a5a4a;font-size:12px">箱子看起来上锁了...</div>';
      html += '<button class="confirm-btn" onclick="openExplorationChest(true)">🔑 使用钥匙开启</button>';
      html += '<button class="cancel-btn" onclick="sceneWorldMap()">放弃</button>';
    } else {
      var goldFind = rand(10, 50);
      G.gold += goldFind;
      updateStatus();
      html += '<div style="text-align:center;color:#d4a017">获得 💰' + goldFind + ' 金币！</div>';
      html += '<button class="confirm-btn" onclick="sceneWorldMap()">继续探索</button>';
    }
  } else if (roll < 70) {
    var events = [
      { msg: '你发现了一处清澈的泉水，恢复了体力！', hp: 30, heal: true },
      { msg: '你踩到了陷阱，受到了伤害！', hp: 20, heal: false },
      { msg: '遇到一个旅人，他给了你一些金币。', gold: 25 },
      { msg: '你发现了一个隐藏的洞穴，里面有宝物！', gold: 50 },
      { msg: '一阵强风刮过，什么都没发生...', nothing: true },
    ];
    var ev = events[rand(0, events.length - 1)];
    html += '<div style="text-align:center;font-size:20px;margin:12px 0">' + (ev.heal ? '💧' : ev.gold ? '💰' : '🌿') + '</div>';
    html += '<div style="text-align:center;color:#b8a880;font-size:13px;margin-bottom:8px">' + ev.msg + '</div>';
    if (ev.heal) {
      G.hp = Math.min(G.maxHp, G.hp + ev.hp);
      html += '<div style="text-align:center;color:#5c5">❤️ +' + ev.hp + ' HP</div>';
    } else if (ev.gold) {
      G.gold += ev.gold;
      html += '<div style="text-align:center;color:#d4a017">💰 +' + ev.gold + ' 金币</div>';
    } else if (!ev.nothing && ev.hp) {
      G.hp = Math.max(1, G.hp - ev.hp);
      html += '<div style="text-align:center;color:#c44">❤️ -' + ev.hp + ' HP</div>';
    }
    updateStatus();
    html += '<button class="confirm-btn" onclick="sceneWorldMap()">继续</button>';
  } else {
    html += '<div style="text-align:center;font-size:20px;margin:12px 0">🌿</div>';
    html += '<div style="text-align:center;color:#5a5a4a;font-size:13px">周围一片安静，没有发现任何东西。</div>';
    html += '<button class="confirm-btn" onclick="sceneWorldMap()">继续探索</button>';
  }
  
  render(html);
}

function openExplorationChest(usedKey) {
  if (usedKey) G.keys = Math.max(0, (G.keys || 0) - 1);
  var loot = [
    { name: '铁剑', atk: 10, slot: 'weapon', rarity: 'fine' },
    { name: '皮甲', def: 8, hp: 20, slot: 'armor', rarity: 'common' },
    { name: '迷宫钥匙', desc: '开启宝箱', consumable: true, slot: 'item' },
  ];
  var item = loot[rand(0, loot.length - 1)];
  var html = '';
  html += '<div style="text-align:center;font-size:24px;margin:12px 0">📦</div>';
  html += '<div style="text-align:center;color:#d4a017;font-size:14px;margin-bottom:8px">打开宝箱！</div>';
  if (item.name === '迷宫钥匙') {
    G.keys = (G.keys || 0) + 1;
    html += '<div style="text-align:center;color:#5c5">获得 🗝️ 迷宫钥匙 ×1</div>';
  } else {
    G.inventory.push(Object.assign({}, item, { id: 'chest_' + Date.now() }));
    html += '<div style="text-align:center;color:#5c5">获得 <span class="rarity-' + item.rarity + '">' + item.name + '</span></div>';
  }
  updateStatus();
  html += '<button class="confirm-btn" onclick="sceneWorldMap()">继续探索</button>';
  render(html);
}

function sceneGuild() {
  var html = '<div class="scene"><em>【冒险者公会】</em></div>';
  html += '<div style="color:#5a5a4a;font-size:11px">接待员：「新人？先接个任务吧。」</div>';
  html += '<hr class="divider">';
  if (!LOCATIONS.mine.unlocked) {
    html += '<div class="sk-card" onclick="acceptMineQuest()">';
    html += '<div class="sk-name">📜 暗影矿洞调查</div>';
    html += '<div class="sk-desc">调查暗影矿洞的秘密</div>';
    html += '<div style="font-size:11px;color:#5c5">奖励：解锁暗影矿洞</div>';
    html += '</div>';
  }
  html += '<div class="sk-card" onclick="acceptMineQuest()">';
  html += '<div class="sk-name">📜 幽暗森林清剿</div>';
  html += '<div class="sk-desc">前往幽暗森林消灭怪物</div>';
  html += '<div style="font-size:11px;color:#5c5">奖励：100 XP + 80金</div>';
  html += '</div>';
  html += '<button class="cancel-btn" onclick="sceneTown()">返回</button>';
  render(html);
}

function acceptMineQuest() {
  LOCATIONS.mine.unlocked = true;
  toast('✅ 解锁暗影矿洞！');
  sceneGuild();
}

initGame();
sceneIntro();
