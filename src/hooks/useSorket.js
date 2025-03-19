import { ref } from 'vue'
import { io } from 'socket.io-client'
import { ElNotification } from 'element-plus'
import { getUnreadNotificationsRequest } from '../api/module/notification'
import { appStore } from '../store/module/app'
const socket = ref(null)

export function useSocket() {
    const store = appStore()
    const connectSocket = async () => {
        // 使用 socket.io-client 连接
        const { hostname } = window.location
        console.log(hostname, 'hostname')
        socket.value = io(`ws://14.103.231.45:3000`, {
            path: '/socket.io/', // 与后端配置一致
            transports: ['websocket'], // 强制使用 WebSocket 传输
        })
        socket.value.on('connect', () => {
            console.log('WebSocket 连接成功')
        })
        const { data } = await getUnreadNotificationsRequest()
        store.newsNumChange(data.count)
        socket.value.on('new_notification', async message => {
            console.log('收到服务器消息:', message)
            const results = await getUnreadNotificationsRequest()
            console.log(results)
            ElNotification({
                title: '提示',
                message: `${message.fromUser.nickname}${message.content}`,
            })
            // 处理实时通知
            if (message.type === 'like') {
                console.log('收到点赞通知:', message.data)
            } else if (message.type === 'comment') {
                console.log('收到评论通知:', message.data)
            }
        })

        socket.value.on('disconnect', () => {
            console.log('WebSocket 连接关闭')
        })

        socket.value.on('connect_error', error => {
            console.error('WebSocket 错误:', error)
        })
    }

    const sendSocketMessage = userId => {
        if (socket.value && socket.value.connected) {
            console.log('这里执行')
            socket.value.emit('user_connected', userId)
        }
    }

    return {
        connectSocket,
        sendSocketMessage,
    }
}
