const stripe = require("stripe")(process.env.STRIPE_SECRET);
const express = require("express");
const app = express();

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =process.env.ENDPOINTSECRET;

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      // Sent when a new customer is created in your Stripe account
      case "customer.created":
        const customerCreated = event.data.object;
        console.log("Customer Created:", customerCreated);
        // Handle the customer.created event here
        break;

      // Sent when an existing customer's details are updated
      case "customer.updated":
        const customerUpdated = event.data.object;
        console.log("Customer Updated:", customerUpdated);
        // Handle the customer.updated event here
        break;

      // Sent when a customer is deleted
      case "customer.deleted":
        const customerDeleted = event.data.object;
        console.log("Customer Deleted:", customerDeleted);
        // Handle the customer.deleted event here
        break;

      // Sent when a new subscription is created
      case "subscription.created":
        const subscriptionCreated = event.data.object;
        console.log("Subscription Created:", subscriptionCreated);
        // Handle the subscription.created event here
        break;

      // Sent when an existing subscription is updated
      case "subscription.updated":
        const subscriptionUpdated = event.data.object;
        console.log("Subscription Updated:", subscriptionUpdated);
        // Handle the subscription.updated event here
        break;

      // Sent when a subscription is canceled or deleted
      case "subscription.deleted":
        const subscriptionDeleted = event.data.object;
        console.log("Subscription Deleted:", subscriptionDeleted);
        // Handle the subscription.deleted event here
        break;

      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        console.log(paymentIntentSucceeded);
        // Then define and call a function to handle the event payment_intent.succeeded
        break;

      case "payment_intent.failed":
        const paymentIntentFailed = event.data.object;
        console.log("Payment Intent Failed:", paymentIntentFailed);
        // Handle the payment_intent.failed event here
        break;

      // Triggered when a charge is successfully made
      case "charge.succeeded":
        const chargeSucceeded = event.data.object;
        console.log("Charge Succeeded:", chargeSucceeded);
        // Handle the charge.succeeded event here
        break;
      // Triggered when a charge attempt fails
      case "charge.failed":
        const chargeFailed = event.data.object;
        console.log("Charge Failed:", chargeFailed);
        break;

      // Sent when a new invoice is created
      case "invoice.created":
        const invoiceCreated = event.data.object;
        console.log("Invoice Created:", invoiceCreated);
        // Handle the invoice.created event here
        break;

      // Sent when an existing invoice is updated
      case "invoice.updated":
        const invoiceUpdated = event.data.object;
        console.log("Invoice Updated:", invoiceUpdated);
        // Handle the invoice.updated event here
        break;

      // Sent when an invoice payment is successfully made
      case "invoice.payment_succeeded":
        const invoicePaymentSucceeded = event.data.object;
        console.log("Invoice Payment Succeeded:", invoicePaymentSucceeded);
        // Handle the invoice.payment_succeeded event here
        break;

      // Sent when an invoice payment attempt fails
      case "invoice.payment_failed":
        const invoicePaymentFailed = event.data.object;
        console.log("Invoice Payment Failed:", invoicePaymentFailed);
        // Handle the invoice.payment_failed event here
        break;

      // Sent when a dispute is created
      case "dispute.created":
        const disputeCreated = event.data.object;
        console.log("Dispute Created:", disputeCreated);
        // Handle the dispute.created event here
        break;

      // Sent when the status of a dispute changes.
      case "dispute.updated":
        const disputeUpdated = event.data.object;
        console.log("Dispute Updated:", disputeUpdated);
        // Handle the dispute.updated event here
        break;

      // Sent when a payout is created and funds are sent to your bank account
      case "payout.created":
        const payoutCreated = event.data.object;
        console.log("Payout Created:", payoutCreated);
        // Handle the payout.created event here
        break;

      // Sent when a payout attempt fails
      case "payout.failed":
        const payoutFailed = event.data.object;
        console.log("Payout Failed:", payoutFailed);
        // Handle the payout.failed event here
        break;

      // Sent when your Stripe account balance changes
      case "balance.available":
        const balanceAvailable = event.data.object;
        console.log("Balance Available:", balanceAvailable);
        // Handle the balance.available event here
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

app.listen(4242, () => console.log("Running on port 4242"));
