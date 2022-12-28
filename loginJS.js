let loginBoxTop = document.querySelector('.loginBoxTop')
let loginBoxMain = document.querySelector('.loginBoxMain')
let registerBoxMain = document.querySelector('.registerBoxMain')
loginBoxTop.children[0].addEventListener('click', ()=>{
    loginBoxTop.children[1].classList.remove('loginBoxTop_checked') //选中登录
    loginBoxTop.children[0].classList.add('loginBoxTop_checked') //选中注册
    registerBoxMain.style.visibility = 'hidden' //注册模块隐藏
    loginBoxMain.style.visibility = 'visible' //登录模块显现
    registerBoxMain.children[0].value = '' //清空注册写入的账号和密码
    registerBoxMain.children[2].value = ''
    registerBoxMain.children[1].style.visibility = 'hidden'
    registerBoxMain.children[3].style.visibility = 'hidden'
})
loginBoxTop.children[1].addEventListener('click', ()=>{
    loginBoxTop.children[0].classList.remove('loginBoxTop_checked')
    loginBoxTop.children[1].classList.add('loginBoxTop_checked')
    loginBoxMain.style.visibility = 'hidden' //登录模块隐藏
    registerBoxMain.style.visibility = 'visible' //注册模块显现
})
loginBoxTop.children[0].click() //默认选中登录

//检测注册账号密码是否合理
registerBoxMain.children[0].addEventListener('input', ()=> {
    if(/[^a-z^0-9^A-Z]/.test(registerBoxMain.children[0].value)){
        registerBoxMain.children[1].style.visibility = 'visible' //显示账号错误
    }else{
        registerBoxMain.children[1].style.visibility = 'hidden'
    }
})
registerBoxMain.children[2].addEventListener('input', ()=> {
    if(/[^a-z^0-9^A-Z]/.test(registerBoxMain.children[2].value)||!/^[a-zA-Z]/.test(registerBoxMain.children[2].value)){
        registerBoxMain.children[3].style.visibility = 'visible' //显示密码错误
    }else{
        registerBoxMain.children[3].style.visibility = 'hidden'
    }
})