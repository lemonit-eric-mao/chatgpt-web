export default function POST(url) {
    return function (target, name, descriptor) {
        let fn = descriptor.value
        descriptor.value = (router) => {
            router.post(url, async (ctx, next) => {
                await fn(ctx, next)
            })
        }
    }
}
