let searchBox = document.querySelector('.searchBox')
let headPortrait = document.querySelector('.headPortrait')
let writeQuestion = document.querySelector('.writeQuestion')
let primebody = document.querySelector('body')
let problemDisplayBox = document.querySelector('.problemDisplayBox')


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

async function getArticleReply(pid) { //获取帖子的评论
    try {
        let result = await fetch(`http://81.68.76.44:8080/api/v1/posts/${pid}/comments`, {
            method: 'get',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded',
                'uid': userImformation.uid
            }
        })
        let res1 = await result.json()
        console.log('帖子评论' , res1)
        return res1.data.comments

    }catch(err) {
        console.log(err)
    }
}

async function loading() { //加载
    try{
        let result = await fetch('http://81.68.76.44:8080/api/v1/questions?size=2&page=1', {
            method: 'get',
            headers: {
                'Content-Type':'application/json'
            }
        })
        let res1 = await result.json()
        let res2 = res1.data
        console.log(res2)

        for(let i = 0; i <res2.posts.length; i++) {
            
            let li = document.createElement('li')
            
            await getAuthorImformation(res2.posts[i].author_id) //获取作者信息

            let authorImformation =  await JSON.parse(localStorage.getItem('AuthorImformation'))

            let reply = await getArticleReply(res2.posts[i].pid) //获取当前文章的回复

            console.log('reply', reply)

            let gender
            if(authorImformation.gender === 1) {
                gender = '他'
            }else {
                gender = '她'
            }
            
            li.innerHTML = `
                <div>
                    <img src="./img/users'headProtrait.jpg">
                    <span>${authorImformation.username}</span>
                    <span>的提问</span>
                </div>
                <div>
                    <span>${res2.posts[i].title}</span>
                    <span>
                        <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="#fff">
                            <path d="m7.841 20.043-4.328 1.18a.6.6 0 0 1-.737-.736l1.18-4.324a1.2 1.2 0 0 1 .314-.539l8.094-7.995a.9.9 0 0 1 1.268.003l2.736 2.736a.9.9 0 0 1 .004 1.268l-7.196 7.296-.802.802a1.2 1.2 0 0 1-.533.31ZM19.703 4.81l-.514-.513a2.542 2.542 0 0 0-3.595 0l-.999 1.067a.9.9 0 0 0 .02 1.252l2.77 2.768a.9.9 0 0 0 1.25.02l1.068-.999a2.542 2.542 0 0 0 0-3.594Z"></path>
                        </svg>
                        写回答
                    </span>
                </div>
                <div>
                    <span>试试帮${gender}解答~</span>
                    <span>${reply.length}回答</span>
                </div>
            `
            problemDisplayBox.children[1].appendChild(li)

            li.children[1].children[1].addEventListener('click', ()=> {
                localStorage.setItem('pid', res2.posts[i].pid)
                location.href = './writeAnswer.html'
            })

        }

    }catch(err) {
        console.log(err)
    }
}
loading()

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
})