var stripe = require('stripe')('sk_test_51H9gRDLL931ZhLgotFaZVQVGtASx9EnmnuewwmEbbQMWX06TtDUh9NvppsNyAqqTvqSd1PSwJVf9XHesch0dEHqX00yieCGGVl');

function active(){
(async()=>{


    const customerss = await stripe.customers.create(
        {
          description: 'My First Test Customer (created for API docs)',
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
console.log('paymentMethod', paymentMethod);

const pma = await stripe.paymentMethods.attach(
    paymentMethod.id,
   {customer: customerss.id},
);
console.log('pma: ', pma);

    const paymentIntent = await stripe.paymentIntents.create(
        {
          amount: 2000,
          currency: 'usd',
          payment_method_types: ['card'],
          customer: customerss.id,
          payment_method: paymentMethod.id
        }
      );
    console.log('PaymentIntent: ',paymentIntent);

  //   const paymentIntentConfirmed = await stripe.paymentIntents.confirm(
  //       'pi_1H9jIGLL931ZhLgomoCrjNpY',
  //       {payment_method: 'pm_1H9i5GLL931ZhLgoJOfBnQ1S'},
  // );
  // console.log('paymentIntentConfirmed: ', paymentIntentConfirmed);
})();

}

module.exports =  {
  "active": active
}