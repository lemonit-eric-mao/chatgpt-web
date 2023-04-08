export default function GET(url) { // 这一层表示的是方法的注解层

    /**
     * 方法的注解就是这种参数格式，它是固定写法
     *
     * @param target
     * @param name 方法名
     * @param descriptor 方法的相关信息
     */
    return function (target, name, descriptor) { // 这一层表示注解所对应的方法的相关信息
        // 1. descriptor.value 是真正的方法，先缓存起来，接下来我们要修改原来的方法
        let fn = descriptor.value
        // 2. 替换原有的方法，(注意：这里只是配置，并没有执行，直接执行的机制是在Controller里面进行的操作)
        descriptor.value = (router) => {
            // 3. 在原有的方法外面加一层路由的配置
            router.get(url, async (ctx, next) => {
                // 4. 在调用原来的方法
                await fn(ctx, next)
            })
        }
    }
}
