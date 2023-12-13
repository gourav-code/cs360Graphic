
function drawScene(){
  // initialize shader program
  shaderProgram = initShaders(vertexShaderCodePhong, fragShaderCodePhong);
  gl.enable(gl.SCISSOR_TEST);
  
  //get locations of attributes and uniforms declared in the shader
  aPositionLocation = gl.getAttribLocation(shaderProgram, "aPosition");
  uMMatrixLocation = gl.getUniformLocation(shaderProgram, "uMMatrix");
  uVMatrixLocation = gl.getUniformLocation(shaderProgram, "uVMatrix");
  uPMatrixLocation = gl.getUniformLocation(shaderProgram, "uPMatrix");
  vertexNormalLocation = gl.getAttribLocation(shaderProgram, "vertexNormal");
  uColorLocation = gl.getUniformLocation(shaderProgram, "objColor");
  uLightDirectionLocation = gl.getUniformLocation(shaderProgram, "lightDirection");
  viewVectorShaderLocation = gl.getUniformLocation(shaderProgram, "viewVectorShader");
  specularReflectionAngleLocation = gl.getUniformLocation(shaderProgram, "alpha");
  //enable the attribute arrays
  gl.enableVertexAttribArray(aPositionLocation);
  gl.enableVertexAttribArray(vertexNormalLocation);
  gl.enable(gl.DEPTH_TEST);
  //initialize buffers for the square
  
  initSphereBuffer();
  gl.viewport(0, 0, 400, 800);
  gl.scissor(0, 0, 400, 800);
  gl.clearColor(0.9, 0.9, 0.95, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  mat4.identity(vMatrix);

  vMatrix = mat4.lookAt(eyePos, COI, viewUp, vMatrix);
  viewVector = vec3.subtract(COI,eyePos,viewVector);
  //set up perspective projection matrix
  mat4.identity(pMatrix);
  pMatrix = mat4.perspective(50, 1.0, 0.1, 1000, pMatrix);

  //set up the model matrix
  mat4.identity(mMatrix);
  // transformations applied here on model matrix
  mMatrix = mat4.scale(mMatrix, [0.27,0.3,0.3]);
  mMatrix = mat4.translate(mMatrix,[-2.0,0.3,0]);
  var color = [1.0,1.0,0.0,1];
  drawSphere(color);

  spVerts.splice(0, spVerts.length);
  spIndicies.splice(0, spIndicies.length);
  spNormals.splice(0, spNormals.length);
  

    //-------------------------------------------------Gourand Shading-------------------------------------------------

  shaderProgram = initShaders(vertexShaderCodeGourand, fragShaderCodeGourand);
  //get locations of attributes and uniforms declared in the shader
  aPositionLocation = gl.getAttribLocation(shaderProgram, "aPosition");
  uMMatrixLocation = gl.getUniformLocation(shaderProgram, "uMMatrix");
  uVMatrixLocation = gl.getUniformLocation(shaderProgram, "uVMatrix");
  uPMatrixLocation = gl.getUniformLocation(shaderProgram, "uPMatrix");
  vertexNormalLocation = gl.getAttribLocation(shaderProgram, "vertexNormal");
  uColorLocation = gl.getUniformLocation(shaderProgram, "objColor");
  uLightDirectionLocation = gl.getUniformLocation(shaderProgram, "lightDirection");
  viewVectorShaderLocation = gl.getUniformLocation(shaderProgram, "viewVectorShader");
  specularReflectionAngleLocation = gl.getUniformLocation(shaderProgram, "alpha");
  //enable the attribute arrays
  gl.enableVertexAttribArray(aPositionLocation);
  gl.enableVertexAttribArray(vertexNormalLocation);
  gl.enable(gl.DEPTH_TEST);

  //initialize buffers for the square
  initCubeBuffer();
  initSphereBuffer();
  gl.viewport(410, 0, 900, 800);
  gl.scissor(410, 0, 900, 800);
  gl.clearColor(0.9, 0.9, 0.95, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
    eyePos = [0.0, 0.0, 2.0];
    COI = [0.0, 0.0, 0.0];
    viewVector = vec3.create();
    viewUp = [0.0, 1.0, 0.0];
    light = [-0.10, 0.0, 0.0];
    //range -1to 1
    // set up the view matrix, multiply into the modelview matrix
 
  viewVector = vec3.subtract(COI,eyePos,viewVector);


  mat4.identity(vMatrix);

  vMatrix = mat4.lookAt(eyePos, COI, viewUp, vMatrix);
  //set up perspective projection matrix
  mat4.identity(pMatrix);
  mat4.perspective(50, 1.0, 0.1, 1000, pMatrix);

  //set up the model matrix
  mat4.identity(mMatrix);
  mMatrix = mat4.scale(mMatrix, [0.27,0.3,0.3]);
  mMatrix = mat4.translate(mMatrix,[-2.0,0.3,0]);
  var color = [1.0,1.0,0.0,1];
  drawSphere(color);

  spVerts.splice(0, spVerts.length);
  spIndicies.splice(0, spIndicies.length);
  spNormals.splice(0, spNormals.length);

  //-----------------------------------Flat Shading------------------------------------------------------

  shaderProgram = initShaders(vertexShaderCodeFlat, fragShaderCodeFlat);
  //get locations of attributes and uniforms declared in the shader
  aPositionLocation = gl.getAttribLocation(shaderProgram, "aPosition");
  uMMatrixLocation = gl.getUniformLocation(shaderProgram, "uMMatrix");
  uVMatrixLocation = gl.getUniformLocation(shaderProgram, "uVMatrix");
  uPMatrixLocation = gl.getUniformLocation(shaderProgram, "uPMatrix");
  uColorLocation = gl.getUniformLocation(shaderProgram, "objColor");
  uLightDirectionLocation = gl.getUniformLocation(shaderProgram, "lightDirection");
  viewVectorShaderLocation = gl.getUniformLocation(shaderProgram, "viewVectorShader");
  specularReflectionAngleLocation = gl.getUniformLocation(shaderProgram, "alpha");
  //enable the attribute arrays
  gl.enableVertexAttribArray(aPositionLocation);
//   gl.enableVertexAttribArray(vertexNormalLocation);

    gl.enable(gl.DEPTH_TEST);
  //initialize buffers for the square
  initCubeBufferF();
  initSphereBufferF();

  gl.viewport(940, 0, 1200, 800);
  gl.scissor(940, 0, 1200, 800);
  gl.clearColor(0.9, 0.9, 0.95, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  // set up the view matrix, multiply into the modelview matrix+
  eyePos = [0.0, 1.0, 2.0];
  COI = [0.0, 0.0, 0.0];
  viewVector = vec3.create();
  viewUp = [0.0, 1.0, 0.0];
  light = [-5.0, -5.0, -5.0]; 
    //range is -20 to 20
  mat4.identity(vMatrix);
  vMatrix = mat4.lookAt(eyePos, COI, viewUp, vMatrix);
  viewVector = vec3.subtract(COI,eyePos,viewVector);
  vec3.negate(viewVector,viewVector);
  //set up perspective projection matrix
  mat4.identity(pMatrix);
  mat4.perspective(50, 1.0, 0.1, 1000, pMatrix);
  //set up the model matrix
  mat4.identity(mMatrix);
  // transformations applied here on model matrix
  mMatrix = mat4.rotate(mMatrix, degToRad(-20), [1, 0, 0]);
  mMatrix = mat4.scale(mMatrix, [0.24,0.5,0.5]);
  mMatrix = mat4.translate(mMatrix,[-2.5,-0.90,0.0]);

  // Now draw the cube
  var color = [0.0, 0, 1.0, 1]; // specify color for the cube

  drawCubeF(color);
  mat4.identity(vMatrix);

  vMatrix = mat4.lookAt(eyePos, COI, viewUp, vMatrix);
  //set up perspective projection matrix
  mat4.identity(pMatrix);
  mat4.perspective(50, 1.0, 0.1, 1000, pMatrix);

  //set up the model matrix
  mat4.identity(mMatrix);
  mMatrix = mat4.scale(mMatrix, [0.1,0.3,0.3]);
  mMatrix = mat4.translate(mMatrix,[-6.0,0.3,0]);
  var color = [1.0,1.0,0.0,1];
  drawSphereF(color);

  spVerts.splice(0, spVerts.length);
  spIndicies.splice(0, spIndicies.length);
  spNormals.splice(0, spNormals.length);

}