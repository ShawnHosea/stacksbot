module.exports =  function userCard(coin) {

    return `
       <div>
           <div>
               <p>${coin.id}</p>
               <p>${coin.symbol} ${user.name}</p>
               <p>${coin.priceUsd} </p>
         </div>
       </div>
       `
   }