//To store vocabulary list
//2024
//bishop9910
const vm = new Vue({
    el:'#main',
    data(){
        return {
            superVocabularyList:api.superWords
        }
    },
    methods:{
        openNewWindow(path){
            api.creatChildWindow(path)
        },
        chinese_english(){
            this.openNewWindow('./pages/superWords_pages/chinese_english.html')
        },
        english_chinese(){
            this.openNewWindow('./pages/superWords_pages/english_chinese.html')
        },
        showWarning(){
            var contentHtml = `<div id="info">
                                <p>该模式难度较高,请谨慎选择使用</p>
                                </div>`
            let parser = new DOMParser();
            let dom = parser.parseFromString(contentHtml, "text/html");
            var win = dom.getElementById('info');
            swal({
                title: '警告\nAlert',
                content: win, // HTML
                focusConfirm: true, //聚焦到确定按钮
            })
        },
    },
    created(){
        if(check(api.superWords)){
            swal("单词检查无重复,可以使用")
        }else{
            swal("单词表有重复,请重新导入")
        }
    }
})