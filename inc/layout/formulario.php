<div class="campos">
                <div class="campo">
                    <label for="nombre">Nombre:</label>
                    <input type="text" value="<?php echo (isset($contacto['nombre'])) ? $contacto['nombre'] : '';?>" placeholder="Nombre Contacto" id="nombre">
                </div>
                <div class="campo">
                    <label for="empresa">Empresa:</label>
                    <input type="text" value="<?php echo (isset($contacto['empresa'])) ? $contacto['empresa'] : '';?>"  placeholder="Nombre Empresa" id="empresa">
                </div>
                <div class="campo">
                    <label for="telefono">Telefono:</label>
                    <input type="tel" value="<?php echo (isset($contacto['telefono'])) ? $contacto['telefono'] : '';?>"  placeholder="Telefono" id="telefono">
                </div>
        </div>

        <div class="campo enviar">

            <?php

                $textoBtn = (isset($contacto) ? "Guardar" : "Añadir");
                $accion = (isset($contacto) ? "editar" : "crear");


            ?>

            <input type="hidden" value="<?php echo $accion;?>" id="acción">
            <?php if(isset($contacto['id'])): ?>
                <input type="hidden" value="<?php echo $contacto["id"];?>" id="id">
            <?php endif;?>
            <input type="submit" value="<?php echo $textoBtn;?>" id="añadir">
        </div>