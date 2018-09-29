Vue.config.devtools = true
Vue.use(Vuex)
var itemList = getItemList([{
    name: '总览',
    value: '/',
    // value: '/overview.html'
}, {
    name: '个人档案',
    value: '/profile.html'
}, {
    name: '目标规划',
    value: '/goal.html'
}, {
    name: '科技树',
    value: '/techtree.html'
}, {
    name: '项目管理',
    value: '/project.html'
}, {
    name: '联系人库',
    value: '/contact.html'
}, {
    name: '成就系统',
    value: '/achieve.html'
}, {
    name: '历史记录',
    value: '/history.html'
}])
var data = {
    currentTagHash: itemList[0].hash,
    currentTagValue: itemList[0].value,
    itemList: itemList
}
var vm = new Vue({
    el: '#root',
    data: function () {
        return data
    },
    methods: {
        mouseOver: function (hash) {
            for (let i = 0; i < itemList.length; i++) {
                if (itemList[i].hash == hash) {
                    itemList[i].isHover = true
                    itemList[i].statusMachiene = 'bg-primary'
                }
            }
        },
        mouseLeave: function (hash) {
            for (let i = 0; i < itemList.length; i++) {
                if (itemList[i].hash == hash) {
                    itemList[i].isHover = false
                    if (data.currentTagHash == hash) {
                        itemList[i].statusMachiene = 'bg-secondary'
                    } else {
                        itemList[i].statusMachiene = ''
                    }
                }
            }
        },
        click: function (hash) {
            data.currentTagHash = hash;
            for (let i = 0; i < itemList.length; i++) {
                if (itemList[i].hash == data.currentTagHash) {
                    data.currentTagValue = itemList[i].value;
                } else {
                    itemList[i].statusMachiene = ''
                }
            }
            $.ajax({
                    // url: data.currentTagValue,
                    url: '/test.html',
                    data: {},
                    type: "GET",
                })
                .done(function (json) {
                    $('#body').html(json)
                })
                .fail(function (xhr, status, errorThrown) {})
                .always(function (xhr, status) {})
        }
    },
});

function getItemList(itemInfoList) {
    var itemList = []
    itemInfoList.forEach(itemInfo => {
        var newItem = {
            name: itemInfo.name,
            value: itemInfo.value,
            isHover: false,
            isChoose: false,
            hash: getHash(),
            statusMachiene: ''
        }
        itemList.push(newItem)
    });
    itemList[0].isChoose = true
    itemList[0].statusMachiene = 'bg-secondary'
    return itemList
}
$(document).ready(function () {

});