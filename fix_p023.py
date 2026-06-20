#!/usr/bin/env python3
"""P0-2 好感度 + P0-3 世界地图 修复脚本"""
import re, subprocess, sys, shutil

SRC = '龙途_手机试玩版_V22.html'
DST = '龙途_手机试玩版_V23.html'

# Backup and copy
shutil.copy2(SRC, DST)
with open(DST, 'r') as f:
    content = f.read()

m = re.search(r'<script[^>]*>([\s\S]*?)</script>', content)
js = m.group(1)
script_prefix = content[:content.find('<script>') + len('<script>')]
script_suffix = content[content.rfind('</script>'):]

changes = []

# ═══════════════════════════════════════════════════
# P0-2 好感度系统
# ═══════════════════════════════════════════════════

# --- 1. GIFT_ITEMS 对齐 MATERIALS ---
gift_start = js.find('var GIFT_ITEMS')
gift_end_idx = js.find('\nvar ', gift_start + 5)

new_gift = r"""var GIFT_ITEMS = {
  // Common (affectionBase 3-5)
  scrap_cloth:     { name:'碎布片',    affectionBase:3,  rarity:'common' },
  wolf_fang:       { name:'狼牙',      affectionBase:4,  rarity:'common' },
  wolf_pelt:       { name:'狼皮',      affectionBase:4,  rarity:'common' },
  iron_scrap:      { name:'铁碎片',    affectionBase:3,  rarity:'common' },
  herb_weed:       { name:'草药',      affectionBase:5,  rarity:'common' },
  bone_chip:       { name:'骨片',      affectionBase:3,  rarity:'common' },
  // Uncommon (affectionBase 6-10)
  tentacle:        { name:'触手',      affectionBase:6,  rarity:'uncommon' },
  goblin_dagger:   { name:'哥布林匕首',affectionBase:7,  rarity:'uncommon' },
  ice_shard:       { name:'冰碎片',    affectionBase:7,  rarity:'uncommon' },
  deep_pearl:      { name:'深海珍珠',  affectionBase:8,  rarity:'uncommon' },
  thick_leather:   { name:'厚皮革',    affectionBase:6,  rarity:'uncommon' },
  magic_dust:      { name:'魔法粉尘',  affectionBase:8,  rarity:'uncommon' },
  spider_silk:     { name:'蛛丝',      affectionBase:7,  rarity:'uncommon' },
  venom_gland:     { name:'毒腺',      affectionBase:6,  rarity:'uncommon' },
  snake_fang:      { name:'蛇牙',      affectionBase:7,  rarity:'uncommon' },
  feather_plume:   { name:'羽翎',      affectionBase:8,  rarity:'uncommon' },
  crystal_shard:   { name:'晶石碎片',  affectionBase:8,  rarity:'uncommon' },
  orc_heart:       { name:'兽人之心',  affectionBase:9,  rarity:'uncommon' },
  // Rare (affectionBase 12-18)
  dark_essence:    { name:'暗影精华',  affectionBase:12, rarity:'rare' },
  storm_crystal:   { name:'风暴水晶',  affectionBase:14, rarity:'rare' },
  fire_ember:      { name:'火焰余烬',  affectionBase:14, rarity:'rare' },
  frost_core:      { name:'霜核',      affectionBase:14, rarity:'rare' },
  mithril_shard:   { name:'秘银碎片',  affectionBase:16, rarity:'rare' },
  shadow_pearl:    { name:'暗影珍珠',  affectionBase:15, rarity:'rare' },
  moonstone:       { name:'月光石',    affectionBase:18, rarity:'rare' },
  dragon_scale:    { name:'龙鳞',      affectionBase:18, rarity:'rare' },
  // Epic (affectionBase 20-25)
  dragon_bone:     { name:'龙骨',      affectionBase:20, rarity:'epic' },
  void_crystal:    { name:'虚空水晶',  affectionBase:22, rarity:'epic' },
  ancient_rune:    { name:'古代符文',  affectionBase:22, rarity:'epic' },
  dragon_heart:    { name:'龙心',      affectionBase:25, rarity:'epic' },
  world_tree_leaf: { name:'世界树叶',  affectionBase:25, rarity:'epic' },
  primordial_shard:{ name:'原初碎片',  affectionBase:25, rarity:'epic' }
"""

js = js[:gift_start] + new_gift + js[gift_end_idx:]
changes.append("GIFT_ITEMS对齐MATERIALS: 15→32种可送礼材料")

# --- 2. NPC_DEFS likes 旧材料名→MATERIALS名 ---
npc_start = js.find('var NPC_DEFS')
npc_end = js.find('\nvar ', npc_start + 5)
npc_section = js[npc_start:npc_end]

old_to_new = {
    'iron_ore': 'iron_scrap', 'steel_ingot': 'mithril_shard', 'coal': 'bone_chip',
    'herb': 'herb_weed', 'silk_cloth': 'spider_silk', 'gold_dust': 'crystal_shard',
    'fish_oil': 'tentacle', 'pearl': 'deep_pearl', 'mithril_ore': 'mithril_shard',
    'ancient_scroll': 'ancient_rune', 'shadow_essence': 'dark_essence',
    'frost_crystal': 'frost_core', 'arctic_fur': 'wolf_pelt'
}

for old, new in old_to_new.items():
    npc_section = npc_section.replace("'" + old + "'", "'" + new + "'")

js = js[:npc_start] + npc_section + js[npc_end:]
changes.append("NPC_DEFS likes: 旧材料名→MATERIALS名")

# --- 3. sceneInn 添加送礼按钮 ---
inn_idx = js.find('function sceneInn')
inn_end = js.find('\nfunction ', inn_idx + 5)
inn_func = js[inn_idx:inn_end]

# Find end of NPC dialog buttons
# Look for the closing of the npcAvailable loop
npc_btn_area = inn_func.find("showDialog('")
if npc_btn_area >= 0:
    # Find the last occurrence of showDialog in sceneInn
    last_dialog = inn_func.rfind("showDialog('")
    # Find end of that line
    line_end = inn_func.find('\n', last_dialog)
    # Find end of the for loop block (next closing brace at same or lower indent)
    brace_count = 0
    search_start = inn_func.find('for', inn_func.find('npcAvailable'))
    for i in range(search_start, len(inn_func)):
        if inn_func[i] == '{': brace_count += 1
        if inn_func[i] == '}':
            brace_count -= 1
            if brace_count == 0:
                loop_end_pos = i + 1
                break
    
    gift_btn = """
  // Gift button
  if (npcAvailable.length > 0 && Object.keys(G.materials || {}).length > 0) {
    html += '<button class="btn" style="margin:4px;background:#8e44ad" onclick="showGiftPanel(\'inn\')">🎁 送礼</button>';
  }"""
    
    inn_func = inn_func[:loop_end_pos] + gift_btn + inn_func[loop_end_pos:]
    js = js[:inn_idx] + inn_func + js[inn_end:]
    changes.append("sceneInn: 添加🎁送礼按钮")

# --- 4. sceneBlacksmith 添加送礼按钮 ---
smith_idx = js.find('function sceneBlacksmith')
smith_end = js.find('\nfunction ', smith_idx + 5)
smith_func = js[smith_idx:smith_end]

# Find end of NPC button loop
last_talk = smith_func.rfind("talkToNpc('")
if last_talk >= 0:
    line_end = smith_func.find('\n', last_talk)
    # Find the closing brace of the NPC rendering block
    brace_count = 0
    search_from = smith_func.find('for', smith_func.find('smithNpcs'))
    if search_from >= 0:
        for i in range(search_from, len(smith_func)):
            if smith_func[i] == '{': brace_count += 1
            if smith_func[i] == '}':
                brace_count -= 1
                if brace_count == 0:
                    smith_loop_end = i + 1
                    break
        
        smith_gift = """
  // Gift button
  if (smithNpcs && smithNpcs.length > 0 && Object.keys(G.materials || {}).length > 0) {
    html += '<button class="btn" style="margin:4px;background:#8e44ad" onclick="showGiftPanel(\'blacksmith\')">🎁 送礼</button>';
  }"""
        
        smith_func = smith_func[:smith_loop_end] + smith_gift + smith_func[smith_loop_end:]
        js = js[:smith_idx] + smith_func + js[smith_end:]
        changes.append("sceneBlacksmith: 添加🎁送礼按钮")

# --- 5. showGiftPanel + doGift + closeGiftPanel ---
gg_idx = js.find('function giveGiftToNpc')
gg_end = js.find('\nfunction ', gg_idx + 5)

show_gift_panel = """
function showGiftPanel(sceneType) {
  var npcList = [];
  var loc = G.currentLocation || 'whitecity';
  if (sceneType === 'inn') {
    var innNpcMap = {
      whitecity: ['innkeep_white','roland','elena','lord_white'],
      ironridge: ['innkeep_iron','hank','smithkeep_iron','lord_iron'],
      tidport: ['innkeep_tid','captain_storm','lord_tid'],
      sunspire: ['innkeep_sun','sage_ilan','lord_sun'],
      dragonreach: ['innkeep_dragon','smithkeep_drag','lord_drago'],
      icereef: ['smithkeep_ice','frostwing_survivor'],
      misthollow: ['mist_spirit','swamp_witch'],
      jademarsh: ['jade_guardian'],
      stormcape: ['captain_storm'],
      ashplains: ['ash_wanderer','flame_seer'],
      abyssgate: ['gatekeeper_abyss','shadow_whisperer'],
      dragontemple: ['ancient_dragon_spirit'],
      darkforest: ['darkblade','mystic_wu']
    };
    npcList = innNpcMap[loc] || [];
  } else if (sceneType === 'blacksmith') {
    var smithNpcMap = {
      whitecity: ['roland','hank'],
      ironridge: ['smithkeep_iron','hank'],
      dragonreach: ['smithkeep_drag'],
      icereef: ['smithkeep_ice']
    };
    npcList = smithNpcMap[loc] || [];
  }
  if (npcList.length === 0) { toast('这里没有可以送礼的NPC'); return; }
  var html = '<div style="padding:12px;max-height:70vh;overflow-y:auto">';
  html += '<h3 style="margin:0 0 8px;color:#d4a017">🎁 送礼</h3>';
  html += '<div style="margin-bottom:10px"><b>选择NPC:</b><br>';
  for (var i = 0; i < npcList.length; i++) {
    var nd = NPC_DEFS[npcList[i]];
    if (!nd) continue;
    var tier = getNpcAffectionTier(npcList[i]);
    var curLv = G.npcRelations[npcList[i]] ? G.npcRelations[npcList[i]].level : 0;
    var sel = i === 0 ? ' checked' : '';
    html += '<label style="display:block;margin:3px 0;cursor:pointer"><input type="radio" name="giftNpc" value="' + npcList[i] + '"' + sel + '> ' + tier.emoji + ' ' + nd.name + ' (' + tier.title + ' ' + curLv + '/100)</label>';
  }
  html += '</div>';
  var mats = G.materials || {};
  var matKeys = Object.keys(mats).filter(function(k) { return mats[k] > 0 && GIFT_ITEMS[k]; });
  if (matKeys.length === 0) {
    html += '<div style="color:#888;padding:8px">没有可赠送的材料</div>';
  } else {
    html += '<div><b>选择礼物:</b><br>';
    // Determine current selected NPC for liked check
    var firstNpc = npcList[0];
    for (var j = 0; j < matKeys.length; j++) {
      var gid = matKeys[j];
      var gi = GIFT_ITEMS[gid];
      var qty = mats[gid];
      var likedMark = '';
      var def0 = NPC_DEFS[firstNpc];
      if (def0 && def0.likes && def0.likes.indexOf(gid) >= 0) likedMark = ' ❤️';
      html += '<label style="display:block;margin:3px 0;cursor:pointer"><input type="radio" name="giftMat" value="' + gid + '"' + (j === 0 ? ' checked' : '') + '> ' + gi.name + likedMark + ' (x' + qty + ', +' + gi.affectionBase + '好感)</label>';
    }
    html += '</div>';
    html += '<button class="btn btn-primary" style="margin-top:10px" onclick="doGift()">送出</button>';
  }
  html += ' <button class="btn" style="margin-top:10px" onclick="closeGiftPanel()">关闭</button>';
  html += '</div>';
  closeGiftPanel();
  var panel = document.createElement('div');
  panel.id = 'gift-panel';
  panel.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#1a1a2e;border:2px solid #d4a017;border-radius:12px;z-index:9999;min-width:300px;max-width:90vw;box-shadow:0 4px 20px rgba(0,0,0,0.6)';
  panel.innerHTML = html;
  document.body.appendChild(panel);
}

function doGift() {
  var npcRadio = document.querySelector('input[name="giftNpc"]:checked');
  var matRadio = document.querySelector('input[name="giftMat"]:checked');
  if (!npcRadio || !matRadio) { toast('请选择NPC和礼物'); return; }
  giveGiftToNpc(npcRadio.value, matRadio.value);
  closeGiftPanel();
}

function closeGiftPanel() {
  var p = document.getElementById('gift-panel');
  if (p) p.remove();
}
"""

js = js[:gg_end] + show_gift_panel + js[gg_end:]
changes.append("showGiftPanel/doGift/closeGiftPanel: 送礼面板UI")

# --- 6. STORY_CHOICES 添加 requiresFavor ---
sc_start = js.find('var STORY_CHOICES')
sc_end = js.find('\nvar ', sc_start + 5)
sc_section = js[sc_start:sc_end]

favor_patches = {
    "id:'seek_mercy'": "id:'seek_mercy', requiresFavor:{npc:'innkeep_white',min:20}",
    "id:'understand_shadow'": "id:'understand_shadow', requiresFavor:{npc:'shadow_whisperer',min:40}",
    "id:'altruist'": "id:'altruist', requiresFavor:{npc:'captain_storm',min:70}",
    "id:'purify_frost'": "id:'purify_frost', requiresFavor:{npc:'smithkeep_ice',min:40}",
}

for old, new in favor_patches.items():
    if old in sc_section and 'requiresFavor' not in sc_section[:sc_section.find(old) + len(old) + 50]:
        sc_section = sc_section.replace(old, new, 1)
        cid = old.replace("id:'", "").replace("'", "")
        changes.append("STORY_CHOICES: " + cid + " 添加好感度前置")

js = js[:sc_start] + sc_section + js[sc_end:]

# --- 7. applyStoryChoice 添加好感度前置检查 ---
asc_idx = js.find('function applyStoryChoice')
asc_end = js.find('\nfunction ', asc_idx + 5)
asc_func = js[asc_idx:asc_end]

if 'requiresFavor' not in asc_func:
    old_header = "function applyStoryChoice(choiceId) {"
    new_header = """function applyStoryChoice(choiceId) {
  // Check favor requirements
  var _choice = null;
  for (var _ci = 0; _ci < STORY_CHOICES.length; _ci++) {
    if (STORY_CHOICES[_ci].id === choiceId) { _choice = STORY_CHOICES[_ci]; break; }
  }
  if (_choice && _choice.requiresFavor) {
    var _rf = _choice.requiresFavor;
    var _curLv = (G.npcRelations[_rf.npc] || {level:0}).level;
    if (_curLv < _rf.min) {
      var _npcName = NPC_DEFS[_rf.npc] ? NPC_DEFS[_rf.npc].name : _rf.npc;
      var _tierName = getNpcAffectionTierByMin(_rf.min);
      toast('🔒 需要与' + _npcName + '达到' + _tierName + '关系 (当前' + _curLv + '/需' + _rf.min + ')');
      return;
    }
  }"""
    asc_func = asc_func.replace(old_header, new_header, 1)
    js = js[:asc_idx] + asc_func + js[asc_end:]
    changes.append("applyStoryChoice: 好感度前置检查")

# --- 8. getNpcAffectionTierByMin 辅助函数 ---
if 'getNpcAffectionTierByMin' not in js:
    gnat_idx = js.find('function getNpcAffectionTier(npcId)')
    gnat_end = js.find('\nfunction ', gnat_idx + 5)
    helper = """
function getNpcAffectionTierByMin(minLevel) {
  for (var i = NPC_AFFECTION_TIERS.length - 1; i >= 0; i--) {
    if (minLevel >= NPC_AFFECTION_TIERS[i].min) return NPC_AFFECTION_TIERS[i].title;
  }
  return '陌生人';
}
"""
    js = js[:gnat_end] + helper + js[gnat_end:]
    changes.append("getNpcAffectionTierByMin: 辅助函数")

# --- 9. 故事选择UI: requiresFavor不满足时灰掉 ---
# Find the function that renders story choice buttons
# Search for the applyStoryChoice onclick rendering
render_markers = [
    "applyStoryChoice('",
    "applyStoryChoice(\\'",
    'onclick="applyStoryChoice'
]
render_func_start = -1
for marker in render_markers:
    idx = js.find(marker)
    if idx >= 0:
        render_func_start = js.rfind('function ', 0, idx)
        break

if render_func_start >= 0:
    render_func_end = js.find('\nfunction ', render_func_start + 5)
    render_func = js[render_func_start:render_func_end]
    
    if 'requiresFavor' not in render_func:
        # Find where disabled condition is set for story choices
        # Look for patterns like: choice.requires && ...
        disabled_pattern = "choice.requires && !G._storyChoiceUnlocks"
        if disabled_pattern in render_func:
            favor_check = "choice.requiresFavor && (G.npcRelations[choice.requiresFavor.npc] || {level:0}).level < choice.requiresFavor.min"
            render_func = render_func.replace(
                disabled_pattern,
                "(" + disabled_pattern + " || " + favor_check + ")"
            )
            changes.append("故事选择UI: requiresFavor灰掉+条件检查")
        
        # Also add favor info display to the choice text
        # Find where choice label/text is rendered
        choice_text_pattern = "choice.text"
        if choice_text_pattern in render_func:
            # Add favor requirement info after choice text
            favor_display = "' + (choice.requiresFavor ? ' (需' + (NPC_DEFS[choice.requiresFavor.npc]||{name:choice.requiresFavor.npc}).name + getNpcAffectionTierByMin(choice.requiresFavor.min) + ')' : '') + '"
            # This is complex and risky, skip for now - the gray-out is sufficient
            pass
        
        js = js[:render_func_start] + render_func + js[render_func_end:]

# ═══════════════════════════════════════════════════
# P0-3 世界地图
# ═══════════════════════════════════════════════════

# --- 10. cellSize 从44提升到52 ---
js = js.replace(
    "var cellSize = 44; // V4/V5 comfortable size, full map scrollable",
    "var cellSize = 52; // P0-3: larger cells for touch/mobile"
)
changes.append("cellSize: 44→52 提升触控体验")

# --- 11. 水域/草地 SVG 渲染增强 ---
# Find renderGridMap and add terrain-specific decorations
rgm_idx = js.find('function renderGridMap')
rgm_end = js.find('\nfunction ', rgm_idx + 5)
rgm_func = js[rgm_idx:rgm_end]

# Add terrain decoration after each cell rect
# Find the pattern where cell icon is rendered
# Look for: html += '<text ... icon ...'
# Before that, add terrain-specific SVG elements

# Find the icon rendering section
icon_text_idx = rgm_func.find("html += '<text")
if icon_text_idx >= 0:
    # Find the line that adds the cell rect (before icon)
    # The pattern is: html += '<rect ... fill="..." .../>';
    # We want to add water waves / grass tufts after the rect but before the icon text
    
    # Find the section where different cell types get different fill colors
    # Search for water fill color
    water_fill = rgm_func.find("#1a5276")  # water color
    grass_fill = rgm_func.find("#27ae60")   # possible grass color
    
    # Let's check what colors are used
    fill_colors = re.findall(r"fill='([^']+)'", rgm_func)
    unique_fills = list(set(fill_colors))
    
    # Actually, let me add terrain decoration right before the icon text rendering
    # Find the line just before the first <text> element
    icon_line_start = rgm_func.rfind('\n', 0, icon_text_idx)
    
    terrain_decoration = """
      // Terrain decorations (water waves, grass tufts)
      var terrainDeco = '';
      if (cellData && cellData.type === 'water') {
        var wx = x + 6, wy = y + cellSize * 0.7;
        terrainDeco = '<path d="M'+wx+','+wy+' Q'+(wx+10)+','+(wy-4)+' '+(wx+20)+','+wy+' Q'+(wx+30)+','+(wy+4)+' '+(wx+40)+','+wy+'" fill="none" stroke="#2980b9" stroke-width="1.5" opacity="0.6"/>';
        terrainDeco += '<path d="M'+(wx+5)+','+(wy+8)+' Q'+(wx+15)+','+(wy+4)+' '+(wx+25)+','+(wy+8)+' Q'+(wx+35)+','+(wy+12)+' '+(wx+40)+','+(wy+8)+'" fill="none" stroke="#3498db" stroke-width="1" opacity="0.4"/>';
      } else if (cellData && cellData.type === 'grass') {
        var gx = x + 4, gy = y + cellSize - 8;
        for (var gi = 0; gi < 3; gi++) {
          var gxo = gx + gi * 14 + Math.floor(Math.random()*6);
          terrainDeco += '<line x1="'+gxo+'" y1="'+(gy+8)+'" x2="'+(gxo-2)+'" y2="'+gy+'" stroke="#2ecc71" stroke-width="1.5" opacity="0.5"/>';
          terrainDeco += '<line x1="'+(gxo+4)+'" y1="'+(gy+8)+'" x2="'+(gxo+6)+'" y2="'+(gy+2)+'" stroke="#27ae60" stroke-width="1.5" opacity="0.5"/>';
        }
      } else if (cellData && cellData.type === 'stone') {
        var sx = x + cellSize*0.3, sy = y + cellSize*0.6;
        terrainDeco = '<circle cx="'+sx+'" cy="'+sy+'" r="4" fill="#7f8c8d" opacity="0.4"/>';
        terrainDeco += '<circle cx="'+(sx+12)+'" cy="'+(sy+3)+'" r="3" fill="#95a5a6" opacity="0.3"/>';
      }
      html += terrainDeco;
"""
    
    # Insert terrain decoration before the icon text line
    rgm_func = rgm_func[:icon_line_start+1] + terrain_decoration + rgm_func[icon_line_start+1:]
    js = js[:rgm_idx] + rgm_func + js[rgm_end:]
    changes.append("renderGridMap: 水域波浪/草地/石头SVG装饰")

# --- 12. 探索地图地形名称显示 ---
# Find generateMap or the cell description display logic
# Look for where cellDesc/cell descriptions are shown on tap
cell_desc_display = js.find('cellDesc') 
if cell_desc_display < 0:
    cell_desc_display = js.find('waterDesc')

# Check if waterDesc/grassDesc data is actually used in rendering
# These exist in the MAP_DATA but might not be rendered in SVG
desc_data_count = js.count('waterDesc')
print(f"waterDesc references: {desc_data_count}")

# Find the cell click handler - this is where we show cell info
cell_click = js.find("onclick=\"moveToCell")
if cell_click < 0:
    cell_click = js.find("onclick='moveToCell")
if cell_click < 0:
    cell_click = js.find("clickCell")

if cell_click >= 0:
    click_func_start = js.rfind('function ', 0, cell_click)
    click_func_end = js.find('\nfunction ', click_func_start + 5)
    click_func = js[click_func_start:click_func_end]
    has_desc_display = 'Desc' in click_func or 'desc' in click_func
    print(f"Cell click function has desc display: {has_desc_display}")

# ═══════════════════════════════════════════════════
# 写入文件并验证
# ═══════════════════════════════════════════════════

new_content = script_prefix + js + script_suffix
with open(DST, 'w') as f:
    f.write(new_content)

# Verify JS syntax
result = subprocess.run(['node', '-e', """
const fs = require('fs');
const html = fs.readFileSync('龙途_手机试玩版_V23.html', 'utf8');
const m = html.match(/<script[^>]*>([\\s\\S]*?)<\\/script>/);
try { new Function(m[1]); console.log('JS OK'); } catch(e) { console.log('JS ERROR:', e.message); }
console.log('Lines:', html.split('\\n').length);
console.log('Size:', (html.length/1024).toFixed(1) + 'KB');
"""], capture_output=True, text=True)

print("\n" + "="*60)
print("VERIFICATION")
print("="*60)
print(result.stdout.strip())

print("\n" + "="*60)
print("CHANGES APPLIED")
print("="*60)
for i, c in enumerate(changes, 1):
    print(f"  {i}. {c}")

print(f"\nTotal: {len(changes)} changes")
