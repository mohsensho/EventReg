/*eslint-disable*/
$(document).ready(() => {
  $(".tabs").tabs();
  $("#shift-picker").on("click", "input:checkbox", function(event) {
    event.preventDefault();
    $.ajax({
      method: "PUT",
      url: `/api/admin/${$(this).attr("data-checktype")}`,
      data: { id: parseInt($(this).attr("data-id"), 10) }
    })
      .then(response => {
        $(this).prop("checked", true);
        $(this).prop("disabled", true);
        if ($(this).attr("data-checktype") === "checkedIn") {
          $(`input[data-checktype="checkedOut"][data-id="${$(this).attr("data-id")}"]`).prop("disabled", false)
        }
      })
      .fail(err => {
        M.toast({ html: "Something went wrong" });
      });
  });
});
