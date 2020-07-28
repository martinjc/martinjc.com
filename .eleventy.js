module.exports = function(eleventyConfig) {
    
    eleventyConfig.addPassthroughCopy({"build/css": "css"});
    eleventyConfig.addPassthroughCopy({"src/_root/*.*": "./"});

    return {
      dir: {
        input: "./src",      
        output: "./public",
        includes: "_includes"
      }
    };
  };