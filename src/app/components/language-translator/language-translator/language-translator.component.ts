import { AfterViewInit, Component, OnInit } from '@angular/core';
declare var google: any;
declare var $: any;
declare var window: any;
declare var document: any;

@Component({
  selector: 'app-language-translator',
  templateUrl: './language-translator.component.html',
  styleUrls: ['./language-translator.component.css']
})
export class LanguageTranslatorComponent implements OnInit, AfterViewInit {

  loadAPI: Promise<any>;
  havetoken = false;

  constructor() {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
  }

  ngOnInit(): void {
    document.getElementsByTagName('body').scrolling = 'yes';

    var token = sessionStorage.getItem('token');

    if (token == null || token == '' || token == undefined) {
      var root = document.getElementsByTagName( 'body' )[0]; 
      root.setAttribute( 'class', 'notokencls' );
    }else{
      var root = document.getElementsByTagName( 'body' )[0];
      root.setAttribute( 'class', 'hastokencls' );
    }
  }

  ngAfterViewInit() {
    // function googleTranslateElementInit() {
    //   new google.translate.TranslateElement({
    //     pageLanguage: 'en',
    //     layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    //   }, 'google_translate_element');
    // }

    // (function () {
    //   var gtConstEvalStartTime = new Date(); function d(b) { var a = document.getElementsByTagName("head")[0]; a || (a = document.body.parentNode.appendChild(document.createElement("head"))); a.appendChild(b) } function _loadJs(b) { var a = document.createElement("script"); a.type = "text/javascript"; a.charset = "UTF-8"; a.src = b; d(a) } function _loadCss(b) { var a = document.createElement("link"); a.type = "text/css"; a.rel = "stylesheet"; a.charset = "UTF-8"; a.href = b; d(a) } function _isNS(b) { b = b.split("."); for (var a = window, c = 0; c < b.length; ++c)if (!(a = a[b[c]])) return !1; return !0 }
    //   function _setupNS(b) { b = b.split("."); for (var a = window, c = 0; c < b.length; ++c)a.hasOwnProperty ? a.hasOwnProperty(b[c]) ? a = a[b[c]] : a = a[b[c]] = {} : a = a[b[c]] || (a[b[c]] = {}); return a } window.addEventListener && "undefined" == typeof document.readyState && window.addEventListener("DOMContentLoaded", function () { document.readyState = "complete" }, !1);
    //   if (_isNS('google.translate.Element')) { return } (function () { var c = _setupNS('google.translate._const'); c._cest = gtConstEvalStartTime; gtConstEvalStartTime = undefined; c._cl = 'en'; c._cuc = 'googleTranslateElementInit'; c._cac = ''; c._cam = ''; c._ctkk = eval('((function(){var a\x3d814543065;var b\x3d2873925779;return 414629+\x27.\x27+(a+b)})())'); var h = 'translate.googleapis.com'; var s = (true ? 'https' : window.location.protocol == 'https:' ? 'https' : 'http') + '://'; var b = s + h; c._pah = h; c._pas = s; c._pbi = b + '/translate_static/img/te_bk.gif'; c._pci = b + '/translate_static/img/te_ctrl3.gif'; c._pli = b + '/translate_static/img/loading.gif'; c._plla = h + '/translate_a/l'; c._pmi = b + '/translate_static/img/mini_google.png'; c._ps = b + '/translate_static/css/translateelement.css'; c._puh = 'translate.google.com'; _loadCss(c._ps); _loadJs(b + '/translate_static/js/element/main.js'); })();
    // })();

    setTimeout(() => {
      googleTranslateElementInit()
    }, 1000);

    function googleTranslateElementInit() {
      new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
    }

    (function () {
      var gtConstEvalStartTime = new Date(); function d(b) { var a = document.getElementsByTagName("head")[0]; a || (a = document.body.parentNode.appendChild(document.createElement("head"))); a.appendChild(b) } function _loadJs(b) { var a = document.createElement("script"); a.type = "text/javascript"; a.charset = "UTF-8"; a.src = b; d(a) } function _loadCss(b) { var a = document.createElement("link"); a.type = "text/css"; a.rel = "stylesheet"; a.charset = "UTF-8"; a.href = b; d(a) } function _isNS(b) { b = b.split("."); for (var a = window, c = 0; c < b.length; ++c)if (!(a = a[b[c]])) return !1; return !0 }
      function _setupNS(b) { b = b.split("."); for (var a = window, c = 0; c < b.length; ++c)a.hasOwnProperty ? a.hasOwnProperty(b[c]) ? a = a[b[c]] : a = a[b[c]] = {} : a = a[b[c]] || (a[b[c]] = {}); return a } window.addEventListener && "undefined" == typeof document.readyState && window.addEventListener("DOMContentLoaded", function () { document.readyState = "complete" }, !1);
      if (_isNS('google.translate.Element')) { return } (function () { var c = _setupNS('google.translate._const'); c._cest = gtConstEvalStartTime; gtConstEvalStartTime = undefined; c._cl = 'en'; c._cuc = 'googleTranslateElementInit'; c._cac = ''; c._cam = ''; c._ctkk = eval('((function(){var a\x3d814543065;var b\x3d2873925779;return 414629+\x27.\x27+(a+b)})())'); var h = 'translate.googleapis.com'; var s = (true ? 'https' : window.location.protocol == 'https:' ? 'https' : 'http') + '://'; var b = s + h; c._pah = h; c._pas = s; c._pbi = b + '/translate_static/img/te_bk.gif'; c._pci = b + '/translate_static/img/te_ctrl3.gif'; c._pli = b + '/translate_static/img/loading.gif'; c._plla = h + '/translate_a/l'; c._pmi = b + '/translate_static/img/mini_google.png'; c._ps = b + '/translate_static/css/translateelement.css'; c._puh = 'translate.google.com'; _loadCss(c._ps); _loadJs(b + '/translate_static/js/element/main.js'); })();
    })();

  //   $(window).scroll(function() {
  //     $('.goog-te-menu-frame').css('display', 'none');
  // });

    $('document').ready(function () {

      $(".goog-te-menu-frame").hide();


      // RESTYLE THE DROPDOWN MENU
      $('#google_translate_element').on("click", function () {
        var $head = $(".goog-te-menu-frame").contents().find("head");
        var url = "https://gofounders.net/assests/meterial/assets/css/material-dashboard.css";
        $head.append($("<link/>", { rel: "stylesheet", href: url, type: "text/css" }));


        var heads = $(".goog-te-menu-frame").contents().find("head");
        var css = '<style type="text/css">' +
          '.ps-scrollbar-x-rail{display:block !important;opacity:1 !important;}' + '.goog-te-menu2-item div, .goog-te-menu2-item:link div{background:transparent; color: #FFF;}' +
          '.goog-te-menu2-item div:hover, .goog-te-menu2-item:visited div, .goog-te-menu2-item:active div{background:transparent;color:#FFF}.goog-te-menu2-item-selected div{color:#fff !important}.ps-scrollbar-x' +
          '{background-color:#FFF !important}.goog-te-menu-frame{padding: 20px;border:none;border-radius: 4px;background: rgb(0, 188, 212);max-width:50%;box-sizing:border-box;height:auto;' +
          'overflow-x: scroll;position:relative}body{background: transparent !important;};' +
          '</style>';

        $(heads).append(css);

        $(".goog-te-menu-frame").contents().find('.goog-te-menu2').perfectScrollbar();
        // Change list background
        $(".goog-te-menu-frame").contents().find(".goog-te-menu2-item div, .goog-te-menu2-item:link div")
          .css({

          });

        $("iframe").contents().find(".goog-te-menu2-item div:hover, .goog-te-menu2-item:visited div, .goog-te-menu2-item:active div")
          .css({

          });

        // Change menu's padding


        $(".goog-te-menu-frame").contents().find('.ps-scrollbar-x').css('width', '100px');

        // Change menu's padding

        // Change the width of the languages
        $(".goog-te-menu-frame").contents().find('.goog-te-menu2, .goog-te-menu2 *').css('box-sizing', 'border-box');

        // Change hover effects
        $(".goog-te-menu-frame").contents().find(".goog-te-menu2-item div").hover(function () {

        }, function () {

        });

        // Change Google's default blue border
        $(".goog-te-menu-frame").contents().find('.goog-te-menu2').css({
          "padding": " 20px",
          "border": "none",
          "border-radius": "4px",
          "background": "rgb(0, 188, 212)",
          "width": "100%",
          "box-sizing": "border-box",
          "height": "auto",
          "overflow-x": "scroll",
          "position": "relative"
        });



        // Change the iframe's box shadow
        $(".goog-te-menu-frame").css(
          'box-shadow', '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.3)'
        );
      });


    });
  }

  public loadScript() {
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("perfect-scrollbar")) {
        isFound = true;
      }
    }

    if (!isFound) {
      var dynamicScripts = ["assets/js/plugins/perfect-scrollbar.jquery.min.js"];

      for (var i = 0; i < dynamicScripts.length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }

    }
  }

}
