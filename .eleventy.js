module.exports = function(eleventyConfig) {

    const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
    const image_sizes = require("./build/image_sizes.js");

    const image_widths = image_sizes.widths;
    const image_sizes_3_4 = image_sizes.sizes_3_4;
    const image_sizes_16_9 = image_sizes.sizes_16_9;
    
    eleventyConfig.addPassthroughCopy({"tmp/css": "css"});
    eleventyConfig.addPassthroughCopy({"src/img": "img"});
    eleventyConfig.addPassthroughCopy({"src/_root/*.*": "./"});

    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.addShortcode("insertImage", function(filename, alttext) {
      let template_text = `
<picture>
<source
media="(max-width: 767px)"
sizes="(max-width: 767px) 100vw, 767px"
srcset="`;
      image_sizes_3_4.forEach(s => {
        template_text += `/${filename}_3_4_${s.width}.jpg ${s.width}w,`
      });
      template_text += `">
<source
media="(min-width: 768px) and (max-width: 1199px)"
sizes="(max-width: 1200px) 60vw, 720px"
srcset="`;
      image_sizes_16_9.forEach(s => {
        template_text += `/${filename}_16_9_${s.width}.jpg ${s.width}w,`;
      });
      template_text += `">
<img
sizes="(max-width: 3500px) 40vw, 1400px"
srcset="`;
      image_widths.forEach(w => {
        template_text += `/${filename}_${w}.jpg ${w}w,`;
      });
      template_text += `"
src="/${filename}.jpg"
alt="alttext">
</picture>`;

      return template_text;


    });

    return {
      dir: {
        input: "./src",      
        output: "./public",
        includes: "_includes"
      }
    };
  };