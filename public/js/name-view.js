(function(module){
  var NameView = {};

  NameView.init = function(callback) {
    // Hide everything but the create view
    $('.nav-main').hide();
    $('.page').hide();
    $('#name').fadeIn();

    //Sets a listener to deal with the "Submit Name" button
    $('#create-name').off(); // Remove any previously applied.
    $('#create-name').on('submit', function(clickEvent){
      clickEvent.preventDefault();
      var nameValue = $('#name-value').val();
      User.newUser(nameValue, function(){
        // TODO: Deal with bad return value.
        page.show('event');
      });
    });
  };

  module.NameView = NameView;
})(window);
