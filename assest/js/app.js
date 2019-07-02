/* eslint-disable no-tabs */
const $ = selector => document.querySelector(selector);
const mainNav = $('#js-menu');
const navBarToggle = $('#js-navbar-toggle');

navBarToggle.addEventListener('click', () => {
  mainNav.classList.toggle('active-nav');
});

// instantiate Epichttp library
// eslint-disable-next-line no-undef
const http = new HTTP();
// eslint-disable-next-line no-undef
const ui = new UI();

const baseUrl = 'https://test-automart.herokuapp.com/api/v2/';
const homeCars = $('#homeCars');
const screen = $('#main-section');

const getAllUnsoldCars = async () => {
  try {
    const res = await http.get(`${baseUrl}car/unsold?status=available`);
    if (res.status === 200) {
      let status;
      res.data.forEach((item) => {
        if (item.status === 'available') {
          status = `<div>
          <i class="fab fa-opencart"></i>
          <small class="mr-2">Available</small>
        </div>`;
        } else {
          status = `<div>
          <i class="fas fa-times-circle text-red"></i>
          <small class="mr-2">Sold</small>
        </div>`;
        }
        homeCars.innerHTML += `
        <div class="col-12 col-md-6 col-lg-4 my-2">
					<div class="wrapper">
						<div class="container">
										<div class="top">
											<img
												src=${item.image_url}
												alt=""
												width="100%"
												height="100%"
											/>
										</div>
										<div class="bottom">
											<div class="left">
												<div class="details">
													<h1>${item.manufacturer} ${item.model}</h1>
													<p class="monseratt"># ${item.price}</p>
												</div>
                        <div class="buy">
                        <i class="material-icons">shopping_cart</i>
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
													<small class="mr-2">${item.location}</small>
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
															<small class="mr-2">${item.transmission}</small>
														</div>
														<div class="col-6 p-1 ">
															<i class="fas fa-gas-pump"></i>
															<small class="mr-2">${item.fuel_type}</small>
														</div>
														<div class="col-6 p-1">
															<i class="fas fa-car"></i>
															<small class="mr-2">${item.body_type}</small>
														</div>
														<div class="col-6 p-1">
															<i class="fas fa-calendar-alt"></i>
															<small class="mr-2">${item.year}</small>
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
														${item.description}
													</p>
												</div>
											</div>
											<div class="d-flex justify-content-end">
										<a href="#" class="btn-more" onclick="getSingleCar(${item.carid})">
												View more
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
        `;
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const clearScreen = () => {
  screen.innerHTML = '';
};
const getSingleCar = async (id) => {
  clearScreen();
  try {
    const { status, data } = await http.get(`${baseUrl}car/${id}`);
    console.log('single value car', data);
    if (status === 200) {
      screen.innerHTML = `
      <div class="d-flex">
							<div class="w-75 mx-auto">
								<div class="container-fluid">
									<div class="row">
										<div class="card bg-light-grey">
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
																	width="400px"
																	height="400px"
																/>
															</div>
															<div class="slider__contents">
																<img
																	class="responsive-image"
																	src="./assest/images/images11.jpg"
																	alt=""
																	width="100%"
																	height="100%"
																/>
															</div>
															<div class="slider__contents">
																<img
																	class="responsive-image"
																	src="./assest/images/images2.jpg"
																	alt=""
																	width="100%"
																	height="100%"
																/>
															</div>
															<div class="slider__contents">
																<img
																	class="responsive-image "
																	src="./assest/images/images5.jpg"
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
														<div class="d-flex justify-content-between">
															<p class="body-type my-0">
																<span class="text-abstract-orange">${data.body_type}</span>
															</p>
															<div class="">
																<img
																	class="responsive-img"
																	src="./assest/images/svg/placeholder.svg"
																	alt=""
																	width="20px"
																	height="20px"
																/>
																<small class="text-deep-purple">${data.location}</small>
															</div>
															<p class="year my-0">
																<span class="text-abstract-orange">${data.year}</span>
															</p>
														</div>

														<h5
															class="text-dark-grey font-weight-bold montserrat my-1"
														>
															&#8358; ${data.price}
														</h5>

														<p class="font-weight-normal paragraph">
															${data.description}
														</p>

														<div class="d-flex justify-content-between my-2">
															<a
																href="./signIn.html"
																class="btn btn-purple clickable"
															>
																Buy Now
															</a>
															<a
																href="./index.html"
																class="btn btn-purple-reverse"
															>
																Back
															</a>
														</div>
														<div class="d-flex justify-content-end">
                              <a onclick = "reportFradulent(${data.carid},
                                '${data.model}', '${data.manufacturer}')"
                              class="text-red clickable">
																<small class="text-red">Fradulent?</small>
																<img
																	src="./assest/images/svg/warning.svg"
																	alt=""
																	width="30px"
																	height="30px"
																	class="align-image"
																/>
															</a>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
      `;
    }
  } catch (error) {
    console.log(error);
  }
};
const reportFradulent = (id, model, manufacturer) => {
  clearScreen();
  screen.innerHTML = `<div class="row">
  <div class="col-12 col-md-8 col-lg-7 mx-auto">
    <div class="card bg-light-grey">
      <div class="bg-soft-purple  p-1 card-header">
        <div class="d-flex justify-content-center">
          <h5 class="">
            REPORT ADVERT
          </h5>
        </div>
        <small
          class="d-flex justify-content-end text-grey-one montserrat">
          <span class="">${manufacturer} ${model}</span>
        </small>
      </div>
      <div class="container parent">
				<div class="in-between"></div>
			</div>
      <div class=" p-5">
        <div class="name my-1">
          <small class="text-abstract-orange">Name</small>
          <input id="name" type="text" class="w-100" required/>
        </div>
        <div class="email my-1">
          <small class="text-abstract-orange">Email</small>
          <input id = "email" type="email" class="w-100" required/>
        </div>
        <div class="phone my-1">
          <small class="text-abstract-orange">Phone</small>
          <input id="phone" type="tel" class="w-100" />
        </div>
        <div class="reasons my-1">
          <small class="text-abstract-orange">Reasons</small>
          <div class="search_categories">
            <div class="select">
              <select id="report-select" class="select-css" required>
                <option disabled selected
                  >Select Reasons</option
                >
                <option value = "others">Others</option>
                <option value = "location issues">Location Issues</option>
                <option value = "price variaton">Price Variation</option>
                <option value = "stolen vehicle">Stolen Vehicle</option>
                <option value = "fradulent">Fradulent</option>
                <option value = "misleading">Misleading</option>
                <option value = "offensive">Offensive</option>
              </select>
            </div>
          </div>
        </div>
        <div class=" my-1">
          <div class="w-100 mr-2">
            <small class="text-abstract-orange"
              >Comment</small
            >
            <textarea id="description" type="text" class="w-100" required></textarea>
          </div>
        </div>
        <div class="d-flex justify-content-between my-3">
          <a
            onclick = "backHome()"
            class="btn btn-purple-reverse"
          >
            Cancel
          </a>
          <a class="btn btn-danger-reverse"
          onclick = "postReport(${id})">
            Report
          </a>
        </div>
      </div>
    </div>
  </div>
</div>`;
};
const postReport = async (id) => {
  const name = $('#name').value;
  const email = $('#email').value;
  const phone = $('#phone').value;
  const description = $('#description').value;
  const e = $('#report-select');
  const reason = e.options[e.selectedIndex].value;
  const reportToPost = {
    phone,
    reason,
    description,
    name,
    email,
    carId: id,
  };
  if (reason === '' || name === '' || email === '' || description === '') {
    ui.showAlert('Please fill in all fields', 'alert danger');
  } else {
    try {
      const url = `${baseUrl}flag`;
      const res = await http.post(url, reportToPost);
      console.log(res);
      if (res.status === 201) {
        ui.showAlert(res.message, 'alert success');
      } else if (res.status === 400) {
        ui.showAlert(res.message, 'alert danger');
      } else if (res.status === 'error') {
        ui.showAlert(res.error.message, 'alert danger');
      }
    } catch (error) {
      console.log(error);
    }
  }
};
const backHome = () => {
  window.location.reload();
};
getAllUnsoldCars();
