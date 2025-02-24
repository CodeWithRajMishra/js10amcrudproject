async function editSave(id){

  let bookname= document.getElementById("bname").value ;
  let authname=document.getElementById("aname").value ;
  let pubyear=document.getElementById("pyear").value ;
  let bprice=document.getElementById("bprice").value ;

  let api=`http://localhost:3000/books/${id}`;

  fetch(api, {
    method: "PATCH",
    headers: {
        "Content-Type" : "application/json"
      },
    body: JSON.stringify(
      {
        bookname: bookname,
        authorname: authname,
        publishyear: pubyear,
        price: bprice
      }
    )
  })
  .then(json => {
    alert("Data updated!!!");
  });
}

async function editDisplay(myid)
{
  let api=`http://localhost:3000/books/${myid}`

  let Obj= await fetch(api);
  let Data=await Obj.json();
  
  myForm=`
          Edit Book Name: <input type="text" id="bname" value="${Data.bookname}">
          <br>
           Edit Author Name: <input type="text" id="aname" value="${Data.authorname}">
          <br>
           Edit Publish year: <input type="text" id="pyear" value="${Data.publishyear}">
          <br>
           Edit Book Price: <input type="text" id="bprice" value="${Data.price}">
          <br>
          <button onclick="editSave(${Data.id})"> Edit Save! </button>
  `
  document.getElementById("demo1").innerHTML=myForm;
}




async function dataDisplay()
{
 let Table=`<table width="90%" border="1" bgcolor="pink">
              <tr bgcolor="orange">
                <th> Book name </th>
                <th> Author Name </th>
                <th> Publish Year </th>
                <th> Price </th>
                <th></th>
               </tr> 
           `

  let api="http://localhost:3000/books";

  let myObj= await fetch(api);
  let myData= await myObj.json();

   myData.map((key)=>{
       Table+=` <tr>
                  <td> ${key.bookname} </td>
                  <td> ${key.authorname} </td>
                  <td> ${key.publishyear} </td>
                  <td> ${key.price} </td>
                   <td> 
                   
                   <a href="#" onclick="editDisplay(${key.id})">
                     <img src="images/edit.png" width="30" height="30" >
                   </a>
                   </td>
                </tr>  
            `

   })
 Table+="</table>"
 document.getElementById("demo").innerHTML=Table;

}

dataDisplay();