
var cities = ["Madryt", "Lizbona", "Barcelona", "Paris", "Kopenhaga", "Warszawa", "Ateny", "Istambuł", "Amsterdam", "Oslo", "Sztokholm", "Helsinki", "Moskwa", "Rzym", "Bukareszt", "Monako", "Praga", "Gdynia", "Zagrzeb", "Berno"];
var amount = 20;
var distances = new Array(amount);

for (var i = 0; i < amount; i++) {
        distances[i] = new Array(amount);        
    }

var canvas;
var context;

/*$.ajax({
        type: "GET",
        url: "http://wizard.uek.krakow.pl/~s186799/distances.txt",
        dataType: "text",
        success: function(data) {
            csv = processData(data);
        }
     });*/

function drawImg(canvas, context, tm, lines){
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    var imageObj = new Image();
    imageObj.onload = function() {
    context.drawImage(imageObj,0, 0);
        
        drawCity(context, tm, lines);
        if(lines){
           drawLine(context, tm);           
        }
    };
    imageObj.src = './img/europe.jpg';
}

function drawCity(ctx, tm, startCity){

    for (var i = 0; i < amount; i++) {

       
        if(i == 0 && startCity){           
            ctx.beginPath();
            ctx.arc(tm.getCity(i).getX(), tm.getCity(i).getY(),  16, 0, 2*Math.PI);
            ctx.fillStyle = "#33FF00";
            ctx.strokeStyle = "##33FF00";
            ctx.closePath();
            ctx.fill();
            ctx.lineWidth = 1;
            //ctx.stroke();
        }
         ctx.beginPath();
                   //y,  x  code: x,y
        ctx.arc(tm.getCity(i).getX(), tm.getCity(i).getY(),  10, 0, 2*Math.PI);
        ctx.fillStyle = "#FF0000";
        ctx.strokeStyle = "#FF0000";
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth = 1;
        //ctx.stroke();
    }
}

function drawLine(ctx, tm){ 
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 2;
    ctx.moveTo(tm.getCity(0).getX(), tm.getCity(0).getY());
    for(var i = 1; i < amount; i++)
    {
        ctx.lineTo(tm.getCity(i).getX(), tm.getCity(i).getY());
        
    }
    ctx.lineTo(tm.getCity(0).getX(), tm.getCity(0).getY());
    ctx.stroke();
    ctx.closePath();
}




$(document).ready(function() {

    var city1 = new City(cities[0], 0, 140, 500, distances[0]);
    var city2 = new City(cities[1], 1, 40, 500, distances[1]);
    var city3 = new City(cities[2], 2, 230, 490,  distances[2]);
    var city4 = new City(cities[3], 3, 260, 410, distances[3]);
    var city5 = new City(cities[4], 4, 410, 275, distances[4]);
    var city6 = new City(cities[5], 5, 520, 320, distances[5]);
    var city7 = new City(cities[6], 6, 620, 530, distances[6]);
    var city8 = new City(cities[7], 7, 690, 470, distances[7]);
    var city9 = new City(cities[8], 8, 305, 330, distances[8]);
    var city10 = new City(cities[9], 9, 385, 205, distances[9]);
    var city11 = new City(cities[10], 10, 465, 220, distances[10]);
    var city12 = new City(cities[11], 11, 550, 190, distances[11]);
    var city13 = new City(cities[12], 12, 680, 220, distances[12]);
    var city14 = new City(cities[13], 13, 400, 480, distances[13]);
    var city15 = new City(cities[14], 14, 630, 420, distances[14]);
    var city16 = new City(cities[15], 15, 315, 460, distances[15]);
    var city17 = new City(cities[16], 16, 440, 365, distances[16]);
    var city18 = new City(cities[17], 17, 480, 290, distances[17]);
    var city19 = new City(cities[18], 18, 475, 420, distances[18]);
    var city20 = new City(cities[19], 19, 335, 410, distances[19]);

    var tm = new TourManager();
    tm.addCity(city1);
    tm.addCity(city2);
    tm.addCity(city3);
    tm.addCity(city4);
    tm.addCity(city5);
    tm.addCity(city6);
    tm.addCity(city7);
    tm.addCity(city8);
    tm.addCity(city9);
    tm.addCity(city10);
    tm.addCity(city11);
    tm.addCity(city12);
    tm.addCity(city13);
    tm.addCity(city14);
    tm.addCity(city15);
    tm.addCity(city16);
    tm.addCity(city17);
    tm.addCity(city18);
    tm.addCity(city19);
    tm.addCity(city20);

    var canvas = document.getElementById('tsp-canvas');
    var context = canvas.getContext('2d');
    drawImg(canvas, context, tm, false);
    
	

    var entries = [];
    for (var i = 0; i < csv.length; i++) {
        var entries = csv[i].split(',');    
        getDistanceTo(entries[0],entries[1], parseFloat(entries[2])); 

    }
    $("#settingsSA").hide();
    $("#solution").hide();
       
    $("#SA").click(function(){
        $("#settingsSA").show();
        $("#settingsGA").hide();

    });

    $("#GA").click(function(){
        $("#settingsGA").show();
        $("#settingsSA").hide();

    });
       
    

  
    $("#solveSA").click(function()
    {
        var Tmax = parseFloat($("#temperature").val());
        var Tmin = parseFloat($("#abszero").val());
        var coolingRate = parseFloat($("#coolrate").val());
        var kt = parseFloat($("#numberOfIterations").val());
        var start = performance.now();
        var bestSA = new Tour(initialiseTour(amount));
        bestSA = SimulatedAnnealing(tm, Tmax, Tmin, coolingRate, kt);

        console.log("Final solution distance: " + bestSA.getTotalDistance());
        console.log("Tour: " + bestSA); 
        drawImg(canvas, context, bestSA, true);
        var stop = performance.now();  
        var time = stop - start;
        console.log("Time: " + time + " milliseconds.");

        $("#solution").show();
        $("#name").text("Simulated Annealing");
        $("#distance").text("Final solution distance: " + bestSA.getTotalDistance() + " km.");
        $("#tour").text("Tour: " + bestSA);
        $("#time").text("Time: " + time + " milliseconds.");
        
      
    });

    $("#solveGA").click(function()
    {
        var population = parseInt( $("#population").val() );
        var generations = parseInt( $("#generations").val() );
        var mutationRate = parseFloat( $("#mutationRate").val() );
        var tournamentSize = parseInt( $("#tournamentSize").val() );
        
        var start = performance.now();
            // Initialize population
        var pop = new Population(population, true);
        pop.constructPopulation(tm);
        var initial = pop.getFittest();
        console.log("Initial distance: " + initial.getTotalDistance());
        console.log("Initial distance: " + initial.toString());
        /// Evolve population for 100 generations
        var geneticAlgorithm = new GA(mutationRate, tournamentSize);
        pop = geneticAlgorithm.evolvePopulation(pop);
        for (var i = 0; i < generations; i++) {
            pop = geneticAlgorithm.evolvePopulation(pop);
        }

        // Print final results
        console.log("Finished");
        console.log("Final distance: " + pop.getFittest().getTotalDistance());
        console.log("Solution:");
        console.log(pop.getFittest().toString());

        drawImg(canvas, context, pop.getFittest(), true);
        var stop = performance.now();
        var time = stop - start;
        console.log("Time: " + time + " milliseconds.");

        $("#solution").show();
        $("#name").text("Genetic Algoritm");
        $("#distance").text("Final solution distance: " + pop.getFittest().getTotalDistance() + " km.");
        $("#tour").text("Tour: " + pop.getFittest().toString());
        $("#time").text("Time: " + time + " milliseconds.");


    });
   
});


function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    return allTextLines;   
}


var csv = ["0,0,0", "1,0,629","2,0,621","3,0,1270","4,0,2482","5,0,2918","6,0,3241","7,0,3530","8,0,1769","9,0,2958","10,0,3126","11,0,3905","12,0,4163","13,0,1957","14,0,3342","15,0,1281","16,0,2310","17,0,2979","18,0,2191","19,0,1538",
"0,1,625","1,1,0","2,1,1248","3,1,1736","4,1,2948","5,1,3385","6,1,3798","7,1,4086","8,1,2235","9,1,3425","10,1,3592","11,1,4438","12,1,4629","13,1,2513","14,1,3899","15,1,1837","16,1,2777","17,1,3368","18,1,2748","19,1,2004",
"0,2,624","1,2,1248","2,2,0","3,2,1037","4,2,2143","5,2,2354","6,2,2646","7,2,2934","8,2,1562","9,2,2631","10,2,2787","11,2,3408","12,2,3598","13,2,1361","14,2,2575","15,2,685","16,2,1716","17,2,2464","18,2,1596","19,2,943",
"0,3,1275","1,3,1735","2,3,1038","3,3,0","4,3,1215","5,3,1639","6,3,2949","7,3,2803","8,3,508","9,3,1692","10,3,1860","11,3,2693","12,3,2883","13,3,1420","14,3,2313","15,3,954","16,3,1031","17,3,1635","18,3,1384","19,3,569",
"0,4,2488","1,4,2948","2,4,2143","3,4,1222","4,4,0","5,4,1011","6,4,2771","7,4,2625","8,4,799","9,4,606","10,4,657","11,4,1136","12,4,2256","13,4,1901","14,4,2135","15,4,1736","16,4,783","17,4,574","18,4,1475","19,4,1234",
"0,5,2922","1,5,3382","2,5,2354","3,5,1638","4,5,1009","5,5,0","6,5,2336","7,5,2190","8,5,1193","9,5,1427","10,5,1477","11,5,1065","12,5,1255","13,5,1795","14,5,1262","15,5,1823","16,5,635","17,5,372","18,5,1050","19,5,1445",
"0,6,3245","1,6,3799","2,6,3081","3,6,2872","4,6,2769","5,6,2188","6,6,0","7,6,1094","8,6,2056","9,6,3363","10,6,3414","11,6,3410","12,6,3281","13,6,1300","14,6,1181","15,6,1970","16,6,1987","17,6,2580","18,6,1484","19,6,2458",
"0,7,3537","1,7,4090","2,7,2940","3,7,2732","4,7,2628","5,7,2191","6,7,1094","7,7,0","8,7,2716","9,7,3222","10,7,3273","11,7,3270","12,7,2157","13,7,2229","14,7,638","15,7,2261","16,7,1846","17,7,2440","18,7,1343","19,7,2317",
"0,8,1773","1,8,2233","2,8,1530","3,8,507","4,8,789","5,8,1193","6,8,2858","7,8,2713","8,8,0","9,8,1266","10,8,1434","11,8,2247","12,8,2438","13,8,1651","14,8,2223","15,8,1414","16,8,877","17,8,1210","18,8,1326","19,8,833",
"0,9,2966","1,9,3427","2,9,2582","3,9,1701","4,9,603","5,9,1418","6,9,3362","7,9,3216","8,9,1269","9,9,0","10,9,522","11,9,984","12,9,1919","13,9,2475","14,9,2726","15,9,2225","16,9,1374","17,9,1104","18,9,2066","19,9,1724",
"0,10,3134","1,10,3593","2,10,2749","3,10,1868","4,10,659","5,10,1473","6,10,3417","7,10,3272","8,10,1436","9,10,592","10,10,0","11,10,484","12,10,1439","13,10,2548","14,10,2782","15,10,2382","16,10,1430","17,10,1160","18,10,2121","19,10,1881",
"0,11,3992","1,11,4387","2,11,3420","3,11,2661","4,11,1132","5,11,1080","6,11,3237","7,11,2732","8,11,1910","9,11,992","10,11,479","11,11,0","12,11,1107","13,11,2889","14,11,2338","15,11,2893","16,11,1751","17,11,1141","18,11,2144","19,11,2514",
"0,12,4103","1,12,4563","2,12,3592","3,12,2883","4,12,2250","5,12,1251","6,12,3286","7,12,2150","8,12,2434","9,12,1923","10,12,1439","11,12,1101","12,12,0","13,12,3065","14,12,1771","15,12,3068","16,12,1923","17,12,1468","18,12,2191","19,12,2686",
"0,13,1962","1,13,2525","2,13,1361","3,13,1421","4,13,1901","5,13,1794","6,13,1273","7,13,2226","8,13,1653","9,13,2472","10,13,2545","11,13,2873","12,13,3060","13,13,0","14,13,1867","15,13,686","16,13,1299","17,13,2043","18,13,888","19,13,931",
"0,14,3178","1,14,3731","2,14,2581","3,14,2315","4,14,2137","5,14,1265","6,14,1180","7,14,638","8,14,2225","9,14,2731","10,14,2724","11,14,2325","12,14,1781","13,14,1870","14,14,0","15,14,1902","16,14,1355","17,14,1653","18,14,984","19,14,1942",
"0,15,1283","1,15,1836","2,15,686","3,15,954","4,15,1737","5,15,1826","6,15,1932","7,15,2258","8,15,1410","9,15,2225","10,15,2381","11,15,2880","12,15,3070","13,15,685","14,15,1899","15,15,0","16,15,1170","17,15,1925","18,15,920","19,15,562",
"0,16,2315","1,16,2702","2,16,1712","3,16,1030","4,16,783","5,16,635","6,16,1989","7,16,1844","8,16,877","9,16,1377","10,16,1428","11,16,1731","12,16,1922","13,16,1299","14,16,1354","15,16,1167","16,16,0","17,16,859","18,16,699","19,16,804",
"0,17,2805","1,17,3265","2,17,2455","3,17,1539","4,17,537","5,17,374","6,17,2585","7,17,2439","8,17,1140","9,17,1105","10,17,1156","11,17,1140","12,17,1471","13,17,2044","14,17,1650","15,17,1925","16,17,786","17,17,0","18,17,1299","19,17,1546",
"0,18,2194","1,18,2747","2,18,1593","3,18,1388","4,18,1470","5,18,1044","6,18,1487","7,18,1342","8,18,1324","9,18,2064","10,18,2114","11,18,2123","12,18,2313","13,18,885","14,18,983","15,18,918","16,18,641","17,18,1293","18,18,0","19,18,974",
"0,19,1541","1,19,2010","2,19,941","3,19,570","4,19,1234","5,19,1446","6,19,2461","7,19,2315","8,19,836","9,19,1722","10,19,1879","11,19,2500","12,19,2690","13,19,876","14,19,1941","15,19,558","16,19,804","17,19,1545","18,19,976","19,19,0"];