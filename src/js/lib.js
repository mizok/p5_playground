export function preventIEError() {
  // 預防IE出錯
  if (window.console === undefined) { let em = function () { }; window.console = { log: em, debug: em, info: em, warn: em }; }
  if (console.log === undefined || console.log === 'undefined') { let em = function () { }; console.log = em; }
  if (console.debug === undefined || console.debug === 'undefined') { let em = function () { }; console.debug = em; }
  if (console.info === undefined || console.info === 'undefined') { let em = function () { }; console.info = em; }
  if (console.warn === undefined || console.warn === 'undefined') { let em = function () { }; console.warn = em; }
  // end : 預防IE出錯
}


export function includeHTML(cb) {
  let z, i, elmnt, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute("include-html");
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) { elmnt.innerHTML = this.responseText; }
          if (this.status === 404) { elmnt.innerHTML = "Page not found."; }
          elmnt.removeAttribute("include-html");
          includeHTML(cb);
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
  if (cb) cb();
}



export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
}


// 頁碼產生插件
export function genPagination(config) {
  // 將呼叫時填入的選項合併入預設 option 組態
  var conf = $.extend({
    totalPage: 0,
    currentPageth: 1,
    displayType: 'DEFAULT', // DEFAULT | SELECT
    hasGoToPage: false,
    maxPage: 3,
    ulClass: '',
    nav: {}
  },
    config//預設 option 組態
  );
  // 將option組態中的屬性另存為變數
  var target = conf.target,
    totalPage = conf.pageInfo.totalPage,
    currentPageth = conf.pageInfo.currentPageth,
    hasGoToPage = conf.hasGoToPage,
    displayType = conf.displayType,
    maxPage = conf.maxPage,
    ulClass = conf.ulClass,
    callback = conf.getPageInfoCallBackFn;

  // 初始化植入目標DOM Ele
  target.empty();
  // 填入頁碼外殼DOM Ele
  target.append('<div class="page-control"></div>');
  // 抓取剛剛植入的頁碼外殼DOM Ele並存入變數
  let $pagecontrol = target.find('.page-control').attr('displayType', displayType);

  //植入用來放置所有頁數Ele的ul，並且若設定的總頁數大於每一輪需要顯示的頁數，則長出prev/next

  if (displayType === 'DEFAULT') {
    let control = '';
    if (totalPage > maxPage) {
      control = '<a href="#" class="prev"></a>' + '<ul class="pageNumbers ' + ulClass + '"></ul>' + '<a href="#" class="next"></a>';
    } else {
      control = '<ul class="pageNumbers ' + ulClass + '"></ul>';
    }
    $pagecontrol.append(control);
  }

  // 如果當前指定產生的頁碼為SELECT模式
  if (displayType === 'SELECT') {
    var selectPageDiv = $('<select class="pageNumberSelect"></select>');
    selectPageDiv.on('change', function () {
      _refreshPageNumber({
        target: target,
        totalPage: totalPage,
        currentPageth: currentPageth,
        displayType: displayType,
        callback: callback,
      });
    });
    $pagecontrol.append(selectPageDiv);
  } // end if: SELECT

  // 如果當前指定產生的頁碼有跳頁功能，則植入這個功能的相關Dom Ele
  if (hasGoToPage) {
    if (displayType === 'DEFAULT') {
      $(target).find('.page-control').addClass('hasGoToPage');
      var gotoPageDiv = $('<div class="page-jump-control">'
        + '<div class="page-jump-descrp">直接到第 '
        + '<select class="gotopage"></select>' + ' 頁</div></div>').appendTo(target);
      gotoPageDiv.find('select.gotopage').on('change', function () {
        target.find('[page="' + $(this).val() + '"]').trigger('click');

      });
    }
    else {
      console.warn('頁碼插件：只有預設模式支援跳頁功能');
    }
  } // end if: hasGoToPage 

  // 如果當前指定產生的頁碼有自定義next/prev dom結構的功能，則在prev/next內部植入自定義的Dom Ele
  if (hasProp(conf, 'nav')) {


    var prev_html = hasProp(conf.nav, 'prev') ? conf.nav.prev : '上一頁';
    var next_html = hasProp(conf.nav, 'next') ? conf.nav.next : '下一頁';

    $pagecontrol.find('.prev').html(prev_html);
    $pagecontrol.find('.next').html(next_html);
  }


  // 建立全頁面archive
  let archivePage = [];
  for (let i = 1; i <= totalPage; i++) {

    if (displayType === 'DEFAULT') {
      //如為預設模式，則先將所有頁面存取到archivePage變數內
      let singlePage = $('<li class="numberOfPage" page="' + i + '"><a href="#">' + i + '</a></li>')

      archivePage.push(singlePage);

      //如果有跳頁功能，則長出跳頁select ele內的全部option
      if (hasGoToPage) {
        $(target).find('select.gotopage').append('<option value="' + i + '">' + i + '</option');
      }
    }

    if (displayType === 'SELECT') {
      //如為SELECT模式，則先將所有頁面option植入select ele內
      $(target).find('select.pageNumberSelect').append('<option value="' + i + '">第 ' + i + ' 頁</option');
    }
  }

  //初始化植入頁面+綁定各頁面事件
  _refreshPageNumber({
    target: target,
    totalPage: totalPage,
    currentPageth: currentPageth,
    displayType: displayType,
    hasGoToPage: hasGoToPage,
    callback: callback,
    maxPage: maxPage
  });
  //清空並重新植入新的一批頁碼+綁定各頁碼點擊---專用函數
  function _refreshPageNumber(conf) {
    var _target = conf.target,
      _totalPage = conf.totalPage,
      _currentPageth = conf.currentPageth,
      _hasGoToPage = conf.hasGoToPage,
      _maxPage = conf.maxPage,
      _displayType = conf.displayType,
      _calMaxPage = maxPage % 2 === 0 ? maxPage - 1 : maxPage,
      _callback = conf.callback === null ? null : callback;

    if (_displayType === 'DEFAULT') {
      let number_ul = target.find('.pageNumbers');
      number_ul.empty();
      if (_currentPageth - ((_calMaxPage - 1) / 2) <= 1) {
        for (let i = 0; i < _maxPage; i++) {
          let unit = archivePage[i];
          if (unit) {
            number_ul.append(unit.clone());
          }
        }
      } else if (_currentPageth + ((_calMaxPage - 1) / 2) >= _totalPage) {
        for (let i = 0; i < maxPage; i++) {
          let unit = archivePage[_totalPage - _maxPage + (i)];
          if (unit) {
            number_ul.append(unit.clone());
          }

        }
      } else {
        for (let i = 0; i < _maxPage; i++) {
          let unit = archivePage[(i + _currentPageth - 1 - ((_calMaxPage - 1) / 2))];
          if (unit) {
            number_ul.append(unit.clone());
          }
        }
      }
      // 滑鼠點擊事件
      number_ul.find('[page]').on('click', function (e) {
        e.preventDefault();
        let thisPage = parseInt($(this).attr('page'));
        if (thisPage !== currentPageth) {
          currentPageth = thisPage;
          _refreshPageNumber({
            target: _target,
            totalPage: _totalPage,
            currentPageth: thisPage,
            displayType: _displayType,
            hasGoToPage: _hasGoToPage,
            callback: _callback,
            maxPage: _maxPage
          });
          if (hasGoToPage) {
            target.find('select.gotopage').val(currentPageth);
          }
        }
      });
      //TODO:滑鼠長按事件

      number_ul.find('[page="' + _currentPageth + '"]').addClass('active');
    }

    if (displayType === 'SELECT') {
      target.find('select.pageNumberSelect').val(currentPageth);
    }
    if (_callback) {
      _callback(currentPageth);
    }

  }
  //若本次呼叫植入的pagination具有跳頁功能，則雙向綁定跳頁事件
  if (hasGoToPage && displayType === 'DEFAULT') {
    target.find('select.gotopage').val(currentPageth);
    target.find('select.gotopage').on('change', function () {
      let val = parseInt($(this).val());
      _refreshPageNumber({
        target: target,
        totalPage: totalPage,
        currentPageth: val,
        displayType: displayType,
        hasGoToPage: hasGoToPage,
        callback: callback,
        maxPage: maxPage
      });
      currentPageth = val;
    })
  }
  //綁定prev/next事件
  $pagecontrol.find('.prev,.next').click(function (e) {
    e.preventDefault();
    let key = $(e.target).attr('class');
    if (key === 'prev') {
      currentPageth = currentPageth - 1 > 0 ? currentPageth - 1 : currentPageth;
    }
    else if (key === 'next') {
      currentPageth = currentPageth + 1 <= totalPage ? currentPageth + 1 : currentPageth;
    }
    _refreshPageNumber({
      target: target,
      totalPage: totalPage,
      currentPageth: currentPageth,
      displayType: displayType,
      hasGoToPage: hasGoToPage,
      callback: callback,
      maxPage: maxPage
    });
    if (hasGoToPage) {
      target.find('select.gotopage').val(currentPageth);
    }
  });
  //若本次呼叫植入的pagination為SELECT模式，則綁定onChange事件
  if (displayType === 'SELECT') {
    target.find('select.pageNumberSelect').on('change', function () {
      let val = parseInt($(this).val());
      currentPageth = val;
    });
  }
} // end pagination function
//===========   GardenUtils function: end===========//



//=========== tool function ===============//
export function getWindowSize() {
  var body = $('body');
  var shadow_existence = $('.shadow-null').length;
  if (!shadow_existence) {
    var shadow_null = $('<div class="shadow-null"></div>').css({
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': '-9999999999999999999999999999999',
      'pointer-events': 'none'
    }).clone();
    body.prepend(shadow_null);
  }
  let size = [$('.shadow-null').width(), $('.shadow-null').height()];
  return size;
}
export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
export function throttle(func, threshhold) {
  var last, timer;
  if (threshhold) threshhold = 250;
  return function () {
    var context = this
    var args = arguments
    var now = +new Date()
    if (last && now < last + threshhold) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        func.apply(context, args)
      }, threshhold)
    } else {
      last = now
      func.apply(context, args)
    }
  }
}

export function hasProp(target, prop) {
  return Object.prototype.hasOwnProperty.call(target, prop);
}

//=========== tool function:end ===============//









