//To store vocabulary list
//2025
//bishop9910
new Vue({
    el:'#main',
    data(){
        return {
            fourVocabularyList:api.fourWords
        }
    },
    methods:{
        openNewWindow(path){
            api.creatChildWindow(path)
        },
        chinese_english(){
            this.openNewWindow('./pages/fourWords_pages/chinese_english.html')
        },
        english_chinese(){
            this.openNewWindow('./pages/fourWords_pages/english_chinese.html')
        },
        showWarning(){
            var contentHtml = `<div id="info">
                                <p>该模式为4级英语单词专项</p>
                                </div>`
            let parser = new DOMParser();
            let dom = parser.parseFromString(contentHtml, "text/html");
            var win = dom.getElementById('info');
            swal({
                title: '通知\nInfo',
                content: win, // HTML
                focusConfirm: true, //聚焦到确定按钮
            })
        },
    },
    created(){
        if(check(api.fourWords)){
            swal("单词检查无重复,可以使用")
        }else{
            swal("单词表有重复,请重新导入")
        }
    }
})