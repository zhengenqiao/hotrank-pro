#!/bin/bash

# GitHub仓库监控脚本
# 用于检查Issues和Pull Requests的更新

REPO="zhengenqiao/hotrank-pro"
LAST_CHECK_FILE="/tmp/github_last_check"

# 获取当前时间
CURRENT_TIME=$(date +%s)

# 如果没有上次检查记录，设置为1小时前
if [ ! -f "$LAST_CHECK_FILE" ]; then
    echo $((CURRENT_TIME - 3600)) > "$LAST_CHECK_FILE"
fi

LAST_CHECK=$(cat "$LAST_CHECK_FILE")

# 检查新Issues
echo "🔍 检查GitHub仓库更新..."
echo "仓库: $REPO"
echo "上次检查: $(date -r $LAST_CHECK '+%Y-%m-%d %H:%M:%S')"
echo ""

# 使用GitHub API检查Issues
# 注意：需要设置GITHUB_TOKEN环境变量
if [ -n "$GITHUB_TOKEN" ]; then
    # 获取最近更新的Issues
    curl -s -H "Authorization: token $GITHUB_TOKEN" \
         "https://api.github.com/repos/$REPO/issues?since=$(date -r $LAST_CHECK -u +%Y-%m-%dT%H:%M:%SZ)" | \
         jq -r '.[] | select(.created_at > "'$(date -r $LAST_CHECK -u +%Y-%m-%dT%H:%M:%SZ)'") | "📋 Issue #\(.number): \(.title) - \(.user.login)"'
    
    # 获取最近更新的Pull Requests
    curl -s -H "Authorization: token $GITHUB_TOKEN" \
         "https://api.github.com/repos/$REPO/pulls?since=$(date -r $LAST_CHECK -u +%Y-%m-%dT%H:%M:%SZ)" | \
         jq -r '.[] | select(.created_at > "'$(date -r $LAST_CHECK -u +%Y-%m-%dT%H:%M:%SZ)'") | "🔀 PR #\(.number): \(.title) - \(.user.login)"'
else
    echo "⚠️  未设置GITHUB_TOKEN环境变量"
    echo "请设置: export GITHUB_TOKEN=your_token"
fi

# 更新检查时间
echo $CURRENT_TIME > "$LAST_CHECK_FILE"

echo ""
echo "✅ 检查完成: $(date '+%Y-%m-%d %H:%M:%S')"
