$(document).ready(function () {
  // variables globales del archivo
  let valueName = "";
  let valuePhone = "";
  let valueContactType = "";

  //Eventos

  $("#btn-clear").on("click", function () {
    Clear();
  });

  $("#btn-save").on("click", function () {
    CreateContactType();
  });

  $("#contact-container").on("click", ".btn-delete", function () {
    const mainContainer = $(this).parent().parent().parent();

    $.confirm({
      title: "Estas seguro que deseas eliminar este contacto?",
      content: "",
      buttons: {
        cancel: {
          text: "Cancelar",
          btnClass: "btn btn-danger",
          action: function () {},
        },
        confirm: {
          text: "Aceptar",
          btnClass: "btn btn-success",
          action: function () {
            mainContainer.remove();
          },
        },
      },
    });

  });

  //Funciones
  function Clear() {
    $("#name").val("").removeClass("input-error").focus();
    $("#phone").val("").removeClass("input-error");
    $("#contact-type").val("").removeClass("input-error");

    valueName = "";
    valuePhone = "";
    valueContactType = "";
  }

  function CreateContactType() {
    valueName = $("#name").val();
    valuePhone = $("#phone").val();
    valueContactType = $("#contact-type").val();

    if (Validate()) {
      GenerateHtmlContact();
      Clear();

        toastr.success(
          "Se ha creado con exito",
          "Notificacion",
          {
            TimeOut: 1500,
            positionClass: "toast-top-center",
          }
        );
    } else {
      toastr.error("Debe completa toda la info", "Oops ha ocurrido un error", {
        TimeOut: 1500,
        positionClass: "toast-top-center"
      });
    }
  }

  function GenerateHtmlContact() {
    const htmlcontact = ` <div class="col-md-4">
          <div class="card">
            <div class="card-header bg-success text-white">
              <h5 class="card-title">Contacto - ${valueContactType}</h5>
            </div>

            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Nombre: ${valueName}</li>
                <li class="list-group-item">Telefono: ${valuePhone}</li>
              </ul>
              <button class="btn btn-danger float-end btn-delete">Eliminar</button>
            </div>
          </div>
        </div>
    `;

    $("#contact-container").append(htmlcontact);
  }

  function Validate() {
    let isValid = true;

    if (valueName == "" || valueName == undefined || valueName == null) {
      isValid = false;
      $("#name").addClass("input-error");
    } else {
      $("#name").removeClass("input-error");
    }

    if (valuePhone == "" || valuePhone == undefined || valuePhone == null) {
      isValid = false;
      $("#phone").addClass("input-error");
    } else {
      $("#phone").removeClass("input-error");
    }

    if (
      valueContactType == "" ||
      valueContactType == undefined ||
      valueContactType == null
    ) {
      isValid = false;
      $("#contact-type").addClass("input-error");
    } else {
      $("#contact-type").removeClass("input-error");
    }
    return isValid;
  }
});
