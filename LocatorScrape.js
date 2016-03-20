var casper = require('casper').create({
    verbose: true,
    logLevel: 'warning'
});
var fs = require('fs');


casper.start('http://casperjs.org/', function() {
    this.echo(this.getTitle());
    casper.options.waitTimeout = 40000;
	
	
	
	
    //this.capture('output/realestate.jpg'); 
}); 

var sqlStatements = ''; 
//var storeIds = ['14201','14204','14207','14210','14213','14216','14219','14222','14225','14228','14240','14261','14265','14269','14272','14280']; 
var storeIds = ['357336','348067'] ;
//var storeIds = ['348067'] ;
for (var i = 0 ; i < storeIds.length; i++)  {
console.log(storeIds[i]); 

	(function (storeId)  { 
		casper.thenOpen('http://locator.wizards.com/#brand=magic&a=location&p=14207&massmarket=no&loc='+ storeIds[i] + '&orgid=7109&addrid=' + storeIds[i], function() { 
		//casper.thenOpen('http://locator.wizards.com/#brand=magic&a=location&p=14207&massmarket=no&loc=357336&orgid=7109&addrid=357336', function() { 
		
			
		   casper.waitForSelector('.event-table', function() {
			
			casper.wait(10000, function() {
		
				 fs.write('output/' + storeId + ".html", this.getPageContent(), 'w');
					console.log('Finished Store Id: ' + storeId);

		 /* var agents = this.evaluate(function (storeId)  {  
		
			 return Array.prototype.map.call(document.getElementsByTagName('dl'), function(node) {
				console.log(node);
				return {
					 name: node.getElementsByClassName('date').innerHTML,
					//phone: node.getElementsByClassName('ldb-phone-number')[0].innerHTML,
					//zip:storeId,
					city: 'Buffalo',
					source:'Zillow'
				}
			});	 
			
			return "test"; 
		}, storeId  );  */
		
		
		  //fs.write('output/' + storeId + ".html", this.getPageContent(), 'w');
	     // fs.write('output/' + storeId + ".json", JSON.stringify(agents), 'w');
				});  //wait
			}); // wait for selector
	} ); 
	
  }) (storeIds[i]); 

}

console.log('end test');
casper.run();