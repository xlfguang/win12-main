$(document).ready(function () {
  $.i18n()
    .load({
      en: "./lang/en.json",
      zh: "./lang/zh.json",
    })
    .done(function () {
      $.i18n().locale = "en";

      // 遍历所有含有 'data-i18n' 属性的元素
      $("[data-i18n]").each(function () {
        // 获取翻译的键
        var key = $(this).data("i18n");
        // 设置元素的文本为翻译的文本
        $(this).text($.i18n(key));
      });

      // 遍历所有含有 'data-i18n-placeholder' 属性的元素
      $("[data-i18n-placeholder]").each(function () {
        // 获取翻译的键
        var key = $(this).data("i18n-placeholder");
        // 设置元素的 placeholder 为翻译的文本
        $(this).attr("placeholder", $.i18n(key));
      });
    });
});
