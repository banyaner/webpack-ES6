/**
 * Created by zhongjx on 2018/6/6.
 */
import 'normalize.css'
import './css/common.css'
import './css/index.css'

console.log('Welcome to Webpack4.x')
fetch('/demo').then(res => res.json()).then((data) => {
    console.log(data)
}).catch(e => console.log(e))
