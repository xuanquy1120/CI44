const components = {}
components.welcomeScreen = `
  <div>Welcome to chat app</div>
`
components.registerScreen = `
<div class="register-container">
<div class="register-form">
  <div class="title">MinX chat</div>
  <form id="form-register">
    <div class="name-wrapper">
      <div class="input-wrapper">
        <input type="text" name="firstName" placeholder="First name...">
        <div class="error" id="error-first-name"></div>
      </div> 
      <div class="input-wrapper">
        <input type="text" name="lastName" placeholder="Last name...">
        <div class="error" id="error-last-name"></div>
      </div> 
    </div>
    <div class="input-wrapper">
      <input type="text" name="email" placeholder="Email..." >
      <div class="error" id="error-email"></div>
    </div> 
    <div class="input-wrapper">
      <input type="password" name="password" placeholder="Password..." >
      <div class="error" id="error-password"></div>
    </div> 
    <div class="input-wrapper">
      <input type="password" name="confirmPassword" placeholder="Confirm password..." >
      <div class="error" id="error-confirm-password"></div>
    </div> 
    <div class="submit-wrapper">
      <div>Already have an account ? <span class="cursor-pointer" id="redirect-to-login">Login</span></div>
      <button class="btn" type="submit">Register</button>
    </div>
  </form>
</div>
</div>
`
components.loginScreen = `
<div class="login-container">
<div class="login-form">
  <div class="title">MinX chat</div>
  <form id="form-login">
    <div class="input-wrapper">
      <input type="text" name="email" placeholder="Email..." >
      <div class="error" id="error-email"></div>
    </div> 
    <div class="input-wrapper">
      <input type="password" name="password" placeholder="Password..." >
      <div class="error" id="error-password"></div>
    </div> 
    <div class="submit-wrapper">
      <div>Don't have an account ? <span class="cursor-pointer" id="redirect-to-register">Register</span></div>
      <button class="btn" type="submit">Login</button>
    </div>
  </form>
</div>
</div>
`
components.chatScreen = `
<div class="chat-container">
            <div class="chat-header">
                Mindx chat
            </div>
            <div class="main">
                <div class="conversation-detail">
                    <div class="conversation-title">First conversation</div>
                    <div class="list-message">
                      
                    </div>
                    <form id="sendMessageForm">
                        <input class="input" autocomplete="off" type="text" name="message">
                        <button class="btn"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                    </from>
                </div>
            </div>
        </div>
`