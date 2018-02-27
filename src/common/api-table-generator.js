var gulp = require('gulp');
var http = require('http');
var md = require('markdown-it');
var fs = require('fs');
var zlib = require('zlib');
const packageRegex = /@syncfusion\/ej2-/;
var config = require('../../package.json');
var dataCollection = [];
var match = ['Property', 'Method', 'Event'];
var bucketName = process.env.AWS_STAGING_BUCKET || 'npmci.syncfusion.com';
var gutil = require('gulp-util');
var link = 'http://' + bucketName + '/';
if (process.env.BRANCH_NAME === "master") {
    link += 'production/';
} else if (link.indexOf('ej2.syncfusion.com') === -1) {
    link += 'development/';
}
var apiLink = link;

if ((process.env.BRANCH_NAME && process.env.BRANCH_NAME.indexOf('hotfix-') !== -1) || !process.env.AWS_STAGING_BUCKET) {
    apiLink = 'http://npmci.syncfusion.com/production/';
}
var sbMacth = config.name.match(/react|ng/);

link += (sbMacth ? sbMacth[0] + '/' : '') + 'documentation/';
gulp.task('process-api', function (done) {
    fs.writeFileSync('./src/common/api-table', JSON.stringify({}));
    var count = 0;
    var dependenciesArray = Object.keys(config.dependencies).filter(function (value) {
        return packageRegex.test(value);
    });
    var length = dependenciesArray.length;
    if (!length) {
        done();
    }
    for (var i = 0; i < length; i++) {
        var curPackage = dependenciesArray[i];
        getGzipped(apiLink + 'api/' + curPackage.split('/')[1] + '/file.json', function (err, data, packageName) {
            count++
            if (err) {
                console.log(gutil.colors.red('Unable to access file json for ' + packageName));
            } else {
                processApiJson(data);
                console.log('Completed the api processing  for ' + packageName);
            }
            if (count === length) {
                var idata = fs.readFileSync('./src/common/api-table', 'utf8');
                idata = JSON.parse(idata);
                done();
            }
        }, curPackage);
    }
})

var http = require("http"),
    zlib = require("zlib");

function getGzipped(url, callback, package) {
    // buffer to store the streamed decompression
    var buffer = [];
    http.get(url, function (res) {
        // pipe the response into the gunzip to decompress
        var gunzip = zlib.createGunzip();
        res.pipe(gunzip);

        gunzip.on('data', function (data) {
            // decompression chunk ready, add it to the buffer
            buffer.push(data.toString())

        }).on("end", function () {
            // response and decompression complete, join the buffer and return
            callback(null, buffer.join(""), package);

        }).on("error", function (e) {
            callback(e, '', package);
        })
    }).on('error', function (e) {
        callback(e)
    });
}

function processApiJson(data) {
    var apiJson = JSON.parse(fs.readFileSync('./src/common/api-table', 'utf8'));
    var children = JSON.parse(data).children;
    var typeCollection = preProcessChild(children);
    for (child of children) {
        var curModuleName = child.name.replace(/"/g, '').split('/')[0]
        var iChild = child.children || [];
        for (var curChild of iChild) {
            var name = curChild.name;
            var kindstring = curChild.kindString;
            if (kindstring === 'Class' && curChild.flags.isExported && !curChild.flags.isPrivate) {
                var classChilds = curChild.children || [];
                var classObj = {};
                var curLink = link + curModuleName + '/' + convertToLower(name) + '.html#';
                for (var cChild of classChilds) {
                    var kString = cChild.kindString;
                    var isExported = cChild.flags.isExported && !(cChild.flags.isPrivate);
                    if (match.indexOf(kString) !== -1 && (cChild.flags.isPublic || isExported) && !cChild.flags.isProtected) {
                        var propName = cChild.name;
                        var description = '';
                        var mdGen = new md();
                        var canUpdate = false;
                        var dataLink;
                        var iType = '';
                        if (kString === 'Property') {
                            description = getMessageText(cChild)
                            iType = getType(cChild.type, typeCollection);
                            dataLink = curLink + propName.toLowerCase();
                        } else if (kString === 'Method') {
                            iType = 'Method';
                            dataLink = curLink + propName.toLowerCase();
                            if (cChild.signatures) {
                                description = getMessageText(cChild.signatures[0]);
                            }
                        } else if (kString === 'Event') {
                            description = getMessageText(cChild);
                            iType = 'Event';
                            dataLink = curLink + propName.toLowerCase();
                        }
                        var descriptionHTML = mdGen.render(description);
                        classObj[propName] = { name: propName, description: descriptionHTML, type: iType, link: dataLink };
                    }
                }
                if (apiJson[name]) {
                    apiJson[name] = Object.assign(apiJson[name], classObj);
                } else {
                    apiJson[name] = classObj;
                }

            }
        }
    }
    fs.writeFileSync('./src/common/api-table', JSON.stringify(apiJson));
}
function getTagValue(cur) {
    var tags = cur.tags;
    if (cur.tags) {
        for (var i = 0, len = tags.length; i < len; i++) {
            var tag = tags[i];
            if (tag.tag === 'default') {
                var text = tag.text.replace(/\n/g, '');
                if (!text) {
                    return null;
                }
                return text.replace(';', '');
            }
        }
    }
    return null;
}
exports.getTagValue = getTagValue;

function getType(type, typeColl) {
    var iType = '', isArray, decl, intType, id;
    var isUnion = false;
    if (!type) {
        return '';
    }
    if (type.id && typeColl.indexOf(type.id) !== -1) {
        return 'string';
    }
    iType = type.name || (type.elementType ? (type.elementType.name ? type.elementType.name : '') : '');
    intType = type.type;
    isArray = type.isArray || type.type === 'array';
    decl = type.declaration;
    if (!iType) {
        if (intType === 'union') {
            isUnion = true;
            iType = processUnionObject(type, typeColl);
        } else if (decl) {
            iType = 'Object';
        }
    } else if (iType === 'EmitType') {
        var typeArguments = type.typeArguments;
        if (typeArguments && typeArguments.length) {
            var etype = getType(typeArguments[0], []).toLowerCase();
            return 'emittype' + etype.replace(/[^a-zA-Z]/g, '');
        }
        return 'emittype';
    }
    return (isArray ? iType + '[]' : iType);
}

function processUnionObject(obj, typeColl) {
    var types = obj.types;
    var typeString = [];
    for (var k = 0; k < types.length; k++) {
        var name = getType(types[k], typeColl);
        if (name) {
            typeString.push(name);
        }
    }
    return typeString.join('|');
}

function convertToLower(text) {
    return ('api-') + text.substr(0, 1).toLowerCase() + text.substr(1);
}

function getMessageText(msgObject, shortText) {
    if (!msgObject.comment) {
        return '';
    }
    var msgText = (msgObject.comment.shortText || '') +
        ((msgObject.comment.shortText && msgObject.comment.text) ?
            ('\n' + msgObject.comment.text) : (msgObject.comment.text || ''));
    var ret = msgText;
    var sampleIndex = msgText.indexOf('```');
    if (sampleIndex !== -1) {
        ret = removeTableData(msgText, sampleIndex);
    }
    return ret;
}

function removeTableData(str, index) {
    var codesnippetStart = str.slice(index + 3);
    var endIndex = codesnippetStart.indexOf('```');
    var end = (index ? (str.slice(0, index - 1)) : '') + (codesnippetStart.slice(endIndex + 3) || '');
    var endIndex = end.indexOf('```');
    if (endIndex !== -1) {
        end = removeTableData(end, endIndex);
    }
    return end;
}

function preProcessChild(childs) {
    var typeAliasColl = [];
    for (var child of childs) {
        var groups = child.groups || [];
        for (var group of groups) {
            var title = group.title;
            if (title === 'Type aliases') {
                typeAliasColl = typeAliasColl.concat(group.children);
            }
        }
    }
    return typeAliasColl;
}