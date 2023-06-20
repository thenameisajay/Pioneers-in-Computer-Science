window.onload = function() {
    setTimeout(function() {
      VANTA.DOTS({
        el: "#body",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x0,
        backgroundColor: 0xfafafa,
        size: 4.2,
        spacing: 53.0,
        showLines: false,
      });
    }); 
  };
  