# 云上小百花 · 李云霄艺术档案 V1.4.0

## 版本定位
中国大陆网络环境优先的非官方越剧艺术档案。V1.4.0 新增“每日云霄情报站”，采用三层资讯机制：Cloudflare Pages Function 实时聚合、GitHub Actions 每日生成资料包、本机缓存/内置资料回退。

## 部署
将本目录全部文件上传到 GitHub，并连接 Cloudflare Pages。Cloudflare Pages 会自动识别 `functions/api/news.js`，同源接口为 `/api/news`。若仅使用普通静态托管，实时接口不可用，但 `data/daily.json`、GitHub Actions 和缓存回退仍可工作。

## 每日自动更新
`.github/workflows/daily-news.yml` 每天北京时间约 06:15 运行，执行 `scripts/update-news.mjs`，更新 `data/daily.json` 并提交。仓库需允许 GitHub Actions 具有写权限；Cloudflare Pages 连接仓库后会自动重新部署。

## 重要边界
“每天更新”指每天执行信息巡检，不代表演员每天必然产生新事件。聚合线索须结合原文来源判断；程序不绕过平台登录、反爬或版权限制，也不采集私人账号评论。
