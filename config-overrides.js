// const {
//   override,
//   fixBabelImports,
//   addLessLoader,
// } = require("customize-cra");
// module.exports = function override(config, env) {
//   config = injectBabelPlugin(
//     // 在默认配置基础上注入
//     // 插件名，插件配置
//     ["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }],
//     config
//   );

//   config = injectBabelPlugin(
//     ["@babel/plugin-proposal-decorators", { legacy: true }],
//     config
//   );

  return config;
};
