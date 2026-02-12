-- User数据在最后

-- 清空现有数据
DELETE FROM Flavor;

-- 基础味觉 (Basic Taste)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('bt001', '酸（Sour）', 'Sour', '基础味觉（Basic Taste）', '酸味（Acidic）', 'good', '醋酸、柠檬酸、乳酸等产生的酸味'),
('bt002', '醋酸（Acetic）', 'Acetic', '基础味觉（Basic Taste）', '酸味（Acidic）', 'good', '醋、溶剂感。来源：酵母发酵产生；醋酸菌'),
('bt003', '柠檬酸（Citric）', 'Citric', '基础味觉（Basic Taste）', '酸味（Acidic）', 'good', '柠檬汁般的酸感。来源：酵母发酵；糖化过程酸化；细菌污染'),
('bt004', '乳酸（Lactic）', 'Lactic', '基础味觉（Basic Taste）', '酸味（Acidic）', 'good', '来源：糖化过程中细菌产生；细菌污染'),
('bt005', '甜（Sweet）', 'Sweet', '基础味觉（Basic Taste）', NULL, 'good', '糖类带来的甜味。来源：麦芽、酵母、辅料'),
('bt006', '咸（Salty）', 'Salty', '基础味觉（Basic Taste）', NULL, 'good', '氯化钠带来的咸味。来源：酿造用盐；麦芽'),
('bt007', '苦（Bitter）', 'Bitter', '基础味觉（Basic Taste）', NULL, 'good', '在喉咙后部感受到的苦味。来源：煮沸过程中酒花的异α酸'),
('bt008', '鲜味（Umami）', 'Umami', '基础味觉（Basic Taste）', NULL, 'good', '酱油、酵母自溶物、肉味、马麦酱的鲜味');

-- 口感 (Mouthfeel)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('mf001', '收敛（Astringent）', 'Astringent', '口感（Mouthfeel）', NULL, 'good', '干涩、收紧的口感。来源：高多酚含量'),
('mf002', '白垩感（Chalky）', 'Chalky', '口感（Mouthfeel）', NULL, 'good', '干燥粉状的口感，伴有矿物盐的气息。来源：高含量不溶性钙'),
('mf003', '挂杯（Mouthcoating）', 'Mouthcoating', '口感（Mouthfeel）', NULL, 'good', '口腔中有一层薄膜覆盖的感觉。来源：β-葡聚糖、植物甾醇、多酚、脂质'),
('mf004', '饱满（Full Body）', 'Full Body', '口感（Mouthfeel）', '酒体（Body）', 'good', '口腔和舌头感受到的厚重感。来源：β-葡聚糖、抗发酵多糖/糊精、多酚'),
('mf005', '单薄（Thin Body）', 'Thin Body', '口感（Mouthfeel）', '酒体（Body）', 'good', '酒体单薄，缺乏厚度'),
('mf006', '起泡（Effervescent）', 'Effervescent', '口感（Mouthfeel）', '碳酸化（Carbonation）', 'good', '二氧化碳带来的气泡感。来源：酵母发酵产生'),
('mf007', '平淡（Flat）', 'Flat', '口感（Mouthfeel）', '碳酸化（Carbonation）', 'bad', '缺乏碳酸化，口感平淡'),
('mf008', '酒花灼烧（Hop Burn）', 'Hop Burn/Scratchy', '口感（Mouthfeel）', '刺激（Irritating）', 'bad', '磨砂般的、持久的苦味，常在舌后/喉咙感受到'),
('mf009', '酒精温热感（Warming）', 'Warming/Alcoholic', '口感（Mouthfeel）', NULL, 'good', '乙醇带来的温热感');

-- 果干香气 (Dried Fruit)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('df001', '枣（Date）', 'Date', '香气（Aroma）', '果干（Dried Fruit）', 'good', '来源：陈化啤酒；深色麦芽使用量较高'),
('df002', '无花果（Fig）', 'Fig', '香气（Aroma）', '果干（Dried Fruit）', 'good', '来源：陈化啤酒；深色麦芽使用量较高'),
('df003', '西梅（Prune）', 'Prune', '香气（Aroma）', '果干（Dried Fruit）', 'good', '来源：陈化啤酒；深色麦芽使用量较高'),
('df004', '葡萄干（Raisin）', 'Raisin', '香气（Aroma）', '果干（Dried Fruit）', 'good', '来源：陈化啤酒；深色麦芽使用量较高'),
('df005', '果酱（Jam）', 'Jam', '香气（Aroma）', '果干（Dried Fruit）', 'good', '果酱、糖煮水果、橘子酱的香气');

-- 浆果香气 (Berry)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('be001', '黑醋栗/猫尿味（Black Currant/Catty）', 'Black Currant/Catty', '香气（Aroma）', '浆果（Berry）', 'good', '果香，伴有猫尿味。来源：原料（酒花、酵母）；陈化/氧化'),
('be002', '黑莓（Blackberry）', 'Blackberry', '香气（Aroma）', '浆果（Berry）', 'good', '来源：酒花（α-紫罗兰酮）'),
('be003', '蓝莓（Blueberry）', 'Blueberry', '香气（Aroma）', '浆果（Berry）', 'good', '蓝莓香气'),
('be004', '康科德葡萄（Concord Grape）', 'Concord Grape', '香气（Aroma）', '浆果（Berry）', 'good', '邻氨基苯甲酸甲酯带来的葡萄香'),
('be005', '蔓越莓（Cranberry）', 'Cranberry', '香气（Aroma）', '浆果（Berry）', 'good', '蔓越莓香气'),
('be006', '青葡萄（Green Grape）', 'Green Grape', '香气（Aroma）', '浆果（Berry）', 'good', '青葡萄香气'),
('be007', '葡萄酒味（Grape/Wine）', 'Grape/Wine', '香气（Aroma）', '浆果（Berry）', 'good', '来源：玉米糖浆辅料；酵母压力；假单胞菌；糖苷前体酶解'),
('be008', '麝香葡萄（Muscat Grape）', 'Muscat Grape', '香气（Aroma）', '浆果（Berry）', 'good', '麝香葡萄香气'),
('be009', '覆盆子（Raspberry）', 'Raspberry', '香气（Aroma）', '浆果（Berry）', 'good', '来源：陈化啤酒；高酒花用量啤酒（大马士革酮）'),
('be010', '草莓（Strawberry）', 'Strawberry', '香气（Aroma）', '浆果（Berry）', 'good', '来源：陈化啤酒；高酒花用量啤酒（大马士革酮）'),
('be011', '白葡萄（White Grape）', 'White Grape', '香气（Aroma）', '浆果（Berry）', 'good', '白葡萄香气');

-- 热带水果香气 (Tropical)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('tr001', '香蕉/乙酸异戊酯（Banana）', 'Banana/Isoamyl Acetate', '香气（Aroma）', '热带水果（Tropical）', 'good', '香蕉、溶剂、果香。来源：酵母产生'),
('tr002', '椰子（Coconut）', 'Coconut', '香气（Aroma）', '热带水果（Tropical）', 'good', '脂肪、蜡质、花香、杏子味。来源：γ-癸内酯、椰子内酯'),
('tr003', '番石榴（Guava）', 'Guava', '香气（Aroma）', '热带水果（Tropical）', 'good', '泥土、霉味、过熟、热带。来源：酵母产生；酒花'),
('tr004', '猕猴桃（Kiwi）', 'Kiwi', '香气（Aroma）', '热带水果（Tropical）', 'good', '来源：酵母产生；酒花'),
('tr005', '荔枝（Lychee）', 'Lychee', '香气（Aroma）', '热带水果（Tropical）', 'good', '玫瑰、香茅、青柠。来源：酵母产生；酒花'),
('tr006', '芒果（Mango）', 'Mango', '香气（Aroma）', '热带水果（Tropical）', 'good', '强烈花香、青涩金属感、芒果皮味。来源：酵母产生；酒花'),
('tr007', '百香果（Passion Fruit）', 'Passion Fruit', '香气（Aroma）', '热带水果（Tropical）', 'good', '来源：酵母产生；酒花'),
('tr008', '木瓜（Papaya）', 'Papaya', '香气（Aroma）', '热带水果（Tropical）', 'good', '来源：酵母产生；酒花'),
('tr009', '菠萝（Pineapple）', 'Pineapple', '香气（Aroma）', '热带水果（Tropical）', 'good', '甜香、泡泡糖、果香。来源：酵母产生（丁酸乙酯）');

-- 核果香气 (Stone Fruit)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('sf001', '杏/桃（Apricot/Peach）', 'Apricot/Peach', '香气（Aroma）', '核果（Stone Fruit）', 'good', '来源：C8-12内酯；δ-大马士革酮'),
('sf002', '樱桃（Cherry）', 'Cherry', '香气（Aroma）', '核果（Stone Fruit）', 'good', '杏仁糖、甜香、杏仁味'),
('sf003', '油桃（Nectarine）', 'Nectarine', '香气（Aroma）', '核果（Stone Fruit）', 'good', '油桃香气'),
('sf004', '李子（Plum）', 'Plum', '香气（Aroma）', '核果（Stone Fruit）', 'good', '李子香气');

-- 苹果/梨香气 (Apple/Pear)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('ap001', '苹果酒（Cider）', 'Cider', '香气（Aroma）', '苹果（Apple）', 'good', '来源：酵母产生乙醛；包装时氧气含量过高'),
('ap002', '青苹果/乙醛（Green Apple）', 'Green Apple/Acetaldehyde', '香气（Aroma）', '苹果（Apple）', 'bad', '蔬菜、油漆、青叶、草味、溶剂、果香'),
('ap003', '红苹果/己酸乙酯（Red Apple）', 'Red Apple/Ethyl Hexanoate', '香气（Aroma）', '苹果（Apple）', 'good', '蜡质、脂肪、甘草、茴香、辛辣、青苹果、溶剂、果香'),
('ap004', '梨（Pear）', 'Pear', '香气（Aroma）', '苹果（Apple）', 'good', '梨香');

-- 瓜类香气 (Melon)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('me001', '哈密瓜（Cantaloupe）', 'Cantaloupe', '香气（Aroma）', '瓜类（Melon）', 'good', '哈密瓜香气'),
('me002', '黄瓜（Cucumber）', 'Cucumber', '香气（Aroma）', '瓜类（Melon）', 'good', '蔬菜、纸、香蕉味'),
('me003', '蜜瓜（Honeydew）', 'Honeydew', '香气（Aroma）', '瓜类（Melon）', 'good', '蜜瓜香气'),
('me004', '西瓜（Watermelon）', 'Watermelon', '香气（Aroma）', '瓜类（Melon）', 'good', '青叶、新鲜割草味');

-- 柑橘香气 (Citrus)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('ci001', '血橙（Blood Orange）', 'Blood Orange', '香气（Aroma）', '柑橘（Citrus）', 'good', '血橙香气'),
('ci002', '葡萄柚（Grapefruit）', 'Grapefruit', '香气（Aroma）', '柑橘（Citrus）', 'good', '葡萄柚香气'),
('ci003', '柠檬（Lemon）', 'Lemon', '香气（Aroma）', '柑橘（Citrus）', 'good', '香茅味。来源：芳樟醇、香叶醇'),
('ci004', '青柠（Lime）', 'Lime', '香气（Aroma）', '柑橘（Citrus）', 'good', '来源：香茅醇、香叶醇'),
('ci005', '橙子（Orange）', 'Orange', '香气（Aroma）', '柑橘（Citrus）', 'good', '来源：柠檬烯'),
('ci006', '橘子（Tangerine）', 'Tangerine', '香气（Aroma）', '柑橘（Citrus）', 'good', '来源：E-4-癸烯醛');

-- 花香 (Floral)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('fl001', '香叶醇/玫瑰（Geraniol）', 'Geraniol', '香气（Aroma）', '花香（Floral）', 'good', '玫瑰、青柠、天竺葵、柠檬、花香、果香、风信子。来源：酒花油'),
('fl002', '木槿（Hibiscus）', 'Hibiscus', '香气（Aroma）', '花香（Floral）', 'good', '木槿花香'),
('fl003', '金银花（Honeysuckle）', 'Honeysuckle', '香气（Aroma）', '花香（Floral）', 'good', '金银花香'),
('fl004', '茉莉（Jasmine）', 'Jasmine', '香气（Aroma）', '花香（Floral）', 'good', '茉莉花香'),
('fl005', '薰衣草（Lavender）', 'Lavender', '香气（Aroma）', '花香（Floral）', 'good', '木质、辛辣、芫荽、花香、玫瑰木、果香。来源：芳樟醇'),
('fl006', '丁香花（Lilac）', 'Lilac', '香气（Aroma）', '花香（Floral）', 'good', '丁香花香'),
('fl007', '香水（Perfume）', 'Perfume', '香气（Aroma）', '花香（Floral）', 'good', '香水中常见的花香特征'),
('fl008', '肥皂味（Soapy）', 'Soapy', '香气（Aroma）', '花香（Floral）', 'bad', '醛香、香茅、油腻感'),
('fl009', '玫瑰（Rose）', 'Rose', '香气（Aroma）', '花香（Floral）', 'good', '荔枝、香茅、青柠、天竺葵、柠檬、花香、果香、风信子');

-- 草本香气 (Grassy/Herbal)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('gr001', '新鲜割草（Fresh-cut Grass）', 'Fresh-cut Grass', '香气（Aroma）', '草香（Grassy）', 'good', '青叶、西瓜、香蕉、黄瓜、蔬菜味'),
('gr002', '青草（Green Grass）', 'Green Grass', '香气（Aroma）', '草香（Grassy）', 'good', '来源：酒花或未成熟麦芽'),
('gr003', '干草（Hay）', 'Hay', '香气（Aroma）', '草香（Grassy）', 'good', '来源：麦芽'),
('gr004', '稻草（Straw）', 'Straw', '香气（Aroma）', '草香（Grassy）', 'good', '来源：麦芽'),
('hb001', '罗勒（Basil）', 'Basil', '香气（Aroma）', '草本（Herbal）', 'good', '来源：酒花'),
('hb002', '红茶（Black Tea）', 'Black Tea', '香气（Aroma）', '草本（Herbal）', 'good', '来源：酒花'),
('hb003', '大麻（Cannabis）', 'Cannabis', '香气（Aroma）', '草本（Herbal）', 'good', '来源：酒花'),
('hb004', '香菜（Cilantro）', 'Cilantro', '香气（Aroma）', '草本（Herbal）', 'good', '来源：酒花'),
('hb005', '香茅（Citronella）', 'Citronella', '香气（Aroma）', '草本（Herbal）', 'good', '来源：酒花'),
('hb006', '莳萝（Dill）', 'Dill', '香气（Aroma）', '草本（Herbal）', 'good', '来源：酒花'),
('hb007', '绿茶（Green Tea）', 'Green Tea', '香气（Aroma）', '草本（Herbal）', 'good', '来源：酒花'),
('hb008', '柠檬草（Lemongrass）', 'Lemongrass', '香气（Aroma）', '草本（Herbal）', 'good', '来源：酒花'),
('hb009', '薄荷（Mint）', 'Mint', '香气（Aroma）', '草本（Herbal）', 'good', '来源：酒花'),
('hb010', '迷迭香（Rosemary）', 'Rosemary', '香气（Aroma）', '草本（Herbal）', 'good', '来源：酒花'),
('hb011', '鼠尾草（Sage）', 'Sage', '香气（Aroma）', '草本（Herbal）', 'good', '来源：酒花'),
('hb012', '茶（Tea）', 'Tea', '香气（Aroma）', '草本（Herbal）', 'good', '来源：酒花'),
('hb013', '百里香（Thyme）', 'Thyme', '香气（Aroma）', '草本（Herbal）', 'good', '来源：酒花'),
('hb014', '白茶（White Tea）', 'White Tea', '香气（Aroma）', '草本（Herbal）', 'good', '来源：酒花');

-- 辛香料 (Spicy)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('sp001', '多香果（Allspice）', 'Allspice', '香气（Aroma）', '辛香料（Spicy）', 'good', '来源：陈化'),
('sp002', '茴香（Anise）', 'Anise', '香气（Aroma）', '辛香料（Spicy）', 'good', '来源：陈化（茴香脑；甲氧基苯）'),
('sp003', '黑胡椒（Black Pepper）', 'Black Pepper', '香气（Aroma）', '辛香料（Spicy）', 'good', '药味、树脂、木质、松树、草味、香脂'),
('sp004', '肉桂（Cinnamon）', 'Cinnamon', '香气（Aroma）', '辛香料（Spicy）', 'good', '来源：陈化（肉桂酸乙酯）'),
('sp005', '丁香（Clove）', 'Clove', '香气（Aroma）', '辛香料（Spicy）', 'good', '甜香、焦味、烟熏、香草、药味、烧橡胶'),
('sp006', '生姜（Ginger）', 'Ginger', '香气（Aroma）', '辛香料（Spicy）', 'good', '来源：陈化'),
('sp007', '肉豆蔻（Nutmeg）', 'Nutmeg', '香气（Aroma）', '辛香料（Spicy）', 'good', '来源：陈化');

-- 木质香气 (Woody)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('wo001', '雪松（Cedar）', 'Cedar', '香气（Aroma）', '木质（Woody）', 'good', '来源：葎草烯环氧化物II、III'),
('wo002', '樱桃木（Cherry Wood）', 'Cherry Wood', '香气（Aroma）', '木质（Woody）', 'good', '樱桃木香'),
('wo003', '桉树（Eucalyptus）', 'Eucalyptus', '香气（Aroma）', '木质（Woody）', 'good', '桉树香'),
('wo004', '橡木（Oak）', 'Oak', '香气（Aroma）', '木质（Woody）', 'good', '橡木香'),
('wo005', '松树（Pine）', 'Pine', '香气（Aroma）', '木质（Woody）', 'good', '药味、树脂、辛辣、黑胡椒。来源：月桂烯'),
('wo006', '树脂（Resinous）', 'Resinous', '香气（Aroma）', '木质（Woody）', 'good', '药味、辛辣、香脂'),
('wo007', '锯末（Sawdust）', 'Sawdust', '香气（Aroma）', '木质（Woody）', 'good', '锯末香'),
('wo008', '茶树（Tea Tree）', 'Tea Tree', '香气（Aroma）', '木质（Woody）', 'good', '茶树香'),
('wo009', '烟草（Tobacco）', 'Tobacco', '香气（Aroma）', '木质（Woody）', 'good', '果干、木质、甜香、草本、泥土、干叶、溶剂、薄荷、蜂蜜');

-- 泥土香气 (Earthy)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('ea001', '甜菜（Beet）', 'Beet', '香气（Aroma）', '泥土（Earthy）', 'good', '来源：土臭素'),
('ea002', '青椒（Bell Pepper）', 'Bell Pepper', '香气（Aroma）', '泥土（Earthy）', 'bad', '辣椒味。来源：受污染的酿造用水'),
('ea003', '堆肥（Compost）', 'Compost', '香气（Aroma）', '泥土（Earthy）', 'bad', '来源：受污染的酿造用水中微生物生长'),
('ea004', '土臭素（Geosmin）', 'Geosmin', '香气（Aroma）', '泥土（Earthy）', 'bad', '泥土、甜菜味'),
('ea005', '皮革（Leather）', 'Leather', '香气（Aroma）', '泥土（Earthy）', 'good', '来源：陈化'),
('ea006', '矿物质（Mineral）', 'Mineral', '香气（Aroma）', '泥土（Earthy）', 'good', '矿物质味'),
('ea007', '蘑菇（Mushroom）', 'Mushroom', '香气（Aroma）', '泥土（Earthy）', 'good', '霉味、罐头蘑菇'),
('ea008', '霉味（Musty）', 'Musty', '香气（Aroma）', '泥土（Earthy）', 'bad', '泥土、霉菌味'),
('ea009', '雨后泥土香（Petrichor）', 'Petrichor', '香气（Aroma）', '泥土（Earthy）', 'good', '长期干燥温暖天气后第一场雨带来的清新气味'),
('ea010', '泥土（Soil）', 'Soil', '香气（Aroma）', '泥土（Earthy）', 'good', '新翻泥土味');

-- 谷物香气 (Cereal/Bready/Malty)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('ce001', '谷物（Cereal）', 'Cereal', '香气（Aroma）', '谷物（Cereal）', 'good', '饼干、爆米花。来源：麦芽或酵母'),
('ce002', '麦圈（Cheerios）', 'Cheerios', '香气（Aroma）', '谷物（Cereal）', 'good', '来源：麦芽或酵母'),
('ce003', '玉米片（Corn Flakes）', 'Corn Flakes', '香气（Aroma）', '谷物（Cereal）', 'good', '来源：麦芽或酵母'),
('ce004', '葡萄坚果麦片（Grape Nuts）', 'Grape Nuts', '香气（Aroma）', '谷物（Cereal）', 'good', '来源：麦芽或酵母'),
('br001', '饼干（Biscuit）', 'Biscuit', '香气（Aroma）', '面包（Bready）', 'good', '谷物、爆米花。来源：麦芽或酵母'),
('br002', '面包皮（Bread Crust）', 'Bread Crust', '香气（Aroma）', '面包（Bready）', 'good', '来源：麦芽或酵母'),
('br003', '面团（Bread Dough）', 'Bread Dough', '香气（Aroma）', '面包（Bready）', 'good', '来源：麦芽或酵母'),
('br004', '玉米饼（Corn Tortilla）', 'Corn Tortilla', '香气（Aroma）', '面包（Bready）', 'good', '来源：麦芽或酵母'),
('br005', '生面团（Dough）', 'Dough', '香气（Aroma）', '面包（Bready）', 'good', '来源：麦芽或酵母'),
('br006', '派皮（Pie Crust）', 'Pie Crust', '香气（Aroma）', '面包（Bready）', 'good', '来源：麦芽或酵母'),
('br007', '培乐多（Play-Doh）', 'Play-Doh', '香气（Aroma）', '面包（Bready）', 'good', '来源：麦芽或酵母'),
('br008', '烤面包（Toasted Bread）', 'Toasted Bread', '香气（Aroma）', '面包（Bready）', 'good', '来源：麦芽或酵母'),
('br009', '酵母味（Yeasty）', 'Yeasty', '香气（Aroma）', '面包（Bready）', 'good', '发酵、硫味、面包味、新鲜酵母'),
('ma001', '麦芽味（Malty）', 'Malty', '香气（Aroma）', '麦芽（Malty）', 'good', '谷物、饼干、爆米花。来源：麦芽烘焙过程'),
('ma002', '谷粒（Grainy）', 'Grainy', '香气（Aroma）', '麦芽（Malty）', 'good', '玉米碎粒、青涩、粗糙、青麦芽特征'),
('ma003', '麦壳（Husky）', 'Husky', '香气（Aroma）', '麦芽（Malty）', 'good', '麦壳味'),
('ma004', '麦汁味（Worty）', 'Worty', '香气（Aroma）', '麦芽（Malty）', 'good', '麦汁味');

-- 坚果香气 (Nutty)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('nu001', '杏仁（Almond）', 'Almond', '香气（Aroma）', '坚果（Nutty）', 'good', '杏仁糖、樱桃。来源：氧化或陈化'),
('nu002', '榛子（Hazelnut）', 'Hazelnut', '香气（Aroma）', '坚果（Nutty）', 'good', '榛子香'),
('nu003', '花生酱（Peanut Butter）', 'Peanut Butter', '香气（Aroma）', '坚果（Nutty）', 'good', '花生酱香'),
('nu004', '南瓜籽（Pumpkin Seed）', 'Pumpkin Seed', '香气（Aroma）', '坚果（Nutty）', 'good', '南瓜籽香'),
('nu005', '芝麻（Sesame Seed）', 'Sesame Seed', '香气（Aroma）', '坚果（Nutty）', 'good', '芝麻香'),
('nu006', '葵花籽（Sunflower Seed）', 'Sunflower Seed', '香气（Aroma）', '坚果（Nutty）', 'good', '葵花籽香'),
('nu007', '核桃（Walnut）', 'Walnut', '香气（Aroma）', '坚果（Nutty）', 'good', '核桃香');

-- 烘烤香气 (Roasted)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('ro001', '烤焦吐司（Burnt Toast）', 'Burnt Toast', '香气（Aroma）', '烘烤（Roasted）', 'good', '烘烤或焦化麦芽味'),
('ro002', '巧克力（Chocolate）', 'Chocolate', '香气（Aroma）', '烘烤（Roasted）', 'good', '来源：烘烤或特种麦芽；美拉德反应'),
('ro003', '咖啡（Coffee）', 'Coffee', '香气（Aroma）', '烘烤（Roasted）', 'good', '来源：烘烤或特种麦芽；美拉德反应'),
('ro004', '烤大麦（Roasted Barley）', 'Roasted Barley', '香气（Aroma）', '烘烤（Roasted）', 'good', '来源：烘烤或特种麦芽；美拉德反应');

-- 甜香 (Sweet Aromatic)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('sw001', '红糖（Brown Sugar）', 'Brown Sugar', '香气（Aroma）', '甜香（Sweet Aromatic）', 'good', '马德拉酒或咖喱叶味'),
('sw002', '泡泡糖（Bubblegum）', 'Bubblegum', '香气（Aroma）', '甜香（Sweet Aromatic）', 'good', '菠萝、香蕉、果香、人工水果味'),
('sw003', '焦糖（Caramel）', 'Caramel', '香气（Aroma）', '甜香（Sweet Aromatic）', 'good', '来源：呋喃酮'),
('sw004', '棉花糖（Cotton Candy）', 'Cotton Candy', '香气（Aroma）', '甜香（Sweet Aromatic）', 'good', '来源：麦芽酚乙酯'),
('sw005', '丁酸乙酯（Ethyl Butyrate）', 'Ethyl Butyrate', '香气（Aroma）', '甜香（Sweet Aromatic）', 'good', '菠萝、泡泡糖、果香、人工水果味'),
('sw006', '蜂蜜（Honey）', 'Honey', '香气（Aroma）', '甜香（Sweet Aromatic）', 'good', '来源：大马士革酮'),
('sw007', '枫糖浆（Maple Syrup）', 'Maple Syrup', '香气（Aroma）', '甜香（Sweet Aromatic）', 'good', '枫糖浆香'),
('sw008', '棉花糖（Marshmallow）', 'Marshmallow', '香气（Aroma）', '甜香（Sweet Aromatic）', 'good', '棉花糖香'),
('sw009', '糖蜜（Molasses）', 'Molasses', '香气（Aroma）', '甜香（Sweet Aromatic）', 'good', '糖蜜香'),
('sw010', '太妃糖（Toffee）', 'Toffee', '香气（Aroma）', '甜香（Sweet Aromatic）', 'good', '太妃糖香'),
('sw011', '香草（Vanilla）', 'Vanilla', '香气（Aroma）', '甜香（Sweet Aromatic）', 'good', '来源：麦芽；陈化特征（尤其是桶陈）');

-- 双乙酰/乳脂 (Diacetyl)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('di001', '黄油（Butter）', 'Butter', '香气（Aroma）', '双乙酰（Diacetyl）', 'bad', '乳制品、酪乳、奶酪'),
('di002', '酪乳（Buttermilk）', 'Buttermilk', '香气（Aroma）', '双乙酰（Diacetyl）', 'bad', '乳制品、黄油、奶酪'),
('di003', '奶油糖（Butterscotch）', 'Butterscotch', '香气（Aroma）', '双乙酰（Diacetyl）', 'bad', '乳制品、黄油、焦糖、甜香'),
('di004', '乳制品（Dairy）', 'Dairy', '香气（Aroma）', '双乙酰（Diacetyl）', 'bad', '黄油、酪乳、奶酪'),
('di005', '酸奶（Yogurt）', 'Yogurt', '香气（Aroma）', '双乙酰（Diacetyl）', 'bad', '乳制品、黄油、酪乳、酸、奶酪、果香');

-- 烈酒香气 (Spirits)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('sr001', '杏仁利口酒（Amaretto）', 'Amaretto', '香气（Aroma）', '烈酒（Spirits）', 'good', '来源：酒精过高；酵母产生'),
('sr002', '白兰地（Brandy）', 'Brandy', '香气（Aroma）', '烈酒（Spirits）', 'good', '来源：麦芽；陈化特征（尤其是桶陈）'),
('sr003', '红葡萄酒（Red Wine）', 'Red Wine', '香气（Aroma）', '烈酒（Spirits）', 'good', '葡萄酒味'),
('sr004', '朗姆酒（Rum）', 'Rum', '香气（Aroma）', '烈酒（Spirits）', 'good', '焦糖味'),
('sr005', '雪利酒（Sherry）', 'Sherry', '香气（Aroma）', '烈酒（Spirits）', 'good', '来源：麦芽；陈化特征（尤其是桶陈）'),
('sr006', '龙舌兰（Tequila）', 'Tequila', '香气（Aroma）', '烈酒（Spirits）', 'good', '来源：麦芽；陈化特征（尤其是桶陈）'),
('sr007', '威士忌（Whisky）', 'Whisky', '香气（Aroma）', '烈酒（Spirits）', 'good', '来源：麦芽；陈化特征（尤其是桶陈）'),
('sr008', '白葡萄酒（White Wine）', 'White Wine', '香气（Aroma）', '烈酒（Spirits）', 'good', '白葡萄酒味');

-- 酚类 (Phenolic)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('ph001', '创可贴（Adhesive Bandage）', 'Adhesive Bandage', '香气（Aroma）', '酚类（Phenolic）', 'bad', '药味、泥土、马厩、塑料'),
('ph002', '烧橡胶（Burnt Rubber）', 'Burnt Rubber', '香气（Aroma）', '酚类（Phenolic）', 'bad', '药味、辛辣、丁香、焦味、烟熏'),
('ph003', '止咳糖浆（Cough Syrup）', 'Cough Syrup', '香气（Aroma）', '酚类（Phenolic）', 'bad', '止咳糖浆味'),
('ph004', '橡胶水管（Garden Hose）', 'Garden Hose', '香气（Aroma）', '酚类（Phenolic）', 'bad', '橡胶水管味'),
('ph005', '药味（Medicinal）', 'Medicinal', '香气（Aroma）', '酚类（Phenolic）', 'bad', '消毒水味'),
('ph006', '塑料（Plastic）', 'Plastic', '香气（Aroma）', '酚类（Phenolic）', 'bad', '药味'),
('ph007', '烟熏（Smoky）', 'Smoky', '香气（Aroma）', '酚类（Phenolic）', 'good', '酚类、药味、培根、香脂、焦味、木质'),
('ph008', '乙烯基（Vinyl）', 'Vinyl', '香气（Aroma）', '酚类（Phenolic）', 'bad', '乙烯基味');

-- 酒香酵母 (Brettanomyces)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('bt101', '马厩（Barnyard）', 'Barnyard', '香气（Aroma）', '酒香酵母（Brettanomyces）', 'bad', '药味、创可贴、泥土'),
('bt102', '玉米片（Corn Chip）', 'Corn Chip', '香气（Aroma）', '酒香酵母（Brettanomyces）', 'bad', '来源：酒香酵母用于发酵或作为污染'),
('bt103', '马毯（Horse Blanket）', 'Horse Blanket', '香气（Aroma）', '酒香酵母（Brettanomyces）', 'bad', '来源：酒香酵母用于发酵或作为污染'),
('bt104', '粪便（Manure/Fecal）', 'Manure/Fecal', '香气（Aroma）', '酒香酵母（Brettanomyces）', 'bad', '来源：酒香酵母用于发酵或作为污染'),
('bt105', '发霉/湿地下室（Musty/Damp）', 'Musty/Damp Basement', '香气（Aroma）', '酒香酵母（Brettanomyces）', 'bad', '潮湿地下室或葡萄酒木塞污染味'),
('bt106', '汗味（Sweaty）', 'Sweaty', '香气（Aroma）', '酒香酵母（Brettanomyces）', 'bad', '来源：酒香酵母用于发酵或作为污染');

-- 硫化物 (Sulfur)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('su001', '煮鸡蛋（Boiled Eggs）', 'Boiled Eggs', '香气（Aroma）', '硫化物（Sulfur）', 'bad', '硫化物味'),
('su002', '烧橡胶（Burnt Rubber）', 'Burnt Rubber', '香气（Aroma）', '硫化物（Sulfur）', 'bad', '来源：酵母代谢含硫氨基酸'),
('su003', '大蒜（Garlic）', 'Garlic', '香气（Aroma）', '硫化物（Sulfur）', 'bad', '来源：陈化酒花/酒花油'),
('su004', '硫化氢/臭鸡蛋（Hydrogen Sulfide）', 'Hydrogen Sulfide/H2S', '香气（Aroma）', '硫化物（Sulfur）', 'bad', '煮鸡蛋、烫发、湿狗味'),
('su005', '光臭/臭鼬（Lightstruck/Skunky）', 'Lightstruck/Skunky', '香气（Aroma）', '硫化物（Sulfur）', 'bad', '臭鼬、新煮咖啡、大麻味'),
('su006', '硫醇/下水道（Mercaptan）', 'Mercaptan', '香气（Aroma）', '硫化物（Sulfur）', 'bad', '下水道、煮鸡蛋、蔬菜、腐烂堆肥'),
('su007', '洋葱（Onion）', 'Onion', '香气（Aroma）', '硫化物（Sulfur）', 'bad', '煮洋葱'),
('su008', '划燃火柴（Struck Match）', 'Struck Match', '香气（Aroma）', '硫化物（Sulfur）', 'bad', '亚硫酸盐、焦味'),
('su009', '二氧化硫（Sulfur Dioxide/SO2）', 'Sulfur Dioxide/SO2', '香气（Aroma）', '硫化物（Sulfur）', 'bad', '划燃火柴、年轻白葡萄酒、窒息感');

-- 蔬菜味 (Vegetal)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('ve001', '罐头玉米（Canned Corn）', 'Canned Corn', '香气（Aroma）', '蔬菜（Vegetal）', 'bad', '来源：麦芽中S-甲基蛋氨酸形成DMS'),
('ve002', '煮白菜（Cooked Cabbage）', 'Cooked Cabbage', '香气（Aroma）', '蔬菜（Vegetal）', 'bad', '来源：DMS'),
('ve003', '煮洋葱（Cooked Onion）', 'Cooked Onion', '香气（Aroma）', '蔬菜（Vegetal）', 'bad', '来源：DMS'),
('ve004', '煮土豆（Cooked Potato）', 'Cooked Potato', '香气（Aroma）', '蔬菜（Vegetal）', 'bad', '来源：陈化'),
('ve005', '芹菜（Celery）', 'Celery', '香气（Aroma）', '蔬菜（Vegetal）', 'bad', '来源：月桂烯'),
('ve006', '二甲基硫醚/DMS（Dimethyl Sulfide）', 'DMS', '香气（Aroma）', '蔬菜（Vegetal）', 'bad', '罐头玉米、煮白菜、烤豆、黑橄榄、洋葱'),
('ve007', '四季豆（Green Beans）', 'Green Beans', '香气（Aroma）', '蔬菜（Vegetal）', 'bad', '四季豆味'),
('ve008', '番茄酱（Tomato Paste）', 'Tomato Paste', '香气（Aroma）', '蔬菜（Vegetal）', 'bad', '来源：DMS'),
('ve009', '番茄植株（Tomato Plant）', 'Tomato Plant', '香气（Aroma）', '蔬菜（Vegetal）', 'bad', '番茄植株味');

-- 氧化 (Oxidized)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('ox001', '纸板（Cardboard）', 'Cardboard', '香气（Aroma）', '氧化（Oxidized）', 'bad', '陈旧、纸味'),
('ox002', '灰尘（Dusty）', 'Dusty', '香气（Aroma）', '氧化（Oxidized）', 'bad', '灰尘味'),
('ox003', '皮革（Leather）', 'Leather', '香气（Aroma）', '氧化（Oxidized）', 'bad', '干草味'),
('ox004', '口红（Lipstick）', 'Lipstick', '香气（Aroma）', '氧化（Oxidized）', 'bad', '陈旧、蜡质'),
('ox005', '肉味（Meaty）', 'Meaty', '香气（Aroma）', '氧化（Oxidized）', 'bad', '肉味'),
('ox006', '老鼠味（Mousy）', 'Mousy', '香气（Aroma）', '氧化（Oxidized）', 'bad', '来源：2-乙酰四氢吡啶'),
('ox007', '纸味（Papery）', 'Papery', '香气（Aroma）', '氧化（Oxidized）', 'bad', '陈旧、纸板'),
('ox008', '陈旧（Stale）', 'Stale', '香气（Aroma）', '氧化（Oxidized）', 'bad', '来源：陈化'),
('ox009', '蜡质（Waxy）', 'Waxy', '香气（Aroma）', '氧化（Oxidized）', 'bad', '脂肪、植物油'),
('ox010', '湿狗（Wet Dog）', 'Wet Dog', '香气（Aroma）', '氧化（Oxidized）', 'bad', '湿狗味');

-- 丁酸/辛酸/异戊酸 (Acids)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('ac001', '婴儿呕吐物（Baby Vomit）', 'Baby Vomit', '香气（Aroma）', '丁酸（Butyric）', 'bad', '来源：糖化或储存过程中细菌产生'),
('ac002', '山羊味（Goaty）', 'Goaty', '香气（Aroma）', '辛酸（Caprylic）', 'bad', '蜡质、脂肪、植物油'),
('ac003', '奶酪味（Cheesy）', 'Cheesy', '香气（Aroma）', '异戊酸（Isovaleric）', 'bad', '汗袜、乳制品、陈旧');

-- 化学味 (Chemical)
INSERT INTO Flavor (id, name, nameEn, category, subCategory, type, description) VALUES
('ch001', '醋酸（Acetic Acid）', 'Acetic Acid', '香气（Aroma）', '化学（Chemical）', 'bad', '酸、醋、尖锐、溶剂'),
('ch002', '丙酮（Acetone）', 'Acetone', '香气（Aroma）', '化学（Chemical）', 'bad', '洗甲水'),
('ch003', '碱味（Alkaline）', 'Alkaline', '香气（Aroma）', '化学（Chemical）', 'bad', '烧碱、化学清洁剂'),
('ch004', '乙酸乙酯（Ethyl Acetate）', 'Ethyl Acetate', '香气（Aroma）', '化学（Chemical）', 'bad', '溶剂、果香'),
('ch005', '记号笔（Permanent Marker）', 'Permanent Marker', '香气（Aroma）', '化学（Chemical）', 'bad', '记号笔味'),
('ch006', '金属味（Metallic）', 'Metallic', '香气（Aroma）', '化学（Chemical）', 'bad', '铁、锈、血腥味'),
('ch007', '油漆稀释剂（Paint Thinner）', 'Paint Thinner', '香气（Aroma）', '化学（Chemical）', 'bad', '油漆稀释剂味'),
('ch008', '石油/柴油（Petroleum/Diesel）', 'Petroleum/Diesel', '香气（Aroma）', '化学（Chemical）', 'bad', '煤油味'),
('ch009', '溶剂（Solvent）', 'Solvent', '香气（Aroma）', '化学（Chemical）', 'bad', '来源：乙酸乙酯'),
('ch010', '醋（Vinegar）', 'Vinegar', '香气（Aroma）', '化学（Chemical）', 'bad', '来源：醋酸');

-- 用户表
CREATE TABLE IF NOT EXISTS User (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 清空用户表并创建管理员账号
DELETE FROM User;
INSERT INTO User (id, email, username, password, role) VALUES 
('admin1', 'admin@judgethebeer.com', 'Admin', 'admin123', 'admin');