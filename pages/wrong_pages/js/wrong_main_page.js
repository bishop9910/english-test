new Vue({
    el:'#main',
    data(){
        return {
            wrongData:null,
            e_s_mode:'chinese_english',
            mode:'words'
        }
    },
    methods:{
         getWrongData(){
            return api.readMistake()
        },
        openNewWindow(path){
            api.creatChildWindow(path)
        },
        start(){
            // console.log(this.e_s_mode,this.mode,this.wrongData)
            this.openNewWindow(`./pages/wrong_pages/${this.mode}_pages/${this.e_s_mode}.html`)
        }
    },
    async created(){
        this.wrongData = await this.getWrongData()
    }
})

// while(true){
//     if(wrongData != null){
//         break;
//     }
// }