# 云上小百花 · 李云霄艺术档案 V2.0.0

## 核心升级
V2.0 将“每日情报站”升级为五层全域资讯引擎：官方与本人、权威媒体、演出与节目、视频平台、戏迷社区。每日北京时间约 06:15 与 18:15 自动巡检，生成同源 `data/daily.json`，前端自动形成“今日云霄日报”。

## 部署
建议使用 GitHub 仓库连接 Cloudflare Pages。必须完整上传 `.github`、`functions`、`scripts`、`data` 等目录。GitHub Actions 需在 Settings → Actions → General 中启用 Read and write permissions。

## 更新保障
1. Cloudflare 同源 `/api/news` 实时聚合；
2. GitHub Actions 每日两次更新资料包；
3. 浏览器本机缓存；
4. 程序内置基础资料。

## 边界
系统保证每日巡检，不保证演员每天一定产生新事件。平台讨论仅作为公开线索，重要信息应打开原文核验。正式商业化前应取得肖像、剧照与相关内容授权。
