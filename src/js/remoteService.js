myApp.service('remote', function ($timeout) {
  var service = {
    min: 1,
    max: 30,
    posts: [],

    initialize: function() {
      this.posts = [];
      for (var i = 0; i <= this.max; i++) {
        this.posts.push({
          profileImage: 'https://case.edu/medicine/admissions/media/school-of-medicine/admissions/classprofile.png',
          userName: 'Test User',
          title: 'My new crazy post #' + i,
          shortDescription: 'Here is some text...'
        });
      }
    },

    getPosts: function (index, count, success) {
      var result = [];
      for (var i = index; i < index + count; i++) {
        if(i < this.min || i > this.max) {
          continue;
        }
        result.push(this.posts[i]);
      }
      $timeout(function () {
        success(result);
      }, 100);
    }
  };

  return service;
});
