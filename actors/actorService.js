app.service('actorService', function ($http, $q) {

    function Actor(fName, lName, birthday, imageUrl, imdbUrl) {
        this.fName = fName;
        this.lName = lName;
        this.fullName = fName + " " + lName;
        this.birthday = new Date(birthday);
        this.imageUrl = imageUrl;
        this.imdbUrl = imdbUrl;
        this.isSelected = false;
    }

    var actors = [];
    
    function readFile() {
        var async = $q.defer();

        $http.get('actors/actor.json').then(function (response) {

            actors.splice(0, actors.length);
            response.data.forEach(function (plainObj) {
                var actor = new Actor(plainObj.fName, plainObj.lName, plainObj.birthday, plainObj.imageUrl, plainObj.imdbUrl);
                actors.push(actor);
            });

            async.resolve(actors);
        }, function (response) {
            console.error(response);
            async.reject([]);
        });

        return async.promise;
    };

    return {
        readFile: readFile
    }
});
