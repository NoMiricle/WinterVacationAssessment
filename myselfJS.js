let searchBox = document.querySelector('.searchBox')
let check = document.querySelector('.check')
let main = document.querySelector('.main')
let nameBox = document.querySelector('.nameBox')
let headPortrait = document.querySelector('.headPortrait')
let uploadBackground = document.querySelector('.uploadBackground')
let backgroundImg = document.querySelector('.backgroundImg')
let writeQuestion = document.querySelector('.writeQuestion')
let primebody = document.querySelector('body')
let userImg = document.querySelector('.userImg')
let userName = document.querySelector('.userName')
let userGender = document.querySelector('.userGender')


if(!localStorage.getItem('uid')) { //如果未登录则回到登录界面
    location.href = './login.html'
}

let userImformation = JSON.parse(localStorage.getItem('userImformation'))

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

if(!userImformation.headPortrait) { //用户未上传过头像
    userImg.children[0].src = "./img/users'headProtrait.jpg"
    headPortrait.children[0].src = "./img/users'headProtrait.jpg"
}else {
    userImg.children[0].src = userImformation.headPortrait
    headPortrait.children[0].src = "userImformation.headPortrait"
}

userName.innerHTML = userImformation.username

if(userImformation.gender === 1) {
    userGender.innerHTML = '♂'
}else {
    userGender.innerHTML = '♀'
}

for(let i = 0; i < check.children.length; i++) {
    check.children[i].addEventListener('click', ()=> { //点击切换
        for(let i = 0; i < check.children.length; i++) {
            check.children[i].style.borderBottom = 'none'
        }
        check.children[i].style.borderBottom = '3px solid royalblue'

        nameBox.innerHTML = `我的${check.children[i].innerHTML}`

        main.innerHTML = '' //刷新数据
        
        let li = document.createElement('li')
        li.innerHTML = `
        <span>
            <svg width="150" height="120" viewBox="0 0 150 120" fill="currentColor">
                <g fill="none" fill-rule="evenodd">
                    <path fill="#EBEEF5" fill-rule="nonzero" d="M94 29v-2.002c0-.55.443-.998 1-.998h1c.553 0 1 .446 1 .998V29h2.002c.55 0 .998.443.998 1v1c0 .553-.446 1-.998 1H97v2.002c0 .55-.443.998-1 .998h-1c-.553 0-1-.446-1-.998V32h-2.002A.997.997 0 0 1 91 31v-1c0-.553.446-1 .998-1H94zm30.613 17.724-21.82-4.638.207-3.023 22.237 4.727a6.004 6.004 0 0 1 4.62 7.122l-7.9 37.158a6.001 6.001 0 0 1-7.116 4.627l-15.31-3.254.63-2.934 15.31 3.25c1.62.34 3.218-.69 3.56-2.32l7.9-37.16a3.005 3.005 0 0 0-2.31-3.567zM48.596 85.727l.624 2.935-12.717 2.703a6.004 6.004 0 0 1-7.117-4.628L21.488 49.58a6.004 6.004 0 0 1 4.62-7.123L47 38.017l.133 3.038-20.402 4.337a3 3 0 0 0-2.3 3.564l7.9 37.157a3.005 3.005 0 0 0 3.56 2.317l12.71-2.703zM100 82c0 3.314-2.688 6-6.006 6H56.006A6.01 6.01 0 0 1 50 82V34c0-3.314 2.688-6 6.006-6h27.147v3H56.006A3.003 3.003 0 0 0 53 34v48c0 1.65 1.35 3 3.006 3h37.988A3.003 3.003 0 0 0 97 82V42.373h3V82zm-4.5-41C89.7 41 85 36.3 85 30.5S89.7 20 95.5 20 106 24.7 106 30.5 101.3 41 95.5 41zm0-3a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z"></path><path fill="#F7F8FA" d="m47 73.22-6.484 1.378c-.82.174-1.333.97-1.16 1.78.173.816.97 1.327 1.784 1.154L47 76.287V73.22zm0-8.594-4.58.974c-.8.17-1.324.968-1.152 1.778a1.494 1.494 0 0 0 1.775 1.156l3.957-.84v-3.068zm0-17.285a6.002 6.002 0 0 0-8 5.66 6.002 6.002 0 0 0 8 5.66V47.34zm56 29.88 6.178 1.318a1.5 1.5 0 1 0 .624-2.934L103 74.148v3.067zm0-8.58 4.275.91c.808.17 1.6-.34 1.775-1.157a1.507 1.507 0 0 0-1.15-1.78l-4.9-1.04v3.067zm0-8.97c.626.22 1.3.34 2 .34 3.314 0 6-2.685 6-6s-2.686-6-6-6c-.7 0-1.374.12-2 .34v11.32zM76 56a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-8 7.5c0-.828.667-1.5 1.505-1.5h12.99a1.5 1.5 0 1 1 0 3h-12.99A1.5 1.5 0 0 1 68 63.5zm-5 8c0-.828.67-1.5 1.49-1.5h23.02c.822 0 1.49.666 1.49 1.5 0 .828-.67 1.5-1.49 1.5H64.49c-.822 0-1.49-.666-1.49-1.5z"></path>
                </g>
            </svg>
        </span>
        <span>刚来知乎？去关注我感兴趣的话题</span>
        `
        main.appendChild(li)

    })
}

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

check.children[0].click() //初始选中

headPortrait.children[1].onchange = function () { //上传头像
    let fileData = this.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(fileData)
    reader.onload = function(e) {
        console.log(e)
        headPortrait.children[0].setAttribute('src', this.result)
        async function put() {
            let obj = {
                'gender': userImformation.gender,
                'introduction': userImformation.introduction,
                'headPortrait': headPortrait.children[0].getAttribute('src'),
                'backgroundImg': userImformation.backgroundImg
            }
            try{
                let result = await fetch(`http://81.68.76.44:8080/api/v1/users/${userImformation.uid}/info`, {
                    method: 'put',
                    headers: {
                        'Content-Type':'application/json; charset=utf-8',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify(obj)
                })
                let res1 = await result.json()
                console.log(res1)
                if(res1.code === 0) {
                    alert('上传成功')
                    await getUsersImformation()
                    location.reload()
                }else{
                    alert('上传失败')
                }
            }catch(err) {
                console.log(err)
            }
        }
        put()
    }
}
uploadBackground.children[2].onchange = function () { //上传背景
    let fileData = this.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(fileData)
    reader.onload = function(e) {
        console.log(e)
        // backgroundImg.style.backgroundColor = 'none'
        backgroundImg.children[0].setAttribute('src', this.result)
        console.log(backgroundImg.children[0].getAttribute('src'))
        async function put() {
            let obj = {
                'gender': userImformation.gender,
                'introduction': userImformation.introduction,
                'headPortrait': userImformation.headPortrait,
                'backgroundImg': backgroundImg.children[0].getAttribute('src')
            }
            try{
                let result = await fetch(`http://81.68.76.44:8080/api/v1/users/${userImformation.uid}/info`, {
                    method: 'put',
                    headers: {
                        'Content-Type':'application/json; charset=utf-8',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify(obj)
                })
                let res1 = await result.json()
                console.log(res1)
                if(res1.code === 0) {
                    alert('上传成功')
                    await getUsersImformation()
                    location.reload()
                }else{
                    alert('上传失败')
                }
            }catch(err) {
                console.log(err)
            }
        }
        put()
    }
}