const loggedOut = document.querySelectorAll('.logged-out');
const loggedIn = document.querySelectorAll('.logged-in');



const loginCheck = user => {
    if (user){
        loggedIn.forEach(link => link.style.display = 'block');
        loggedOut.forEach(link => link.style.display = 'none');
    }else{
        loggedOut.forEach(link=> link.style.display = 'block')
        loggedIn.forEach(link=> link.style.display = 'none')
    }
}


// SIGN UP
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var modal = new bootstrap.Modal(document.getElementById('#signupModal'), hide())

    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;

    auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {

            // clear the form
            signupForm.reset();

            //close the modal
            $("#signupModal").modal("hide");            
            console.log("signup");
        })
});


// LOGIN
const loginForm = document.querySelector("#login-form");

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;

    auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {

        // clear the form
        loginForm.reset();

        //close the modal
        $("#signinModal").modal("hide");            
        console.log("Login");
       
    })

});


// LOGOUT
const logout = document.querySelector("#logout");

logout.addEventListener('click', e => {
    e.preventDefault();

    auth.signOut().then(()=> {
        console.log("Logout");
    })
})


// GOOGLE LOGIN
const googleButton = document.querySelector("#googleLogin");

googleButton.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.reset();

  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    console.log("google sign in");
  })
  .catch(err => {
    console.log(err);
  })
});

// FACEBOOK LOGIN
const facebookButton = document.querySelector("#facebookLogin");

facebookButton.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.reset();

  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    console.log("facebook sign in");
  })
  .catch(err => {
    console.log(err);
  })
});


// posts
const postList = document.querySelector(".posts");
const setUpPosts = data => {
    if(data.length) {
        let html = '';
        data.forEach(doc => {
            const post = doc.data();
            const li = `
                <li class="list-group-item list-group-item-action">
                    <h5>${post.title}</h5>
                    <p>${post.description}</p>
                </li>
            `;
            html += li;
        });
        postList.innerHTML = html;
    }
    else {
        postList.innerHTML = `<p class="text-center login-posts">Login to see Posts</p>
                                <style> 
                                 .login-posts {
                                     font-size: 2.5rem;
                                     font-weigh: 700;
                                     text-transform: uppercase;
                                     user-select: none;

                                 }`
    }
}


// Events
// List for auth state changes
auth.onAuthStateChanged(user => {
    if(user){

        fs.collection('posts')
            .get()
            .then((snapshot) => {
                setUpPosts(snapshot.docs);
                loginCheck(user);
            })
    }
    else {
        setUpPosts([]);
        loginCheck(user);

    }
})





