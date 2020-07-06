const model = {}
model.currentUser = undefined
model.collectionName='conversations'
model.currentConversations = undefined

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
model.loadConversations=()=>{
  firebase.firestore().collection(model.collectionName).where('users','array-contains', model.currentUser.email).get().then(res=>{
    const data = utils.getDataFromDocs(res.docs)
    if(data.length >0){
      model.currentConversations = data[0]
      view.showCurrentConversations()
    }
    // console.log(data)
  })
}
model.addMessage = (message) =>{
  const dataToUpdate = {
    messages:firebase.firestore.FieldValue.arrayUnion(message),
  }
  firebase.firestore().collection(model.collectionName).doc(model.currentConversations.id).update(dataToUpdate)
}
model.listenConversationsChange = () =>{
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
     if(oneChangeData.id=model.currentConversations.id){
       view.addMessage(oneChangeData.messages[oneChangeData.messages.length -1])
     }
   }
  })
}