let searchBox = document.querySelector('.searchBox')
let headPortrait = document.querySelector('.headPortrait')
let uploadBackground = document.querySelector('.uploadBackground')
let backgroundImg = document.querySelector('.Background>img')
let writeQuestion = document.querySelector('.writeQuestion')
let primebody = document.querySelector('body')
let articleTitle = document.querySelector('.articleTitle')
let articleAuthorName = document.querySelectorAll('.articleAuthorName')
let authorIntroduction = document.querySelectorAll('.authorIntroduction')
let articleMain = document.querySelector('.articleMain')
let floor1 = document.querySelector('.floor1')
let replyBtn1 = document.querySelector('.replyBtn1')
let article = document.querySelector('.article')
let articleBottom = document.querySelector('.articleBottom')

if(!localStorage.getItem('uid')) { //如果未登录则回到登录界面
    location.href = './login.html'
}

let userImformation = JSON.parse(localStorage.getItem('userImformation'))

async function getAuthorImformation(author_id) { //获取作者信息
    try{
        let result1 = await fetch(`http://81.68.76.44:8080/api/v1/users/${author_id}/info`, {
            method: 'get', 
            headers: {
                'Content-Type':'application/json'
            }
        })
        let res2 = await result1.json()
        console.log(res2)
        localStorage.setItem('AuthorImformation', JSON.stringify(res2.data))      
        
    }catch(err) {
        console.log(err)
    } 
}

async function getUsersImformation() { //获取用户信息
    try{
        let result = await fetch(`http://81.68.76.44:8080/api/v1/users/${localStorage.getItem('uid')}/info`, {
            method: 'get', 
            headers: {
                'Content-Type':'application/json'
            }
        })
        let res1 = await result.json()
        localStorage.setItem('userImformation', JSON.stringify(res1.data))
        
        
    }catch(err) {
        console.log(err)
    } 
}

async function getArticleReply() { //获取帖子的评论
    try {
        let result = await fetch(`http://81.68.76.44:8080/api/v1/posts/${localStorage.getItem('pid')}/comments`, {
            method: 'get',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded',
                'uid': userImformation.uid
            }
        })
        let res1 = await result.json()
        let data = res1.data.comments
        console.log('帖子评论' , data)

        floor1.children[0].children[0].innerHTML = data.length //总回答数

        if(data.length > 0){
            for(let i = 0; i < data.length; i++) {
                let li1 = document.createElement('li')
                li1.innerHTML = `
                    <div>
                        <img src="./img/users'headProtrait.jpg">
                        <span>${data[i].author}</span>
                    </div>
                    
                    <article>${data[i].content}</article>
    
                    <div>
                        <span>time</span>
                        <span class='replyBtn'>
                            <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="#7a7a7a">
                                <path fill-rule="evenodd" d="M12 2.75a9.25 9.25 0 1 0 4.737 17.197l2.643.817a1 1 0 0 0 1.25-1.25l-.8-2.588A9.25 9.25 0 0 0 12 2.75Z" clip-rule="evenodd"></path>
                            </svg>
                            回复
                        </span>
                        <span>
                            <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="#7a7a7a">
                                <path d="M8.5 4.078c0-1.834 1.986-2.979 3.573-2.06a4.826 4.826 0 0 1 2.379 4.71l-.114 1.022h3.581c2.53 0 4.334 2.454 3.58 4.868l-1.823 5.833a3.784 3.784 0 0 1-3.848 2.64c-2.372-.147-6.042-.341-8.828-.341H4.5A1.75 1.75 0 0 1 2.75 19V9.5c0-.967.784-1.75 1.75-1.75h.637a3.418 3.418 0 0 0 3.19-2.191c.115-.296.173-.611.173-.928v-.553Z"></path>
                            </svg>
                            203
                        </span>
                    </div>
                    <ul class="floor2">
                        <div>
                            <span>0</span>
                            <span>条评论</span>
                        </div>
                    </ul>
                `
    
                li1.children[2].children[1].addEventListener('click', ()=> {
                    li1.children[2].children[1].style.pointerEvents = 'none'
                    let replyBox = document.createElement('span')
                    replyBox.classList.add('replyBox')
                    replyBox.innerHTML = `
                        <input type='text'>
                        <span>回复</span>
                    `
                    li1.insertBefore(replyBox, li1.children[li1.children.length - 1])
                    replyBox.children[1].addEventListener('click', ()=> { //上传回复
                        if(replyBox.children[0].value != '') {
                            async function replyReply() {
                                let replyObj = {
                                    parent_id: data[i].cid,
                                    root_id: data[i].cid,
                                    commented_uid:data[i].commented_uid,
                                    post_id: data[i].post_id,
                                    content: replyBox.children[0].value
                                }
                                console.log(replyObj)
                                try{
                                    let replyResult = await fetch('http://81.68.76.44:8080/api/v1/comments/reply', {
                                        method: 'post',
                                        headers: {
                                            'Content-Type':'application/json; charset=utf-8',
                                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                                        },
                                        body: JSON.stringify(replyObj)
                                    })
                                    let replyres = await replyResult.json()
                                    console.log(replyres)
                                    location.reload()
                                }catch(err) {
                                    console.log(err)
                                }
                            }
                            replyReply()
                        }
                    })
                    
                })

                li1.children[2].children[0].innerHTML = data[i].create_time
                    
                floor1.appendChild(li1)
                
                async function getArticleReply2() {
                    try {
                        let result2 = await fetch(`http://81.68.76.44:8080/api/v1/comments/${data[i].cid}/replies`, {
                            method: 'get',
                            headers: {
                                'Content-Type':'application/x-www-form-urlencoded',
                                'uid': userImformation.uid
                            }
                        })
                        let res2 = await result2.json()
                        let data2 = res2.data
                        console.log('帖子评论2' , data2)
                        
                        li1.children[3].children[0].children[0].innerHTML = data2.length //总回答数
    
                        
                        if(data2.length > 0){

                            for(let i = 0; i < data2.length; i++) {
                                let li2 = document.createElement('li')
                                li2.innerHTML = `
                                    <div>
                                        <img src="./img/users'headProtrait.jpg">
                                        <span>name</span>
                                    </div>
                                    
                                    <article>${data2[i].content}</article>
                    
                                    <div>
                                        <span>time</span>
                                        <span class='replyBtn'>
                                            <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="#7a7a7a">
                                                <path fill-rule="evenodd" d="M12 2.75a9.25 9.25 0 1 0 4.737 17.197l2.643.817a1 1 0 0 0 1.25-1.25l-.8-2.588A9.25 9.25 0 0 0 12 2.75Z" clip-rule="evenodd"></path>
                                            </svg>
                                            回复
                                        </span>
                                        <span>
                                            <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="#7a7a7a">
                                                <path d="M8.5 4.078c0-1.834 1.986-2.979 3.573-2.06a4.826 4.826 0 0 1 2.379 4.71l-.114 1.022h3.581c2.53 0 4.334 2.454 3.58 4.868l-1.823 5.833a3.784 3.784 0 0 1-3.848 2.64c-2.372-.147-6.042-.341-8.828-.341H4.5A1.75 1.75 0 0 1 2.75 19V9.5c0-.967.784-1.75 1.75-1.75h.637a3.418 3.418 0 0 0 3.19-2.191c.115-.296.173-.611.173-.928v-.553Z"></path>
                                            </svg>
                                            203
                                        </span>
                                    </div>
                                    <ul class="floor3">

                                    </ul>
                                `
        
                                li2.children[2].children[1].addEventListener('click', ()=> {
                                    li2.children[2].children[1].style.pointerEvents = 'none'
                                    let replyBox = document.createElement('span')
                                    replyBox.classList.add('replyBox')
                                    replyBox.innerHTML = `
                                        <input type='text'>
                                        <span>回复</span>
                                    `
                                    li2.insertBefore(replyBox, li2.children[li2.children.length - 1])
                                    replyBox.children[1].addEventListener('click', ()=> { //上传回复
                                        if(replyBox.children[0].value != '') {
                                            async function replyReply() {
                                                let replyObj = {
                                                    parent_id: data2[i].cid,
                                                    root_id: data2[i].cid,
                                                    commented_uid:data2[i].commented_uid,
                                                    post_id: data2[i].post_id,
                                                    content: replyBox.children[0].value
                                                }
                                                console.log(replyObj)
                                                try{
                                                    let replyResult = await fetch('http://81.68.76.44:8080/api/v1/comments/reply', {
                                                        method: 'post',
                                                        headers: {
                                                            'Content-Type':'application/json; charset=utf-8',
                                                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                                                        },
                                                        body: JSON.stringify(replyObj)
                                                    })
                                                    let replyres = await replyResult.json()
                                                    console.log(replyres)
                                                    location.reload()
                                                }catch(err) {
                                                    console.log(err)
                                                }
                                            }
                                            replyReply()
                                        }
                                    })
                                    
                                })

                                li2.children[2].children[0].innerHTML = data2[i].create_time
                                        
                                li1.children[3].appendChild(li2)

                                async function getArticleReply3() {
                                    try {
                                        let result3 = await fetch(`http://81.68.76.44:8080/api/v1/comments/${data2[i].cid}/replies`, {
                                            method: 'get',
                                            headers: {
                                                'Content-Type':'application/x-www-form-urlencoded',
                                                'uid': userImformation.uid
                                            }
                                        })
                                        let res3 = await result3.json()
                                        let data3 = res3.data
                                        console.log('帖子评论3' , data3)

                                        
                    
                                        for(let i = 0; i < data3.length; i++) {
                                            let li3 = document.createElement('li')
                                            li3.innerHTML = `
                                                <div>
                                                    <img src="./img/users'headProtrait.jpg">
                                                    <span>name</span>
                                                </div>
                                                
                                                <article>${data3[i].content}</article>
                                
                                                <div>
                                                    <span>time</span>
                                                    <span class='replyBtn'>
                                                        <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="#7a7a7a">
                                                            <path fill-rule="evenodd" d="M12 2.75a9.25 9.25 0 1 0 4.737 17.197l2.643.817a1 1 0 0 0 1.25-1.25l-.8-2.588A9.25 9.25 0 0 0 12 2.75Z" clip-rule="evenodd"></path>
                                                        </svg>
                                                        回复
                                                    </span>
                                                    <span>
                                                        <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="#7a7a7a">
                                                            <path d="M8.5 4.078c0-1.834 1.986-2.979 3.573-2.06a4.826 4.826 0 0 1 2.379 4.71l-.114 1.022h3.581c2.53 0 4.334 2.454 3.58 4.868l-1.823 5.833a3.784 3.784 0 0 1-3.848 2.64c-2.372-.147-6.042-.341-8.828-.341H4.5A1.75 1.75 0 0 1 2.75 19V9.5c0-.967.784-1.75 1.75-1.75h.637a3.418 3.418 0 0 0 3.19-2.191c.115-.296.173-.611.173-.928v-.553Z"></path>
                                                        </svg>
                                                        203
                                                    </span>
                                                </div>
                                            `
                                            li3.children[2].children[1].addEventListener('click', ()=> {
                                                li3.children[2].children[1].style.pointerEvents = 'none'
                                                let replyBox = document.createElement('span')
                                                replyBox.classList.add('replyBox')
                                                replyBox.innerHTML = `
                                                    <input type='text'>
                                                    <span>回复</span>
                                                `
                                                li3.insertBefore(replyBox, li3.children[li3.children.length - 1])
                                                replyBox.children[1].addEventListener('click', ()=> { //上传回复
                                                    if(replyBox.children[0].value != '') {
                                                        async function replyReply() {
                                                            let replyObj = {
                                                                parent_id: data3[i].cid,
                                                                root_id: data3[i].cid,
                                                                commented_uid:data3[i].commented_uid,
                                                                post_id: data3[i].post_id,
                                                                content: replyBox.children[0].value
                                                            }
                                                            console.log(replyObj)
                                                            try{
                                                                let replyResult = await fetch('http://81.68.76.44:8080/api/v1/comments/reply', {
                                                                    method: 'post',
                                                                    headers: {
                                                                        'Content-Type':'application/json; charset=utf-8',
                                                                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                                                                    },
                                                                    body: JSON.stringify(replyObj)
                                                                })
                                                                let replyres = await replyResult.json()
                                                                console.log(replyres)
                                                                location.reload()
                                                            }catch(err) {
                                                                console.log(err)
                                                            }
                                                        }
                                                        replyReply()
                                                    }
                                                })
                                                
                                            })

                                            li3.children[2].children[0].innerHTML = data3[i].create_time
                    
                                            li2.children[3].appendChild(li3)
                                        }
                    
                                    }catch(err) {
                                        console.log(err)
                                    }
                                }
                                await getArticleReply3()
                            }
                        }
                        
                    }catch(err) {
                        console.log(err)
                    }
                }
                await getArticleReply2()
            }
        }

        let replyBtn = document.querySelectorAll('.replyBtn') //点击生成回复box
        for(let i = 0; i < replyBtn.length; i++) {
            replyBtn[i].addEventListener('click', ()=> {
                
            })
        }

    }catch(err) {
        console.log(err)
    }
}

async function loading() {
    try {
        let result = await fetch(`http://81.68.76.44:8080/api/v1/posts/${localStorage.getItem('pid')}`, {
            method: 'get',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded',
                'uid': userImformation.uid
            }
        })
        let res1 = await result.json()
        console.log(res1)

        await getAuthorImformation(res1.data.author_id)
        let authorImformation = JSON.parse(localStorage.getItem('AuthorImformation'))
        
        articleTitle.innerHTML = res1.data.title
        for(let i = 0; i < articleAuthorName.length; i++) {
            articleAuthorName[i].innerHTML = authorImformation.username
            authorIntroduction[i].innerHTML = authorImformation.introduction
            articleMain.innerHTML = res1.data.content
            articleBottom.children[0].innerHTML = res1.data.create_time
        }

        await getArticleReply()

    }catch(err) {
        console.log(err)
    }
}
loading()

replyBtn1.addEventListener('click', ()=> { //回复按钮
    replyBtn1.style.pointerEvents = 'none'
    let replyBox = document.createElement('span')
    replyBox.classList.add('replyBox')
    replyBox.innerHTML = `
        <input type='text'>
        <span>回复</span>
    `
    article.insertBefore(replyBox, article.children[2])
    replyBox.children[1].addEventListener('click', ()=> { //上传回复
        if(replyBox.children[0].value != '') {
            async function replyReply() {
                let replyObj = {
                    "post_id": parseFloat(localStorage.getItem('pid')),
                    "content": replyBox.children[0].value
                }
                try{
                    let replyResult = await fetch('http://81.68.76.44:8080/api/v1/comments', {
                        method: 'post',
                        headers: {
                            'Content-Type':'application/json; charset=utf-8',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                        body: JSON.stringify(replyObj)
                    })
                    let replyres = await replyResult.json()
                    console.log(replyres)
                    if(replyres.code === 0) {
                        location.reload()
                    }
                }catch(err) {
                    console.log(err)
                }
            }
            replyReply()
        }
    })
})

searchBox.children[0].addEventListener('focus', ()=> { //搜索框焦点事件
    searchBox.style.width = '490px'
    searchBox.style.backgroundColor = 'white'
    searchBox.children[0].style.backgroundColor = 'white'
    searchBox.style.border = '1px solid black'
    searchBox.style.opacity = 1
    searchBox.nextElementSibling.style.visibility = 'hidden'
})
searchBox.children[0].addEventListener('blur', ()=> { //搜索框焦点移除事件
    searchBox.style.width = '400px'
    searchBox.nextElementSibling.style.visibility = 'visible'
    searchBox.style.backgroundColor = '#d7d7d7'
    searchBox.children[0].style.backgroundColor = '#d7d7d7'
    searchBox.style.opacity = 0.6
    searchBox.style.border = 'none'
})

writeQuestion.addEventListener('click', ()=> { //提问
    let questionsBox = document.createElement('div')
    questionsBox.classList.add('questionBox')
    questionsBox.innerHTML = `
        <span></span>
        <div>
            <span>
                <img src="./img/users'headProtrait.jpg" alt="">
            </span>
            <input type="text" placeholder="写下你的问题，准确地描述问题更容易得到解答">
            <textarea placeholder="输入问题背景、条件等详细信息（选填）"></textarea>
            <span>发布问题</span>
            <span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M18.22 19.28a.75.75 0 1 0 1.06-1.06L13.06 12l6.22-6.22a.75.75 0 0 0-1.06-1.06L12 10.94 5.78 4.72a.75.75 0 0 0-1.06 1.06L10.94 12l-6.22 6.22a.75.75 0 1 0 1.06 1.06L12 13.06l6.22 6.22Z" clip-rule="evenodd"></path>
                </svg>
            </span>
        </div>
    `
    primebody.insertBefore(questionsBox, primebody.children[0])
    questionsBox.children[1].children[4].addEventListener('click', ()=> { //点击叉叉
        primebody.removeChild(primebody.children[0])
    })
    questionsBox.children[1].children[1].addEventListener('input', ()=> {   //输入问题
        if(questionsBox.children[1].children[1].value != '') {
            questionsBox.children[1].style.height = '350px'
            questionsBox.children[1].children[2].style.opacity = 1
            questionsBox.children[1].children[2].style.height = '100px'
        }else {
            questionsBox.children[1].style.height = '250px'
            questionsBox.children[1].children[2].style.opacity = 0
            questionsBox.children[1].children[2].style.height = '0px'
        }
    })
    questionsBox.children[1].children[3].addEventListener('click', ()=> { //发布问题
        if(questionsBox.children[1].children[1].value != '') {
            async function post() {
                let obj = {
                    type: 1, //问题类
                    topic_id: 1,
                    title: questionsBox.children[1].children[1].value,
                    content: questionsBox.children[1].children[2].value
                }
                try {
                    let result = await fetch('http://81.68.76.44:8080/api/v1/post', {
                        method: 'post',
                        headers: {
                            'Content-Type':'application/json; charset=utf-8',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                        body: JSON.stringify(obj)
                    })
                    let res = await result.json()
                    console.log(res)
                    if(res.code === 0) {
                        alert('提问成功')
                        location.reload()
                    }else {
                        alert('发布失败')
                    }
                    
                }catch(err) {
                    console.log(err)
                }
            }
            post()
        }
    })
})