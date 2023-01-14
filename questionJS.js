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

if(!localStorage.getItem('uid')) { //如果未登录则回到登录界面
    location.href = 'file:///D:/Learn/Web/LanshanWorks/WinterVacationAssessment/login.html'
}

let userImformation = JSON.parse(localStorage.getItem('userImformation'))

async function getAuthorImformation(author_id) { //获取用户信息
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