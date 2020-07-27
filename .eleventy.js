module.exports = function(eleventyConfig) {
    
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy({"src/_root/*.*": "./"});

    return {
      dir: {
        input: "./src",      
        output: "./public",
        includes: "_includes"
      }
    };
  };