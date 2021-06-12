// Currently storing the shaders in same js file

let vertexShaderText = [
    'precision mediump float;',
    'attribute vec2 vertPosition;',
    'void main()',
    '{',
    'gl_Position = vec4(vertPosition,0.0,1.0);',
    '}'
].join('\n');

let fragmentShaderText = [
    'precision mediump float;',
    'void main()',
    '{',
    'gl_FragColor = vec4(1.0,0.0,0.0,1.0);',
    '}'
].join('\n');


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
    // Add a basic vertex and fragment shader
    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertexShader,vertexShaderText);
    gl.shaderSource(fragmentShader,fragmentShaderText);
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
}
init();



