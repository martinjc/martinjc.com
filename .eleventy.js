const path = require("path");
const fs = require("fs");
const sass = require("sass");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItEmoji = require("markdown-it-emoji");
const insertImage = require("./build/insertImage.js");

module.exports = function (eleventyConfig) {
  // Watch Sass folder for changes
  eleventyConfig.addWatchTarget("src/_sass/");

  // Compile Sass before Eleventy build
  eleventyConfig.on("eleventy.before", async () => {
    const scssPath = path.join(__dirname, "src/_sass/main.scss");
    if (fs.existsSync(scssPath)) {
      const result = sass.compile(scssPath, {
        loadPaths: [path.join(__dirname, "src/_sass")],
        style: process.env.NODE_ENV === "production" ? "compressed" : "expanded",
        silenceDeprecations: ["import"],
      });
      const outDir = path.join(__dirname, "public/css");
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "main.css"), result.css);
    }
  });

  // Passthrough copies
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