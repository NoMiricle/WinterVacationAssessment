let loginBoxTop = document.querySelector('.loginBoxTop')
let loginBox = document.querySelector('.loginBox')
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
    `
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
        <input type="text" placeholder="请输入要注册的账号(仅包括英文字母、数字)">
        <span class="registerAccountNumberErrow">请输入正确格式的账号</span>
        <input type="text" placeholder="请输入密码(必须以英文字母开头，仅包含英文数字)">
        <span class="registerPasswordErrow">请输入正确格式的密码</span>
        <input type="text" placeholder="请再次输入密码">
        <span class="passwordNotMatch">密码不一样</span>
        <span class="registerBtn">注册</span>
        <span class="registerByEmail">使用邮箱注册</span>
    `
    div.children[0].addEventListener('input', ()=> { //注册账号填写事件
        if(/[^a-z^0-9^A-Z]/.test(div.children[0].value)){
            div.children[1].style.visibility = 'visible' //显示账号错误
        }else{
            div.children[1].style.visibility = 'hidden'
        }
    })
    div.children[2].addEventListener('input', ()=> { //注册密码填写事件
        if(/[^a-z^0-9^A-Z]/.test(div.children[2].value)||!/^[a-zA-Z]/.test(div.children[2].value)){
            div.children[3].style.visibility = 'visible' //显示密码错误
        }else{
            div.children[3].style.visibility = 'hidden'
        }
    
        if(div.children[4].value === div.children[2].value) { //密码改变下面的重复密码也该改变
            div.children[5].style.visibility = 'hidden'
        }else{
            div.children[5].style.visibility = 'visible'
        }
    })
    div.children[4].addEventListener('input', ()=> { //判断二次输入密码是否一致
        if(div.children[4].value === div.children[2].value) {
            div.children[5].style.visibility = 'hidden'
        }else{
            div.children[5].style.visibility = 'visible'
        }
    })
    loginBox.appendChild(div)

    div.children[7].addEventListener('click', ()=> {//邮箱注册
        div.classList.remove('registerBoxMain')
        div.classList.add('registerBoxMain')
        div.innerHTML = `
            <input type="text" placeholder="请输入要注册的邮箱">
            <span class="registerAccountNumberErrow">请输入正确的邮箱格式</span>
            <input type="text" placeholder="请输入密码(必须以英文字母开头，仅包含英文数字)">
            <span class="registerPasswordErrow">请输入正确格式的密码</span>
            <input type="text" placeholder="请输入验证码">
            <span class="passwordNotMatch">验证码错误</span>
            <span class="getVerificationCode">获取验证码</span>
            <span class="registerBtn">注册</span>
            <span class="registerBack">返回账号注册</span>
        `
        div.children[0].addEventListener('input', ()=> { //注册邮箱填写事件
            if(!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
            .test(div.children[0].value)){
                div.children[1].style.visibility = 'visible' //显示账号错误
            }else{
                div.children[1].style.visibility = 'hidden'
            }
        })
        div.children[2].addEventListener('input', ()=> { //注册密码填写事件
            if(/[^a-z^0-9^A-Z]/.test(div.children[2].value)||!/^[a-zA-Z]/.test(div.children[2].value)){
                div.children[3].style.visibility = 'visible' //显示密码错误
            }else{
                div.children[3].style.visibility = 'hidden'
            }
        })
        div.children[4].addEventListener('input', ()=> { //判断验证码是否正确
            if(div.children[4].value === div.children[2].value) {
                div.children[5].style.visibility = 'hidden'
            }else{
                div.children[5].style.visibility = 'visible'
            }
        })
        div.children[8].addEventListener('click', ()=> { //返回账号注册
            loginBoxTop.children[1].click()
        })
    })
})
loginBoxTop.children[0].click() //默认选中登录
