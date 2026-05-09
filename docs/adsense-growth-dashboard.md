# 勞工權益站成效追蹤與合法變現 Dashboard

最後更新：2026-05-09

## 追蹤原則

- 成長目標是提高內容品質、搜尋流量、工具完成率、回訪與合法廣告曝光。
- 不鼓勵、不暗示、不交換、不誘導使用者點擊廣告。
- GA4 不接收薪資、年資、到職日、公司名稱等敏感輸入。
- AdSense 通過前只保留合規占位；通過後採文章中段、文章底部、工具結果後方的保守投放。

## 每週 Dashboard

| 工具 | 指標 | 判讀 |
| --- | --- | --- |
| Search Console | 曝光、點擊、CTR、平均排名 | 優先處理高曝光低 CTR、排名 8-20 與已曝光但未收錄完整 topic cluster 的頁面 |
| Search Console | sitemap 狀態、探索但未建立索引、已檢索尚未建立索引 | 部署後確認 `/sitemap.xml` 成功讀取，並優先要求核心工具與新增長尾文章建立索引 |
| GA4 | tool_started、tool_completed | 檢查工具使用率與完成率，依 content_group 分析工具、文章、指南入口 |
| GA4 | content_scroll_depth_reached、scroll_mark | 觀察文章與指南 25/50/75/90% 閱讀深度，找出直接答案、表格或 FAQ 是否太晚出現 |
| GA4 | site_search_performed、site_search_result_clicked | 只追蹤查詢長度、結果數、是否有結果與點擊位置，不送出原始搜尋字串 |
| GA4 | content_shared、cta_clicked、tool_next_step_clicked | 評估分享、內部延伸閱讀與工具結果下一步，但不追蹤薪資、年資或日期輸入 |
| AdSense | Page RPM、曝光、可見率、政策中心 | 只做合法曝光品質優化，不以點擊誘導為目標 |

## 部署後 Search Console 操作

1. 到 Search Console 的 `twlabor.org` 網域資源。
2. 提交 sitemap：`https://twlabor.org/sitemap.xml`。
3. 用網址審查優先要求索引：
   - `https://twlabor.org/tools/salary`
   - `https://twlabor.org/tools/overtime`
   - `https://twlabor.org/tools/severance`
   - `https://twlabor.org/guides/salary`
   - `https://twlabor.org/guides/overtime`
   - `https://twlabor.org/guides/severance`
   - `https://twlabor.org/articles/salary-60000-take-home`
   - `https://twlabor.org/articles/overtime-4hours-calculation`
   - `https://twlabor.org/articles/severance-1year`
   - `https://twlabor.org/articles/severance-5years`
4. 24-72 小時後回看「網頁」報表，優先處理 `已檢索 - 尚未建立索引` 與 `探索 - 尚未建立索引`。

## GA4 自訂報表建議

建立一張「工具與內容品質」探索報表：

| 維度 | 指標 | 用途 |
| --- | --- | --- |
| page_path、content_group | 事件數、使用者 | 分辨文章、指南、工具入口表現 |
| event_name | 事件數 | 檢查 tool_started、tool_completed、tool_next_step_clicked 是否正常 |
| scroll_mark | 事件數 | 找出文章閱讀深度衰退點 |
| target、label | 事件數 | 檢查 CTA 與下一步連結是否有效 |

事件參數不得包含薪資、年資、生日、公司名稱、姓名、Email 等個資或敏感輸入。Newsletter 目前採 mailto 意圖，不把 Email 送到 GA4。

## AdSense 審核與投放檢查

- 廣告區塊必須清楚標示，不得與計算按鈕、分享按鈕、表單送出按鈕貼近。
- 不寫「支持我們請點廣告」「點擊廣告」等誘導文字。
- 通過前維持占位與政策合規；通過後優先文章中段、文章底部、工具結果後方的保守位置。
- 若政策中心警示或頁面體驗下降，先降低密度，再看 RPM。

## 優化流程

1. Search Console 找出高曝光低 CTR 頁面。
2. 補強直接答案、表格、FAQ、官方來源與相關工具 CTA。
3. 用 GA4 確認工具完成率與閱讀深度是否改善。
4. 若廣告影響閱讀或工具互動，先降低密度或移到文章底部。
5. 每次法規、費率、級距更新後，同步更新 `/sources` 與 sitemap lastModified。
6. 每次部署後執行 `npm run smoke:prod`，確認 ads.txt、robots.txt、sitemap、核心頁、schema、GA4 與 AdSense script 仍正常。
