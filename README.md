# initlife 官网

initlife 品牌官网源码与部署文档。网站为无构建依赖的纯静态 HTML/CSS/JavaScript，生产环境由 Nginx 提供服务。

计划使用的 GitHub 仓库：<https://github.com/initlifeinc/initlife>

## 项目文档

- [项目分析与实施方案](docs/PROJECT_PLAN.md)
- [内容与资料清单](docs/CONTENT_INVENTORY.md)
- [部署说明](docs/DEPLOYMENT.md)

Linear 项目：[initlife 官网](https://linear.app/secretbankx/project/initlife-%E5%AE%98%E7%BD%91-aa980e8afd7d)

> 本仓库及未来发布的网站均按公开环境管理。禁止提交密码、API Key、访问令牌、证书、私钥、个人隐私或其他敏感信息。

## 本地预览

```bash
python3 -m http.server 4173 --directory dist
```
