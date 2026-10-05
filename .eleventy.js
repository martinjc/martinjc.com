const path = require("path");
const fs = require("fs");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItEmoji = require("markdown-it-emoji");
const insertImage = require("./build/insertImage.js");

module.exports = function (eleventyConfig) {
  // Passthrough copies
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/img": "img" });
  eleventyConfig.addPassthroughCopy({ "src/_root": "." });

  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight);

  // Date filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    const dt = typeof dateObj === "string"
      ? DateTime.fromISO(dateObj, { zone: "utc" })
      : DateTime.fromJSDate(dateObj, { zone: "utc" });
    return dt.isValid ? dt.toFormat("dd LLL yyyy") : String(dateObj);
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (!dateObj) return "";
    const dt = typeof dateObj === "string"
      ? DateTime.fromISO(dateObj, { zone: "utc" })
      : DateTime.fromJSDate(dateObj, { zone: "utc" });
    return dt.isValid ? dt.toFormat("yyyy-LL-dd") : String(dateObj);
  });

  eleventyConfig.addFilter("date", (dateObj, formatStr) => {
    if (!dateObj) return "";
    const dt = typeof dateObj === "string"
      ? DateTime.fromISO(dateObj, { zone: "utc" })
      : DateTime.fromJSDate(dateObj, { zone: "utc" });
    if (!dt.isValid) return String(dateObj);
    if (formatStr === "%Y-%m-%d") {
      return dt.toFormat("yyyy-MM-dd");
    }
    return dt.toFormat(formatStr || "yyyy-MM-dd");
  });

  // Markdown parser configuration
  const emojiPlugin = markdownItEmoji.full || markdownItEmoji;
  const markdownLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  })
    .use(markdownItFootnote)
    .use(emojiPlugin);

  eleventyConfig.setLibrary("md", markdownLib);

  // Custom shortcodes
  eleventyConfig.addShortcode("insertImage", insertImage.insertImage);
  eleventyConfig.addShortcode("insertGif", insertImage.insertGif);
  eleventyConfig.addShortcode("insertBlogImage", insertImage.insertBlogImage);

  // Collections
  eleventyConfig.addCollection("posts", (collections) => {
    return collections
      .getFilteredByTag("post")
      .filter((post) => !Boolean(post.data.draft));
  });

  return {
    dir: {
      input: "./src",
      output: "./public",
      includes: "_includes",
    },
  };
};