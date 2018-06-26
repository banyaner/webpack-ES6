/**
 * Created by zhongjx on 2018/6/6.
 */
import 'normalize.css'
import './js/mobileConsole'
import './css/common.css'
import './css/index.css'

fetch('/demo').then(res => res.json()).then((data) => {
    console.log(data)
}).catch(e => console.log(e))

