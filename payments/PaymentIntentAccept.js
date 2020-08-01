var stripe = require('stripe')('sk_test_51HBDHNJRW1JL8d9KIaHQ2rSR9HQuUwCNvYaK9idu6Cd0rjL0eo8UJDqoMVHq9CMGI6GWxzeE6kqBeXCfHPK2QTCo00EcHgGMWU');

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