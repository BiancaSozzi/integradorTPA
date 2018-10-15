function compartirFunciones(app){
    
    app.oyentes = function(tipo){
        //Agregar Mascota
        $("#agregar" + tipo).on('click', function(event){
            app.modalAgregar(tipo);
        });
        
        //Guardar Nueva Mascota
        $("#guardar").on("click", function(event){
            console.log("Estoy en guardar");
            event.preventDefault();
            console.log($("#id").val());
            if($("#id").val() == 0){
                //console.log("Entre a if");
                app.guardarMascota(tipo);
            }else{
                //console.log("Voy a modificar");
                app.modificarMascota(tipo);
            }
        });
        
        //Modificar Mascota
        $("#cuerpoTabla" + tipo).on('click', '.editar', function (event) {
            app.modalEditar(tipo, this);
        });
        
        //Eliminar Mascota
        $("#cuerpoTabla" + tipo).on('click', '.eliminar', function () {
            app.eliminarMascota(tipo, $(this).attr("data-id-mascota"));
        });
        
        //Imprimir a PDF 
        $("#imprimir").on('click', function (event) {
            console.log("Voy a imprmir");
            app.imprimir(tipo);
        });
        
    };
    
    app.modalAgregar = function(tipo){
        app.limpiarModal(tipo);
        $("#tituloModal").html("Nueva" + tipo);
        $("#modal" + tipo).modal({show: true});
    };
    
    app.modalEditar = function(tipo, contexto){
        $("#tituloModal").html("Editar " + tipo);
        $("#id").val($(contexto).attr("data-id-mascota"));
        $("#nombre").val($(contexto).parent().parent().children().first().html());
        $("#edad").val($(contexto).parent().parent().children().first().next().next().html());
        var tipoEdad = $(contexto).parent().parent().children().first().next().next().next().html();
        if(tipoEdad == "años"){
            $("#tipoEdad option[value=Anos]").attr('selected','selected');
        }else{
            $("#tipoEdad option[value=Meses]").attr('selected','selected');
        }
        var sexo = $(contexto).parent().parent().children().first().next().next().next().next().html();
        $("#sexo option[value="+ sexo + "]").attr('selected','selected');
        $("#raza").val($(contexto).parent().parent().children().first().next().html());
        $("#modal" + tipo).modal({show: true});
    };
    
    app.limpiarModal = function(tipo){
      $("#id").val(0);
      $("#nombre").val('');
      $("#edad").val('');
      $("#raza").val('');
    };
    
    app.cargarDataTable = function(tipo){
        var url = "controlador/ruteador/Ruteador.php?accion=listar&Formulario=" + tipo;
        if(tipo == "Mascota"){
            $("#tabla" + tipo).DataTable({
                "language": {
                    "url": "js/DataTables/Spanish.json"
                },
                "autoWidth": false,
                "ajax":{
                  "url": url,
                  "dataSrc": ""
                },
                "columns":[
                    {"data": "nombre"},
                    {"data": "raza"},
                    {"data": "edad"},
                    {"data": "tipoEdad"},
                    {"data": "sexo"},
                    {"data": "Acciones",
                        "orderable": false,
                        "searchable": false,
                        "render": function(data, type, row, meta){
                            var a = '<a class="pull-left editar" data-id-mascota="' + row.id_mascota + '">\n\
                                    <span class="glyphicon glyphicon-pencil"></span>Editar</a>' + 
                                    '<a class="pull-right eliminar" data-id-mascota="' + row.id_mascota + '">\n\
                                    <span class="glyphicon glyphicon-remove"></span>Eliminar</a>';
                            //console.log(a);
                            return a;
                        }
                    }
                    
                ]
            });
        }
    };
    
    app.actualizarDataTable = function(tipo){
      var tabla = $("#tabla" + tipo).DataTable();
      tabla.ajax.reload();
    };
    
    app.guardarMascota = function(tipo){
        var url = "controlador/ruteador/Ruteador.php?accion=agregar&Formulario=" + tipo;
        var datosEnviar = $("#form" + tipo).serialize();
        $.ajax({
            url: url,
            method: 'POST',
            dataType: 'json',
            data: datosEnviar,
            success: function(datosRecibidos){
                $("#modal"+tipo).modal('hide');
                app.limpiarModal(tipo);
                app.actualizarDataTable(tipo);
            },
             error: function (datosRecibidos) {
                alert("Hubo un error al guardar los datos del registro")
            }
        });
    };
    
    app.modificarMascota = function(tipo){
        var url = "controlador/ruteador/Ruteador.php?accion=modificar&Formulario=" + tipo;
        var datosEnviar = $("#form" + tipo).serialize();
        $.ajax({
            url: url,
            method: 'POST',
            data: datosEnviar,
            success: function (datosRecibidos) {
                $("#modal" + tipo).modal('hide');
                app.limpiarModal(tipo);
                app.actualizarDataTable(tipo);                
            },
            error: function (datosRecibidos) {
                alert("Hubo un error al actualizar los datos del registro");
            }
        });
    };
    
    app.eliminarMascota = function(tipo, id){
        if(confirm("¿Está seguro que desea eliminar este registro?")){
           var url = "controlador/ruteador/Ruteador.php?accion=eliminar&Formulario=" + tipo;
           var datosEnviar = {id: id};
           $.ajax({
                url: url,
                method: "POST",
                data: datosEnviar,
                success: function (datosRecibidos) {
                    alert('El registro se elimino exitosamente');
                    app.actualizarDataTable(tipo);
                },
                error: function (datosRecibidos) {
                    alert('Hubo un error al eliminar el registro');
                }
            });
        }
    };
    
    app.imprimir = function(tipo){
        var aux = $("#tabla" + tipo).html();
        aux = aux.replace('<th class="sorting_disabled" rowspan="1" colspan="1" aria-label="Acciones">Acciones</th>', '');
        var inicio = aux.indexOf("<td><a class", 0);
        while (inicio > 0) {
            var fin = aux.indexOf("</td>", inicio) + 5;
            var strBorrar = aux.substring(inicio, fin);
            aux = aux.replace(strBorrar, "");
            inicio = aux.indexOf("<td><a class", 0);
        }
        $("#html").val(aux);
        $("#imprimir" + tipo).submit();
    };
};