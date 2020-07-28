var stripe = require('stripe')('sk_test_51H9gRDLL931ZhLgotFaZVQVGtASx9EnmnuewwmEbbQMWX06TtDUh9NvppsNyAqqTvqSd1PSwJVf9XHesch0dEHqX00yieCGGVl');

// function crearPayM (){
// (async() => {
//     const paymentMethod = await stripe.paymentMethods.create(
//         {
//           type: 'card',
//           card: {
//             number: '4242424242424242',
//             exp_month: 7,
//             exp_year: 2021,
//             cvc: '314',
//           },
//         },
//       );
//     console.log('paymentMethod', paymentMethod);
// })();
// }
function crearPayM(){
  (async()=>{
    const paymentIntentConfirmed = await stripe.paymentIntents.confirm(
        paymentIntents.id,
        {payment_method: payment_method.id},
  );
  console.log('paymentIntentConfirmed: ', paymentIntentConfirmed);
})();
}
module.exports =  {
  "crearPayM": crearPayM
}