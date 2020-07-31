var stripe = require('stripe')('sk_test_51HA167KRJlA5IRDw9nRzbxW6Omac4spkZm88kl9VbgMTdrgrq6NfAAjcSdXwePeZvtzzpSO0Wdn9URidDLFKHd4B00QJIiNl8x');
var xx ;

async function active(xxx){
  const customerss = await stripe.customers.create(
    {
      description: xxx,
    }
  );
    console.log('Customers:',customerss.id);
        
  const paymentMethod = await stripe.paymentMethods.create(
    {
      type: 'card',
        card: {
          number: '4242424242424242',
          exp_month: 7,
          exp_year: 2021,
          cvc: '314',
        },
    },
  );
    console.log('paymentMethod', paymentMethod.id);

  const pma = await stripe.paymentMethods.attach(
    paymentMethod.id,
    {customer: customerss.id},
  );
  console.log('pma: ', pma.id);

  const paymentIntent = await stripe.paymentIntents.create(
    {
    amount: 2000,
    currency: 'usd',
    payment_method_types: ['card'],
    customer: customerss.id,
    payment_method: paymentMethod.id
    }
  );
  console.log('PaymentIntent: ',paymentIntent.id);
    
  return (paymentIntent.id);
};

async function accept(xx){

  (async()=>{
    const paymentIntentConfirmed = await stripe.paymentIntents.confirm(
        xx,
        {payment_method: 'pm_card_visa'},
  );
  console.log('paymentIntentConfirmed: ', paymentIntentConfirmed);
})();
}

module.exports =  {
  "active": active,
  "accept": accept
}