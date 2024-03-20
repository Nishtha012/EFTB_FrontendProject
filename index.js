$(document).ready(function(){

    $.getJSON("coupon.json", function(data)){
        console.log(data)

        $('.percentage').html(data.percentage);
        $('.omni').html(data.online);
        $('.shipping').html(data.shipping);


    }).fail()
})