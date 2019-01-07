// cites
function City(name, index, canvasX, canvasY, distances){
    this.name = name;
    this.index = index;
    this.canvasX = canvasX;
    this.canvasY = canvasY;
    this.distances = distances;

    this.getName = function(){
        return name;
    }

    this.getIndex = function(){
        return index;
    }
    this.getX = function(){
        return this.canvasX;
    }
    this.getY = function(){
        return this.canvasY;
    }
    this.getDistances = function(){
        return this.distances;
    }
    this.getDistanceTo = function(cityIndex){
        return this.distances[cityIndex];
    }

}

function TourManager(){
    var destination = new Array();

    this.addCity = function(city){
        destination.push(city);
    }
    this.getCity = function(cityIndex){
        return destination[cityIndex];  
    }
    this.numberOfCities = function(){
        return destination.length;
    }
}

function Tour(tour){ 
    var distance = 0;
    var fitness = 0;
    this.tour = tour;

    this.getTour = function(){
        return this.tour;
    }

    this.setCity = function(index, city){
        this.tour[index] = city; 
        // If the tours been altered we need to reset the fitness and distance
        fitness = 0;
        distance = 0;
    }

    this.generateInitialTour = function(tourManager){ 
        for (var i = 0; i < amount; i++) {
            
            this.tour[i] = tourManager.getCity(i); 
        } 
        this.tour = shuffle(tour);  
            
    }
 
    this.getCity = function(index){
        return this.tour[index]; 
    }

    this.getTotalDistance = function(){ 
        if(distance == 0){
            var tourDistance = 0;
            for (var i = 0; i < this.tour.length; i++) {
                var startCity = this.tour[i];
                var endCity;
                if ( (i + 1) < this.tour.length){
                    endCity = this.tour[i + 1];
                }
                else{
                    endCity = this.tour[0];
                }
                           
                tourDistance += startCity.getDistanceTo(endCity.getIndex());
            }
            distance = tourDistance;
        }
        return distance;
    }

    this.tourSize = function(){
        return this.tour.length;
    }

    this.toString = function(){
        var geneString = " ";

        for (var i = 0; i < this.tour.length; i++) {
            geneString += this.tour[i].getName() +" --> ";    
        }
        geneString += this.tour[0].getName() +" ";
        return geneString;
    }

    // GA 
    this.getFitness = function(){
    	if(fitness == 0){
    		fitness = 1 / this.getTotalDistance();
    	}
    	return fitness;
    }

    this.containsCity = function(city){
    	return this.tour.includes(city); 
    } 


}

function initialiseTour(amount){
	var tour = new Array(amount); 
    for (var i = 0; i < amount; i++) {
        tour[i] = null;        
    }
    return tour;
}

function getDistanceTo(a,b,dist){
    distances[b][a] = dist;

}

// randomly reorganizes the table
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element. 

       
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;}


  return array;
}