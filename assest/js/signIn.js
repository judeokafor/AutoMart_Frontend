/* eslint-disable array-callback-return */
// eslint-disable-next-line no-undef
const http = new HTTP();
const baseUrl = 'https://test-automart.herokuapp.com/api/v2/';

const loginBtn = document.querySelector('#login');
const signupBtn = document.querySelector('#signup');

const firstname = document.querySelector('#firstName');
const lastname = document.querySelector('#lastName');
const phone = document.querySelector('#phone');
const regEmail = document.querySelector('#regEmail');
const regPassword = document.querySelector('#regPassword');
const cnfPassword = document.querySelector('#cnfPassword');
const seller = document.querySelector('#seller');
const buyer = document.querySelector('#buyer');

const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');
// eslint-disable-next-line no-undef
const ui = new UI();
const user = JSON.parse(localStorage.getItem('user'));
const buyerlink = '/userdashboard.html';
const sellerlink = '/sellerdashboard.html';
const adminlink = '/admindashboard.html';

loginBtn.addEventListener('click', e => {
	const parent = e.target.parentNode.parentNode;
	Array.from(e.target.parentNode.parentNode.classList).find(element => {
		if (element !== 'slide-up') {
			parent.classList.add('slide-up');
		} else {
			signupBtn.parentNode.classList.add('slide-up');
			parent.classList.remove('slide-up');
		}
	});
});

signupBtn.addEventListener('click', e => {
	const parent = e.target.parentNode;
	Array.from(e.target.parentNode.classList).find(element => {
		if (element !== 'slide-up') {
			parent.classList.add('slide-up');
		} else {
			loginBtn.parentNode.parentNode.classList.add('slide-up');
			parent.classList.remove('slide-up');
		}
	});
});
const checkIfLoggedIn = role => {
	if (user.token && user.role === role) {
		if (role === 'BUYER') {
			window.location.pathname = buyerlink;
		} else if (role === 'SELLER') {
			window.location.pathname = sellerlink;
		} else {
			window.location.pathname = adminlink;
		}
	} else if (!role) {
		ui.showAlert('Please Sign in to continue', 'alert info');
	}
};
const login = async () => {
	const signInEmail = loginEmail.value;
	const signInPassword = loginPassword.value;
	if (signInEmail === '' || signInPassword === '') {
		ui.showAlert('Please fill in all fields', 'alert danger');
	} else {
		const dataToLogin = {
			email: signInEmail,
			password: signInPassword,
		};
		http
			.post(`${baseUrl}auth/signIn`, dataToLogin)
			.then(res => {
				console.log(res);
				if (res.status === 201) {
					localStorage.removeItem('user');
					localStorage.setItem(
						'user',
						JSON.stringify({ token: res.token, role: res.role })
					);
					ui.showAlert(res.message, 'alert success');
					setTimeout(() => {
						if (res.role === 'BUYER') {
							window.location.pathname = buyerlink;
						} else if (res.role === 'SELLER') {
							window.location.pathname = sellerlink;
						} else {
							window.location.pathname = adminlink;
						}
					}, 2000);
				} else if (res.status === 400) {
					ui.showAlert(res.message, 'alert danger');
				} else if (res.status === 'error') {
					ui.showAlert(res.error.message, 'alert danger');
				} else if (res.status === 404) {
					ui.showAlert(res.message, 'alert danger');
				}
			})
			.catch(err => console.log(err));
	}
};

const register = async () => {
	const email = regEmail.value;
	const firstName = firstname.value;
	const lastName = lastname.value;
	const phoneNumber = phone.value;
	const password = regPassword.value;
	const cnfpassword = cnfPassword.value;
	let role;

	if (
		email === ' ' ||
		firstName === ' ' ||
		lastName === '' ||
		phoneNumber === '' ||
		cnfpassword === '' ||
		password === '' ||
		role === ''
	) {
		ui.showAlert('Please fill in all fields', 'alert danger');
	} else if (cnfpassword !== password) {
		ui.showAlert('Password does not match', 'alert danger');
	} else {
		if (seller.checked) {
			role = seller.value;
		}
		if (buyer.checked) {
			role = buyer.value;
		}
		const dataToReg = {
			email,
			firstName,
			lastName,
			phoneNumber,
			password,
			role,
		};
		http
			.post(`${baseUrl}auth/signUp`, dataToReg)
			.then(res => {
				if (res.status === 201) {
					ui.showAlert('Registration successful', 'alert success');
					setTimeout(() => {
						const parent = loginBtn.parentNode.parentNode;
						parent.classList.add('slide-up');
						signupBtn.parentNode.classList.add('slide-up');
						parent.classList.remove('slide-up');
					}, 2000);
				} else if (res.status === 400) {
					ui.showAlert(res.message, 'alert danger');
				} else if (res.status === 'error') {
					ui.showAlert(res.error.message, 'alert danger');
				}
				localStorage.removeItem('user');
			})
			.catch(err => console.log(err));
	}
};

const onInit = () => {
	checkIfLoggedIn(user.role);
};

onInit();
