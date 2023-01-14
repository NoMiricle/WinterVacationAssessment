let bodyTop = document.querySelector('.bodyTop')
let mainContent = document.querySelector('.mainContent')
let topdiv = document.querySelector('.top')
let backToTop = document.querySelector('.backToTop')
let searchBox = document.querySelector('.searchBox')
let downdiv = document.querySelector('.down')
let activity = document.querySelector('.activity')
let body = document.querySelector('.body')
let userImg = document.querySelector('.userImg')
let writeQuestion = document.querySelectorAll('.writeQuestion')
let primebody = document.querySelector('body')
let creationCenter = document.querySelector('.creationCenter')

if(!localStorage.getItem('uid')) { //如果未登录则回到登录界面
    location.href = 'file:///D:/Learn/Web/LanshanWorks/WinterVacationAssessment/login.html'
}

let userImformation = JSON.parse(localStorage.getItem('userImformation'))
console.log(userImformation)

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
getUsersImformation()

if(!userImformation.headPortrait) { //用户未上传过头像
    userImg.children[0].src = "./img/users'headProtrait.jpg"
}else {
    userImg.children[0].src = userImformation.headPortrait
}

window.addEventListener('scroll', ()=> { //页面滚动事件
    if(document.documentElement.scrollTop >= 260) { //顶部搜索栏切换
        topdiv.children[0].style.top = '-60px'
        backToTop.style.visibility = 'visible'
    }else {
        topdiv.children[0].style.top = '0px'
        backToTop.style.visibility = 'hidden'
    }
})
backToTop.addEventListener('click', ()=> { //回到顶部
    document.documentElement.scrollTop = 0
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
    searchBox.style.backgroundColor = '#f6f6f6'
    searchBox.children[0].style.backgroundColor = '#f6f6f6'
    searchBox.style.opacity = 0.6
    searchBox.style.border = 'none'
})

for(let i = 0; i < writeQuestion.length; i++) {
    writeQuestion[i].addEventListener('click', ()=> { //提问
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
    })
}

activity.children[1].addEventListener('click', ()=> { //点击叉叉
    activity.style.display = 'none'
    body.style.marginTop = '60px'
    body.children[0].style.backgroundColor = '#f3f1f1'
})

bodyTop.children[0].addEventListener('click', ()=> { //关注
    for(let i = 0; i < bodyTop.children.length; i++) {
        bodyTop.children[i].style.color = 'black'
        downdiv.children[0].children[0].children[i].style.color = 'black'
    }
    bodyTop.children[0].style.color = 'royalblue'
    downdiv.children[0].children[0].children[0].style.color = 'royalblue' 
})
downdiv.children[0].children[0].children[0].addEventListener('click', ()=> { //同上
    bodyTop.children[0].click()
})

bodyTop.children[1].addEventListener('click', ()=> { //推荐
    for(let i = 0; i < bodyTop.children.length; i++) {
        bodyTop.children[i].style.color = 'black'
        downdiv.children[0].children[0].children[i].style.color = 'black'
    }
    bodyTop.children[1].style.color = 'royalblue'
    downdiv.children[0].children[0].children[1].style.color = 'royalblue'

    async function get() {
        try {
            let result = await fetch('http://81.68.76.44:8080/api/v1/posts/recommend', {
                method: 'get',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            })
            let res1 = await result.json()
            
            mainContent.children[0].innerHTML = ''
            
            for(let i = 0; i < res1.data.posts.length; i++){
                let article = document.createElement('li')
                article.innerHTML = `
                    <span>${i+1}</span>
                    <span>
                        ${res1.data.posts[i].title}
                    </span>
                    <span>
                        ${res1.data.posts[i].content}
                    </span>
                    <span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#7a7a7a">
                            <path fill-rule="evenodd" d="M14.602 21.118a8.89 8.89 0 0 0 3.72-2.232 8.85 8.85 0 0 0 2.618-6.31c0-.928-.14-1.836-.418-2.697a8.093 8.093 0 0 0-1.204-2.356s.025.035-.045-.055-.1-.115-.1-.115c-.955-1.078-1.504-1.984-1.726-2.854-.06-.232-.138-.88-.22-1.824L17.171 2l-.681.02c-.654.018-1.089.049-1.366.096a7.212 7.212 0 0 0-3.77 1.863 6.728 6.728 0 0 0-1.993 3.544l-.088.431-.182-.4a5.032 5.032 0 0 1-.326-.946 71.054 71.054 0 0 1-.204-.916l-.199-.909-.833.42c-.52.263-.862.462-1.076.624a8.588 8.588 0 0 0-2.5 2.976 8.211 8.211 0 0 0-.888 3.723c0 2.402.928 4.657 2.616 6.35a8.87 8.87 0 0 0 3.093 2.027c-.919-.74-1.593-1.799-1.76-3.051-.186-.703.05-2.352.849-2.79 0 1.938 2.202 3.198 4.131 2.62 2.07-.62 3.07-2.182 2.773-5.688 1.245 1.402 1.65 2.562 1.838 3.264.603 2.269-.357 4.606-2.003 5.86Z" clip-rule="evenodd"></path>
                        </svg>
                    </span>
                    <span>${1044} 万热度</span>
                    <span>
                        <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="#7a7a7a">
                            <path d="M19.47 1.914a.8.8 0 0 1 1.204.778l-1.872 16.386a.9.9 0 0 1-1.204.743l-4.615-1.692a.7.7 0 0 0-.831.28l-1.927 3.02c-.43.674-1.474.369-1.474-.43v-3.865a.8.8 0 0 1 .179-.504l5.808-7.148a.595.595 0 0 0-.897-.781l-5.93 6.354a1.1 1.1 0 0 1-1.258.252L2.57 13.46a.8.8 0 0 1-.08-1.415l16.98-10.13Z"></path>
                        </svg>
                    </span>
                    <span>分享</span>
                    <span>
                        <span>
                            <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="#7a7a7a">
                                <path d="M10.484 3.307c.673-1.168 2.358-1.168 3.032 0l2.377 4.122a.25.25 0 0 0 .165.12l4.655.987c1.319.28 1.84 1.882.937 2.884l-3.186 3.535a.25.25 0 0 0-.063.193l.5 4.733c.142 1.34-1.222 2.33-2.453 1.782l-4.346-1.938a.25.25 0 0 0-.204 0l-4.346 1.938c-1.231.549-2.595-.442-2.453-1.782l.5-4.733a.25.25 0 0 0-.064-.193L2.35 11.42c-.903-1.002-.382-2.604.937-2.884l4.655-.987a.25.25 0 0 0 .164-.12l2.378-4.122Z"></path>
                            </svg>
                        </span>
                        <span>收藏</span>
                    </span>
                    <span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M13.792 3.681c-.781-1.406-2.803-1.406-3.584 0l-7.79 14.023c-.76 1.367.228 3.046 1.791 3.046h15.582c1.563 0 2.55-1.68 1.791-3.046l-7.79-14.023Z" clip-rule="evenodd"></path>
                        </svg>
                        赞同
                    </span>
                    <span>
                        <span>
                        <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="#7a7a7a"><path fill-rule="evenodd" d="M12 2.75a9.25 9.25 0 1 0 4.737 17.197l2.643.817a1 1 0 0 0 1.25-1.25l-.8-2.588A9.25 9.25 0 0 0 12 2.75Z" clip-rule="evenodd"></path></svg>
                        </span>
                        <span>评论</span>
                    </span>
                    <img src="">
                `

                article.children[1].addEventListener('click', ()=> { //点击查看详细
                    localStorage.setItem('pid', res1.data.posts[i].pid)
                    location.href = 'file:///D:/Learn/Web/LanshanWorks/WinterVacationAssessment/question.html'
                })
                article.children[2].addEventListener('click', function grow() { //内容点击展开
                    article.style.height = article.children[2].scrollHeight + article.offsetHeight + 'px' //加高盒子
                    article.children[2].style.height = article.children[2].scrollHeight + 'px'
                    article.children[2].style.pointerEvents = 'none'
                })

                article.children[9].addEventListener('click', ()=> { //展开评论
                    article.style.height = 850 + article.offsetHeight + 'px'

                    let comment = document.createElement('ul')
                    let writeComment = document.createElement('div')

                    writeComment.innerHTML = `
                        <img src="./img/users'headProtrait.jpg">
                        <input type='text' placeholder='评论千万条，友善第一条'>
                    `

                    article.appendChild(writeComment)

                    comment.innerHTML = `
                        <div>
                            <span>0</span>
                            <span>条评论</span>
                        </div>
                        <li>
                            <div>
                                <img src="./img/users'headProtrait.jpg">
                                <span>name</span>
                            </div>
                            
                            <article>经没经历过苦难不是关键，关键是是不是在爱里长大的。从小在爱里长大的小孩即使经历苦难也是积极向上乐观开朗的。
                            不过话说回来，终极的苦难不就是失去爱么……</article>

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

                            <ul>
                                <span class='checkAllComment'>查看全部评论</span>
                                <li>
                                    <div>
                                        <img src="./img/users'headProtrait.jpg">
                                        <span>name</span>
                                    </div>
                            
                                    <article>
                                        经没经历过苦难不是关键，关键是是不是在爱里长大的。从小在爱里长大的小孩即使经历苦难也是积极向上乐观开朗的。
                                        不过话说回来，终极的苦难不就是失去爱么……
                                    </article>

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
                                </li>
                            </ul>
                        </li>
                    `
                    article.appendChild(comment)
                    
                    let checkAllComment = document.querySelectorAll('.checkAllComment')
                    for(let i = 0; i < checkAllComment.length; i++) {
                        checkAllComment[i].addEventListener('click', ()=> { //查看所有回复
                            let checkAllCommentBox = document.createElement('div')
                            checkAllCommentBox.classList.add('checkAllCommentBox')
                            checkAllCommentBox.innerHTML = `
                                <span></span>
                                <div>
                                    <span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                                            <path fill-rule="evenodd" d="M18.22 19.28a.75.75 0 1 0 1.06-1.06L13.06 12l6.22-6.22a.75.75 0 0 0-1.06-1.06L12 10.94 5.78 4.72a.75.75 0 0 0-1.06 1.06L10.94 12l-6.22 6.22a.75.75 0 1 0 1.06 1.06L12 13.06l6.22 6.22Z" clip-rule="evenodd"></path>
                                        </svg>
                                    </span>
                                    <div>评论回复</div>
                                    <div>
                                        <img src="./img/users'headProtrait.jpg">
                                        <input type='text' placeholder='回复name'>
                                    </div>
                                    <div></div>
                                    <div>
                                        
                                        <div>
                                            <img src="./img/users'headProtrait.jpg">
                                            <span>name</span>
                                        </div>
                        
                                        <article>
                                            经没经历过苦难不是关键，关键是是不是在爱里长大的。从小在爱里长大的小孩即使经历苦难也是积极向上乐观开朗的。
                                            不过话说回来，终极的苦难不就是失去爱么……
                                        </article>
    
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
    
                                    </div>
                                    <ul>
                                        <li>
                                            <div>
                                                <img src="./img/users'headProtrait.jpg">
                                                 <span>name</span>
                                            </div>
                            
                                            <article>
                                                经没经历过苦难不是关键，关键是是不是在爱里长大的。从小在爱里长大的小孩即使经历苦难也是积极向上乐观开朗的。
                                                不过话说回来，终极的苦难不就是失去爱么……
                                            </article>
    
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
                                        </li>
                                    </ul>
                                </div>
                            `
                            primebody.insertBefore(checkAllCommentBox, primebody.children[0])
                            checkAllCommentBox.children[1].children[0].addEventListener('click', ()=> { //点击叉叉
                                primebody.removeChild(primebody.children[0])
                            })
                            let replyBtn = document.querySelectorAll('.replyBtn')
                            for(let i = 0; i < replyBtn.length; i++) {
                                replyBtn[i].addEventListener('click', ()=> {
                                    let replyBox = document.createElement('span')
                                    replyBox.classList.add('replyBox')
                                    replyBox.innerHTML = `
                                        <input type='text'>
                                        <span>回复</span>
                                    `
                                    replyBtn[i].parentNode.parentNode.insertBefore(replyBox, replyBtn[i].parentNode.parentNode.children[replyBtn[i].parentNode.parentNode.children.length - 1])
                                })
                            }
                        })
                    }
                    let replyBtn = document.querySelectorAll('.replyBtn')
                    for(let i = 0; i < replyBtn.length; i++) {
                        replyBtn[i].addEventListener('click', ()=> {
                            let replyBox = document.createElement('span')
                            replyBox.classList.add('replyBox')
                            replyBox.innerHTML = `
                                <input type='text'>
                                <span class='fetchReplyBtn'>回复</span>
                            `
                            replyBtn[i].parentNode.parentNode.insertBefore(replyBox, replyBtn[i].parentNode.parentNode.children[replyBtn[i].parentNode.parentNode.children.length - 1])
                        })
                    }
                    
                })

                mainContent.children[0].appendChild(article)
            }

            
        }catch(err) {
            console.log(err)
        }
    }
    async function loading() {
        await get()
    }
    loading()
})
downdiv.children[0].children[0].children[1].addEventListener('click', ()=> { //同上
    bodyTop.children[1].click()
})

bodyTop.children[2].addEventListener('click', ()=> { //热榜
    for(let i = 0; i < bodyTop.children.length; i++) {
        bodyTop.children[i].style.color = 'black'
        downdiv.children[0].children[0].children[i].style.color = 'black'
    }
    bodyTop.children[2].style.color = 'royalblue'
    downdiv.children[0].children[0].children[2].style.color = 'royalblue'

    // async function getArticle(url, num){ //获取文章
    //     let obj = {
    //         page: 1,
    //         size: 1
    //     }
    //     let article = document.createElement('li')
    //     try {
    //         let obj1 = new URLSearchParams(obj).toString()
    //         url += '?' + obj1
    //         let result = await fetch(url, {
    //             method: 'get',
    //             headers: {
    //                 'Content-Type':'application/x-www-form-urlencoded'
    //             }
    //         })
    //         let res1 = await result.json()
    //         // console.log(res1.data.posts[0])

    //         article.innerHTML = `
    //             <span>${num}</span>
    //             <span>
    //                 ${res1.data.posts[0].title}
    //             </span>
    //             <span>
    //                 ${res1.data.posts[0].content}
    //             </span>
    //             <span>
    //                 <svg width="18" height="18" viewBox="0 0 24 24" fill="#7a7a7a">
    //                     <path fill-rule="evenodd" d="M14.602 21.118a8.89 8.89 0 0 0 3.72-2.232 8.85 8.85 0 0 0 2.618-6.31c0-.928-.14-1.836-.418-2.697a8.093 8.093 0 0 0-1.204-2.356s.025.035-.045-.055-.1-.115-.1-.115c-.955-1.078-1.504-1.984-1.726-2.854-.06-.232-.138-.88-.22-1.824L17.171 2l-.681.02c-.654.018-1.089.049-1.366.096a7.212 7.212 0 0 0-3.77 1.863 6.728 6.728 0 0 0-1.993 3.544l-.088.431-.182-.4a5.032 5.032 0 0 1-.326-.946 71.054 71.054 0 0 1-.204-.916l-.199-.909-.833.42c-.52.263-.862.462-1.076.624a8.588 8.588 0 0 0-2.5 2.976 8.211 8.211 0 0 0-.888 3.723c0 2.402.928 4.657 2.616 6.35a8.87 8.87 0 0 0 3.093 2.027c-.919-.74-1.593-1.799-1.76-3.051-.186-.703.05-2.352.849-2.79 0 1.938 2.202 3.198 4.131 2.62 2.07-.62 3.07-2.182 2.773-5.688 1.245 1.402 1.65 2.562 1.838 3.264.603 2.269-.357 4.606-2.003 5.86Z" clip-rule="evenodd"></path>
    //                 </svg>
    //             </span>
    //             <span>${1044} 万热度</span>
    //             <span>
    //                 <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="#7a7a7a">
    //                     <path d="M19.47 1.914a.8.8 0 0 1 1.204.778l-1.872 16.386a.9.9 0 0 1-1.204.743l-4.615-1.692a.7.7 0 0 0-.831.28l-1.927 3.02c-.43.674-1.474.369-1.474-.43v-3.865a.8.8 0 0 1 .179-.504l5.808-7.148a.595.595 0 0 0-.897-.781l-5.93 6.354a1.1 1.1 0 0 1-1.258.252L2.57 13.46a.8.8 0 0 1-.08-1.415l16.98-10.13Z"></path>
    //                 </svg>
    //             </span>
    //             <span>分享</span>
    //             <img src="">
    //         `
    //         mainContent.children[0].appendChild(article)
    //     }catch(err) {
    //         console.log(err)
    //     }
    // }
    
    // async function getQuestion(url, num){ //获取问题
    //     let obj = {
    //         page: 1,
    //         size: 1
    //     }
    //     let article = document.createElement('li')
    //     try {
    //         let obj1 = new URLSearchParams(obj).toString()
    //         url += '?' + obj1
    //         let result = await fetch(url, {
    //             method: 'get',
    //             headers: {
    //                 'Content-Type':'application/x-www-form-urlencoded'
    //             }
    //         })
    //         let res1 = await result.json()
    //         // console.log(res1.data.posts[0])

    //         article.innerHTML = `
    //             <span>${num}</span>
    //             <span>
    //                 ${res1.data.posts[0].title}
    //             </span>
    //             <span>
    //                 ${res1.data.posts[0].content}
    //             </span>
    //             <span>
    //                 <svg width="18" height="18" viewBox="0 0 24 24" fill="#7a7a7a">
    //                     <path fill-rule="evenodd" d="M14.602 21.118a8.89 8.89 0 0 0 3.72-2.232 8.85 8.85 0 0 0 2.618-6.31c0-.928-.14-1.836-.418-2.697a8.093 8.093 0 0 0-1.204-2.356s.025.035-.045-.055-.1-.115-.1-.115c-.955-1.078-1.504-1.984-1.726-2.854-.06-.232-.138-.88-.22-1.824L17.171 2l-.681.02c-.654.018-1.089.049-1.366.096a7.212 7.212 0 0 0-3.77 1.863 6.728 6.728 0 0 0-1.993 3.544l-.088.431-.182-.4a5.032 5.032 0 0 1-.326-.946 71.054 71.054 0 0 1-.204-.916l-.199-.909-.833.42c-.52.263-.862.462-1.076.624a8.588 8.588 0 0 0-2.5 2.976 8.211 8.211 0 0 0-.888 3.723c0 2.402.928 4.657 2.616 6.35a8.87 8.87 0 0 0 3.093 2.027c-.919-.74-1.593-1.799-1.76-3.051-.186-.703.05-2.352.849-2.79 0 1.938 2.202 3.198 4.131 2.62 2.07-.62 3.07-2.182 2.773-5.688 1.245 1.402 1.65 2.562 1.838 3.264.603 2.269-.357 4.606-2.003 5.86Z" clip-rule="evenodd"></path>
    //                 </svg>
    //             </span>
    //             <span>${1044} 万热度</span>
    //             <span>
    //                 <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="#7a7a7a">
    //                     <path d="M19.47 1.914a.8.8 0 0 1 1.204.778l-1.872 16.386a.9.9 0 0 1-1.204.743l-4.615-1.692a.7.7 0 0 0-.831.28l-1.927 3.02c-.43.674-1.474.369-1.474-.43v-3.865a.8.8 0 0 1 .179-.504l5.808-7.148a.595.595 0 0 0-.897-.781l-5.93 6.354a1.1 1.1 0 0 1-1.258.252L2.57 13.46a.8.8 0 0 1-.08-1.415l16.98-10.13Z"></path>
    //                 </svg>
    //             </span>
    //             <span>分享</span>
    //             <img src="">
    //         `
    //         mainContent.children[0].appendChild(article)
    //     }catch(err) {
    //         console.log(err)
    //     }
    // }
    
    // function getRandom(min, max) {
    //     return Math.floor(Math.random() * (max - min +1))
    // }
    // async function loading() { //加载
    //     mainContent.children[0].innerHTML = ''
    //     for(let i = 1; i < 51; i++){
    //         let random = getRandom(1,2) //随机文章还是问题
    //         if(random === 0) { //文章
    //             await getArticle('https://mockapi.eolink.com/dA5lczFbe6be637a8338de66e6fff176814e78fc3409f91/api/v1/essays', i)
    //         }else { //问题
    //             await getQuestion('https://mockapi.eolink.com/dA5lczFbe6be637a8338de66e6fff176814e78fc3409f91/api/v1/questions', i)
    //         }
        
    //     }
    // }  
    // loading()
    async function get() {
        try {
            let result = await fetch('http://81.68.76.44:8080/api/v1/posts/hot', {
                method: 'get',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            })
            let res1 = await result.json()
            
            mainContent.children[0].innerHTML = ''
            
            for(let i = 0; i < res1.data.posts.length; i++){
                let article = document.createElement('li')
                article.innerHTML = `
                    <span>${i+1}</span>
                    <span>
                        ${res1.data.posts[i].title}
                    </span>
                    <span>
                        ${res1.data.posts[i].content}
                    </span>
                    <span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#7a7a7a">
                            <path fill-rule="evenodd" d="M14.602 21.118a8.89 8.89 0 0 0 3.72-2.232 8.85 8.85 0 0 0 2.618-6.31c0-.928-.14-1.836-.418-2.697a8.093 8.093 0 0 0-1.204-2.356s.025.035-.045-.055-.1-.115-.1-.115c-.955-1.078-1.504-1.984-1.726-2.854-.06-.232-.138-.88-.22-1.824L17.171 2l-.681.02c-.654.018-1.089.049-1.366.096a7.212 7.212 0 0 0-3.77 1.863 6.728 6.728 0 0 0-1.993 3.544l-.088.431-.182-.4a5.032 5.032 0 0 1-.326-.946 71.054 71.054 0 0 1-.204-.916l-.199-.909-.833.42c-.52.263-.862.462-1.076.624a8.588 8.588 0 0 0-2.5 2.976 8.211 8.211 0 0 0-.888 3.723c0 2.402.928 4.657 2.616 6.35a8.87 8.87 0 0 0 3.093 2.027c-.919-.74-1.593-1.799-1.76-3.051-.186-.703.05-2.352.849-2.79 0 1.938 2.202 3.198 4.131 2.62 2.07-.62 3.07-2.182 2.773-5.688 1.245 1.402 1.65 2.562 1.838 3.264.603 2.269-.357 4.606-2.003 5.86Z" clip-rule="evenodd"></path>
                        </svg>
                    </span>
                    <span>${1044} 万热度</span>
                    <span>
                        <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="#7a7a7a">
                            <path d="M19.47 1.914a.8.8 0 0 1 1.204.778l-1.872 16.386a.9.9 0 0 1-1.204.743l-4.615-1.692a.7.7 0 0 0-.831.28l-1.927 3.02c-.43.674-1.474.369-1.474-.43v-3.865a.8.8 0 0 1 .179-.504l5.808-7.148a.595.595 0 0 0-.897-.781l-5.93 6.354a1.1 1.1 0 0 1-1.258.252L2.57 13.46a.8.8 0 0 1-.08-1.415l16.98-10.13Z"></path>
                        </svg>
                    </span>
                    <span>分享</span>
                    <span>
                        <span>
                            <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="#7a7a7a">
                                <path d="M10.484 3.307c.673-1.168 2.358-1.168 3.032 0l2.377 4.122a.25.25 0 0 0 .165.12l4.655.987c1.319.28 1.84 1.882.937 2.884l-3.186 3.535a.25.25 0 0 0-.063.193l.5 4.733c.142 1.34-1.222 2.33-2.453 1.782l-4.346-1.938a.25.25 0 0 0-.204 0l-4.346 1.938c-1.231.549-2.595-.442-2.453-1.782l.5-4.733a.25.25 0 0 0-.064-.193L2.35 11.42c-.903-1.002-.382-2.604.937-2.884l4.655-.987a.25.25 0 0 0 .164-.12l2.378-4.122Z"></path>
                            </svg>
                        </span>
                        <span>收藏</span>
                    </span>
                    <span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M13.792 3.681c-.781-1.406-2.803-1.406-3.584 0l-7.79 14.023c-.76 1.367.228 3.046 1.791 3.046h15.582c1.563 0 2.55-1.68 1.791-3.046l-7.79-14.023Z" clip-rule="evenodd"></path>
                        </svg>
                        赞同
                    </span>
                    <span>
                        <span>
                        <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="#7a7a7a"><path fill-rule="evenodd" d="M12 2.75a9.25 9.25 0 1 0 4.737 17.197l2.643.817a1 1 0 0 0 1.25-1.25l-.8-2.588A9.25 9.25 0 0 0 12 2.75Z" clip-rule="evenodd"></path></svg>
                        </span>
                        <span>评论</span>
                    </span>
                    <img src="">
                `

                article.children[1].addEventListener('click', ()=> { //点击查看详细
                    localStorage.setItem('pid', res1.data.posts[i].pid)
                    location.href = 'file:///D:/Learn/Web/LanshanWorks/WinterVacationAssessment/question.html'
                })

                article.children[2].addEventListener('click', function grow() { //内容点击展开
                    article.style.height = article.children[2].scrollHeight + article.offsetHeight + 'px' //加高盒子
                    article.children[2].style.height = article.children[2].scrollHeight + 'px'
                    article.children[2].style.pointerEvents = 'none'
                })

                article.children[9].addEventListener('click', ()=> { //展开评论
                    article.style.height = 850 + article.offsetHeight + 'px'

                    let comment = document.createElement('ul')
                    let writeComment = document.createElement('div')

                    writeComment.innerHTML = `
                        <img src="./img/users'headProtrait.jpg">
                        <input type='text' placeholder='评论千万条，友善第一条'>
                    `

                    article.appendChild(writeComment)

                    comment.innerHTML = `
                        <div>
                            <span>0</span>
                            <span>条评论</span>
                        </div>
                        <li>
                            <div>
                                <img src="./img/users'headProtrait.jpg">
                                <span>name</span>
                            </div>
                            
                            <article>经没经历过苦难不是关键，关键是是不是在爱里长大的。从小在爱里长大的小孩即使经历苦难也是积极向上乐观开朗的。
                            不过话说回来，终极的苦难不就是失去爱么……</article>

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

                            <ul>
                                <span class='checkAllComment'>查看全部评论</span>
                                <li>
                                    <div>
                                        <img src="./img/users'headProtrait.jpg">
                                        <span>name</span>
                                    </div>
                            
                                    <article>
                                        经没经历过苦难不是关键，关键是是不是在爱里长大的。从小在爱里长大的小孩即使经历苦难也是积极向上乐观开朗的。
                                        不过话说回来，终极的苦难不就是失去爱么……
                                    </article>

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
                                </li>
                            </ul>
                        </li>
                    `
                    article.appendChild(comment)
                    
                    let checkAllComment = document.querySelectorAll('.checkAllComment')
                    for(let i = 0; i < checkAllComment.length; i++) {
                        checkAllComment[i].addEventListener('click', ()=> { //查看所有回复
                            let checkAllCommentBox = document.createElement('div')
                            checkAllCommentBox.classList.add('checkAllCommentBox')
                            checkAllCommentBox.innerHTML = `
                                <span></span>
                                <div>
                                    <span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                                            <path fill-rule="evenodd" d="M18.22 19.28a.75.75 0 1 0 1.06-1.06L13.06 12l6.22-6.22a.75.75 0 0 0-1.06-1.06L12 10.94 5.78 4.72a.75.75 0 0 0-1.06 1.06L10.94 12l-6.22 6.22a.75.75 0 1 0 1.06 1.06L12 13.06l6.22 6.22Z" clip-rule="evenodd"></path>
                                        </svg>
                                    </span>
                                    <div>评论回复</div>
                                    <div>
                                        <img src="./img/users'headProtrait.jpg">
                                        <input type='text' placeholder='回复name'>
                                    </div>
                                    <div></div>
                                    <div>
                                        
                                        <div>
                                            <img src="./img/users'headProtrait.jpg">
                                            <span>name</span>
                                        </div>
                        
                                        <article>
                                            经没经历过苦难不是关键，关键是是不是在爱里长大的。从小在爱里长大的小孩即使经历苦难也是积极向上乐观开朗的。
                                            不过话说回来，终极的苦难不就是失去爱么……
                                        </article>
    
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
    
                                    </div>
                                    <ul>
                                        <li>
                                            <div>
                                                <img src="./img/users'headProtrait.jpg">
                                                 <span>name</span>
                                            </div>
                            
                                            <article>
                                                经没经历过苦难不是关键，关键是是不是在爱里长大的。从小在爱里长大的小孩即使经历苦难也是积极向上乐观开朗的。
                                                不过话说回来，终极的苦难不就是失去爱么……
                                            </article>
    
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
                                        </li>
                                    </ul>
                                </div>
                            `
                            primebody.insertBefore(checkAllCommentBox, primebody.children[0])
                            checkAllCommentBox.children[1].children[0].addEventListener('click', ()=> { //点击叉叉
                                primebody.removeChild(primebody.children[0])
                            })
                            let replyBtn = document.querySelectorAll('.replyBtn')
                            for(let i = 0; i < replyBtn.length; i++) {
                                replyBtn[i].addEventListener('click', ()=> {
                                    let replyBox = document.createElement('span')
                                    replyBox.classList.add('replyBox')
                                    replyBox.innerHTML = `
                                        <input type='text'>
                                        <span>回复</span>
                                    `
                                    replyBtn[i].parentNode.parentNode.insertBefore(replyBox, replyBtn[i].parentNode.parentNode.children[replyBtn[i].parentNode.parentNode.children.length - 1])
                                })
                            }
                        })
                    }
                    let replyBtn = document.querySelectorAll('.replyBtn')
                    for(let i = 0; i < replyBtn.length; i++) {
                        replyBtn[i].addEventListener('click', ()=> {
                            let replyBox = document.createElement('span')
                            replyBox.classList.add('replyBox')
                            replyBox.innerHTML = `
                                <input type='text'>
                                <span class='fetchReplyBtn'>回复</span>
                            `
                            replyBtn[i].parentNode.parentNode.insertBefore(replyBox, replyBtn[i].parentNode.parentNode.children[replyBtn[i].parentNode.parentNode.children.length - 1])
                        })
                    }
                    
                })

                mainContent.children[0].appendChild(article)
            }

            
        }catch(err) {
            console.log(err)
        }
    }
    async function loading() {
        await get()
    }
    loading()
})
downdiv.children[0].children[0].children[2].addEventListener('click', ()=> { //同上
    bodyTop.children[2].click()
})

bodyTop.children[3].addEventListener('click', ()=> { //视频
    for(let i = 0; i < bodyTop.children.length; i++) {
        bodyTop.children[i].style.color = 'black'
        downdiv.children[0].children[0].children[i].style.color = 'black'
    }
    bodyTop.children[3].style.color = 'royalblue'
    downdiv.children[0].children[0].children[3].style.color = 'royalblue'
})
downdiv.children[0].children[0].children[3].addEventListener('click', ()=> { //同上
    bodyTop.children[3].click()
})

bodyTop.children[2].click()//默认为热榜
