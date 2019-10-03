var http=require("http");
var fs=require("fs");
var url=require("url");
var file=fs.readFileSync("data.json");
var output=JSON.parse(file);
var productpage=fs.readFileSync("product.html");
var overview=fs.readFileSync("overview_template.html");
var replace=require("./replace");
var cards=fs.readFileSync("card_template.html");

// console.log(typeof productpage);
// console.log(productpage+" ");
// function replace(id){
//  my=productpage+"";
// console.log(typeof output);
//     my = my.replace(/{ProductName}/g,output[id].productName);
//     my = my.replace(/{From}/g,output[id].from);
//     my = my.replace(/{Quantity}/g,output[id].quantity);
//     my = my.replace(/{Price}/g,output[id].price);
//     my = my.replace(/{Nutrients}/g,output[id].nutrients);
//     my = my.replace(/{Description}/g,output[id].description);
// //creating server object
//     return my;
// }
var server=http.createServer(function(req,res){
//Routing
console.log(req.url);
if(req.url=="/"||req.url=="Overview"){
    // res.write("Overview Page");
        res.writeHead(201,{"content-type":"text/html"});
        // res.write(overview);
        var allcards="";
        for(var i=0;i<output.length;i++){
            allcards+=replace(output[i],cards);
        }
        // console.log(allcards);
        overview+="";
       overview= overview.replace(/{cards}/g,allcards);
    //    console.log(overview);
res.write(overview);
}else if(req.url=="/api"){
    res.write("Response from Node module");
}else if(req.url=="/Product"){
    var parsedUrl = url.parse(req.url, true).query.id;
    console.log(parsedUrl);
    res.writeHead(201, { "content-type": "text/html" });
    var ret = replace(output[parsedUrl], productpage);
    res.write(ret);

    // res.write("Product Page");
}else{
    console.log(req.url.query+"**");
    //res.write("Error 404:Page not found");
    var parsedUrl = url.parse(req.url,true).query.id;
    console.log(parsedUrl);
    res.writeHead(201,{"content-type":"text/html"});
    var ret=replace(output[parsedUrl],productpage);
    res.write(ret);
}
res.end();
});
var port=process.env.PORT||3000;
server.listen(port,function(){
console.log("Server is listening at port no 3000");
});