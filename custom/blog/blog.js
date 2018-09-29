WebsiteOpenTime = moment('2018-10-07 12:00:00')
Vue.config.devtools = true
moment.locale('zh-cn')
var duration = moment.duration(WebsiteOpenTime.diff(moment()))
console.log(duration < 0);
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
if (duration >= 0) {
    $('#md').modal({
        show: false,
        backdrop: 'static',
        keyboard: false
    })
} else {
    $('#md').modal({
        show: false,
        backdrop: 'static',
        keyboard: false
    })
}
