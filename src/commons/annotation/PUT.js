export default function PUT(url) {
    return function (target, name, descriptor) {
        let fn = descriptor.value
        descriptor.value = (router) => {
            router.put(url, async (ctx, next) => {
                await fn(ctx, next)
            })
        }
    }
}
