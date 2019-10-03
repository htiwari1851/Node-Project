function replace(id,productpage) {
    my = productpage + "";
    // console.log(typeof output);
    // console.log("hi");
    my = my.replace(/{ProductName}/g, id.productName);
    my = my.replace(/{From}/g, id.from);
    my = my.replace(/{Quantity}/g, id.quantity);
    my = my.replace(/{Price}/g, id.price);
    my=my.replace(/{image}/g,id.image);
    my = my.replace(/{Nutrients}/g, id.nutrients);
    my = my.replace(/{Description}/g, id.description);
    //creating server object
    // console.log(my);
    if(id.organic){
// my =my.replace(/{organic}/g,id.organic);
    }
    else{
my = my.replace(/{not_organic}/g,"not-organic");
    }
    my = my.replace(/{id}/g,id.id);
    return my;
}
module.exports=replace;