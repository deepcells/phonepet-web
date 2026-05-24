# 口袋喵 官网 (phonepet-web)

iOS 应用「口袋喵 (PhonePet)」的官方网站。纯静态 HTML/CSS，零依赖、零构建。

## 目录结构

```
.
├── index.html              # 首页
├── privacy.html            # 隐私政策（路由 /privacy）
├── terms.html              # 服务条款（路由 /terms）
├── assets/
│   └── styles.css          # 共享样式
└── staticwebapp.config.json # Azure Static Web Apps 配置（路由 + 安全 headers）
```

## 本地预览

任意静态服务器即可。比如：

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

如果要在本地验证 `staticwebapp.config.json`（路由 / 重写 / headers），用官方 CLI：

```bash
npm install -g @azure/static-web-apps-cli
swa start .
# 访问 http://localhost:4280
```

## 部署到 Azure Static Web Apps

### 一次性准备

1. 把这个目录 push 到一个 GitHub 仓库（推荐仓库名：`phonepet-web`）
2. 登录 [Azure Portal](https://portal.azure.com/)，搜索「Static Web Apps」→ 创建
3. 关键填写：
   - **部署源**：GitHub → 选刚才那个仓库 → branch `main`
   - **构建预设**：`Custom`
   - **App location**：`/`
   - **Api location**：留空
   - **Output location**：留空（因为是纯静态，不需要构建）
4. 创建完成后，Azure 会自动在你的仓库里生成 `.github/workflows/azure-static-web-apps-*.yml`，后续每次 push 到 main 都会自动部署

### 自定义域名

1. Azure Portal → 你的 Static Web App → **Custom domains** → Add
2. 按提示在域名注册商处加 CNAME / TXT 记录
3. SSL 证书 Azure 自动签发

### 部署后检查清单

- [ ] 访问根 URL，首页正常加载
- [ ] 访问 `/privacy` 和 `/terms`，路由重写正常（不应该出现 404）
- [ ] 浏览器 DevTools 看 Response Headers，确认 `X-Content-Type-Options`、`Strict-Transport-Security` 等已生效
- [ ] 手机上打开看一下，响应式 OK
- [ ] App Store 链接已替换成真实链接（搜代码里的 `idTODO`）

## 上架前 TODO

- [ ] `index.html`：把 App Store `href="https://apps.apple.com/app/idTODO"` 换成真实链接
- [ ] 如果换了联系邮箱，全局搜 `pedwardsun@gmail.com` 替换
- [ ] App Store Connect 后台填写：
  - 隐私政策 URL → `https://<your-domain>/privacy`
  - 服务条款（EULA）URL → `https://<your-domain>/terms`

## 设计原则

- **零依赖、零构建**：保证十年后依然能跑
- **响应式优先**：手机访问占主流
- **稳定第一**：和 iOS 主仓库 CLAUDE.md 同一套优先级
