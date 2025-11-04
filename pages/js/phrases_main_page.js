//To store phrases list
//2024
//bishop9910
const vm = new Vue({
    el:'#main',
    data(){
        return {
            phrasesList:api.phrases
        }
    },
    methods:{
        openNewWindow(path){
            api.creatChildWindow(path)
        },
        chinese_english(){
            this.openNewWindow('./pages/phrases_pages/chinese_english.html')
        },
        english_chinese(){
            this.openNewWindow('./pages/phrases_pages/english_chinese.html')
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
    },
    mounted(){
        if(check(api.phrases)){
            swal("短语检查无重复,可以使用")
        }else{
            swal("短语有重复,请重新导入")
        }
    }
})