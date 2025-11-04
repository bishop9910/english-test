//To store phrases list
//2024
//bishop9910
new Vue({
    el:'#main',
    data(){
        return {
            wrongData: null,
            phrasesList: [],
            A: 'waiting for init',
            B: 'waiting for init',
            C: 'waiting for init',
            D: 'waiting for init',
            english_question: '', //english question,
            answer_index: 0,//answer index in vocabularyList
            answer: 0,//0: A, 1: B, 2: C, 3: D
            ran1: null,
            ran2: null,
            ran3: null,
            ran4: null,
        }
    },//statement ? data1 : data2
    methods:{
        chinese_options_consturctor(){
            var ran1 = Math.floor(Math.random()*this.phrasesList.length)
            var ran2 = Math.floor(Math.random()*this.phrasesList.length)
            var ran3 = Math.floor(Math.random()*this.phrasesList.length)
            var ran4 = Math.floor(Math.random()*this.phrasesList.length)

            while(ran1 == ran2 || ran1 == ran3 || ran1 == ran4 || ran2 == ran3 || ran2 == ran4 || ran3 == ran4){
                ran1 = Math.floor(Math.random()*this.phrasesList.length)
                ran2 = Math.floor(Math.random()*this.phrasesList.length)
                ran3 = Math.floor(Math.random()*this.phrasesList.length)
                ran4 = Math.floor(Math.random()*this.phrasesList.length)
            }
            
            this.answer_index = ran1

            this.ran1 = ran1
            this.ran2 = ran2
            this.ran3 = ran3
            this.ran4 = ran4

            this.english_question = this.phrasesList[this.answer_index].phrase

            this.answer = Math.floor(Math.random()*4)
            if(this.answer == 0){
                this.A = this.phrasesList[this.answer_index].meaning
                this.B = this.phrasesList[ran2].meaning
                this.C = this.phrasesList[ran3].meaning
                this.D = this.phrasesList[ran4].meaning
            }else if(this.answer == 1){
                this.A = this.phrasesList[ran2].meaning
                this.B = this.phrasesList[this.answer_index].meaning
                this.C = this.phrasesList[ran3].meaning
                this.D = this.phrasesList[ran4].meaning
            }else if(this.answer == 2){
                this.A = this.phrasesList[ran3].meaning
                this.B = this.phrasesList[ran2].meaning
                this.C = this.phrasesList[this.answer_index].meaning
                this.D = this.phrasesList[ran4].meaning
            }else if(this.answer == 3){
                this.A = this.phrasesList[ran4].meaning
                this.B = this.phrasesList[ran2].meaning
                this.C = this.phrasesList[ran3].meaning
                this.D = this.phrasesList[this.answer_index].meaning
            }else{
                console.log('error')
            }
        },
        optionClick(option){
            if(option == this.answer){
                this.chinese_options_consturctor()
            }else{
                var contentHtml = '<div id="worng"><br/>本次答案为:' + this.phrasesList[this.answer_index].phrase + " <br/>" + this.phrasesList[this.answer_index].meaning + '<br/></div>'
                let parser = new DOMParser();
                let dom = parser.parseFromString(contentHtml, "text/html");
                var win = dom.getElementById('worng');
                this.recordMistakes(this.answer_index)
                swal({
                    title:'Wrong',
                    icon:'error',
                    content: win, // HTML
                    buttons:{
                        cancel: true,
                        confirm: true,
                      },
                }).then(next => {//判断是否点击了下一题
                    if(next){
                        this.chinese_options_consturctor()
                    }else{
                        swal({
                            title:"自动下一题喵",
                            text:"你虽然想退出,但没得选"
                        })
                        this.chinese_options_consturctor()
                    }
                })
            }

        },
        recordMistakes(id){
            var mistake = this.phrasesList[id]
            api.writeMistake(mistake)
        },
        getWrongData(){
            return api.readMistake()
        }
    },
    async created(){
        this.wrongData = await this.getWrongData()
        var length = Object.keys(this.wrongData.phrases).length
        if(length < 4){
            swal({
                title:"错题数量不大够喵",
                text:"再去练练吧,说不定有错呢"
            })
        }
        else{
            if(length < 8){
                swal({
                    title:"错题数量有点少喵",
                    text:"再错几题体验感更强哦"
                })
            }
            for(let i = 0; i < length; i++){
                this.phrasesList.push(this.wrongData.phrases[Object.keys(this.wrongData.phrases)[i]])
            }
            this.chinese_options_consturctor()
        }
    }
})