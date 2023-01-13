let bodyTop = document.querySelector('.bodyTop')
let mainContent = document.querySelector('.mainContent')
let topdiv = document.querySelector('.top')
let backToTop = document.querySelector('.backToTop')
let searchBox = document.querySelector('.searchBox')
let downdiv = document.querySelector('.down')
let activity = document.querySelector('.activity')
let body = document.querySelector('.body')
let userImg = document.querySelector('.userImg')
let writeQuestion = document.querySelector('.writeQuestion')
let primebody = document.querySelector('body')

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
})

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
            let result = await fetch('https://mockapi.eolink.com/dA5lczFbe6be637a8338de66e6fff176814e78fc3409f91/api/v1/posts/hot', {
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
                    <img src="">
                `
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
            let result = await fetch('https://mockapi.eolink.com/dA5lczFbe6be637a8338de66e6fff176814e78fc3409f91/api/v1/posts/hot', {
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
                    <img src="">
                `

                article.children[2].addEventListener('click', ()=> { //内容点击展开
                    article.style.height = article.children[2].scrollHeight + 120 + 'px' //加高盒子
                    article.children[2].style.height = article.children[2].scrollHeight + 'px'
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