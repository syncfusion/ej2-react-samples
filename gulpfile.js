var gulp = require("gulp");
//var browserSync = require('browser-sync');
var elasticlunr = require('elasticlunr');
var glob = require('glob');
var fs = require('fs');
var configRegex = /\[(.*)\]/;
var shelljs = require('shelljs');
var runSequence = require('gulp4-run-sequence');
var commonConfig = require('./config.json');
var path = require('path');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');

gulp.task('pdfium-wasm', function (done) {
    const filePath = process.cwd() + '/package.json';
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent)
    var platformName = jsonData.name;
    let Folder = glob.sync('./node_modules/@syncfusion/ej2-pdfviewer/dist/ej2-pdfviewer-lib/*.{js,wasm}')
    if (platformName == '@syncfusion/ej2-javascript-samples') {
        return gulp.src(Folder)
            .pipe(gulp.dest('./dist/ej2-pdfviewer-lib'));
    } else if (platformName == '@syncfusion/ej2-samples') {
        return gulp.src(Folder)
            .pipe(gulp.dest('./src/ej2-pdfviewer-lib'));
    } else if (platformName == '@syncfusion/ej2-react-samples') {
        return gulp.src(Folder)
            .pipe(gulp.dest('./ej2-pdfviewer-lib'));
    } else if (platformName === 'ej2-vue-samples') {
        const sourcePath = './node_modules/@syncfusion/ej2-pdfviewer/dist/ej2-pdfviewer-lib';
        const destpath = './public/js/ej2-pdfviewer-lib';
        if (!fs.existsSync(destpath)) {
            shelljs.mkdir('-p', destpath);
        }
        shelljs.cp('-R', sourcePath + '/*', destpath);
        console.log("File moved to Destination")
    }
    done();
})

gulp.task('cdn-styles', function(done) {
    var samples = glob.sync('./samples/**/**/index.html');
    for (var i = 0; i < samples.length; i++) {
        var htmlFile = fs.readFileSync(samples[i], 'utf8');
        htmlFile = htmlFile.replace(`<link href="https://cdn.syncfusion.com/ej2/' + themeName + '.css"`, '<link href="../../styles/material.css"');
        fs.writeFileSync(samples[i], htmlFile, 'utf8');
    }
    done();
})

gulp.task('react-build', function (done) {
    if (commonConfig.platform === 'react') {
        var preBuild = process.argv[3] != '--class' ? "gulp react-pre-build" : "gulp react-pre-build --class";
        if (shelljs.exec(preBuild + ' && gulp react-bundle-new').code !== 0) {
            process.exit(1);
        } else {
            done();
        }
    } else {
        done();
    }

});

gulp.task('build', function (done) {
        runSequence('react-build', done);
});

gulp.task('react-pre-build', function (done) {
    console.log('Change Live Link React Completed');
    console.log('React-pre-process');
    preProcess();
    console.log('moved samples');
    shelljs.cp('-R', './samples/*', './');
    runSequence('react-create-locale', 'react-generate-router', 'styles-all', 'react-scripts', 'react-bundle', 'custom-jsx-scripts', 'react-next-prev', done);
});

gulp.task('react-next-prev', function (done) {
    var samplelist = fs.readFileSync('./src/common/sample-list.tsx', 'utf8')
    var sampleArr = samplelist.match(/path':.*'(.*)',/g);
    var samplesPathArray = [];
    var samplesArr = [];
    var files = glob.sync('./*/*', {
        silent: true,
        ignore: ['./src/**', './samples/**', './node_modules/**', './spec/**', './styles/**' ]
    });
    var next = "";
    var prev = "";
    var anchorPrev = "";
    var anchorNext = "";
    var disablenext = "";
    var disableprev = "";
    for (var i = 0; i < sampleArr.length; i++) {
        dir = sampleArr[i].match(/(\'[\w\-\s]+\')/g);
        dir = dir[0].replace(/(\')/g, '');
        samplesPathArray.push(dir);
    }
    for (var j = 0; j <= samplesPathArray.length - 1; j++) {
        var config = fs.readFileSync('./src/' + samplesPathArray[j] + '/config.tsx', 'utf8');
        var path = config.match(/path'(.*?):*,/g);
        for (var k = 0; k < path.length; k++) {
            var paths = path[k].match(/(?<=\').*(?=\')/g);
            paths = paths[0].replace(/: '/g, '');
        if(paths.indexOf('.') == -1){
            samplesArr.push(paths);     
            }
        }
    }
    for (var i = 0; i < files.length; i++) {
        var url = files[i].split('/')[2];
        var currentComp = files[i].split('/')[1];
        var curlocation = currentComp + '/' + url;
        var inx = samplesArr.indexOf(curlocation);
        if (inx == 0) {
            next = samplesArr[inx + 1];
            anchorNext = `href="https://ej2.syncfusion.com/react/demos/${next}/"`;
            anchorPrev = '';
            disableprev = 'e-disabled';
            disablenext = '';

        } else if (inx == samplesArr.length - 1) {
            prev = samplesArr[inx - 1];
            anchorPrev = `href="https://ej2.syncfusion.com/react/demos/${prev}/"`;
            anchorNext = '';
            disablenext = 'e-disabled';
            disableprev = '';
        } else {
            next = samplesArr[inx + 1];
            prev = samplesArr[inx - 1];
            anchorNext = `href="https://ej2.syncfusion.com/react/demos/${next}/"`;
            anchorPrev = `href="https://ej2.syncfusion.com/react/demos/${prev}/"`;
            disablenext = '';
            disableprev = '';
        }
        if (fs.existsSync('./' + curlocation + '/index.html')) {
            var pHtml = fs.readFileSync('./' + curlocation + '/index.html', 'utf8');
            pHtml = pHtml.replace(/{{:anchor-next}}/g, anchorNext);
            pHtml = pHtml.replace(/{{:anchor-prev}}/g, anchorPrev);
            pHtml = pHtml.replace(/{{:disabled-next}}/g, disablenext);
            pHtml = pHtml.replace(/{{:disabled-prev}}/, disableprev);
            pHtml = pHtml.replace(/<link rel="canonical" href=.+/,'');
            fs.writeFileSync('./' + curlocation + '/index.html', pHtml, 'utf-8');
        }
    }
done();
});

gulp.task('react-bundle', function () {
    var webpackConfig = require(path.resolve('./webpack.config.js'));
    return gulp.src("./src/common/index.js")
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest('dist/'));
});

gulp.task('react-bundle-new', function (done) {
    if (common.currentRepo !== "ej2-react-samples") {
        var os = require('os');
        if (os.hostname().toLowerCase().indexOf('jenkins') !== -1) {
            shelljs.exec('free -m');
        }
        else if (os.platform() === 'win32') {
            shelljs.exec('npm install increase-memory-limit');
            shelljs.exec('increase-memory-limit');
        }
        var fcode = shelljs.exec('node --max-old-space-size=7168 ./node_modules/gulp/bin/gulp.js new-bundle');
        if (fcode.code !== 0 || checkErrorCode(fcode.stdout)) {
            process.exit(1);
        }
    }
    done();
});

gulp.task('new-bundle', function () {
    var webpackConfig = require('./webpack.config.js');
    return gulp.src('.')
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest('.'));

});

gulp.task('custom-jsx-scripts', function (done) {
    var ts = require("typescript");
    var tsCompilerOptions = {
        target: ts.ModuleKind.ESNext,
        module: ts.ScriptTarget.ESNext,
        noResolve: true,
        suppressOutputPathCheck: true,
        "jsx": "preserve",
        "noEmitOnError": false,
        "moduleResolution": "node",
        "noLib": false,
        "experimentalDecorators": true,
        "sourceMap": false,
        "pretty": true,
        "skipLibCheck": true
    }

    var customCodeRegex = /.*custom code start([\S\s]*?)custom code end.*/g;
    var tsxFiles = glob.sync('./src/**/*.tsx', { ignore: './src/common/all-routes.tsx' });

    var time = (new Date()).getTime();
    var timeConsumingFiles = {};

    for (var tsxFile of tsxFiles) {

        var tsxContent = fs.readFileSync(tsxFile, 'utf8');
        if (customCodeRegex.test(tsxContent)) {
            tsxContent = tsxContent.replace(customCodeRegex, '');
        }
        var es6Result = ts.transpileModule(tsxContent, { "compilerOptions": tsCompilerOptions });
        fs.writeFileSync(tsxFile.replace('.tsx', '.jsx'), es6Result.outputText);

        var tempTime = new Date().getTime();
        var completionTime = ((tempTime - time) / 1000);
        console.log(tsxFile.replace('.tsx', '.jsx') + ' in ' + completionTime + 's');
        time = tempTime;
        if (completionTime > 1) {
            timeConsumingFiles[tsxFile] = completionTime + 's';
        }
    }
    console.log(JSON.stringify(timeConsumingFiles, null, 4));
    done();
});

gulp.task('react-scripts', function (done) {
    var isRemote = process.env.GITLAB_TOKEN || global.isLocal;
    var gulpObj = {
        src: commonConfig.ts,
        dest: './',
        base: '.',
        needDts: isRemote ? true : false
    };
    if (isRemote) {
        generateRootFilesReact('./src');
    }
    return compileTSFilesReact({}, gulpObj, false, done);
});

function generateRootFilesReact(source) {
    var path = require('path');
    var files = fs.readdirSync(source);
    for (var i = 0; i < files.length; i++) {
        var pathObj = path.parse(files[i]);
        var file = path.join(source, files[i]);
        var stat = fs.lstatSync(file);
        if ((stat.isDirectory()) || (pathObj.name === 'index' && pathObj.ext === '.ts')) {
            var name = pathObj.name === 'index' ? pathObj.name : pathObj.name + '/index';
            var content = getCommentLineReact(pathObj.name) + 'export * from \'' + source + '/' + name + '\';';
            fs.writeFileSync('./' + pathObj.name + '.ts', content);
        }
    }
    return;
}
exports.generateRootFilesReact = generateRootFilesReact;

function parseSamplelist(sample) {
    var sampleRegex = sample.match(/\[+[^\[]+\]/)[0].split(/,(| )'samples'+[^,}]+/).join('');
    var rSample = sampleRegex.split(/,(| )"samples"+[^,}]+/).join('');
    var matchSample = JSON.stringify(eval(rSample));
    return JSON.parse(matchSample);
}

function compileTSFilesReact(tsConfigs, gulpObj, isjsx, done) {
    var ts = require('gulp-typescript');
    // Default typescript config
    var defaultConfig = {
        typescript: require('typescript')
    };

    var tsProject, tsResult;

    function refreshValue(flag) {
        // Create the typescript project
        tsProject = ts.createProject('tsconfig.json', isjsx ? Object.assign({
            "outDir": "./dist/",
            "sourceMap": true,
            "noImplicitAny": false,
            "module": "es6",
            "target": "es2015",
            "jsx": "preserve",
            "moduleResolution": "node",
            "lib": ["es5", "es6", "es2015.promise", "dom"]
        }, defaultConfig, tsConfigs) : Object.assign((flag ? {
            removeComments: false
        } : {}), defaultConfig, tsConfigs));
        // Get typescript result
        tsResult = gulp.src(gulpObj.src, {
            base: gulpObj.base
        })
            .pipe(tsProject())
            .on('error', function (e) {
                done(e);
                process.exit(1);
            });
    }

    // Compile d.ts and minified files
    if (gulpObj.needDts) {
        refreshValue(true);
        tsResult.dts.pipe(gulp.dest(gulpObj.dest));
    }
    refreshValue();
    // Combine and uglify js files using webpack

    if (gulpObj.hasOwnProperty('combine')) {
        var webpackStream = require('webpack-stream');
        var webpack = require('webpack');
        tsResult.js.pipe(webpackStream({
            output: {
                filename: `${common.currentPackage}${gulpObj.combine ? '.umd.min.js' : '.umd.js'}`,
                libraryTarget: 'umd'
            },
            externals: (gulpObj.externals || []),
            plugins: gulpObj.combine ? [
                new webpack.optimize.UglifyJsPlugin()
            ] : [],
            devtool: gulpObj.combine ? '' : 'inline-source-map',
        })).pipe(gulp.dest(gulpObj.dest))
            .on('end', function () {
                done();
            });
    }
    // Compile normal js files without uglification
    else {
        tsResult.js.pipe(gulp.dest(gulpObj.dest))
            .on('end', function () {
                done();
            });

    }
}
exports.compileTSFilesReact = compileTSFilesReact;

gulp.task('react-generate-router', function (done) {
    var imports = '';
    var compRoutes = '';
    var allconfig = '';
    var categories = '{';
    var samplelist = fs.readFileSync('./src/common/sample-list.tsx', 'utf8');
    var files = glob.sync('./src/**/config.tsx');
    elasticlunr.clearStopWords();
    var instance = elasticlunr(function () {
        this.addField('component');
        this.addField('name');
        this.setRef('uid');
    });
    var uid = 0;
    for (var file of files) {
        var parsing = parseSamplelist(samplelist);
        var count = Object.keys(parsing).filter(function (value) {
            if (file.split('/')[2] == parsing[value].path) {
                return value;
            }
        })
        var routeconfig = '';
        var localimports = '';
        var routes = '';
        var path = file.slice(0, file.lastIndexOf('/'));
        var compName = path.slice(path.lastIndexOf('/') + 1);
        var componentName = compName.replace(/-/g, '');
        var curfile = JSON.stringify(fs.readFileSync(file, 'utf8'));
        var trimmedFile = curfile.replace(/\\n|\\r/g, '');
        routeconfig = trimmedFile.match(configRegex)[1];
        routeconfig = '{\"value\":[' + routeconfig + ']}';
        routeconfig = routeconfig.replace(/'/g, '"');
        var configCollection = JSON.parse(routeconfig).value;
        var category = {};
        for (var configs of configCollection) {
            var isExists = fs.existsSync(path + "/" + configs.path.split('/')[1] + '-functional.tsx');
            // Based on the gulp arguments demo samples run with functional or class snippet.
            // `gulp serve` - Loads the functional component samples preview for React. If demo having functional component samples then SB run with functional snippet otherwise run with class snippet.
            // `gulp serve --class` - Loads the class component samples preview for React.
            if (process.argv[3] == '--class' || !isExists) {
                localimports += 'import { ' + configs.component + ' } from \'./' + configs.path.split('/')[1] + '\';\n';
            } else if (isExists) {
                localimports += 'import ' + configs.component + ' from \'./' + configs.path.split('/')[1] + '-functional' + '\';\n';
            }
            routes += '         <Route  path=\'/:theme/' + configs.path + '\' Component={ ' + configs.component + ' }/>\n';
            category[configs.path.split('/')[1]] = {
                'name': configs.name,
                'category': configs.category
            };
            var curSearchObject = {
                name: configs.name,
                uid: uid,
                path: configs.path
            };
            curSearchObject.component = configs.path.split('/')[0].replace(/-/g, '');
            if (parsing[count] && parsing[count].hideOnDevice == true) {
                curSearchObject.hideOnDevice = parsing[count].hideOnDevice;
            }
            var url = configs.path.split('/')[1];
            instance.addDoc(curSearchObject);
            uid++;
        }
        category['defaultSample'] = configCollection[0].path;
        var routeContent = fs.readFileSync('./src/common/templates/route-template', 'utf8');
        routeContent = routeContent.replace(/{{routerimports}}/, localimports);
        routeContent = routeContent.replace(/{{component}}/g, componentName);
        routeContent = routeContent.replace(/{{routes}}/, routes);
        routeContent = routeContent.replace(/{{category}}/, JSON.stringify(category));
        imports += 'import { ' + componentName + 'Routes } from \'../' + path.split('/')[2] + '/' + componentName + '-routes\';\n';
        categories += '"' + compName + '": ' + JSON.stringify(category) + ',\n';
        compRoutes += '        {' + componentName + 'Routes}\n';
        fs.writeFileSync(path + '/' + componentName + '-routes.tsx', routeContent);
    }
    categories = categories.slice(0, -2) + '\n}';
    var allroutes = fs.readFileSync('./src/common/templates/route-all-template', 'utf8');
    allroutes = allroutes.replace(/{{imports}}/, imports);
    allroutes = allroutes.replace(/{{routerCollection}}/, compRoutes);
    allroutes = allroutes.replace(/{{category}}/, categories);
    fs.writeFileSync('./src/common/all-routes.tsx', allroutes);
    fs.writeFileSync('./src/common/search-index.json', JSON.stringify(instance.toJSON()));
    done();
});

function preProcess() {
    var googleAnalyticsScript = `
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-W8WD8WN');</script>
    <!-- End Google Tag Manager -->`
    var bodyScript = "ej2-samples" ? `
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W8WD8WN"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <div hidden id="sync-analytics" data-queue="EJ2 - Javascript - Demos"></div>
    ` : `
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W8WD8WN"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <div hidden id="sync-analytics" data-queue="EJ2 - react - Demos"></div>
    `
    var hFiles = glob.sync('./samples/**/index.html');
    for (var hFile of hFiles) {
        var htmlCont = fs.readFileSync(hFile, 'utf8');
        var $ = cheerio.load(htmlCont);
        var headContent = $('head').html();
        if (headContent.indexOf('gtm.start') === -1) {
            var nHtml = `<!DOCTYPE html>\n<html lang="en">\n<head> ${googleAnalyticsScript}   ${headContent}    \n</head>\n<body class="ej2-new">\n        ${bodyScript + $('body').html()}\n</body>\n</html>`;
            fs.writeFileSync(hFile, nHtml, 'utf8');
        }
    }
}
exports.preProcess = preProcess;

gulp.task('react-bundle-new', function (done) {
        var os = require('os');
        if (os.hostname().toLowerCase().indexOf('jenkins') !== -1) {
            shelljs.exec('free -m');
        }
        else if (os.platform() === 'win32') {
            shelljs.exec('increase-memory-limit');
        }
        var fcode = shelljs.exec('node --max-old-space-size=7168 ./node_modules/gulp/bin/gulp.js new-bundle');
        if (fcode.code !== 0 || checkErrorCode(fcode.stdout)) {
            process.exit(1);
        }
    done();
});

function checkErrorCode(errorCode) {
    return errorCode && /error/i.test(errorCode) && !(/error-/i.test(errorCode));
}

function extend(copied, first, second, deep) {
    var result = copied || {};
    var length = arguments.length;
    if (deep) {
        length = length - 1;
    }
    var _loop_1 = function (i) {
        if (!arguments_1[i]) {
            return 'continue';
        }
        var obj1 = arguments_1[i];
        Object.keys(obj1).forEach(function (key) {
            var src = result[key];
            var copy = obj1[key];
            var clone;
            if (deep && isObject(copy)) {
                clone = isObject(src) ? src : {};
                result[key] = extend({}, clone, copy, true);
            }
            else {
                result[key] = copy;
            }
        });
    };
    var arguments_1 = arguments;
    for (var i = 1; i < length; i++) {
        _loop_1(i);
    }
    return result;
}
function isObject(obj) {
    var objCon = {};
    return (!isNullOrUndefined(obj) && obj.constructor === objCon.constructor);
}

 function isNullOrUndefined(value) {
    return value === undefined || value === null;
}

gulp.task('serve', function(done) {
    runSequence('build',function() {
        var browserSync = require('browser-sync');
        var bs = browserSync.create('Essential TypeScript');
        var options = {
            server: {
                baseDir: './'
            },
            ui: false
        };
        bs.init(options, done);
    });
});

/**
 * Compile styles
 */
gulp.task('styles-all', gulp.series(function () {
    var sass = require('gulp-sass')(require('sass'));
    return gulp.src(['./**/*.scss', '!./node_modules/**/*.scss'], { base: './' })
        .pipe(sass({
            outputStyle: 'expanded',
            includePaths: './node_modules/@syncfusion/'
        }))
        .pipe(gulp.dest('.'));
}));
