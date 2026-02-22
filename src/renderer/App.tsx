import { useEffect, useState } from 'react'
import { Layout, Menu, theme, Typography, Tag, Space } from 'antd'
import {
  DashboardOutlined,
  BarChartOutlined,
  HistoryOutlined,
  SettingOutlined,
  GithubOutlined,
} from '@ant-design/icons'

const { Header, Sider, Content } = Layout
const { Title, Text } = Typography

function App() {
  const [platform, setPlatform] = useState<string>('')
  const [version, setVersion] = useState<string>('')
  const [collapsed, setCollapsed] = useState(false)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  useEffect(() => {
    // 获取系统信息
    if (window.electronAPI) {
      window.electronAPI.getPlatform().then(setPlatform)
      window.electronAPI.getAppVersion().then(setVersion)
    }
  }, [])

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘',
    },
    {
      key: 'rankings',
      icon: <BarChartOutlined />,
      label: '榜单浏览',
    },
    {
      key: 'history',
      icon: <HistoryOutlined />,
      label: '历史数据',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 侧边栏 */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="dark"
        style={{
          background: '#1e293b',
        }}
      >
        <div className="p-4 text-center">
          <Title level={4} style={{ color: '#f8fafc', margin: 0 }}>
            {collapsed ? 'HR' : 'HotRank Pro'}
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={menuItems}
          style={{
            background: '#1e293b',
          }}
        />
      </Sider>

      {/* 主内容区 */}
      <Layout>
        {/* 顶部栏 */}
        <Header
          style={{
            padding: '0 24px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Space>
            <Text strong style={{ fontSize: 18 }}>
              跨境电商平台热销榜单工具
            </Text>
            <Tag color="blue">v{version || '1.0.0'}</Tag>
          </Space>
          <Space>
            <Tag color="default">{platform || 'unknown'}</Tag>
            <a
              href="https://github.com/yourname/hotrank-pro"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubOutlined style={{ fontSize: 20, color: '#64748b' }} />
            </a>
          </Space>
        </Header>

        {/* 内容区 */}
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div className="text-center py-20">
            <Title level={2} style={{ color: '#3b82f6' }}>
              🚀 HotRank Pro
            </Title>
            <Text style={{ fontSize: 16, color: '#94a3b8' }}>
              专业的跨境电商平台热销榜单分析工具
            </Text>
            <div className="mt-8">
              <Space direction="vertical" size="large">
                <Text>支持平台：</Text>
                <Space>
                  <Tag color="orange">Amazon</Tag>
                  <Tag color="pink">SHEIN</Tag>
                  <Tag color="cyan">TikTok Shop</Tag>
                </Space>
              </Space>
            </div>
            <div className="mt-8">
              <Text type="secondary">
                正在开发中... 敬请期待
              </Text>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
