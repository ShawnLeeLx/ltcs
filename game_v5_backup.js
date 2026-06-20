// ═══════════════════════════════════════════════════════════
// 龙途传说 v5 - 手绘线稿风格 + 完整修复
// ═══════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════
// DATA: Enemies with SVG-style line art
// ═══════════════════════════════════════════════════════════

var ENEMIES = {
  goblin: {
    name: '哥布林', hp: 35, atk: 8, xp: 25, goldMin: 3, goldMax: 8,
    svg: `<svg viewBox="0 0 120 150" class="enemy-svg" style="filter:url(#sketch)">
      <defs>
        <filter id="sketch">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      </defs>
      <!-- Paper texture bg -->
      <rect width="120" height="150" fill="#f5f0e8" rx="4"/>
      <!-- Hunched back/shoulders -->
      <path d="M30 75 Q25 90 28 115 Q35 130 50 132 Q70 130 85 118 Q92 95 88 75" fill="none" stroke="#2a2a2a" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Chest muscle definition -->
      <path d="M38 82 Q50 78 62 82" fill="none" stroke="#2a2a2a" stroke-width="0.8" opacity="0.6"/>
      <path d="M50 84 L50 100" fill="none" stroke="#2a2a2a" stroke-width="0.7" opacity="0.5"/>
      <!-- Abs hint -->
      <path d="M44 98 Q50 96 56 98 M44 106 Q50 104 56 106" fill="none" stroke="#2a2a2a" stroke-width="0.6" opacity="0.4"/>
      <!-- Arm left (forward) -->
      <path d="M32 80 Q18 92 15 108 Q14 116 22 118 Q30 116 34 105 Q36 94 33 82" fill="none" stroke="#2a2a2a" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Left hand fingers -->
      <path d="M16 117 L12 122 M20 118 L18 124 M24 117 L24 123" fill="none" stroke="#2a2a2a" stroke-width="1" stroke-linecap="round"/>
      <!-- Arm right (back) -->
      <path d="M86 78 Q98 88 102 100 Q105 110 98 114" fill="none" stroke="#2a2a2a" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
      <!-- Head - large, bald -->
      <ellipse cx="58" cy="48" rx="26" ry="28" fill="none" stroke="#2a2a2a" stroke-width="1.8"/>
      <!-- Forehead wrinkles -->
      <path d="M42 30 Q58 26 74 30" fill="none" stroke="#2a2a2a" stroke-width="0.6" opacity="0.4"/>
      <path d="M45 34 Q58 31 71 34" fill="none" stroke="#2a2a2a" stroke-width="0.5" opacity="0.3"/>
      <!-- Huge pointed ears -->
      <path d="M34 40 Q12 28 18 48 Q22 55 34 50" fill="none" stroke="#2a2a2a" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M82 40 Q104 28 98 48 Q94 55 82 50" fill="none" stroke="#2a2a2a" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Ear inner detail -->
      <path d="M28 42 Q22 40 24 46" fill="none" stroke="#2a2a2a" stroke-width="0.7" opacity="0.5"/>
      <path d="M88 42 Q94 40 92 46" fill="none" stroke="#2a2a2a" stroke-width="0.7" opacity="0.5"/>
      <!-- Brow ridge (angry) -->
      <path d="M38 42 Q48 38 58 42" fill="none" stroke="#2a2a2a" stroke-width="1.5"/>
      <path d="M78 42 Q68 38 60 42" fill="none" stroke="#2a2a2a" stroke-width="1.5"/>
      <!-- Eyes - narrow, menacing -->
      <ellipse cx="47" cy="48" rx="5" ry="3" fill="none" stroke="#2a2a2a" stroke-width="1.2"/>
      <ellipse cx="69" cy="48" rx="5" ry="3" fill="none" stroke="#2a2a2a" stroke-width="1.2"/>
      <circle cx="47" cy="48" r="1.5" fill="#2a2a2a"/>
      <circle cx="69" cy="48" r="1.5" fill="#2a2a2a"/>
      <!-- Big hooked nose -->
      <path d="M54 52 Q50 60 45 66 Q52 68 58 64 Q60 58 58 52" fill="none" stroke="#2a2a2a" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Nose bridge shadow lines -->
      <path d="M56 54 L54 62" fill="none" stroke="#2a2a2a" stroke-width="0.6" opacity="0.4"/>
      <!-- Wide grin with teeth -->
      <path d="M42 70 Q58 78 74 70" fill="none" stroke="#2a2a2a" stroke-width="1.5"/>
      <!-- Teeth -->
      <path d="M46 71 L46 76 M51 72 L51 77 M57 72 L57 77 M63 72 L63 76 M69 71 L69 76" fill="none" stroke="#2a2a2a" stroke-width="0.9"/>
      <!-- Chin -->
      <path d="M48 73 Q58 76 68 73" fill="none" stroke="#2a2a2a" stroke-width="0.8" opacity="0.5"/>
      <!-- Neck -->
      <path d="M48 74 Q50 80 52 76" fill="none" stroke="#2a2a2a" stroke-width="0.8" opacity="0.4"/>
      <!-- Cross-hatching shading on body -->
      <path d="M32 90 L38 95 M34 93 L40 98 M30 100 L36 105 M33 103 L39 108" stroke="#2a2a2a" stroke-width="0.4" opacity="0.25"/>
      <path d="M78 88 L84 93 M80 91 L86 96 M76 98 L82 103 M79 101 L85 106" stroke="#2a2a2a" stroke-width="0.4" opacity="0.25"/>
      <!-- Loincloth hint -->
      <path d="M40 125 Q58 128 78 123 Q80 135 58 138 Q38 135 40 125" fill="none" stroke="#2a2a2a" stroke-width="1.2"/>
      <!-- Fabric folds -->
      <path d="M48 127 L48 134 M58 128 L58 136 M68 127 L68 133" fill="none" stroke="#2a2a2a" stroke-width="0.5" opacity="0.4"/>
    </svg>`,
    color: '#2a2a2a'
  },
  wolf: {
    name: '森林狼', hp: 45, atk: 12, xp: 35, goldMin: 5, goldMax: 12,
    svg: `<svg viewBox="0 0 140 110" class="enemy-svg">
      <rect width="140" height="110" fill="#f5f0e8" rx="4"/>
      <!-- Body - lean, muscular -->
      <path d="M45 65 Q50 50 75 48 Q100 50 108 62 Q112 78 105 88 Q90 95 70 94 Q48 92 42 80 Q38 72 45 65" fill="none" stroke="#2a2a2a" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Ribcage hint -->
      <path d="M52 60 Q58 58 64 60 M54 66 Q60 64 66 66 M56 72 Q62 70 68 72" fill="none" stroke="#2a2a2a" stroke-width="0.5" opacity="0.3"/>
      <!-- Spine line -->
      <path d="M55 52 Q75 48 100 56" fill="none" stroke="#2a2a2a" stroke-width="0.6" opacity="0.4"/>
      <!-- Head - wolf profile facing left -->
      <path d="M44 62 Q30 55 18 58 Q8 60 6 66 Q8 74 16 76 Q28 78 40 72 Q46 68 46 64" fill="none" stroke="#2a2a2a" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Snout detail -->
      <path d="M10 66 L4 68 L6 72" fill="none" stroke="#2a2a2a" stroke-width="1.2"/>
      <!-- Nose -->
      <ellipse cx="5" cy="67" rx="3" ry="2" fill="#2a2a2a"/>
      <!-- Eye -->
      <ellipse cx="22" cy="62" rx="3" ry="2" fill="none" stroke="#2a2a2a" stroke-width="1"/>
      <circle cx="22" cy="62" r="1" fill="#2a2a2a"/>
      <!-- Ear (pointed) -->
      <path d="M28 52 Q24 38 34 44 Q36 50 32 55" fill="none" stroke="#2a2a2a" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Ear inner -->
      <path d="M30 50 Q28 44 33 47" fill="none" stroke="#2a2a2a" stroke-width="0.6" opacity="0.5"/>
      <!-- Jaw line -->
      <path d="M20 72 Q26 76 36 74" fill="none" stroke="#2a2a2a" stroke-width="0.8" opacity="0.5"/>
      <!-- Front legs -->
      <path d="M52 88 Q50 98 48 106" fill="none" stroke="#2a2a2a" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M68 89 Q67 99 66 107" fill="none" stroke="#2a2a2a" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Paws -->
      <ellipse cx="48" cy="107" rx="4" ry="2" fill="none" stroke="#2a2a2a" stroke-width="1.2"/>
      <ellipse cx="66" cy="107" rx="4" ry="2" fill="none" stroke="#2a2a2a" stroke-width="1.2"/>
      <!-- Back legs -->
      <path d="M92 90 Q96 100 98 106" fill="none" stroke="#2a2a2a" stroke-width="1.7" stroke-linecap="round" opacity="0.85"/>
      <path d="M102 86 Q108 96 110 104" fill="none" stroke="#2a2a2a" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
      <!-- Tail -->
      <path d="M108 62 Q122 55 128 48 Q130 44 126 42" fill="none" stroke="#2a2a2a" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Fur texture strokes -->
      <path d="M60 54 Q63 53 66 55 M72 53 Q75 52 78 54 M84 56 Q87 55 90 58" stroke="#2a2a2a" stroke-width="0.5" opacity="0.3"/>
      <path d="M48 78 Q52 77 56 79 M64 80 Q68 79 72 81 M80 82 Q84 81 88 83" stroke="#2a2a2a" stroke-width="0.4" opacity="0.25"/>
      <!-- Cross-hatch shading -->
      <path d="M80 68 L84 73 M82 71 L86 76 M84 74 L88 79" stroke="#2a2a2a" stroke-width="0.35" opacity="0.2"/>
    </svg>`,
    color: '#2a2a2a'
  },
  bandit: {
    name: '强盗', hp: 55, atk: 14, xp: 45, goldMin: 8, goldMax: 18,
    svg: `<svg viewBox="0 0 120 160" class="enemy-svg">
      <rect width="120" height="160" fill="#f5f0e8" rx="4"/>
      <!-- Legs -->
      <path d="M42 115 L38 150 L46 152 L50 120" fill="none" stroke="#2a2a2a" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M72 115 L76 150 L84 148 L78 120" fill="none" stroke="#2a2a2a" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Boots -->
      <path d="M36 148 Q34 156 48 155 Q52 152 48 147" fill="none" stroke="#2a2a2a" stroke-width="1.5"/>
      <path d="M74 148 Q72 156 86 155 Q88 152 84 147" fill="none" stroke="#2a2a2a" stroke-width="1.5"/>
      <!-- Torso - rugged tunic -->
      <path d="M38 58 Q35 85 40 116 Q60 122 82 116 Q87 85 84 58" fill="none" stroke="#2a2a2a" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Tunic hem -->
      <path d="M42 114 Q60 118 80 114" fill="none" stroke="#2a2a2a" stroke-width="0.8" opacity="0.4"/>
      <!-- Belt -->
      <path d="M40 108 Q60 112 82 108" fill="none" stroke="#2a2a2a" stroke-width="2"/>
      <rect x="56" y="106" width="10" height="7" rx="1" fill="none" stroke="#2a2a2a" stroke-width="1.2"/>
      <!-- Arm left (holding sword down) -->
      <path d="M38 64 Q22 80 18 100 Q16 110 24 114" fill="none" stroke="#2a2a2a" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Left hand -->
      <ellipse cx="20" cy="114" rx="5" ry="4" fill="none" stroke="#2a2a2a" stroke-width="1.3"/>
      <!-- Sword in hand -->
      <line x1="20" y1="114" x2="12" y2="148" stroke="#555" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="15" y1="118" x2="9" y2="144" stroke="#888" stroke-width="1" opacity="0.6"/>
      <!-- Sword hilt -->
      <line x1="17" y1="112" x2="23" y2="114" stroke="#654" stroke-width="3" stroke-linecap="round"/>
      <!-- Arm right (on hip) -->
      <path d="M84 64 Q96 78 100 92 Q102 100 96 104" fill="none" stroke="#2a2a2a" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Right hand on hip -->
      <ellipse cx="97" cy="103" rx="5" ry="4" fill="none" stroke="#2a2a2a" stroke-width="1.3"/>
      <!-- Head -->
      <ellipse cx="61" cy="38" rx="22" ry="25" fill="none" stroke="#2a2a2a" stroke-width="1.8"/>
      <!-- Bandana/hood -->
      <path d="M40 28 Q61 18 84 28 Q86 35 82 38" fill="none" stroke="#2a2a2a" stroke-width="1.5"/>
      <path d="M44 26 Q61 22 78 26" fill="none" stroke="#2a2a2a" stroke-width="1" opacity="0.5"/>
      <!-- Face visible area -->
      <path d="M44 32 Q61 30 78 34" fill="none" stroke="#2a2a2a" stroke-width="0.8" opacity="0.3"/>
      <!-- Eyes - confident/sly -->
      <path d="M50 38 L56 40" stroke="#2a2a2a" stroke-width="1.3"/>
      <path d="M72 38 L66 40" stroke="#2a2a2a" stroke-width="1.3"/>
      <circle cx="54" cy="39" r="1.5" fill="#2a2a2a"/>
      <circle cx="68" cy="39" r="1.5" fill="#2a2a2a"/>
      <!-- Eyebrow scar -->
      <path d="M48 35 L53 37" stroke="#2a2a2a" stroke-width="0.8" opacity="0.6"/>
      <!-- Nose -->
      <path d="M61 42 L58 52 L63 52" fill="none" stroke="#2a2a2a" stroke-width="1" stroke-linecap="round"/>
      <!-- Smirk -->
      <path d="M54 57 Q61 60 67 56" fill="none" stroke="#2a2a2a" stroke-width="1.2"/>
      <!-- Stubble hint -->
      <path d="M52 55 Q56 54 60 55 M62 55 Q66 54 70 55" stroke="#2a2a2a" stroke-width="0.4" opacity="0.3"/>
      <!-- Neck -->
      <path d="M54 61 Q61 64 68 61" fill="none" stroke="#2a2a2a" stroke-width="0.8" opacity="0.4"/>
      <!-- Fabric folds on tunic -->
      <path d="M48 75 L48 95 M60 76 L60 98 M74 75 L74 94" fill="none" stroke="#2a2a2a" stroke-width="0.5" opacity="0.3"/>
      <!-- Cross-hatch shading -->
      <path d="M45 82 L50 87 M47 86 L52 91 M49 90 L54 95" stroke="#2a2a2a" stroke-width="0.35" opacity="0.2"/>
      <path d="M70 80 L75 85 M72 84 L77 89 M74 88 L79 93" stroke="#2a2a2a" stroke-width="0.35" opacity="0.2"/>
    </svg>`,
    color: '#2a2a2a'
  },
  boss_goblin: {
    name: '哥布林酋长', hp: 120, atk: 20, xp: 150, goldMin: 50, goldMax: 100, isBoss: true,
    svg: `<svg viewBox="0 0 140 180" class="enemy-svg boss">
      <rect width="140" height="180" fill="#f5f0e8" rx="4"/>
      <!-- Massive hunched body -->
      <path d="M35 90 Q28 115 32 148 Q45 162 72 164 Q105 160 114 140 Q120 110 112 88" fill="none" stroke="#2a2a2a" stroke-width="2.2" stroke-linecap="round"/>
      <!-- Chest plate/armor hint -->
      <path d="M48 95 Q72 90 98 96" fill="none" stroke="#2a2a2a" stroke-width="1" opacity="0.4"/>
      <path d="M55 100 L55 130 M72 98 L72 135 M89 100 L89 128" fill="none" stroke="#2a2a2a" stroke-width="0.7" opacity="0.3"/>
      <!-- Heavy muscle arms -->
      <path d="M34 92 Q12 110 8 132 Q6 144 18 148 Q30 144 38 125 Q40 108 36 94" fill="none" stroke="#2a2a2a" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M112 92 Q132 108 136 126 Q138 138 128 142 Q118 138 114 122 Q112 108 114 94" fill="none" stroke="#2a2a2a" stroke-width="2" stroke-linecap="round" opacity="0.85"/>
      <!-- Left arm holding massive club -->
      <ellipse cx="16" cy="148" rx="9" ry="6" fill="none" stroke="#2a2a2a" stroke-width="1.5"/>
      <!-- Club -->
      <line x1="14" y1="150" x2="2" y2="175" stroke="#654" stroke-width="6" stroke-linecap="round"/>
      <line x1="10" y1="152" x2="0" y2="173" stroke="#876" stroke-width="2" opacity="0.5"/>
      <!-- Club spikes -->
      <path d="M-2 172 L-6 180 M4 174 L2 182 M10 175 L10 183" stroke="#2a2a2a" stroke-width="1.3" stroke-linecap="round"/>
      <!-- Right fist -->
      <ellipse cx="128" cy="140" rx="8" ry="6" fill="none" stroke="#2a2a2a" stroke-width="1.5"/>
      <!-- Knuckles -->
      <path d="M123 137 L123 143 M127 136 L127 142 M131 137 L131 143" stroke="#2a2a2a" stroke-width="0.9"/>
      <!-- Big head -->
      <ellipse cx="72" cy="52" rx="34" ry="36" fill="none" stroke="#2a2a2a" stroke-width="2.2"/>
      <!-- Crown/horned helmet -->
      <path d="M42 28 L32 8 L50 24 M72 24 L72 4 M102 28 L112 8 L94 24" fill="none" stroke="#2a2a2a" stroke-width="2" stroke-linecap="round"/>
      <path d="M44 26 L38 14 M72 22 L72 10 M100 26 L106 14" fill="none" stroke="#2a2a2a" stroke-width="1" opacity="0.5"/>
      <!-- Crown band -->
      <path d="M40 28 Q72 22 106 28" fill="none" stroke="#2a2a2a" stroke-width="1.5"/>
      <!-- Huge ears (even bigger than regular) -->
      <path d="M42 44 Q10 26 20 54 Q26 64 42 58" fill="none" stroke="#2a2a2a" stroke-width="2" stroke-linecap="round"/>
      <path d="M104 44 Q136 26 126 54 Q120 64 104 58" fill="none" stroke="#2a2a2a" stroke-width="2" stroke-linecap="round"/>
      <!-- Ear detail lines -->
      <path d="M28 46 Q22 42 26 52 M116 46 Q122 42 118 52" fill="none" stroke="#2a2a2a" stroke-width="0.7" opacity="0.5"/>
      <!-- Heavy brow ridge -->
      <path d="M46 46 Q60 40 74 46" fill="none" stroke="#2a2a2a" stroke-width="2"/>
      <path d="M100 46 Q86 40 78 46" fill="none" stroke="#2a2a2a" stroke-width="2"/>
      <!-- Deep-set angry eyes -->
      <path d="M52 54 Q60 50 66 54" fill="none" stroke="#2a2a2a" stroke-width="1.5"/>
      <path d="M94 54 Q86 50 80 54" fill="none" stroke="#2a2a2a" stroke-width="1.5"/>
      <circle cx="60" cy="53" r="2.5" fill="#2a2a2a"/>
      <circle cx="86" cy="53" r="2.5" fill="#2a2a2a"/>
      /* Eye glow */
      <circle cx="60" cy="53" r="1" fill="#c44" opacity="0.6"/>
      <circle cx="86" cy="53" r="1" fill="#c44" opacity="0.6"/>
      <!-- Massive nose -->
      <path d="M66 58 Q62 70 56 80 Q68 84 78 76 Q82 66 76 58" fill="none" stroke="#2a2a2a" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Nose shadow -->
      <path d="M68 62 L65 74" fill="none" stroke="#2a2a2a" stroke-width="0.7" opacity="0.4"/>
      <!-- Wide toothy grin -->
      <path d="M50 86 Q72 96 96 86" fill="none" stroke="#2a2a2a" stroke-width="1.8"/>
      <!-- Teeth row -->
      <path d="M55 87 L55 93 M62 88 L62 95 M70 89 L70 96 M78 88 L78 95 M86 87 L86 93 M93 87 L93 92" fill="none" stroke="#2a2a2a" stroke-width="1"/>
      <!-- Tusks protruding -->
      <path d="M56 91 Q54 100 50 104" fill="none" stroke="#ddd" stroke-width="2" stroke-linecap="round"/>
      <path d="M88 91 Q92 100 96 104" fill="none" stroke="#ddd" stroke-width="2" stroke-linecap="round"/>
      <!-- Tusk shadow -->
      <path d="M52 97 L51 103 M92 97 L93 103" stroke="#2a2a2a" stroke-width="0.5" opacity="0.3"/>
      <!-- Double chin/jowls -->
      <path d="M56 88 Q72 92 90 88" fill="none" stroke="#2a2a2a" stroke-width="0.8" opacity="0.4"/>
      <!-- Neck thick -->
      <path d="M58 86 Q72 92 86 86" fill="none" stroke="#2a2a2a" stroke-width="1" opacity="0.3"/>
      <!-- Armor shoulder pads -->
      <path d="M32 86 Q38 78 48 84" fill="none" stroke="#2a2a2a" stroke-width="1.3" opacity="0.5"/>
      <path d="M114 86 Q108 78 98 84" fill="none" stroke="#2a2a2a" stroke-width="1.3" opacity="0.5"/>
      <!-- Heavy cross-hatch shading on body -->
      <path d="M42 115 L48 122 M44 121 L50 128 M46 127 L52 134 M43 133 L49 140" stroke="#2a2a2a" stroke-width="0.4" opacity="0.25"/>
      <path d="M98 113 L104 120 M100 119 L106 126 M102 125 L108 132 M99 131 L105 138" stroke="#2a2a2a" stroke-width="0.4" opacity="0.25"/>
      <!-- Loincloth/armor skirt -->
      <path d="M45 155 Q72 160 102 154 Q108 170 72 174 Q40 170 45 155" fill="none" stroke="#2a2a2a" stroke-width="1.5"/>
      <path d="M55 158 L55 168 M72 159 L72 171 M89 158 L89 167" fill="none" stroke="#2a2a2a" stroke-width="0.6" opacity="0.4"/>
    </svg>`,
    color: '#c44'
  }
};

// ═══════════════════════════════════════════════════════════
// DATA: Origins
// ═══════════════════════════════════════════════════════════

var ORIGINS = [
  { 
    id:'warrior', name:'佣兵', emoji:'⚔️',
    attr:{str:18,agi:12,int:6,cha:8,luk:6},
    skill:{name:'战吼',emoji:'📢',type:'增益',target:'自身',desc:'攻击+20%持续3回合',cost:0},
    startSkills:[],
    story:'战场上尸横遍野。你是唯一站起来的那个。三天后，你拖着断剑走进白城，口袋里只有敌人身上搜来的几枚铜币。没有人问你的名字，因为活下来的人不值得被记住。'
  },
  { 
    id:'mage', name:'学徒', emoji:'🔮',
    attr:{str:6,agi:8,int:18,cha:10,luk:8},
    skill:{name:'奥术感知',emoji:'👁️',type:'被动',target:'自身',desc:'可见隐藏魔法陷阱',cost:0},
    startSkills:['fireArrow'],
    story:'导师说你的天赋太危险。那天夜里学院起了火，你带着半本烧焦的笔记逃了出来。没有人追你，但你知道他们迟早会来。法杖是唯一相信你的东西。'
  },
  { 
    id:'trader', name:'行商', emoji:'💰',
    attr:{str:8,agi:8,int:10,cha:18,luk:6},
    skill:{name:'讨价还价',emoji:'🤝',type:'被动',target:'自身',desc:'所有购买-15%',cost:0},
    startSkills:[],
    story:'商队被劫，货物化为灰烬。你站在废墟前数了数口袋，还剩五十金币和一把防身用的短刀。债主下周就会找到这里。你需要重新开始，或者永远消失。'
  },
  { 
    id:'hunter', name:'猎人', emoji:'🏹',
    attr:{str:10,agi:18,int:8,cha:6,luk:8},
    skill:{name:'陷阱感知',emoji:'🕸️',type:'被动',target:'自身',desc:'自动避开普通陷阱',cost:0},
    startSkills:[],
    story:'你追一头白鹿追了三天。它带你穿过森林，来到这片从未见过的湖畔。然后它消失了，只留下蹄印和清晨的雾。你决定留下来看看这里究竟有什么。'
  },
  { 
    id:'gambler', name:'赌徒', emoji:'🎲',
    attr:{str:6,agi:10,int:12,cha:14,luk:18},
    skill:{name:'孤注一掷',emoji:'🎰',type:'攻击',target:'单体',desc:'50%几率造成250%伤害，失败自伤30%',cost:0},
    startSkills:[],
    story:'最后一局，你all in然后赢了。大赢。赢家总是最先被盯上的。三天后你带着剩下的金币逃到这里。你知道他们还在找你，但你的运气不会用完——大概。'
  },
  { 
    id:'cleric', name:'朝圣者', emoji:'🙏',
    attr:{str:8,agi:6,int:14,cha:12,luk:10},
    skill:{name:'祈祷',emoji:'✨',type:'治疗',target:'自身',desc:'每回合恢复10%最大HP',cost:0},
    startSkills:['heal'],
    story:'神庙被焚毁的那天，你活了下来。护身符还在胸口发烫，但你不知道它真正的作用。老人说，答案在坠星湖。所以你来了。'
  }
];

// ═══════════════════════════════════════════════════════════
// DATA: Skills
// ═══════════════════════════════════════════════════════════

var SKILLS = [
  { id:'fireArrow', name:'火焰箭', emoji:'🔥', type:'攻击', target:'单体', desc:'发射火焰箭造成魔法伤害', cost:8, dmgMin:15, dmgMax:25 },
  { id:'heal', name:'初级治疗', emoji:'💚', type:'治疗', target:'自身', desc:'恢复生命值', cost:10, healMin:25, healMax:40 },
  { id:'slash', name:'强力斩击', emoji:'⚔️', type:'攻击', target:'单体', desc:'造成高额物理伤害', cost:12, dmgMin:20, dmgMax:35 },
  { id:'fireball', name:'火球术', emoji:'💥', type:'攻击', target:'群攻', desc:'对所有敌人造成伤害', cost:20, dmgMin:15, dmgMax:25, aoe:true },
  { id:'magicMissile', name:'魔法飞弹', emoji:'✨', type:'攻击', target:'单体', desc:'发射3枚飞弹', cost:15, dmgMin:8, dmgMax:12, missiles:3 },
  { id:'shield', name:'护盾术', emoji:'🛡️', type:'增益', target:'自身', desc:'获得护盾减少伤害', cost:15, shield:30 },
];

// ═══════════════════════════════════════════════════════════
// DATA: Locations with mini-maps
// ═══════════════════════════════════════════════════════════

var LOCATIONS = {
  whitecity: { id:'whitecity', name:'白城', type:'town', unlocked:true, x:200, y:200 },
  lake: { id:'lake', name:'坠星湖畔', type:'wild', unlocked:true, x:150, y:280, enemies:['goblin','wolf'],
    miniMap: {
      name: '坠星湖畔',
      desc: '清晨的薄雾笼罩着湖面，远处传来水鸟的叫声。',
      areas: [
        { id:'shore', name:'湖岸', desc:'鹅卵石铺成的湖岸，水位线清晰可见。', exits:{n:'forest',e:'ruins',s:null,w:null} },
        { id:'forest', name:'迷雾森林', desc:'树木高大，阳光只能透过缝隙洒下斑驳的光影。', exits:{n:null,e:'clearing',s:'shore',w:null}, enemies:true },
        { id:'ruins', name:'古代遗迹', desc:'残破的石柱上刻着你无法辨认的文字。', exits:{n:'cave',e:null,s:null,w:'shore'}, event:'ancient_runes' },
        { id:'clearing', name:'林间空地', desc:'一片开阔的草地，中央有一口古井。', exits:{n:null,e:null,s:null,w:'forest'}, treasure:true },
        { id:'cave', name:'水帘洞', desc:'瀑布后面隐约可见一个洞口。', exits:{n:null,e:null,s:'ruins',w:null}, boss:true }
      ],
      start: 'shore'
    }
  },
  darkforest: { id:'darkforest', name:'幽暗森林', type:'wild', unlocked:true, x:100, y:150, enemies:['wolf','bandit'],
    miniMap: {
      name: '幽暗森林',
      desc: '树木遮蔽了天空，只有微弱的绿光从树冠间透下。',
      areas: [
        { id:'entrance', name:'森林入口', desc:'一条小径消失在黑暗中。', exits:{n:'deep',e:null,s:null,w:null} },
        { id:'deep', name:'密林深处', desc:'藤蔓缠绕着枯死的巨树。', exits:{n:'grove',e:'thicket',s:'entrance',w:null}, enemies:true },
        { id:'grove', name:'死灵林地', desc:'这里的树木全都枯死了，空气中弥漫着腐臭。', exits:{n:null,e:null,s:'deep',w:null}, boss:true },
        { id:'thicket', name:'荆棘丛', desc:'尖锐的荆棘挡住了去路。', exits:{n:null,e:null,s:null,w:'deep'}, treasure:true }
      ],
      start: 'entrance'
    }
  },
  fortress: { id:'fortress', name:'破碎堡垒', type:'wild', unlocked:true, x:300, y:180, enemies:['bandit'],
    miniMap: {
      name: '破碎堡垒',
      desc: '一座废弃的军事要塞，如今成了强盗的巢穴。',
      areas: [
        { id:'gate', name:'破损城门', desc:'城门半塌，可以侧身通过。', exits:{n:'courtyard',e:null,s:null,w:null} },
        { id:'courtyard', name:'中央庭院', desc:'杂草丛生的训练场，兵器架东倒西歪。', exits:{n:'keep',e:'barracks',s:'gate',w:'tower'}, enemies:true },
        { id:'keep', name:'领主大厅', desc:'曾经华丽的宴会厅如今布满蛛网。', exits:{n:null,e:null,s:'courtyard',w:null}, boss:true },
        { id:'barracks', name:'兵营', desc:'成排的床铺上积满了灰尘。', exits:{n:null,e:null,s:null,w:'courtyard'}, treasure:true },
        { id:'tower', name:'瞭望塔', desc:'爬上塔顶可以俯瞰整个区域。', exits:{n:null,e:'courtyard',s:null,w:null}, event:'scenic_view' }
      ],
      start: 'gate'
    }
  },
  mine: { id:'mine', name:'暗影矿洞', type:'dungeon', unlocked:false, x:80, y:320, enemies:['goblin','bandit'],
    miniMap: {
      name: '暗影矿洞',
      desc: '深邃的矿洞中传来滴水声和某种生物的嘶吼。',
      areas: [
        { id:'entrance', name:'矿洞入口', desc:'木支架支撑着洞口，火把在墙壁上投下摇曳的影子。', exits:{n:'tunnel1',e:null,s:null,w:null} },
        { id:'tunnel1', name:'主矿道', desc:'轨道向黑暗中延伸，矿车翻倒在一边。', exits:{n:'junction',e:'side',s:'entrance',w:null}, enemies:true },
        { id:'junction', name:'三岔路口', desc:'三条隧道，中间那条有新鲜的脚印。', exits:{n:'deep',e:'side2',s:'tunnel1',w:'tunnel2'} },
        { id:'tunnel2', name:'废弃支道', desc:'这里已经很久没有人来过了。', exits:{n:null,e:'junction',s:null,w:null}, treasure:true },
        { id:'side', name:'矿工休息室', desc:'几张破床和一个熄灭的火堆。', exits:{n:null,e:null,s:null,w:'tunnel1'}, treasure:true },
        { id:'side2', name:'储藏室', desc:'生锈的工具和空木桶。', exits:{n:null,e:null,s:null,w:'junction'}, enemies:true },
        { id:'deep', name:'深渊大厅', desc:'巨大的地下空间，远处有微弱的绿光。', exits:{n:'boss',e:null,s:'junction',w:null}, enemies:true },
        { id:'boss', name:'酋长巢穴', desc:'地上散落着骨头和破烂的装备。', exits:{n:null,e:null,s:'deep',w:null}, boss:true }
      ],
      start: 'entrance'
    }
  }
};

// ═══════════════════════════════════════════════════════════
// GAME STATE
// ═══════════════════════════════════════════════════════════

var G = null;

var QUESTS = [
  { id:'mine_unlock', name:'暗影矿洞调查', desc:'调查暗影矿洞的秘密', icon:'📜', reward:'解锁暗影矿洞', rewardType:'unlock', rewardTarget:'mine', requires:null },
  { id:'forest_clear', name:'幽暗森林清剿', desc:'前往幽暗森林消灭怪物', icon:'⚔️', reward:'100 XP + 80金', rewardType:'xp_gold', xp:100, gold:80, requires:null },
  { id:'lake_treasure', name:'坠星湖的宝藏', desc:'探索坠星湖畔，寻找传闻中的宝箱', icon:'📦', reward:'150 XP + 120金', rewardType:'xp_gold', xp:150, gold:120, requires:null },
  { id:'boss_fortress', name:'破碎堡垒首领', desc:'击败破碎堡垒的哥布林酋长', icon:'👑', reward:'200 XP + 酋长战利品', rewardType:'xp_gold', xp:200, gold:150, requires:null }
];

function initGame() {
  G = {
    // Core
    name: '', level: 1, xp: 0, nextXp: 100,
    // Stats
    str: 10, agi: 10, int: 10, cha: 10, luk: 10,
    // Resources
    hp: 100, maxHp: 100, mp: 50, maxMp: 50, gold: 50,
    // Progress
    origin: null, location: 'whitecity',
    // Inventory
    inventory: [], equipment: { weapon: null, armor: null, accessory: null },
    skills: [], attrPts: 0, skillPts: 0,
    // Battle
    inBattle: false, battle: null,
    // Misc
    totalBattlesWon: 0, totalBattlesLost: 0,
    cargo: [], keys: 0,
    // Mini-map state
    miniMapPos: null,
    // Quests
    quests: [], activeQuest: null,
    // Flags
    forestCleared: false
  };
}

// ═══════════════════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════════════════

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function calcMaxHp() { return 100 + G.str * 5 + (G.equipment.armor ? (G.equipment.armor.hp || 0) : 0); }
function calcMaxMp() { return 50 + G.int * 3; }
function calcAtk() { 
  var base = G.str * 2; 
  if (G.equipment.weapon) base += (G.equipment.weapon.atk || 0);
  return base;
}
function calcDef() { return (G.equipment.armor ? (G.equipment.armor.def || 0) : 0); }
function calcCrit() { return Math.min(50, 5 + G.luk * 0.5); }
function calcCritDmg() { return 0.5 + G.luk * 0.02; }
function calcDodge() { return Math.min(40, G.agi * 0.8); }
function calcNextXp(lvl) { return 80 + lvl * 40; }
function updateStatus() {
  var el = document.getElementById('status');
  if (el) el.innerHTML = 'Lv.' + G.level + ' | ❤️' + G.hp + '/' + G.maxHp + ' | 💧' + G.mp + '/' + G.maxMp + ' | 💰' + G.gold;
}
function render(html) { var el = document.getElementById('game'); if (el) el.innerHTML = html; }
function toast(msg) { var el = document.getElementById('toast'); if (el) { el.textContent = msg; el.style.opacity = 1; setTimeout(function() { el.style.opacity = 0; }, 2000); } }


// ═══════════════════════════════════════════════════════════
// SCENE: INTRO
// ═══════════════════════════════════════════════════════════

function sceneIntro() {
  var html = '';
  html += '<div class="scene-title">龙途传说</div>';
  html += '<div class="scene-desc">一个关于命运、财富与冒险的故事</div>';
  html += '<div class="btns">';
  html += '<button class="btn btn-primary" onclick="sceneSelectOrigin()">🎮 开始游戏</button>';
  html += '<button class="btn" onclick="sceneWorldIntro()">📖 世界观</button>';
  html += '</div>';
  render(html);
  updateStatus();
}

function sceneWorldIntro() {
  var html = '';
  html += '<div class="scene-title">世界观</div>';
  html += '<div class="scene-text">';
  html += '<p>五百年前，龙陨落于此。</p>';
  html += '<p>它的血渗入大地，化作十二座城镇；它的鳞片散落四方，成为冒险者追逐的宝藏。</p>';
  html += '<p>如今，商路连接着这些城镇，而危险潜伏在道路之外。</p>';
  html += '<p>你，一个无名之辈，站在白城的城门前。</p>';
  html += '<p>你的故事，才刚刚开始。</p>';
  html += '</div>';
  html += '<button class="btn" onclick="sceneIntro()">↩️ 返回</button>';
  render(html);
}

// ═══════════════════════════════════════════════════════════
// SCENE: SELECT ORIGIN (with back button)
// ═══════════════════════════════════════════════════════════

function sceneSelectOrigin() {
  var html = '';
  html += '<div class="scene-title">选择你的起源</div>';
  html += '<div class="scene-desc">这将决定你的初始属性和特殊能力</div>';
  
  for (var i = 0; i < ORIGINS.length; i++) {
    var o = ORIGINS[i];
    html += '<div class="origin-card" onclick="selectOrigin(' + i + ')">';
    html += '<div class="origin-emoji">' + o.emoji + '</div>';
    html += '<div class="origin-name">' + o.name + '</div>';
    html += '<div class="origin-attrs">';
    html += '⚔️' + o.attr.str + ' 🌿' + o.attr.agi + ' 🧙' + o.attr.int + ' 💬' + o.attr.cha + ' 🎲' + o.attr.luk;
    html += '</div>';
    html += '<div class="origin-skill">' + o.skill.emoji + ' ' + o.skill.name + ' [' + o.skill.type + '][' + o.skill.target + ']</div>';
    html += '</div>';
  }
  
  html += '<button class="btn" onclick="sceneIntro()">↩️ 返回主菜单</button>';
  render(html);
}

function selectOrigin(idx) {
  G.origin = Object.assign({}, ORIGINS[idx]);
  // Apply base attrs
  G.str = G.origin.attr.str;
  G.agi = G.origin.attr.agi;
  G.int = G.origin.attr.int;
  G.cha = G.origin.attr.cha;
  G.luk = G.origin.attr.luk;
  // Apply start skills
  G.skills = G.origin.startSkills ? G.origin.startSkills.slice() : [];
  sceneOriginStory();
}

function sceneOriginStory() {
  var html = '';
  html += '<div class="scene-title">' + G.origin.emoji + ' ' + G.origin.name + '</div>';
  html += '<div class="origin-story">' + G.origin.story + '</div>';
  
  html += '<div class="skill-detail">';
  html += '<div class="skill-name">' + G.origin.skill.emoji + ' ' + G.origin.skill.name + '</div>';
  html += '<div class="skill-meta">[' + G.origin.skill.type + '] [' + G.origin.skill.target + ']</div>';
  html += '<div class="skill-desc">' + G.origin.skill.desc + '</div>';
  html += '</div>';
  
  html += '<div class="btns">';
  html += '<button class="btn btn-primary" onclick="sceneNameAndAttrs()">✅ 确认选择</button>';
  html += '<button class="btn" onclick="sceneSelectOrigin()">↩️ 重新选择起源</button>';
  html += '</div>';
  render(html);
}

// ═══════════════════════════════════════════════════════════
// SCENE: NAME & ATTRIBUTE ALLOCATION
// ═══════════════════════════════════════════════════════════

var _attrDraft = null;

function sceneNameAndAttrs() {
  // Save name before re-render (if input exists)
  var savedName = '';
  var nameEl = document.getElementById('charName');
  if (nameEl && nameEl.value) savedName = nameEl.value;
  
  if (!_attrDraft) {
    _attrDraft = { str:G.str, agi:G.agi, int:G.int, cha:G.cha, luk:G.luk, pts:5 };
  }
  
  var html = '';
  html += '<div class="scene-title">创建角色</div>';
  
  // Name input - restore saved value
  html += '<div class="name-section">';
  html += '<label>你的名字：</label>';
  html += '<input type="text" id="charName" placeholder="输入名字或随机生成" maxlength="12" value="' + savedName + '">';
  html += '<button class="btn-small" onclick="randomName()">🎲 随机</button>';
  html += '</div>';
  
  html += '<div class="scene-desc">分配5点自由属性点</div>';
  
  var attrs = [
    { key:'str', name:'⚔️ 力量', hint:'物攻+2, HP+5', base:G.str },
    { key:'agi', name:'🌿 敏捷', hint:'闪避+', base:G.agi },
    { key:'int', name:'🧙 智力', hint:'魔攻+2, MP+3', base:G.int },
    { key:'cha', name:'💬 魅力', hint:'折扣+', base:G.cha },
    { key:'luk', name:'🎲 幸运', hint:'会心+', base:G.luk }
  ];
  
  for (var i = 0; i < attrs.length; i++) {
    var a = attrs[i];
    var cur = _attrDraft[a.key];
    var delta = cur - a.base;
    
    html += '<div class="attr-row-v5">';
    html += '<div class="attr-info">';
    html += '<span class="attr-name-v5">' + a.name + '</span>';
    html += '<span class="attr-hint-v5">' + a.hint + '</span>';
    html += '</div>';
    html += '<div class="attr-controls">';
    html += '<button class="attr-btn" onclick="adjAttrV5(\'' + a.key + '\', -1)" ' + (delta <= 0 ? 'disabled' : '') + '>−</button>';
    html += '<span class="attr-value' + (delta > 0 ? ' attr-boosted' : '') + '">' + cur + (delta > 0 ? ' (+' + delta + ')' : '') + '</span>';
    html += '<button class="attr-btn" onclick="adjAttrV5(\'' + a.key + '\', 1)" ' + (_attrDraft.pts <= 0 ? 'disabled' : '') + '>+</button>';
    html += '</div>';
    html += '</div>';
  }
  
  html += '<div class="pts-remaining">剩余点数：<span class="pts-num">' + _attrDraft.pts + '</span></div>';
  
  html += '<div class="btns">';
  html += '<button class="btn btn-primary" onclick="confirmNameAndAttrs()" ' + (_attrDraft.pts > 0 ? 'disabled' : '') + '>✅ 确认</button>';
  html += '<button class="btn" onclick="resetAttrs()">🔄 重置</button>';
  html += '</div>';
  
  render(html);
}

function randomName() {
  var names = ['亚瑟','艾拉','雷恩','索菲亚','德里克','露娜','卡斯帕','伊芙琳','罗根','米拉'];
  var el = document.getElementById('charName');
  if (el) el.value = names[rand(0, names.length - 1)];
}

function adjAttrV5(key, delta) {
  if (delta > 0 && _attrDraft.pts <= 0) return;
  var newVal = _attrDraft[key] + delta;
  var baseVal = G[key];
  if (delta < 0 && newVal < baseVal) return;
  _attrDraft[key] = newVal;
  _attrDraft.pts -= delta;
  sceneNameAndAttrs();
}

function resetAttrs() {
  _attrDraft = { str:G.str, agi:G.agi, int:G.int, cha:G.cha, luk:G.luk, pts:5 };
  sceneNameAndAttrs();
}

function confirmNameAndAttrs() {
  var nameEl = document.getElementById('charName');
  G.name = nameEl && nameEl.value ? nameEl.value.trim() : '无名';
  if (!G.name) G.name = '无名';
  
  // Apply attrs
  G.str = _attrDraft.str;
  G.agi = _attrDraft.agi;
  G.int = _attrDraft.int;
  G.cha = _attrDraft.cha;
  G.luk = _attrDraft.luk;
  
  // Calc HP/MP
  G.maxHp = calcMaxHp();
  G.hp = G.maxHp;
  G.maxMp = calcMaxMp();
  G.mp = G.maxMp;
  
  _attrDraft = null;
  sceneWorldMap();
}


// ═══════════════════════════════════════════════════════════
// SCENE: WORLD MAP (illustrated style)
// ═══════════════════════════════════════════════════════════

function sceneWorldMap() {
  updateStatus();
  var html = '';
  html += '<div class="scene-title">世界地图</div>';
  
  // Illustrated hand-drawn map container
  html += '<div class="world-map">';
  html += '<svg viewBox="0 0 420 440" class="world-svg" xmlns="http://www.w3.org/2000/svg">';
  
  // Parchment background
  html += '<rect x="0" y="0" width="420" height="440" fill="#1a1a1a"/>';
  html += '<rect x="4" y="4" width="412" height="432" fill="none" stroke="#3a3a3a" stroke-width="1.5" stroke-dasharray="6,3"/>';
  
  // Decorative corner flourishes
  html += '<path d="M10 10 Q20 5 25 15" fill="none" stroke="#5a5a4a" stroke-width="1"/>';
  html += '<path d="M410 10 Q400 5 395 15" fill="none" stroke="#5a5a4a" stroke-width="1"/>';
  html += '<path d="M10 430 Q20 435 25 425" fill="none" stroke="#5a5a4a" stroke-width="1"/>';
  html += '<path d="M410 430 Q400 435 395 425" fill="none" stroke="#5a5a4a" stroke-width="1"/>';
  
  // Mountain range (north) - hand-drawn style with hatching
  html += '<path d="M30 120 L55 55 L80 120" fill="none" stroke="#6a6a5a" stroke-width="2" stroke-linejoin="round"/>';
  html += '<path d="M55 55 L50 75 M55 55 L60 70" fill="none" stroke="#6a6a5a" stroke-width="1"/>'; // peak hatches
  html += '<path d="M70 130 L105 50 L140 130" fill="none" stroke="#6a6a5a" stroke-width="2" stroke-linejoin="round"/>';
  html += '<path d="M105 50 L100 72 M105 50 L110 68" fill="none" stroke="#6a6a5a" stroke-width="1"/>';
  html += '<path d="M120 110 L155 40 L190 110" fill="none" stroke="#6a6a5a" stroke-width="2" stroke-linejoin="round"/>';
  html += '<path d="M155 40 L150 62 M155 40 L160 58" fill="none" stroke="#6a6a5a" stroke-width="1"/>';
  // Mountain range (northeast)
  html += '<path d="M280 100 L310 35 L340 100" fill="none" stroke="#6a6a5a" stroke-width="2" stroke-linejoin="round"/>';
  html += '<path d="M310 35 L305 57 M310 35 L315 53" fill="none" stroke="#6a6a5a" stroke-width="1"/>';
  html += '<path d="M330 110 L360 45 L390 110" fill="none" stroke="#6a6a5a" stroke-width="2" stroke-linejoin="round"/>';
  html += '<path d="M360 45 L355 67 M360 45 L365 63" fill="none" stroke="#6a6a5a" stroke-width="1"/>';
  
  // Forest (west) - sketchy tree clusters
  html += '<ellipse cx="75" cy="220" rx="45" ry="35" fill="none" stroke="#3a5a3a" stroke-width="2" stroke-dasharray="4,3"/>';
  html += '<path d="M60 210 L65 195 L70 210" fill="none" stroke="#3a5a3a" stroke-width="1.5"/>'; // tree1
  html += '<path d="M75 215 L80 198 L85 215" fill="none" stroke="#3a5a3a" stroke-width="1.5"/>'; // tree2
  html += '<path d="M90 212 L94 200 L98 212" fill="none" stroke="#3a5a3a" stroke-width="1.5"/>'; // tree3
  html += '<path d="M68 225 L72 215 L76 225" fill="none" stroke="#3a5a3a" stroke-width="1"/>'; // tree4
  
  // Lake (south) - rippling water
  html += '<ellipse cx="170" cy="350" rx="65" ry="42" fill="none" stroke="#3a5a7a" stroke-width="2"/>';
  html += '<path d="M130 345 Q150 338 170 345 Q190 352 210 345" fill="none" stroke="#3a5a7a" stroke-width="1" opacity="0.6"/>';
  html += '<path d="M135 355 Q155 348 175 355" fill="none" stroke="#3a5a7a" stroke-width="0.8" opacity="0.4"/>';
  // Star reflection in lake
  html += '<path d="M168 340 L170 334 L172 340 L176 342 L172 344 L170 350 L168 344 L164 342 Z" fill="#3a5a7a" opacity="0.5"/>';
  
  // Mine (southwest) - cave opening
  html += '<path d="M60 370 Q70 355 80 370" fill="none" stroke="#5a5a5a" stroke-width="2"/>';
  html += '<path d="M65 370 L65 378 M75 370 L75 378" fill="none" stroke="#5a5a5a" stroke-width="1.5"/>';
  html += '<line x1="60" y1="378" x2="80" y2="378" stroke="#5a5a5a" stroke-width="1.5"/>';
  
  // Roads - dashed trails
  html += '<path d="M210 220 Q190 260 170 310" fill="none" stroke="#6a5a4a" stroke-width="2.5" stroke-dasharray="8,4"/>';
  html += '<path d="M210 220 Q170 220 100 215" fill="none" stroke="#6a5a4a" stroke-width="2.5" stroke-dasharray="8,4"/>';
  html += '<path d="M210 220 Q260 210 310 205" fill="none" stroke="#6a5a4a" stroke-width="2.5" stroke-dasharray="8,4"/>';
  html += '<path d="M100 215 Q85 280 75 350" fill="none" stroke="#6a5a4a" stroke-width="2" stroke-dasharray="6,4"/>';
  
  // Locations - clickable markers
  var locs = [
    { id:'whitecity', x:210, y:220, name:'白城', icon:'🏰', color:'#d4a017' },
    { id:'lake', x:170, y:310, name:'坠星湖', icon:'🌊', color:'#48a' },
    { id:'darkforest', x:100, y:215, name:'幽暗森林', icon:'🌲', color:'#4a4' },
    { id:'fortress', x:310, y:205, name:'破碎堡垒', icon:'🏚️', color:'#a64' },
    { id:'mine', x:75, y:355, name:'暗影矿洞', icon:'⛏️', color:'#888' }
  ];
  
  for (var i = 0; i < locs.length; i++) {
    var l = locs[i];
    var unlocked = LOCATIONS[l.id].unlocked;
    var isCurrent = G.location === l.id;
    
    if (unlocked) {
      // Clickable area (invisible, on top)
      html += '<circle cx="' + l.x + '" cy="' + l.y + '" r="22" fill="transparent" style="cursor:pointer" onclick="travelTo(\'' + l.id + '\')"/>';
      // Outer decorative ring
      html += '<circle cx="' + l.x + '" cy="' + l.y + '" r="16" fill="#1a1a1a" stroke="' + l.color + '" stroke-width="2"/>';
      // Inner sketch circle
      html += '<circle cx="' + l.x + '" cy="' + l.y + '" r="12" fill="none" stroke="' + l.color + '" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.5"/>';
      // Icon
      html += '<text x="' + l.x + '" y="' + (l.y + 5) + '" text-anchor="middle" fill="' + l.color + '" font-size="14">' + l.icon + '</text>';
      // Name label
      html += '<text x="' + l.x + '" y="' + (l.y + 30) + '" text-anchor="middle" fill="#aaa" font-size="10">' + l.name + '</text>';
      // Current location glow
      if (isCurrent) {
        html += '<circle cx="' + l.x + '" cy="' + l.y + '" r="22" fill="none" stroke="#d4a017" stroke-width="2" stroke-dasharray="4,2" opacity="0.8">';
        html += '<animate attributeName="r" values="20;24;20" dur="2s" repeatCount="indefinite"/>';
        html += '<animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite"/>';
        html += '</circle>';
      }
    } else {
      // Locked - faded question mark
      html += '<circle cx="' + l.x + '" cy="' + l.y + '" r="10" fill="none" stroke="#444" stroke-width="1.5" stroke-dasharray="3,2"/>';
      html += '<text x="' + l.x + '" y="' + (l.y + 4) + '" text-anchor="middle" fill="#444" font-size="11">?</text>';
    }
  }
  
  // Compass rose (top-right corner)
  html += '<g transform="translate(370,60)">';
  html += '<circle cx="0" cy="0" r="18" fill="none" stroke="#5a5a4a" stroke-width="1"/>';
  html += '<text x="0" y="-22" text-anchor="middle" fill="#6a6a5a" font-size="9">N</text>';
  html += '<path d="M0 -15 L3 -5 L0 -8 L-3 -5 Z" fill="#6a6a5a"/>'; // north arrow
  html += '<text x="0" y="30" text-anchor="middle" fill="#5a5a4a" font-size="8">S</text>';
  html += '<text x="-26" y="4" text-anchor="middle" fill="#5a5a4a" font-size="8">W</text>';
  html += '<text x="26" y="4" text-anchor="middle" fill="#5a5a4a" font-size="8">E</text>';
  html += '</g>';
  
  html += '</svg>';
  html += '</div>';
  
  // Action buttons
  html += '<div class="map-actions">';
  html += '<div class="current-loc">📍 当前位置：<strong>' + LOCATIONS[G.location].name + '</strong></div>';
  
  if (LOCATIONS[G.location].type === 'town') {
    html += '<button class="btn btn-primary" onclick="sceneTown()">🏘️ 进入城镇</button>';
  } else {
    html += '<button class="btn btn-primary" onclick="enterMiniMap()">🗺️ 探索区域</button>';
  }
  
  html += '<button class="btn" onclick="sceneInventory()">🎒 背包</button>';
  html += '<button class="btn" onclick="scenePlayerInfo()">👤 角色</button>';
  html += '</div>';
  
  render(html);
}

function travelTo(locId) {
  if (!LOCATIONS[locId] || !LOCATIONS[locId].unlocked) {
    toast('🔒 尚未解锁');
    return;
  }
  if (G.location === locId) {
    toast('你已经在这里了');
    return;
  }
  G.location = locId;
  updateStatus();
  toast('🚶 前往' + LOCATIONS[locId].name);
  sceneWorldMap();
}

// ═══════════════════════════════════════════════════════════
// MINI-MAP SYSTEM (per-location exploration)
// ═══════════════════════════════════════════════════════════

function enterMiniMap() {
  var loc = LOCATIONS[G.location];
  if (!loc.miniMap) {
    toast('这里没有可探索的区域');
    return;
  }
  G.miniMapPos = loc.miniMap.start;
  renderMiniMap();
}

function renderMiniMap(msg) {
  var loc = LOCATIONS[G.location];
  var map = loc.miniMap;
  var area = map.areas.find(function(a) { return a.id === G.miniMapPos; });
  
  var html = '';
  html += '<div class="scene-title">' + map.name + '</div>';
  if (msg) html += '<div class="mini-msg">' + msg + '</div>';
  
  // Area info
  html += '<div class="mini-area">';
  html += '<div class="mini-area-name">📍 ' + area.name + '</div>';
  html += '<div class="mini-area-desc">' + area.desc + '</div>';
  html += '</div>';
  
  // Mini map visualization (clickable nodes, no direction buttons)
  html += '<div class="mini-map-grid">';
  html += renderMiniMapVisual(map, area);
  html += '</div>';
  
  // Area actions
  html += '<div class="mini-actions">';
  if (area.enemies) {
    html += '<button class="btn btn-danger" onclick="miniMapBattle()">⚔️ 搜寻敌人</button>';
  }
  if (area.treasure) {
    html += '<button class="btn btn-primary" onclick="miniMapTreasure()">📦 搜索宝藏</button>';
  }
  if (area.boss) {
    html += '<button class="btn btn-danger" onclick="miniMapBoss()">👑 挑战首领</button>';
  }
  if (area.event) {
    html += '<button class="btn" onclick="miniMapEvent()">🔍 调查</button>';
  }
  html += '<button class="btn" onclick="sceneWorldMap()">🚪 离开区域</button>';
  html += '</div>';
  
  render(html);
}

function renderMiniMapVisual(map, currentArea) {
  // Build proper node positions based on exits, then draw connected graph
  var areas = map.areas;
  var pos = {}; // area.id -> {x,y}
  
  // Assign positions using BFS from start
  var startId = map.start;
  var visited = {};
  var queue = [{ id: startId, x: 100, y: 120 }];
  visited[startId] = true;
  
  while (queue.length > 0) {
    var cur = queue.shift();
    pos[cur.id] = { x: cur.x, y: cur.y };
    var curArea = areas.find(function(a) { return a.id === cur.id; });
    if (!curArea || !curArea.exits) continue;
    
    var offsets = { n:[0,-50], s:[0,50], w:[-55,0], e:[55,0] };
    for (var dir in offsets) {
      if (curArea.exits[dir] && !visited[curArea.exits[dir]]) {
        visited[curArea.exits[dir]] = true;
        var nx = cur.x + offsets[dir][0];
        var ny = cur.y + offsets[dir][1];
        queue.push({ id: curArea.exits[dir], x: nx, y: ny });
      }
    }
  }
  
  // Calculate bounding box and center
  var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (var pid in pos) {
    if (pos[pid].x < minX) minX = pos[pid].x;
    if (pos[pid].x > maxX) maxX = pos[pid].x;
    if (pos[pid].y < minY) minY = pos[pid].y;
    if (pos[pid].y > maxY) maxY = pos[pid].y;
  }
  var cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  var padX = 40, padY = 35;
  var vw = Math.max(200, maxX - minX + padX * 2);
  var vh = Math.max(150, maxY - minY + padY * 2);
  var ox = vw / 2 - cx, oy = vh / 2 - cy;
  
  var html = '';
  html += '<svg viewBox="0 0 ' + vw + ' ' + vh + '" class="mini-svg" style="width:100%;max-height:180px">';
  
  // Draw edges first (behind nodes)
  for (var ei = 0; ei < areas.length; ei++) {
    var ea = areas[ei];
    if (!ea.exits) continue;
    if (!pos[ea.id]) continue;
    var p1 = pos[ea.id];
    p1.x += ox; p1.y += oy;
    
    for (var edir in ea.exits) {
      var targetId = ea.exits[edir];
      if (!targetId || !pos[targetId]) continue;
      var p2 = pos[targetId];
      p2.x += ox; p2.y += oy;
      
      html += '<line x1="' + p1.x + '" y1="' + p1.y + '" x2="' + p2.x + '" y2="' + p2.y + '" stroke="#5a5a4a" stroke-width="2"/>';
    }
  }
  
  // Draw nodes on top
  for (var ni = 0; ni < areas.length; ni++) {
    var na = areas[ni];
    if (!pos[na.id]) continue;
    var np = { x: pos[na.id].x + ox, y: pos[na.id].y + oy };
    var isCurrent = na.id === currentArea.id;
    var isAdjacent = false;
    // Check if adjacent to current
    if (currentArea.exits) {
      for (var ck in currentArea.exits) {
        if (currentArea.exits[ck] === na.id) isAdjacent = true;
      }
    }
    // Also check reverse: can we go from this node to current?
    if (!isAdjacent && na.exits) {
      for (var rk in na.exits) {
        if (na.exits[rk] === currentArea.id) isAdjacent = true;
      }
    }
    
    var ncolor = na.boss ? '#c44' : (na.treasure ? '#d4a017' : (na.enemies ? '#6b8a5a' : '#888'));
    var nr = isCurrent ? 14 : (isAdjacent ? 11 : 8);
    
    // Clickable transparent circle
    if (isCurrent || isAdjacent) {
      html += '<circle cx="' + np.x + '" cy="' + np.y + '" r="22" fill="transparent" style="cursor:pointer" onclick="clickMiniMapNode(\'' + na.id + '\')"/>';
    }
    
    // Visible node
    html += '<circle cx="' + np.x + '" cy="' + np.y + '" r="' + nr + '" fill="#1a1a1a" stroke="' + ncolor + '" stroke-width="' + (isCurrent ? 3 : 2) + '"/>';
    
    // Node icon
    var nicon = na.boss ? '👑' : (na.treasure ? '📦' : (na.enemies ? '⚔️' : '●'));
    html += '<text x="' + np.x + '" y="' + (np.y + 4) + '" text-anchor="middle" fill="' + ncolor + '" font-size="' + (isCurrent ? 11 : 9) + '">' + nicon + '</text>';
    
    // Node name label
    html += '<text x="' + np.x + '" y="' + (np.y + nr + 12) + '" text-anchor="middle" fill="#999" font-size="8">' + na.name + '</text>';
    
    // Current location pulse
    if (isCurrent) {
      html += '<circle cx="' + np.x + '" cy="' + np.y + '" r="20" fill="none" stroke="#d4a017" stroke-width="1.5" stroke-dasharray="4,2" opacity="0.7">';
      html += '<animate attributeName="r" values="18;24;18" dur="2s" repeatCount="indefinite"/>';
      html += '</circle>';
    }
  }
  
  html += '</svg>';
  return html;
}

function clickMiniMapNode(nodeId) {
  var loc = LOCATIONS[G.location];
  var map = loc.miniMap;
  var currentArea = map.areas.find(function(a) { return a.id === G.miniMapPos; });
  
  // Check if this node is reachable (adjacent)
  var reachable = false;
  if (currentArea.exits) {
    for (var dir in currentArea.exits) {
      if (currentArea.exits[dir] === nodeId) reachable = true;
    }
  }
  if (!reachable && currentArea.exits) {
    // Check reverse
    var targetArea = map.areas.find(function(a) { return a.id === nodeId; });
    if (targetArea && targetArea.exits) {
      for (var rdir in targetArea.exits) {
        if (targetArea.exits[rdir] === G.miniMapPos) reachable = true;
      }
    }
  }
  
  if (!reachable) {
    toast('🔒 需要先经过相邻区域');
    return;
  }
  
  G.miniMapPos = nodeId;
  var newArea = map.areas.find(function(a) { return a.id === nodeId; });
  renderMiniMap('前往 ' + newArea.name + '...');
}

function moveMiniMap(dir) {
  var loc = LOCATIONS[G.location];
  var map = loc.miniMap;
  var area = map.areas.find(function(a) { return a.id === G.miniMapPos; });
  
  if (!area.exits[dir]) {
    toast('那个方向没有路');
    return;
  }
  
  G.miniMapPos = area.exits[dir];
  renderMiniMap('你向' + (dir === 'n' ? '北' : dir === 's' ? '南' : dir === 'e' ? '东' : '西') + '前进...');
}

function miniMapBattle() {
  var loc = LOCATIONS[G.location];
  var enemyIds = loc.enemies || ['goblin'];
  var count = rand(1, 2);
  var enemies = [];
  
  for (var i = 0; i < count; i++) {
    var eid = enemyIds[rand(0, enemyIds.length - 1)];
    var template = ENEMIES[eid];
    if (template) {
      enemies.push(Object.assign({}, template, { curHp: template.hp }));
    }
  }
  
  G.battle = { enemies: enemies, log: [], turn: 0, defending: false, warcry: 0, gamblerUsed: false, dungeon: true };
  G.inBattle = true;
  G.selectedTarget = 0;
  G.attackMode = null;
  renderBattle('遭遇 ' + enemies.length + ' 只敌人！');
}

function miniMapBoss() {
  var template = ENEMIES.boss_goblin;
  G.battle = { 
    enemies: [Object.assign({}, template, { curHp: template.hp })], 
    log: [], turn: 0, defending: false, warcry: 0, gamblerUsed: false, dungeon: true, isBoss: true 
  };
  G.inBattle = true;
  G.selectedTarget = 0;
  G.attackMode = null;
  renderBattle('👑 首领战！');
}

function miniMapTreasure() {
  var gold = rand(20, 80);
  G.gold += gold;
  updateStatus();
  toast('💰 发现 ' + gold + ' 金币！');
  renderMiniMap('你在角落里发现了一个钱袋！');
}

function miniMapEvent() {
  renderMiniMap('这里似乎隐藏着什么秘密...（事件系统待完善）');
}


// ═══════════════════════════════════════════════════════════
// SCENE: BATTLE (with SVG enemies and fixed HP bars)
// ═══════════════════════════════════════════════════════════

function renderBattle(msg) {
  if (!G || !G.battle) return;
  var b = G.battle;
  var html = '';

  // Header
  html += '<div class="battle-header">' + (msg || '⚔️ 战斗') + '</div>';

  // Enemies with SVG
  var alive = b.enemies.filter(function(e) { return e.curHp > 0; });
  html += '<div class="enemies-container">';
  
  for (var i = 0; i < b.enemies.length; i++) {
    var e = b.enemies[i];
    var dead = e.curHp <= 0;
    var isSelected = (i === G.selectedTarget && !dead);
    
    html += '<div class="enemy-card' + (dead ? ' dead' : '') + (isSelected ? ' selected' : '') + '" onclick="' + (dead ? '' : 'selectTarget(' + i + ')') + '">';
    
    // SVG Art
    html += '<div class="enemy-art">' + (e.svg || '') + '</div>';
    
    // Enemy info
    html += '<div class="enemy-info">';
    html += '<div class="enemy-name">' + (e.isBoss ? '👑 ' : '') + e.name + '</div>';
    
    // HP Bar - FIXED
    var hpPct = dead ? 0 : Math.max(2, (e.curHp / e.hp) * 100);
    html += '<div class="hp-bar-container">';
    html += '<div class="hp-bar">';
    html += '<div class="hp-fill" style="width:' + hpPct + '%"></div>';
    html += '</div>';
    html += '<span class="hp-text">' + Math.max(0, e.curHp) + '/' + e.hp + '</span>';
    html += '</div>';
    
    if (isSelected) {
      html += '<div class="target-indicator">🎯 目标</div>';
    }
    html += '</div>';
    html += '</div>';
  }
  html += '</div>';

  // Player status - FIXED HP BARS
  html += '<div class="player-panel">';
  html += '<div class="player-name">' + G.name + ' Lv.' + G.level + '</div>';
  
  // HP Bar
  var playerHpPct = Math.max(2, (G.hp / G.maxHp) * 100);
  html += '<div class="player-stat">';
  html += '<span class="stat-label">❤️ HP</span>';
  html += '<div class="stat-bar">';
  html += '<div class="stat-fill hp" style="width:' + playerHpPct + '%"></div>';
  html += '</div>';
  html += '<span class="stat-value">' + G.hp + '/' + G.maxHp + '</span>';
  html += '</div>';
  
  // MP Bar
  var playerMpPct = Math.max(2, (G.mp / G.maxMp) * 100);
  html += '<div class="player-stat">';
  html += '<span class="stat-label">💧 MP</span>';
  html += '<div class="stat-bar">';
  html += '<div class="stat-fill mp" style="width:' + playerMpPct + '%"></div>';
  html += '</div>';
  html += '<span class="stat-value">' + G.mp + '/' + G.maxMp + '</span>';
  html += '</div>';
  
  // XP Bar
  var xpNeed = calcNextXp(G.level);
  var xpPct = Math.min(100, (G.xp / xpNeed) * 100);
  html += '<div class="player-stat xp-stat">';
  html += '<span class="stat-label">⭐ EXP</span>';
  html += '<div class="stat-bar xp-bar">';
  html += '<div class="stat-fill xp" style="width:' + xpPct + '%"></div>';
  html += '</div>';
  html += '<span class="stat-value">' + G.xp + '/' + xpNeed + '</span>';
  html += '</div>';
  
  html += '</div>';

  // Battle log
  if (b.log && b.log.length > 0) {
    html += '<div class="battle-log">';
    html += b.log.slice(-3).join('<br>');
    html += '</div>';
  }

  // Check win/loss
  if (alive.length === 0) {
    html += '<div class="battle-result win">🎉 胜利！</div>';
    html += '<button class="btn btn-primary" onclick="endBattle()">继续</button>';
    render(html);
    return;
  }
  if (G.hp <= 0) {
    html += '<div class="battle-result lose">💀 你倒下了...</div>';
    html += '<button class="btn btn-danger" onclick="sceneDeath()">查看结果</button>';
    render(html);
    return;
  }

  // Attack mode selection
  html += '<div class="battle-controls">';
  html += '<div class="controls-label">选择行动方式，然后点击敌人：</div>';
  
  html += '<div class="attack-modes">';
  html += '<button class="mode-btn' + (G.attackMode === 'attack' ? ' active' : '') + '" onclick="setAttackMode(\'attack\')">⚔️ 普通攻击</button>';
  
  // Origin skill - FIXED: use emoji from skill
  if (G.origin && G.origin.skill) {
    var oSkill = G.origin.skill;
    html += '<button class="mode-btn' + (G.attackMode === 'origin' ? ' active' : '') + '" onclick="setAttackMode(\'origin\')">' + oSkill.emoji + ' ' + oSkill.name + '</button>';
  }
  
  // Learned skills
  if (G.skills && G.skills.length > 0) {
    for (var s = 0; s < G.skills.length; s++) {
      var skId = G.skills[s];
      var sk = SKILLS.find(function(x) { return x.id === skId; });
      if (sk) {
        var canUse = G.mp >= sk.cost;
        html += '<button class="mode-btn' + (G.attackMode === skId ? ' active' : '') + (canUse ? '' : ' disabled') + '" onclick="' + (canUse ? 'setAttackMode(\'' + skId + '\')' : '') + '" ' + (canUse ? '' : 'disabled') + '>' + sk.emoji + ' ' + sk.name + ' (' + sk.cost + 'MP)</button>';
      }
    }
  }
  
  html += '<button class="mode-btn' + (G.attackMode === 'defend' ? ' active' : '') + '" onclick="setAttackMode(\'defend\')">🛡️ 防御</button>';
  html += '<button class="mode-btn" onclick="tryFlee()">🏃 逃跑</button>';
  html += '</div>';

  // Execute button with immersive text
  if (G.attackMode && G.selectedTarget >= 0 && b.enemies[G.selectedTarget] && b.enemies[G.selectedTarget].curHp > 0) {
    var targetName = b.enemies[G.selectedTarget].name;
    var actionText = getActionText(G.attackMode, targetName);
    html += '<button class="btn btn-attack" onclick="executeAttack()">' + actionText + '</button>';
  }
  
  html += '</div>';

  render(html);
}

function getActionText(mode, target) {
  var texts = {
    'attack': '⚔️ 挥剑斩向 ' + target + '！',
    'defend': '🛡️ 举盾防御，准备反击！',
    'origin': '✨ 发动起源技能！'
  };
  if (texts[mode]) return texts[mode];
  
  // Skill
  var sk = SKILLS.find(function(s) { return s.id === mode; });
  if (sk) {
    return sk.emoji + ' 施展「' + sk.name + '」攻击 ' + target + '！';
  }
  return '发动攻击';
}

function setAttackMode(mode) {
  G.attackMode = mode;
  renderBattle('已选择：' + (mode === 'attack' ? '普通攻击' : mode === 'defend' ? '防御' : mode === 'origin' ? G.origin.skill.name : '技能'));
}

function selectTarget(idx) {
  G.selectedTarget = idx;
  renderBattle('目标：' + (G.battle.enemies[idx] ? G.battle.enemies[idx].name : '?'));
}

function executeAttack() {
  var mode = G.attackMode;
  if (!mode) { toast('请先选择行动方式'); return; }
  
  if (mode === 'attack') {
    playerAttack();
  } else if (mode === 'defend') {
    playerDefend();
  } else if (mode === 'origin') {
    useOriginSkill();
  } else {
    playerSkill(mode);
  }
}

function playerAttack() {
  var b = G.battle;
  var alive = b.enemies.filter(function(e) { return e.curHp > 0; });
  if (alive.length === 0) return;

  var targetIdx = G.selectedTarget;
  if (!b.enemies[targetIdx] || b.enemies[targetIdx].curHp <= 0) {
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
  b.log.push('⚔️ 你的攻击命中 ' + target.name + '，造成 <span class="dmg-crit">' + dmg + '</span>' + (isCrit ? ' <span class="crit-text">会心一击！</span>' : ''));
  
  if (b.warcry && b.warcry > 0) b.warcry--;

  G.attackMode = null;
  setTimeout(function() { enemyTurn(); }, 600);
}

function playerDefend() {
  G.battle.defending = true;
  G.battle.log.push('🛡️ 你举起盾牌，准备迎接冲击');
  G.attackMode = null;
  setTimeout(function() { enemyTurn(); }, 600);
}

function useOriginSkill() {
  var o = G.origin;
  if (!o || !o.skill) return;
  
  if (o.id === 'warrior') {
    G.battle.warcry = 3;
    G.battle.log.push('📢 战吼！你的斗志高涨，攻击力提升20%');
  } else if (o.id === 'gambler') {
    gamblerAttack();
    return;
  } else if (o.id === 'cleric') {
    var healAmt = Math.floor(G.maxHp * 0.1);
    G.hp = Math.min(G.maxHp, G.hp + healAmt);
    G.battle.log.push('✨ 祈祷生效，恢复 ' + healAmt + ' HP');
  } else {
    G.battle.log.push('🔮 ' + o.skill.name + '：' + o.skill.desc);
  }
  
  G.attackMode = null;
  setTimeout(function() { enemyTurn(); }, 600);
}

function playerSkill(sid) {
  var sk = SKILLS.find(function(s) { return s.id === sid; });
  if (!sk) return;
  if (G.mp < sk.cost) { toast('💧 MP不足！'); return; }
  
  G.mp -= sk.cost;
  var b = G.battle;
  var alive = b.enemies.filter(function(e) { return e.curHp > 0; });
  
  if (sk.target === '自身' || sk.type === '治疗') {
    if (sk.healMin) {
      var heal = rand(sk.healMin, sk.healMax);
      G.hp = Math.min(G.maxHp, G.hp + heal);
      b.log.push(sk.name + ' 恢复 ' + heal + ' HP');
    }
  } else if (sk.aoe) {
    var total = 0;
    for (var i = 0; i < alive.length; i++) {
      var d = rand(sk.dmgMin, sk.dmgMax);
      alive[i].curHp -= d;
      total += d;
    }
    b.log.push(sk.name + ' 对所有敌人造成 ' + total + ' 伤害');
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
    b.log.push(sk.name + ' 命中目标，造成 ' + total2 + ' 伤害');
  } else {
    var targetIdx2 = G.selectedTarget;
    if (!b.enemies[targetIdx2] || b.enemies[targetIdx2].curHp <= 0) {
      for (var k = 0; k < b.enemies.length; k++) {
        if (b.enemies[k].curHp > 0) { targetIdx2 = k; break; }
      }
    }
    var dmg2 = rand(sk.dmgMin, sk.dmgMax);
    b.enemies[targetIdx2].curHp -= dmg2;
    b.log.push(sk.name + ' 造成 ' + dmg2 + ' 伤害');
  }
  
  G.attackMode = null;
  updateStatus();
  setTimeout(function() { enemyTurn(); }, 600);
}

function gamblerAttack() {
  var b = G.battle;
  var winChance = 0.25 + G.luk * 0.02;
  if (Math.random() < winChance) {
    var targetIdx = G.selectedTarget;
    if (!b.enemies[targetIdx] || b.enemies[targetIdx].curHp <= 0) {
      for (var i = 0; i < b.enemies.length; i++) {
        if (b.enemies[i].curHp > 0) { targetIdx = i; break; }
      }
    }
    var target = b.enemies[targetIdx];
    var dmg = Math.floor(calcAtk() * 2.5);
    target.curHp -= dmg;
    b.log.push('🎲 孤注一掷！命运站在你这边，造成 ' + dmg + ' 伤害！');
  } else {
    var selfDmg = Math.floor(G.hp * 0.3);
    G.hp = Math.max(1, G.hp - selfDmg);
    b.log.push('🎲 孤注一掷失败！运气背弃了你，自伤 ' + selfDmg);
    updateStatus();
  }
  b.gamblerUsed = true;
  G.attackMode = null;
  setTimeout(function() { enemyTurn(); }, 600);
}

function enemyTurn() {
  var b = G.battle;
  var alive = b.enemies.filter(function(e) { return e.curHp > 0; });

  for (var i = 0; i < alive.length; i++) {
    var e = alive[i];
    if (Math.random() * 100 < calcDodge()) {
      b.log.push('💨 你闪避了 ' + e.name + ' 的攻击！');
      continue;
    }
    var dmg = rand(Math.floor(e.atk * 0.8), Math.floor(e.atk * 1.2));
    if (b.defending) dmg = Math.floor(dmg * 0.5);
    G.hp = Math.max(0, G.hp - dmg);
    b.log.push(e.name + ' 攻击命中，造成 ' + dmg + ' 伤害');
  }

  b.turn++;
  b.defending = false;
  updateStatus();
  renderBattle('敌方回合');
}

// ═══════════════════════════════════════════════════════════
// FLEE FUNCTION - FIXED
// ═══════════════════════════════════════════════════════════

function tryFlee() {
  var b = G.battle;
  if (b.isBoss) {
    toast('👑 首领战中无法逃跑！');
    return;
  }
  
  var fleeChance = 40 + G.agi * 0.5;
  if (Math.random() * 100 < fleeChance) {
    toast('🏃 成功逃脱！');
    G.inBattle = false;
    G.battle = null;
    G.attackMode = null;
    sceneWorldMap();
  } else {
    b.log.push('🏃 逃跑失败！敌人追了上来');
    G.attackMode = null;
    setTimeout(function() { enemyTurn(); }, 600);
  }
}

function endBattle() {
  var b = G.battle;
  G.inBattle = false;

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
  while (G.xp >= calcNextXp(G.level)) {
    doLevelUp();
  }

  G.battle = null;
  G.attackMode = null;
  updateStatus();

  var html = '';
  html += '<div class="scene-title">战斗胜利</div>';
  html += '<div class="victory-rewards">';
  html += '<div>⭐ ' + totalXp + ' 经验值</div>';
  html += '<div>💰 ' + totalGold + ' 金币</div>';
  html += '</div>';
  html += '<button class="btn btn-primary" onclick="afterBattleContinue()">继续</button>';
  render(html);
}

function afterBattleContinue() {
  // Return to exploration if in a wild area, otherwise world map
  var loc = LOCATIONS[G.location];
  if (loc && loc.miniMap) {
    renderMiniMap('战斗结束，继续探索...');
  } else {
    sceneWorldMap();
  }
}

function doLevelUp() {
  G.level++;
  G.xp -= calcNextXp(G.level - 1);
  G.attrPts += 3;
  G.skillPts += 1;
  G.maxHp = calcMaxHp();
  G.hp = G.maxHp;
  G.maxMp = calcMaxMp();
  G.mp = G.maxMp;
  toast('🎉 升级！Lv.' + G.level);
}

function sceneDeath() {
  G.totalBattlesLost++;
  var lossGold = Math.floor(G.gold * 0.1);
  var lossXp = Math.floor(G.xp * 0.2);
  G.gold -= lossGold;
  G.xp = Math.max(0, G.xp - lossXp);

  var html = '';
  html += '<div class="scene-title">战斗失败</div>';
  html += '<div class="death-msg">你被送回最近的城镇...</div>';
  html += '<div class="loss-info">损失：💰' + lossGold + ' | ⭐' + lossXp + ' EXP</div>';
  html += '<button class="btn btn-primary" onclick="sceneRespawn()">继续</button>';
  render(html);
}

function sceneRespawn() {
  G.hp = Math.floor(G.maxHp * 0.5);
  G.mp = Math.floor(G.maxMp * 0.5);
  G.location = 'whitecity';
  updateStatus();
  sceneTown();
}


// ═══════════════════════════════════════════════════════════
// SCENE: TOWN
// ═══════════════════════════════════════════════════════════

function sceneTown() {
  updateStatus();
  var html = '';
  html += '<div class="scene-title">' + LOCATIONS[G.location].name + '</div>';
  html += '<div class="town-desc">城镇中心，店铺林立，旅人熙来攘往</div>';
  
  // Town buildings - hand-drawn SVG style
  html += '<div class="town-buildings">';
  
  // Inn
  html += '<div class="building" onclick="sceneInn()">';
  html += '<div class="build-art"><svg viewBox="0 0 60 50" class="build-svg">';
  html += '<path d="M10 45 L10 20" stroke="#8a7a6a" stroke-width="2" fill="none"/>';
  html += '<path d="M50 45 L50 20" stroke="#8a7a6a" stroke-width="2" fill="none"/>';
  html += '<path d="M5 20 L30 8 L55 20" stroke="#a89070" stroke-width="2" fill="none" stroke-linejoin="round"/>';
  html += '<path d="M24 45 L24 32 L36 32 L36 45" stroke="#8a7a6a" stroke-width="1.5" fill="none"/>'; // door
  html += '<rect x="14" y="25" width="6" height="6" fill="none" stroke="#5a5a4a" stroke-width="1" rx="1"/>'; // window
  html += '<rect x="40" y="25" width="6" height="6" fill="none" stroke="#5a5a4a" stroke-width="1" rx="1"/>'; // window
  html += '<path d="M28 6 L28 2 L32 2 L32 6" stroke="#d4a017" stroke-width="1" fill="none"/>'; // sign
  html += '</svg></div>';
  html += '<div class="build-name">旅店</div>';
  html += '<div class="build-desc">住宿恢复</div>';
  html += '</div>';
  
  // Shop
  html += '<div class="building" onclick="sceneShop()">';
  html += '<div class="build-art"><svg viewBox="0 0 60 50" class="build-svg">';
  html += '<path d="M8 45 L8 18 L30 10 L52 18 L52 45" stroke="#8a7a6a" stroke-width="2" fill="none"/>';
  html += '<path d="M8 18 L52 18" stroke="#a89070" stroke-width="2"/>'; // awning
  html += '<path d="M8 18 Q15 14 22 18 Q29 14 36 18 Q43 14 50 18" stroke="#6a5a4a" stroke-width="1.5" fill="none"/>'; // scalloped awning
  html += '<rect x="20" y="28" width="20" height="17" fill="none" stroke="#8a7a6a" stroke-width="1.5"/>'; // door
  html += '<circle cx="39" cy="36" r="1.5" fill="#5a5a4a"/>'; // doorknob
  html += '</svg></div>';
  html += '<div class="build-name">商店</div>';
  html += '<div class="build-desc">购买装备</div>';
  html += '</div>';
  
  // Guild (quests)
  html += '<div class="building" onclick="sceneGuild()">';
  html += '<div class="build-art"><svg viewBox="0 0 60 50" class="build-svg">';
  html += '<path d="M10 45 L10 22" stroke="#8a7a6a" stroke-width="2" fill="none"/>';
  html += '<path d="M50 45 L50 22" stroke="#8a7a6a" stroke-width="2" fill="none"/>';
  html += '<path d="M5 22 L30 10 L55 22" stroke="#a89070" stroke-width="2" fill="none" stroke-linejoin="round"/>';
  html += '<path d="M22 30 L30 24 L38 30" stroke="#d4a017" stroke-width="1.5" fill="none"/>'; // banner
  html += '<path d="M22 30 L38 30" stroke="#d4a017" stroke-width="1"/>'; // banner bottom
  html += '<rect x="22" y="35" width="16" height="10" fill="none" stroke="#8a7a6a" stroke-width="1.5" rx="1"/>'; // door
  html += '</svg></div>';
  html += '<div class="build-name">公会</div>';
  html += '<div class="build-desc">接取任务</div>';
  html += '</div>';
  
  // Blacksmith
  html += '<div class="building" onclick="sceneBlacksmith()">';
  html += '<div class="build-art"><svg viewBox="0 0 60 50" class="build-svg">';
  html += '<path d="M10 45 L10 20" stroke="#8a7a6a" stroke-width="2" fill="none"/>';
  html += '<path d="M50 45 L50 20" stroke="#8a7a6a" stroke-width="2" fill="none"/>';
  html += '<path d="M5 20 L30 8 L55 20" stroke="#a89070" stroke-width="2" fill="none" stroke-linejoin="round"/>';
  html += '<path d="M20 45 L20 28 L40 28 L40 45" stroke="#8a7a6a" stroke-width="1.5" fill="none"/>'; // opening
  html += '<circle cx="30" cy="22" r="3" fill="none" stroke="#c84" stroke-width="1"/>'; // anvil
  html += '<path d="M27 16 Q30 12 33 16" stroke="#c84" stroke-width="1" fill="none"/>'; // spark
  html += '</svg></div>';
  html += '<div class="build-name">铁匠铺</div>';
  html += '<div class="build-desc">强化装备</div>';
  html += '</div>';
  
  // Tavern
  html += '<div class="building" onclick="sceneTavern()">';
  html += '<div class="build-art"><svg viewBox="0 0 60 50" class="build-svg">';
  html += '<path d="M10 45 L10 22" stroke="#8a7a6a" stroke-width="2" fill="none"/>';
  html += '<path d="M50 45 L50 22" stroke="#8a7a6a" stroke-width="2" fill="none"/>';
  html += '<path d="M5 22 L30 12 L55 22" stroke="#a89070" stroke-width="2" fill="none" stroke-linejoin="round"/>';
  html += '<path d="M25 45 L25 34 L35 34 L35 45" stroke="#8a7a6a" stroke-width="1.5" fill="none"/>'; // door
  html += '<circle cx="20" cy="28" r="4" fill="none" stroke="#5a5a4a" stroke-width="1"/>'; // barrel
  html += '<circle cx="42" cy="30" r="3" fill="none" stroke="#5a5a4a" stroke-width="1"/>'; // mug
  html += '<path d="M40 27 Q42 24 44 27" stroke="#5a5a4a" stroke-width="0.8" fill="none"/>'; // foam
  html += '</svg></div>';
  html += '<div class="build-name">酒馆</div>';
  html += '<div class="build-desc">打听消息</div>';
  html += '</div>';
  
  html += '</div>';
  
  // Active quest indicator(s)
  if (G.quests && G.quests.length > 0) {
    var activeNames = [];
    for (var qi = 0; qi < G.quests.length; qi++) {
      var aq = QUESTS.find(function(q) { return q.id === G.quests[qi]; });
      if (aq) activeNames.push(aq.icon + ' ' + aq.name);
    }
    html += '<div class="active-quest-banner" onclick="sceneGuild()">';
    html += '📜 进行中 (' + G.quests.length + ')：' + activeNames.join(' / ');
    html += '</div>';
  }
  
  html += '<div class="btns">';
  html += '<button class="btn" onclick="sceneWorldMap()">🗺️ 城镇出口</button>';
  html += '<button class="btn" onclick="sceneInventory()">🎒 背包</button>';
  html += '<button class="btn" onclick="scenePlayerInfo()">👤 角色</button>';
  html += '</div>';
  
  render(html);
}

function sceneInn() {
  var cost = 10;
  var html = '';
  html += '<div class="scene-title">🏨 旅店</div>';
  html += '<div class="inn-desc">温暖的壁炉，舒适的床铺，冒险者的港湾</div>';
  html += '<div class="inn-service">';
  html += '<p>恢复状态：<strong>' + cost + ' 金币</strong></p>';
  html += '<p>当前HP：' + G.hp + '/' + G.maxHp + '</p>';
  html += '<p>当前MP：' + G.mp + '/' + G.maxMp + '</p>';
  html += '</div>';
  
  html += '<div class="btns">';
  html += '<button class="btn btn-primary" onclick="restAtInn()" ' + (G.gold < cost ? 'disabled' : '') + '>💤 住宿恢复</button>';
  html += '<button class="btn" onclick="sceneTown()">↩️ 离开</button>';
  html += '</div>';
  render(html);
}

function restAtInn() {
  if (G.gold < 10) { toast('💰 金币不足'); return; }
  G.gold -= 10;
  G.hp = G.maxHp;
  G.mp = G.maxMp;
  updateStatus();
  toast('💤 休息完毕！HP/MP已恢复');
  sceneTown();
}

var _shopItems = null;

function sceneShop() {
  var items = [
    { id:'health_potion', name:'生命药水', type:'consumable', heal:30, price:15 },
    { id:'mana_potion', name:'魔法药水', type:'consumable', restore:20, price:20 },
    { id:'elixir', name:'高级药剂', type:'consumable', heal:80, restore:50, price:60 },
    { id:'antidote', name:'解毒剂', type:'consumable', cure:true, price:25 },
    { id:'torch', name:'火把', type:'consumable', light:true, price:5 },
    { id:'rope', name:'绳索', type:'consumable', tool:true, price:10 }
  ];
  _shopItems = items;
  
  var html = '';
  html += '<div class="scene-title">🏪 商店</div>';
  html += '<div class="money-display">💰 ' + G.gold + ' 金币</div>';
  
  html += '<div class="shop-items">';
  for (var i = 0; i < items.length; i++) {
    var it = items[i];
    var discount = (G.origin && G.origin.id === 'trader') ? 0.85 : 1;
    var finalPrice = Math.floor(it.price * discount);
    html += '<div class="shop-item" onclick="buyItem(' + i + ')">';
    html += '<div class="item-name">' + it.name + '</div>';
    html += '<div class="item-stats">' + (it.atk ? '⚔️' + it.atk : '') + (it.def ? '🛡️' + it.def : '') + (it.heal ? '❤️' + it.heal : '') + (it.luk ? '🎲+' + it.luk : '') + (it.int ? '🧙+' + it.int : '') + '</div>';
    html += '<div class="item-price">' + finalPrice + ' 💰</div>';
    html += '</div>';
  }
  html += '</div>';
  
  html += '<button class="btn" onclick="sceneTown()">↩️ 离开</button>';
  render(html);
}

function buyItem(idx) {
  var it = _shopItems[idx];
  var discount = (G.origin && G.origin.id === 'trader') ? 0.85 : 1;
  var price = Math.floor(it.price * discount);
  
  if (G.gold < price) { toast('💰 金币不足'); return; }
  
  if (it.type === 'consumable') {
    G.gold -= price;
    if (it.heal) G.hp = Math.min(G.maxHp, G.hp + it.heal);
    if (it.restore) G.mp = Math.min(G.maxMp, G.mp + it.restore);
    updateStatus();
    toast('使用 ' + it.name + ' 成功！');
    sceneShop();
    return;
  }
  
  // Put in inventory instead of auto-equipping
  G.gold -= price;
  G.inventory.push({ id:it.id, name:it.name, type:it.type, atk:it.atk||0, def:it.def||0, hp:it.hp||0, luk:it.luk||0, int:it.int||0, heal:it.heal||0, restore:it.restore||0, price:it.price });
  toast('购买 ' + it.name + '，已放入背包');
  sceneShop();
}

function sceneBlacksmith() {
  var items = [
    { id:'wooden_sword', name:'木剑', type:'weapon', atk:5, price:30 },
    { id:'iron_sword', name:'铁剑', type:'weapon', atk:12, price:80 },
    { id:'steel_blade', name:'钢刃', type:'weapon', atk:22, price:200 },
    { id:'leather_armor', name:'皮甲', type:'armor', def:5, hp:20, price:40 },
    { id:'chainmail', name:'锁子甲', type:'armor', def:12, hp:35, price:120 },
    { id:'plate_armor', name:'板甲', type:'armor', def:22, hp:60, price:300 },
    { id:'ring', name:'戒指', type:'accessory', luk:2, price:50 },
    { id:'amulet', name:'护身符', type:'accessory', int:3, price:70 }
  ];
  _shopItems = items;
  
  var html = '';
  html += '<div class="scene-title">⚒️ 铁匠铺</div>';
  html += '<div class="smith-desc">「好钢要千锤百炼。」铁匠擦拭着额头</div>';
  html += '<div class="money-display">💰 ' + G.gold + ' 金币</div>';
  
  html += '<div class="shop-items">';
  for (var i = 0; i < items.length; i++) {
    var it = items[i];
    var discount = (G.origin && G.origin.id === 'trader') ? 0.85 : 1;
    var finalPrice = Math.floor(it.price * discount);
    html += '<div class="shop-item" onclick="buyItem(' + i + ')">';
    html += '<div class="item-name">' + it.name;
    if (it.type === 'weapon') html += ' ⚔️';
    else if (it.type === 'armor') html += ' 🛡️';
    else if (it.type === 'accessory') html += ' 💍';
    html += '</div>';
    html += '<div class="item-stats">';
    if (it.atk) html += '攻击+' + it.atk + ' ';
    if (it.def) html += '防御+' + it.def + ' ';
    if (it.hp) html += 'HP+' + it.hp + ' ';
    if (it.luk) html += '幸运+' + it.luk + ' ';
    if (it.int) html += '智力+' + it.int;
    html += '</div>';
    html += '<div class="item-price">' + finalPrice + ' 💰</div>';
    html += '</div>';
  }
  html += '</div>';
  
  html += '<button class="btn" onclick="sceneTown()">↩️ 离开</button>';
  render(html);
}

function sceneTavern() {
  var html = '';
  html += '<div class="scene-title">🍺 酒馆</div>';
  html += '<div class="tavern-desc">酒保擦拭着杯子，冒险者们高谈阔论</div>';
  
  var rumors = [
    '听说坠星湖深处有龙留下的宝藏...',
    '幽暗森林里出现了新的怪物群落...',
    '白城的商队最近总是被抢劫...',
    '破碎堡垒的为首的是个哥布林...',
    '矿洞深处传来奇怪的响声...'
  ];
  
  html += '<div class="rumor">💬 ' + rumors[rand(0, rumors.length - 1)] + '</div>';
  
  // Quest hint
  if (!G.activeQuest) {
    html += '<div class="rumor" style="border-left-color:#d4a017">💡 「要去公会看看吗？总有任务等着人。」</div>';
  }
  
  html += '<div class="btns">';
  html += '<button class="btn" onclick="sceneTavern()">再听一个</button>';
  html += '<button class="btn" onclick="sceneTown()">↩️ 离开</button>';
  html += '</div>';
  render(html);
}

// ═══════════════════════════════════════════════════════════
// SCENE: GUILD (Quests)
// ═══════════════════════════════════════════════════════════

function sceneGuild() {
  var html = '';
  html += '<div class="scene-title">📜 冒险者公会</div>';
  html += '<div class="guild-desc">接待员：「冒险者，来看看有什么任务吧。」</div>';
  
  // Accepted quests (active)
  var acceptedQuests = G.quests.filter(function(qid) { return qid; });
  if (acceptedQuests.length > 0) {
    html += '<div class="quest-list-title">进行中的任务 (' + acceptedQuests.length + ')</div>';
    for (var a = 0; a < acceptedQuests.length; a++) {
      var aq = QUESTS.find(function(q) { return q.id === acceptedQuests[a]; });
      if (aq) {
        html += '<div class="quest-card active-quest">';
        html += '<div class="quest-header">' + aq.icon + ' ' + aq.name + ' <span class="quest-badge active">进行中</span></div>';
        html += '<div class="quest-desc">' + aq.desc + '</div>';
        html += '<div class="quest-reward">奖励：' + aq.reward + '</div>';
        html += '</div>';
      }
    }
  }
  
  // Available quests
  html += '<div class="quest-list-title">可接任务</div>';
  var hasAvailable = false;
  for (var i = 0; i < QUESTS.length; i++) {
    var q = QUESTS[i];
    var isAccepted = G.quests.indexOf(q.id) >= 0;
    if (isAccepted) continue; // already shown above
    
    hasAvailable = true;
    html += '<div class="quest-card" onclick="acceptQuest(\'' + q.id + '\')">';
    html += '<div class="quest-header">' + q.icon + ' ' + q.name + '</div>';
    html += '<div class="quest-desc">' + q.desc + '</div>';
    html += '<div class="quest-reward">奖励：' + q.reward + '</div>';
    html += '<div class="quest-accept-hint">点击接取</div>';
    html += '</div>';
  }
  if (!hasAvailable) {
    html += '<div class="inv-empty">所有任务已接取</div>';
  }
  
  html += '<button class="btn" onclick="sceneTown()">↩️ 离开</button>';
  render(html);
}

function acceptQuest(qid) {
  if (G.quests.indexOf(qid) >= 0) { toast('已接取过此任务'); return; }
  G.quests.push(qid);
  // Don't set activeQuest - allow multiple quests
  
  // Special: mine unlock quest
  if (qid === 'mine_unlock') {
    LOCATIONS.mine.unlocked = true;
    toast('✅ 接取「暗影矿洞调查」！已解锁暗影矿洞');
  } else {
    toast('✅ 接取任务成功！（可同时进行多个任务）');
  }
  sceneGuild();
}

function abandonQuest() {
  if (!G.activeQuest) return;
  G.activeQuest = null;
  toast('已放弃当前任务');
  sceneGuild();
}

function checkQuestProgress() {
  if (!G.activeQuest) return;
  var aq = QUESTS.find(function(q) { return q.id === G.activeQuest; });
  if (!aq) return;
  
  // Auto-complete conditions
  if (aq.id === 'forest_clear' && G.forestCleared) {
    completeQuest(aq.id);
  }
}

function completeQuest(qid) {
  var q = QUESTS.find(function(qx) { return qx.id === qid; });
  if (!q) return;
  
  if (q.rewardType === 'xp_gold') {
    G.xp += (q.xp || 0);
    G.gold += (q.gold || 0);
    while (G.xp >= calcNextXp(G.level)) { doLevelUp(); }
  }
  
  G.activeQuest = null;
  updateStatus();
  
  var html = '';
  html += '<div class="scene-title">🎉 任务完成！</div>';
  html += '<div class="victory-rewards">';
  html += '<div>' + q.icon + ' ' + q.name + '</div>';
  html += '<div>奖励：' + q.reward + '</div>';
  html += '</div>';
  html += '<button class="btn btn-primary" onclick="sceneTown()">继续</button>';
  render(html);
}

// ═══════════════════════════════════════════════════════════
// SCENE: INVENTORY
// ═══════════════════════════════════════════════════════════

function sceneInventory() {
  var html = '';
  html += '<div class="scene-title">🎒 背包</div>';
  
  // Equipped items
  html += '<div class="equip-section">';
  html += '<div class="equip-title">已穿戴</div>';
  html += '<div class="equip-grid">';
  
  var eqSlots = [
    { key:'weapon', name:'⚔️ 武器' },
    { key:'armor', name:'🛡️ 防具' },
    { key:'accessory', name:'💍 饰品' }
  ];
  
  for (var i = 0; i < eqSlots.length; i++) {
    var slot = eqSlots[i];
    var item = G.equipment[slot.key];
    html += '<div class="equip-slot">';
    html += '<div class="slot-name">' + slot.name + '</div>';
    if (item) {
      html += '<div class="equipped-item">' + item.name + (item.atk ? ' ⚔️' + item.atk : '') + (item.def ? ' 🛡️' + item.def : '') + '</div>';
      html += '<button class="btn-small" onclick="unequip(\'' + slot.key + '\')">卸下</button>';
    } else {
      html += '<div class="empty-slot">空</div>';
    }
    html += '</div>';
  }
  html += '</div>';
  html += '</div>';
  
  // Inventory items
  html += '<div class="inv-section">';
  html += '<div class="inv-title">背包物品</div>';
  if (G.inventory && G.inventory.length > 0) {
    html += '<div class="inv-list">';
    for (var j = 0; j < G.inventory.length; j++) {
      var inv = G.inventory[j];
      html += '<div class="inv-item">';
      html += '<div class="inv-item-info">';
      html += '<span class="inv-item-name">' + inv.name + '</span>';
      html += '<span class="inv-item-stats">' + (inv.atk ? '⚔️' + inv.atk : '') + (inv.def ? '🛡️' + inv.def : '') + (inv.luk ? '🎲+' + inv.luk : '') + (inv.int ? '🧙+' + inv.int : '') + '</span>';
      html += '</div>';
      if (inv.type !== 'consumable') {
        html += '<button class="btn-small" onclick="equipItem(' + j + ')">装备</button>';
      }
      html += '</div>';
    }
    html += '</div>';
  } else {
    html += '<div class="inv-empty">无物品</div>';
  }
  html += '</div>';
  
  // Keys
  html += '<div class="keys-display">🔑 宝箱钥匙：' + (G.keys || 0) + ' 把</div>';
  
  html += '<button class="btn" onclick="sceneWorldMap()">返回</button>';
  render(html);
}

function equipItem(idx) {
  var item = G.inventory[idx];
  if (!item) return;
  
  var slotKey = item.type === 'weapon' ? 'weapon' : item.type === 'armor' ? 'armor' : 'accessory';
  var oldItem = G.equipment[slotKey];
  
  // Remove from inventory
  G.inventory.splice(idx, 1);
  
  // If slot occupied, put old item back in inventory
  if (oldItem) {
    G.inventory.push(oldItem);
  }
  
  // Equip new item
  G.equipment[slotKey] = item;
  
  // Recalculate derived stats
  G.maxHp = calcMaxHp();
  G.maxMp = calcMaxMp();
  G.hp = Math.min(G.hp, G.maxHp);
  G.mp = Math.min(G.mp, G.maxMp);
  updateStatus();
  
  toast('装备 ' + item.name + (oldItem ? ' (卸下 ' + oldItem.name + ')' : ''));
  sceneInventory();
}

function unequip(slot) {
  var item = G.equipment[slot];
  if (!item) return;
  G.equipment[slot] = null;
  G.inventory.push(item);
  G.maxHp = calcMaxHp();
  G.maxMp = calcMaxMp();
  G.hp = Math.min(G.hp, G.maxHp);
  G.mp = Math.min(G.mp, G.maxMp);
  updateStatus();
  toast('卸下 ' + item.name);
  sceneInventory();
}

// ═══════════════════════════════════════════════════════════
// SCENE: PLAYER INFO with attr reallocation
// ═══════════════════════════════════════════════════════════

var _playerInfoDraft = null;

function scenePlayerInfo() {
  _playerInfoDraft = null;
  var html = '';
  html += '<div class="scene-title">👤 角色信息</div>';
  
  // Basic info
  html += '<div class="player-basic">';
  html += '<div class="basic-name">' + G.name + '</div>';
  html += '<div class="basic-origin">' + G.origin.emoji + ' ' + G.origin.name + '</div>';
  html += '<div class="basic-level">Lv.' + G.level + ' | ⭐ ' + G.xp + '/' + calcNextXp(G.level) + '</div>';
  html += '</div>';
  
  // Skills
  html += '<div class="skills-display">';
  html += '<div class="skills-title">技能</div>';
  if (G.skills && G.skills.length > 0) {
    html += '<div class="skills-list">';
    for (var i = 0; i < G.skills.length; i++) {
      var sk = SKILLS.find(function(s) { return s.id === G.skills[i]; });
      if (sk) html += '<span class="skill-tag">' + sk.emoji + ' ' + sk.name + '</span>';
    }
    html += '</div>';
  } else {
    html += '<div class="skills-empty">无技能</div>';
  }
  html += '</div>';
  
  // Origin skill
  if (G.origin && G.origin.skill) {
    html += '<div class="origin-skill-display">';
    html += '<div class="origin-title">起源技能</div>';
    html += '<div class="origin-skill">' + G.origin.skill.emoji + ' ' + G.origin.skill.name + ' [' + G.origin.skill.type + ']</div>';
    html += '<div class="origin-desc">' + G.origin.skill.desc + '</div>';
    html += '</div>';
  }
  
  // Attribute points
  html += '<div class="attr-allocation">';
  html += '<div class="attr-header">';
  html += '<strong>自由属性点：' + G.attrPts + '</strong>';
  if (G.attrPts > 0) {
    html += ' <button class="btn-small" onclick="sceneAttrAllocation()">分配</button>';
  }
  html += '</div>';
  
  var attrs = [
    { key:'str', name:'⚔️ 力量', base:G.str, val:G.str },
    { key:'agi', name:'🌿 敏捷', base:G.agi, val:G.agi },
    { key:'int', name:'🧙 智力', base:G.int, val:G.int },
    { key:'cha', name:'💬 魅力', base:G.cha, val:G.cha },
    { key:'luk', name:'🎲 幸运', base:G.luk, val:G.luk }
  ];
  
  html += '<div class="attr-grid">';
  for (var j = 0; j < attrs.length; j++) {
    var a = attrs[j];
    html += '<div class="attr-block">';
    html += '<span class="attr-n">' + a.name + '</span>';
    html += '<span class="attr-v">' + a.val + '</span>';
    html += '</div>';
  }
  html += '</div>';
  html += '</div>';
  
  // Derived stats
  html += '<div class="derived-stats">';
  html += '<div class="der-title">战斗属性</div>';
  html += '<div class="der-grid">';
  html += '<div class="der-item">⚔️ 攻击 ' + calcAtk() + '</div>';
  html += '<div class="der-item">🛡️ 防御 ' + calcDef() + '</div>';
  html += '<div class="der-item">💨 闪避 ' + calcDodge().toFixed(1) + '%</div>';
  html += '<div class="der-item">💥 会心 ' + calcCrit().toFixed(1) + '%</div>';
  html += '</div>';
  html += '</div>';
  
  // Re-select origin
  html += '<div class="reselect-section">';
  html += '<button class="btn" onclick="sceneSelectOrigin()">🔄 重新选择起源</button>';
  html += '</div>';
  
  html += '<button class="btn" onclick="sceneWorldMap()">返回</button>';
  render(html);
}

function sceneAttrAllocation() {
  if (G.attrPts <= 0) { toast('没有可分配的属性点'); return; }
  
  if (!_playerInfoDraft) {
    _playerInfoDraft = { str:G.str, agi:G.agi, int:G.int, cha:G.cha, luk:G.luk, pts:G.attrPts };
  }
  
  var attrs = [
    { key:'str', name:'⚔️ 力量', hint:'物攻+2, HP+5', base:G.str },
    { key:'agi', name:'🌿 敏捷', hint:'闪避+', base:G.agi },
    { key:'int', name:'🧙 智力', hint:'魔攻+2, MP+3', base:G.int },
    { key:'cha', name:'💬 魅力', hint:'折扣+', base:G.cha },
    { key:'luk', name:'🎲 幸运', hint:'会心+', base:G.luk }
  ];
  
  var html = '';
  html += '<div class="scene-title">分配属性点</div>';
  html += '<div class="pts-info">剩余：<strong>' + _playerInfoDraft.pts + '</strong> 点</div>';
  
  for (var i = 0; i < attrs.length; i++) {
    var a = attrs[i];
    var cur = _playerInfoDraft[a.key];
    var delta = cur - a.base;
    
    html += '<div class="attr-row-v5">';
    html += '<div class="attr-info">';
    html += '<span class="attr-name-v5">' + a.name + '</span>';
    html += '<span class="attr-hint-v5">' + a.hint + '</span>';
    html += '</div>';
    html += '<div class="attr-controls">';
    html += '<button class="attr-btn" onclick="adjAttr(\'' + a.key + '\', -1)" ' + (delta <= 0 ? 'disabled' : '') + '>−</button>';
    html += '<span class="attr-value' + (delta > 0 ? ' attr-boosted' : '') + '">' + cur + (delta > 0 ? ' (+' + delta + ')' : '') + '</span>';
    html += '<button class="attr-btn" onclick="adjAttr(\'' + a.key + '\', 1)" ' + (_playerInfoDraft.pts <= 0 ? 'disabled' : '') + '>+</button>';
    html += '</div>';
    html += '</div>';
  }
  
  html += '<div class="btns">';
  html += '<button class="btn btn-primary" onclick="confirmAttrAllocation()">✅ 确认分配</button>';
  html += '<button class="btn" onclick="scenePlayerInfo()">取消</button>';
  html += '</div>';
  render(html);
}

function adjAttr(key, delta) {
  if (delta > 0 && _playerInfoDraft.pts <= 0) return;
  var newVal = _playerInfoDraft[key] + delta;
  var baseVal = G[key];
  if (delta < 0 && newVal < baseVal) return;
  _playerInfoDraft[key] = newVal;
  _playerInfoDraft.pts -= delta;
  sceneAttrAllocation();
}

function confirmAttrAllocation() {
  G.str = _playerInfoDraft.str;
  G.agi = _playerInfoDraft.agi;
  G.int = _playerInfoDraft.int;
  G.cha = _playerInfoDraft.cha;
  G.luk = _playerInfoDraft.luk;
  G.attrPts = _playerInfoDraft.pts;
  _playerInfoDraft = null;
  G.maxHp = calcMaxHp();
  G.maxMp = calcMaxMp();
  toast('属性点分配成功！');
  scenePlayerInfo();
}

