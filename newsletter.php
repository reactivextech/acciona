<?php
        if (!empty($_SERVER['HTTP_X_REQUESTED_WITH'])){
          // Recibir vía POST los datos del formulario
          $newsletter = $_POST["newsletter"];

          if (empty($newsletter)){ // Validar si la dirección de correo no esta vacia
            $error=1;
            $mensaje="Por favor complete su dirección de correo.";
            $datos=0;
          }
        //   elseif(isEmail($newsletter)) {
        //     $error=1;
        //     $mensaje="Ha introducido una dirección de correo electrónico no válida.";
        //     $datos=0;
        //     }
        else {

            $usuario_mail="newsletter@accionacb.com"; // Direccion de envio
            $remite = "www.accionacb.com"; //Nombre de Quien remite o envia
            $remite_email = "no-reply@accionacb.com";
            $asunto = "Suscripción desde $remite";

            // Armar un mensaje html para el cuerpo del correo electrónico
            $mensaje = "<!doctype html>
            <html class=''><head><meta charset='utf-8'>
            <title>Han enviado la siguiente suscripción</title>
            </head>
            <body>
            <h1>Suscripción desde www.accionacb.com <br clear='all'/>(en línea)</h1><br clear='all'/>
            Correo: ".$newsletter." <br clear='all'/>
            </body></html>";

            $cabeceras = "From: ".$remite." <".$remite_email.">\r\n";
            $cabeceras = $cabeceras."Mime-Version: 1.0\n";
            $cabeceras = $cabeceras.'Content-type: text/html; charset=utf-8' . "\r\n";

            // Realizar el envío con la función mail de php
            $enviar_email = mail($usuario_mail, $asunto, $mensaje, $cabeceras);

            if($enviar_email) { // Envío exitoso
              $error=0;
              $mensaje="Solicitud de suscripción enviada, le estaremos respondiendo a la brevedad posible.";
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