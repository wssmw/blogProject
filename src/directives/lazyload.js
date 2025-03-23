const lazyload = {
    mounted(el, binding) {
        const imgSrc = binding.value
        const defaultSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' // 透明占位图

        // 设置默认占位图
        el.src = defaultSrc

        const observer = new IntersectionObserver(([{ isIntersecting }]) => {
            if (isIntersecting) {
                // 当图片进入视口时加载真实图片
                el.src = imgSrc

                // 图片加载完成后移除观察器
                el.onload = () => {
                    el.classList.add('loaded')
                    observer.unobserve(el)
                }

                // 处理加载失败的情况
                el.onerror = () => {
                    el.src = defaultSrc
                    observer.unobserve(el)
                }
            }
        })

        observer.observe(el)
    },
}

export default lazyload
