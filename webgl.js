
let init = () => {
    let canvas = document.getElementById("webgl-surface");
    let gl = canvas.getContext("webgl");
    // Check if gl context supported else try with experimental
    if(!gl){
        console.log('using experimental-webgl');
        gl = canvas.getContext("experimental-webgl");
    }
    if(!gl){
        alert("Web gl is not supported on current browser");
    }
    gl.clearColor(0.5,0.5,0.5,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}
init();