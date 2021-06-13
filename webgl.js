// Currently storing the shaders in same js file

let vertexShaderText = [
    'precision mediump float;',
    'attribute vec2 vertPosition;',
    'attribute vec3 vertColor;',
    'varying vec3 fragColor;',
    'void main()',
    '{',
    'gl_Position = vec4(vertPosition,0.0,1.0);',
    'fragColor = vertColor;',
    '}'
].join('\n');

let fragmentShaderText = [
    'precision mediump float;',
    'varying vec3 fragColor;',
    'void main()',
    '{',
    'gl_FragColor = vec4(fragColor,1.0);',
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

    // Create basic program
    let program = gl.createProgram();
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);
    gl.linkProgram(program);
    gl.validateProgram(program);

    // Buffer

    let triangleVert = [
        0.0,0.5, 1.0,1.0,0.0,
        -0.5,-0.5,0.7,0.0,1.0,
        0.5,-0.5,0.0,0.0,0.8,
    ];
    let trianlgeVertBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,trianlgeVertBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVert),gl.STATIC_DRAW);
    let positionAttribLocation = gl.getAttribLocation(program,'vertPosition');
    let colorAttribLocation = gl.getAttribLocation(program,'vertColor');
    gl.vertexAttribPointer(
        positionAttribLocation,
        2, // elements in each attrib
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0
    );
    gl.vertexAttribPointer(
        colorAttribLocation,
        3, // elements in each attrib
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT,
    );
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    // Rendering Loop
   gl.useProgram(program);
   gl.drawArrays(gl.TRIANGLES, 0, 3); //Last param is number of points
}
init();



