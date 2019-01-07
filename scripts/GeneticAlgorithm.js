function Population(populationSize, initialise){
	this.populationSize = populationSize;
	this.initialise = initialise;
	var tours = new Array(populationSize);

    for (var i = 0; i < this.populationSize; i++) { 
        tours[i] = 0;        
    }
   

	this.constructPopulation = function(tourManager){ 
		if(this.initialise){
			
			for (var i = 0; i < this.populationSize(); i++) { 
				var newTour = new Tour( initialiseTour(amount) );
				newTour.generateInitialTour(tourManager);
				this.saveTour(i, newTour);
			}
			
		}

	}

	this.saveTour = function(index, tour){
		tours[index] = tour;
	}
	//get tour from population
	this.getTour = function(index){
		return tours[index];
	}

	// Gets the best tour in the population
	this.getFittest = function(){
		var fittest = tours[0];
		//loop to find the best
		for (var i = 1; i < this.populationSize(); i++) {
			if (fittest.getFitness() <= this.getTour(i).getFitness()) {
				fittest = this.getTour(i);
			}
		}
		
		return fittest;
	}

	this.populationSize = function(){
		return tours.length;
	}

}


function GA(mutationRate, tournamentSize){
	//parameters
	this.mutationRate = mutationRate;
	this.tournamentSize = tournamentSize;
	var elitism = true;
// Evolves a population over one generation
	this.evolvePopulation = function(population){
		var newPopulation = new Population(population.populationSize(), false);
		// Keep our best individual if elitism is enabled
		var elitismOffset = 0;
		if(elitism){
			
			newPopulation.saveTour(0, population.getFittest());
			elitismOffset = 1;
		}
		// Crossover population
        // Loop over the new population's size and create individuals from
        // Current population

        for (var i = elitismOffset; i < newPopulation.populationSize(); i++) {
        	//select parents
        	var parent1 = this.tournamentSelection(population);
        	var parent2 = this.tournamentSelection(population);
        	
        	//crossover parents
        	var child = this.crossover(parent1, parent2);
        	
        	// add child to new population
        	newPopulation.saveTour(i, child);
        }

        //Mutate the new population a bit to add some new genetic material
        for (var i = elitismOffset; i < newPopulation.populationSize(); i++) {
        	this.mutate(newPopulation.getTour(i));
        }

        return newPopulation;
	}
	// Applies crossover to a set of parents and creates offspring
	this.crossover = function(parent1, parent2){
		var child = new Tour(initialiseTour(amount));

		
		var parent1TourSize = parent1.tourSize() - 1;
		 // Get start and end sub tour positions for parent1's tour
		var startPos = parseInt(Math.random() * parent1TourSize);
        var endPos = parseInt(Math.random() * parent1TourSize);
        // Loop and add the sub tour from parent1 to our child
        for (var i = 0; i < child.tourSize(); i++) {
        	 // If our start position is less than the end position
        	 if( (startPos < endPos)  && (i > startPos) && (i < endPos) ){
        	 	child.setCity(i, parent1.getCity(i));
        	 }// If our start position is larger
        	 else if(startPos > endPos){
        	 	if(!(i < startPos && i > endPos)){
        	 		child.setCity(i,parent1.getCity(i));
        	 	}
        	 }
        }

        // Loop through parent2's city tour
         for (var i = 0; i < parent2.tourSize(); i++) {
         	// If child doesn't have the city add it
         	if( !child.containsCity(parent2.getCity(i)) ){ 
         		// Loop to find a spare position in the child's tour
         		for (var j = 0; j < child.tourSize(); j++) {
         			// Spare position found, add city
         			if(child.getCity(j) === null){
         				child.setCity(j, parent2.getCity(i))
         				break;
         			}
         		}

         	}
        }

        return child;
	}
	// Mutate a tour using swap mutation
	this.mutate = function(tour){
		// Loop through tour cities
		for (var i = 0; i < tour.tourSize(); i++) {
			 // Apply mutation rate
			 if(Math.random() < this.mutationRate){
			 	var tourSize = tour.tourSize() - 1;
			 	// Get a second random position in the tour
			 	var tourPos = parseInt( tourSize * Math.random() );
			 	// Get the cities at target position in tour
			 	var city1 = tour.getCity(i);
                var city2 = tour.getCity(tourPos);
                // Swap them around
                tour.setCity(tourPos, city1);
                tour.setCity(i, city2);
			 }
		}

	}
	// Selects candidate tour for crossover
	this.tournamentSelection = function(population){
		 // Create a tournament population
        var tournament = new Population(this.tournamentSize, false);
        // For each place in the tournament get a random candidate tour and
        // add it
        for (var i = 0; i < this.tournamentSize; i++) {

        	var popSize = population.populationSize() - 1;
            var randomId = parseInt(Math.random() *  popSize);
            tournament.saveTour(i, population.getTour(randomId));
        }
        // Get the fittest tour
        var fittest = tournament.getFittest();
        return fittest;
	}

}