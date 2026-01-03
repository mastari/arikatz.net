const mathjaxPlugin = require("eleventy-plugin-mathjax");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/css')
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addPassthroughCopy('src/js')
  eleventyConfig.addWatchTarget("src/js/");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/pdf");

  eleventyConfig.addPlugin(mathjaxPlugin);


  eleventyConfig.addFilter("excerpt", (post) => {
    const content = post.replace(/(<([^>]+)>)/gi, "");
    return content.substr(0, content.lastIndexOf(" ", 200)) + "...";
  });

  eleventyConfig.addFilter("take", (array, count) => {
    if (!Array.isArray(array)) return [];
    return array.slice(0, count);
  });

  eleventyConfig.addFilter("simpleDate", (dateString) => {
    day = new Date(dateString).toISOString().split('T')[0]
    return day;
  });

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByTag("_project").sort((a, b) => {
      const dateA = a.date instanceof Date ? a.date.getTime() : new Date(a.date).getTime();
      const dateB = b.date instanceof Date ? b.date.getTime() : new Date(b.date).getTime();
      return dateB - dateA;
    });
  });

  eleventyConfig.addCollection("newPosts", (collectionApi) => {
    return collectionApi
      .getAll()
      .filter((item) => {
        const tags = item.data && item.data.tags;
        if (!tags) return false;
        if (Array.isArray(tags)) {
          return tags.includes("new_entry");
        }
        return tags === "new_entry";
      })
      .sort((a, b) => {
        const dateA = a.date instanceof Date ? a.date.getTime() : new Date(a.date).getTime();
        const dateB = b.date instanceof Date ? b.date.getTime() : new Date(b.date).getTime();
        return dateB - dateA;
      });
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
