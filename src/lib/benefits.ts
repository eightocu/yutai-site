import rawData from "../data/shareholder_benefits_raw.json";

export type BenefitItem = {
  company_code: string;
  company_name: string;
  listed_market: string;
  industry: string;
  benefit_category: string;
  benefit_details: string;
  minimum_shares: string;
  record_month: string;
  stock_price: string;
  minimum_purchase_amount: string;
  total_yield_forecast: string;
  official_ir_url: string;
  updated_at: string;
  benefit_frequency?: string;
  company_overview?: string;
  benefit_intro_comment?: string;
  record_date?: string;
  usage_method?: string;
  change_history?: string;
  disclosure_url?: string;
  reference_url?: string;
  dividend_yield_forecast?: string;
  benefit_yield?: string;
  benefit_value?: string;
  long_term_holding_requirement?: string;
  forecast_dividend_yield?: string;
  forecast_total_yield?: string;
};

export type BenefitDetailRow = {
  text: string;
  type: "headline" | "period" | "subheading" | "condition" | "note" | "item";
};

export type BenefitDetailBlock = {
  label?: string;
  labelType?: "headline" | "period";
  rows: BenefitDetailRow[];
};

export type CategoryDefinition = {
  major: string;
  middle?: string;
  name: string;
};

export type CategoryNode = {
  level: "major" | "middle" | "small";
  name: string;
  major?: string;
  middle?: string;
};

const CATEGORY_DEFINITIONS: CategoryDefinition[] = [
  { major: "金券・ポイント", name: "QUOカード" },
  { major: "金券・ポイント", name: "ギフトカード" },
  { major: "金券・ポイント", name: "グルメカード" },
  { major: "金券・ポイント", name: "デジタルギフト" },
  { major: "金券・ポイント", name: "共通ポイント・電子マネー" },
  { major: "金券・ポイント", name: "自社サービスの優待ポイント" },
  { major: "金券・ポイント", name: "プレミアム優待ポイント" },
  { major: "金券・ポイント", name: "図書カード" },
  { major: "金券・ポイント", name: "おこめ券" },
  { major: "金券・ポイント", name: "暗号資産・仮想通貨" },
  { major: "割引券・優待券", middle: "日用品", name: "百貨店・スーパーの優待券" },
  { major: "割引券・優待券", middle: "日用品", name: "薬局・ドラッグストアの優待券" },
  { major: "割引券・優待券", middle: "日用品", name: "衣類・ファッション関連の優待券" },
  { major: "割引券・優待券", middle: "日用品", name: "家電関連の優待券" },
  { major: "割引券・優待券", middle: "日用品", name: "ホームセンターの優待券" },
  { major: "割引券・優待券", middle: "日用品", name: "美容関連の優待券" },
  { major: "割引券・優待券", middle: "日用品", name: "その他の日用品の優待券" },
  { major: "割引券・優待券", middle: "飲食/レストラン", name: "ファミレス" },
  { major: "割引券・優待券", middle: "飲食/レストラン", name: "焼肉・ハンバーグ店の優待券" },
  { major: "割引券・優待券", middle: "飲食/レストラン", name: "ファストフード・カフェの優待券" },
  { major: "割引券・優待券", middle: "飲食/レストラン", name: "居酒屋の優待券" },
  { major: "割引券・優待券", middle: "飲食/レストラン", name: "中華・ラーメン店の優待券" },
  { major: "割引券・優待券", middle: "飲食/レストラン", name: "その他の食事場所で使える優待券" },
  { major: "割引券・優待券", middle: "交通系", name: "乗り物の優待券" },
  { major: "割引券・優待券", middle: "旅行", name: "旅行に使える優待券" },
  { major: "割引券・優待券", middle: "旅行", name: "宿泊・ホテル関連の優待券" },
  { major: "割引券・優待券", middle: "娯楽", name: "遊園地・テーマパークの優待券" },
  { major: "割引券・優待券", middle: "娯楽", name: "カラオケ・ボウリングの優待券" },
  { major: "割引券・優待券", middle: "娯楽", name: "温泉・スーパー銭湯の優待券" },
  { major: "割引券・優待券", middle: "娯楽", name: "映画・演劇の優待券" },
  { major: "割引券・優待券", middle: "娯楽", name: "その他の娯楽施設で使える優待券" },
  { major: "割引券・優待券", middle: "スポーツ/運動", name: "ゴルフ関連の優待券" },
  { major: "割引券・優待券", middle: "スポーツ/運動", name: "フィットネスクラブの優待券" },
  { major: "割引券・優待券", middle: "スポーツ/運動", name: "その他スポーツ関連の優待券" },
  { major: "割引券・優待券", middle: "そのほか", name: "食品・飲料の優待券" },
  { major: "割引券・優待券", middle: "そのほか", name: "住宅関連の優待券" },
  { major: "割引券・優待券", middle: "そのほか", name: "医療・福祉関連の優待券" },
  { major: "割引券・優待券", middle: "そのほか", name: "教育関連の優待券" },
  { major: "割引券・優待券", middle: "そのほか", name: "その他の優待券・割引券" },
  { major: "飲食料品", name: "飲料" },
  { major: "飲食料品", name: "お米" },
  { major: "飲食料品", name: "麺類" },
  { major: "飲食料品", name: "お肉" },
  { major: "飲食料品", name: "お菓子" },
  { major: "飲食料品", name: "果物・フルーツ" },
  { major: "飲食料品", name: "野菜" },
  { major: "飲食料品", name: "魚介関連" },
  { major: "飲食料品", name: "調味料" },
  { major: "飲食料品", name: "健康食品・サプリ" },
  { major: "飲食料品", name: "飲食料品の詰め合わせ" },
  { major: "飲食料品", name: "その他の飲食料品" },
  { major: "日用品", name: "美容品・化粧品" },
  { major: "日用品", name: "家庭用品" },
  { major: "日用品", name: "紙製品" },
  { major: "日用品", name: "カレンダー" },
  { major: "日用品", name: "アクセサリー" },
  { major: "日用品", name: "文房具" },
  { major: "日用品", name: "日用品の詰め合わせ" },
  { major: "日用品", name: "その他の日用品・雑貨" },
  { major: "カタログギフト", name: "日用品中心のカタログギフト" },
  { major: "カタログギフト", name: "美容品中心のカタログギフト" },
  { major: "カタログギフト", name: "飲食料品中心のカタログギフト" },
  { major: "カタログギフト", name: "自社商品中心のカタログギフト" },
  { major: "カタログギフト", name: "総合カタログギフト" },
  { major: "カタログギフト", name: "種類が定まらないカタログギフト" },
  { major: "その他", name: "限定品" },
  { major: "その他", name: "資産・金融関連" },
  { major: "その他", name: "イベント招待・施設見学" },
  { major: "その他", name: "寄付・社会貢献" },
  { major: "その他", name: "カテゴリにはまらない優待" },
];

const CATEGORY_SLUG_OVERRIDES = new Map<string, string>([
  ["金券・ポイント", "kinken-pointo"],
  ["割引券・優待券", "waribiki-ken-yuutai-ken"],
  ["日用品", "nichiyou-hin"],
  ["飲食/レストラン", "inshoku-resutoran"],
  ["交通系", "koutsuu-kei"],
  ["旅行", "ryokou"],
  ["娯楽", "goraku"],
  ["スポーツ/運動", "supotsu-undou"],
  ["そのほか", "sono-hoka"],
  ["飲食料品", "inshokuryou-hin"],
  ["カタログギフト", "katarogu-gifuto"],
  ["その他", "sono-ta"],
  ["QUOカード", "quo-kado"],
  ["ギフトカード", "gifuto-kado"],
  ["グルメカード", "gurume-kado"],
  ["デジタルギフト", "dejitaru-gifuto"],
  ["共通ポイント・電子マネー", "kyoutsuu-pointo-denshi-mane"],
  ["自社サービスの優待ポイント", "jisha-sabisu-no-yuutai-pointo"],
  ["プレミアム優待ポイント", "puremiamu-yuutai-pointo"],
  ["図書カード", "tosho-kado"],
  ["おこめ券", "o-kome-ken"],
  ["暗号資産・仮想通貨", "angou-shisan-kasou-tsuuka"],
  ["百貨店・スーパーの優待券", "hyakka-ten-supa-no-yuutai-ken"],
  ["薬局・ドラッグストアの優待券", "yakkyoku-doraggusutoa-no-yuutai-ken"],
  ["衣類・ファッション関連の優待券", "irui-fasshon-kanren-no-yuutai-ken"],
  ["家電関連の優待券", "kaden-kanren-no-yuutai-ken"],
  ["ホームセンターの優待券", "homu-senta-no-yuutai-ken"],
  ["美容関連の優待券", "biyou-kanren-no-yuutai-ken"],
  ["その他の日用品の優待券", "sono-ta-no-nichiyou-hin-no-yuutai-ken"],
  ["ファミレス", "famiresu"],
  ["焼肉・ハンバーグ店の優待券", "yakiniku-hanbagu-ten-no-yuutai-ken"],
  ["ファストフード・カフェの優待券", "fasuto-fudo-kafe-no-yuutai-ken"],
  ["居酒屋の優待券", "izakaya-no-yuutai-ken"],
  ["中華・ラーメン店の優待券", "chuuka-ramen-ten-no-yuutai-ken"],
  ["その他の食事場所で使える優待券", "sono-ta-no-shokuji-basho-de-tsukaeru-yuutai-ken"],
  ["乗り物の優待券", "norimono-no-yuutai-ken"],
  ["旅行に使える優待券", "ryokou-ni-tsukaeru-yuutai-ken"],
  ["宿泊・ホテル関連の優待券", "shukuhaku-hoteru-kanren-no-yuutai-ken"],
  ["遊園地・テーマパークの優待券", "yuuen-chi-tema-paku-no-yuutai-ken"],
  ["カラオケ・ボウリングの優待券", "karaoke-bouringu-no-yuutai-ken"],
  ["温泉・スーパー銭湯の優待券", "onsen-supa-sentou-no-yuutai-ken"],
  ["映画・演劇の優待券", "eiga-engeki-no-yuutai-ken"],
  ["その他の娯楽施設で使える優待券", "sono-ta-no-goraku-shisetsu-de-tsukaeru-yuutai-ken"],
  ["ゴルフ関連の優待券", "gorufu-kanren-no-yuutai-ken"],
  ["フィットネスクラブの優待券", "fittonesu-kurabu-no-yuutai-ken"],
  ["その他スポーツ関連の優待券", "sono-ta-supotsu-kanren-no-yuutai-ken"],
  ["食品・飲料の優待券", "shokuhin-inryou-no-yuutai-ken"],
  ["住宅関連の優待券", "juutaku-kanren-no-yuutai-ken"],
  ["医療・福祉関連の優待券", "iryou-fukushi-kanren-no-yuutai-ken"],
  ["教育関連の優待券", "kyouiku-kanren-no-yuutai-ken"],
  ["その他の優待券・割引券", "sono-ta-no-yuutai-ken-waribiki-ken"],
  ["飲料", "inryou"],
  ["お米", "o-kome"],
  ["麺類", "menrui"],
  ["お肉", "o-niku"],
  ["お菓子", "o-kashi"],
  ["果物・フルーツ", "kudamono-furutsu"],
  ["野菜", "yasai"],
  ["魚介関連", "gyokai-kanren"],
  ["調味料", "choumi-ryou"],
  ["健康食品・サプリ", "kenkou-shokuhin-sapuri"],
  ["飲食料品の詰め合わせ", "inshokuryou-hin-no-tsumeawase"],
  ["その他の飲食料品", "sono-ta-no-inshokuryou-hin"],
  ["美容品・化粧品", "biyou-hin-keshou-hin"],
  ["家庭用品", "katei-you-hin"],
  ["紙製品", "kamisei-hin"],
  ["カレンダー", "karenda"],
  ["アクセサリー", "akusesari"],
  ["文房具", "bunbou-gu"],
  ["日用品の詰め合わせ", "nichiyou-hin-no-tsumeawase"],
  ["その他の日用品・雑貨", "sono-ta-no-nichiyou-hin-zakka"],
  ["日用品中心のカタログギフト", "nichiyou-hin-chuushin-no-katarogu-gifuto"],
  ["美容品中心のカタログギフト", "biyou-hin-chuushin-no-katarogu-gifuto"],
  ["飲食料品中心のカタログギフト", "inshokuryou-hin-chuushin-no-katarogu-gifuto"],
  ["自社商品中心のカタログギフト", "jisha-shouhin-chuushin-no-katarogu-gifuto"],
  ["総合カタログギフト", "sougou-katarogu-gifuto"],
  ["種類が定まらないカタログギフト", "shurui-ga-sadamara-nai-katarogu-gifuto"],
  ["限定品", "gentei-hin"],
  ["資産・金融関連", "shisan-kin-yuu-kanren"],
  ["イベント招待・施設見学", "ibento-shoutai-shisetsu-kengaku"],
  ["寄付・社会貢献", "kifu-shakai-kouken"],
  ["カテゴリにはまらない優待", "kategori-ni-hamara-nai-yuutai"],
]);

export function getCompanySlug(item: BenefitItem) {
  return item.company_code;
}

export function getAllBenefits(): BenefitItem[] {
  return rawData as unknown as BenefitItem[];
}

export function getBenefitBySlug(slug: string) {
  return getAllBenefits().find((item) => item.company_code === slug);
}

export function getCategories(item: BenefitItem): string[] {
  return (item.benefit_category || "")
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);
}

export function getAllCategories(): string[] {
  return Array.from(
    new Set(getAllBenefits().flatMap((item) => getCategories(item))),
  ).sort((a, b) => a.localeCompare(b, "ja"));
}

export function getAllCategoryNames(): string[] {
  return Array.from(
    new Set([
      ...CATEGORY_DEFINITIONS.map((definition) => definition.name),
      ...getAllCategories(),
    ]),
  ).sort((a, b) => a.localeCompare(b, "ja"));
}

export function getCategoryCounts() {
  const counts = new Map<string, number>();

  for (const item of getAllBenefits()) {
    for (const category of getCategories(item)) {
      counts.set(category, (counts.get(category) || 0) + 1);
    }
  }

  return counts;
}

export function slugifyCategory(category: string) {
  const normalized = category.trim();
  const overridden = CATEGORY_SLUG_OVERRIDES.get(normalized);

  if (overridden) {
    return overridden;
  }

  const ascii = normalized
    .toLowerCase()
    .replace(/[＆&]/g, " and ")
    .replace(/[・\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (ascii) {
    return ascii;
  }

  return `c-${Buffer.from(normalized, "utf8").toString("hex")}`;
}

export function getCategoryNodeSlug(node: CategoryNode) {
  if (node.level === "major") {
    return `major-${slugifyCategory(node.name)}`;
  }

  if (node.level === "middle") {
    return `middle-${slugifyCategory(node.major || "")}-${slugifyCategory(node.name)}`;
  }

  return slugifyCategory(node.name);
}

export function getCategoryNodeHref(node: CategoryNode) {
  if (node.level === "major") {
    return `/categories/major/${slugifyCategory(node.name)}/`;
  }

  if (node.level === "middle") {
    return `/categories/middle/${slugifyCategory(node.major || "")}/${slugifyCategory(node.name)}/`;
  }

  return `/categories/${slugifyCategory(node.name)}/`;
}

export function getCategoryDefinitionBySmallName(name: string) {
  return CATEGORY_DEFINITIONS.find((definition) => definition.name === name);
}

export function getMajorCategories() {
  return Array.from(new Set(CATEGORY_DEFINITIONS.map((definition) => definition.major))).map((major) => ({
    level: "major" as const,
    name: major,
    major,
  }));
}

export function getMiddleCategories() {
  const nodes = new Map<string, CategoryNode>();

  for (const definition of CATEGORY_DEFINITIONS) {
    if (!definition.middle) continue;

    const node: CategoryNode = {
      level: "middle",
      name: definition.middle,
      major: definition.major,
      middle: definition.middle,
    };
    nodes.set(`${definition.major}::${definition.middle}`, node);
  }

  return Array.from(nodes.values());
}

export function getMajorCategoryBySlug(slug: string) {
  return getMajorCategories().find((node) => slugifyCategory(node.name) === slug);
}

export function getMiddleCategoryBySlugs(majorSlug: string, middleSlug: string) {
  return getMiddleCategories().find(
    (node) =>
      slugifyCategory(node.major || "") === majorSlug &&
      slugifyCategory(node.name) === middleSlug,
  );
}

export function getCategoryNodesForItem(item: BenefitItem): CategoryNode[] {
  const nodes = new Map<string, CategoryNode>();

  for (const category of getCategories(item)) {
    const definition = getCategoryDefinitionBySmallName(category);

    if (definition) {
      const majorNode: CategoryNode = {
        level: "major",
        name: definition.major,
        major: definition.major,
      };
      nodes.set(getCategoryNodeSlug(majorNode), majorNode);

      if (definition.middle) {
        const middleNode: CategoryNode = {
          level: "middle",
          name: definition.middle,
          major: definition.major,
          middle: definition.middle,
        };
        nodes.set(getCategoryNodeSlug(middleNode), middleNode);
      }

      const smallNode: CategoryNode = {
        level: "small",
        name: definition.name,
        major: definition.major,
        middle: definition.middle,
      };
      nodes.set(getCategoryNodeSlug(smallNode), smallNode);
      continue;
    }

    const fallbackNode: CategoryNode = {
      level: "small",
      name: category,
    };
    nodes.set(getCategoryNodeSlug(fallbackNode), fallbackNode);
  }

  return Array.from(nodes.values()).sort((a, b) => {
    const order = { major: 0, middle: 1, small: 2 };
    return order[a.level] - order[b.level] || a.name.localeCompare(b.name, "ja");
  });
}

export function getAllCategoryNodes(): CategoryNode[] {
  const nodes = new Map<string, CategoryNode>();

  for (const definition of CATEGORY_DEFINITIONS) {
    const majorNode: CategoryNode = {
      level: "major",
      name: definition.major,
      major: definition.major,
    };
    nodes.set(getCategoryNodeSlug(majorNode), majorNode);

    if (definition.middle) {
      const middleNode: CategoryNode = {
        level: "middle",
        name: definition.middle,
        major: definition.major,
        middle: definition.middle,
      };
      nodes.set(getCategoryNodeSlug(middleNode), middleNode);
    }

    const smallNode: CategoryNode = {
      level: "small",
      name: definition.name,
      major: definition.major,
      middle: definition.middle,
    };
    nodes.set(getCategoryNodeSlug(smallNode), smallNode);
  }

  for (const category of getAllCategories()) {
    const smallNode: CategoryNode = {
      level: "small",
      name: category,
      major: getCategoryDefinitionBySmallName(category)?.major,
      middle: getCategoryDefinitionBySmallName(category)?.middle,
    };
    nodes.set(getCategoryNodeSlug(smallNode), smallNode);
  }

  return Array.from(nodes.values());
}

export function getCategoryBySlug(slug: string) {
  return getAllCategoryNames().find((category) => slugifyCategory(category) === slug);
}

export function getCategoryNodeBySlug(slug: string) {
  return getAllCategoryNodes().find((node) => getCategoryNodeSlug(node) === slug);
}

export function getBenefitsByCategory(category: string) {
  return getAllBenefits().filter((item) => getCategories(item).includes(category));
}

export function getBenefitsByCategoryNode(node: CategoryNode) {
  return getAllBenefits().filter((item) => {
    const itemNodes = getCategoryNodesForItem(item);
    return itemNodes.some((itemNode) => getCategoryNodeSlug(itemNode) === getCategoryNodeSlug(node));
  });
}

export function getCategoryGroup(category: string) {
  if (
    /QUO|ギフト|カード|おこめ券|ポイント|金券|電子マネー|デジタルギフト|プレミアム優待ポイント|共通ポイント/.test(
      category,
    )
  ) {
    return "金券・ポイント";
  }

  if (
    /飲食料品|飲料|お米|お菓子|お肉|野菜|果物|調味料|食品/.test(category)
  ) {
    return "食品・飲料";
  }

  if (/レストラン|ファストフード|カフェ|食事場所|ラーメン|ハンバーグ|焼肉|居酒屋|中華/.test(category)) {
    return "外食・食事券";
  }

  if (/宿泊|ホテル|旅行|温泉|レジャー|テーマパーク|遊園地|映画|演劇|娯楽施設|イベント/.test(category)) {
    return "宿泊・レジャー";
  }

  if (/日用品|雑貨|家庭用品|ホームセンター|文房具|住宅関連/.test(category)) {
    return "日用品・生活";
  }

  if (/美容|化粧品|衣類|ファッション|アクセサリー|健康食品|サプリ/.test(category)) {
    return "美容・ファッション";
  }

  if (/金融|資産|寄付|社会貢献/.test(category)) {
    return "金融・社会貢献";
  }

  if (/乗り物|交通|鉄道|航空|旅行に使える/.test(category)) {
    return "交通・移動";
  }

  if (/スポーツ|ゴルフ|フィットネス|教育/.test(category)) {
    return "スポーツ・学び";
  }

  return "その他";
}

export function getCategoryDefinitions() {
  return CATEGORY_DEFINITIONS;
}

export function formatPrice(value?: string) {
  if (!value) {
    return "-";
  }

  const digits = value.replace(/[^\d]/g, "");

  if (!digits) {
    return value;
  }

  return `¥${Number(digits).toLocaleString("ja-JP")}`;
}

function cleanText(value?: string) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .replace(/\s*\/\s*/g, " / ")
    .trim();
}

function getBenefitCommentMarker(text: string) {
  const markers = ["株主優待は、", "株主優待は", "優待内容は、", "優待内容は", "優待は、", "優待は"];

  for (const marker of markers) {
    const index = text.indexOf(marker);

    if (index >= 0) {
      return { index, marker };
    }
  }

  return null;
}

function joinJapaneseList(values: string[]) {
  if (values.length === 0) {
    return "";
  }

  if (values.length === 1) {
    return values[0];
  }

  if (values.length === 2) {
    return `${values[0]}と${values[1]}`;
  }

  return `${values.slice(0, -1).join("、")}、${values.at(-1)}`;
}

function stripBenefitRowPrefix(text: string) {
  return text
    .replace(/^◎\s*/, "")
    .replace(/^▼\s*/, "")
    .replace(/^【/, "")
    .replace(/】$/, "")
    .replace(/^＜/, "")
    .replace(/＞$/, "")
    .trim();
}

function hasValue(value?: string) {
  return cleanText(value) !== "";
}

function describeMetric(label: string, value?: string) {
  const text = cleanText(value);
  return text ? `${label}${text}` : "";
}

function getBenefitDetailHighlights(item: BenefitItem, maxItems = 8) {
  return parseBenefitDetails(item.benefit_details)
    .flatMap((block) => {
      const labels = block.label ? [stripBenefitRowPrefix(block.label)] : [];
      const rows = block.rows
        .filter((row) => row.type !== "note")
        .map((row) => stripBenefitRowPrefix(row.text))
        .filter((text) => text.length <= 48)
        .filter(Boolean);

      return [...labels, ...rows];
    })
    .filter(Boolean)
    .slice(0, maxItems);
}

const MANUAL_BENEFIT_INTRO_COMMENTS = new Map<string, string>([
  [
    "2337",
    [
      "いちごの株主優待は、金額換算しやすいQUOカードや買物券とは少し違って、Jリーグの試合を楽しめる体験型の内容になっているのが大きな特徴です。いちごはJリーグのトップパートナーで、地域とスポーツを通じたまちづくりを応援している企業でもあります。その取り組みがそのまま株主優待にもつながっていて、J1・J2・J3を含む全クラブ・全試合を対象にした抽選式の優待へ応募できます。",
      "この優待は、1株から応募権利を持てる点がまず目を引きます。最低取得額も比較的抑えやすく、優待投資を気軽に試してみたい人でも手を伸ばしやすい部類です。一方で、内容は「必ず何かが届く」タイプではなく、応募して当選した場合に観戦チケットを受け取れる仕組みです。そのため、一般的な優待のように額面で単純比較するよりも、サッカー観戦そのものを楽しみたいか、Jリーグに関心があるかという視点で見ると、この優待の魅力が自然に伝わってきます。",
      "公式の案内では、対象期末時点の株主を対象に、一定期間にわたって応募できる形が採られています。試合日ごとにJ1・J2・J3それぞれのリーグから応募できるため、観戦したい試合を選ぶ楽しさがある一方、抽選式であることはきちんと意識しておきたいところです。確実に受け取れる優待ではありませんが、そのぶん『好きなクラブの試合を見に行けるかもしれない』という期待感を含めて楽しむタイプの優待だといえます。",
      "いちごという会社自体も、不動産を軸にしながら地域活性化やサステナブルな社会づくりに力を入れている企業です。そうした会社の姿勢と、地域密着型のJリーグを応援する優待内容はかなり相性が良く、単なる販促的な優待というより、企業の考え方が伝わる制度として見ると印象が変わります。数字だけでお得さを測る優待ではないものの、サッカーが好きな人や、体験型の株主優待に魅力を感じる人には、かなり個性のある銘柄として映りそうです。",
      "実際に検討するときは、最新の応募期間や対象条件、抽選方法などを公式IRで確認しておくと安心です。それでも、少額から参加しやすく、企業カラーも感じやすい優待という意味では、いちごならではの面白さがある内容です。日用品の節約というより、好きな分野を株主優待を通じて楽しみたい人に向いた一銘柄として見ておくと、しっくりきやすいと思います。",
    ].join("\n\n"),
  ],
]);

function getUsageDescription(item: BenefitItem) {
  const usageMethod = cleanText(item.usage_method);

  if (usageMethod) {
    return `利用方法については、${usageMethod}と案内されています。対象サービスや細かな条件は、公式案内もあわせて確認しておきたいところです。`;
  }

  return "";
}

function buildExpandedBenefitIntroComment(item: BenefitItem, directComment: string) {
  const usageDescription = getUsageDescription(item);

  if (directComment) {
    return [
      directComment,
      usageDescription,
      "実際に取得を検討する際は、最新のIR資料や適時開示で、優待内容や条件の更新有無を確認しておくと安心です。",
    ]
      .filter(Boolean)
      .join("\n\n");
  }

  const categories = getCategories(item);
  const categoryText = categories.length > 0 ? categories.join(" / ") : "株主優待";
  const benefitValue = hasValue(item.benefit_value) ? formatPrice(item.benefit_value) : "";
  const minimumShares = cleanText(item.minimum_shares);
  const benefitYield = hasValue(item.benefit_yield) ? formatPercent(item.benefit_yield) : "";
  const dividendYield = hasValue(item.dividend_yield_forecast || item.forecast_dividend_yield)
    ? formatPercent(item.dividend_yield_forecast || item.forecast_dividend_yield)
    : "";
  const totalYield = hasValue(item.total_yield_forecast || item.forecast_total_yield)
    ? formatPercent(item.total_yield_forecast || item.forecast_total_yield)
    : "";
  const month = item.record_month || "未定";
  const recordDate = formatJapaneseDate(item.record_date);
  const frequency = item.benefit_frequency || "年1回";
  const longTerm = item.long_term_holding_requirement
    ? `${item.long_term_holding_requirement}が条件として設定されています。`
    : "";
  const detailHighlights = getBenefitDetailHighlights(item, 10);
  const conditionParts = [
    `権利確定月は${month}`,
    recordDate !== "-" ? `権利確定日は${recordDate}` : "",
    minimumShares ? `必要株数は${minimumShares}株` : "",
    frequency ? `実施回数は${frequency}` : "",
    describeMetric("優待の価値の目安は", benefitValue),
    describeMetric("優待利回りは", benefitYield),
    describeMetric("配当利回り（予想）は", dividendYield),
    describeMetric("総合利回り（予想）は", totalYield),
  ].filter(Boolean);
  const conditionSummary = conditionParts.join("、");

  const detailSummary = detailHighlights.length > 0
    ? `優待内容としては、${detailHighlights.join("、")}などの記載があります。細かな対象や株数条件は、公式案内とあわせて確認しておくと把握しやすくなります。`
    : `優待内容は${categoryText}に分類されるもので、具体的な対象や条件は公式資料で確認しておきたい内容です。`;

  const paragraphs = [
    `${item.company_name}の株主優待は、${categoryText}に分類される内容です。以下では、取得条件や優待内容の要点を整理しています。`,
    `${conditionSummary}が基本条件です。${longTerm}`,
    detailSummary,
    usageDescription,
    "実際に取得を検討する際は、最新のIR資料や適時開示で、優待内容や条件の更新有無を確認しておくと安心です。",
  ];

  return paragraphs.filter(Boolean).join("\n\n");
}

export function getCompanyOverviewSections(item: BenefitItem) {
  const companyOverview = cleanText(item.company_overview);
  const benefitIntroComment = cleanText(item.benefit_intro_comment);

  if (benefitIntroComment) {
    return {
      companyOverview,
      benefitComment: benefitIntroComment,
    };
  }

  const source = companyOverview;

  if (!source) {
    return {
      companyOverview: "",
      benefitComment: "",
    };
  }

  const marker = getBenefitCommentMarker(source);

  if (!marker) {
    return {
      companyOverview: source,
      benefitComment: "",
    };
  }

  return {
    companyOverview: source.slice(0, marker.index).trim(),
    benefitComment: source.slice(marker.index).trim(),
  };
}

export function getBenefitIntroComment(item: BenefitItem) {
  const manualComment = MANUAL_BENEFIT_INTRO_COMMENTS.get(item.company_code);

  if (manualComment) {
    return manualComment;
  }

  const directComment = cleanText(item.benefit_intro_comment);
  const { benefitComment } = getCompanyOverviewSections(item);
  const baseComment = directComment || benefitComment;

  return buildExpandedBenefitIntroComment(item, baseComment);
}

export function formatPercent(value?: string) {
  if (!value) {
    return "-";
  }

  const hasPercentSign = /[%％]/.test(value);
  const normalized = value.replace(/[%％,\s]/g, "");
  const number = Number(normalized);

  if (Number.isNaN(number)) {
    return value;
  }

  const percentValue = hasPercentSign ? number : number * 100;

  return `${percentValue.toFixed(2)}%`;
}

export function parsePercentValue(value?: string) {
  if (!value) {
    return null;
  }

  const hasPercentSign = /[%％]/.test(value);
  const normalized = value.replace(/[%％,\s]/g, "");
  const number = Number(normalized);

  if (Number.isNaN(number)) {
    return null;
  }

  return hasPercentSign ? number : number * 100;
}

export function formatJapaneseDate(value?: string) {
  if (!value) {
    return "-";
  }

  const match = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);

  if (!match) {
    return value;
  }

  const [, year, month, day] = match;

  return `${Number(year)}年${Number(month)}月${Number(day)}日`;
}

function classifyBenefitDetailRow(text: string): BenefitDetailRow["type"] {
  if (text.startsWith("◎")) {
    return "headline";
  }

  if (text.startsWith("▼")) {
    return "period";
  }

  if (/^＜.*＞$/.test(text)) {
    return "subheading";
  }

  if (/^【.*】$/.test(text)) {
    return "condition";
  }

  if (text.startsWith("※")) {
    return "note";
  }

  return "item";
}

export function parseBenefitDetails(value?: string): BenefitDetailBlock[] {
  if (!value) {
    return [];
  }

  const rows = value
    .split(/\s*\/\s*/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((text) => ({
      text,
      type: classifyBenefitDetailRow(text),
    }));

  const blocks: BenefitDetailBlock[] = [];
  let current: BenefitDetailBlock = { rows: [] };

  for (const row of rows) {
    if (row.type === "headline" || row.type === "period") {
      if (current.label || current.rows.length > 0) {
        blocks.push(current);
      }

      current = {
        label: row.text.replace(/^[◎▼]\s*/, "").replace(/\s*▼$/, ""),
        labelType: row.type,
        rows: [],
      };
      continue;
    }

    current.rows.push(row);
  }

  if (current.label || current.rows.length > 0) {
    blocks.push(current);
  }

  return blocks;
}
