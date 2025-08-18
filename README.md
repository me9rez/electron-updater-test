# electron-updater-test

一个用于测试 Electron 应用自动更新功能的完整示例项目。本项目详细演示了如何使用 `electron-updater` 库实现应用的自动更新机制，并提供了完整的构建、打包和发布流程配置。

## 技术栈

- **Electron**: 构建跨平台桌面应用
- **electron-updater**: 实现自动更新功能
- **rsbuild**: 构建前端资源
- **electron-builder**: 应用打包工具
- **release-it**: 版本管理和发布工具
- **TypeScript**: 提供类型安全的代码开发
- **GitHub Actions**: 自动化构建和发布流程

## 项目结构

```
├── .github/workflows/release.yml    # GitHub Actions 发布 workflow
├── .gitignore                       # Git 忽略文件配置
├── .npmrc                           # npm 配置文件
├── .release-it.ts                   # release-it 配置
├── LICENSE                          # 项目许可证
├── README.md                        # 项目文档
├── electron-builder.yml             # electron-builder 配置
├── electron/                        # Electron 主进程代码
│   ├── electron-env.d.ts            # Electron 环境类型定义
│   ├── main.ts                      # 应用入口文件
│   ├── preload.ts                   # 预加载脚本
│   ├── updater.ts                   # 自动更新逻辑
│   └── util.ts                      # 工具函数
├── index.html                       # 应用入口 HTML
├── package.json                     # 项目依赖和脚本
├── parallel.config.ts               # 并行任务配置
├── pnpm-lock.yaml                   # pnpm 依赖锁文件
├── pnpm-workspace.yaml              # pnpm 工作区配置
├── rsbuild.config.ts                # rsbuild 配置
├── src/                             # 渲染进程代码
│   ├── App.tsx                      # 应用组件
│   ├── env.d.ts                     # 环境类型定义
│   └── index.tsx                    # 渲染入口
├── tsconfig.app.json                # 应用 TypeScript 配置
├── tsconfig.json                    # 通用 TypeScript 配置
└── tsconfig.node.json               # Node.js TypeScript 配置
```

## 功能特点

- 基于 Electron 构建的跨平台桌面应用
- 完整的自动更新机制，支持更新检查、下载和安装
- 定时检查更新（每小时）和手动触发更新功能
- 使用 rsbuild 构建优化的前端资源
- 配置了 GitHub Actions 自动化发布流程
- 支持 Windows 平台打包
- 提供详细的日志记录功能
- 与渲染进程的更新状态通信机制

## 安装依赖

```bash
# 使用 pnpm 安装依赖
pnpm install
```

## 开发运行

```bash
# 同时启动渲染进程和主进程
pnpm dev

# 单独启动渲染进程
pnpm dev:renderer

# 单独启动主进程（需先启动渲染进程）
pnpm dev:main
```

## 构建打包

```bash
# 构建前端资源
pnpm build

# 构建 Windows 安装包
pnpm build:win
```

## 自动更新机制详解

本项目使用 `electron-updater` 实现自动更新功能，更新逻辑位于 `electron/updater.ts` 文件中。

### 更新流程

1. **初始化配置**：在应用启动时调用 `setupAutoUpdater()` 函数初始化更新器
2. **更新检查**：应用启动后延迟 5 秒进行首次更新检查，之后每小时自动检查一次
3. **更新通知**：当检测到更新时，通过 IPC 通信通知渲染进程
4. **更新下载**：用户确认后开始下载更新
5. **安装更新**：下载完成后提示用户安装更新

### 核心实现代码

```typescript
// electron/updater.ts 核心代码
import { autoUpdater } from 'electron-updater';
import { app, ipcMain, BrowserWindow } from 'electron';

export function setupAutoUpdater() {
    // 配置GitHub作为更新源
    autoUpdater.setFeedURL({ provider: 'github', repo: 'electron-updater-test', owner: 'me9rez' });
    
    // 禁用自动下载，通过UI控制更新流程
    autoUpdater.autoDownload = false;
    
    // 检查更新函数
    function checkForUpdates() {
        autoUpdater.checkForUpdates().catch((error) => {
            logger.error('Error checking for updates:', error);
        });
    }
    
    // 应用就绪后初始化更新检查
    app.whenReady().then(() => {
        // 延迟5秒检查，确保应用完全启动
        setTimeout(checkForUpdates, 5000);
        
        // 每小时定期检查更新
        setInterval(checkForUpdates, 60 * 60 * 1000);
    });
    
    // 更新事件处理
    autoUpdater.on('update-available', (info) => {
        // 通知所有窗口有更新可用
        allWindows.forEach((window) => {
            window.webContents.send('update-available', { version: info.version });
        });
    });
    
    // 其他事件处理...
}
```

### 配置更新源

更新源在 `electron-builder.yml` 中配置：

```yaml
publish:
  provider: github
  owner: 'me9rez'
  repo: 'electron-updater-test'
  private: false
```

## 发布流程

项目使用 `release-it` 工具管理版本发布：

```bash
# 发布新版本
pnpm release
```

### 发布流程详解

1. 自动增加版本号（遵循语义化版本规范）
2. 创建版本标签
3. 生成变更日志
4. 提交并推送更改到 GitHub
5. 触发 GitHub Actions 工作流
6. GitHub Actions 自动构建应用并发布到 GitHub Releases

## 测试更新功能

1. 确保应用已打包并发布到 GitHub Releases
2. 安装旧版本的应用
3. 启动应用，等待自动更新检查（或重启应用）
4. 当检测到更新时，应用会显示更新提示
5. 点击"更新"按钮下载并安装更新
6. 安装完成后，应用会重启并运行新版本

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 发起 Pull Request

## 许可证

本项目使用 MIT 许可证 - 详情见 [LICENSE](LICENSE) 文件。