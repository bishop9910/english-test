//To store phrases list
//2024
//bishop9910
const vm = new Vue({
    el:'#main',
    data(){
        return {
            phrasesList: api.phrases,
            A: 'waiting for init',
            B: 'waiting for init',
            C: 'waiting for init',
            D: 'waiting for init',
            chinese_question: '', //chinese question,
            answer_index: 0,//answer index in vocabularyList
            answer: 0,//0: A, 1: B, 2: C, 3: D
            ran1: null,
            ran2: null,
            ran3: null,
            ran4: null,
        }
    },
    methods:{
        english_options_consturctor(){
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

            this.chinese_question = this.phrasesList[this.answer_index].meaning

            this.answer = Math.floor(Math.random()*4)
            if(this.answer == 0){
                this.A = this.phrasesList[this.answer_index].phrase
                this.B = this.phrasesList[ran2].phrase
                this.C = this.phrasesList[ran3].phrase
                this.D = this.phrasesList[ran4].phrase
            }else if(this.answer == 1){
                this.A = this.phrasesList[ran2].phrase
                this.B = this.phrasesList[this.answer_index].phrase
                this.C = this.phrasesList[ran3].phrase
                this.D = this.phrasesList[ran4].phrase
            }else if(this.answer == 2){
                this.A = this.phrasesList[ran3].phrase
                this.B = this.phrasesList[ran2].phrase
                this.C = this.phrasesList[this.answer_index].phrase
                this.D = this.phrasesList[ran4].phrase
            }else if(this.answer == 3){
                this.A = this.phrasesList[ran4].phrase
                this.B = this.phrasesList[ran2].phrase
                this.C = this.phrasesList[ran3].phrase
                this.D = this.phrasesList[this.answer_index].phrase
            }else{
                console.log('error')
            }
        },
        optionClick(option){
            if(option == this.answer){
                this.english_options_consturctor()
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
                }).then(next => {
                    if(next){
                        this.english_options_consturctor()
                    }else{
                        swal({
                            title:"自动下一题喵",
                            text:"你虽然想退出,但没得选"
                        })
                        this.english_options_consturctor()
                    }
                })
            }

        },
        recordMistakes(id){
            var mistake = this.phrasesList[id]
            api.writeMistake(mistake)
        }
    },
    created(){
        this.english_options_consturctor()
    }
})