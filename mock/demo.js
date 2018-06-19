/**
 * Created by zhongjx on 1/20/17.
 */
module.exports = {
    api: '/demo',
    response: function (req, res) {
        var data = {
            test: 334
        }
        res.send(data)
    }
}