# initlife 官网：部署说明

> 状态：环境已只读核验，尚未安装软件、修改配置或发布站点。  
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

- SSH 连接正常，目标目录已经存在且当前为空。
- 未发现正在运行的 Nginx、Caddy 或 Apache。
- 服务器 80 端口当前由 `/root/workspace/app/SecretBankX/app.py` 的 Python 进程占用。
- `firewalld` 当前未启用；云安全组状态无法仅从服务器内部确认。
- 未发现已安装的 Certbot。
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

`current` 指向当前生效版本。新版本先完整上传至独立 release 目录，通过切换符号链接发布；回滚时切回上一个 release。

## 5. 凭证与敏感信息

- 不在源码、构建产物、服务器网站目录或 Git 历史中保存密钥、Token、Cookie、私钥或用户数据。
- SSH 私钥保留在本地安全位置，不复制进仓库。
- 服务器配置如需要秘密，只保存在受限权限的服务器配置或专用 Secrets 中。
- 前端可读取的任何值都视为公开信息，不能通过构建时环境变量“隐藏”秘密。
- 部署日志不得输出凭证或完整敏感配置。

## 6. 正式部署前置条件

1. 网站构建产物已经完成本地验证。
2. 确认现有 SecretBankX Python 服务对应的域名、端口调整和保活方式。
3. 安装并配置统一 Web 服务/反向代理。
4. 阿里云安全组放行 80 和 443。
5. 网站所有者完成 `initlife.com` DNS 解析。
6. 外部 DNS 解析验证通过后申请 HTTPS 证书。
7. 验证 HTTP 跳转、HTTPS、静态资源、404、缓存策略和现有服务均正常。
8. 记录发布版本与回滚方法。
