/**
 * Electron 应用自动更新模块
 * 负责处理应用的更新检查、下载和安装流程
 * 提供与渲染进程的通信接口
 */
import { autoUpdater } from 'electron-updater';
import { app, ipcMain, BrowserWindow } from 'electron';

/**
 * 简单的日志工具
 * 用于记录更新过程中的信息和错误
 */
const logger = {
    info: (message: string) => console.log(`[INFO] ${message}`),
    error: (message: string, error?: any) => console.error(`[ERROR] ${message}`, error)
};

// 配置自动更新
/**
 * 配置并初始化自动更新功能
 * @returns {{ checkForUpdates: Function }} - 包含检查更新方法的对象
 */
export function setupAutoUpdater() {

    
    // 配置GitHub作为更新源
    // provider: 更新源提供者（这里使用GitHub）
    // repo: 仓库名称
    // owner: 仓库所有者
    autoUpdater.setFeedURL({ provider: 'github', repo: 'electron-updater-test', owner: 'me9rez' });

    // 获取所有打开的窗口引用
    const allWindows = BrowserWindow.getAllWindows()

    // 日志设置
    // 可选：如果需要更详细的日志，可以取消注释下面这行
    // autoUpdater.logger = logger;

    // 禁用自动下载，以便我们可以通过UI控制更新流程
    autoUpdater.autoDownload = false;

    /**
     * 检查是否有可用更新
     * 该函数会被定时调用，也可以通过暴露的方法手动调用
     */
    function checkForUpdates() {
        logger.info('Checking for updates...');
        autoUpdater.checkForUpdates().catch((error) => {
            logger.error('Error checking for updates:', error);
        });
    }

    // 应用就绪后初始化更新检查
    app.whenReady().then(() => {
        // 延迟检查，确保应用完全启动
        // 延迟5秒检查，确保应用完全启动
        setTimeout(checkForUpdates, 5000);

        // 每小时定期检查更新
        setInterval(checkForUpdates, 60 * 60 * 1000);
    });

    // 更新事件处理
    /**
     * 当检测到有可用更新时触发
     * @param {Object} info - 更新信息对象，包含版本号等
     */
    autoUpdater.on('update-available', (info) => {
        logger.info(`Update available: version ${info.version}`);
        // 通知所有窗口有更新可用
        // 通知所有窗口有更新可用
        // 通知所有窗口更新错误
        // 通知所有窗口下载进度
        // 通知所有窗口更新已下载
        allWindows.forEach((window) => {
            window.webContents.send('update-available', { version: info.version });
        });
    });

    /**
     * 当检测到没有可用更新时触发
     */
    autoUpdater.on('update-not-available', () => {
        logger.info('No update available');
    });

    /**
     * 当更新过程中发生错误时触发
     * @param {Error} error - 错误对象
     */
    autoUpdater.on('error', (error) => {
        logger.error('Update error:', error);
        // 通知所有窗口更新错误
        allWindows.forEach((window) => {
            window.webContents.send('update-error', { message: error.message });
        });
    });

    /**
     * 当更新下载进度变化时触发
     * @param {Object} progress - 进度对象，包含百分比、已传输和总大小
     */
    autoUpdater.on('download-progress', (progress) => {
        // 通知所有窗口下载进度
        allWindows.forEach((window) => {
            window.webContents.send('update-progress', {
                percent: progress.percent,
                transferred: progress.transferred,
                total: progress.total
            });
        });
    });

    /**
     * 当更新下载完成时触发
     * @param {Object} info - 更新信息对象
     */
    autoUpdater.on('update-downloaded', (info) => {
        logger.info(`Update downloaded: version ${info.version}`);
        // 通知所有窗口更新已下载
        allWindows.forEach((window) => {
            window.webContents.send('update-downloaded', { version: info.version });
        });
    });

    // IPC事件监听 - 从渲染进程接收更新相关命令
    /**
     * 监听渲染进程的下载更新请求
     * 当用户确认下载更新时触发
     */
    ipcMain.on('download-update', () => {
        logger.info('Starting download update...');
        autoUpdater.downloadUpdate().catch((error) => {
            logger.error('Error downloading update:', error);
        });
    });

    /**
     * 监听渲染进程的安装更新请求
     * 当用户确认安装更新时触发
     */
    ipcMain.on('install-update', () => {
        logger.info('Installing update...');
        autoUpdater.quitAndInstall();
    });

    // 暴露检查更新的方法供外部调用
    return {
        checkForUpdates
    };
}