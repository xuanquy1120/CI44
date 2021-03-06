const model = {}
model.currentUser = undefined
model.collectionName='conversations'
model.currentConversation = undefined
model.conversations = undefined

model.register = (firstName, lastName, email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
    console.log(user)
    firebase.auth().currentUser.sendEmailVerification()
    firebase.auth().currentUser.updateProfile({
      displayName: firstName+''+lastName
    })
    alert('register success, please check your email!')
  }).catch((err) => {
    alert(err.message)
    console.log(err)
  })
}
model.login = (email,password)=>{
  firebase.auth().signInWithEmailAndPassword(email, password).then((user)=>{
    console.log(user)
    if (user.user.emailVerified){
      model.currentUser = {
        displayName: user.user.displayName,
        email: user.user.email
      }
      view.setActiveScreen('chatScreen')
    }else{
      alert('please verify your email!')
    }
  }). catch((err)=>{
    alert(err.message)
    console.log(err)
  })
}
model.loadconversations=()=>{
  firebase.firestore().collection(model.collectionName).where('users','array-contains', model.currentUser.email).get().then(res=>{
    const data = utils.getDataFromDocs(res.docs)
    model.conversations = data
    if(data.length >0){
      model.currentConversation = data[0]
      view.showCurrentConversation()
    }
    view.showConversation()
    // console.log(data)
  })
}
model.addMessage = (message) =>{
  const dataToUpdate = {
    messages:firebase.firestore.FieldValue.arrayUnion(message),
  }
  firebase.firestore().collection(model.collectionName).doc(model.currentConversation.id).update(dataToUpdate)
}
model.listenconversationsChange = () =>{
  let isFistRun = false
  firebase.firestore().collection(model.collectionName).where('users','array-contains', model.currentUser.email).onSnapshot((res)=>{
   const docChanges = res.docChanges()
   console.log(docChanges)
    if(!isFistRun){
      isFistRun = true
      return
    }
   for(oneChange of docChanges )
   {
     const type = oneChange.type
     const oneChangeData = utils.getDataFromDoc(oneChange.doc)
     console.log(oneChangeData)
     if(type === 'modified')
     {
      if(oneChangeData.id=model.currentConversation.id){
        
        if(oneChangeData.users.length===model.currentConversation.users.length){
        view.addMessage(oneChangeData.messages[oneChangeData.messages.length -1])
        }else{
          view.addUser(oneChangeData.users[oneChangeData.users.length-1])
        }model.currentConversation = oneChangeData
      }
      for(let i = 0; i<model.conversations.length;i++){
        const element = model.conversations[i]
        if(element.id === oneChangeData.id){
          model.conversations[i]=oneChangeData
        }
      }
     }
     else if(type==='added'){
      model.conversations.push(oneChangeData)
      view.addConversation(oneChangeData)
    }
   }
  })
}
model.changecurrentConversation = (conversationId) =>{
  // for(conversations of model.conversations){
  //   if(conversations.id===conversationsId){
  //     model.currentConversation=conversations
  //   }
  // }
  model.currentConversation = model.conversations
  .filter(item => item.id === conversationId)[0]
  console.log(model.currentConversation)
  view.showCurrentConversation()
}
model.createConversation = (conversations)=>{
  firebase.firestore().collection(model.collectionName).add(conversations).then(res=>{
  })
  view.backToChatScreen()
}
model.addUser=(email)=>{
  const dataToUpdate={
    users:firebase.firestore.FieldValue.arrayUnion(email)
  }
  firebase.firestore().collection(model.collectionName).doc(model.currentConversation.id).update(dataToUpdate)
}