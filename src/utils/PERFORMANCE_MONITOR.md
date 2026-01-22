# 前端性能监控使用说明

## 功能特性

本性能监控系统提供了全面的前端性能监控能力，包括：

### 1. Web Vitals 核心指标
- **FCP (First Contentful Paint)**: 首次内容绘制时间
- **LCP (Largest Contentful Paint)**: 最大内容绘制时间
- **FID (First Input Delay)**: 首次输入延迟
- **CLS (Cumulative Layout Shift)**: 累积布局偏移

### 2. 页面性能指标
- DNS 查询时间
- TCP 连接时间
- SSL 握手时间
- TTFB (Time to First Byte)
- DOM 解析时间
- 页面加载时间
- 白屏时间
- DOM Ready 时间

### 3. 资源加载监控
- 监控所有资源（JS、CSS、图片、字体等）的加载时间
- 资源大小
- 资源类型分类

### 4. 错误监控
- JavaScript 运行时错误
- Promise 未捕获错误
- 资源加载错误（图片、脚本、样式表等）

### 5. 网络请求监控
- 自动拦截 fetch 和 XMLHttpRequest
- 记录请求 URL、方法、状态码、耗时

## 使用方法

### 基本使用

性能监控已在 `main.js` 中自动初始化，无需额外配置即可使用。

### 手动配置

如果需要自定义配置，可以在 `main.js` 中修改：

```javascript
import { createPerformanceMonitor } from './utils/performanceMonitor'

const performanceMonitor = createPerformanceMonitor({
    userId: 'user123',              // 用户ID（可选）
    appId: 'my-vue-app',            // 应用ID
    autoReport: true,               // 是否自动上报（默认true）
    reportInterval: 30000,          // 上报间隔，单位毫秒（默认30000）
    monitorResources: true,         // 是否监控资源加载（默认true）
    monitorNetwork: true,           // 是否监控网络请求（默认true）
    monitorErrors: true,            // 是否监控错误（默认true）
    sampleRate: 1,                 // 采样率 0-1（默认1，即100%）
    reportUrl: '/api/performance/report' // 上报地址
})

performanceMonitor.init()
```

### 配置选项说明

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `userId` | String | null | 用户标识，用于关联用户数据 |
| `appId` | String | 'my-vue-app' | 应用标识 |
| `autoReport` | Boolean | true | 是否自动上报数据 |
| `reportInterval` | Number | 30000 | 自动上报间隔（毫秒） |
| `monitorResources` | Boolean | true | 是否监控资源加载 |
| `monitorNetwork` | Boolean | true | 是否监控网络请求 |
| `monitorErrors` | Boolean | true | 是否监控错误 |
| `sampleRate` | Number | 1 | 采样率，0-1之间，1表示100%采样 |
| `reportUrl` | String | '/api/performance/report' | 数据上报地址 |

### API 方法

#### 手动上报数据

```javascript
// 获取性能监控实例
const monitor = window.__performanceMonitor__

// 手动上报
await monitor.manualReport()
```

#### 获取性能数据

```javascript
const monitor = window.__performanceMonitor__

// 获取当前收集的性能数据
const data = monitor.getPerformanceData()
console.log(data)
```

#### 销毁监控

```javascript
const monitor = window.__performanceMonitor__
monitor.destroy()
```

## 数据上报格式

上报的数据格式如下：

```javascript
{
    appId: 'my-vue-app',
    userId: 'user123',
    url: 'https://example.com/page',
    userAgent: 'Mozilla/5.0...',
    timestamp: 1234567890123,
    webVitals: {
        fcp: 1200,      // 首次内容绘制时间（毫秒）
        lcp: 2500,      // 最大内容绘制时间（毫秒）
        fid: 50,        // 首次输入延迟（毫秒）
        cls: 0.1        // 累积布局偏移
    },
    pagePerformance: {
        dnsTime: 10,
        tcpTime: 50,
        ttfb: 200,
        domReadyTime: 1500,
        pageLoadTime: 3000,
        // ... 更多指标
    },
    resources: [
        {
            name: 'https://example.com/app.js',
            type: 'script',
            duration: 100,
            size: 50000,
            // ... 更多信息
        }
    ],
    errors: [
        {
            type: 'javascript',
            message: 'Error message',
            filename: 'app.js',
            lineno: 10,
            colno: 5,
            stack: 'Error stack...',
            timestamp: 1234567890123
        }
    ],
    networkRequests: [
        {
            url: 'https://api.example.com/data',
            method: 'GET',
            status: 200,
            duration: 150,
            timestamp: 1234567890123
        }
    ],
    screen: {
        width: 1920,
        height: 1080,
        availWidth: 1920,
        availHeight: 1040
    },
    viewport: {
        width: 1920,
        height: 937
    }
}
```

## 后端接口要求

后端需要提供一个接口来接收性能数据：

**接口地址**: `/api/performance/report`  
**请求方法**: POST  
**请求体**: JSON 格式的性能数据

示例（Node.js/Express）：

```javascript
app.post('/api/performance/report', (req, res) => {
    const performanceData = req.body
    
    // 保存到数据库或进行数据分析
    console.log('收到性能数据:', performanceData)
    
    res.json({ code: 200, message: 'success' })
})
```

## 注意事项

1. **性能影响**: 监控系统本身对性能影响很小，但建议在生产环境使用采样率（如 0.1 表示 10% 采样）来减少数据量。

2. **数据量控制**: 系统会自动限制缓存的数据量，避免内存溢出：
   - 错误信息最多保留 100 条
   - 网络请求最多保留 200 条
   - 上报时只发送最近的数据

3. **页面卸载**: 页面卸载时会自动使用 `sendBeacon` API 上报数据，确保数据不丢失。

4. **浏览器兼容性**: 
   - 需要支持 `PerformanceObserver` API（现代浏览器都支持）
   - 页面卸载上报需要支持 `sendBeacon` 或降级使用同步 XHR

5. **调试**: 在浏览器控制台可以通过 `window.__performanceMonitor__` 访问监控实例，方便调试。

## 最佳实践

1. **生产环境采样**: 设置 `sampleRate: 0.1` 或更低，减少数据量
2. **错误监控**: 保持 `monitorErrors: true`，及时发现问题
3. **定期分析**: 定期分析上报的数据，识别性能瓶颈
4. **告警机制**: 在后端设置告警，当关键指标异常时及时通知
