/* eslint-disable no-tabs */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */

// eslint-disable-next-line no-undef
const http = new HTTP();
// eslint-disable-next-line no-undef
const ui = new UI();
const baseUrl = 'https://test-automart.herokuapp.com/api/v2/';
const user = JSON.parse(localStorage.getItem('user'));

let $ = selector => document.querySelector(selector);
const content = $('#content');
const newContent = $('#newContent');
const inventory = $('#inventory');
const pendingOrder = $('#pendingOrder');
let profile;
const getCurrentProfile = async () => {
	const username = $('#username');
	const userimage = $('#userimage');
	const url = `${baseUrl}auth/getProfile`;
	try {
		if (user) {
			const res = await http.getWithHeaders(url, user.token);
			console.log(res);
			profile = res.data;

			if (res.status === 200) {
				username.textContent = `${res.data.firstname} ${res.data.lastname}`;
				userimage.setAttribute('src', res.data.avatar);
			}
		}
	} catch (error) {
		console.log(error);
	}
};
const viewProfile = () => {
	newContent.innerHTML = `
                  <div class="mt-3 row">
                    <div class="col-12 col-md-10 col-lg-8 mx-auto">
                    <div class="parent">
										  <div class="in-between"></div>
									  </div>
											<div class="card bg-light-grey">
												<div class="d-flex justify-content-center py-3 ">
													<img
														src="${profile.avatar}"
														alt="User image"
														width="150px"
														height="150px"
														class="rounded-image responsive-image"
													/>
												</div>
												<div class="d-flex justify-content-center">
													<div class="container">
														<h1 class="d-flex justify-content-center">
															${profile.firstname} ${profile.lastname}
														</h1>
														<p class="title d-flex justify-content-center">
														${profile.address}
														</p>
														<p class="d-flex justify-content-center">
															${profile.phonenumber}
														</p>
														<p class="d-flex justify-content-center">
															${profile.email}
														</p>
													</div>
                        </div>
                        <div class="d-flex justify-content-around">
													<button onclick="editProfile()" class="btn btn-purple p-1">
														Edit
													</button>
													<button class="btn btn-orange p-1" onclick= "reload()">
														Back
													</button>
												</div>
											</div>
										</div>
									</div>
  `;
	content.appendChild(newContent);
};
const reload = () => {
	window.location.reload();
};
const editProfile = () => {
	ui.showAlert('presently working on this feature', 'alert info');
};
const logoutUser = async () => {
	const url = `${baseUrl}auth/logout`;
	try {
		const res = await http.get(url);
		if (res.status === 200) {
			localStorage.clear();
			window.location.pathname = '/signIn.html';
		}
	} catch (error) {
		console.log(error);
	}
};
const checkIfLoggedIn = () => {
	if (user.token && user.role === 'BUYER') {
		console.log('Buyer account');
	} else {
		window.location.pathname = '/signIn.html';
	}
};
const getSpecificCar = async id => {
	const url = `${baseUrl}car/${id}`;
	try {
		const { status, data } = await http.get(url);
		let domStatus;
		if (status === 200) {
			if (data.status === 'available') {
				domStatus = `<div>
        <i class="fab fa-opencart text-green"></i>
        <small class="mr-2 text-green">Available</small>
      </div>`;
			} else {
				domStatus = `<div>
        <i class="fas fa-times-circle text-red"></i>
        <small class="mr-2 text-red">Sold</small>
      </div>`;
			}
			newContent.innerHTML = `
			<div class="container">
					<div class="bg-light-grey">
						<div class=" p-2 row">
							<div class="col-12 col-lg-6">
								<div class="slider">
									<input
										type="radio"
										name="slider"
										title="slide1"
										checked="checked"
										class="slider__nav"
									/>
									<input
										type="radio"
										name="slider"
										title="slide2"
										class="slider__nav"
									/>
									<input
										type="radio"
										name="slider"
										title="slide3"
										class="slider__nav"
									/>
									<input
										type="radio"
										name="slider"
										title="slide4"
										class="slider__nav"
									/>
									<div class="slider__inner">
										<div class="slider__contents">
											<img
												class="responsive-image min-width"
												src=${data.image_url}
												alt=""
												width="350px"
												height="400px"
											/>
										</div>
										<div class="slider__contents">
											<img
												class="responsive-image"
												src="./assest/images/images9.jpg"
												alt=""
												width="100%"
												height="100%"
											/>
										</div>
										<div class="slider__contents">
											<img
												class="responsive-image"
												src="./assest/images/images4.jpg"
												alt=""
												width="100%"
												height="100%"
											/>
										</div>
										<div class="slider__contents">
											<img
												class="responsive-image "
												src="./assest/images/images7.jpg"
												alt=""
												width="100%"
												height="100%"
											/>
										</div>
									</div>
								</div>
							</div>
							<div class="col-12 col-lg-6">
								<div class="p-3">
									<div class="d-flex justify-content-between">
										<h5 class="car-title my-0">
											${data.manufacturer}
											<span>${data.model}</span>
										</h5>
										<div class="">
											${domStatus}
										</div>
									</div>
									<div class="row">
										<div class="col-6 p-1">
											<i class="fas fa-tachometer-alt"></i>
											<small class="mr-2">${data.transmission}</small>
										</div>
										<div class="col-6 p-1 ">
											<i class="fas fa-gas-pump"></i>
											<small class="mr-2">${data.fuel_type}</small>
										</div>
										<div class="col-6 p-1">
											<i class="fas fa-car"></i>
											<small class="mr-2">${data.body_type}</small>
										</div>
										<div class="col-6 p-1">
											<i class="fas fa-calendar-alt"></i>
											<small class="mr-2">${data.year}</small>
										</div>
									</div>
									<h5 class="text-dark-grey font-weight-bold montserrat my-1">
										&#8358; ${data.price}
									</h5>

									<p class="font-weight-normal paragraph">
										${data.description}
									</p>

									<div class="d-flex justify-content-between">
                    <a
                    onclick= "openCarOrder(${data.carid}, 
                      ${data.price}, 'newOrder')"
                    class="text-abstract-orange clickable">
											Order Now 
											<i class="fas fa-shopping-basket text-abstract-orange"></i>
                    </a>
                    <a onclick= "reload()" class="btn btn-purple-reverse" role="button" >Back
                      <i class="fas fa-long-arrow-alt-left "></i>
                     </a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
      `;
			content.appendChild(newContent);
		}
	} catch (error) {
		console.log(error);
	}
};
const openCarOrder = (id, price, type, imageUrl) => {
	let orderButton;
	if (type === 'newOrder') {
		orderButton = `
    <button onclick ="placeOrder(${id}, ${price})" class="btn btn-purple">
            Place Order
          </button>
    `;
	} else if (type === 'editOrder') {
		orderButton = `
    <button onclick ="editOrder(${id})" class="btn btn-orange">
      Edit Order
    </button>
    `;
	}
	newContent.innerHTML = `<div class="">
  <div class="p-2">
    <div class="parent">
		  <div class="in-between"></div>
		  </div>
    <h4 class="m-0">
      Purchase Order
    </h4>
    <div class="row">
      <div class="col-12 col-md-6">
        <img
          src=${imageUrl}
          alt=""
          width="100%"
          height="300px"
        />
      </div>
      <div class="col-12 col-md-6">
        <div>
          <h5>
            Asking Price is
            <span class="price">#${price}</span>
          </h5>
        </div>
        <div id="amount" class="my-1">
          <p class="text-abstract-orange">What's your Offer?</p>
          <input id ="priceOffered" type="text" class="w-100 p-5" />
        </div>

        <div class="d-flex justify-content-between mt-3">
         ${orderButton}
          <a onclick= "reload()" class="btn btn-purple-reverse" role="button" >Back
        <i class="fas fa-long-arrow-alt-left "></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>`;
	content.appendChild(newContent);
};
const placeOrder = async (id, price) => {
	try {
		const priceOffered = $('#priceOffered').value;
		const url = `${baseUrl}order`;
		const orderData = {
			carId: id,
			amount: price,
			priceOffered,
		};
		const res = await http.postWithHeader(url, orderData, user.token);
		if (res.status === 201) {
			ui.showAlert(res.message, 'alert success');
			setTimeout(() => {
				window.location.reload();
			}, 2000);
		} else if (res.status === 400) {
			ui.showAlert(res.message, 'alert danger');
			setTimeout(() => {
				window.location.reload();
			}, 2000);
		}
	} catch (error) {
		console.log(error);
	}
};
const editOrder = async id => {
	try {
		const priceOffered = $('#priceOffered').value;
		const url = `${baseUrl}order/${id}/${priceOffered}`;
		const res = await http.putWithHeaderUrl(url, user.token);
		if (res.status === 200) {
			ui.showAlert(res.message, 'alert success');
			setTimeout(() => {
				window.location.reload();
			}, 2000);
		} else if (res.status === 404) {
			ui.showAlert(res.message, 'alert danger');
			setTimeout(() => {
				window.location.reload();
			}, 2000);
		}
	} catch (error) {
		console.log(error);
	}
};
const getAllAvailableCars = async () => {
	const url = `${baseUrl}car/unsold?status=available`;
	try {
		if (user) {
			const res = await http.getWithHeaders(url, user.token);
			if (res.status === 200) {
				let status;
				res.data.forEach(car => {
					if (car.status === 'available') {
						status = `<div>
            <i class="fab fa-opencart"></i>
            <small class="mr-2">Available</small>
          </div>`;
					} else {
						status = `<div>
            <i class="fas fa-times-circle"></i>
            <small class="mr-2">Sold</small>
          </div>`;
					}
					inventory.innerHTML += `
          <div class="col-12 col-md-6 col-lg-4 my-2">
										<div class="wrapper">
											<div class="container">
												<div class="top">
													<img
														src=${car.image_url}
														alt=""
														width="100%"
														height="100%"
													/>
												</div>
												<div class="bottom">
													<div class="left">
														<div class="details">
															<h1>${car.manufacturer} ${car.model}</h1>
															<p class="monseratt text-dark-grey">#${car.price}</p>
														</div>
														<div class="buy">
															<i class="material-icons text-green">shopping_cart</i>
														</div>
													</div>
												</div>
											</div>
											<div class="inside">
												<div class="icon">
													<i class="material-icons">info_outline</i>
												</div>
												<div class="contents">
													<div class="d-flex justify-content-between">
														<div>
															<i class="fas fa-map-marker-alt"></i>
															<small class="mr-2">${car.location}</small>
														</div>
														${status}
													</div>
													<div class="text-white">
														<hr />
													</div>
													<div class="row">
														<div class="col-10 mx-auto">
															<div class="row">
																<div class="col-6 p-1">
																	<i class="fas fa-tachometer-alt"></i>
																	<small class="mr-2">${car.transmission}</small>
																</div>
																<div class="col-6 p-1 ">
																	<i class="fas fa-gas-pump"></i>
																	<small class="mr-2">${car.fuel_type}</small>
																</div>
																<div class="col-6 p-1">
																	<i class="fas fa-car"></i>
																	<small class="mr-2">${car.body_type}</small>
																</div>
																<div class="col-6 p-1">
																	<i class="fas fa-calendar-alt"></i>
																	<small class="mr-2">${car.year}</small>
																</div>
															</div>
														</div>
													</div>
													<div class="container text-white">
														<hr />
													</div>
													<div class="row">
														<div class="col-10 mx-auto">
															<p>
                                ${car.description}
															</p>
														</div>
													</div>
													<div class="d-flex justify-content-between ">
														<a
														id="open-button"
														class="btn-more clickable"
                              role="button"
                              onclick = "getSpecificCar(${car.carid})"
														>
															View more
														</a>
                            <a
                            onclick = "openCarOrder(${car.carid}, ${
						car.price
					}, 'newOrder', ${car.image_url})"
                            class="btn-edit clickable"
                            role="button">
                            Order Now
                          </a>
													</div>
												</div>
											</div>
										</div>
									</div>
          `;
				});
			} else if (res.status === 404) {
				console.log('cars not available');
			}
		}
	} catch (error) {
		console.log(error);
	}
};
const getAllPendingCars = async () => {
	const url = `${baseUrl}order`;
	try {
		if (user) {
			const res = await http.getWithHeaders(url, user.token);
			if (res.status === 200) {
				console.log('res from get pending cars', res);
				res.data.forEach(car => {
					let offerPrice;
					if (car.new_price_offered && car.old_price_offered) {
						offerPrice = ` <div class="d-flex justify-content-around">
            <p>
             <strong>New Price:</strong><br> #${car.new_price_offered}
            </p>
            <p>
            <strong>Old Price:</strong><br> #${car.old_price_offered}
            </p>
          </div>`;
					} else {
						offerPrice = `<p>
            <strong>Price Offered:</strong><br> #${car.price_offered}
          </p>`;
					}
					pendingOrder.innerHTML += `
          <div class="col-12 col-md-6 col-lg-4 my-2">
										<div class="wrapper">
											<div class="container">
												<div class="top">
													<img
														src=${car.image_url}
														alt=""
														width="100%"
														height="100%"
													/>
												</div>
												<div class="bottom">
													<div class="left">
														<div class="details">
															<h1>${car.manufacturer} ${car.model}</h1>
															<p class="monseratt text-dark-grey">#${car.price}</p>
														</div>
														<div class="buy">
															<i class="material-icons text-green ">shopping_cart</i>
														</div>
													</div>
												</div>
											</div>
											<div class="inside">
												<div class="icon">
													<i class="material-icons">info_outline</i>
												</div>
												<div class="contents">
													<div class="d-flex justify-content-between">
														<div>
															<i class="fas fa-map-marker-alt"></i>
															<small class="mr-2">${car.location}</small>
														</div>
														<div>
                              <i class="fab fa-opencart"></i>
                              <small class="mr-2">Pending</small>
                            </div>
													</div>
													<div class="text-white">
														<hr />
													</div>

													<div class="row">
														<div class="col-10 mx-auto">
															<div class="row">
																<div class="col-6 p-1">
																	<i class="fas fa-tachometer-alt"></i>
																	<small class="mr-2">${car.transmission}</small>
																</div>
																<div class="col-6 p-1 ">
																	<i class="fas fa-gas-pump"></i>
																	<small class="mr-2">${car.fuel_type}</small>
																</div>
																<div class="col-6 p-1">
																	<i class="fas fa-car"></i>
																	<small class="mr-2">${car.body_type}</small>
																</div>
																<div class="col-6 p-1">
																	<i class="fas fa-calendar-alt"></i>
																	<small class="mr-2">${car.year}</small>
																</div>
															</div>
														</div>
													</div>
													<div class="container text-white">
														<hr />
													</div>
													<div class="row">
														<div class="col-10 mx-auto">
															<p>
                                ${car.description}
															</p>
														</div>
													</div>
													<div class="d-flex justify-content-between ">
														<a
														class="btn-more clickable"
                              role="button"
                              onclick = "getSpecificCar(${car.carid})"
														>
															View more
														</a>
                            <a
                            onclick = "openCarOrder(${car.orderid}, 
                              ${car.price}, 'editOrder', ${car.image_url})"
                            class="btn-edit clickable"
                            role="button">
                            Edit Order
                          </a>
                          </div>
                          ${offerPrice}
												</div>
											</div>
										</div>
									</div>
          `;
				});
			} else if (res.status === 404) {
				console.log('cars not available');
			}
		}
	} catch (error) {
		console.log(error);
	}
};
const openCar = (evt, condition) => {
	let i;
	let tabcontent;
	let tablinks;
	inventory.innerHTML = '';
	pendingOrder.innerHTML = '';
	getAllAvailableCars();
	getAllPendingCars();
	tabcontent = document.getElementsByClassName('tabcontent');
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none';
	}
	tablinks = document.getElementsByClassName('tablinks');
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(' active', '');
	}
	document.getElementById(condition).style.display = 'block';
	evt.currentTarget.className += 'active';
};
const onInit = () => {
	checkIfLoggedIn();
	getCurrentProfile();
	getAllAvailableCars();
	getAllPendingCars();
};

onInit();
