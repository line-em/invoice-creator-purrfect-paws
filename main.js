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

//TOTAL PRICE
const totalPriceContainer = document.getElementById("totalPrice");
let totalPrice = 0;

// SEND INVOICE / RESET
const sendInvoiceButton = document.getElementById("sendInvoice");

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

//FUNCTIONS

addToInvoice(serviceVeterinary, services[0]);
addToInvoice(servicePetsitting, services[1]);
addToInvoice(serviceGroom, services[2]);
addToInvoice(serviceVaccine, services[3]);
addToInvoice(serviceTrain, services[4]);
addToInvoice(serviceNeuter, services[5]);

function addToInvoice(serviceButton, arr) {
	serviceButton.addEventListener("click", function () {
		serviceButton.disabled = true;
		renderService(arr.service, arr.price, arr.id, serviceButton);
		currentServices.push([arr.service, arr.price, arr.id]);
	});
}

function renderService(service, price, id, serviceButton) {
	let invoicePreviewItem = `
            <div class="invoiceItems border">
                <p>
                    ${service}
                    <a class="removebadge" class="${id}" onClick="test(${id})"><i class="ph-x-bold"></i>remove</a>
                </p>
                <span class="price">
                    ${price}
                </span>
            </div>`;
	totalPrice += price;
	servicesContainer.innerHTML += invoicePreviewItem;
	totalPriceContainer.textContent = totalPrice;

	const removeButton = document.getElementsByClassName("removebadge");
}

function resetButtons(buttons) {
	if (buttons.disabled === true) {
		buttons.disabled = false;
	}
}
