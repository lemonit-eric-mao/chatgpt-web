export default function DELETE(url) {
    return function (target, name, descriptor) {
        let fn = descriptor.value
        descriptor.value = (router) => {
            router.delete(url, async (ctx, next) => {
                await fn(ctx, next)
            })
        }
    }
}
