const path = require('path');

const image_sizes = require("./image_sizes.js");

const image_widths = image_sizes.widths;
const image_sizes_3_4 = image_sizes.sizes_3_4;
const image_sizes_16_9 = image_sizes.sizes_16_9;

module.exports = {

  insertBlogImage: function (filename, alttext, classname) {
    if (!classname) {
      classname = "";
    }
    let template_text = `
<picture class="${classname}">
<source
media="(max-width: 767px)"
sizes="(max-width: 767px) 100vw, 767px"
srcset="`;
    image_sizes_3_4.forEach(s => {
      template_text += `${path.sep}${path.dirname(filename)}${path.sep}${path.basename(filename, path.extname(filename))}_3_4_${s.width}${path.extname(filename)} ${s.width}w,`
    });
    template_text += `">
<source
media="(min-width: 768px) and (max-width: 1199px)"
sizes="(max-width: 1200px) 60vw, 720px"
srcset="`;
    image_sizes_16_9.forEach(s => {
      template_text += `${path.sep}${path.dirname(filename)}${path.sep}${path.basename(filename, path.extname(filename))}_16_9_${s.width}${path.extname(filename)} ${s.width}w,`;
    });
    template_text += `">
<img
sizes="(max-width: 3500px) 40vw, 1400px"
srcset="`;
    image_widths.forEach(w => {
      template_text += `${path.sep}${path.dirname(filename)}${path.sep}${path.basename(filename, path.extname(filename))}_${w}${path.extname(filename)} ${w}w,`;
    });
    template_text += `"
src="${path.sep}${path.dirname(filename)}${path.sep}${path.basename(filename, path.extname(filename))}${path.extname(filename)}"
alt="${alttext}">
</picture>`;

    return template_text;
  },

  insertImage: function (filename, alttext, classname) {
    let template_text = `
<img class="${classname}"
srcset="`;
    image_widths.forEach(w => {
      template_text += `${path.sep}${path.dirname(filename)}${path.sep}${path.basename(filename, path.extname(filename))}_${w}${path.extname(filename)} ${w}w,`;
    });
    template_text += `"
src="${path.sep}${path.dirname(filename)}${path.sep}${path.basename(filename, path.extname(filename))}${path.extname(filename)}"
alt="${alttext}">`;

    return template_text;
  },

  insertGif: function (filename, alttext, classname) {
    if (!classname) {
      classname = "";
    }
    let template_text = `
<img class="${classname}"
src="${path.sep}${path.dirname(filename)}${path.sep}${path.basename(filename, path.extname(filename))}${path.extname(filename)}"
alt="${alttext}">`;

    return template_text;
  }
}