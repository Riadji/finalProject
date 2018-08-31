function countingInvoice(num){


    if(Object.values(num)[0] != undefined){

        let price = 0

        for(let i = 1; i <= Object.values(num)[0].length; i++){
            price += 75000
            
        }

        return price
    }
   
}

module.exports = countingInvoice