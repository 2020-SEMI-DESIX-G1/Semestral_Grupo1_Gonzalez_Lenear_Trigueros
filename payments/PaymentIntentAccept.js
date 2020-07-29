var stripe = require('stripe')('sk_test_51H9gRDLL931ZhLgotFaZVQVGtASx9EnmnuewwmEbbQMWX06TtDUh9NvppsNyAqqTvqSd1PSwJVf9XHesch0dEHqX00yieCGGVl');

function accept(){
  (async()=>{
    const paymentIntentConfirmed = await stripe.paymentIntents.confirm(
        paymentIntents.id,
        {payment_method: 'pm_card_visa'},
  );
  console.log('paymentIntentConfirmed: ', paymentIntentConfirmed);
})();
}
module.exports =  {
  "accept": accept
}