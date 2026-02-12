const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');
const sizes = require("./image_sizes");

const widths = sizes.widths;
const sizes_16_9 = sizes.sizes_16_9;
const sizes_3_4 = sizes.sizes_3_4;

let image_files = glob.sync('src/img/**/*.{png,PNG,jpg,JPG,jpeg,JPEG}');

let gifs = glob.sync('src/img/**/*.{gif,GIF}');

gifs.forEach(f => {
    const output_directory = path.dirname(f).replace('src', 'public');
    fs.mkdir(output_directory, { recursive: true }, (err) => {
        //copy the gif to the output directory
        fs.copyFileSync(f, `${output_directory}${path.sep}${path.basename(f)}`);
        if (err) throw err;
    });
});

image_files.forEach(f => {
    const output_directory = path.dirname(f).replace('src', 'public');
    fs.mkdir(output_directory, { recursive: true }, (err) => {
        if (err) throw err;
    });
    const image = sharp(f);
    widths.forEach(w => {
        image
            .resize({
                width: w,
                withoutEnlargement: true
            })
            .jpeg()
            .toFile(`${output_directory}${path.sep}${path.basename(f, path.extname(f))}_${w}${path.extname(f)}`);
    });
    image
        .metadata()
        .then(m => {
            sizes_16_9.forEach(s => {
                options = {
                    width: s.width
                };
                if (m.width > m.height) {
                    options.height = s.height;
                    options.fit = 'cover';
                    options.position = sharp.strategy.attention;
                }
                image
                    .resize(options)
                    .jpeg()
                    .toFile(`${output_directory}${path.sep}${path.basename(f, path.extname(f))}_16_9_${s.width}${path.extname(f)}`);
            });
        });
    image
        .metadata()
        .then(m => {
            sizes_3_4.forEach(s => {
                options = {
                    width: s.width
                };
                if (m.width <= m.height) {
                    options.height = s.height;
                    options.fit = 'cover';
                    options.position = sharp.strategy.attention;
                }
                image
                    .resize(options)
                    .jpeg()
                    .toFile(`${output_directory}${path.sep}${path.basename(f, path.extname(f))}_3_4_${s.width}${path.extname(f)}`);
            });
        });
});