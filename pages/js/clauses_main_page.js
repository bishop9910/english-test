//To store clauses list
//2024
//bishop9910
const vm = new Vue({
    el:'#main',
    data(){
        return {
            clausesList:api.clauses
        }
    },
    methods:{
        openNewWindow(path){
            api.creatChildWindow(path)
        },
        uncompleted(){
            var contentHtml = '<div id="info">该功能锐意制作中...</div>'
            let parser = new DOMParser();
            let dom = parser.parseFromString(contentHtml, "text/html");
            var win = dom.getElementById('info');
            swal({
                title:'出错啦',
                icon:'error',
                content:win,
            })
        }
    }
})