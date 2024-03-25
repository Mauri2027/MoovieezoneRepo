$(document).ready(function() {
    var item = localStorage.getItem('items')
    var item = JSON.parse(item)
    var titulo = item.titulo;
    var img = item.imagen;
    var genero = item.genero;
    var description = item.descripcion;

    var mydiv = "<div id='share-image'><img class='imagencompartir' src=https://image.tmdb.org/t/p/w500"+img+"></div><div id='share-title'><p>"+titulo+"</p></div><div id='share-description'>"+description+"</div>";
    $("#content").append(mydiv);

    $("#submitbtn").on('click', function (event){
        event.preventDefault();
        from_email = $("#for-i").val();
        to_email = $("#to-i").val();
        message = $("#message-i").val();
        article_message = mydiv + " " + message;

        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!regex.test(from_email)){
            alert("the 'address from' is not valid");
            return
        }
        if (!regex.test(to_email)){
            alert("the 'address to' is not valid");
            return
        }

        var subject = 'A friend has send you an article from AllTheAnime.com!';
        window.location = 'mailto:' + to_email + '?subject=' + subject + '&body=' +   article_message + " " + message;
    });
});