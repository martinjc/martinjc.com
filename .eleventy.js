const pluginDate = require("eleventy-plugin-date");

module.exports = function(eleventyConfig) {

    const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
    const insertImage = require("./build/insertImage.js");
    const markdownItFootnote = require("markdown-it-footnote");
    const markdownItEmoji = require("markdown-it-emoji");
    const markdownIt = require("markdown-it");
    
    eleventyConfig.addPassthroughCopy({"tmp/css": "css"});
    eleventyConfig.addPassthroughCopy({"src/img": "img"});
    eleventyConfig.addPassthroughCopy({"src/_root/*.*": "./"});

    eleventyConfig.setDataDeepMerge(true);

    // syntax highlighting
    eleventyConfig.addPlugin(syntaxHighlight);
    // readable dates
    eleventyConfig.addPlugin(pluginDate);

      // add footnotes and emoji to the markdown parser
    let markdownLib = markdownIt({
        html: true,
        breaks: true,
        linkify: true,
        typographer: true,
    })
    .use(markdownItFootnote)
    .use(markdownItEmoji);

    eleventyConfig.setLibrary('md', markdownLib);

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