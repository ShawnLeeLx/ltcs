#!/usr/bin/env node
// C10 Economic Balance Simulation for 龙途传说 V25
// Simulates gold income/expense across Ch1-Ch12 gameplay

// === DATA FROM GAME ===

// Initial gold
const INITIAL_GOLD = 50;

// Story chapter rewards (cumulative from story nodes within each chapter)
const STORY_GOLD = {
  ch1: 20+35+50,      // 3 nodes: 20+35+50 = 105
  ch2: 60+50+80+100,  // 4 nodes: 60+50+80+100 = 290
  ch3: 100+80+120+150,// 4 nodes: 100+80+120+150 = 450
  ch4: 200+100+120+200, // = 620
  ch5: 250+150+200+250, // = 850
  ch6: 300+200+250+350, // = 1100
  ch7: 300+250+350+400, // = 1300
  ch8: 350+350+400+450, // = 1550
  ch9: 400+400+500+600, // = 1900
  ch10: 500+500+600+700, // = 2300
  ch11: 600+700+800+1000, // = 3100
  ch12: 800+900+1200+1500 // = 4400
};

// Achievement gold (one-time)
const ACHIEVEMENT_GOLD = {
  ch1: 50,   // ch1_done
  ch2: 80,
  ch3: 120,
  ch4: 200,
  ch5: 300,
  ch6: 400,
  ch7: 500,
  ch8: 800,
  ch9: 1000,
  ch10: 1500,
  ch11: 2500,
  ch12: 5000
};

// Quest gold (main questline per chapter)
const QUEST_GOLD = {
  ch1: 20,
  ch2: 60,
  ch3: 80,
  ch4: 40,
  ch5: 80,
  ch6: 100,
  ch7: 90,
  ch8: 110,
  ch9: 100,
  ch10: 120,
  ch11: 180,
  ch12: 130
};

// Inn costs per chapter (avg visits per chapter: ~3-5)
const INN_PRICES = {
  whitecity: 10, ironridge: 15, tidport: 12, sunspire: 40, dragonreach: 60, icereef: 70
};

// Craft recipe costs
const CRAFT_COSTS = [
  { name:'铁剑', gold:80, chapter:1 },
  { name:'皮甲', gold:80, chapter:1 },
  { name:'草药膏', gold:30, chapter:1 },
  { name:'霜刃', gold:200, chapter:2 },
  { name:'暗影匕首', gold:220, chapter:3 },
  { name:'海潮护符', gold:250, chapter:3 },
  { name:'战争之锤', gold:300, chapter:4 },
  { name:'毒蛇之刃', gold:280, chapter:4 },
  { name:'蛛丝法袍', gold:280, chapter:5 },
  { name:'秘银武器', gold:600, chapter:5 },
  { name:'龙鳞甲', gold:700, chapter:7 },
  { name:'风暴戒指', gold:550, chapter:6 },
  { name:'符文武器', gold:1500, chapter:8 },
  { name:'龙骨套装', gold:2000, chapter:9 },
  { name:'龙心之刃', gold:5000, chapter:11 }
];

// Enhance costs per rarity (base, scales x1.5^level)
const ENHANCE_BASE = {
  common: 50, uncommon: 150, rare: 400, epic: 1000, legendary: 3000
};

// Material sell prices (avg per rarity)
const MAT_SELL_AVG = {
  common: 7, uncommon: 24, rare: 60, epic: 150, legendary: 400
};

// Trade mission rewards
const TM_REWARDS = {
  t1: 85, t2: 210, t3: 390, t4: 575
};

// DD floor gold reward
function ddGold(floor, isBoss, isElite) {
  return Math.floor(floor * 5) + (isBoss ? 50 : isElite ? 25 : 10);
}

// Battle drops (no gold, but materials + equipment)
// Avg material drops per battle: ~0.5 materials (common~60%, uncommon~30%, rare~10%)
// Equipment drop rate: 15% normal, 40% elite, 60% boss
// Sell price of equipment: 40% of buy price

// === SIMULATION ===
function simulate() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  龙途传说 V25 — 经济平衡模拟报告');
  console.log('═══════════════════════════════════════════════════\n');

  // Per-chapter simulation
  const chapters = ['ch1','ch2','ch3','ch4','ch5','ch6','ch7','ch8','ch9','ch10','ch11','ch12'];
  let totalGold = INITIAL_GOLD;
  let totalIncome = 0;
  let totalExpense = 0;
  let chapterResults = [];

  for (let ci = 0; ci < chapters.length; ci++) {
    let ch = chapters[ci];
    let income = 0;
    let expense = 0;
    let chNum = ci + 1;

    // === INCOME ===
    // Story gold
    income += STORY_GOLD[ch] || 0;
    // Achievement gold
    income += ACHIEVEMENT_GOLD[ch] || 0;
    // Quest gold
    income += QUEST_GOLD[ch] || 0;
    
    // Battle material drops: assume ~8 battles per chapter (exploration + story fights)
    let battles = [8, 10, 12, 10, 12, 10, 12, 14, 14, 16, 16, 20][ci];
    // Material sells: avg 0.5 mats/battle, weighted by rarity
    let matSellPerBattle = 0.5 * (0.6 * MAT_SELL_AVG.common + 0.3 * MAT_SELL_AVG.uncommon + 0.1 * MAT_SELL_AVG.rare);
    income += Math.floor(battles * matSellPerBattle);

    // Equipment drops & sell: avg 15% normal + a few boss/elite
    let equipDrops = Math.floor(battles * 0.15) + 2; // +2 for boss/elite
    // Average equipment sell price scales with chapter
    let avgEquipValue = [60, 80, 100, 150, 200, 300, 400, 500, 700, 900, 1200, 1800][ci];
    // Players keep ~1/3 of drops, sell 2/3
    let equipSell = Math.floor(equipDrops * 0.67 * avgEquipValue * 0.4);
    income += equipSell;

    // Travel encounters gold: ~2 per chapter, avg 15g
    income += 30;

    // Trade missions: ~1-2 per chapter starting ch2
    if (chNum >= 2) {
      let tmTier = chNum <= 3 ? 't1' : chNum <= 6 ? 't2' : chNum <= 9 ? 't3' : 't4';
      income += TM_REWARDS[tmTier];
      if (chNum >= 4) income += TM_REWARDS[tmTier]; // 2 missions later
    }

    // DD runs: ~1 per chapter starting ch8 (20 floors each)
    if (chNum >= 8) {
      let ddFloors = 20;
      for (let f = 1; f <= ddFloors; f++) {
        income += ddGold(f, f % 10 === 0, f % 5 === 0);
      }
    }

    // === EXPENSES ===
    // Inn visits: 3-5 per chapter
    let innVisits = [4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3][ci];
    let innLoc = ['whitecity','whitecity','ironridge','ironridge','tidport','sunspire','dragonreach','dragonreach','dragonreach','icereef','icereef','icereef'][ci];
    expense += innVisits * INN_PRICES[innLoc];

    // Craft purchases (essential ones per chapter)
    let chapterCrafts = CRAFT_COSTS.filter(c => c.chapter === chNum);
    for (let c of chapterCrafts) {
      expense += c.gold;
    }

    // Enhance: ~2-3 items per chapter, avg +2 levels each
    let enhanceCount = [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4][ci];
    let enhanceRarity = ['common','common','uncommon','uncommon','uncommon','rare','rare','rare','epic','epic','epic','legendary'][ci];
    let enhanceLevels = 2;
    let enhanceCost = 0;
    for (let l = 0; l < enhanceLevels; l++) {
      enhanceCost += Math.floor(ENHANCE_BASE[enhanceRarity] * Math.pow(1.5, l));
    }
    expense += enhanceCount * enhanceCost;

    // Material shop purchases: ~50-100g per chapter
    expense += [50, 60, 70, 80, 80, 100, 100, 120, 120, 150, 150, 200][ci];

    // === NET ===
    totalGold += income - expense;
    totalIncome += income;
    totalExpense += expense;

    chapterResults.push({
      ch: chNum,
      income,
      expense,
      net: income - expense,
      total: totalGold
    });
  }

  // Print per-chapter breakdown
  console.log('章节 | 收入 | 支出 | 净额 | 累计金币');
  console.log('─'.repeat(55));
  for (let r of chapterResults) {
    let netStr = r.net >= 0 ? `+${r.net}` : `${r.net}`;
    let warn = r.total < 50 ? ' ⚠️缺金!' : r.total < 100 ? ' ⚡紧张' : '';
    console.log(`Ch${String(r.ch).padStart(2)} | ${String(r.income).padStart(5)} | ${String(r.expense).padStart(5)} | ${netStr.padStart(5)} | ${r.total}${warn}`);
  }
  console.log('─'.repeat(55));
  console.log(`总计 | ${totalIncome} | ${totalExpense} | ${totalIncome - totalExpense} | ${totalGold}\n`);

  // === ANALYSIS ===
  console.log('═══ 经济分析 ═══\n');

  // 1. Income/Expense ratio
  let ratio = (totalIncome / totalExpense).toFixed(2);
  console.log(`1. 收支比: ${ratio} (${ratio > 1.3 ? '偏松✅' : ratio > 1.1 ? '适中⚖️' : ratio > 1.0 ? '偏紧⚡' : '亏损❌'})`);

  // 2. Identify tight chapters
  let tightChapters = chapterResults.filter(r => r.total < 100);
  if (tightChapters.length > 0) {
    console.log(`2. 紧张章节: ${tightChapters.map(r => `Ch${r.ch}(${r.total}g)`).join(', ')}`);
  } else {
    console.log('2. 紧张章节: 无 (所有章节累计金币>100)');
  }

  // 3. Big expense spikes
  let bigExpenseChapters = chapterResults.filter(r => r.expense > r.income * 1.2);
  if (bigExpenseChapters.length > 0) {
    console.log(`3. 支出飙升章节: ${bigExpenseChapters.map(r => `Ch${r.ch}(支出${r.expense}/收入${r.income})`).join(', ')}`);
  }

  // 4. Gold per hour estimation
  // Assume ~30min per chapter
  let goldPerHour = Math.floor(totalGold / 6); // 12 chapters = 6 hours
  console.log(`4. 通关后累计金币: ${totalGold} (约${goldPerHour}/小时)`);
  console.log(`   通关后总收入: ${totalIncome}, 总支出: ${totalExpense}`);

  // 5. Key balance concerns
  console.log('\n═══ 关键问题 ═══\n');

  // Check if any chapter has negative total
  let negChapters = chapterResults.filter(r => r.total < 0);
  if (negChapters.length > 0) {
    console.log('❌ 严重: 以下章节金币可能为负:');
    for (let r of negChapters) {
      console.log(`   Ch${r.ch}: 累计${r.total}g (收入${r.income}, 支出${r.expense})`);
    }
  }

  // Check early game affordability
  let ch1 = chapterResults[0];
  console.log(`Ch1 初始50g → 旅行后${ch1.total}g`);
  console.log(`  铁剑(80g): ${ch1.total >= 80 ? '✅买得起' : '❌买不起'}`);
  console.log(`  皮甲(80g): ${ch1.total >= 160 ? '✅买得起(两者)' : ch1.total >= 80 ? '⚡只够一件' : '❌买不起'}`);

  // Mid-game check
  let ch6 = chapterResults[5];
  console.log(`Ch6 累计${ch6.total}g`);
  console.log(`  秘银武器(600g): ${ch6.total >= 600 ? '✅买得起' : '❌太贵'}`);
  console.log(`  风暴戒指(550g): ${ch6.total >= 550 ? '✅买得起' : '❌太贵'}`);

  // Late-game check
  let ch11 = chapterResults[10];
  console.log(`Ch11 累计${ch11.total}g`);
  console.log(`  龙心之刃(5000g): ${ch11.total >= 5000 ? '✅买得起' : '❌太贵'}`);
  console.log(`  传说强化(3000g×1.5^n): ${ch11.total >= 4500 ? '✅买得起' : '❌太贵'}`);

  // 6. DD economy
  console.log('\n═══ 深渊经济 ═══\n');
  let ddTotal = 0;
  for (let f = 1; f <= 100; f++) {
    ddTotal += ddGold(f, f % 10 === 0, f % 5 === 0);
  }
  console.log(`100层深渊总金币: ${ddTotal}g`);
  console.log(`每10层(含Boss): ${ddGold(10, true, false) + Array.from({length:9}, (_, i) => ddGold(i+1, false, (i+1)%5===0)).reduce((a,b)=>a+b, 0)}g`);

  // 7. Inflation check
  console.log('\n═══ 通胀检查 ═══\n');
  let ch1Income = chapterResults[0].income;
  let ch12Income = chapterResults[11].income;
  console.log(`Ch1收入: ${ch1Income}g → Ch12收入: ${ch12Income}g (${(ch12Income/ch1Income).toFixed(1)}x)`);
  console.log(`收入增长合理范围: 20-40x (当前: ${(ch12Income/ch1Income).toFixed(1)}x)`);
  
  let ch1Expense = chapterResults[0].expense;
  let ch12Expense = chapterResults[11].expense;
  console.log(`Ch1支出: ${ch1Expense}g → Ch12支出: ${ch12Expense}g (${(ch12Expense/ch1Expense).toFixed(1)}x)`);

  // === RECOMMENDATIONS ===
  console.log('\n═══ 调整建议 ═══\n');
  
  if (ratio > 1.5) {
    console.log('⚠️ 经济偏松，玩家金币溢出。建议:');
    console.log('  - 增加后期强化/锻造费用');
    console.log('  - 添加金币消耗sink（如装备修理、技能升级）');
  } else if (ratio < 1.1) {
    console.log('⚠️ 经济偏紧，玩家可能卡金。建议:');
    console.log('  - 增加故事/任务金币奖励');
    console.log('  - 降低锻造/强化基础费用');
    console.log('  - 增加材料卖出价格倍率');
  } else {
    console.log('✅ 经济基本平衡，收支比合理');
  }

  // Specific issue: combat drops no gold
  console.log('\n📊 当前经济模型特征:');
  console.log('  - 战斗不掉金币，靠卖装备/材料 (✅ 鼓励探索和商贸)');
  console.log('  - 行商委托是中期主要收入 (✅ 驱动地图旅行)');
  console.log('  - 深渊是后期金币来源 (✅ 延长游戏寿命)');
  console.log('  - 锻造是最大支出 (需验证是否可跳过)');
}

simulate();
