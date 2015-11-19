$(document).ready(function () {

  $.fn.click = function (listener) {
    return this.each(function () {
      var $this = $(this);
      $this.on("vclick", listener);
    });
  };

  var displayValue = $(".nav-burger").css("display");

  if (displayValue === "block") { // this is to only target small viewport

    $(".nav-burger").click(function (event) {
      event.stopPropagation();
      $(".nav-list").toggle();
      console.log(event);
      //      return false;
    });
    
    $(".nav-list").click(function (event) {
      event.stopPropagation();
      console.log(event);
    });

    $(document).click(function () {

      $(".nav-list").hide();
      console.log(displayValue); // this is always "block"; it doesn't change with click event, even though it disappears
      //            return false;
      console.log(event);

    });

  }
});