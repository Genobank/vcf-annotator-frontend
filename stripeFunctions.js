async function creatStripePurchaseIntent(selected_package) {
    const url = new URL(`${window.VCF_APP_API}/create_annotation_service_payment_intent`)
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_sign: getUserToken(),
        package_string: selected_package
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
    console.log("\n\n PaymentIntent:", paymentIntent);
    switch (paymentIntent.status) {
      case "succeeded":
        showMessage("Payment succeeded!, please check your email address");
        $("#paymentModal").modal("hide");
        startAnalysisViewProcess();
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