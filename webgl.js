// Currently storing the shaders in same js file




let vertexShaderText = [
    'precision mediump float;',
    'attribute vec3 vertPosition;',
    'attribute vec3 vertColor;',
    'varying vec3 fragColor;',
    'uniform mat4 mWorld;',
    'uniform mat4 mView;',
    'uniform mat4 mProj;',
    'void main()',
    '{',
    'gl_Position = mProj * mView * mWorld *vec4(vertPosition,1.0);',
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


let initTriangle = () => {
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
    if(!gl.getShaderParameter(vertexShader,gl.COMPILE_STATUS)){
        console.error('Error in vertex shader',gl.getShaderInfoLog(vertexShader));
        return;
    }
    if(!gl.getShaderParameter(fragmentShader,gl.COMPILE_STATUS)){
        console.error('Error in fragment Shader',gl.getShaderInfoLog(fragmentShader));
        return;
    }
    // Create basic program
    let program = gl.createProgram();
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);
    gl.linkProgram(program);
    gl.validateProgram(program);

    // Buffer

    let triangleVert = [
        0.0,0.5,0.0, 1.0,1.0,0.0,
        -0.5,-0.5,0.0,0.7,0.0,1.0,
        0.5,-0.5,0.0,0.0,0.0,0.8,
    ];
    let trianlgeVertBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,trianlgeVertBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVert),gl.STATIC_DRAW);
    let positionAttribLocation = gl.getAttribLocation(program,'vertPosition');
    let colorAttribLocation = gl.getAttribLocation(program,'vertColor');
    gl.vertexAttribPointer(
        positionAttribLocation,
        3, // elements in each attrib
        gl.FLOAT,
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT,
        0
    );
    gl.vertexAttribPointer(
        colorAttribLocation,
        3, // elements in each attrib
        gl.FLOAT,
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT,
    );
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    gl.useProgram(program);

    let matWorldUniformLocation = gl.getUniformLocation(program,'mWorld');
    let matViewUniformLocation = gl.getUniformLocation(program,'mView');
    let matProjUniformLocation = gl.getUniformLocation(program,'mProj');

    let worldMat = new Float32Array(16);
    let viewMat = new Float32Array(16);
    let projMat = new Float32Array(16);

    glMatrix.mat4.identity(worldMat);
    glMatrix.mat4.lookAt(viewMat,[0,0,-3],[0,0,0],[0,1,0]);
    glMatrix.mat4.perspective(projMat, glMatrix.glMatrix.toRadian(45),canvas.width/canvas.clientHeight,0.1,1000.0);

    gl.uniformMatrix4fv(matWorldUniformLocation,gl.FALSE,worldMat);
    gl.uniformMatrix4fv(matViewUniformLocation,gl.FALSE,viewMat);
    gl.uniformMatrix4fv(matProjUniformLocation,gl.FALSE,projMat);

    // Rendering Loop
    let identityMatrix = new Float32Array(16);
    glMatrix.mat4.identity(identityMatrix);
    let angle = 0;
    let loop = () => {
        angle = performance.now() / 1000 /6 * 2 * Math.PI;
        gl.drawArrays(gl.TRIANGLES,0,3);
        glMatrix.mat4.rotate(worldMat,identityMatrix,angle,[0.5,0.5,0]);
        gl.uniformMatrix4fv(matWorldUniformLocation,gl.FALSE,worldMat);
        gl.clearColor(0.5,0.5,0.5,1.0);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT );
        gl.drawArrays(gl.TRIANGLES,0,3);
        requestAnimationFrame(loop);

    };
    requestAnimationFrame(loop);
   gl.drawArrays(gl.TRIANGLES, 0, 3); //Last param is number of points
}

let initCube = () => {
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
initTriangle();



