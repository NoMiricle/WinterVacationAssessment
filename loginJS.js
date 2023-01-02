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
        <span class="verificationCodeErrow">验证码错误</span>
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
    div.children[10].addEventListener('input', ()=> { //判断验证码

    })
    div.children[12].addEventListener('click', ()=> { //获取验证码

    })
    loginBox.appendChild(div)

})
// loginBoxTop.children[0].click() //默认选中登录
