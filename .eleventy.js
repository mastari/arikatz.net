module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/css')
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addPassthroughCopy('src/js')
  eleventyConfig.addWatchTarget("src/js/");
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