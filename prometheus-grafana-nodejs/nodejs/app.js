const Koa = require('koa');
const app = new Koa();
const client = require('prom-client');
const {register} = client;

client.collectDefaultMetrics({
	gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5], // These are the default buckets.
});

app.use(async ctx => {
    if (ctx.path === '/metrics') {
        ctx.type = register.contentType;
        ctx.body = await register.metrics();
        return;
    }
  ctx.body = 'Hello World';
});

app.listen(8201);