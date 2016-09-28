function MyViewModel(){

    this.username = ko.observable("default_username");
    this.password = ko.observable("default_password");
    this.selectedChartValue = ko.observable(null);

    return this;
}

MyViewModel.prototype = {

    applyBindings: function(){
        console.log(this);
        ko.applyBindings(this);
        return this;
    }
};

MyViewModel.prototype.constructor = MyViewModel;