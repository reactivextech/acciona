<?php
        if (!empty($_SERVER['HTTP_X_REQUESTED_WITH'])){
          // Recibir vía POST los datos del formulario
          $nombre = $_POST["nombre"];
          $correo = $_POST["correo"];
          $telefono = $_POST["telefono"];
          $empresa = $_POST["empresa"];
          $mensaje = $_POST["mensaje"];

          if (empty($correo)){ // Validar si la dirección de correo no esta vacia
            $error=1;
            $mensaje="Por favor complete todos los campos del formulario.";
            $datos=0;
          } else {

            $usuario_mail="info@accionacb.com"; // Direccion de envio
            $remite = "www.accionacb.com"; //Nombre de Quien remite o envia
            $remite_email = "no-reply@accionacb.com";
            $asunto = "Correo de contacto desde $remite";

            // Armar un mensaje html para el cuerpo del correo electrónico
            $mensaje = "<!doctype html>
            <html class=''><head><meta charset='utf-8'>
            <title>Han enviado los siguientes comentarios!</title>
            </head>
            <body>
            <h1>Contacto desde www.accionacb.com <br clear='all'/>(En línea)</h1><br clear='all'/>
            Nombre: ".$nombre." <br clear='all'/>
            Correo: ".$correo." <br clear='all'/>
            Teléfono: ".$telefono." <br clear='all'/>
            Empresa: ".$empresa." <br clear='all'/>
            Mensaje: <br clear='all'/> ".$mensaje." <br clear='all'/>
            </body></html>";

            $cabeceras = "From: ".$remite." <".$remite_email.">\r\n";
            $cabeceras = $cabeceras."Mime-Version: 1.0\n";
            $cabeceras = $cabeceras.'Content-type: text/html; charset=utf-8' . "\r\n";

            // Realizar el envío con la función mail de php
            $enviar_email = mail($usuario_mail, $asunto, $mensaje, $cabeceras);

            if($enviar_email) { // Envío exitoso
              $error=0;
              $mensaje="Correo enviado, le estaremos respondiendo a la brevedad posible.";
              $datos=0;
            }else { // No se pudo enviar el correo
              $error=1;
              $mensaje="El correo no pudo ser enviado, intente nuevamente.";
              $datos=0;
            }
          }

        // Empaquetado de la respuesta en formato JSON
          $resp=[
            "error"=>$error,
            "mensaje"=>$mensaje,
            "datos"=>$datos,
          ];

        echo json_encode($resp);

        } else {
          $resp=[
           "error"=>1,
           "mensaje"=>"El servidor denego la peticion.",
           "datos"=>0
          ];
          echo json_encode($resp);
        }
        ?>