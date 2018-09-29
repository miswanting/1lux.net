WebsiteOpenTime = moment('2018-10-03 12:00:00')
Vue.config.devtools = true
moment.locale('zh-cn')
var duration = moment.duration(WebsiteOpenTime.diff(moment()))
var vm = new Vue({
    el: '#root',
    data: function () {
        return {
            left: duration.humanize()
        }
    },
    methods: {
    }
})
