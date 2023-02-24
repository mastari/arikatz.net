const mathjaxPlugin = require("eleventy-plugin-mathjax");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/css')
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addPassthroughCopy('src/js')
  eleventyConfig.addWatchTarget("src/js/");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/img");

  eleventyConfig.addPlugin(mathjaxPlugin);


  eleventyConfig.addFilter("excerpt", (post) => {
    const content = post.replace(/(<([^>]+)>)/gi, "");
    return content.substr(0, content.lastIndexOf(" ", 200)) + "...";
  });

  eleventyConfig.addFilter("simpleDate", (dateString) => {
    day = new Date(dateString).toISOString().split('T')[0]
    return day;
  });

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true, //! for css, js, etc..
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
}