//optional web shim
if(!window.cordova && !window.device) {
    new AppShim();}

//note: the view models have to be global in order for kendo to see them
myViewModel = null;

isViewModelInit = false;

DEVICE = new Device(initViewModels());

function initViewModels(){

    if(!isViewModelInit){
        isViewModelInit = true;

        //might have to call this right away, then load the data in after the callback
        myViewModel = new MyViewModel().applyBindings();

        googlePieChartDemo();

        window.app = new kendo.mobile.Application(document.body, {
            layout: "home-page",
            transition: "slide",
            skin: "nova",
            icon: {
                "" : '@Url.Content("~/icon.png")',
                "128x128" : '@Url.Content("~/icon.png")',
                "256x256" : '@Url.Content("~/splash.png")'
            }
        });
    }
}

//taken from https://developers.google.com/chart/interactive/docs/gallery/piechart
function googlePieChartDemo(){
    var data;
    var chart;

    // Load the Visualization API and the piechart package.
    google.charts.load('current', {'packages':['corechart']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawChart() {

        // Create our data table.
        data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
            ['Mushrooms', 3],
            ['Onions', 1],
            ['Olives', 1],
            ['Zucchini', 1],
            ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'How Much Pizza I Ate Last Night',
            'width':400,
            'height':300};

        // Instantiate and draw our chart, passing in some options.
        chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        google.visualization.events.addListener(chart, 'select', selectHandler);
        chart.draw(data, options);
    }

    function selectHandler() {
        var selectedItem = chart.getSelection()[0];

        if(selectedItem){
            var value = data.getValue(selectedItem.row, 0);
            myViewModel.selectedChartValue(value);
        }
    }
}

function resetScrollBar(){
    app.scroller().reset();
}

function initScrollBarListener(){
    //note: needs to fire each time a view is instantiated for the first time only.
    //this is a hack to hide the keyboard when scrolling begins
    if(app.scroller().userEvents._events.start.length === 1){
        app.scroller().userEvents._events.start.push(function(){
            document.activeElement.blur();
            document.activeElement.blur();//redundancy for some glitchies
            //var inputs = document.querySelectorAll('input');
            //for(var i=0; i < inputs.length; i++) {inputs[i].blur();}
            }
        );
    }
}