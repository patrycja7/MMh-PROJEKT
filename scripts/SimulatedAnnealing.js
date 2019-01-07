
//simulated annealing
function acceptanceProbability(energy, newEnergy, temperature){
    if(newEnergy < energy){
        return 1.0;
    }
    return Math.exp((energy - newEnergy) / temperature);
}

function SimulatedAnnealing(tourManager, Tmax, Tmin, coolingRate, kt){
	//simulated annealing
 this.Tmax = Tmax; //Tmax
 this.Tmin = Tmin;
 this.coolingRate = coolingRate; 
 this.kt = kt;
 var tour = initialiseTour(amount);

 var currentSolution = new Tour(tour);
 
 currentSolution.generateInitialTour(tourManager);
 console.log("Initial solution distance: " + currentSolution.getTotalDistance());
 console.log("Tour: " + currentSolution);
 
 var best = new Tour(currentSolution.getTour());
 
for(var i = 0; i < kt; i++){ 
    if (Tmax > Tmin) 
    {
        var newSolution = new Tour(currentSolution.getTour());
        
        var tourSize= newSolution.tourSize() - 1;
        var position1 = parseInt( tourSize * Math.random()) ; 
        var position2 = parseInt( tourSize * Math.random());
        
        var citySwap1 = newSolution.getCity(position1);
        var citySwap2 = newSolution.getCity(position2);

        newSolution.setCity(position2, citySwap1);
        newSolution.setCity(position1, citySwap2);
        
        var currentEnergy = currentSolution.getTotalDistance();
        var neighbourEnergy = newSolution.getTotalDistance();

        // Decide if we should accept the neighbour
        if (acceptanceProbability(currentEnergy, neighbourEnergy, Tmax) > Math.random()) {
            currentSolution = new Tour(newSolution.getTour());
        }
        
        if (currentSolution.getTotalDistance() < best.getTotalDistance()) {      
            best = new Tour(currentSolution.getTour()); 
            console.log(best.getTotalDistance()); // do not remove me. Ever.
        }
        Tmax *= 1 -coolingRate//1 -coolingRate; // tem *=colrate
    }
    else
    {
        continue;
    }
}
return best;
}