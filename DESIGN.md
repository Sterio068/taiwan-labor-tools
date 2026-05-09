---
name: "台灣勞工權益工具站"
description: "冷靜、精準、可查核的台灣勞工權益工具介面"
colors:
  brand-50: "#EFF6FF"
  brand-100: "#DBEAFE"
  brand-500: "#2563EB"
  brand-600: "#1D4ED8"
  brand-700: "#1E40AF"
  accent-50: "#ECFDF5"
  accent-500: "#10B981"
  warning-50: "#FFFBEB"
  warning-500: "#F59E0B"
  danger-50: "#FEF2F2"
  danger-500: "#EF4444"
  surface: "#FEFFFF"
  canvas: "#F8FAFC"
  panel-muted: "#F1F5F9"
  border: "#E2E8F0"
  text-muted: "#64748B"
  text: "#0F172A"
typography:
  display:
    fontFamily: "Inter, Noto Sans TC, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 1.1
  headline:
    fontFamily: "Inter, Noto Sans TC, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1.15
  title:
    fontFamily: "Inter, Noto Sans TC, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.35
  body:
    fontFamily: "Noto Sans TC, Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Noto Sans TC, Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  tag: "8px"
  input: "10px"
  button: "12px"
  card: "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.brand-500}"
    textColor: "{colors.surface}"
    rounded: "{rounded.button}"
    padding: "12px 24px"
    typography: "{typography.label}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.brand-600}"
    rounded: "{rounded.button}"
    padding: "10px 24px"
    typography: "{typography.label}"
  input-field:
    backgroundColor: "{colors.panel-muted}"
    textColor: "{colors.text}"
    rounded: "{rounded.input}"
    padding: "10px 16px"
    typography: "{typography.body}"
  card-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.card}"
    padding: "24px"
---

# Design System: 台灣勞工權益工具站

## 1. Overview

**Creative North Star: "Public-Service Ledger"**

這套介面應該像一份乾淨的公共服務帳冊：答案清楚、數字可信、路徑可追。使用者可能正在確認薪資、離職、加班或保險問題，情緒不一定輕鬆；畫面要降低焦慮，不製造聲量。

這是 product surface。設計服務工具任務與內容查核，不追求華麗的品牌表演。它拒絕誘導點擊的廣告站、法律恐嚇頁、過度行銷的 SaaS landing page、暗色金融儀表板、紫藍漸層 AI 工具頁、玻璃擬態卡片與浮誇英雄區。

**Key Characteristics:**
- restrained, functional, high-trust
- calculator-first, content-supported
- clear hierarchy, compact enough for repeat use
- official-source oriented, privacy conservative

## 2. Colors

調色策略是 Restrained：冷靜藍作為主動作與當前狀態，綠色只用於正向結果，琥珀與紅色保留給警示與危險。

### Primary
- **Civic Blue** (`brand-500`, `brand-600`, `brand-700`): 用於主要 CTA、目前選取狀態、可互動重點與可信任的官方感。
- **Blue Wash** (`brand-50`, `brand-100`): 用於工具提示、重點答案、非侵入式 CTA 背景。

### Secondary
- **Assurance Green** (`accent-500`, `accent-50`): 只用於正向結果、合法完成、成功狀態，不用來裝飾普通卡片。

### Tertiary
- **Caution Amber** (`warning-500`, `warning-50`): 用於資料限制、更新提醒、須留意的法規情境。
- **Violation Red** (`danger-500`, `danger-50`): 用於扣款、風險、錯誤與明確違法警示。

### Neutral
- **Paper Surface** (`surface`): 卡片、表單與主要內容面。禁止使用純白。
- **Soft Canvas** (`canvas`): 頁面底色，讓工具面板有足夠層次。
- **Ledger Ink** (`text`): 主要文字，不使用純黑。
- **Muted Slate** (`text-muted`, `border`, `panel-muted`): 次要資訊、邊框、分隔與輸入底色。

### Named Rules
**The Blue Is Action Rule.** 藍色只服務主要動作、選取狀態與可查核路徑，不拿來灑滿整頁。

**The No Ad-Glow Rule.** 廣告周圍不得使用吸睛色、箭頭、動態或強提示文案。

## 3. Typography

**Display Font:** Inter with Noto Sans TC fallback  
**Body Font:** Noto Sans TC with Inter fallback  
**Label/Mono Font:** Same sans stack

**Character:** 字體應該像公部門資料與現代工具的交會，清楚、穩定、無花俏筆觸。數字要醒目但不變成英雄式炫耀。

### Hierarchy
- **Display** (800, 3rem, 1.1): 首頁或重要工具頁標題，少量使用。
- **Headline** (800, 2.25rem, 1.15): 主要頁面 H1 與大型區塊標題。
- **Title** (700, 1.25rem, 1.35): 卡片標題、工具結果區、文章小節。
- **Body** (400, 1rem, 1.7): 長文、說明、FAQ。正文行長控制在 65 至 75ch。
- **Label** (600, 0.875rem, 1.4): 表單標籤、按鈕、分類 chips、表頭。

### Named Rules
**The Answer First Rule.** 標題下第一段必須直接回答使用者問題，不重述標題。

## 4. Elevation

系統以 tonal layering 為主，輕陰影為輔。靜態卡片可以有低陰影，但懸浮陰影只用於可點擊卡片與工具入口，避免把內容變成廣告感卡片牆。

### Shadow Vocabulary
- **Card Rest** (`0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)`): 主要卡片與工具面板。
- **Card Hover** (`0 10px 25px rgba(15, 23, 42, 0.1)`): 只用於可點擊卡片。
- **Bottom Navigation Lift** (`0 -2px 12px rgba(15, 23, 42, 0.06)`): 手機底部導航。

### Named Rules
**The Lift Means Click Rule.** 如果元素不可點擊，不要在 hover 或常態上做強陰影。

## 5. Components

### Buttons
- **Shape:** 穩定圓角 (`12px`)。
- **Primary:** Civic Blue 背景、Paper Surface 文字、粗體標籤，最小高度 44px。
- **Hover / Focus:** hover 加深一階藍色；focus 使用藍色 ring，不使用彈跳或大位移。
- **Secondary / Ghost:** Paper Surface 背景、Civic Blue 文字、細邊框。用於次要動作，不與 primary 搶主導。

### Chips
- **Style:** `8px` 圓角，分類 chips 用淡藍底與深藍字。
- **State:** selected 使用 brand-500 背景；未選取 chips 必須保留邊框，避免像普通文字。

### Cards / Containers
- **Corner Style:** 卡片維持 `16px`，工具內部輔助區可用 `12px`。
- **Background:** Paper Surface 或 Soft Canvas，避免純白與純黑。
- **Shadow Strategy:** 只有可點擊卡片使用 hover shadow。
- **Border:** 資訊卡使用 `border-slate-200`，法規重點可用淡藍或淡琥珀完整邊框。
- **Internal Padding:** 一般卡片 `24px`，密集工具結果 `16px`。

### Inputs / Fields
- **Style:** 淡灰藍底、細邊框、`10px` 圓角。
- **Focus:** 背景轉 Paper Surface，品牌藍邊框與淡藍 ring。
- **Error / Disabled:** error 用 danger token，disabled 降低透明度並保持標籤可讀。

### Navigation
- **Desktop:** sticky top nav，白紙感半透明背景，連結小尺寸但觸控區足夠。
- **Mobile:** bottom nav 保持 5 個高頻入口，圖示與文字並列，避免漢堡菜單藏住工具。
- **Search:** command palette 是工作流捷徑，不是行銷搜尋框。結果點擊要快速關閉。

### Signature Component
**Calculator Result Panel:** 結果先以大數字呈現，下一層放明細表，再放雇主成本或下一步建議。大數字不是裝飾，它必須接著給公式、依據與可複製摘要。

## 6. Do's and Don'ts

### Do:
- **Do** 把工具結果、公式與官方來源放在同一個任務流裡。
- **Do** 使用 Civic Blue 表示主要動作與可查核路徑。
- **Do** 讓手機上的輸入、按鈕與 chips 達到 44px 以上觸控高度。
- **Do** 在法規、費率、級距更新時同步更新 `/sources`、sitemap 與頁面最後更新日期。
- **Do** 用完整邊框或淡底色處理 callout，不用粗側邊條。

### Don't:
- **Don't** 做誘導點擊的廣告站效果，包含箭頭指向廣告、近距離放置廣告與工具按鈕、或暗示點擊廣告支持本站。
- **Don't** 使用法律恐嚇頁語氣、過度行銷的 SaaS landing page、暗色金融儀表板、紫藍漸層 AI 工具頁、玻璃擬態卡片或浮誇英雄區。
- **Don't** 使用 gradient text、粗側邊條 callout、裝飾性 blur glass、彈跳動效。
- **Don't** 把每個區塊都做成同尺寸 icon card grid。只有工具入口、文章列表、比較入口需要卡片。
- **Don't** 在 GA4 或第三方工具送出薪資、年資、日期、公司名稱或完整搜尋文字。
