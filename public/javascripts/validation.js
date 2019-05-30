$('#threadComment').submit(function (e) {
    $('.alert.alert-danger').hide();
    if (!$('input#threadComment').val()) {
      if ($('.alert.alert-danger').length) {
        $('.alert.alert-danger').show();
      } else {
        $(this).prepend('<div role="alert" class="alert alert-danger">Hey, comment required, try again foo </div>');
      }
      return false;
    }
  });