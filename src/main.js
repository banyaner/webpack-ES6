/**
 * Created by zhongjx on 2018/6/6.
 */
import './css/common.css'

fetch('/demo').then(res => res.json()).then((data) => {
    console.log(data)
}).catch(e => console.log(e))

