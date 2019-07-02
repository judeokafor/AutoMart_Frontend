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

const unsoldCars = $('#unsoldCars');
const soldVehicles = $('#soldVehicles');
const allFlags = $('#allFlags');
const content = $('#content');
const newContent = $('#newContent');
const getAllCars = async () => {
  const url = `${baseUrl}car/all`;
  let status = '';
  try {
    if (user) {
      const res = await http.getWithHeaders(url, user.token);
      if (res.status === 200) {
        const availableCars = [];
        const soldCars = [];
        res.data.forEach((car) => {
          if (car.status === 'available') {
            availableCars.push(car);
          } else {
            soldCars.push(car);
          }
        });
        availableCars.forEach((car) => {
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
          unsoldCars.innerHTML += `
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
                            onclick = "deleteCar(${car.carid})"
                            class="btn-delete clickable"
                            role="button">
															Delete
														</a>
													</div>
												</div>
											</div>
										</div>
									</div>
          `;
        });
        soldCars.forEach((car) => {
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
          soldVehicles.innerHTML += `
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
															<i class="material-icons text-red">remove_shopping_cart</i>
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
                          onclick = "deleteCar(${car.carid})"
                          class="btn-delete clickable"
                          role="button">
                            Delete
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
const getSpecificCar = async (id) => {
  const url = `${baseUrl}car/${id}`;
  try {
    const { status, data } = await http.get(url);
    console.log(data);
    if (status === 200) {
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
											<img
												class="responsive-image"
												src="./assest/images/svg/sold.svg"
												alt=""
												width="30px"
												height="30px"
											/>
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
										<a href="#" onclick= "deleteOneCar(${
  data.carid
})" class="delete text-red clickable">
											Delete Ad
											<i class="far fa-trash-alt text-red delete"></i>
                    </a>
                    <a href="/AutoMart/UI/admindashboard.html" class="delete clickable" role="button" >Back
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
const getCurrentProfile = async () => {
  const username = $('#username');
  const userimage = $('#userimage');
  const url = `${baseUrl}auth/getProfile`;
  try {
    if (user) {
      const res = await http.getWithHeaders(url, user.token);
      if (res.status === 200) {
        username.textContent = `${res.data.firstname} ${res.data.lastname}`;
        userimage.setAttribute('src', res.data.avatar);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteCar = async (id) => {
  const url = `${baseUrl}car/${id}`;
  try {
    if (user) {
      const res = await http.deleteWithHeader(url, user.token);
      console.log('res from delete', res);
      if (res.status === 200) {
        unsoldCars.innerHTML = '';
        soldVehicles.innerHTML = '';
        getAllCars();
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteOneCar = (id) => {
  deleteCar(id);
  setTimeout(() => {
    window.location.reload();
  }, 2000);
};
const logoutUser = async () => {
  const url = `${baseUrl}auth/logout`;
  try {
    const res = await http.get(url);
    console.log(' res from logout', res);
    if (res.status === 200) {
      localStorage.clear();
      window.location.pathname = '/AutoMart/UI/signIn.html';
    }
  } catch (error) {
    console.log(error);
  }
};
const checkIfLoggedIn = () => {
  if (user.token && user.role === 'admin') {
    console.log('You are an admin');
  } else {
    window.location.pathname = '/AutoMart/UI/signIn.html';
  }
};
const reload = () => {
  window.location.reload();
};
const getAllFlags = async () => {
  const url = `${baseUrl}flag`;
  try {
    if (user) {
      const res = await http.getWithHeaders(url, user.token);
      if (res.status === 200) {
        let phoneNumber;
        res.data.forEach((report) => {
          if (report.phone !== '' || report.phone !== null) {
            phoneNumber = ` <h3>${report.phone}</h3>`;
          } else {
            phoneNumber = '';
          }
          allFlags.innerHTML += `
          <div class="container">
          <div class="parent">
							<div class="in-between"></div>
						</div>
            <div class="list row">
              <div class="col-4 col-md-3 bg-purple">
                <h3>${report.name}</h3>
              </div>
              <div class="col-6 col-md-9">
                <h3>${report.reason}</h3>
                <p>${report.description}</p>
                <div class ="d-flex justify-content-between">
                  <button onclick = "contactSeller()" class = "btn btn-orange my-2">Contact Seller</button>
                  <button onclick = "viewAdvert()" class = "btn btn-purple-reverse my-2">View Advert</button>
                  <button class= "btn btn-purple my-2" onclick="reload()">Back</button>
                </div>
              </div>
            </div>
					</div>
          `;
        });
      } else {
        allFlags.innerHTML += `
          <div class="list">
												<ul>
													<li>
                            <h2>
                            ${res.message}
                            </h2>
													</li>
												</ul>
											</div>`;
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const contactSeller = () => {
  ui.showAlert('Working on it', 'alert info');
};
const viewAdvert = () => {
  ui.showAlert('Working on it', 'alert info');
};
const openCar = (evt, condition) => {
  let i;
  let tabcontent;
  let tablinks;
  unsoldCars.innerHTML = '';
  soldVehicles.innerHTML = '';
  allFlags.innerHTML = '';
  getAllCars();
  getAllFlags();
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
  getAllCars();
  getAllFlags();
};

onInit();
