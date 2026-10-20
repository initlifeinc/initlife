# initlife 官网

initlife 品牌官网源码与部署文档。网站为无构建依赖的纯静态 HTML/CSS/JavaScript，生产环境由 Nginx 提供服务。

计划使用的 GitHub 仓库：<https://github.com/initlifeinc/initlife>

## 项目文档

- [项目分析与实施方案](docs/PROJECT_PLAN.md)
- [内容与资料清单](docs/CONTENT_INVENTORY.md)
- [部署说明](docs/DEPLOYMENT.md)

Linear 项目：[initlife 官网](https://linear.app/secretbankx/project/initlife-%E5%AE%98%E7%BD%91-aa980e8afd7d)

> 本仓库及未来发布的网站均按公开环境管理。禁止提交密码、API Key、访问令牌、证书、私钥、个人隐私或其他敏感信息。

## 个人数字名片预览

`codex/personal-digital-card` 分支将 `/` 与 `/en/` 改为中英文单页个人名片。页面以「用 AI 重新定义数字生活 / Reimagining digital life with AI」为核心，主入口链接到 `https://app.initlife.com/`，保留留言邮箱与两项备案链接。旧产品展示仍保留在 `app_webpage` 分支。

此版本仅准备页面，尚未部署或配置子域名。2026-10-21 检查 `app.initlife.com` 时 HTTPS 主机名与证书不匹配；正式切换前须完成产品站托管、域名绑定与证书验证。保留的 Blog、文章、隐私与条款路径仍可直接访问。

## 本地预览

```bash
python3 -m http.server 4173 --directory dist
```
