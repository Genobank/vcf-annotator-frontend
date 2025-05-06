const stripe = Stripe(window.STRIPE_API_KEY);

$(async () => {
    requireAuth()
    $("#navbar-container").html(navBar())
    // const ancestry = { "data":{"ancestry":{ "AFR_NORTE": "0.067303", "AFR_ESTE": "0.000010", "MIXTECA": "0.032698", "HUICHOL": "0.031567", "MEDIO_ORIENTE": "0.064763", "JUDIO": "0.125290", "ASIA_SURESTE": "0.000010", "TARAHUMARA": "0.019167", "NAHUA_OTOMI": "0.216372", "EUR_ESTE": "0.095392", "TRIQUI": "0.015397", "EUR_NORESTE": "0.017270", "AMAZONAS": "0.010932", "OCEANIA": "0.000010", "EUR_SUROESTE": "0.255656", "EUR_OESTE": "0.000010", "ANDES": "0.011933", "EUR_NORTE": "0.000010", "AFR_OESTE": "0.000010", "ASIA_SUR": "0.000010", "PIMA": "0.012179", "MAYA": "0.000010", "ASIA_ESTE": "0.000010", "ZAPOTECA": "0.023991" }} }
    // isPayed = true
    const registration = await getRegisteredUser(getUserToken());
    const ancestry = await getResults(getUserToken())
    const isPayed = registration.register.payed

    $("#ancestry-container").html(
        isEmpty(ancestry.data) ? (isPayed ? (ancestry?.logs == undefined ?  waiting_for_ancestry_card() : replace_current_file_component(registration)) : buy_ancestry_card()) : ancestry_result(ancestry.data)
    );
    $("#footer-container").html(footer())
})


async function getPaymentModal (){
	let products = [
        {
            currency: "USD",
            description: "Whole Genome Sequencing One Month PLUS Genome Plan",
            id: "0",
            name: "Ancestry Service",
            price: "19.95",
            quantity: 1,
        }
    ]
	$("#cardPurchaseModal").modal("show");
	await creatStripePurchaseIntent(products)
}

// elements of the payment modal
async function creatStripePurchaseIntent(products){
	const items = products;
	const url  =  new URL(`${window.VCF_APP_API}/create_ancestry_payment_intent`)
    let savedProducts = [
        {
            currency: "USD",
            description: "Whole Genome Sequencing One Month PLUS Genome Plan",
            id: "0",
            name: "Ancestry Service",
            price: "19.95",
            quantity: 1,
        }
    ]
	let savedProductsQuantity = 1;
	// const address = getUserWallet()
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        items: items,
        product_count: savedProductsQuantity.toString(),
        user_sign: getUserToken()
        // user_address: address
      }),
  });

  const { clientSecret } = await response.json();
  const appearance = {
    theme: 'stripe',
  };
  elements = stripe.elements({ appearance, clientSecret });
  const paymentElementOptions = {
    layout: "tabs",
  };

  const paymentElement = elements.create("payment", paymentElementOptions);
  paymentElement.mount("#payment-element");

	document
  .querySelector("#payment-form")
  .addEventListener("submit", handleSubmit);
}


async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  try {
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
				// Esto asegura que solo redirija si es necesario y regresa al usuario a la misma página
				return_url: window.location.href,
				payment_method_data: {
					billing_details: {
						address: {
							line1: getUserToken()
						}
					}
				}
			},
      redirect: 'if_required'
    });

    // Manejar errores inmediatos
    if (error) {
      showMessage(error.message);
    } else if (paymentIntent) {
      // El PaymentIntent se actualizó correctamente
      handlePaymentIntent(paymentIntent);
    } else {
      showMessage("An unexpected result occurred.");
    }
  } catch (err) {
    console.error("Payment failed", err);
    showMessage("Payment processing failed. Please try again.");
  } finally {
    setLoading(false);
  }
}



async function handlePaymentIntent(paymentIntent) {
  switch (paymentIntent.status) {
    case "succeeded":
      showMessage("Payment succeeded!, please check your email address");
      setTimeout(() => {
        window.location.reload(); // Recargar la página después de 5 segundos
      }, 5000);
      break;
    case "processing":
      showMessage("Your payment is processing. Please stand by...");
      break;
    case "requires_payment_method":
      showMessage("Your payment was not successful. Please try again.");
      break;
    default:
      showMessage("Something went wrong with your payment.");
      break;
  }
  setLoading(false);
}

// ------- UI helpers -------

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageContainer.textContent = "";
  }, 4000);
}

function setLoading(isLoading) {
  if (isLoading) {
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
}