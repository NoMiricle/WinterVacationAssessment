let bodyTop = document.querySelector('.bodyTop')
let mainContent = document.querySelector('.mainContent')

bodyTop.children[0].addEventListener('click', ()=> { //关注
    for(let i = 0; i < bodyTop.children.length; i++) {
        bodyTop.children[i].style.color = 'black'
    }
    bodyTop.children[0].style.color = 'royalblue'
})

bodyTop.children[1].addEventListener('click', ()=> { //推荐
    for(let i = 0; i < bodyTop.children.length; i++) {
        bodyTop.children[i].style.color = 'black'
    }
    bodyTop.children[1].style.color = 'royalblue'
})

bodyTop.children[2].addEventListener('click', ()=> { //热榜
    for(let i = 0; i < bodyTop.children.length; i++) {
        bodyTop.children[i].style.color = 'black'
    }
    bodyTop.children[2].style.color = 'royalblue'

    async function getArticle(url, num){ //获取文章
        let obj = {
            page: 1,
            size: 1
        }
        let article = document.createElement('li')
        try {
            let obj1 = new URLSearchParams(obj).toString()
            url += '?' + obj1
            let result = await fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            })
            let res1 = await result.json()
            // console.log(res1.data.posts[0])

            article.innerHTML = `
                <span>${num}</span>
                <span>
                    ${res1.data.posts[0].title}
                </span>
                <span>
                    ${res1.data.posts[0].content}
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
        }catch(err) {
            console.log(err)
        }
    }
    
    async function getQuestion(url, num){ //获取问题
        let obj = {
            page: 1,
            size: 1
        }
        let article = document.createElement('li')
        try {
            let obj1 = new URLSearchParams(obj).toString()
            url += '?' + obj1
            let result = await fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            })
            let res1 = await result.json()
            // console.log(res1.data.posts[0])

            article.innerHTML = `
                <span>${num}</span>
                <span>
                    ${res1.data.posts[0].title}
                </span>
                <span>
                    ${res1.data.posts[0].content}
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
        }catch(err) {
            console.log(err)
        }
    }
    
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min +1))
    }
    async function loading() {
        for(let i = 1; i < 51; i++){
            let random = getRandom(1,2)
            if(random === 0) { //文章
                await getArticle('https://mockapi.eolink.com/dA5lczFbe6be637a8338de66e6fff176814e78fc3409f91/api/v1/essays', i)
            }else { //问题
                await getQuestion('https://mockapi.eolink.com/dA5lczFbe6be637a8338de66e6fff176814e78fc3409f91/api/v1/questions', i)
            }
        }
    }  
    loading()
})

bodyTop.children[3].addEventListener('click', ()=> { //视频
    for(let i = 0; i < bodyTop.children.length; i++) {
        bodyTop.children[i].style.color = 'black'
    }
    bodyTop.children[3].style.color = 'royalblue'
})

bodyTop.children[2].click()//默认为热榜