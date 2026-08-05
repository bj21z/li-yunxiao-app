# V1.4.0 每日云霄情报站版发布说明

## 升级重点
- 新增“每日云霄情报站”：分类筛选、关键词搜索、来源等级、近7日统计、收藏及信息源雷达。
- 新增 Cloudflare Pages 同源实时聚合接口，使用多组关键词抓取公开新闻 RSS 并去重。
- 新增 GitHub Actions 每日自动巡检和更新资料包。
- 建立“实时接口 → 每日资料包 → 本机缓存 → 基础资料”四级回退。
- 明确区分权威/一手来源与公开线索，避免把未核实内容写成事实。

## 修改文件
- `index.html`：新增每日情报站、日报底部导航，资源版本升级为1.4.0。
- `app.js`：新增聚合读取、筛选、搜索、统计、收藏、来源雷达与四级回退。
- `styles.css`：新增情报站完整视觉、移动端与深色模式样式。
- `sw.js`：缓存升级并纳入每日资料包，JSON采用网络优先。
- `manifest.webmanifest`：同步版本信息。
- `README.md`：新增部署、自动更新与边界说明。
- `RELEASE_NOTES.md`：本发布记录。

## 新增文件
- `data/daily.json`：每日核验/聚合资料包。
- `functions/api/news.js`：Cloudflare Pages实时同源聚合接口。
- `scripts/update-news.mjs`：无密钥新闻更新脚本。
- `.github/workflows/daily-news.yml`：每日定时自动更新工作流。

## 删除文件
无。

## 上传方式
必须全量替换。仅替换 `index.html` 无法启用实时接口、自动更新及新缓存机制。

## 测试
- HTML关键节点与资源版本：通过
- JavaScript语法：通过
- JSON格式：通过
- Cloudflare Function模块语法：通过
- GitHub Actions YAML结构：通过
- ZIP完整性：通过

## 已知限制
- Cloudflare Pages Function 仅在Cloudflare Pages部署时生效。
- GitHub Actions需开启仓库工作流写权限。
- 新闻源可能调整RSS、防爬或文章链接；系统会自动回退，但无法承诺第三方源永久可用。
- 每天自动检查不等于每天一定有真实新动态。

## 回滚
保留V1.3.0完整包；出现问题时删除新版文件并全量上传V1.3.0，再清除站点缓存或更新Service Worker。
