var gulp = require("gulp");
//var browserSync = require('browser-sync');
var webpackConfig = require("./webpack.config.js");
var webpack = require('webpack');
var gulpWebpack = require('gulp-webpack');
var elasticlunr = require('elasticlunr');
var glob = require('glob');
var fs = require('fs');
var configRegex = /\[(.*)\]/;
var shelljs = require('shelljs');
var runSequence = require('run-sequence')

gulp.task('scripts', function (done) {
    var ts = require('gulp-typescript');
    var tsProject = ts.createProject('tsconfig.json', { typescript: require('typescript') });

    var tsResult = gulp.src(['./**/*.ts', './**/*.tsx', '!./node_modules/**/*.ts', '!./node_modules/**/*.tsx','!./samples/**/*.tsx'], { base: '.' })
        .pipe(tsProject());
    tsResult.js.pipe(gulp.dest('./'))
        .on('end', function () {
            done();
        });
});

/**
 * Compile styles
 */
gulp.task('styles', function () {
    var sass = require('gulp-sass');
    return gulp.src(['./**/*.scss', '!./node_modules/**/*.scss'], { base: './' })
        .pipe(sass({
            outputStyle: 'expanded',
            includePaths: './node_modules/@syncfusion/'
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('generate-router', function (done) {
    var imports = '';
    var compRoutes = '';
    var allconfig = '';
    var categories = '{';
    var files = glob.sync('./src/**/config.tsx');
    elasticlunr.clearStopWords();
    var instance = elasticlunr(function () {
        this.addField('component');
        this.addField('name');
        this.setRef('uid');
    });
    var uid = 0;
    for (var file of files) {
        var routeconfig = '';
        var localimports = '';
        var routes = ''
        var path = file.slice(0, file.lastIndexOf('/'));
        var compName = path.slice(path.lastIndexOf('/') + 1);
        var componentName = compName.replace('-', '');
        var curfile = JSON.stringify(fs.readFileSync(file, 'utf8'));
        var trimmedFile = curfile.replace(/\\n|\\r/g, '');
        routeconfig = trimmedFile.match(configRegex)[1];
        routeconfig = "{\"value\":[" + routeconfig + "]}";
        routeconfig = routeconfig.replace(/'/g, '"');
        var configCollection = JSON.parse(routeconfig).value;
        var category = {};
        for (var configs of configCollection) {
            localimports += 'import { ' + configs.component + ' } from \'./' + configs.path.split('/')[1] + '\';\n';
            routes += '         <Route  path=\'/:theme/' + configs.path + '\' component={ ' + configs.component + ' }/>\n';
            category[configs.path.split('/')[1]] = { 'name': configs.name, 'category': configs.category };
            var curSearchObject = {name:configs.name,uid:uid,path:configs.path};
            curSearchObject.component =  configs.path.split('/')[0].replace(/-/g,'');
            instance.addDoc(curSearchObject);
            uid++;
        }
        category['defaultSample'] = configCollection[0].path;
        var routeContent = fs.readFileSync('./src/common/templates/route-template', 'utf8');
        routeContent = routeContent.replace(/{{routerimports}}/, localimports);
        routeContent = routeContent.replace(/{{component}}/g,componentName);
        routeContent = routeContent.replace(/{{routes}}/, routes);
        routeContent = routeContent.replace(/{{category}}/,JSON.stringify(category));
        imports += 'import { '+componentName+'Routes } from \'../'+ path.split('/')[2] + '/' + componentName+'-routes\';\n';
        categories += '"' + compName + '": ' + JSON.stringify(category) + ',\n';
        compRoutes += '        {' +componentName+'Routes}\n';
        fs.writeFileSync(path+'/'+componentName+'-routes.tsx', routeContent);
    }
    categories = categories.slice(0, -2) + '\n}';
    var allroutes = fs.readFileSync('./src/common/templates/route-all-template', 'utf8');
    allroutes = allroutes.replace(/{{imports}}/,imports);
    allroutes = allroutes.replace(/{{routerCollection}}/,compRoutes);
    allroutes = allroutes.replace(/{{category}}/, categories);
    fs.writeFileSync('./src/common/all-routes.tsx',allroutes);
    fs.writeFileSync('./src/common/search-index.json', JSON.stringify(instance.toJSON()));
    done();
});
gulp.task('build', function (done) {
    runSequence('generate-router','styles','scripts','bundle', 'plnkr-json', done);
});

gulp.task('bundle', function () {
    return gulp.src("./src/common/index.js")
    .pipe(gulpWebpack(webpackConfig,webpack))
    .pipe(gulp.dest('dist/'));
});

gulp.task('plnkr-json', function() {
    var files = glob.sync('./src/**/*.tsx', { silent: true, ignore: [
        './src/common/**/*.tsx', './src/**/*-routes.tsx', './src/**/config.tsx'] });
    var sys = fs.readFileSync('./src/common/plnk-template/systemjs.config.js','utf8');
    var ind = fs.readFileSync('./src/common/plnk-template/index.html', 'utf8');
    var sBase = fs.readFileSync('./src/common/plnk-template/sample-base.tsx', 'utf8');
    var propPane = fs.readFileSync('./src/common/property-pane.tsx', 'utf8');
    var ajaxRegex = /Ajax\(\'\.\/src\//;
    var sbRegex = /(import[^;]+sample-base[^;]+;)/;
    var gJsonRegex = /import[^;]+\.json[^;]+;/g;
    var jsonRegex = /import[^;]+\.json[^;]+;/;
    var imgRegex = /(<img[^\/]+\/)|(imageUrl)|(background-image: url\((\'|\"|)(\.\/|)src)|((\'|\")(\.\/|)src\/[^\'\"]+.png(\'|\"))/;
    var srcRegex = /(\.\/|)src\//;
    var aSrcRegex = /('|")\.\/src[^'"]+('|")/;
    var cPathRegex = /..\/common\//g;
    var pathRegex = /\'[^\']+\'/;
    var quotesRegex = /(\'|\")/g;
    var impRegex = /import[^;]+\.\/[^;]+;/g;
    var slashRegex = /\.\//;
    var impCssRegex = /import[^'"]+('|")[^'"]+css('|")(;|)/;
    var impPropRegex = /import[^;]+\/property-pane[^;]+;/
    var classRegex = /class [^ ]+/;
    var bgRegex = /background-image: url\(\'\.\/src/g;
    var render = '\nReactDOM.render(<{{:Comp}} />, document.getElementById(\'sample\'));';
    var dSrc = 'demos/src/';
    var link = 'http://cdn.syncfusion.com/ej2/'; //Dependency Packages Link
    var sbLink = 'http://ej2.syncfusion.com/react/'; //Sample Browser support Link
    sys = sys.replace(/{{:CDN_LINK}}/g, link);
    ind = ind.replace(/{{:CDN_LINK}}/g, link);
    var comp;
    for(var i = 0; i < files.length; i++) {
        var plnkr = { 'index.css': '' };
        var name = files[i].slice(files[i].lastIndexOf('/') + 1, files[i].indexOf('.tsx'));
        var path = files[i].slice(0, files[i].lastIndexOf('/') + 1);
        var tsxFile = fs.readFileSync(files[i], 'utf8');
        var className = tsxFile.match(classRegex)[0].slice(6);
        //CSS imports processing
        if(impCssRegex.test(tsxFile)) {
            var styleName = tsxFile.match(impCssRegex)[0].match(/(\'|\")[^\'\"]+(\'|\")/)[0].replace(quotesRegex,'').slice(2);
            var cfile = fs.readFileSync(path + styleName, 'utf8');
            if(imgRegex.test(cfile)) {
                var clines = cfile.split('\n');
                for(var x = 0; x < clines.length; x++) {
                    if(imgRegex.test(clines[x])) {
                        clines[x] = clines[x].replace(srcRegex, sbLink + dSrc);
                    }
                }
                cfile = clines.join('\n');
            }
            plnkr['index.css'] = cfile;
        }
        //Sample-Base Processing
        tsxFile = tsxFile.replace(sbRegex, 'import { SampleBase } from \'./sample-base\';').replace(impCssRegex, '');
        //Property-pane Processing
        if(impPropRegex.test(tsxFile)) {
            tsxFile = tsxFile.replace(impPropRegex, 'import { PropertyPane } from \'./property-pane\';');
            plnkr['app/property-pane.tsx'] = propPane;
        }
        tsxFile = tsxFile + '\nReactDOM.render(<' + className + ' />, document.getElementById(\'sample\'));';
        tsxFile = getStringWithOutDescription(tsxFile, /id(| )=(| )('|")description/);
        tsxFile = getStringWithOutDescription(tsxFile, /('|")action-description/);
        //Background Image Processing
        if(bgRegex.test(tsxFile)) {
            var tLines = tsxFile.split('\n');
            for (var j = 0; j < tLines.length; j++) {
                if(bgRegex.test(tLines[j])) {
                    tLines[j] = tLines[j].slice(0, tLines[j].indexOf('./src')) + 
                        sbLink + 'demos/' + tLines[j].slice(tLines[j].indexOf('src/'));
                }
            }
            tsxFile = tLines.join('\n');
        }
        //Imports Processing other than css, sample base, property-pane, json
        var imports = tsxFile.match(impRegex);
        if(imports.length) {
            for(var y = 0; y < imports.length; y++) {
                if(!sbRegex.test(imports[y]) && !impPropRegex.test(imports[y]) && !jsonRegex.test(imports[y])) {
                    var imFile = imports[y].match(pathRegex)[0].replace(quotesRegex,'').slice(2);
                    plnkr[ imFile ] = fs.readFileSync(path + imFile + '.ts', 'utf8');
                    tsxFile = tsxFile.replace(imports[y], imports[y].replace(slashRegex, '../'));
                }
            }
        }
        //Img processing - sbLink
        if(imgRegex.test(tsxFile)) {
            var tlines = tsxFile.split('\n');
            for(var x = 0; x < tlines.length; x++) {
                if(imgRegex.test(tlines[x])) {
                    tlines[x] = tlines[x].replace(srcRegex, sbLink + dSrc);
                }
            }
            tsxFile = tlines.join('\n');
        }
        //Ajax online link processing - sbLink
        if(ajaxRegex.test(tsxFile)) {
            var tslines = tsxFile.split('\n');
            for(var z = 0; z < tslines.length; z++) {
                if(ajaxRegex.test(tslines[z])) {
                    var aFile = tslines[z].match(aSrcRegex)[0].replace(/\'/g, '').replace(/\"/g, '');
                    plnkr[aFile.slice(2)] = fs.readFileSync(aFile, 'utf8');
                }
            }
            tsxFile = tslines.join('\n');
        }
        //JSON imports processing
        if(jsonRegex.test(tsxFile)) {
            var jsonImports = tsxFile.match(gJsonRegex);
            for(var a = 0; a < jsonImports.length; a++) {
                var jFile = jsonImports[a].match(/\'[^\']+\'/)[0].replace(quotesRegex,'');
                plnkr['app' + jFile.slice(2)] = fs.readFileSync(path + jFile, 'utf8');
            }
        }
        //JSON imports path processing
        if(cPathRegex.test(tsxFile)) {
            tsxFile = tsxFile.replace(cPathRegex, './common/');
        }
        plnkr['systemjs.config.js'] = sys;
        plnkr['index.html'] = ind;
        plnkr['app/index.tsx'] = tsxFile;
        plnkr['app/sample-base.tsx'] = sBase;
        fs.writeFileSync(path + name + '-plnkr.json', JSON.stringify(plnkr), 'utf8');            
        var samplePath = 'samples' + path.slice(5) + name;
        shelljs.mkdir('-p', samplePath);
        samplePath += '/';
        var plFiles = Object.keys(plnkr);
        for (var p = 0; p < plFiles.length; p++) {
            if (plFiles[p].split('/').length === 1) {
                fs.writeFileSync(samplePath + plFiles[p], plnkr[plFiles[p]]);
            } else {
                var dirPath = plFiles[p].split('/');
                shelljs.mkdir('-p', (samplePath + dirPath.splice(0, dirPath.length - 1).join('/')));
                fs.writeFileSync(samplePath + plFiles[p], plnkr[plFiles[p]]);
            }
        }

    }
});
function getStringWithOutDescription(code, descRegex) {
        var lines = code.split('\n');
        var desStartLine = null;
        var desEndLine = null;
        var desInsideDivCnt = 0;
        for (var i = 0; i < lines.length; i++) {
            var curLine = lines[i];
            if (desStartLine !== null) {
                if (/<div/g.test(curLine)) {
                    desInsideDivCnt = desInsideDivCnt + 1;
                }
                if (desInsideDivCnt && /<\/div>/g.test(curLine)) {
                    desInsideDivCnt = desInsideDivCnt - 1;
                } else if (!desEndLine && /<\/div>/g.test(curLine)) {
                    desEndLine = i + 1;
                }
            }
            if (descRegex.test(curLine)) {
                desStartLine = i;
	
            }
        }
        if (desEndLine && (desStartLine !== null)) {
            lines.splice(desStartLine, desEndLine - desStartLine);
        }
        return lines.join('\n');
    }
gulp.task('serve', ['build'], function (done) {
    var browserSync = require('browser-sync');
    var bs = browserSync.create('Essential JS 2 react');
    var options = {
        server: {
            baseDir: './'
        },
        ui: false
    };
    bs.init(options, done);
});