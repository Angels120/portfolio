/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  server: './server.js',
  serverBuildPath: 'functions/[[path]].js',
  serverConditions: ['workerd', 'worker', 'browser'],
  serverDependenciesToBundle: 'all',
  serverMainFields: ['browser', 'module', 'main'],
  serverMinify: true,
  serverModuleFormat: 'esm',
  serverPlatform: 'neutral',
  routes(defineRoutes) {
    return defineRoutes(route => {
      route('/', 'routes/home/route.js', { index: true });
    });
  },
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
};
