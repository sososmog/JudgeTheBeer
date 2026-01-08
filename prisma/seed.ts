import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 清空现有数据
  await prisma.flavor.deleteMany()

  // 添加风味数据
  await prisma.flavor.createMany({
    data: [
      // ========== 基础味觉 (Basic Taste) ==========
      { name: '酸（Sour）', nameEn: 'Sour', category: '基础味觉（Basic Taste）', subCategory: '酸味（Acidic）', type: 'good', description: '醋酸、柠檬酸、乳酸等产生的酸味' },
      { name: '醋酸（Acetic）', nameEn: 'Acetic', category: '基础味觉（Basic Taste）', subCategory: '酸味（Acidic）', type: 'good', description: '醋、溶剂感。来源：酵母发酵产生；醋酸菌' },
      { name: '柠檬酸（Citric）', nameEn: 'Citric', category: '基础味觉（Basic Taste）', subCategory: '酸味（Acidic）', type: 'good', description: '柠檬汁般的酸感。来源：酵母发酵；糖化过程酸化；细菌污染' },
      { name: '乳酸（Lactic）', nameEn: 'Lactic', category: '基础味觉（Basic Taste）', subCategory: '酸味（Acidic）', type: 'good', description: '来源：糖化过程中细菌产生；细菌污染' },
      { name: '甜（Sweet）', nameEn: 'Sweet', category: '基础味觉（Basic Taste）', subCategory: null, type: 'good', description: '糖类带来的甜味。来源：麦芽、酵母、辅料' },
      { name: '咸（Salty）', nameEn: 'Salty', category: '基础味觉（Basic Taste）', subCategory: null, type: 'good', description: '氯化钠带来的咸味。来源：酿造用盐；麦芽' },
      { name: '苦（Bitter）', nameEn: 'Bitter', category: '基础味觉（Basic Taste）', subCategory: null, type: 'good', description: '在喉咙后部感受到的苦味。来源：煮沸过程中酒花的异α酸' },
      { name: '鲜味（Umami）', nameEn: 'Umami', category: '基础味觉（Basic Taste）', subCategory: null, type: 'good', description: '酱油、酵母自溶物、肉味、马麦酱的鲜味' },

      // ========== 口感 (Mouthfeel) ==========
      { name: '收敛（Astringent）', nameEn: 'Astringent', category: '口感（Mouthfeel）', subCategory: null, type: 'good', description: '干涩、收紧的口感。来源：高多酚含量' },
      { name: '白垩感（Chalky）', nameEn: 'Chalky', category: '口感（Mouthfeel）', subCategory: null, type: 'good', description: '干燥粉状的口感，伴有�ite物盐（如白垩）的气息。来源：高含量不溶性钙' },
      { name: '挂杯（Mouthcoating）', nameEn: 'Mouthcoating', category: '口感（Mouthfeel）', subCategory: null, type: 'good', description: '口腔中有一层薄膜覆盖的感觉。来源：β-葡聚糖、植物甾醇、多酚、脂质' },
      { name: '饱满（Full Body）', nameEn: 'Full Body', category: '口感（Mouthfeel）', subCategory: '酒体（Body）', type: 'good', description: '口腔和舌头感受到的厚重感。来源：β-葡聚糖、抗发酵多糖/糊精、多酚' },
      { name: '单薄（Thin Body）', nameEn: 'Thin Body', category: '口感（Mouthfeel）', subCategory: '酒体（Body）', type: 'good', description: '酒体单薄，缺乏厚度' },
      { name: '起泡（Effervescent）', nameEn: 'Effervescent', category: '口感（Mouthfeel）', subCategory: '碳酸化（Carbonation）', type: 'good', description: '二氧化碳带来的气泡感。来源：酵母发酵产生' },
      { name: '平淡（Flat）', nameEn: 'Flat', category: '口感（Mouthfeel）', subCategory: '碳酸化（Carbonation）', type: 'bad', description: '缺乏碳酸化，口感平淡' },
      { name: '酒花灼烧（Hop Burn）', nameEn: 'Hop Burn/Scratchy', category: '口感（Mouthfeel）', subCategory: '刺激（Irritating）', type: 'bad', description: '磨砂般的、持久的苦味，常在舌后/喉咙感受到。来源：结合脯氨酸的多酚和多胺、过量酒花油' },
      { name: '酒精温热感（Warming）', nameEn: 'Warming/Alcoholic', category: '口感（Mouthfeel）', subCategory: null, type: 'good', description: '乙醇带来的温热感' },

      // ========== 果干香气 (Dried Fruit) ==========
      { name: '枣（Date）', nameEn: 'Date', category: '香气（Aroma）', subCategory: '果干（Dried Fruit）', type: 'good', description: '来源：陈化啤酒；深色麦芽使用量较高' },
      { name: '无花果（Fig）', nameEn: 'Fig', category: '香气（Aroma）', subCategory: '果干（Dried Fruit）', type: 'good', description: '来源：陈化啤酒；深色麦芽使用量较高' },
      { name: '西梅（Prune）', nameEn: 'Prune', category: '香气（Aroma）', subCategory: '果干（Dried Fruit）', type: 'good', description: '来源：陈化啤酒；深色麦芽使用量较高' },
      { name: '葡萄干（Raisin）', nameEn: 'Raisin', category: '香气（Aroma）', subCategory: '果干（Dried Fruit）', type: 'good', description: '来源：陈化啤酒；深色麦芽使用量较高' },
      { name: '果酱（Jam）', nameEn: 'Jam', category: '香气（Aroma）', subCategory: '果干（Dried Fruit）', type: 'good', description: '果酱、糖煮水果、橘子酱的香气' },

      // ========== 浆果香气 (Berry) ==========
      { name: '黑醋栗/猫尿味（Black Currant/Catty）', nameEn: 'Black Currant/Catty', category: '香气（Aroma）', subCategory: '浆果（Berry）', type: 'good', description: '果香，伴有猫尿味。来源：原料（酒花、酵母）；陈化/氧化' },
      { name: '黑莓（Blackberry）', nameEn: 'Blackberry', category: '香气（Aroma）', subCategory: '浆果（Berry）', type: 'good', description: '来源：酒花（α-紫罗兰酮）' },
      { name: '蓝莓（Blueberry）', nameEn: 'Blueberry', category: '香气（Aroma）', subCategory: '浆果（Berry）', type: 'good', description: '蓝莓香气' },
      { name: '康科德葡萄（Concord Grape）', nameEn: 'Concord Grape', category: '香气（Aroma）', subCategory: '浆果（Berry）', type: 'good', description: '邻氨基苯甲酸甲酯带来的葡萄香' },
      { name: '蔓越莓（Cranberry）', nameEn: 'Cranberry', category: '香气（Aroma）', subCategory: '浆果（Berry）', type: 'good', description: '蔓越莓香气' },
      { name: '青葡萄（Green Grape）', nameEn: 'Green Grape', category: '香气（Aroma）', subCategory: '浆果（Berry）', type: 'good', description: '青葡萄香气' },
      { name: '葡萄酒味（Grape/Wine）', nameEn: 'Grape/Wine', category: '香气（Aroma）', subCategory: '浆果（Berry）', type: 'good', description: '来源：玉米糖浆辅料（尤其是葡萄糖）；酵母压力；假单胞菌；糖苷前体酶解' },
      { name: '麝香葡萄（Muscat Grape）', nameEn: 'Muscat Grape', category: '香气（Aroma）', subCategory: '浆果（Berry）', type: 'good', description: '麝香葡萄香气' },
      { name: '覆盆子（Raspberry）', nameEn: 'Raspberry', category: '香气（Aroma）', subCategory: '浆果（Berry）', type: 'good', description: '来源：陈化啤酒；高酒花用量啤酒（大马士革酮）' },
      { name: '草莓（Strawberry）', nameEn: 'Strawberry', category: '香气（Aroma）', subCategory: '浆果（Berry）', type: 'good', description: '来源：陈化啤酒；高酒花用量啤酒（大马士革酮）' },
      { name: '白葡萄（White Grape）', nameEn: 'White Grape', category: '香气（Aroma）', subCategory: '浆果（Berry）', type: 'good', description: '白葡萄香气' },

      // ========== 热带水果香气 (Tropical) ==========
      { name: '香蕉/乙酸异戊酯（Banana）', nameEn: 'Banana/Isoamyl Acetate', category: '香气（Aroma）', subCategory: '热带水果（Tropical）', type: 'good', description: '香蕉、溶剂、果香。来源：酵母产生（菌株、谷物、发酵条件影响）' },
      { name: '椰子（Coconut）', nameEn: 'Coconut', category: '香气（Aroma）', subCategory: '热带水果（Tropical）', type: 'good', description: '脂肪、蜡质、花香、杏子味。来源：γ-癸内酯、椰子内酯' },
      { name: '番石榴（Guava）', nameEn: 'Guava', category: '香气（Aroma）', subCategory: '热带水果（Tropical）', type: 'good', description: '泥土、霉味、过熟、热带。来源：酵母产生；酒花（3-巯基己基乙酸酯）' },
      { name: '猕猴桃（Kiwi）', nameEn: 'Kiwi', category: '香气（Aroma）', subCategory: '热带水果（Tropical）', type: 'good', description: '来源：酵母产生；酒花' },
      { name: '荔枝（Lychee）', nameEn: 'Lychee', category: '香气（Aroma）', subCategory: '热带水果（Tropical）', type: 'good', description: '玫瑰、香茅、青柠。来源：酵母产生；酒花（3-巯基己基乙酸酯、L-玫瑰醚、香茅醇）' },
      { name: '芒果（Mango）', nameEn: 'Mango', category: '香气（Aroma）', subCategory: '热带水果（Tropical）', type: 'good', description: '强烈花香、青涩金属感、芒果皮味。来源：酵母产生；酒花（3-巯基-1-己醇）' },
      { name: '百香果（Passion Fruit）', nameEn: 'Passion Fruit', category: '香气（Aroma）', subCategory: '热带水果（Tropical）', type: 'good', description: '来源：酵母产生；酒花（3-巯基己基乙酸酯）' },
      { name: '木瓜（Papaya）', nameEn: 'Papaya', category: '香气（Aroma）', subCategory: '热带水果（Tropical）', type: 'good', description: '来源：酵母产生；酒花（3-巯基己基乙酸酯）' },
      { name: '菠萝（Pineapple）', nameEn: 'Pineapple', category: '香气（Aroma）', subCategory: '热带水果（Tropical）', type: 'good', description: '甜香、泡泡糖、果香、人工水果味。来源：酵母产生（丁酸乙酯）' },

      // ========== 核果香气 (Stone Fruit) ==========
      { name: '杏/桃（Apricot/Peach）', nameEn: 'Apricot/Peach', category: '香气（Aroma）', subCategory: '核果（Stone Fruit）', type: 'good', description: '来源：C8-12内酯；δ-大马士革酮' },
      { name: '樱桃（Cherry）', nameEn: 'Cherry', category: '香气（Aroma）', subCategory: '核果（Stone Fruit）', type: 'good', description: '杏仁糖、甜香、杏仁味。来源：香叶基/萜品基丁酸酯；萜品基乙酸酯；苯甲醛' },
      { name: '油桃（Nectarine）', nameEn: 'Nectarine', category: '香气（Aroma）', subCategory: '核果（Stone Fruit）', type: 'good', description: '油桃香气' },
      { name: '李子（Plum）', nameEn: 'Plum', category: '香气（Aroma）', subCategory: '核果（Stone Fruit）', type: 'good', description: '李子香气' },

      // ========== 苹果/梨香气 (Apple/Pear) ==========
      { name: '苹果酒（Cider）', nameEn: 'Cider', category: '香气（Aroma）', subCategory: '苹果（Apple）', type: 'good', description: '来源：酵母产生乙醛；包装时氧气含量过高' },
      { name: '青苹果/乙醛（Green Apple）', nameEn: 'Green Apple/Acetaldehyde', category: '香气（Aroma）', subCategory: '苹果（Apple）', type: 'bad', description: '蔬菜、油漆、青叶、草味、溶剂、果香。来源：酵母产生；包装时氧气含量过高' },
      { name: '红苹果/己酸乙酯（Red Apple）', nameEn: 'Red Apple/Ethyl Hexanoate', category: '香气（Aroma）', subCategory: '苹果（Apple）', type: 'good', description: '蜡质、脂肪、甘草、茴香、辛辣、青苹果、溶剂、果香。来源：酵母产生' },
      { name: '梨（Pear）', nameEn: 'Pear', category: '香气（Aroma）', subCategory: '苹果（Apple）', type: 'good', description: '梨香' },

      // ========== 瓜类香气 (Melon) ==========
      { name: '哈密瓜（Cantaloupe）', nameEn: 'Cantaloupe', category: '香气（Aroma）', subCategory: '瓜类（Melon）', type: 'good', description: '哈密瓜香气' },
      { name: '黄瓜（Cucumber）', nameEn: 'Cucumber', category: '香气（Aroma）', subCategory: '瓜类（Melon）', type: 'good', description: '蔬菜、纸、香蕉味。来源：反式-2-壬烯醛；顺式-3-己醇' },
      { name: '蜜瓜（Honeydew）', nameEn: 'Honeydew', category: '香气（Aroma）', subCategory: '瓜类（Melon）', type: 'good', description: '蜜瓜香气' },
      { name: '西瓜（Watermelon）', nameEn: 'Watermelon', category: '香气（Aroma）', subCategory: '瓜类（Melon）', type: 'good', description: '青叶、新鲜割草味。来源：顺式-3-己醛' },

      // ========== 柑橘香气 (Citrus) ==========
      { name: '血橙（Blood Orange）', nameEn: 'Blood Orange', category: '香气（Aroma）', subCategory: '柑橘（Citrus）', type: 'good', description: '血橙香气' },
      { name: '葡萄柚（Grapefruit）', nameEn: 'Grapefruit', category: '香气（Aroma）', subCategory: '柑橘（Citrus）', type: 'good', description: '葡萄柚香气' },
      { name: '柠檬（Lemon）', nameEn: 'Lemon', category: '香气（Aroma）', subCategory: '柑橘（Citrus）', type: 'good', description: '香茅味。来源：芳樟醇、香叶醇' },
      { name: '青柠（Lime）', nameEn: 'Lime', category: '香气（Aroma）', subCategory: '柑橘（Citrus）', type: 'good', description: '来源：香茅醇、香叶醇' },
      { name: '橙子（Orange）', nameEn: 'Orange', category: '香气（Aroma）', subCategory: '柑橘（Citrus）', type: 'good', description: '来源：柠檬烯。酒花在煮沸末期或发酵初期添加会为啤酒带来柑橘、果香或花香特征' },
      { name: '橘子（Tangerine）', nameEn: 'Tangerine', category: '香气（Aroma）', subCategory: '柑橘（Citrus）', type: 'good', description: '来源：E-4-癸烯醛' },

      // ========== 花香 (Floral) ==========
      { name: '香叶醇/玫瑰（Geraniol）', nameEn: 'Geraniol', category: '香气（Aroma）', subCategory: '花香（Floral）', type: 'good', description: '玫瑰、青柠、天竺葵、柠檬、花香、果香、风信子。来源：酒花油' },
      { name: '木槿（Hibiscus）', nameEn: 'Hibiscus', category: '香气（Aroma）', subCategory: '花香（Floral）', type: 'good', description: '木槿花香' },
      { name: '金银花（Honeysuckle）', nameEn: 'Honeysuckle', category: '香气（Aroma）', subCategory: '花香（Floral）', type: 'good', description: '金银花香' },
      { name: '茉莉（Jasmine）', nameEn: 'Jasmine', category: '香气（Aroma）', subCategory: '花香（Floral）', type: 'good', description: '茉莉花香' },
      { name: '薰衣草（Lavender）', nameEn: 'Lavender', category: '香气（Aroma）', subCategory: '花香（Floral）', type: 'good', description: '木质、辛辣、芫荽、花香、玫瑰木、果香。来源：芳樟醇' },
      { name: '丁香花（Lilac）', nameEn: 'Lilac', category: '香气（Aroma）', subCategory: '花香（Floral）', type: 'good', description: '丁香花香' },
      { name: '香水（Perfume）', nameEn: 'Perfume', category: '香气（Aroma）', subCategory: '花香（Floral）', type: 'good', description: '香水中常见的花香特征' },
      { name: '肥皂味（Soapy）', nameEn: 'Soapy', category: '香气（Aroma）', subCategory: '花香（Floral）', type: 'bad', description: '醛香、香茅、油腻感' },
      { name: '玫瑰（Rose）', nameEn: 'Rose', category: '香气（Aroma）', subCategory: '花香（Floral）', type: 'good', description: '荔枝、香茅、青柠、天竺葵、柠檬、花香、果香、风信子。来源：香茅醇、香叶醇' },

      // ========== 草本香气 (Grassy/Herbal) ==========
      { name: '新鲜割草（Fresh-cut Grass）', nameEn: 'Fresh-cut Grass', category: '香气（Aroma）', subCategory: '草香（Grassy）', type: 'good', description: '青叶、西瓜、香蕉、黄瓜、蔬菜味。来源：酒花或未成熟麦芽（顺式-3-己醛、顺式-3-己醇）' },
      { name: '青草（Green Grass）', nameEn: 'Green Grass', category: '香气（Aroma）', subCategory: '草香（Grassy）', type: 'good', description: '来源：酒花或未成熟麦芽' },
      { name: '干草（Hay）', nameEn: 'Hay', category: '香气（Aroma）', subCategory: '草香（Grassy）', type: 'good', description: '来源：麦芽' },
      { name: '稻草（Straw）', nameEn: 'Straw', category: '香气（Aroma）', subCategory: '草香（Grassy）', type: 'good', description: '来源：麦芽' },
      { name: '罗勒（Basil）', nameEn: 'Basil', category: '香气（Aroma）', subCategory: '草本（Herbal）', type: 'good', description: '来源：酒花' },
      { name: '红茶（Black Tea）', nameEn: 'Black Tea', category: '香气（Aroma）', subCategory: '草本（Herbal）', type: 'good', description: '来源：酒花' },
      { name: '大麻（Cannabis）', nameEn: 'Cannabis', category: '香气（Aroma）', subCategory: '草本（Herbal）', type: 'good', description: '来源：酒花' },
      { name: '香菜（Cilantro）', nameEn: 'Cilantro', category: '香气（Aroma）', subCategory: '草本（Herbal）', type: 'good', description: '来源：酒花' },
      { name: '香茅（Citronella）', nameEn: 'Citronella', category: '香气（Aroma）', subCategory: '草本（Herbal）', type: 'good', description: '来源：酒花' },
      { name: '莳萝（Dill）', nameEn: 'Dill', category: '香气（Aroma）', subCategory: '草本（Herbal）', type: 'good', description: '来源：酒花' },
      { name: '绿茶（Green Tea）', nameEn: 'Green Tea', category: '香气（Aroma）', subCategory: '草本（Herbal）', type: 'good', description: '来源：酒花' },
      { name: '柠檬草（Lemongrass）', nameEn: 'Lemongrass', category: '香气（Aroma）', subCategory: '草本（Herbal）', type: 'good', description: '来源：酒花' },
      { name: '薄荷（Mint）', nameEn: 'Mint', category: '香气（Aroma）', subCategory: '草本（Herbal）', type: 'good', description: '来源：酒花' },
      { name: '迷迭香（Rosemary）', nameEn: 'Rosemary', category: '香气（Aroma）', subCategory: '草本（Herbal）', type: 'good', description: '来源：酒花' },
      { name: '鼠尾草（Sage）', nameEn: 'Sage', category: '香气（Aroma）', subCategory: '草本（Herbal）', type: 'good', description: '来源：酒花' },
      { name: '茶（Tea）', nameEn: 'Tea', category: '香气（Aroma）', subCategory: '草本（Herbal）', type: 'good', description: '来源：酒花' },
      { name: '百里香（Thyme）', nameEn: 'Thyme', category: '香气（Aroma）', subCategory: '草本（Herbal）', type: 'good', description: '来源：酒花' },
      { name: '白茶（White Tea）', nameEn: 'White Tea', category: '香气（Aroma）', subCategory: '草本（Herbal）', type: 'good', description: '来源：酒花' },

      // ========== 辛香料 (Spicy) ==========
      { name: '多香果（Allspice）', nameEn: 'Allspice', category: '香气（Aroma）', subCategory: '辛香料（Spicy）', type: 'good', description: '来源：陈化' },
      { name: '茴香（Anise）', nameEn: 'Anise', category: '香气（Aroma）', subCategory: '辛香料（Spicy）', type: 'good', description: '来源：陈化（茴香脑；甲氧基苯）' },
      { name: '黑胡椒（Black Pepper）', nameEn: 'Black Pepper', category: '香气（Aroma）', subCategory: '辛香料（Spicy）', type: 'good', description: '药味、树脂、木质、松树、草味、香脂。来源：陈化（月桂烯、胡椒碱）' },
      { name: '肉桂（Cinnamon）', nameEn: 'Cinnamon', category: '香气（Aroma）', subCategory: '辛香料（Spicy）', type: 'good', description: '来源：陈化（肉桂酸乙酯）' },
      { name: '丁香（Clove）', nameEn: 'Clove', category: '香气（Aroma）', subCategory: '辛香料（Spicy）', type: 'good', description: '甜香、焦味、烟熏、香草、药味、烧橡胶。来源：陈化（4-乙烯基愈创木酚；4-乙基愈创木酚）' },
      { name: '生姜（Ginger）', nameEn: 'Ginger', category: '香气（Aroma）', subCategory: '辛香料（Spicy）', type: 'good', description: '来源：陈化' },
      { name: '肉豆蔻（Nutmeg）', nameEn: 'Nutmeg', category: '香气（Aroma）', subCategory: '辛香料（Spicy）', type: 'good', description: '来源：陈化' },

      // ========== 木质香气 (Woody) ==========
      { name: '雪松（Cedar）', nameEn: 'Cedar', category: '香气（Aroma）', subCategory: '木质（Woody）', type: 'good', description: '来源：葎草烯环氧化物II、III' },
      { name: '樱桃木（Cherry Wood）', nameEn: 'Cherry Wood', category: '香气（Aroma）', subCategory: '木质（Woody）', type: 'good', description: '樱桃木香' },
      { name: '桉树（Eucalyptus）', nameEn: 'Eucalyptus', category: '香气（Aroma）', subCategory: '木质（Woody）', type: 'good', description: '桉树香' },
      { name: '橡木（Oak）', nameEn: 'Oak', category: '香气（Aroma）', subCategory: '木质（Woody）', type: 'good', description: '橡木香' },
      { name: '松树（Pine）', nameEn: 'Pine', category: '香气（Aroma）', subCategory: '木质（Woody）', type: 'good', description: '药味、树脂、辛辣、黑胡椒。来源：月桂烯' },
      { name: '树脂（Resinous）', nameEn: 'Resinous', category: '香气（Aroma）', subCategory: '木质（Woody）', type: 'good', description: '药味、辛辣、香脂。来源：酒花复杂挥发油成分（倍半萜环氧化物、环醚、呋喃酮等）' },
      { name: '锯末（Sawdust）', nameEn: 'Sawdust', category: '香气（Aroma）', subCategory: '木质（Woody）', type: 'good', description: '锯末香' },
      { name: '茶树（Tea Tree）', nameEn: 'Tea Tree', category: '香气（Aroma）', subCategory: '木质（Woody）', type: 'good', description: '茶树香' },
      { name: '烟草（Tobacco）', nameEn: 'Tobacco', category: '香气（Aroma）', subCategory: '木质（Woody）', type: 'good', description: '果干、木质、甜香、草本、泥土、干叶、溶剂、薄荷、蜂蜜。来源：丁香酸乙酯；大马士革酮' },

      // ========== 泥土香气 (Earthy) ==========
      { name: '甜菜（Beet）', nameEn: 'Beet', category: '香气（Aroma）', subCategory: '泥土（Earthy）', type: 'good', description: '来源：土臭素' },
      { name: '青椒（Bell Pepper）', nameEn: 'Bell Pepper', category: '香气（Aroma）', subCategory: '泥土（Earthy）', type: 'bad', description: '辣椒味。来源：受污染的酿造用水（2-异丁基-3-甲氧基吡嗪）' },
      { name: '堆肥（Compost）', nameEn: 'Compost', category: '香气（Aroma）', subCategory: '泥土（Earthy）', type: 'bad', description: '来源：受污染的酿造用水中微生物生长（2-甲基异莰醇）' },
      { name: '土臭素（Geosmin）', nameEn: 'Geosmin', category: '香气（Aroma）', subCategory: '泥土（Earthy）', type: 'bad', description: '泥土、甜菜味。来源：受污染的酿造用水中微生物生长' },
      { name: '皮革（Leather）', nameEn: 'Leather', category: '香气（Aroma）', subCategory: '泥土（Earthy）', type: 'good', description: '来源：陈化（6-异丁基喹啉）' },
      { name: '矿物质（Mineral）', nameEn: 'Mineral', category: '香气（Aroma）', subCategory: '泥土（Earthy）', type: 'good', description: '矿物质味' },
      { name: '蘑菇（Mushroom）', nameEn: 'Mushroom', category: '香气（Aroma）', subCategory: '泥土（Earthy）', type: 'good', description: '霉味、罐头蘑菇。来源：1-辛烯-3-醇' },
      { name: '霉味（Musty）', nameEn: 'Musty', category: '香气（Aroma）', subCategory: '泥土（Earthy）', type: 'bad', description: '泥土、霉菌味。来源：原料或包装污染（三氯苯甲醚）' },
      { name: '雨后泥土香（Petrichor）', nameEn: 'Petrichor', category: '香气（Aroma）', subCategory: '泥土（Earthy）', type: 'good', description: '长期干燥温暖天气后第一场雨带来的清新气味' },
      { name: '泥土（Soil）', nameEn: 'Soil', category: '香气（Aroma）', subCategory: '泥土（Earthy）', type: 'good', description: '新翻泥土味。来源：水源污染（乙基莰醇）' },

      // ========== 谷物香气 (Cereal/Bready/Malty) ==========
      { name: '谷物（Cereal）', nameEn: 'Cereal', category: '香气（Aroma）', subCategory: '谷物（Cereal）', type: 'good', description: '饼干、爆米花。来源：麦芽或酵母（乙酰吡啶）' },
      { name: '麦圈（Cheerios）', nameEn: 'Cheerios', category: '香气（Aroma）', subCategory: '谷物（Cereal）', type: 'good', description: '来源：麦芽或酵母（THP）' },
      { name: '玉米片（Corn Flakes）', nameEn: 'Corn Flakes', category: '香气（Aroma）', subCategory: '谷物（Cereal）', type: 'good', description: '来源：麦芽或酵母' },
      { name: '葡萄坚果麦片（Grape Nuts）', nameEn: 'Grape Nuts', category: '香气（Aroma）', subCategory: '谷物（Cereal）', type: 'good', description: '来源：麦芽或酵母' },
      { name: '饼干（Biscuit）', nameEn: 'Biscuit', category: '香气（Aroma）', subCategory: '面包（Bready）', type: 'good', description: '谷物、爆米花。来源：麦芽或酵母' },
      { name: '面包皮（Bread Crust）', nameEn: 'Bread Crust', category: '香气（Aroma）', subCategory: '面包（Bready）', type: 'good', description: '来源：麦芽或酵母' },
      { name: '面团（Bread Dough）', nameEn: 'Bread Dough', category: '香气（Aroma）', subCategory: '面包（Bready）', type: 'good', description: '来源：麦芽或酵母' },
      { name: '玉米饼（Corn Tortilla）', nameEn: 'Corn Tortilla', category: '香气（Aroma）', subCategory: '面包（Bready）', type: 'good', description: '来源：麦芽或酵母' },
      { name: '生面团（Dough）', nameEn: 'Dough', category: '香气（Aroma）', subCategory: '面包（Bready）', type: 'good', description: '来源：麦芽或酵母' },
      { name: '派皮（Pie Crust）', nameEn: 'Pie Crust', category: '香气（Aroma）', subCategory: '面包（Bready）', type: 'good', description: '来源：麦芽或酵母' },
      { name: '培乐多（Play-Doh）', nameEn: 'Play-Doh', category: '香气（Aroma）', subCategory: '面包（Bready）', type: 'good', description: '来源：麦芽或酵母' },
      { name: '烤面包（Toasted Bread）', nameEn: 'Toasted Bread', category: '香气（Aroma）', subCategory: '面包（Bready）', type: 'good', description: '来源：麦芽或酵母' },
      { name: '酵母味（Yeasty）', nameEn: 'Yeasty', category: '香气（Aroma）', subCategory: '面包（Bready）', type: 'good', description: '发酵、硫味、面包味、新鲜酵母、石南硫胺素味。来源：麦芽或酵母' },
      { name: '麦芽味（Malty）', nameEn: 'Malty', category: '香气（Aroma）', subCategory: '麦芽（Malty）', type: 'good', description: '谷物、饼干、爆米花。来源：麦芽烘焙过程（乙酰吡啶）' },
      { name: '谷粒（Grainy）', nameEn: 'Grainy', category: '香气（Aroma）', subCategory: '麦芽（Malty）', type: 'good', description: '玉米碎粒、青涩、粗糙、青麦芽特征。来源：淡色麦芽使用、糖化工艺、酵母菌株（异丁醛）' },
      { name: '麦壳（Husky）', nameEn: 'Husky', category: '香气（Aroma）', subCategory: '麦芽（Malty）', type: 'good', description: '麦壳味' },
      { name: '麦汁味（Worty）', nameEn: 'Worty', category: '香气（Aroma）', subCategory: '麦芽（Malty）', type: 'good', description: '麦汁味' },

      // ========== 坚果香气 (Nutty) ==========
      { name: '杏仁（Almond）', nameEn: 'Almond', category: '香气（Aroma）', subCategory: '坚果（Nutty）', type: 'good', description: '杏仁糖、樱桃。来源：氧化或陈化（苯甲醛）' },
      { name: '榛子（Hazelnut）', nameEn: 'Hazelnut', category: '香气（Aroma）', subCategory: '坚果（Nutty）', type: 'good', description: '榛子香' },
      { name: '花生酱（Peanut Butter）', nameEn: 'Peanut Butter', category: '香气（Aroma）', subCategory: '坚果（Nutty）', type: 'good', description: '花生酱香' },
      { name: '南瓜籽（Pumpkin Seed）', nameEn: 'Pumpkin Seed', category: '香气（Aroma）', subCategory: '坚果（Nutty）', type: 'good', description: '南瓜籽香' },
      { name: '芝麻（Sesame Seed）', nameEn: 'Sesame Seed', category: '香气（Aroma）', subCategory: '坚果（Nutty）', type: 'good', description: '芝麻香' },
      { name: '葵花籽（Sunflower Seed）', nameEn: 'Sunflower Seed', category: '香气（Aroma）', subCategory: '坚果（Nutty）', type: 'good', description: '葵花籽香' },
      { name: '核桃（Walnut）', nameEn: 'Walnut', category: '香气（Aroma）', subCategory: '坚果（Nutty）', type: 'good', description: '核桃香' },

      // ========== 烘烤香气 (Roasted) ==========
      { name: '烤焦吐司（Burnt Toast）', nameEn: 'Burnt Toast', category: '香气（Aroma）', subCategory: '烘烤（Roasted）', type: 'good', description: '烘烤或焦化麦芽味。来源：烘烤或特种麦芽；美拉德反应' },
      { name: '巧克力（Chocolate）', nameEn: 'Chocolate', category: '香气（Aroma）', subCategory: '烘烤（Roasted）', type: 'good', description: '来源：烘烤或特种麦芽；美拉德反应' },
      { name: '咖啡（Coffee）', nameEn: 'Coffee', category: '香气（Aroma）', subCategory: '烘烤（Roasted）', type: 'good', description: '来源：烘烤或特种麦芽；美拉德反应' },
      { name: '烤大麦（Roasted Barley）', nameEn: 'Roasted Barley', category: '香气（Aroma）', subCategory: '烘烤（Roasted）', type: 'good', description: '来源：烘烤或特种麦芽；美拉德反应' },

      // ========== 甜香 (Sweet Aromatic) ==========
      { name: '红糖（Brown Sugar）', nameEn: 'Brown Sugar', category: '香气（Aroma）', subCategory: '甜香（Sweet Aromatic）', type: 'good', description: '马德拉酒或咖喱叶味。来源：贵腐菌感染（索托龙）' },
      { name: '泡泡糖（Bubblegum）', nameEn: 'Bubblegum', category: '香气（Aroma）', subCategory: '甜香（Sweet Aromatic）', type: 'good', description: '菠萝、香蕉、果香、人工水果味。来源：酵母产生（丁酸乙酯）' },
      { name: '焦糖（Caramel）', nameEn: 'Caramel', category: '香气（Aroma）', subCategory: '甜香（Sweet Aromatic）', type: 'good', description: '来源：呋喃酮' },
      { name: '棉花糖（Cotton Candy）', nameEn: 'Cotton Candy', category: '香气（Aroma）', subCategory: '甜香（Sweet Aromatic）', type: 'good', description: '来源：麦芽酚乙酯' },
      { name: '丁酸乙酯（Ethyl Butyrate）', nameEn: 'Ethyl Butyrate', category: '香气（Aroma）', subCategory: '甜香（Sweet Aromatic）', type: 'good', description: '菠萝、泡泡糖、果香、人工水果味。来源：酵母产生' },
      { name: '蜂蜜（Honey）', nameEn: 'Honey', category: '香气（Aroma）', subCategory: '甜香（Sweet Aromatic）', type: 'good', description: '来源：大马士革酮' },
      { name: '枫糖浆（Maple Syrup）', nameEn: 'Maple Syrup', category: '香气（Aroma）', subCategory: '甜香（Sweet Aromatic）', type: 'good', description: '枫糖浆香' },
      { name: '棉花糖（Marshmallow）', nameEn: 'Marshmallow', category: '香气（Aroma）', subCategory: '甜香（Sweet Aromatic）', type: 'good', description: '棉花糖香' },
      { name: '糖蜜（Molasses）', nameEn: 'Molasses', category: '香气（Aroma）', subCategory: '甜香（Sweet Aromatic）', type: 'good', description: '糖蜜香' },
      { name: '太妃糖（Toffee）', nameEn: 'Toffee', category: '香气（Aroma）', subCategory: '甜香（Sweet Aromatic）', type: 'good', description: '太妃糖香' },
      { name: '香草（Vanilla）', nameEn: 'Vanilla', category: '香气（Aroma）', subCategory: '甜香（Sweet Aromatic）', type: 'good', description: '来源：麦芽；陈化特征（尤其是桶陈）（香草醛）' },

      // ========== 双乙酰/乳脂 (Diacetyl) ==========
      { name: '黄油（Butter）', nameEn: 'Butter', category: '香气（Aroma）', subCategory: '双乙酰（Diacetyl）', type: 'bad', description: '乳制品、酪乳、奶酪。来源：酵母发酵前体产生；乳酸菌污染' },
      { name: '酪乳（Buttermilk）', nameEn: 'Buttermilk', category: '香气（Aroma）', subCategory: '双乙酰（Diacetyl）', type: 'bad', description: '乳制品、黄油、奶酪。来源：酵母发酵前体产生；乳酸菌污染' },
      { name: '奶油糖（Butterscotch）', nameEn: 'Butterscotch', category: '香气（Aroma）', subCategory: '双乙酰（Diacetyl）', type: 'bad', description: '乳制品、黄油、焦糖、甜香。来源：酵母发酵前体产生；乳酸菌污染' },
      { name: '乳制品（Dairy）', nameEn: 'Dairy', category: '香气（Aroma）', subCategory: '双乙酰（Diacetyl）', type: 'bad', description: '黄油、酪乳、奶酪。来源：酵母发酵前体产生；乳酸菌污染' },
      { name: '酸奶（Yogurt）', nameEn: 'Yogurt', category: '香气（Aroma）', subCategory: '双乙酰（Diacetyl）', type: 'bad', description: '乳制品、黄油、酪乳、酸、奶酪、果香。来源：酵母发酵前体产生；乳酸菌污染' },

      // ========== 烈酒香气 (Spirits) ==========
      { name: '杏仁利口酒（Amaretto）', nameEn: 'Amaretto', category: '香气（Aroma）', subCategory: '烈酒（Spirits）', type: 'good', description: '来源：酒精过高；酵母产生' },
      { name: '白兰地（Brandy）', nameEn: 'Brandy', category: '香气（Aroma）', subCategory: '烈酒（Spirits）', type: 'good', description: '来源：麦芽；陈化特征（尤其是桶陈）' },
      { name: '红葡萄酒（Red Wine）', nameEn: 'Red Wine', category: '香气（Aroma）', subCategory: '烈酒（Spirits）', type: 'good', description: '葡萄酒味' },
      { name: '朗姆酒（Rum）', nameEn: 'Rum', category: '香气（Aroma）', subCategory: '烈酒（Spirits）', type: 'good', description: '焦糖味。来源：麦芽；陈化特征（尤其是桶陈）' },
      { name: '雪利酒（Sherry）', nameEn: 'Sherry', category: '香气（Aroma）', subCategory: '烈酒（Spirits）', type: 'good', description: '来源：麦芽；陈化特征（尤其是桶陈）' },
      { name: '龙舌兰（Tequila）', nameEn: 'Tequila', category: '香气（Aroma）', subCategory: '烈酒（Spirits）', type: 'good', description: '来源：麦芽；陈化特征（尤其是桶陈）（丙醇）' },
      { name: '威士忌（Whisky）', nameEn: 'Whisky', category: '香气（Aroma）', subCategory: '烈酒（Spirits）', type: 'good', description: '来源：麦芽；陈化特征（尤其是桶陈）' },
      { name: '白葡萄酒（White Wine）', nameEn: 'White Wine', category: '香气（Aroma）', subCategory: '烈酒（Spirits）', type: 'good', description: '白葡萄酒味' },

      // ========== 酚类 (Phenolic) ==========
      { name: '创可贴（Adhesive Bandage）', nameEn: 'Adhesive Bandage', category: '香气（Aroma）', subCategory: '酚类（Phenolic）', type: 'bad', description: '药味、泥土、马厩、塑料。来源：麦汁生产；某些酵母菌株或野生酵母污染（4-乙基苯酚）' },
      { name: '烧橡胶（Burnt Rubber）', nameEn: 'Burnt Rubber', category: '香气（Aroma）', subCategory: '酚类（Phenolic）', type: 'bad', description: '药味、辛辣、丁香、焦味、烟熏。来源：4-乙基愈创木酚' },
      { name: '止咳糖浆（Cough Syrup）', nameEn: 'Cough Syrup', category: '香气（Aroma）', subCategory: '酚类（Phenolic）', type: 'bad', description: '止咳糖浆味' },
      { name: '橡胶水管（Garden Hose）', nameEn: 'Garden Hose', category: '香气（Aroma）', subCategory: '酚类（Phenolic）', type: 'bad', description: '橡胶水管味' },
      { name: '药味（Medicinal）', nameEn: 'Medicinal', category: '香气（Aroma）', subCategory: '酚类（Phenolic）', type: 'bad', description: '消毒水味。来源：POF+、PAD+酵母、其他微生物污染（4-乙烯基愈创木酚；氯酚）' },
      { name: '塑料（Plastic）', nameEn: 'Plastic', category: '香气（Aroma）', subCategory: '酚类（Phenolic）', type: 'bad', description: '药味。来源：苯乙烯' },
      { name: '烟熏（Smoky）', nameEn: 'Smoky', category: '香气（Aroma）', subCategory: '酚类（Phenolic）', type: 'good', description: '酚类、药味、培根、香脂、焦味、木质。来源：原料接触烟熏；微生物污染（愈创木酚；2,6-二甲氧基苯酚）' },
      { name: '乙烯基（Vinyl）', nameEn: 'Vinyl', category: '香气（Aroma）', subCategory: '酚类（Phenolic）', type: 'bad', description: '乙烯基味' },

      // ========== 酒香酵母 (Brettanomyces) ==========
      { name: '马厩（Barnyard）', nameEn: 'Barnyard', category: '香气（Aroma）', subCategory: '酒香酵母（Brettanomyces）', type: 'bad', description: '药味、创可贴、泥土。来源：酒香酵母用于发酵或作为污染（4-乙基苯酚；甲酚；吲哚；粪臭素）' },
      { name: '玉米片（Corn Chip）', nameEn: 'Corn Chip', category: '香气（Aroma）', subCategory: '酒香酵母（Brettanomyces）', type: 'bad', description: '来源：酒香酵母用于发酵或作为污染' },
      { name: '马毯（Horse Blanket）', nameEn: 'Horse Blanket', category: '香气（Aroma）', subCategory: '酒香酵母（Brettanomyces）', type: 'bad', description: '来源：酒香酵母用于发酵或作为污染' },
      { name: '粪便（Manure/Fecal）', nameEn: 'Manure/Fecal', category: '香气（Aroma）', subCategory: '酒香酵母（Brettanomyces）', type: 'bad', description: '来源：酒香酵母用于发酵或作为污染（吲哚）' },
      { name: '发霉/湿地下室（Musty/Damp）', nameEn: 'Musty/Damp Basement', category: '香气（Aroma）', subCategory: '酒香酵母（Brettanomyces）', type: 'bad', description: '潮湿地下室或葡萄酒木塞污染味。来源：酒香酵母；三氯苯甲醚' },
      { name: '汗味（Sweaty）', nameEn: 'Sweaty', category: '香气（Aroma）', subCategory: '酒香酵母（Brettanomyces）', type: 'bad', description: '来源：酒香酵母用于发酵或作为污染' },

      // ========== 硫化物 (Sulfur) ==========
      { name: '煮鸡蛋（Boiled Eggs）', nameEn: 'Boiled Eggs', category: '香气（Aroma）', subCategory: '硫化物（Sulfur）', type: 'bad', description: '硫化物味。来源：酵母发酵和熟化产生（硫化氢、硫醇）；细菌污染' },
      { name: '烧橡胶（Burnt Rubber）', nameEn: 'Burnt Rubber', category: '香气（Aroma）', subCategory: '硫化物（Sulfur）', type: 'bad', description: '来源：酵母代谢含硫氨基酸（2-噻吩硫醇；1-丙硫醇）' },
      { name: '大蒜（Garlic）', nameEn: 'Garlic', category: '香气（Aroma）', subCategory: '硫化物（Sulfur）', type: 'bad', description: '来源：陈化酒花/酒花油（二甲基三硫醚）' },
      { name: '硫化氢/臭鸡蛋（Hydrogen Sulfide）', nameEn: 'Hydrogen Sulfide/H2S', category: '香气（Aroma）', subCategory: '硫化物（Sulfur）', type: 'bad', description: '煮鸡蛋、烫发、湿狗味。来源：酵母发酵产生' },
      { name: '光臭/臭鼬（Lightstruck/Skunky）', nameEn: 'Lightstruck/Skunky', category: '香气（Aroma）', subCategory: '硫化物（Sulfur）', type: 'bad', description: '臭鼬、新煮咖啡、大麻味。来源：啤酒中某些酒花酸在光照下与含硫氨基酸和蛋白质在核黄素存在下反应生成（3-甲基-2-丁烯-1-硫醇MBT）' },
      { name: '硫醇/下水道（Mercaptan）', nameEn: 'Mercaptan', category: '香气（Aroma）', subCategory: '硫化物（Sulfur）', type: 'bad', description: '下水道、煮鸡蛋、蔬菜、腐烂堆肥。来源：酵母自溶；细菌生长（甲硫醇）' },
      { name: '洋葱（Onion）', nameEn: 'Onion', category: '香气（Aroma）', subCategory: '硫化物（Sulfur）', type: 'bad', description: '煮洋葱。来源：麦汁煮沸产生，被酵母产生的CO2吹除；陈化酒花/酒花油（二甲基硫醚DMS）' },
      { name: '划燃火柴（Struck Match）', nameEn: 'Struck Match', category: '香气（Aroma）', subCategory: '硫化物（Sulfur）', type: 'bad', description: '亚硫酸盐、焦味。来源：拉格酵母产生；作为防腐剂添加' },
      { name: '二氧化硫（Sulfur Dioxide/SO2）', nameEn: 'Sulfur Dioxide/SO2', category: '香气（Aroma）', subCategory: '硫化物（Sulfur）', type: 'bad', description: '划燃火柴、年轻白葡萄酒、窒息感、维生素药瓶味。来源：无机硫来自水源或添加为防腐剂/抗氧化剂；有机硫来自含硫氨基酸；拉格酵母发酵自然产生' },

      // ========== 蔬菜味 (Vegetal) ==========
      { name: '罐头玉米（Canned Corn）', nameEn: 'Canned Corn', category: '香气（Aroma）', subCategory: '蔬菜（Vegetal）', type: 'bad', description: '来源：麦芽中S-甲基蛋氨酸形成DMS；细菌污染' },
      { name: '煮白菜（Cooked Cabbage）', nameEn: 'Cooked Cabbage', category: '香气（Aroma）', subCategory: '蔬菜（Vegetal）', type: 'bad', description: '来源：DMS；甲基硫代乙酸酯（拉格酵母产生）' },
      { name: '煮洋葱（Cooked Onion）', nameEn: 'Cooked Onion', category: '香气（Aroma）', subCategory: '蔬菜（Vegetal）', type: 'bad', description: '来源：DMS；二甲基三硫醚' },
      { name: '煮土豆（Cooked Potato）', nameEn: 'Cooked Potato', category: '香气（Aroma）', subCategory: '蔬菜（Vegetal）', type: 'bad', description: '来源：陈化（蛋氨醛）' },
      { name: '芹菜（Celery）', nameEn: 'Celery', category: '香气（Aroma）', subCategory: '蔬菜（Vegetal）', type: 'bad', description: '来源：月桂烯' },
      { name: '二甲基硫醚/DMS（Dimethyl Sulfide）', nameEn: 'DMS', category: '香气（Aroma）', subCategory: '蔬菜（Vegetal）', type: 'bad', description: '罐头玉米、煮白菜、烤豆、黑橄榄、洋葱、番茄酱、南瓜。来源：麦芽中S-甲基蛋氨酸形成；细菌污染' },
      { name: '四季豆（Green Beans）', nameEn: 'Green Beans', category: '香气（Aroma）', subCategory: '蔬菜（Vegetal）', type: 'bad', description: '四季豆味' },
      { name: '番茄酱（Tomato Paste）', nameEn: 'Tomato Paste', category: '香气（Aroma）', subCategory: '蔬菜（Vegetal）', type: 'bad', description: '来源：DMS' },
      { name: '番茄植株（Tomato Plant）', nameEn: 'Tomato Plant', category: '香气（Aroma）', subCategory: '蔬菜（Vegetal）', type: 'bad', description: '番茄植株味' },

      // ========== 氧化 (Oxidized) ==========
      { name: '纸板（Cardboard）', nameEn: 'Cardboard', category: '香气（Aroma）', subCategory: '氧化（Oxidized）', type: 'bad', description: '陈旧、纸味。来源：麦汁生产时形成，包装啤酒储存时释放（反式-2-壬烯醛）；陈化' },
      { name: '灰尘（Dusty）', nameEn: 'Dusty', category: '香气（Aroma）', subCategory: '氧化（Oxidized）', type: 'bad', description: '灰尘味' },
      { name: '皮革（Leather）', nameEn: 'Leather', category: '香气（Aroma）', subCategory: '氧化（Oxidized）', type: 'bad', description: '干草味。来源：陈化（异丁基喹啉）' },
      { name: '口红（Lipstick）', nameEn: 'Lipstick', category: '香气（Aroma）', subCategory: '氧化（Oxidized）', type: 'bad', description: '陈旧、蜡质。来源：反式-2-壬烯醛' },
      { name: '肉味（Meaty）', nameEn: 'Meaty', category: '香气（Aroma）', subCategory: '氧化（Oxidized）', type: 'bad', description: '肉味' },
      { name: '老鼠味（Mousy）', nameEn: 'Mousy', category: '香气（Aroma）', subCategory: '氧化（Oxidized）', type: 'bad', description: '来源：2-乙酰四氢吡啶' },
      { name: '纸味（Papery）', nameEn: 'Papery', category: '香气（Aroma）', subCategory: '氧化（Oxidized）', type: 'bad', description: '陈旧、纸板。来源：反式-2-壬烯醛' },
      { name: '陈旧（Stale）', nameEn: 'Stale', category: '香气（Aroma）', subCategory: '氧化（Oxidized）', type: 'bad', description: '来源：陈化' },
      { name: '蜡质（Waxy）', nameEn: 'Waxy', category: '香气（Aroma）', subCategory: '氧化（Oxidized）', type: 'bad', description: '脂肪、植物油。来源：酵母熟化产生辛酸；酵母自溶释放' },
      { name: '湿狗（Wet Dog）', nameEn: 'Wet Dog', category: '香气（Aroma）', subCategory: '氧化（Oxidized）', type: 'bad', description: '湿狗味' },

      // ========== 丁酸 (Butyric) ==========
      { name: '婴儿呕吐物（Baby Vomit）', nameEn: 'Baby Vomit', category: '香气（Aroma）', subCategory: '丁酸（Butyric）', type: 'bad', description: '来源：糖化或储存过程中细菌产生；包装中变质（丁酸）' },

      // ========== 辛酸 (Caprylic) ==========
      { name: '山羊味（Goaty）', nameEn: 'Goaty', category: '香气（Aroma）', subCategory: '辛酸（Caprylic）', type: 'bad', description: '蜡质、脂肪、植物油。来源：酵母调节期产生；辛酸' },

      // ========== 异戊酸 (Isovaleric) ==========
      { name: '奶酪味（Cheesy）', nameEn: 'Cheesy', category: '香气（Aroma）', subCategory: '异戊酸（Isovaleric）', type: 'bad', description: '汗袜、乳制品、陈旧。来源：酒花α酸分解；野生酵母（异戊酸）' },

      // ========== 化学味 (Chemical) ==========
      { name: '醋酸（Acetic Acid）', nameEn: 'Acetic Acid', category: '香气（Aroma）', subCategory: '化学（Chemical）', type: 'bad', description: '酸、醋、尖锐、溶剂' },
      { name: '丙酮（Acetone）', nameEn: 'Acetone', category: '香气（Aroma）', subCategory: '化学（Chemical）', type: 'bad', description: '洗甲水' },
      { name: '碱味（Alkaline）', nameEn: 'Alkaline', category: '香气（Aroma）', subCategory: '化学（Chemical）', type: 'bad', description: '烧碱、化学清洁剂。来源：烧碱污染（碳酸氢钠）' },
      { name: '乙酸乙酯（Ethyl Acetate）', nameEn: 'Ethyl Acetate', category: '香气（Aroma）', subCategory: '化学（Chemical）', type: 'bad', description: '溶剂、果香。来源：酵母发酵产生' },
      { name: '记号笔（Permanent Marker）', nameEn: 'Permanent Marker', category: '香气（Aroma）', subCategory: '化学（Chemical）', type: 'bad', description: '记号笔味' },
      { name: '金属味（Metallic）', nameEn: 'Metallic', category: '香气（Aroma）', subCategory: '化学（Chemical）', type: 'bad', description: '铁、锈、血腥味。来源：啤酒与金属材料接触（硫酸亚铁）' },
      { name: '油漆稀释剂（Paint Thinner）', nameEn: 'Paint Thinner', category: '香气（Aroma）', subCategory: '化学（Chemical）', type: 'bad', description: '油漆稀释剂味' },
      { name: '石油/柴油（Petroleum/Diesel）', nameEn: 'Petroleum/Diesel', category: '香气（Aroma）', subCategory: '化学（Chemical）', type: 'bad', description: '煤油味' },
      { name: '溶剂（Solvent）', nameEn: 'Solvent', category: '香气（Aroma）', subCategory: '化学（Chemical）', type: 'bad', description: '来源：乙酸乙酯' },
      { name: '醋（Vinegar）', nameEn: 'Vinegar', category: '香气（Aroma）', subCategory: '化学（Chemical）', type: 'bad', description: '来源：醋酸' },
    ]
  })

  console.log('✅ 风味数据导入完成！')
  const count = await prisma.flavor.count()
  console.log(`共 ${count} 条风味数据`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })