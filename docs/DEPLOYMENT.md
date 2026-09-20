# initlife 官网：部署说明

> 状态：HTTP 部署完成，等待 DNS 生效后配置 HTTPS。
>
> 核验日期：2026-09-20

## 1. 已确认的部署目标

- SSH：`root@aliyun_server`
- 操作系统：Alibaba Cloud Linux 3
- 网站文件目录：`/root/workspace/initlife_website`
- 正式域名：`initlife.com`
- GitHub 源码仓库：`https://github.com/initlifeinc/initlife`
- DNS：由网站所有者在阿里云侧将 `initlife.com` 指向服务器
- 服务器配置、HTTPS 和站点发布：由开发侧完成
- Nginx 读取路径：`/var/www/initlife`，由 `/root/workspace/initlife_website` 只读绑定挂载；发布文件仍只维护在约定的 `/root/workspace/initlife_website` 下

## 2. 当前服务器状态

- SSH 连接正常。
- Nginx 1.24.0 已安装、启用并监听公网 80 端口。
- 当前发布版本位于 `/root/workspace/initlife_website/releases/2309c7a`。
- `/root/workspace/initlife_website/current` 使用相对符号链接指向当前版本。
- `/var/www/initlife` 是网站根目录的只读 bind mount，供 Nginx 读取。
- 原 SecretBankX Echo API 已调整为仅监听 `127.0.0.1:8080`，由 Nginx 默认虚拟主机代理。
- `firewalld` 当前未启用；云安全组状态无法仅从服务器内部确认。
- 尚未安装证书工具或启用 443，等待真实 DNS 生效后处理。
- 服务器网卡显示内网地址；公网地址和 DNS 生效结果以上线时的外部检查为准。

## 3. 部署设计约束

- 不直接覆盖或停止现有 SecretBankX 服务，除非上线前明确确认其迁移方式。
- 因 80 端口已有服务，正式部署需要先引入统一反向代理，再按域名转发现有服务并托管 initlife 静态站点。
- `/root` 目录不会为了 Nginx 放宽权限；使用只读 bind mount 将网站目录暴露给 Nginx。
- `initlife.com` 与 `www.initlife.com` 的取舍、跳转规则在 DNS 配置时确认。
- DNS 生效且 80/443 可从公网访问后，再申请并启用 HTTPS 证书。
- HTTP 应跳转到 HTTPS；证书续期应自动化。
- 发布过程应支持原子切换与快速回滚，避免直接在当前版本目录中逐文件覆盖。

## 4. 建议的服务器目录

```text
/root/workspace/initlife_website/
├── releases/
│   └── <release-id>/
├── current -> releases/<release-id>
└── shared/
```

`current` 使用相对链接指向当前生效版本。新版本先完整上传至独立 release 目录，通过切换符号链接发布；回滚时切回上一个 release。

## 5. 当前服务拓扑

```text
公网 :80
└── nginx.service
    ├── Host: initlife.com / www.initlife.com
    │   └── /var/www/initlife/current（只读静态文件）
    └── 默认主机 / IP 访问
        └── 127.0.0.1:8080
            └── secretbankx-echo.service
```

没有新增 Node.js、Python 应用或数据库服务；官网本身只有静态文件。

## 6. 凭证与敏感信息

- 不在源码、构建产物、服务器网站目录或 Git 历史中保存密钥、Token、Cookie、私钥或用户数据。
- SSH 私钥保留在本地安全位置，不复制进仓库。
- 服务器配置如需要秘密，只保存在受限权限的服务器配置或专用 Secrets 中。
- 前端可读取的任何值都视为公开信息，不能通过构建时环境变量“隐藏”秘密。
- 部署日志不得输出凭证或完整敏感配置。

## 7. DNS 与 HTTPS 待办

1. 网站所有者将 `initlife.com` 指向服务器公网地址。
2. 确认是否同时配置 `www.initlife.com`；若不使用，则从证书和 Nginx 配置中移除。
3. 确认阿里云安全组放行 443。
4. 外部 DNS 验证通过后申请 HTTPS 证书并配置自动续期。
5. 将 HTTP 永久跳转到 HTTPS。
6. 验证 HTTPS、静态资源、404、安全响应头和原有 API 均正常。

## 8. 本次服务器修改范围

- 安装软件包：`nginx`、`nginx-filesystem`、`alinux-logos-httpd`。
- 新增：`/etc/nginx/conf.d/initlife.conf`。
- 修改：`/etc/nginx/nginx.conf`；原文件备份为 `/etc/nginx/nginx.conf.before-initlife`。
- 新增：`/etc/systemd/system/secretbankx-echo.service.d/proxy.conf`。
- 备份：`/etc/systemd/system/secretbankx-echo.service.before-initlife`。
- 新增：`/etc/systemd/system/var-www-initlife.mount`。
- 新增并启用服务：`nginx.service`、`var-www-initlife.mount`。
- 调整现有服务：`secretbankx-echo.service` 从 `0.0.0.0:80` 改为 `127.0.0.1:8080`，服务代码未修改。
- 发布目录：`/root/workspace/initlife_website/releases/2309c7a`（当前），旧版本保留在 `releases/` 下用于回滚。
- 当前版本链接：`/root/workspace/initlife_website/current -> releases/2309c7a`。
- 新增只读挂载点：`/var/www/initlife`。
