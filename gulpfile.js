const { src, dest ,series, parallel, watch} = require("gulp");
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const groupmedia = require("gulp-group-css-media-queries");
const fileinclude = require("gulp-file-include");
const del = require("del");
const scss = require("gulp-sass")(require("sass"));
const sync = require("browser-sync").create();
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglifyJs = require("gulp-uglify-es").default;
const imagemin = require("gulp-image");
// const webp = require("gulp-webp");
// const webpHtml = require("gulp-webp-html");
// const webpcss = require("gulp-webpcss");
const woff = require("gulp-ttf2woff");
const woff2 = require("gulp-ttf2woff2");
const fonter = require("gulp-fonter");
const fs = require("fs");

const proj_folder = require("path").basename(__dirname);
const source_folder = "#src";
const path = {
  build: {
    html: proj_folder + "/",
    css: proj_folder + "/css/",
    js: proj_folder + "/js/",
    img: proj_folder + "/img/",
    fonts: proj_folder + "/fonts/",
    fontsFolder: source_folder + "/fonts/",
  },
  src: {
    html: [
      source_folder + "/*.html",
      source_folder + "/*.php",
      "!" + source_folder + "/_*.html",
    ],
    css: source_folder + "/scss/style.scss",
    js: source_folder + "/js/script.js",
    img: source_folder + "/img/**/*.{jpg,png,gif,svg,ico,webp}",
    fonts: source_folder + "/fonts/*.ttf",
    webFonts: source_folder + "/fonts/*.{woff,woff2}",
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg,png,gif,svg,ico,webp}",
  },
  clean: "./" + proj_folder + "/",
};

function serve() {
  sync.init({
    server: {
      baseDir: "./" + proj_folder + "/",
    },
    port: 3000,
    notify: false,
  });

 watch([path.watch.html], html).on('change',sync.reload);
 watch([path.watch.css], css).on("change", sync.reload);
 watch([path.watch.js], js).on("change", sync.reload);
 watch([path.watch.img], images).on("change", sync.reload);
}

function font2styles() {
  let file_content = fs.readFileSync(source_folder + "/scss/fonts.scss");
  if (file_content == "") {
    fs.writeFile(source_folder + "/scss/fonts.scss", "", cb);
    return fs.readdir(path.build.fonts, function (err, items) {
      if (items) {
        let c_fontname;
        for (var i = 0; i < items.length; i++) {
          let fontname = items[i].split(".");
          fontname = fontname[0];
          if (c_fontname != fontname) {
            fs.appendFile(
              source_folder + "/scss/fonts.scss",
              '@include font("' +
                fontname +
                '", "' +
                fontname +
                '", "400", "normal");\r\n',
              cb
            );
          }
          c_fontname = fontname;
        }
      }
    });
  }
}

function cb() {
}
function html() {
  return (
    src(path.src.html)
      .pipe(fileinclude())
      .pipe(dest(path.build.html))
  );
}

function copyFonts() {
  src(path.src.webFonts).pipe(dest(path.build.fonts));
  return src(path.src.webFonts).pipe(dest(path.build.fonts));
}

function images() {
  return src(path.src.img)
      // .pipe(webp({ quality: 70 }))
      // .pipe(dest(path.build.img))
      // .pipe(src(path.src.img))
      .pipe(
        imagemin({
          progressive: true,
          interlaced: true,
          optimizationLevel: 3, // 0..7
          svgoPlugins: [{ removeViewBox: false }],
        })
      )
      .pipe(dest(path.build.img))
}

function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(uglifyJs())
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(dest(path.build.js))
}

function css() {
  return (
    src(path.src.css)
      .pipe(
        scss({
          outputStyle: "expanded",
        })
      )
      .pipe(groupmedia())
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 5 versions"],
          cascade: true,
        })
      )
      // .pipe(webpcss())
      .pipe(dest(path.build.css))
      .pipe(cleanCss())
      .pipe(
        rename({
          extname: ".min.css",
        })
      )
      .pipe(dest(path.build.css))
  );
}

function clean() {
  return del(path.clean);
}

gulp.task("otf2ttf", () => {
  return src([source_folder + "/fonts/*.otf"])
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    .pipe(dest(source_folder + "/fonts/"));
});

gulp.task("webfonts", () => {
 src(path.src.webFonts).pipe(woff()).pipe(dest(path.build.fontsFolder));
 return src(path.src.webFonts).pipe(woff2()).pipe(dest(path.build.fontsFolder));
});
const data = () => {
  return src("./#src/data/**/*").pipe(dest(path.build.html+'data/'));
};
const build = series(clean,images, copyFonts, css,data, html, js);
exports.font2styles = font2styles;
exports.build = build;
exports.default = series(build, serve); 
