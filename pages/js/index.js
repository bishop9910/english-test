//for index.html 2024/10/31
new Vue({
    el:'#main',
    methods:{
        showIcon(){
            var contentHtml = `<div id="info">
                                    <code>
                                        English-test version:1.7.2<br/>修复bug \n2025.11.4
                                    </code>
                                    <br/>
                                    <p>By bishop9910</p>
                                    <br/>
                                    <img src="./img/icon.jpg" style="width: 100px; height: 100px;">
                                    <br/>
                                    <code>
                                        适用于Windows10及以上系统<br/>For Windows10 or above.
                                    </code>
                                </div>`
            let parser = new DOMParser();
            let dom = parser.parseFromString(contentHtml, "text/html");
            var win = dom.getElementById('info');
            swal({
                title: '作者',
                content: win, // HTML
                focusConfirm: true, //聚焦到确定按钮
            })
        },
        openNewWindow(path){
            api.creatChildWindow(path)
        },
        words(){
            this.openNewWindow('./pages/words_pages/main_page.html')
        },
        superWords(){
            this.openNewWindow('./pages/superWords_pages/main_page.html')
        },
        fourWords(){
            this.openNewWindow('./pages/fourWords_pages/main_page.html')
        },
        phrases(){
            this.openNewWindow('./pages/phrases_pages/main_page.html')
        },
        clauses(){
            swal({
                title: '锐意制作中',
                text: '敬请期待',
                icon: 'info',
                button: '确定',
            })
            // this.openNewWindow('./pages/clauses_pages/main_page.html')
        },
        wrong(){
            this.openNewWindow('./pages/wrong_pages/main_page.html')
        }

    },
    mounted(){
        this.showIcon() //页面加载完成后显示作者信息
    }
})