const pluginDate = require("eleventy-plugin-date");

module.exports = function(eleventyConfig) {

    const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
    const insertImage = require("./build/insertImage.js");
    
    eleventyConfig.addPassthroughCopy({"tmp/css": "css"});
    eleventyConfig.addPassthroughCopy({"src/img": "img"});
    eleventyConfig.addPassthroughCopy({"src/_root/*.*": "./"});

    eleventyConfig.setDataDeepMerge(true);

    // syntax highlighting
    eleventyConfig.addPlugin(syntaxHighlight);
    // readable dates
    eleventyConfig.addPlugin(pluginDate);

    eleventyConfig.addShortcode("insertImage", insertImage.insertImage);
    eleventyConfig.addShortcode("insertBlogImage", insertImage.insertBlogImage);

    return {
      dir: {
        input: "./src",      
        output: "./public",
        includes: "_includes"
      }
    };
  };