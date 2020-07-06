window.onload = () => {
  var firebaseConfig = {
    apiKey: "AIzaSyCn3JANdvcImwQYgiuAD6hPRLdHG0tr60E",
    authDomain: "appchat-710d3.firebaseapp.com",
    databaseURL: "https://appchat-710d3.firebaseio.com",
    projectId: "appchat-710d3",
    storageBucket: "appchat-710d3.appspot.com",
    messagingSenderId: "865980034084",
    appId: "1:865980034084:web:9154e0a4574e8c8d8afcb1",
    measurementId: "G-2WF7C6Z0E3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // templateQueryDatabase()
  firebase.auth().onAuthStateChanged((user) => {
    // console.log(user)
    if(user) {
      if (user.emailVerified) {
        model.currentUser = {
          displayName: user.displayName,
          email: user.email
        }
        view.setActiveScreen('chatScreen')
      } else {
        view.setActiveScreen('loginScreen')
        alert('Please verify your email')
      }
    } else {
      view.setActiveScreen('loginScreen')
    }
  })
}


templateQueryDatabase = () =>{
  const docId='dYT2mtugvtQsiiePuKxl'
  // get one
  firebase.firestore().collection('users').doc(docId).get().then(res=>{
    console.log(getDataFromDoc(res))
  }).catch(err=>{
    console.log(err)
  })
  // get many
  firebase.firestore().collection('users').where('name','==','Nguyen Xuan Quy').get().then(res=>{
    console.log(res)
    // console.log(res.doc)
    console.log(getDataFromDocs(res.docs))
  })
  // create
  const dataToCreate=  {
    name:'Create',
    age:18,
    email:'ice@gmail.com',
    phoneNumber:['0312456789']
  }
  firebase.firestore().collection('users').add(dataToCreate).then(res =>{
    alert('Added')
  })
  // update
  const docIdUpdate = 'XffK7gqXBuJwLm5Rte3N'
  const dataToUpdate = {
    name:'nguyen xuan quy',
    address:'HN',
    phoneNumber: firebase.firestore.FieldValue.arrayUnion('01234567899')
  }
  firebase.firestore().collection('users').doc(docIdUpdate).update(dataToUpdate).then(res =>{
    alert('Updated!')
  })
  // delete
  firebase.firestore().collection('users').doc(docIdUpdate).delete().then(res =>{
    alert('delete')
  })
}

// getDataFromDoc=(doc)=>{
//   const data = doc.data()
//   data.id = doc.id
//   return data
// }
// getDataFromDocs = (docs)=>{
//   return docs.map(getDataFromDoc)
// }