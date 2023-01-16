let searchBox = document.querySelector('.searchBox')
let headPortrait = document.querySelector('.headPortrait')
let uploadBackground = document.querySelector('.uploadBackground')
let backgroundImg = document.querySelector('.Background>img')
let writeQuestion = document.querySelector('.writeQuestion')
let primebody = document.querySelector('body')
let userImg = document.querySelector('.userImg')
let selfImformation = document.querySelector('.selfImformation')

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

selfImformation.children[3].children[1].innerHTML = userImformation.email //个人邮箱
selfImformation.children[4].children[1].innerHTML = userImformation.create_time //注册时间
selfImformation.children[0].children[0].innerHTML = userImformation.username //用户名
if(userImformation.gender === 1) {
    selfImformation.children[1].children[1].children[0].innerHTML = '男' //个人性别
}else {
    selfImformation.children[1].children[1].children[0].innerHTML = '女' //个人性别
}
if(!userImformation.introduction) { //用户未上传过介绍
    selfImformation.children[2].children[1].children[0].innerHTML = '介绍自己哦'
}else {
    selfImformation.children[2].children[1].children[0].innerHTML = userImformation.introduction
}

selfImformation.children[0].children[1].addEventListener('click', ()=> { //修改用户名
    let div = document.createElement('div')
    div.classList.add('changeBox')
    div.innerHTML = `
        <input type='text'>
        <span>确认</span>
        <span>取消</span>
    `
    selfImformation.children[0].appendChild(div)
    div.children[1].addEventListener('click', ()=> { //确认修改
        if(div.children[0].value != '') {
            async function put() {
                let obj = {
                    'new-username': div.children[0].value
                }
                try{
                    let result = await fetch('http://81.68.76.44:8080/api/v1/username', {
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
                        alert('修改成功')
                        await getUsersImformation()
                        location.reload()
                    }else{
                        alert('修改失败，用户已存在')
                    }
                    
                }catch(err) {
                    console.log(err)
                }
            }
            put()
        }
    })
    div.children[2].addEventListener('click', ()=> { //取消修改
        selfImformation.children[0].removeChild(selfImformation.children[0].children[3])
    })
})

selfImformation.children[1].children[1].children[1].addEventListener('click', ()=> { //修改性别
    let div = document.createElement('div')
    div.classList.add('changeBox')
    div.innerHTML = `
        <input type='text'>
        <span>确认</span>
        <span>取消</span>
    `
    selfImformation.children[1].appendChild(div)
    div.children[1].addEventListener('click', ()=> { //确认修改
        if(div.children[0].value != '') {
            if(div.children[0].value === '男'){
                var gender = 1
            }else if(div.children[0].value === '女') {
                var gender = 2
            }
            async function put() {
                let obj = {
                    'gender': gender,
                    'introduction': userImformation.introduction,
                    'headPortrait': userImformation.headPortrait,
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
                        alert('修改成功')
                        await getUsersImformation()
                        location.reload()
                    }else{
                        alert('修改失败')
                    }
                }catch(err) {
                    console.log(err)
                }
            }
            put()
        }
    })
    div.children[2].addEventListener('click', ()=> { //取消修改
        selfImformation.children[1].removeChild(selfImformation.children[1].children[2])
    })
})

selfImformation.children[2].children[1].children[1].addEventListener('click', ()=> { //修改介绍
    let div = document.createElement('div')
    div.classList.add('changeBox')
    div.innerHTML = `
        <input type='text'>
        <span>确认</span>
        <span>取消</span>
    `
    selfImformation.children[2].appendChild(div)
    div.children[1].addEventListener('click', ()=> { //确认修改
        if(div.children[0].value != '') {
            async function put() {
                let obj = {
                    'gender': userImformation.gender,
                    'introduction': div.children[0].value,
                    'headPortrait': userImformation.headPortrait,
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
                        alert('修改成功')
                        await getUsersImformation()
                        location.reload()
                    }else{
                        alert('修改失败')
                    }
                }catch(err) {
                    console.log(err)
                }
            }
            put()
        }
    })
    div.children[2].addEventListener('click', ()=> { //取消修改
        selfImformation.children[2].removeChild(selfImformation.children[2].children[2])
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

headPortrait.children[2].onchange = function () { //上传头像
    
    let fileData = this.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(fileData)
    reader.onload = function(result) {
        console.log(result)
        headPortrait.children[0].src = result.target.result
        console.log(decodeURIComponent(headPortrait.children[0].src))
        async function put() {
            let obj = {
                'gender': userImformation.gender,
                'introduction': userImformation.introduction,
                'headPortrait': headPortrait.children[0].src,
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
                    alert('功能未实现')
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
        // backgroundImg.style.backgroundColor = 'none'
        backgroundImg.setAttribute('src', this.result)
        console.log(backgroundImg.getAttribute('src'))
        async function put() {
            let obj = {
                'gender': userImformation.gender,
                'introduction': userImformation.introduction,
                'headPortrait': userImformation.headPortrait,
                'backgroundImg': backgroundImg.getAttribute('src')
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