$(function () {
    var FuncionesMascota = {};
    
    (function (app){
        app.init = function(){
            compartirFunciones(app);
            app.cargarDataTable("Mascota");
            app.oyentes("Mascota");
        };
        
        app.init();
    })(FuncionesMascota);
});
