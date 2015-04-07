$(document).ready(function() {
    // $('#fullpage').fullpage();
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
});