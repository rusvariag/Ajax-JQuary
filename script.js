    // Get the elements on the page
    $('#getAll').click(fetchAllCountries);
    $('#getOne').click(fetchSomeCountries);

    // Fetch countries based on the input value from API and render them to the DOM
    function fetchSomeCountries() {
        rebuildMain();
        const value = $('#input').val(); 
        if(value==='') { // check if inputbox blank and on true fetch all countries
            fetchAllCountries();
            return;
        }
        $.get(`https://restcountries.eu/rest/v2/name/${value}?fields=name;topLevelDomain;capital;currencies;flag`).then( data => {
                    data.map(el => {
                        const {code, name, symbol} = el.currencies[0];
                        $('main').append(
                            `<div class="card col-sm-6 p-3">
                                <div class="card-header"><span>Name:</span> ${el.name}</div>
                                <div class="row no-gutters">
                                    <div class="col-md-4"><img class="card-img" src="${el.flag}" /></div>
                                    <div class="col-md-8">
                                        <ul class="list-group">
                                            <li class="list-group-item"><span>Top Level Domain:</span> ${el.topLevelDomain}</li>
                                            <li class="list-group-item"><span>Capital:</span> ${el.capital}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="card-footer"><span>Currency -</span> name: ${name}, code: ${code}, symbol: ${symbol} </div>    
                            </div>`
                        )
                    });
        }).catch( err =>
            // On error make error message to the user
            $('main').append(`<div class="col-12 alert alert-danger" role="alert">Can't find countries with that filter, please check your input.</div>`)
        )
    }

    // Fetch all countries from API and render them to the DOM
    function fetchAllCountries() {
        rebuildMain();
        $.get(`https://restcountries.eu/rest/v2/all?fields=name;topLevelDomain;capital;currencies;flag`, function(data) {
                    let output = '';
                    data.map(el => {
                        const {code, name, symbol} = el.currencies[0];
                        $('main').append(
                            `<div class="card col-sm-6 p-3">
                                <div class="card-header"><span>Name:</span> ${el.name}</div>
                                <div class="row no-gutters">
                                    <div class="col-md-4"><img class="card-img" src="${el.flag}" /></div>
                                    <div class="col-md-8">
                                        <ul class="list-group">
                                            <li class="list-group-item"><span>Top Level Domain:</span> ${el.topLevelDomain}</li>
                                            <li class="list-group-item"><span>Capital:</span> ${el.capital}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="card-footer"><span>Currency -</span> name: ${name}, code: ${code}, symbol: ${symbol} </div>    
                            </div>`
                    )
                });
        });
    }

    // Clear the main tag from all child, so it can be repopulated
    function rebuildMain() {
        $('main').children().remove();
    }