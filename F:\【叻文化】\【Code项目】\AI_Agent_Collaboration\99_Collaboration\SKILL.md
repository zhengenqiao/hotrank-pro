---
name: "ai-agent-collaboration"
description: "Facilitates seamless collaboration between multiple AI Agents (e.g., Siyuan on Mac and Yihan on Windows) on complex tasks. Invoke when the user needs to coordinate work between different AI Agents, manage cross-platform development, or streamline multi-agent communication."
---

# AI Agent Collaboration Skill

This skill provides a structured framework for multiple AI Agents to collaborate effectively on shared projects, particularly in cross-platform development scenarios.

## 快速开始

### Agent角色定义
- **Agent A (思远)**: macOS specialist, architecture design
- **Agent B (艺涵)**: Windows specialist, UI implementation
- **User**: Project owner, decision maker

### 核心工作流程

#### 1. 任务分配
```markdown
## Task Assignment

**From**: [Agent Name]
**To**: [Agent Name]
**Priority**: High/Medium/Low

### Task Details
- **Objective**: 任务目标
- **Requirements**: 技术要求
- **Deliverables**: 交付物
- **Deadline**: 截止日期
```

#### 2. 进度更新
```markdown
## Progress Update

**Agent**: [Name]
**Task**: [Task ID]
**Status**: In Progress/Completed/Blocked
**Completion**: XX%

### Completed
- [x] 已完成项

### In Progress
- [ ] 进行中项

### Blocked/Issues
- 遇到的问题
```

#### 3. 文件同步策略
**推荐**: GitHub Repository
- 统一使用UTF-8编码
- 避免共享文件夹的编码问题
- 版本控制更清晰

### 沟通渠道
1. **项目文档**: `/docs/project-status.md`
2. **任务看板**: `/docs/task-board.md`
3. **技术讨论**: `/docs/tech-discussions.md`

### 代码协作规范
```
/shared          # 共享代码
  /types/        # TypeScript类型
  /utils/        # 工具函数
  /constants/    # 常量配置

/platform        # 平台特定代码
  /mac/          # macOS代码
  /win/          # Windows代码
```

---

## 💡 使用示例

### 示例1: 任务交接
```
思远完成任务 → 更新状态 → 创建交接文档
→ 艺涵Review → 开始工作 → 进度更新
```

### 示例2: 问题解决
```
艺涵发现问题 → 记录问题 → 思远建议方案
→ User决策 → 实施解决 → 验证完成
```

---

## 📋 当前项目: HotRank Pro

### 分工
**思远 (Mac)**:
- 搭建Electron+React脚手架
- 设计数据库Schema
- 编写核心爬虫逻辑

**艺涵 (Win)**:
- 配置Windows开发环境
- 实现Windows特定UI
- 测试Playwright兼容性

### 协作方式
1. 使用GitHub同步代码
2. GitHub Issues分配任务
3. Pull Request代码Review
4. Markdown文档沟通

---

**版本**: 1.0
**创建时间**: 2025-02-22
**维护者**: 思远 & 艺涵
