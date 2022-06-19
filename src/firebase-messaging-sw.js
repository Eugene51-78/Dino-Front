importScripts("https://www.gstatic.com/firebasejs/9.8.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.8.3/firebase-messaging-compat.js");

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

const firebaseConfig = {
  apiKey: "AIzaSyCxpLHgLP_mQAXI1piqedj_GcfSUjfoEoI",
  authDomain: "dinoproject-6e0d1.firebaseapp.com",
  projectId: "dinoproject-6e0d1",
  storageBucket: "dinoproject-6e0d1.appspot.com",
  messagingSenderId: "367840761700",
  appId: "1:367840761700:web:7e0ebb72099377ccd18c71",
  measurementId: "G-KMSNKVW4HZ"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log('Message received. ', payload);
//   // this.message=payload;
// });
// messaging.onBackgroundMessage((payload) => {
//   var dataFromServer = JSON.parse(payload.data.notification);
//   var notificationTitle = dataFromServer.title;
//   var notificationOptions = {
//     body: dataFromServer.body + "123",
//     icon: dataFromServer.icon,
//     data: {
//       url: dataFromServer.url
//     }
//   };
//   return self.registration.showNotification(notificationTitle, notificationOptions);
// });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
//
