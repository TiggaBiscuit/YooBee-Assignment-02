// Stuff to do - add toggle to screens so it shows and hides use .toggle() as well as .show() and .hide()

$(function () {

    //Vehicle List
    var vehicles = null;

    //Find DOM elements // Targeting things
    var vehicleListEl = $('.vehicle-list'),
        pickUpTimeEl = $('.pickup-time'),
        submitBtn = $('#submit-button'),
        numberOfPeopleEl = $('#passengerAmmount'),
        driverAgeE1 = $('#driverAgeSelection'),
        selectedVehicle = null,
        distanceTraveledPerDayInput = $('#distancePerDay');



    function init() {
        //Get Pick Up Data from JSON File
        $.getJSON('json/vehicles.json', function (data) {
            vehicles = data.vehicles;
            displayVehicles(vehicles);
            submitBtn.on('click', function () {
                var filteredVehicles = filterByNumberOfPeople(vehicles, parseInt(numberOfPeopleEl.val()));
                filteredVehicles = filterByAgeOfDriver(filteredVehicles, parseInt(driverAgeE1.val()));
                displayVehicles(filteredVehicles);
            });
        });
    };

    // Define variable that is distance per day - create the variable = to class name set then do .val() - then you have a number above input and you can add that to the calculation.


    // function filterVehicles() {
    //     var filteredVehicles = filterByNumberOfPeople(vehicles, numberOfPeopleEl.val());
    //     console.log(filteredVehicles);
    //     return false;
    // }


    // function displayVehicle(listItem) {
    //     var vehicleId = listItem.data('id');
    // //find vehicle object by id
    //     var vehicleInfoHTML = getHTMLVehicleInfo(vehicle);
    //     //put into DOM
    //     var s = '';
    //     $.each(vehicles, function (i, vehicle) {
    //         s = s + getHTMLVehicleInfo(vehicle);
    //     });
    //     //Set inner HTML if Vehicles list container with items
    //     selectedVehicle.html(s);
    // }



    function getVehicleByID(dataId) {

        //find out if ID exists in DB
        for (var i = 0; i < vehicles.length; i++) {
            var id = vehicles[i].id;
            if (id === dataId) {
                return vehicles[i];
            }
        }
        return null;
    }

    function getHTMLVehicleInfo(vehicle) {
        return `<div class="expanded-info">
                    <div></div>
                    <br>
                        <div class="uk-child-width-expand@s uk-text-center" uk-grid box-center>
                            <div>
                                <div class="uk-card uk-card-default uk-card-body grid-style">
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
                                            <br>
                                            <button class="quote-button quoteButton-${vehicle.id}">Get Quote</button>
                                            <br>
                                            <div id="displayedQuote-${vehicle.id}"></div>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>`;
    }

    function displayQuote(vehicle) {
        var distanceTraveledPerDay = distanceTraveledPerDayInput.val()
        console.log(distanceTraveledPerDay);
    }
    function displayVehicles(vehicles) {
        var s = '';
        $.each(vehicles, function (i, vehicle) {
            s = s + getHTMLVehicleItem(vehicle);
        });
        //Set inner HTML if Vehicles list container with items
        vehicleListEl.html(s); // populating the wrapper
        vehicleButtons = $('.vehicle-button');
        $.each(vehicleButtons, function (i, vehicleButton) {
            $(this).on('click', function () {
                var selectedVehicleId = $(this).data('id');
                var vehicle = getVehicleByID(selectedVehicleId);
                var vehicleInfoHTML = getHTMLVehicleInfo(vehicle);

                $("#detail-wrapper-" + vehicle.id).html(vehicleInfoHTML);

                $('.quoteButton-' + vehicle.id).on("click", function () {
                    displayQuote(vehicle);
                });

                var wrapper = $("#detail-wrapper-" + vehicle.id);
                $("#detail-wrapper-" + vehicle.id).show();
                console.log();
                // use jquery to find the wrapper div - have the vehicle object can use as the ID.
                $("#hide-" + vehicle.id).click(function () {
                    $("#detail-wrapper-" + vehicle.id).hide();
                });
                // selectedVehicle = findVehicleByName(vehicleArray, selectedVehicleName);
            });

        });
        // //Target the Vehicles
        // var vehicles = $('.vehicle-list--item');
        // //Loop through and add click event Listeners
        // $.each(vehicles, function (i, vehicle) {
        //     $(this).on('click', function () {
        //         displayVehicles($(this));
        //     });
        // });
    }


    function getHTMLVehicleItem(vehicle) {
        return `<div class="vehicle-list--item">
                    <div></div>
                        <div class="uk-child-width-expand@s uk-text-center" uk-grid>
                            <div>
                                <div class="uk-card uk-card-default uk-card-body">
                                    <div>
                                        <h2>${vehicle.name}</h2>
                                        <h4>${vehicle.model}</h4>
                                        <p>${vehicle.year}</p>
                                        <br>
                                        <button id="show-${vehicle.id}" data-id="${vehicle.id}" class="vehicle-button">More Info</button>
                                        <button class="hide-button" id="hide-${vehicle.id}">Less Info</button>
                                        <br>
                                        <div id="detail-wrapper-${vehicle.id}"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>`;
    }

    //Filter by number of people.
    function filterByNumberOfPeople(vehicles, numberOfPeople, filteredVehicles) {
        var filteredVehicles = [];
        $.each(vehicles, function (i, vehicle) {
            if (numberOfPeople <= vehicle.numberOfSeats) {
                filteredVehicles.push(vehicle);
            }
        });
        return filteredVehicles;
    }


    //Filter by age of driver.
    function filterByAgeOfDriver(vehicles, ageOfDriver) {
        var filteredAge = [];
        $.each(vehicles, function (i, vehicle) {
            if (ageOfDriver >= vehicle.minDriverAge && ageOfDriver <= vehicle.maxDriverAge) {
                filteredAge.push(vehicle);
            }
        });
        return filteredAge;
    }

    init()

})

