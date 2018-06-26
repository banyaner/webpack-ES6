/**
 * Created by zhongjx on 2018/6/25.
 */
window.Promise = Promise
function _needConsole() {
    return /(Android|BlackBerry|iPhone|iPad|iPod|IEMobile|Windows Phone|SymbianOS)/ig.test(navigator.userAgent) && !/^c.m.163/.test(window.location.host) && !/simulator/.test(navigator.userAgent)
}

if (_needConsole()) {
    import(/* webpackChunkName: "eruda" *//* webpackMode: "lazy" */'eruda').then((eruda) => {
        eruda.default.init()
    })
}
