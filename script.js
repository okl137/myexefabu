document.addEventListener("DOMContentLoaded", function () {
  var root = document.documentElement;
  var themeBtn = document.getElementById("themeToggle");
  var accentBtn = document.getElementById("accentPicker");
  var picker = document.getElementById("picker");
  var downloadBtn = document.getElementById("downloadBtn");
  var changelogBtn = document.getElementById("changelogBtn");
  var yearEl = document.getElementById("year");
  var modalBackdrop = document.getElementById("modalBackdrop");
  var modalClose = document.getElementById("modalClose");
  var modalConfirm = document.getElementById("modalConfirm");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  var savedAccent = localStorage.getItem("accent");
  if (savedAccent) root.style.setProperty("--accent", savedAccent);
  var savedTheme = localStorage.getItem("theme");
  if (!savedTheme) {
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", prefersDark);
  } else {
    root.classList.toggle("dark", savedTheme === "dark");
  }
  var metaTheme = document.querySelector('meta[name="theme-color"]');
  function applyThemeColor() {
    if (!metaTheme) return;
    metaTheme.setAttribute("content", root.classList.contains("dark") ? "#0a0b15" : "#0f1020");
  }
  applyThemeColor();
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var isDark = root.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      themeBtn.setAttribute("aria-pressed", String(isDark));
      applyThemeColor();
    });
  }
  if (accentBtn) {
    accentBtn.addEventListener("click", function () {
      picker.classList.toggle("show");
    });
  }
  if (picker) {
    picker.addEventListener("click", function (e) {
      var target = e.target;
      if (!target || !target.dataset || !target.dataset.accent) return;
      root.style.setProperty("--accent", target.dataset.accent);
      localStorage.setItem("accent", target.dataset.accent);
      picker.classList.remove("show");
    });
  }
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      var url = downloadBtn.dataset.downloadUrl || "";
      if (!url) return;
      try {
        var a = document.createElement("a");
        a.href = url;
        a.setAttribute("download", "");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (e) {
        window.location.href = url;
      }
    });
  }
  function openModal() {
    modalBackdrop.classList.add("show");
    modalBackdrop.setAttribute("aria-hidden", "false");
  }
  function closeModal() {
    modalBackdrop.classList.remove("show");
    modalBackdrop.setAttribute("aria-hidden", "true");
  }
  if (changelogBtn) changelogBtn.addEventListener("click", openModal);
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalConfirm) modalConfirm.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", function (e) {
    if (e.target === modalBackdrop) closeModal();
  });
  var tilts = Array.prototype.slice.call(document.querySelectorAll(".tilt"));
  tilts.forEach(function (el) {
    var rect;
    el.addEventListener("mouseenter", function () {
      rect = el.getBoundingClientRect();
    });
    el.addEventListener("mousemove", function (e) {
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var rx = ((y / rect.height) - 0.5) * -6;
      var ry = ((x / rect.width) - 0.5) * 6;
      el.style.transform = "rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateZ(0)";
    });
    el.addEventListener("mouseleave", function () {
      el.style.transform = "translateZ(0)";
    });
  });
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      } else {
        entry.target.style.opacity = "0";
        entry.target.style.transform = "translateY(8px)";
      }
    });
  }, { threshold: 0.12 });
  Array.prototype.slice.call(document.querySelectorAll(".glass")).forEach(function (el) {
    el.style.transition = "opacity 260ms ease, transform 260ms ease";
    observer.observe(el);
  });
  Array.prototype.slice.call(document.querySelectorAll(".open-changelog")).forEach(function (btn) {
    btn.addEventListener("click", openModal);
  });
  var defaultChangelogHTML = document.getElementById("changelogBody").innerHTML;
  var modalTitle = document.getElementById("modalTitle");
  function openInfo(html) {
    modalTitle.textContent = "说明";
    document.getElementById("changelogBody").innerHTML = html;
    openModal();
  }
  if (changelogBtn) {
    changelogBtn.addEventListener("click", function () {
      modalTitle.textContent = "更新说明";
      document.getElementById("changelogBody").innerHTML = defaultChangelogHTML;
      openModal();
    });
  }
  var INFO_HTML = (function(){ return [
    '<div class="info">',
    '<h3>产品信息处理工具说明</h3>',
    '<p>该工具聚焦性能与体验，面向前后端文件处理场景，支持多文档一键同步处理，简化流程并提升效率。</p>',
    '<h4>输入</h4>',
    '<ul>',
    '<li>文件1：可添加多个，包含产品基础信息；从开发人列获取品名追加数据</li>',
    '<li>文件2：价格/对照数据（必选）</li>',
    '<li>文件3：导入表，用于启用并协助 SKU 编辑器（可选）</li>',
    '<li>文件4：新品登记上架表，用于提取 SKU 前缀并填充（可选）</li>',
    '</ul>',
    '<h4>输出</h4>',
    '<ul>',
    '<li>在指定输出文件夹生成汇总结果与优化后的文档</li>',
    '<li>自动处理包含“图片处理”“改尺寸”结构的产品文件夹：复制、展开、合并、清理与整合</li>',
    '</ul>',
    '<h4>核心功能</h4>',
    '<ul>',
    '<li>多文档汇总处理与日志跟踪，进度条与进度详情实时反馈</li>',
    '<li>价格调整：可选四舍五入策略</li>',
    '<li>SKU 编辑器：非模态窗口，支持简单二级编辑（供应商名称替换、功能优化）</li>',
    '<li>图片/视频路径处理：支持 JPG/PNG/GIF/TIFF/WebP 与 MP4/AVI/MOV/MKV/FLV/WMV/WebM/M4V/3GP</li>',
    '<li>新品登记上架表生成：检测文件4时提取 SKU 前缀并填入导入表</li>',
    '<li>后处理优化：合并相同数据、去除重复 SKU，并输出优化结果</li>',
    '<li>悬浮球模式：屏幕居中、跳动动画、对接进度，提供便捷工具入口</li>',
    '<li>主题切换与记忆：支持亮/暗色主题，快捷键 Ctrl+H；悬浮球居中 Ctrl+L</li>',
    '<li>模板下载：内置模板下载器，支持下载与解压流程</li>',
    '<li>旧版本文件隔离：扫描桌面/下载/文档中的旧版本压缩包或可执行文件，自动迁移到隐藏目录并锁定</li>',
    '</ul>',
    '<h4>使用流程</h4>',
    '<ol>',
    '<li>添加文件1与文件2（必要），按需添加文件3与文件4</li>',
    '<li>选择输出文件夹</li>',
    '<li>勾选需要的选项：价格调整、图片/视频处理、简单二级编辑、启用 SKU 编辑器</li>',
    '<li>点击“开始处理”，在工作日志与进度区查看执行状态</li>',
    '<li>如启用 SKU 编辑器，处理完成后自动打开；编辑结束后执行文档优化与改尺寸整合</li>',
    '</ol>',
    '<h4>支持格式与依赖</h4>',
    '<ul>',
    '<li>Excel：pandas、xlwings、openpyxl，支持 xls/xlsx</li>',
    '<li>压缩包：zipfile、rarfile</li>',
    '<li>媒体：Pillow 处理图片，支持常见图片/视频扩展</li>',
    '</ul>',
    '<h4>版本与主题</h4>',
    '<ul>',
    '<li>当前界面版本为 v3.3；修改同步算价修改和克重修改 支持更新后的算价计算要求</li>',
    '<li>新增多个中英文翻译接口 首次翻译失败后调用多接口协调处理翻译工作，减少翻译失败弹窗出现概率</li>',
    '</ul>',
    '</div>'
  ].join(''); })();
  Array.prototype.slice.call(document.querySelectorAll(".open-info")).forEach(function (btn) {
    btn.addEventListener("click", function () {
      openInfo(INFO_HTML);
    });
  });
  var canvas = document.getElementById("field");
  if (canvas) {
    var ctx = canvas.getContext("2d");
    var dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    var pointer = { x: 0, y: 0, active: false };
    var grid = [];
    var spacing = 56;
    var baseR = 2.2;
    var ampR = 0.9;
    var hoverAmp = 4.2 * dpr;
    var influence = 180 * dpr;
    function hexToRgb(h) {
      var s = h.replace("#", "");
      if (s.length === 3) s = s[0] + s[0] + s[1] + s[1] + s[2] + s[2];
      var n = parseInt(s, 16);
      return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    }
    var accent = getComputedStyle(root).getPropertyValue("--accent").trim() || "#6ee7ff";
    var acc = hexToRgb(accent);
    function resize() {
      var w = window.innerWidth;
      var h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      grid = [];
      var step = Math.floor(spacing * dpr);
      for (var y = step / 2; y < canvas.height; y += step) {
        for (var x = step / 2; x < canvas.width; x += step) {
          grid.push({ x: x, y: y });
        }
      }
    }
    resize();
    window.addEventListener("resize", resize);
    function updateAccent() {
      var a = getComputedStyle(root).getPropertyValue("--accent").trim();
      if (a && a !== accent) {
        accent = a;
        acc = hexToRgb(accent);
      }
    }
    var t0 = performance.now();
    function frame() {
      updateAccent();
      var t = performance.now() - t0;
      var breath = 0.5 + 0.5 * Math.sin(t * 0.0016);
      root.style.setProperty("--breath", String(breath));
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < grid.length; i++) {
        var p = grid[i];
        var dx = pointer.active ? pointer.x - p.x : 0;
        var dy = pointer.active ? pointer.y - p.y : 0;
        var d2 = dx * dx + dy * dy;
        var k = pointer.active ? Math.exp(-d2 / (2 * influence * influence)) : 0;
        var r = (baseR + breath * ampR) * dpr + k * hoverAmp;
        var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        var innerA = 0.28 + 0.28 * k;
        var midA = 0.1 + 0.32 * k;
        g.addColorStop(0, "rgba(0,0,0," + innerA.toFixed(3) + ")");
        g.addColorStop(0.55, "rgba(" + acc.r + "," + acc.g + "," + acc.b + "," + midA.toFixed(3) + ")");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    document.addEventListener("pointermove", function (e) {
      root.style.setProperty("--mx", e.clientX + "px");
      root.style.setProperty("--my", e.clientY + "px");
      pointer.x = e.clientX * dpr;
      pointer.y = e.clientY * dpr;
      pointer.active = true;
    });
    document.addEventListener("pointerleave", function () {
      pointer.active = false;
    });
    document.addEventListener("pointerdown", function (e) {
      root.style.setProperty("--mx", e.clientX + "px");
      root.style.setProperty("--my", e.clientY + "px");
      pointer.x = e.clientX * dpr;
      pointer.y = e.clientY * dpr;
      pointer.active = true;
    });
  }
});
