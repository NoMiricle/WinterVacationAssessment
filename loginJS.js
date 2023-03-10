let loginBoxTop = document.querySelector('.loginBoxTop')
let loginBox = document.querySelector('.loginBox')
let loginBtn = document.querySelector('.loginBtn')

loginBoxTop.children[0].addEventListener('click', ()=>{ //登录按钮点击事件
    loginBoxTop.children[1].classList.remove('loginBoxTop_checked') //取消注册按钮的选中状态
    loginBoxTop.children[0].classList.add('loginBoxTop_checked') //选中登录

    if(loginBox.children.length > 2){ //初始化盒子
        loginBox.removeChild(loginBox.children[2])
    }
    let div = document.createElement('div') //初始化登录界面
    div.classList.add('loginBoxMain')
    div.innerHTML = `
        <input type="text" placeholder="请输入账号">
        <input type="password" placeholder="请输入密码">
        <span class="loginBtn">登录</span>
        <span class="watchEye">
            <span>\</span>
        </span>
    `
    div.children[3].addEventListener('click', ()=> {//密码可见可不见
        if(div.children[3].children[0].innerHTML != '') {//不可见
            div.children[3].children[0].innerHTML = ''
            div.children[1].style.fontSize = '25px'
            div.children[1].setAttribute('type', 'password')
        }else{//可见
            div.children[3].children[0].innerHTML = '/'
            div.children[1].style.fontSize = '20px'
            div.children[1].setAttribute('type', 'text')
        }
    })

    div.children[2].addEventListener('click', ()=> {//登录
        if(div.children[0].value != '0' && div.children[1].value != '') {
            async function login() {
                let obj = 
                {
                    "username/email": div.children[0].value,
                    "password": div.children[1].value
                }
            
                try {
                    let result = await fetch('http://81.68.76.44:8080/api/v1/login', {
                        method: 'post',
                        headers: {
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify(obj)
                    })
                    let res1 = await result.json()
                    console.log(res1)
                    if(res1.code === 0) {
                        alert('登录成功')
                        localStorage.setItem('uid',res1.data.uid)
                        localStorage.setItem('token', res1.data.token)

                        div.children[2].style.pointerEvents = 'none'
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

                        setTimeout(()=>{
                            location.href = './main.html'
                        }, 2000)
                    }else if(res1.code === 1006) {
                        alert('密码错误')
                    }else if(res1.code === 1005) {
                        alert('邮箱未注册')
                    }else if(res1.code === 1004) {
                        alert('用户不存在')
                    }
                    

                } catch(err) {
                    alert('用户名或者密码不正确')
                    console.log(err)
                }
            }
            login()
        }
    })

    loginBox.appendChild(div)
})

loginBoxTop.children[1].addEventListener('click', ()=>{ //注册按钮点击事件
    loginBoxTop.children[0].classList.remove('loginBoxTop_checked') //取消登录按钮的选中状态
    loginBoxTop.children[1].classList.add('loginBoxTop_checked') //选中注册

    if(loginBox.children.length > 2){ //初始化盒子
        loginBox.removeChild(loginBox.children[2])
    }
    let div = document.createElement('div') //初始化注册界面
    div.classList.add('registerBoxMain')
    div.innerHTML = `
        <input type="text" placeholder="请输入昵称">
        <span>用户名:</span>
        <input type="text" placeholder="请输入要注册的邮箱">
        <span>邮箱:</span>
        <span class="emailErrow">请输入正确格式的邮箱</span>
        <input type="text" placeholder="请输入密码(必须以英文字母开头，仅包含英文数字)">
        <span>密码:</span>
        <span class="registerPasswordErrow">请输入正确格式的密码</span>
        <input type="text" placeholder="请再次输入密码">
        <span class="passwordNotMatch">密码不一样</span>
        <input type="text" placeholder="请输入验证码">
        <span>验证码:</span>
        <span class="getVerificationCode">获取验证码</span>
        <span class="registerBtn">注册</span>
    `
    
    div.children[2].addEventListener('input', ()=> { //注册邮箱填写事件
        if(!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(div.children[2].value)){
            div.children[4].style.visibility = 'visible' //显示邮箱错误
        }else{
            div.children[4].style.visibility = 'hidden'
        }
    })
    
    div.children[5].addEventListener('input', ()=> { //注册密码填写事件
        if(/[^a-z^0-9^A-Z]/.test(div.children[5].value)||!/^[a-zA-Z]/.test(div.children[5].value)){
            div.children[7].style.visibility = 'visible' //显示密码错误
        }else{
            div.children[7].style.visibility = 'hidden'
        }
    
        if(div.children[8].value === div.children[5].value) { //密码改变下面的重复密码也该改变
            div.children[9].style.visibility = 'hidden'
        }else{
            div.children[9].style.visibility = 'visible'
        }
    })
    
    div.children[8].addEventListener('input', ()=> { //判断二次输入密码是否一致
        if(div.children[8].value === div.children[5].value) {
            div.children[9].style.visibility = 'hidden'
        }else{
            div.children[9].style.visibility = 'visible'
        }
    })
    
    div.children[12].addEventListener('click', ()=> { //获取验证码
        if(div.children[2].value !=''/*邮箱不为空*/ && div.children[4].style.visibility === 'hidden') {
            async function post(url) {
                function formdata (obj = {}) {
                    let result = ''
                    for (let name of Object.keys(obj)) {
                    let value = obj[name];
                    result +=
                    '\r\n--XXX' +
                    '\r\nContent-Disposition: form-data; name=\"'+ name +'\"'+
                    '\r\n' +
                    '\r\n' + value
                    }
                    return result + '\r\n--XXX--'
                }
                let data = {
                    email: div.children[2].value
                }
                console.log(formdata(data))
                try{
                    let result = await fetch(url, {
                        method: 'post',
                        headers: {
                            // 'Content-Type':'application/x-www-form-urlencoded'
                            'Content-Type': 'multipart/form-data;boundary=XXX'
                        },
                        body: formdata(data)
                    })
                    let res1 = await result.json()
                    console.log(res1)
                }catch(err){
                    console.log(err)
                }
            }
            post('http://81.68.76.44:8080/api/v1/verification')
            //60s再次获取验证码
            div.children[12].classList.add('onclickForbidden') //禁用点击
            div.children[12].innerHTML = `
                    60秒之后可再次刷新
                `
            let i = 60
            let myInterval = setInterval(()=>{
                i--
                div.children[12].innerHTML = `
                    ${i}秒之后可再次刷新
                `
            }, 1000)
            setTimeout(()=> {
                clearInterval(myInterval)
                div.children[12].classList.remove('onclickForbidden')
                div.children[12].innerHTML = '再次获取验证码'
            }, 60000)
        }else{
            div.children[4].style.visibility = 'visible' //显示邮箱错误
        }
    })
    
    loginBox.appendChild(div) //加载页面

    let registerBtn = document.querySelector('.registerBtn')

    registerBtn.addEventListener('click', ()=> { //注册按钮点击事件
        
        if(div.children[0].value != ''/*用户名不为空*/ && div.children[2].value !=''/*邮箱不为空*/ && div.children[4].style.visibility === 'hidden'/*邮箱格式正确*/ && div.children[5] != ''/*密码不为空*/ && div.children[7].style.visibility === 'hidden'/*密码格式正确*/ && div.children[9].style.visibility === 'hidden'/*再次输入正确密码*/ && div.children[10].value != ''/*验证码不为空*/) {
            async function register() {
                let obj = 
                {
                    "username": div.children[0].value,
                    "email": div.children[2].value,
                    "password": div.children[5].value,
                    "re-password": div.children[5].value,
                    "verification": parseFloat(div.children[10].value)
                }
                try {
                    let result = await fetch('http://81.68.76.44:8080/api/v1/registration', {
                        method: 'post',
                        headers: {
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify(obj)
                    })
                    let res1 = await result.json()
                    console.log(res1)
                    if(res1.code === 0) {
                        alert('注册成功')
                    }else if(res1.code === 1002) {
                        alert('用户已存在')
                    }else if(res1.code === 1003) {
                        alert('邮箱已注册')
                    }else if(res1.code === 1007) {
                        alert('验证码错误')
                    }
                } catch(err) {
                    console.log(err)
                }
            }
            register()
        }
    })

})
loginBoxTop.children[0].click() //默认选中登录
