const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob'); 

const widths = [320, 612, 904, 1196, 1488, 1780];
const sizes_16_9 = [
    {
        width: 320,
        height: 180
    },
    {
        width: 612,
        height: 344
    },
    {
        width: 904,
        height: 509
    },
    {
        width: 1196,
        height: 673
    },
    {
        width: 1488,
        height: 837
    },
    {
        width: 1780,
        height: 1001
    }
];
const sizes_3_4 = [
    {
        width: 320,
        height: 427
    },
    {
        width: 500,
        height: 667
    },
    {
        width: 680,
        height: 907
    },
    {
        width: 860,
        height: 1147
    },
    {
        width: 1040,
        height: 1387
    }
]

let image_files = glob.sync('src/img/**/*.{png,PNG,jpg,JPG}');

image_files.forEach(f => {
    const output_directory = path.dirname(f).replace('src', 'public');
    fs.mkdir(output_directory, { recursive: true }, (err) =>{
        if(err) throw err;
    });
    const image = sharp(f);
    widths.forEach(w => {
        image
            .resize({
                width: w,
                withoutEnlargement: true
            })
            .jpeg()
            .toFile(`${output_directory}${path.sep}${path.basename(f, path.extname(f))}-${w}${path.extname(f)}`);
    });
    image
        .metadata()
        .then(m => {
            sizes_16_9.forEach(s => {
                options = {
                    width: s.width
                };
                if(m.width > m.height) {
                    options.height = s.height;
                    options.fit = 'cover';
                    options.position = sharp.strategy.attention;
                }
                image
                    .resize(options)
                    .jpeg()
                    .toFile(`${output_directory}${path.sep}${path.basename(f, path.extname(f))}_16_9_${s.width}_${path.extname(f)}`);
            });
        });
    image
        .metadata()
        .then(m => {
            sizes_3_4.forEach(s => {            
                options = {
                    width: s.width
                };
                if(m.width <= m.height) {
                    options.height = s.height;
                    options.fit = 'cover';
                    options.position = sharp.strategy.attention;
                }
                image
                    .resize(options)
                    .jpeg()
                    .toFile(`${output_directory}${path.sep}${path.basename(f, path.extname(f))}_3_4_${s.width}_${path.extname(f)}`);
        });
    });
});