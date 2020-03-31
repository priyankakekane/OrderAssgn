var jsonData = {};
function onLoad() {
    fetch("https://raw.githubusercontent.com/priyankakekane/OrderAssgn/master/response.json")
        .then(response => response.json())
        .then((json) => {
            CreateTableFromJSON(json);
        });
    bdate.min = new Date().toISOString().split("T")[0];
    sdate.min = new Date().toISOString().split("T")[0];
} 

function setMinDate() {
        var a = document.getElementById("bdate").value;
        sdate.min = new Date(a).toISOString().split("T")[0];
}


function generateJSON(){

var data = {
    addressInfo: {
        billing_address:{},
        shipping_address:{}
    },
    orderInfo : {},
    productInfo    : []

};  

//GENERATE ADDRESS DATA

data.addressInfo.billing_address.firstName= document.getElementById('bfname').value;
data.addressInfo.billing_address.lastName= document.getElementById('blname').value;
data.addressInfo.billing_address.addressLine1= document.getElementById('baddr1').value;
data.addressInfo.billing_address.addressLine2= document.getElementById('baddr2').value;
data.addressInfo.billing_address.city= document.getElementById('bcity').value;
data.addressInfo.billing_address.country= document.getElementById('bstate').value;
data.addressInfo.billing_address.zipcode= document.getElementById('bzipcode').value;
data.addressInfo.billing_address.state= document.getElementById('bcountry').value;

data.addressInfo.shipping_address.firstName= document.getElementById('sfname').value;
data.addressInfo.shipping_address.lastName= document.getElementById('slname').value;
data.addressInfo.shipping_address.addressLine1= document.getElementById('saddr1').value;
data.addressInfo.shipping_address.addressLine2= document.getElementById('saddr2').value;
data.addressInfo.shipping_address.city= document.getElementById('scity').value;
data.addressInfo.shipping_address.country= document.getElementById('sstate').value;
data.addressInfo.shipping_address.zipcode= document.getElementById('szipcode').value;
data.addressInfo.shipping_address.state= document.getElementById('scountry').value;


//GENERATE ORDER DATA

data.orderInfo.orderDate=document.getElementById('bdate').value;
data.orderInfo.deliveryDate=document.getElementById('sdate').value;

//GENERATE PRODUCT DATA

        var myTable = document.getElementById("myTable");
        var currentIndex = myTable.rows.length-1; 
        console.log(currentIndex);

    //console.log(myTable.rows[1].cells[0].getElementsByTagName("input")[0].value);
    for(var i=1;i<=currentIndex;i++){
    //console.log(JSON.stringify(data));
    
    data.productInfo.push({
    productId :myTable.rows[i].cells[0].getElementsByTagName("input")[0].value,
    productName:myTable.rows[i].cells[1].getElementsByTagName("input")[0].value,
    unitPrice:myTable.rows[i].cells[2].getElementsByTagName("input")[0].value,
    productCount:myTable.rows[i].cells[3].getElementsByTagName("input")[0].value,
    totalPrice:myTable.rows[i].cells[4].getElementsByTagName("input")[0].value,
    notes:myTable.rows[i].cells[5].getElementsByTagName("textarea")[0].value,
});

    
    

    }       


console.log(JSON.stringify(data));

}


function addField(argument) {
        var myTable = document.getElementById("myTable");
        var currentIndex = myTable.rows.length;
        var currentRow = myTable.insertRow(-1);

        var productIdBlock = document.createElement("input");
        productIdBlock.setAttribute("name", "productId" + currentIndex);
        productIdBlock.setAttribute("type", "number");
        productIdBlock.setAttribute("id", "productId" + currentIndex);
        productIdBlock.setAttribute("required", "required");
        

        var productNameBlock = document.createElement("input");
        productNameBlock.setAttribute("name", "productName" + currentIndex);
        productNameBlock.setAttribute("type", "text");
        productNameBlock.setAttribute("id", "productName" + currentIndex);
        productNameBlock.setAttribute("required", "required");

        var productQty = document.createElement("input");
        productQty.setAttribute("name", "productQty" + currentIndex);
        productQty.setAttribute("type", "number");
        productQty.setAttribute("value", 0);
        productQty.setAttribute("id", 'countApple'+currentIndex);
        productQty.setAttribute("required", "required");
    

        var productUnitPrice = document.createElement("input");
        productUnitPrice.setAttribute("name", "productUnitPrice" + currentIndex);
        productUnitPrice.setAttribute("type", "number");
        productUnitPrice.setAttribute("value", 0);
        productUnitPrice.setAttribute("id", 'Apple'+currentIndex);
        productUnitPrice.setAttribute("required", "required");
        

        var productTotalPrice = document.createElement("input");
        productTotalPrice.setAttribute("name", "productTotalPrice" + currentIndex);
        productTotalPrice.setAttribute("readonly", true);
        productTotalPrice.setAttribute("id", 'totalPrice'+currentIndex);
        productTotalPrice.setAttribute("value", 0000);
        productTotalPrice.setAttribute("class", "totalPrice");


        var productNotes = document.createElement("textarea");
        productNotes.setAttribute("name", "productNote" + currentIndex);
        
        var deleteProducBox = document.createElement("input");
        deleteProducBox.setAttribute("type", "button");
        deleteProducBox.setAttribute("value", "DELETE");
        deleteProducBox.setAttribute("onclick", "deleteProduct(this);");
        deleteProducBox.setAttribute("class", "button delBtn");

        var currentCell = currentRow.insertCell(-1);
        currentCell.appendChild(productIdBlock);

        currentCell = currentRow.insertCell(-1);
        currentCell.appendChild(productNameBlock);

        

        currentCell = currentRow.insertCell(-1);
        currentCell.appendChild(productUnitPrice);

            currentCell = currentRow.insertCell(-1);
        currentCell.appendChild(productQty);

        currentCell = currentRow.insertCell(-1);
        currentCell.appendChild(productTotalPrice);

        currentCell = currentRow.insertCell(-1);
        currentCell.appendChild(productNotes);

        currentCell = currentRow.insertCell(-1);
        currentCell.appendChild(deleteProducBox);

    
        
        productQty.setAttribute("onchange", "calculatePrice(this.value,document.getElementById('"+"Apple"+currentIndex+"').value,totalPrice"+currentIndex+")");            
        productUnitPrice.setAttribute("onchange", "calculatePrice(this.value,document.getElementById('"+"countApple"+currentIndex+"').value,totalPrice"+currentIndex + ")");
}

function deleteProduct(o) {
        var p = o.parentNode.parentNode;
        p.parentNode.removeChild(p);
}    



function CreateTableFromJSON(json) {
    var billDetails;
    var shippingDetails;
    var productDetails;

    billDetails = json.addressInfo.billing_address;
    productDetails = json.productInfo;
    shippingDetails = json.addressInfo.shipping_address;
    populateBillingAddress(billDetails);
    populateShippingAddress(shippingDetails);
    
    document.getElementById('myTable').innerHTML = populateProductTable(productDetails, 'table');

}


function populateBillingAddress(billObject) {
    
    document.getElementById("bfname").value = billObject.firstName;
    document.getElementById("blname").value = billObject.lastName;
    document.getElementById("baddr1").value = billObject.addressLine1;
    document.getElementById("baddr2").value = billObject.addressLine2;
    document.getElementById("bcity").value = billObject.city;
    document.getElementById("bstate").value = billObject.state;
    document.getElementById("bzipcode").value = billObject.zipcode;
    document.getElementById("bcountry").value = billObject.country;
}

function populateShippingAddress(billObject) {
        
        document.getElementById("sfname").value = billObject.firstName;
        document.getElementById("slname").value = billObject.lastName;
        document.getElementById("saddr1").value = billObject.addressLine1;
        document.getElementById("saddr2").value = billObject.addressLine2;
        document.getElementById("scity").value = billObject.city;
        document.getElementById("sstate").value = billObject.state;
        document.getElementById("szipcode").value = billObject.zipcode;
        document.getElementById("scountry").value = billObject.country;
}
        

function populateProductTable(products, classes) {
    var cols = Object.keys(products[0]);
    var headerRow = '';
    var bodyRows = '';
    classes = classes || '';

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    cols.map(function (col) {
        headerRow += '<th>' + capitalizeFirstLetter(col) + '</th>';
    });
    
    

        products.map(function (row) {
        bodyRows += '<tr id='+row.productId+'>';
        cols.map(function (colName) {
            switch (colName) {
                case "productId":
                    bodyRows += '<td>' + '<input required type="number" value=' + row[colName] + " id=productId" + row.productId + ">" + '</td>';
                    break;
                case "unitPrice":
                    bodyRows += '<td>' + '<input required type="number" value=' + row[colName] + " id="+row.productName+row.productId +" onchange=calculatePrice(this.value,document.getElementById('"+"count"+row.productName + row.productId+"').value,totalPrice"+row.productId+")>" + '</td>';
                    break;
                case "totalPrice":
                    bodyRows += '<td>' + '<input class="totalPrice" type="number" readonly value=' + row[colName] + " id='totalPrice"+row.productId+"'>" + '</td>';
                    break;
                case "productCount":
                    bodyRows += '<td>' + '<input required type="number" value=' + row[colName]+ " id="+"count"+row.productName + row.productId+" onchange=calculatePrice(this.value,document.getElementById('"+row.productName+row.productId +"').value,totalPrice" + row.productId + ")>" + '</td>';
                    break;   
                case "notes":
                    bodyRows += '<td>' + '<textarea value=' + row[colName] + "></textarea>" + '</td>';
                    break;
                case "productName":
                    bodyRows += '<td>' + '<input required type="text" value=' + row[colName] + " id=productName" + row.productId + ">" + '</td>';
                    break;
                default:
                    break;
            }
        })

        bodyRows +='<td>'+'<button class="button delBtn" onclick = "deleteProduct(this)">'+"DELETE" +'</button></td >';

        bodyRows += '</tr>';
    });


    return '<table class="' +
        classes +
        '"><thead><tr>' +
        headerRow +
        '</tr></thead><tbody>' +
        bodyRows +
        '</tbody></table>';
}

function calculatePrice(val, val1, id) {
        var totalPrice = val*val1;
        document.getElementById(id.id).value = totalPrice;
}


function submitProducts() {
    document.getElementById("successMsg").innerHTML = ""
    var flag = true;
    var requiredElements = document.getElementById("myTable").querySelectorAll("[required]");
    var billdate = document.getElementById("bdate").value;
    var shipdate = document.getElementById("sdate").value;
    

    if(billdate == "" || shipdate == ""){
        document.getElementById("dateMsg").innerHTML = "Please Enter Date To Proceed Further !!!";
        document.getElementById("dateMsg").classList.add("errorClass");
        flag = false;
    }
    else {
        document.getElementById("dateMsg").innerHTML = "";
        document.getElementById("dateMsg").classList.remove("errorClass");
    }
    

    
    var myTable = document.getElementById("myTable");
    var currentIndex = myTable.rows.length - 1;
    var productIdArray = [];
    for (var i = 1; i <= currentIndex; i++) {
        if(productIdArray.includes(myTable.rows[i].cells[0].getElementsByTagName("input")[0].value)){
            document.getElementById("uniqueId").innerHTML = "Please Enter Unique Product Id";
            document.getElementById("uniqueId").classList.add("errorClass");
            flag = false;
            
        }
        else {
            productIdArray.push(myTable.rows[i].cells[0].getElementsByTagName("input")[0].value);
            document.getElementById("uniqueId").classList.remove("errorClass");
            document.getElementById("uniqueId").innerHTML = "";
        }
    }
    

    for (var i = 0; i < requiredElements.length; i++) {
        var e = requiredElements[i];            
        if (e.value == "") {
            flag = false;
            document.getElementById(requiredElements[i].id).classList.add("errorClass");
        }
        else {
            document.getElementById(requiredElements[i].id).classList.remove("errorClass");
        }

    }

    

    if (flag) {
        console.log("json submitted");
        generateJSON();
        document.getElementById("successMsg").innerHTML = "JSON Submitted Successfully :)"
        
    }
    else {
        console.log("not submitted");
    }

}
