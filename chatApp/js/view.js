
const view = {}
view.setActiveScreen = (screenName) => {
  switch (screenName) {
    case 'registerScreen':
      document.getElementById('app').innerHTML = components.registerScreen
      const registerForm = document.getElementById('form-register')
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const registerInfo = {
          firstName: registerForm.firstName.value,
          lastName: registerForm.lastName.value,
          email: registerForm.email.value,
          password: registerForm.password.value,
          confirmPassword: registerForm.confirmPassword.value,
        }
        controller.register(registerInfo)
      })
      const redirectToLogin = document.getElementById('redirect-to-login')
      redirectToLogin.addEventListener('click', (e) => {
        view.setActiveScreen('loginScreen')
      })
      break
    case 'loginScreen':
      document.getElementById('app').innerHTML = components.loginScreen
      const loginForm = document.getElementById('form-login')
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const loginInfo = {
          email: loginForm.email.value,
          password: loginForm.password.value
        }
        controller.login(loginInfo)
      })
      document.getElementById('redirect-to-register').addEventListener('click', (e) => {
        view.setActiveScreen('registerScreen')
      })
      break
    case 'chatScreen':
      document.getElementById('app').innerHTML = components.chatScreen
      const sendMessageForm  = document.querySelector('#sendMessageForm')
      sendMessageForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        const message = {
          owner: model.currentUser.email,
          content: sendMessageForm.message.value,
          createdAt: new Date().toISOString()
        }
        
        if(sendMessageForm.message.value.trim()!==''){
          console.log(message)
          model.addMessage(message)
        }
        sendMessageForm.message.value='';
      })
      model.loadConversations()
      model.listenConversationsChange()
      break;
  }
}
view.setErrorMessage = (elementId, message) => {
  document.getElementById(elementId).innerText = message
}
view.addMessage = (message)=>{
  const messageWrapper = document.createElement('div')
  messageWrapper.classList.add('message')
  if(model.currentUser.email===message.owner){
    messageWrapper.classList.add('mine')
    messageWrapper.innerHTML=`
    <div class="content">${message.content}</div>
    `
  }else{
    messageWrapper.classList.add('their')
    messageWrapper.innerHTML=`
    <div class="owner">${message.owner}</div>
    <div class="content">${message.content}</div>
    ` 
  }
  const listMessage = document.querySelector('.list-message')
  listMessage.appendChild(messageWrapper)
  document.querySelector('.list-message').appendChild(messageWrapper)
  listMessage.scrollTop = listMessage.scrollHeight
}
view.showCurrentConversations = ()=>{
  for(let oneMessage of model.currentConversations.messages){
    view.addMessage(oneMessage)
  }
}