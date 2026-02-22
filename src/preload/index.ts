import { contextBridge, ipcRenderer } from 'electron'

// 暴露给渲染进程的API
contextBridge.exposeInMainWorld('electronAPI', {
  // 应用信息
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getPlatform: () => ipcRenderer.invoke('get-platform'),
  
  // 数据库操作 (后续添加)
  // database: {
  //   query: (sql: string, params?: any[]) => ipcRenderer.invoke('db-query', sql, params),
  //   execute: (sql: string, params?: any[]) => ipcRenderer.invoke('db-execute', sql, params),
  // },
  
  // 爬虫操作 (后续添加)
  // scraper: {
  //   start: (platform: string, options?: any) => ipcRenderer.invoke('scraper-start', platform, options),
  //   stop: () => ipcRenderer.invoke('scraper-stop'),
  // },
})

// 类型声明 (供TypeScript使用)
declare global {
  interface Window {
    electronAPI: {
      getAppVersion: () => Promise<string>
      getPlatform: () => Promise<string>
    }
  }
}
