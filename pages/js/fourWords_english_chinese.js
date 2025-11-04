//To store vocabulary list
//2025
//bishop9910
new Vue({
    el:'#main',
    data(){
        return {
            fourVocabularyList:api.fourWords,
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
    },
    methods:{
        chinese_options_consturctor(){
            var ran1 = Math.floor(Math.random()*this.fourVocabularyList.length)
            var ran2 = Math.floor(Math.random()*this.fourVocabularyList.length)
            var ran3 = Math.floor(Math.random()*this.fourVocabularyList.length)
            var ran4 = Math.floor(Math.random()*this.fourVocabularyList.length)

            while(ran1 == ran2 || ran1 == ran3 || ran1 == ran4 || ran2 == ran3 || ran2 == ran4 || ran3 == ran4){
                ran1 = Math.floor(Math.random()*this.fourVocabularyList.length)
                ran2 = Math.floor(Math.random()*this.fourVocabularyList.length)
                ran3 = Math.floor(Math.random()*this.fourVocabularyList.length)
                ran4 = Math.floor(Math.random()*this.fourVocabularyList.length)
            }
            
            this.answer_index = ran1

            this.ran1 = ran1
            this.ran2 = ran2
            this.ran3 = ran3
            this.ran4 = ran4

            this.english_question = this.fourVocabularyList[this.answer_index].word

            this.answer = Math.floor(Math.random()*4)
            if(this.answer == 0){
                this.A = this.fourVocabularyList[this.answer_index].meaning
                this.B = this.fourVocabularyList[ran2].meaning
                this.C = this.fourVocabularyList[ran3].meaning
                this.D = this.fourVocabularyList[ran4].meaning
            }else if(this.answer == 1){
                this.A = this.fourVocabularyList[ran2].meaning
                this.B = this.fourVocabularyList[this.answer_index].meaning
                this.C = this.fourVocabularyList[ran3].meaning
                this.D = this.fourVocabularyList[ran4].meaning
            }else if(this.answer == 2){
                this.A = this.fourVocabularyList[ran3].meaning
                this.B = this.fourVocabularyList[ran2].meaning
                this.C = this.fourVocabularyList[this.answer_index].meaning
                this.D = this.fourVocabularyList[ran4].meaning
            }else if(this.answer == 3){
                this.A = this.fourVocabularyList[ran4].meaning
                this.B = this.fourVocabularyList[ran2].meaning
                this.C = this.fourVocabularyList[ran3].meaning
                this.D = this.fourVocabularyList[this.answer_index].meaning
            }else{
                console.log('error')
            }
        },
        optionClick(option){
            if(option == this.answer){
                this.chinese_options_consturctor()
            }else{
                var contentHtml = '<div id="worng"><br/>本次答案为:' + this.fourVocabularyList[this.answer_index].word + " <br/>" + this.fourVocabularyList[this.answer_index].meaning + '<br/></div>'
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
            var mistake = this.fourVocabularyList[id]
            api.writeMistake(mistake)
        }
    },
    created(){
        this.chinese_options_consturctor()
    }
})