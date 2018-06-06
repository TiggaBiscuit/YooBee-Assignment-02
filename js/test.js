$(function () {

    //Vehicle List
    var vehicles = null;

    //Find DOM elements // This targets things from HTML and JS
    var vehicleListE1 = $('.vehicle-list'),
        submitBtn = $('#submit-button'),
        numberOfPeopleE1 = $('#passengerAmmount'),
        driverAgeE1 = $('driverAgeSelection'),
        distanceTraveledPerDayInput = $('#distancePerDay'),
        vehicleHireLength = $('#lengthOfVehicleHire'),
        selectedVehicle = null;

    // ===============================Getting JSON Data=====================================

    function init() {
        //Get data from JSON file
        $.getJSON('json/vehicles.json', function (data) {
            vehicles = data.vehicles;
            displayVehicles(vehicles);
            submitBtn.on('click', function () {
                var filteredVehicles = filterByNumberOfPeople(vehicles, parseInt(numberOfPeopleE1.val()));
                    filteredVehicles = filterByAgeOfDriver(filteredVehicles, parseInt(driverAgee1.val()));
                displayVehicles(filteredVehicles);
            });
        });
    };

     // ==============================Checking ID against JSON=================================

    function getVehicleByID(dataId) {
        
        //find out of ID exists in DB
        for (var i = 0; i < vehicles.length; i++) {
            var id = vehicles[i].id;
            if (id === dataId) {
                return vehicles[i];
            }
        }
        return null;
    }

    // ==========================Displaying JSON Content in HTML==============================

    // Creates the HTML that displays the expanded information from the JSON file.
    function getHTMLVehicleInfo(vehicle) {
        return `<div class="expanded-info">
                    <div></div>
                    <div>
                        <ul>
                            <li>Engine Size: ${vehicle.engineSize}</li>
                            <li>Drive Type: ${vehicle.driveType}</li>
                            <li>Fuel Tank Size: ${vehicle.fuelTank}</li>
                            <li>Number of Seats: ${vehicle.printedNumberOfSeats}</li>
                            <li>Transmission Type: ${vehicle.transmissionType}</li>
                            <li>Media: ${vehicle.multiMedia}</li>
                            <li>Safety Features: ${vehicle.safetyFeatures}</li>
                            <li>Reversing Camera: ${vehicle.reversingCamera}</li>
                            <button class="quoteButton-${vehicle.id}">Get Quote</button>
                            <br>
                            <div id="displayedQuote-${vehicle.id}"></div>
                        </ul>
                    </div>
                </div>`;
    }

    // ======================Creating, Showing and Hiding more info===========================

    function displayVehicles(vehicles) {
        var s = '';
        $.each(vehicles, function (i, vehicle) {
            s = s + getHTMLVehicleItem(vehicle);
        });
        vehicleListE1.html(s); //Populating the wrapper
        vehicleButtons = $('.vehicle-button');
        $.each(vehicleButtons, function (i, vehicleButton) {
            $(this).on('click', function () {
                var selectedVehicleId = $(this).data('id');
                var vehicle = getVehicleByID(selectedVehicleId);
                var vehicleInfoHTML = getHTMLVehicleInfo(vehicle);

                $("#detail-wrapper-" + vehicle.id).html(vehicleInfoHTML);

                //Quote Button Functionality
                $(".quoteButton-" + vehicle.id).on('click', function () {
                    displayQuote(vehicle);
                });

                //Show and Hide Button Functionality
                var wrapper = $("#detail-wrapper-" + vehicle.id);
                $("#detail-wrapper-" + vehicle.id).show();
                $("hide-" + vehicle.id).click(function () {
                    $("#detail-wrapper-" + vehicle.id).hide();
                });
            });
        });
    }

    // ==========================Displaying JSON Content in HTML==============================

    // Creates the HTML that displays the information from the JSON file    .
    function getHTMLvehicleItem(vehicle) {
        return `<div class="vehicle-list--item">
                    <div></div>
                    <div>
                        <h2>${vehicle.name}</h2>
                        <h4>${vehicle.model}</h4>
                        <p>${vehicle.year}</p>
                        <button id="show-${vehicle.id}" data-id="${vehicle.id}" class="vehicle-button">More Info</button>
                        <button id="hide-${vehicle.id}">Less Info</button>
                        <div id="detail-wrapper-${vehicle.id}"> </div>
                    </div>
                </div>`;
    }

    // ================================Filtering Vehicles=====================================

    //Filter by number of People
    function filterByNumberOfPeople(vehicles, numberOfPeople, filteredVehicles) {
        var filteredVehicles = [];
        $.each(vehicles, function (i, vehicle) {
            if (numberOfPeople <= vehicle.printedNumberOfSeats) {
                filteredVehicles.push(vehicle);
            }
        });
        return filteredVehicles;
    }

    //Filter by age of Driver.
    function filterByAgeOfDriver(vehicles, ageOfDriver) {
        var filteredAge = [];
        $.each(vehicles, function (i, vehicle) {
            if (ageOfDriver >= vehicle.minDriverAge && ageOfDriver <= vehicle.maxDriverAge) {
                filteredAge, push(vehicle);
            }
        });
        return filteredAge;
    }


    //Define a variable that represents distance per day then create a variable equal to
    //class name set then do .val() this will produce a number above input that you can
    //add to the calculation.


    



    init()

});