/**
 * проверка корректности json
 *
 * @param {string}
 * @return {bool}
 */
function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 * проверка корректности json
 *
 * @param {string} v_icon иконка
 * @param {string} v_title строка заголовка
 * @param {string} v_msg строка сообщения
 * @return {bool}
 */
function alerts(v_icon, v_title, v_msg) {
  Swal.fire({
    scrollbarPadding: false,
    icon: v_icon,
    title: v_title,
    text: v_msg
  })
};

function now_developer() {
  Swal.fire({
    icon: 'info',
    title: 'Вниемание',
    text: 'Данная функция находится в разработке. Пожалуйста дождитесь ее полной реализации на платформе. Благодарим за ожидание :)'
  })
};

// проверка радуокнопки платной/бесплатной услуги
function isCheck() {
      return document.querySelector('input[id=service_type_paid]:checked');
}

// показ/скрытие поля реферальных ссылок
function check_type_service_cost() {

        if (isCheck()) {

            document.getElementById('block_service_cost').style.cssText = 'display: block;';
            // if(document.getElementById('block_refer_link')) {
            //   document.getElementById('block_refer_link').style.cssText = 'display: block;';
            // }
            jQuery("#service_cost").attr('required','');
        } else {
            document.getElementById('block_service_cost').style.cssText = 'display: none;';
            document.getElementById('service_cost').value = '';
            // if(document.getElementById('block_refer_link')) {
            //   document.getElementById('block_refer_link').style.cssText = 'display: none;';
            // }
            jQuery("#service_cost").removeAttr('required');
        }
}

//установка get параметров
function setLocation(curLoc){
    try {
      history.pushState(null, null, curLoc);
      return;
    } catch(e) {}
    location.hash = '#' + curLoc;
}

// загрузка блока
function global_load_block(url,idblock,spiner,param = null) {
  var temp_param_val = null;

  if (param != null) {
    temp_param_val = getParameterByName(param);

    // console.log('');
    // console.log(url);
    // console.log(param);
    // console.log(temp_param_val);
    if ( temp_param_val != null && temp_param_val != "" ) {
      url += "&" + param + "=" + temp_param_val;
    }
  }

  // $(idblock).slideUp('fast');
  $(idblock).fadeOut(100);
    $.ajax({
        url: url,
        cache: false,
        success: function(html){
          if (spiner != undefined) { $(spiner).addClass('d-none'); }
          $(idblock).html(html);
          // $(idblock).slideDown('fast');
          $(idblock).fadeIn(100);
        },
        error: function(jqXHR, exception) {
            alerts('error', 'Внимание', 'Попробуйте позже');
        }
    });
}

// простая загрузка блока
function load_block(url,idblock) {
    $.ajax({
        url: url,
        cache: false,
        success: function(html){
          $(idblock).html(html);
        },
        error: function(jqXHR, exception) {
            alerts('error', 'Ошибка', 'Ошибка подключения, пожалуйтса попробуйте чуть позже');
        }
    });
}

// получние параметра из url
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * Отправка формы обратной связи
 *
 * @return {bool}
 */
function send_support_message() {
  event.preventDefault();
  var form = $('#form_contact')[0];
  $('#form_contact_btn').attr('disabled', 'disabled');
  var url = window.location.href;
  $.ajax({
    type: 'POST',
    url: '/ajax',
    data: $(form).serialize() + '&url='+url,
    dataType: 'json',
    success: function(result) {
      if (result.response) {
        alerts('success','Заявка успешно отправленна! Ожидайте ответа');
        $('#form_contact').trigger("reset");
      } else {
        alerts('warning',result.description);
      }
    },
    error: function(jqXHR, textStatus) {
      alert(result.description);
      $('#form_contact').disabled = false;
    },
    complete: function(jqXHR, textStatus) {
      $('#form_contact').disabled = false;
      $('#form_contact_btn').removeAttr('disabled');
    }
  });
}

/**
 * Авторизация пользователя
 *
 * @return {bool}
 */
function auth_user(url = 'https://espb.pro', token_data) {
  var form = $('#form_auth')[0];
  $('#btn_submit').disabled = true;

  var form = $(form).serialize();

  if (token_data != undefined || token_data != null) {
    form = form + "&token_data="+JSON.stringify(token_data);
  }


  $.ajax({
    type: 'POST',
    url: '/ajax?action=auth_user',
    data: form,
    dataType: 'json',
    success: function(result) {
      //console.log(result);
      if (result.response == true) {
        if (url != 'https://espb.pro' && url != 'https://new.espb.pro' && url != 'https://dev.espb.pro') {
          window.location.replace(url);
        } else {
          if (result.url != null) {
            window.location.replace(url+result.url);
          } else {
            window.location.replace(url);
          }
        }
        $('#btn_submit').disabled = false;
      } else {
        alert(result.description);
        $('#btn_submit').disabled = false;
      }
    },
    error: function(jqXHR, textStatus) {
      alert(result.description);
      $('#btn_submit').disabled = false;
    }
  });


}

/**
 * Отправка письма для сброса пароля
 *
 * @return {bool}
 */
function send_recover_pass_message() {
  var form = $('#form_recovery')[0];
  $('#btn_submit_rec').disabled = true;
  $.ajax({
    type: 'POST',
    url: '/ajax?action=send_recover_pass_message',
    data: $(form).serialize() + "&url=" + window.location.href,
    dataType: 'json',
    success: function(result) {
      console.log(result);
      if (result.response == true) {
        alert('Письмо с ссылкой для сброса пароля отправлено на указанный почтовый адрес');
        //alerts('success', '', result.description);
        $('#form_recovery').trigger("reset");
        $('#btn_submit_rec').disabled = false;
      } else {
        alert(result.description);
        $('#btn_submit_rec').disabled = false;
      }
    },
    error: function(jqXHR, textStatus) {
      alert(result.description);
      $('#btn_submit_rec').disabled = false;
    }
  });
}

/**
 * Смена пароля учетной записи
 *
 * @return {bool}
 */
function change_pass(hash) {
  var form = $('#form_new_pass')[0];
  $('#btn_submit').disabled = true;
  $.ajax({
    type: 'POST',
    url: '/ajax?action=change_pass',
    data: $(form).serialize() + "&hash="+hash,
    dataType: 'json',
    success: function(result) {
      console.log(result);
      if (result.response == true) {
        alert('Пароль успешно изменен!');
        //alerts('success', '', result.description);
        $('#form_new_pass').trigger("reset");
        $('#btn_submit').disabled = false;
        window.location.href = '/signin';
      } else {
        alert(result.description);
        $('#btn_submit').disabled = false;
      }
    },
    error: function(jqXHR, textStatus) {
      alert(textStatus);
      $('#btn_submit').disabled = false;
    }
  });
}


///////////////////////MD5 start//////////////
var MD5 = function(d) {
	d = unescape(encodeURIComponent(d));
	result = M(V(Y(X(d), 8 * d.length)));
	return result.toLowerCase();
};

function M(d) {
	for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++) _ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _);
	return f
}

function X(d) {
	for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) _[m] = 0;
	for (m = 0; m < 8 * d.length; m += 8) _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32;
	return _
}

function V(d) {
	for (var _ = "", m = 0; m < 32 * d.length; m += 8) _ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255);
	return _
}

function Y(d, _) {
	d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _;
	for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
		var h = m,
			t = f,
			g = r,
			e = i;
		f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e)
	}
	return Array(m, f, r, i)
}

function md5_cmn(d, _, m, f, r, i) {
	return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m)
}

function md5_ff(d, _, m, f, r, i, n) {
	return md5_cmn(_ & m | ~_ & f, d, _, r, i, n)
}

function md5_gg(d, _, m, f, r, i, n) {
	return md5_cmn(_ & f | m & ~f, d, _, r, i, n)
}

function md5_hh(d, _, m, f, r, i, n) {
	return md5_cmn(_ ^ m ^ f, d, _, r, i, n)
}

function md5_ii(d, _, m, f, r, i, n) {
	return md5_cmn(m ^ (_ | ~f), d, _, r, i, n)
}

function safe_add(d, _) {
	var m = (65535 & d) + (65535 & _);
	return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m
}

function bit_rol(d, _) {
	return d << _ | d >>> 32 - _
}
///////////////////////MD5 end//////////////

function logout(){
    window.location.href = '/logout';
    return
}


////перенос функций из файлов

$(".filters_mobile_btn_toggle").on('click', function() {
  if ($(".filter_panel").is(":visible")) {
    $(".filter_panel").hide();
    $(".search_result_services").show();

    // перемотка на верх
    $('body,html').animate({
      scrollTop: 0
    }, 0);

  } else {
    $(".filter_panel").show();
    $(".search_result_services").hide();
  }
});

$(".btn_clear_filter").on('click', function() {
  $("#filter_"+this.id).trigger("reset");
  $("#filter_"+this.id).find(':input').prop('checked', false);

  //если это блок с прокруткой
  var id = this.id;
  id = id.replace("clear_filter_", "");
  var coll = $(".list_items_category_"+id).children();
  for (var i = 0; i < coll.length; i++) {
    $(coll[i]).show();
  }

  //удаление id фильтров из get
  $("#filter_"+this.id).each(function(){
    $(this).find(':input').trigger("change");
  });
});

function refresh_objects(action, strurl) {
  setLocation(strurl);
  let get_params_for_block = strurl.replace('?','&');
  load_block('/ajax?action='+action+get_params_for_block, '#search_result_services');
};
