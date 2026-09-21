# initlife 官网开发指南

## 产品与内容

- initlife 是独立软件工作室；页面文案应克制、清晰、可靠，优先说清真实产品能力而非堆砌口号。
- SecretBankX 是本地优先的重要资料管理工具；只有已确认的功能、平台和产品截图可以作为事实展示。
- 嘟惠修面向打印机、电脑等维修服务：普通用户可提单、查单，维修师傅可登录并跟进服务流程。
- 不发布虚构的用户评价、下载量、评分、合作关系或社交账号。没有真实账号时，展示“即将上线”而不是伪造链接。
- 联系入口默认仅保留全局页头和页脚；隐私/条款中的联系条款不受此限制。

## 页面与视觉

- 站点是纯静态文件，发布内容位于 `dist/`；首页、Blog 列表、文章页必须保持可直接访问。
- 视觉方向延续 Readdle/Craft 式的明亮留白、强层级排版、圆角柔和表面与克制的蓝色强调；避免密集卡片和无意义装饰。
- 顶部导航由 `dist/assets/site.js` 的 `[data-site-header]` 统一挂载。新增页面必须使用 `<header class="site-header" data-header data-site-header></header>`，不得复制另一份导航。
- 产品菜单箭头使用 CSS chevron；保持固定容器与中心旋转，不换回 Unicode 字符箭头。
- 真实 App 图标和截图优先于自制替代图；所有可见图片都需要准确的 `alt` 文案。

## 性能与资产

- 位图按最大 CSS 展示尺寸的约 2× 输出；截图默认 JPEG 质量 90，除非透明度确有必要。
- 不把原始大图放进 `dist/`。本地临时原图位于 `archive/original-images-2026-09-21/`，已忽略且不发布。
- 修改资源后检查所有引用路径，并用本地 HTTP 服务和浏览器确认图片、Blog 路由与语言切换可用。

## 发布与安全

- 正式分支是 `main`；提交并推送后，使用原子 release 发布到 `root@aliyun_server:/root/workspace/initlife_website/releases/<commit-short-sha>`，再切换 `current` 符号链接。
- 不覆盖旧 release，不在前端、Git 历史或部署目录写入密钥、令牌、私密邮箱正文或用户数据。
- 本次或后续发布不要修改 Nginx，除非需求明确要求；发布后检查 `nginx -t` 和 `initlife.com` 的页面、静态资源响应。
