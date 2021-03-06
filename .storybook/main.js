module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    {
      name: "storybook-preset-craco",
      options: {
        cracoConfigFile: "../../craco.config.js",
      },
    },
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
      },
    },

    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-themes",
  ]
}
