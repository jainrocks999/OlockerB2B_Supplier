const getDate = function (date) {
    console.log('date.......113',date);
    function pad(s) {
        return s < 10 ? "0" + s : s;
    }
    
    return [
        date.getFullYear(),
        pad(date.getMonth() + 1),
        pad(date.getDate()),
    ].join("-");
};
export default getDate;
// console.log('dateee',);





// const getParsedDate=(date2)=>{
//     var strSplitDate = String(date2).split(' ');
//     var date = new Date(strSplitDate);
//    console.log('string formate ....',date);
//     var dd = date.getDate();
//     var mm = date.getMonth() + 1; //January is 0!

//     var yyyy = date.getFullYear();
//     if (dd < 10) {
//         dd = '0' + dd;
//     }
//     if (mm < 10) {
//         mm = '0' + mm;
//     }
//     date =  dd + "-" + mm + "-" + yyyy;
//     return  setDate(date);
// }