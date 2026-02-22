# 🔥 HotRank Pro

> 跨境电商平台热销榜单工具 - 跨平台桌面应用

[![Electron](https://img.shields.io/badge/Electron-28+-blue.svg)](https://electronjs.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📋 项目简介

HotRank Pro 是一款专业的跨境电商平台热销榜单分析工具，支持 Amazon、SHEIN、TikTok Shop 等多个平台的数据抓取、分析和可视化展示。

### ✨ 核心功能

- 📊 **多平台榜单抓取** - Amazon / SHEIN / TikTok Shop
- 📈 **实时数据可视化** - 趋势图、热力图、排行榜
- 🔍 **历史数据检索** - 时间序列分析、价格追踪
- 📱 **跨平台支持** - Windows + macOS 双平台
- 💾 **本地数据存储** - SQLite 数据库，隐私安全
- 🚀 **自动更新** - 静默更新，持续迭代

---

## 🛠️ 技术栈

### 前端
- **React 18** - UI框架
- **TypeScript** - 类型安全
- **Ant Design** - 组件库
- **Tailwind CSS** - 样式工具
- **Recharts** - 数据可视化
- **Zustand** - 状态管理
- **React Query** - 数据获取

### 后端
- **Electron 28** - 跨平台框架
- **Node.js** - 运行时
- **better-sqlite3** - 本地数据库
- **Playwright** - 浏览器自动化
- **Axios** - HTTP请求

### 构建工具
- **Vite** - 构建工具
- **electron-builder** - 应用打包
- **TypeScript** - 类型检查
- **ESLint** - 代码规范

---

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 9+ 或 yarn 1.22+
- Git

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/yourname/hotrank-pro.git
cd hotrank-pro

# 安装依赖
npm install

# 安装Playwright浏览器
npx playwright install
```

### 开发模式

```bash
# 启动开发服务器
npm run dev
```

### 构建打包

```bash
# 构建所有平台
npm run build

# 仅构建macOS
npm run build:mac

# 仅构建Windows
npm run build:win
```

---

## 📁 项目结构

```
hotrank-pro/
├── src/
│   ├── main/                 # Electron主进程
│   │   ├── index.ts         # 入口文件
│   │   ├── database/        # 数据库操作
│   │   ├── scraper/         # 爬虫引擎
│   │   └── utils/           # 工具函数
│   ├── renderer/            # React前端
│   │   ├── components/      # 组件
│   │   ├── pages/          # 页面
│   │   ├── hooks/          # 自定义Hooks
│   │   ├── stores/         # 状态管理
│   │   └── utils/          # 工具函数
│   ├── shared/             # 共享代码
│   │   ├── types/          # TypeScript类型
│   │   ├── constants/      # 常量
│   │   └── utils/          # 通用工具
│   └── preload/            # 预加载脚本
├── docs/                   # 文档
├── scripts/                # 脚本工具
├── dist/                   # 构建输出
├── release/                # 打包输出
└── tests/                  # 测试文件
```

---

## 👥 团队协作

### Agent分工

| Agent | 平台 | 职责 |
|-------|------|------|
| **思远 (Siyuan)** | macOS | 架构设计、数据库、爬虫核心 |
| **艺涵 (Yihan)** | Windows | UI实现、Windows适配、测试 |

### 协作流程

1. **任务分配** - GitHub Issues
2. **代码开发** - Feature分支
3. **代码审查** - Pull Request
4. **集成测试** - develop分支
5. **发布上线** - main分支

### 沟通渠道

- 📋 项目文档: `/docs/`
- 🎯 任务看板: GitHub Projects
- 💬 技术讨论: GitHub Discussions
- 🐛 问题追踪: GitHub Issues

---

## 📊 数据库设计

### 核心表

```sql
-- 产品信息表
products (id, platform, asin_sku, name, category, ...)

-- 榜单数据表
rankings (id, product_id, rank_position, price, rating, ...)

-- 历史价格表
price_history (id, product_id, price, recorded_at)

-- 用户收藏表
favorites (id, product_id, notes, created_at)
```

详见: `/docs/database-schema.md`

---

## 🔌 API与数据源

### 支持平台

| 平台 | 数据源 | 状态 |
|------|--------|------|
| Amazon | Keepa API / 爬虫 | ✅ 已支持 |
| SHEIN | 网页抓取 | 🚧 开发中 |
| TikTok Shop | 官方API / 爬虫 | 🚧 开发中 |

### 第三方服务

- **Keepa API** - Amazon历史数据
- **Playwright** - 浏览器自动化
- **SQLite** - 本地数据存储

---

## 📝 开发计划

### Phase 1: MVP (2-3周)
- [x] 项目脚手架搭建
- [ ] Amazon Best Sellers抓取
- [ ] 基础榜单展示
- [ ] SQLite数据存储

### Phase 2: 核心功能 (3-4周)
- [ ] 多平台支持 (SHEIN + TikTok)
- [ ] 分类筛选系统
- [ ] 历史数据查询
- [ ] 数据导出功能

### Phase 3: 高级功能 (2-3周)
- [ ] 自动定时抓取
- [ ] 趋势预警通知
- [ ] 产品对比分析
- [ ] 收藏和标记

### Phase 4: 优化发布 (1-2周)
- [ ] 性能优化
- [ ] UI/UX优化
- [ ] 打包发布
- [ ] 文档完善

---

## 🤝 贡献指南

1. Fork 本仓库
2. 创建 Feature 分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

---

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证

---

## 🙏 致谢

- 思远 (Siyuan) - Mac端开发
- 艺涵 (Yihan) - Windows端开发

---

**项目状态**: 🚧 开发中  
**最后更新**: 2025-02-22  
**版本**: v1.0.0-alpha
