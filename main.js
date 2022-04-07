//TOTAL PRICE
const totalPriceContainer = document.getElementById("totalPrice");
let totalPrice = 0;

// SEND INVOICE / RESET
const sendInvoiceButton = document.getElementById("sendInvoice");

//SERVICES
const serviceVeterinary = document.getElementById("serviceVet");
const servicePetsitting = document.getElementById("servicePetSitting");
const serviceGroom = document.getElementById("serviceGroom");
const serviceNeuter = document.getElementById("serviceNeuter");
const serviceVaccine = document.getElementById("serviceVaccine");
const serviceTrain = document.getElementById("serviceTraining");
const servicesContainer = document.getElementById("addServices");

const allServiceButtons = [
	serviceVeterinary,
	servicePetsitting,
	serviceGroom,
	serviceNeuter,
	serviceVaccine,
	serviceTrain
];

let currentServices = [];

let services = [
	{ id: 0, service: "Veterinary", price: 50 },
	{ id: 1, service: "Petsitting", price: 30 },
	{ id: 2, service: "Groom", price: 15 },
	{ id: 3, service: "Vaccination", price: 35 },
	{ id: 4, service: "Training", price: 40 },
	{ id: 5, service: "Neutering", price: 75 }
];

//FUNCTIONS
function addToInvoice(serviceButton, arr) {
	serviceButton.addEventListener("click", function () {
		let badgeId = `${arr.service}_remove`;
		serviceButton.disabled = true;
		currentServices.push([arr.service, arr.price, arr.id]);
		renderService(arr.service, arr.price, arr.id, badgeId, serviceButton);
	});
}

function renderService(service, price, id, badgeId, serviceButton) {
	let serviceContainer = document.createElement("div");
	serviceContainer.classList.add("invoiceItems");
	serviceContainer.classList.add("border");
	serviceContainer.id = `${service}_container`;
	servicesContainer.appendChild(serviceContainer);
	const invoicePreviewItem = `
                <p>
                    ${service}
                    <a class="removebadge" id="${badgeId}"><i class="ph-x-bold"></i>remove</a>
                </p>
                <span class="price">
                    ${price}
                </span>`;
	serviceContainer.innerHTML = invoicePreviewItem;
	totalPrice += price;
	totalPriceContainer.textContent = totalPrice;

	let removeButton = document.getElementById(`${badgeId}`);
	removeButton.addEventListener("click", function () {
		let index = currentServices.findIndex((index) => index[2] === id);
		console.log(index);
		currentServices.splice(index, 1);
		console.log(currentServices);
		resetButtons(serviceButton);
		removeButton.parentElement.parentElement.remove();
		totalPrice -= price;
		totalPriceContainer.textContent = totalPrice;
	});
}

function resetButtons(buttons) {
	if (buttons.disabled === true) {
		buttons.disabled = false;
	}
}

// RESET/SEND EVENT LISTENER
sendInvoiceButton.addEventListener("click", function () {
	if (servicesContainer.innerHTML != null) {
		servicesContainer.innerHTML = "";
		totalPrice = 0;
		totalPriceContainer.textContent = totalPrice;
		for (let i = 0; i < allServiceButtons.length; i++) {
			resetButtons(allServiceButtons[i]);
		}
	}
});

// Starting the Page
addToInvoice(serviceVeterinary, services[0]);
addToInvoice(servicePetsitting, services[1]);
addToInvoice(serviceGroom, services[2]);
addToInvoice(serviceVaccine, services[3]);
addToInvoice(serviceTrain, services[4]);
addToInvoice(serviceNeuter, services[5]);
