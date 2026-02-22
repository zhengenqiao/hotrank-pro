#!/usr/bin/env node
/**
 * GitHub协作聊天监控程序
 * 实时监控GitHub Issues评论，实现即时沟通
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  repoOwner: 'zhengenqiao',
  repoName: 'hotrank-pro',
  issueNumber: 1,
  checkInterval: 30000, // 30秒检查一次
  lastCheckFile: path.join(__dirname, '.last-check-time'),
  token: process.env.GITHUB_TOKEN || ''
};

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// 获取上次检查时间
function getLastCheckTime() {
  try {
    if (fs.existsSync(CONFIG.lastCheckFile)) {
      const time = fs.readFileSync(CONFIG.lastCheckFile, 'utf8');
      return new Date(time);
    }
  } catch (e) {
    console.error('读取上次检查时间失败:', e.message);
  }
  // 默认1小时前
  return new Date(Date.now() - 3600000);
}

// 保存检查时间
function saveLastCheckTime() {
  try {
    fs.writeFileSync(CONFIG.lastCheckFile, new Date().toISOString());
  } catch (e) {
    console.error('保存检查时间失败:', e.message);
  }
}

// 发送HTTP请求
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'GitHub-Chat-Monitor',
        'Accept': 'application/vnd.github.v3+json',
        ...(CONFIG.token && { 'Authorization': `token ${CONFIG.token}` }),
        ...options.headers
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`解析响应失败: ${e.message}`));
        }
      });
    });
    
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('请求超时'));
    });
  });
}

// 获取Issue评论
async function getIssueComments() {
  const url = `https://api.github.com/repos/${CONFIG.repoOwner}/${CONFIG.repoName}/issues/${CONFIG.issueNumber}/comments`;
  return await makeRequest(url);
}

// 格式化时间
function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// 检查新消息
async function checkNewMessages() {
  const lastCheck = getLastCheckTime();
  const now = new Date();
  
  try {
    const comments = await getIssueComments();
    const newMessages = comments.filter(comment => {
      const commentTime = new Date(comment.created_at);
      return commentTime > lastCheck;
    });
    
    if (newMessages.length > 0) {
      console.log('\n' + '='.repeat(60));
      console.log(`${colors.bright}${colors.green}🔔 收到 ${newMessages.length} 条新消息！${colors.reset}`);
      console.log('='.repeat(60) + '\n');
      
      newMessages.forEach(msg => {
        const isYihan = msg.user.login === 'zhengenqiao' && msg.body.includes('艺涵');
        const isZheng = msg.user.login === 'zhengenqiao' && !msg.body.includes('艺涵') && !msg.body.includes('思远');
        const isSiyuan = msg.body.includes('思远') || msg.user.login !== 'zhengenqiao';
        
        let sender = '未知';
        let color = colors.reset;
        
        if (isYihan) {
          sender = '艺涵 (Win端)';
          color = colors.cyan;
        } else if (isSiyuan) {
          sender = '思远 (Mac端)';
          color = colors.green;
        } else if (isZheng) {
          sender = '老郑';
          color = colors.yellow;
        }
        
        console.log(`${color}[${formatTime(msg.created_at)}] ${sender}:${colors.reset}`);
        console.log('-'.repeat(50));
        console.log(msg.body);
        console.log('\n');
      });
      
      // 播放提示音（Mac）
      try {
        require('child_process').exec('afplay /System/Library/Sounds/Glass.aiff');
      } catch (e) {
        // 忽略音频错误
      }
    } else {
      process.stdout.write('.');
    }
    
    saveLastCheckTime();
    
  } catch (error) {
    console.error(`\n${colors.red}❌ 检查失败: ${error.message}${colors.reset}`);
  }
}

// 启动监控
function startMonitoring() {
  console.log(`${colors.bright}${colors.blue}🚀 GitHub协作聊天监控已启动${colors.reset}`);
  console.log(`${colors.blue}仓库: ${CONFIG.repoOwner}/${CONFIG.repoName}#${CONFIG.issueNumber}${colors.reset}`);
  console.log(`${colors.blue}检查间隔: ${CONFIG.checkInterval / 1000}秒${colors.reset}`);
  console.log(`${colors.blue}上次检查: ${formatTime(getLastCheckTime())}${colors.reset}\n`);
  console.log('监控中，按 Ctrl+C 停止...\n');
  
  // 立即检查一次
  checkNewMessages();
  
  // 定时检查
  setInterval(checkNewMessages, CONFIG.checkInterval);
}

// 主程序
if (require.main === module) {
  startMonitoring();
}

module.exports = { checkNewMessages, startMonitoring };
