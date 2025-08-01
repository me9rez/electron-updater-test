# electron-updater-test

一个用于测试 Electron 应用自动更新功能的示例项目。本项目演示了如何使用 `electron-updater` 库实现应用的自动更新机制，并配置了相关的构建和发布流程。

## 项目结构

```
├── .github/workflows/release.yml    # GitHub Actions 发布 workflow
├── electron/                         # Electron 主进程代码
│   ├── main.ts                       # 应用入口文件
│   ├── preload.ts                    # 预加载脚本
│   ├── updater.ts                    # 自动更新逻辑
│   └── util.ts                       # 工具函数
├── src/                              # 渲染进程代码
│   ├── App.tsx                       # 应用组件
│   └── index.tsx                     # 渲染入口
├── electron-builder.yml              # electron-builder 配置
├── .release-it.ts                    # release-it 配置
└── package.json                      # 项目依赖和脚本
```

## 功能特点

- 基于 Electron 构建的跨平台桌面应用
- 集成 `electron-updater` 实现自动更新功能
- 使用 rsbuild 构建前端资源
- 配置了 GitHub 发布流程
- 支持 Windows 平台打包

## 安装依赖

```bash
# 使用 pnpm 安装依赖
pnpm install
```

## 开发运行

```bash
# 启动开发服务器
pnpm dev

# 单独启动渲染进程
pnpm dev:renderer

# 单独启动主进程
pnpm dev:main
```

## 构建打包

```bash
# 构建前端资源
pnpm build

# 构建 Windows 安装包
pnpm build:win
```

## 自动更新机制

本项目使用 `electron-updater` 实现自动更新功能。更新逻辑位于 `electron/updater.ts` 文件中。主要流程包括：

1. 导入并配置 `autoUpdater`
2. 设置更新服务器地址 (在 electron-builder.yml 中配置)
3. 检查更新
4. 下载更新
5. 安装更新

### 配置更新源

更新源在 `electron-builder.yml` 中配置：

```yaml
publish:
  provider: github
  owner: 'me9rez'
  repo: 'electron-updater-test'
```

## 发布流程

项目使用 `release-it` 工具管理版本发布：

```bash
# 发布新版本
pnpm release
```

发布流程会：
1. 创建版本标签
2. 提交并推送更改
3. 触发 GitHub Actions 构建和发布

## 贡献指南

1. Fork 本仓库
2. 创建特性分支
3. 提交更改
4. 发起 Pull Request

## 许可证

本项目使用 MIT 许可证 - 详情见 [LICENSE](LICENSE) 文件。