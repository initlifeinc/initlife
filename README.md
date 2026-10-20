# initlife 官网

initlife 品牌官网源码与部署文档。网站为无构建依赖的纯静态 HTML/CSS/JavaScript，生产环境由 Nginx 提供服务。

计划使用的 GitHub 仓库：<https://github.com/initlifeinc/initlife>

## 项目文档

- [项目分析与实施方案](docs/PROJECT_PLAN.md)
- [内容与资料清单](docs/CONTENT_INVENTORY.md)
- [部署说明](docs/DEPLOYMENT.md)

Linear 项目：[initlife 官网](https://linear.app/secretbankx/project/initlife-%E5%AE%98%E7%BD%91-aa980e8afd7d)

> 本仓库及未来发布的网站均按公开环境管理。禁止提交密码、API Key、访问令牌、证书、私钥、个人隐私或其他敏感信息。

## 三个站点

- `dist/`：个人数字名片，发布到 `https://initlife.com/`，中文 `/`、英文 `/en/`。
- `app-website/`：产品展示站 Git submodule，远程 `git@github.com:initlifeinc/app-website.git`，GitHub Pages 从该仓库 `main` 根目录发布到 `https://app.initlife.com/`。
- `secretbankx-website/`：SecretBankX 官网 Git submodule，远程 `git@github.com:initlifeinc/secretbankx-website.git`，GitHub Pages 从该仓库 `main` 根目录发布到 `https://secretbankx.initlife.com/`；保留独立的中英文页面、构建脚本与提交历史。

首次克隆使用 `git clone --recurse-submodules`；已有克隆执行 `git submodule update --init --recursive`。更新任一子站时，先在对应 submodule 内提交并推送，再在本仓库提交新的 submodule 指针。主站发布只上传 `dist/`，不包含子仓库源码与 Git 元数据。

## 本地预览

```bash
python3 -m http.server 4173 --directory dist
```

中文首页位于 `/`，英文首页位于 `/en/`。页头语言菜单会切换到对应地址，并保留“关于”或“记录”的锚点位置。

预览子站：

```bash
python3 -m http.server 4877 --directory app-website
python3 -m http.server 4878 --directory secretbankx-website
```
