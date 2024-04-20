const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require("firebase/auth");

const loginUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userID = user.uid;
      return res.json({ success: true, message: 'Đăng nhập thành công' });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return res.json({ success: false, message: 'Đăng nhập thất bại', error: errorMessage });
    });
}
const SignUp = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // const docRef = addDoc(collection(db, "users"), req.body
      // );
      return res.json({ success: true, message: 'Đăng nhập thành công' });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return res.json({ success: false, message: 'Đăng nhập thất bại', error: errorMessage });
    });
}
module.exports = {
  loginUser,
  SignUp
}