import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'

// 保持窗口对象的全局引用，防止被垃圾回收
let mainWindow: BrowserWindow | null = null

function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    show: false, // 先不显示，等加载完成后再显示
  })

  // 加载应用
  if (process.env.VITE_DEV_SERVER_URL) {
    // 开发环境
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
    mainWindow.webContents.openDevTools()
  } else {
    // 生产环境
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  // 窗口准备好后显示
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show()
  })

  // 窗口关闭时清理引用
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// 应用准备就绪时创建窗口
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // macOS: 点击dock图标时重新创建窗口
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// 所有窗口关闭时退出应用
app.on('window-all-closed', () => {
  // macOS: 除非用户明确退出 (Cmd+Q)，否则保持应用运行
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// IPC通信示例
ipcMain.handle('get-app-version', () => {
  return app.getVersion()
})

ipcMain.handle('get-platform', () => {
  return process.platform
})

console.log('HotRank Pro Main Process Started')
