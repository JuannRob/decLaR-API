 
 const postData = async () => {
    const response = await fetch('http://localhost:5000/api/decretos')
    return response.json();
  }

// const verDecretos = async () => {
//     try {
//         const res = await axios.get('http://localhost:5000/api/decretos');
//         return res.data;
//     } catch (err) {
//         console.error(err);
//     }
// }

console.log('====================================');
console.log('data:', postData());
console.log('====================================');

const loadTableData = (items) => {
    const table = document.getElementById("testBody").innerHTML;
    items.forEach((item) => {
        let row = table.insertRow();
        let date = row.insertCell(0);
        date.innerHTML = item.date;
        let name = row.insertCell(1);
        name.innerHTML = item.name;
    });
}

loadTableData(postData());



// const updateTable = (jsonData) => {

//     var tableHTML = "<tr>";
//     for (var headers in jsonData[0]) {
//       tableHTML += "<th>" + headers + "</th>";
//     }
//     tableHTML += "</tr>";
  
//     for (var eachItem in jsonData) {
//       tableHTML += "<tr>";
//       var dataObj = jsonData[eachItem];
//       for (var eachValue in dataObj){
//         tableHTML += "<td>" + dataObj[eachValue] + "</td>";
//       }
//       tableHTML += "</tr>";
//     }
  
//     document.getElementById(tableId).innerHTML = tableHTML;
//   }