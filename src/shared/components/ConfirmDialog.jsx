import Swal from "sweetalert2";

const ConfirmDialog = async ({ title, text, onConfirm }) => {
  const result = await Swal.fire({
    title: title || "¿Estás seguro?",
    text: text || "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminarla!",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    onConfirm();
  }
};

export default ConfirmDialog;
