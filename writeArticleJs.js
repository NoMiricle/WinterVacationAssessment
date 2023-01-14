let loginBtn = document.querySelector('.loginBtn')
let title = document.querySelector('.title')
let main = title.nextElementSibling
let count = document.querySelector('.count')

if(!localStorage.getItem('uid')) { //如果未登录则回到登录界面
    location.href = 'file:///D:/Learn/Web/LanshanWorks/WinterVacationAssessment/login.html'
}
let userImformation = JSON.parse(localStorage.getItem('userImformation'))

main.addEventListener('input', ()=> { //计数
    count.innerHTML = main.value.length
})

loginBtn.addEventListener('click', ()=> { //更新帖子
    if(title.value != 0 && main.value != 0) {
        async function post() {
            let obj = {
                'type' : 2,
                'topic_id': 1,
                'title': title.value,
                'content': main.value
            }
            try{
                let result = await fetch('http://81.68.76.44:8080/api/v1/post', {
                    method: 'post',
                    headers: {
                        'Content-Type':'application/json; charset=utf-8',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify(obj)
                })
                let res1 = await result.json()
                console.log(res1)
                if(res1.code === 0) {
                    alert('发布成功')
                }else{
                    alert('发布失败')
                }     
            }catch(err) {
                console.log(err)
            }
        }
        post()
    }else {
        alert('请输入标题或文章内容不为0')
    }
    
})