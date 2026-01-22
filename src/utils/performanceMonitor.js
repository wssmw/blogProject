/**
 * 前端性能监控工具
 * 功能包括：
 * 1. Web Vitals 指标收集（FCP, LCP, FID, CLS等）
 * 2. 资源加载监控
 * 3. 错误监控
 * 4. 网络请求监控
 * 5. 页面性能监控
 */

import { reportPerformance } from '@/api/module/performance'
import { appStore } from '@/store/module/app'

class PerformanceMonitor {
    constructor(options = {}) {
        // 配置项
        this.config = {
            // 上报地址（用于 sendBeacon 降级方案）
            reportUrl: options.reportUrl || '/api/performance/report',
            // 是否自动上报
            autoReport: options.autoReport !== false,
            // 上报间隔（毫秒）
            reportInterval: options.reportInterval || 30000, // 默认30秒
            // 是否监控资源加载
            monitorResources: options.monitorResources !== false,
            // 是否监控网络请求
            monitorNetwork: options.monitorNetwork !== false,
            // 是否监控错误
            monitorErrors: options.monitorErrors !== false,
            // 采样率（0-1）
            sampleRate: options.sampleRate || 1,
            // 用户标识
            userId: options.userId || null,
            // 应用标识
            appId: options.appId || 'my-vue-app',
        }

        // 性能数据缓存
        this.performanceData = {
            // Web Vitals
            webVitals: {},
            // 资源加载
            resources: [],
            // 错误信息
            errors: [],
            // 网络请求
            networkRequests: [],
            // 页面性能
            pagePerformance: {},
        }

        // 上报定时器
        this.reportTimer = null

        // 是否已初始化
        this.initialized = false
    }

    /**
     * 初始化监控
     */
    init() {
        if (this.initialized) {
            console.warn('PerformanceMonitor already initialized')
            return
        }

        // 采样率检查
        if (Math.random() > this.config.sampleRate) {
            console.log('PerformanceMonitor: 未命中采样率，不进行监控')
            return
        }

        try {
            // 监控 Web Vitals
            this.monitorWebVitals()

            // 监控资源加载
            if (this.config.monitorResources) {
                this.monitorResources()
            }

            // 监控错误
            if (this.config.monitorErrors) {
                this.monitorErrors()
            }

            // 监控网络请求
            if (this.config.monitorNetwork) {
                this.monitorNetwork()
            }

            // 监控页面性能
            this.monitorPagePerformance()

            // 页面卸载时上报
            this.handlePageUnload()

            // 定时上报
            if (this.config.autoReport) {
                this.startAutoReport()
            }

            this.initialized = true
            console.log('PerformanceMonitor initialized successfully')
        } catch (error) {
            console.error('PerformanceMonitor init error:', error)
        }
    }

    /**
     * 监控 Web Vitals 指标
     */
    monitorWebVitals() {
        // 使用 PerformanceObserver API 监控性能指标
        if (!('PerformanceObserver' in window)) {
            console.warn('PerformanceObserver not supported')
            return
        }

        // 监控 FCP (First Contentful Paint)
        this.observeMetric('paint', entry => {
            if (entry.name === 'first-contentful-paint') {
                this.performanceData.webVitals.fcp = Math.round(entry.startTime)
            }
        })

        // 监控 LCP (Largest Contentful Paint)
        this.observeMetric('largest-contentful-paint', entry => {
            this.performanceData.webVitals.lcp = Math.round(entry.renderTime || entry.loadTime)
        })

        // 监控 FID (First Input Delay) - 需要用户交互
        this.observeMetric('first-input', entry => {
            this.performanceData.webVitals.fid = Math.round(entry.processingStart - entry.startTime)
        })

        // 监控 CLS (Cumulative Layout Shift)
        let clsValue = 0
        this.observeMetric('layout-shift', entry => {
            if (!entry.hadRecentInput) {
                clsValue += entry.value
                this.performanceData.webVitals.cls = Math.round(clsValue * 1000) / 1000
            }
        })

        // 使用 Performance API 获取其他指标
        this.getNavigationTiming()
    }

    /**
     * 使用 PerformanceObserver 监控性能指标
     */
    observeMetric(entryType, callback) {
        try {
            const observer = new PerformanceObserver(list => {
                for (const entry of list.getEntries()) {
                    callback(entry)
                }
            })
            observer.observe({ entryTypes: [entryType] })
        } catch (error) {
            console.warn(`Failed to observe ${entryType}:`, error)
        }
    }

    /**
     * 获取 Navigation Timing 指标
     */
    getNavigationTiming() {
        if (!window.performance || !window.performance.timing) {
            return
        }

        const timing = window.performance.timing
        const navigation = window.performance.navigation

        // DNS 查询时间
        const dnsTime = timing.domainLookupEnd - timing.domainLookupStart

        // TCP 连接时间
        const tcpTime = timing.connectEnd - timing.connectStart

        // SSL 握手时间
        const sslTime = timing.secureConnectionStart
            ? timing.connectEnd - timing.secureConnectionStart
            : 0

        // TTFB (Time to First Byte)
        const ttfb = timing.responseStart - timing.requestStart

        // 响应时间
        const responseTime = timing.responseEnd - timing.responseStart

        // DOM 解析时间
        const domParseTime = timing.domInteractive - timing.responseEnd

        // DOM 内容加载时间
        const domContentLoadTime = timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart

        // 页面完全加载时间
        const loadTime = timing.loadEventEnd - timing.loadEventStart

        // 白屏时间
        const whiteScreenTime = timing.responseStart - timing.navigationStart

        // DOM Ready 时间
        const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart

        // 页面完全加载时间
        const pageLoadTime = timing.loadEventEnd - timing.navigationStart

        this.performanceData.pagePerformance = {
            dnsTime,
            tcpTime,
            sslTime,
            ttfb,
            responseTime,
            domParseTime,
            domContentLoadTime,
            loadTime,
            whiteScreenTime,
            domReadyTime,
            pageLoadTime,
            redirectTime: timing.redirectEnd - timing.redirectStart,
            unloadTime: timing.unloadEventEnd - timing.unloadEventStart,
            type: navigation.type, // 0: 正常跳转, 1: 刷新, 2: 前进/后退
        }
    }

    /**
     * 监控资源加载
     */
    monitorResources() {
        if (!window.performance || !window.performance.getEntriesByType) {
            return
        }

        // 监听资源加载完成
        window.addEventListener('load', () => {
            setTimeout(() => {
                const resources = window.performance.getEntriesByType('resource')
                this.performanceData.resources = resources.map(resource => ({
                    name: resource.name,
                    type: this.getResourceType(resource.name),
                    duration: Math.round(resource.duration),
                    size: resource.transferSize || 0,
                    startTime: Math.round(resource.startTime),
                    redirectTime: Math.round(
                        resource.redirectEnd - resource.redirectStart || 0
                    ),
                    dnsTime: Math.round(resource.domainLookupEnd - resource.domainLookupStart || 0),
                    tcpTime: Math.round(resource.connectEnd - resource.connectStart || 0),
                    requestTime: Math.round(resource.responseStart - resource.requestStart || 0),
                    responseTime: Math.round(resource.responseEnd - resource.responseStart || 0),
                }))
            }, 0)
        })

        // 使用 PerformanceObserver 实时监控资源
        this.observeMetric('resource', entry => {
            if (entry.initiatorType !== 'navigation') {
                // 避免重复记录
                const exists = this.performanceData.resources.some(
                    r => r.name === entry.name && r.startTime === Math.round(entry.startTime)
                )
                if (!exists) {
                    this.performanceData.resources.push({
                        name: entry.name,
                        type: entry.initiatorType,
                        duration: Math.round(entry.duration),
                        size: entry.transferSize || 0,
                        startTime: Math.round(entry.startTime),
                    })
                }
            }
        })
    }

    /**
     * 获取资源类型
     */
    getResourceType(url) {
        if (url.includes('.js')) return 'script'
        if (url.includes('.css')) return 'stylesheet'
        if (url.includes('.png') || url.includes('.jpg') || url.includes('.jpeg') || url.includes('.gif') || url.includes('.webp') || url.includes('.svg')) return 'image'
        if (url.includes('.woff') || url.includes('.ttf') || url.includes('.eot')) return 'font'
        if (url.includes('.mp4') || url.includes('.mp3') || url.includes('.avi')) return 'media'
        return 'other'
    }

    /**
     * 监控错误
     */
    monitorErrors() {
        // JavaScript 错误
        window.addEventListener('error', event => {
            this.recordError({
                type: 'javascript',
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                stack: event.error?.stack,
                timestamp: Date.now(),
            })
        })

        // Promise 未捕获错误
        window.addEventListener('unhandledrejection', event => {
            this.recordError({
                type: 'promise',
                message: event.reason?.message || String(event.reason),
                stack: event.reason?.stack,
                timestamp: Date.now(),
            })
        })

        // 资源加载错误
        window.addEventListener('error', event => {
            if (event.target !== window && event.target.tagName) {
                this.recordError({
                    type: 'resource',
                    message: `Failed to load resource: ${event.target.tagName}`,
                    source: event.target.src || event.target.href,
                    tagName: event.target.tagName,
                    timestamp: Date.now(),
                })
            }
        }, true)
    }

    /**
     * 记录错误
     */
    recordError(errorInfo) {
        this.performanceData.errors.push({
            ...errorInfo,
            url: window.location.href,
            userAgent: navigator.userAgent,
        })

        // 限制错误数量，避免内存溢出
        if (this.performanceData.errors.length > 100) {
            this.performanceData.errors.shift()
        }
    }

    /**
     * 监控网络请求
     */
    monitorNetwork() {
        // 拦截 fetch
        const originalFetch = window.fetch
        window.fetch = (...args) => {
            const startTime = performance.now()
            const url = typeof args[0] === 'string' ? args[0] : args[0].url

            return originalFetch
                .apply(this, args)
                .then(response => {
                    const endTime = performance.now()
                    this.recordNetworkRequest({
                        url,
                        method: 'fetch',
                        status: response.status,
                        duration: Math.round(endTime - startTime),
                        timestamp: Date.now(),
                    })
                    return response
                })
                .catch(error => {
                    const endTime = performance.now()
                    this.recordNetworkRequest({
                        url,
                        method: 'fetch',
                        status: 0,
                        duration: Math.round(endTime - startTime),
                        error: error.message,
                        timestamp: Date.now(),
                    })
                    throw error
                })
        }

        // 拦截 XMLHttpRequest
        const originalOpen = XMLHttpRequest.prototype.open
        const originalSend = XMLHttpRequest.prototype.send

        XMLHttpRequest.prototype.open = function (method, url, ...rest) {
            this._monitorMethod = method
            this._monitorUrl = url
            this._monitorStartTime = performance.now()
            return originalOpen.apply(this, [method, url, ...rest])
        }

        XMLHttpRequest.prototype.send = function (...args) {
            if (this.addEventListener) {
                this.addEventListener('loadend', () => {
                    const duration = Math.round(performance.now() - this._monitorStartTime)
                    this._monitorInstance?.recordNetworkRequest({
                        url: this._monitorUrl,
                        method: this._monitorMethod,
                        status: this.status,
                        duration,
                        timestamp: Date.now(),
                    })
                })
            }
            this._monitorInstance = window.__performanceMonitor__
            return originalSend.apply(this, args)
        }
    }

    /**
     * 记录网络请求
     */
    recordNetworkRequest(requestInfo) {
        this.performanceData.networkRequests.push(requestInfo)

        // 限制请求数量
        if (this.performanceData.networkRequests.length > 200) {
            this.performanceData.networkRequests.shift()
        }
    }

    /**
     * 监控页面性能
     */
    monitorPagePerformance() {
        // 页面可见性变化
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.performanceData.pagePerformance.hiddenTime = Date.now()
            } else {
                this.performanceData.pagePerformance.visibleTime = Date.now()
            }
        })

        // 页面卸载前收集最终数据
        window.addEventListener('beforeunload', () => {
            this.getNavigationTiming()
        })
    }

    /**
     * 处理页面卸载
     */
    handlePageUnload() {
        // 使用 sendBeacon 在页面卸载时上报数据
        window.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                this.report(true)
            }
        })

        window.addEventListener('pagehide', () => {
            this.report(true)
        })
    }

    /**
     * 开始自动上报
     */
    startAutoReport() {
        this.reportTimer = setInterval(() => {
            this.report()
        }, this.config.reportInterval)
    }

    /**
     * 停止自动上报
     */
    stopAutoReport() {
        if (this.reportTimer) {
            clearInterval(this.reportTimer)
            this.reportTimer = null
        }
    }

    /**
     * 上报性能数据
     */
    async report(isUnload = false) {
        if (!this.config.autoReport && !isUnload) {
            return
        }

        const data = this.getReportData()

        if (Object.keys(data).length === 0) {
            return
        }

        try {
            if (isUnload) {
                // 页面卸载时使用 sendBeacon
                if (navigator.sendBeacon) {
                    const blob = new Blob([JSON.stringify(data)], {
                        type: 'application/json',
                    })
                    navigator.sendBeacon(this.config.reportUrl, blob)
                } else {
                    // 降级方案：使用同步 XMLHttpRequest
                    const xhr = new XMLHttpRequest()
                    xhr.open('POST', this.config.reportUrl, false)
                    xhr.setRequestHeader('Content-Type', 'application/json')
                    xhr.send(JSON.stringify(data))
                }
            } else {
                // 正常上报使用项目的 API 请求方式
                try {
                    await reportPerformance(data)
                    // 上报成功后清空已上报的数据
                    this.clearReportedData()
                } catch (error) {
                    // 如果 API 请求失败，降级使用 fetch
                    const response = await fetch(this.config.reportUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                        keepalive: true,
                    })

                    if (response.ok) {
                        this.clearReportedData()
                    }
                }
            }
        } catch (error) {
            console.error('Performance report error:', error)
        }
    }

    /**
     * 获取上报数据
     */
    getReportData() {
        return {
            appId: this.config.appId,
            userId: this.config.userId,
            url: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: Date.now(),
            webVitals: this.performanceData.webVitals,
            pagePerformance: this.performanceData.pagePerformance,
            resources: this.performanceData.resources.slice(-50), // 只上报最近50个资源
            errors: this.performanceData.errors.slice(-20), // 只上报最近20个错误
            networkRequests: this.performanceData.networkRequests.slice(-100), // 只上报最近100个请求
            screen: {
                width: window.screen.width,
                height: window.screen.height,
                availWidth: window.screen.availWidth,
                availHeight: window.screen.availHeight,
            },
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
            },
        }
    }

    /**
     * 清空已上报的数据
     */
    clearReportedData() {
        // 保留最近的数据，清空已上报的
        this.performanceData.errors = this.performanceData.errors.slice(-10)
        this.performanceData.networkRequests = this.performanceData.networkRequests.slice(-50)
    }

    /**
     * 手动上报
     */
    manualReport() {
        return this.report(false)
    }

    /**
     * 获取性能数据
     */
    getPerformanceData() {
        return this.getReportData()
    }

    /**
     * 销毁监控
     */
    destroy() {
        this.stopAutoReport()
        this.initialized = false
        delete window.__performanceMonitor__
    }
}

// 创建单例
let instance = null

export function createPerformanceMonitor(options) {
    if (instance) {
        return instance
    }
    instance = new PerformanceMonitor(options)
    // 挂载到 window 上，方便调试
    if (typeof window !== 'undefined') {
        window.__performanceMonitor__ = instance
    }
    return instance
}

/**
 * 自动初始化性能监控（推荐使用）
 * 会自动从 store 获取用户信息并监听变化
 * @param {Object} options 配置选项
 */
export function initPerformanceMonitor(options = {}) {
    // 默认配置
    const defaultOptions = {
        appId: 'my-vue-app',
        autoReport: true,
        reportInterval: 30000, // 30秒上报一次
        monitorResources: true,
        monitorNetwork: true,
        monitorErrors: true,
        sampleRate: 1, // 100%采样，可根据需要调整
        ...options,
    }

    // 获取 store 并初始化 userId
    try {
        const store = appStore()
        if (store) {
            defaultOptions.userId = store.userInfo?.id || store.userInfo?.userId || null
        }

        // 创建监控实例
        const monitor = createPerformanceMonitor(defaultOptions)

        // 初始化监控
        monitor.init()

        // 监听用户登录状态变化，更新 userId
        if (store) {
            store.$subscribe((mutation, state) => {
                if (state.userInfo && (state.userInfo.id || state.userInfo.userId)) {
                    monitor.config.userId = state.userInfo.id || state.userInfo.userId
                }
            })
        }

        return monitor
    } catch (error) {
        console.warn('Failed to initialize performance monitor with store:', error)
        // 如果 store 不可用，使用默认配置创建监控
        const monitor = createPerformanceMonitor(defaultOptions)
        monitor.init()
        return monitor
    }
}

export default PerformanceMonitor
