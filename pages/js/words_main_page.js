//To store vocabulary list
//2024
//bishop9910
new Vue({
    el:'#main',
    data(){
        return {
            vocabularyList:api.words
        }
    },
    methods:{
        openNewWindow(path){
            api.creatChildWindow(path)
        },
        chinese_english(){
            this.openNewWindow('./pages/words_pages/chinese_english.html')
        },
        english_chinese(){
            this.openNewWindow('./pages/words_pages/english_chinese.html')
        },
    },
    mounted(){
        if(check(api.words)){
            swal("单词检查无重复,可以使用")
        }else{
            swal("单词表有重复,请重新导入")
        }
    }
})