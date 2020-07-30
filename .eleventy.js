module.exports = function(eleventyConfig) {

    const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
    
    eleventyConfig.addPassthroughCopy({"build/css": "css"});
    eleventyConfig.addPassthroughCopy({"src/img": "img"});
    eleventyConfig.addPassthroughCopy({"src/_root/*.*": "./"});

    eleventyConfig.setDataDeepMerge(true);

    module.exports = function(eleventyConfig) {
      eleventyConfig.addPlugin(syntaxHighlight);
    };

    return {
      dir: {
        input: "./src",      
        output: "./public",
        includes: "_includes"
      }
    };
  };