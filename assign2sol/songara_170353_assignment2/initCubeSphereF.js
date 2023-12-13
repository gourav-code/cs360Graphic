function initSphereBufferF() {
    var nslices = 30; // use even number
    var nstacks = nslices / 2 + 1;
    var radius = 1.0;
    initSphere(nslices, nstacks, radius);
  
    spBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, spBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(spVerts), gl.STATIC_DRAW);
    spBuf.itemSize = 3;
    spBuf.numItems = nslices * nstacks;
  
    // spNormalBuf = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, spNormalBuf);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(spNormals), gl.STATIC_DRAW);
    // spNormalBuf.itemSize = 3;
    // spNormalBuf.numItems = nslices * nstacks;
  
    spIndexBuf = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, spIndexBuf);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint32Array(spIndicies),
      gl.STATIC_DRAW
    );
    spIndexBuf.itemsize = 1;
    spIndexBuf.numItems = (nstacks - 1) * 6 * (nslices + 1);
  }
  
function drawSphereF(color){
    gl.bindBuffer(gl.ARRAY_BUFFER, spBuf);
    gl.vertexAttribPointer(aPositionLocation,spBuf.itemSize,gl.FLOAT,false,3*4,0);

    // gl.bindBuffer(gl.ARRAY_BUFFER, spNormalBuf);
    // gl.vertexAttribPointer(vertexNormalLocation, spNormalBuf.itemSize, gl.FLOAT,false, 3*4,0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, spIndexBuf);
    gl.uniform3fv(uLightDirectionLocation, light);
    gl.uniform4fv(uColorLocation, color);
    gl.uniform1f(specularReflectionAngleLocation, 1000.0);
    gl.uniform3fv(viewVectorShaderLocation, viewVector);
    gl.uniformMatrix4fv(uMMatrixLocation, false, mMatrix);
    gl.uniformMatrix4fv(uVMatrixLocation, false, vMatrix);
    gl.uniformMatrix4fv(uPMatrixLocation, false, pMatrix);

    gl.drawElements(gl.TRIANGLES, spIndexBuf.numItems, gl.UNSIGNED_INT, 0);
}

//-------------------------------------Cube----------------------------------------------------------------------------
function initCubeBufferF() {
    var vertices = [
    // Front face
    -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5,
    // Back face
    -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5,
    // Top face
    -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5,
    // Bottom face
    -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5,
    // Right face
    0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5,
    // Left face
    -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5,
    ];
    buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    buf.itemSize = 3;
    buf.numItems = vertices.length / 3;

    // var normals = [
    // // Front face
    // 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
    // // Back face
    // 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,
    // // Top face
    // 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
    // // Bottom face
    // 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
    // // Right face
    // 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
    // // Left face
    // -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
    // ];
    // cubeNormalBuf = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, cubeNormalBuf);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    // cubeNormalBuf.itemSize = 3;
    // cubeNormalBuf.numItems = normals.length / 3;

    var indices = [
    0,
    1,
    2,
    0,
    2,
    3, // Front face
    4,
    5,
    6,
    4,
    6,
    7, // Back face
    8,
    9,
    10,
    8,
    10,
    11, // Top face
    12,
    13,
    14,
    12,
    14,
    15, // Bottom face
    16,
    17,
    18,
    16,
    18,
    19, // Right face
    20,
    21,
    22,
    20,
    22,
    23, // Left face
    ];
    indexBuf = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuf);
    gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
    );
    indexBuf.itemSize = 1;
    indexBuf.numItems = indices.length;
}

function drawCubeF(color) {
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.vertexAttribPointer(
    aPositionLocation,
    buf.itemSize,
    gl.FLOAT,
    false,
    3*4,
    0
);

// gl.bindBuffer(gl.ARRAY_BUFFER, cubeNormalBuf);
// gl.vertexAttribPointer(vertexNormalLocation, cubeNormalBuf.itemSize, gl.FLOAT, false, 3*4, 0);
// draw elementary arrays - triangle indices
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuf);
gl.uniform3fv(uLightDirectionLocation, light);
gl.uniform3fv(viewVectorShaderLocation, viewVector);
gl.uniform1f(specularReflectionAngleLocation, 5.0);
gl.uniform4fv(uColorLocation, color);
gl.uniformMatrix4fv(uMMatrixLocation, false, mMatrix);
gl.uniformMatrix4fv(uVMatrixLocation, false, vMatrix);
gl.uniformMatrix4fv(uPMatrixLocation, false, pMatrix);


gl.drawElements(gl.TRIANGLES, indexBuf.numItems, gl.UNSIGNED_SHORT, 0);
//gl.drawArrays(gl.LINE_STRIP, 0, buf.numItems); // show lines
//gl.drawArrays(gl.POINTS, 0, buf.numItems); // show points

}