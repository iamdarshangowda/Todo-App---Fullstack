const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: process.env.TODO_BACKED_PORT,
//       changeOrigin: true,
//     })
//   );
// };
