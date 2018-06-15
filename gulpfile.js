var gulp = require('gulp'),
    replace = require('gulp-replace'),
    exec = require('child_process').exec,
    vinylftp = require('vinyl-ftp'),
    fs = require('fs'),
    easeftp = require('easeftp'),
    upload = require('easeftp/upload').add,
    ftppass = JSON.parse(fs.readFileSync('.ftppass', 'utf-8')),
    pkg = require('./package.json'),
    plumber = require('gulp-plumber')
    gulpTinyPng = require('gulp-tinypng-extended')

gulp.task('tinypng', function () {
    gulp.src('src/assets/*.{png,jpg,jpeg}')
        .pipe(plumber())
        .pipe(gulpTinyPng({
            key: 'P4chNr_-gK9KyeLZp57A6edewAEVaQMt',
            sigFile: '.tinypng-sigs',
            sameDest: true,
            summarise: true,
            log: true
        }))
        .pipe(gulp.dest('src/assets'))
    gulp.src('static/*.{png,jpg,jpeg}')
        .pipe(plumber())
        .pipe(gulpTinyPng({
            key: 'P4chNr_-gK9KyeLZp57A6edewAEVaQMt',
            sigFile: '.tinypng-sigs',
            sameDest: true,
            summarise: true,
            log: true
        }))
        .pipe(gulp.dest('static'))
})

gulp.task('test', function () {
    exec(`cp -rf dist ${pkg.name}`, function () {
        exec(`scp -r ${pkg.name} ${ftppass.test.username}@${ftppass.test.host}:/home/appops/app/activity`, function (e) {
            e && console.log(e)
            exec(`rm -rf ${pkg.name}`)
        })
    })
})

gulp.task('pre', function () {
    exec(`cp -rf dist ${pkg.name}`, function () {
        exec(`scp -r ${pkg.name} ${ftppass.pre.username}@${ftppass.pre.host}:/home/appops/htmlfile/activity`, function (e) {
            e && console.log(e)
            exec(`rm -rf ${pkg.name}`)
        })
    })
})

gulp.task('publish', function () {
    if (!pkg.projectId) {
        throw new Error('package.json中未添加统计的ntmId')
    }
    const statistics = [
        `window.ntmId =${pkg.ntmId}; <script>(function(w,d,s,n) {var f=d.getElementsByTagName(s)[0],k=d.createElement(s);k.async=true;k.src="//static.ws.126.net/utf8/3g/analytics/data1/"+n+".js";f.parentNode.insertBefore(k,f);})(window,document,"script","${pkg.ntmId}");</script>`
    ].join('')
    const conn = vinylftp.create(ftppass.vinylftp)
    gulp.src(['dist/index.html'])
        .pipe(replace('</head>', statistics))
        .pipe(conn.dest('qa/activity/' + pkg.name))
    return upload(['**/**'], {
        username: ftppass.easeftp.username,
        password: ftppass.easeftp.password,
        path: 'activity/' + pkg.name,    //cdn线上路径
        debug: true,
        cwd: './dist',        //指定匹配的根目录
        exclude: ['index.html', '*.map']
    }).then(({urls}) => {
        // console.log(urls)
    })
})
