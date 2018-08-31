function dateConverter(date){

    return `( ${date.getHours()} : ${date.getMinutes()}, ${date.getDate()}/${date.getMonth()}/${date.getDate()} )`

}

module.exports = dateConverter