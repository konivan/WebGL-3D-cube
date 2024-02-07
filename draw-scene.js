function drawScene(gl, programInfo, buffers, squareRotation) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // Все заливаем черным
    gl.clearDepth(1.0); // Очищаем всю глубину
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
  
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
    const fieldOfView = (45 * Math.PI) / 180; // Градусы
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();
  
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
  
    const modelViewMatrix = mat4.create();
  
    mat4.translate(
      modelViewMatrix,
      modelViewMatrix,
      [-0.0, 5.0, -17.0] // Координаты сдвига
    );

    mat4.rotate(
      modelViewMatrix, // матрица назначения
      modelViewMatrix, // матрица вращения
      squareRotation,
      [1, 1, 0],
    ); // ось вращения
  
    // Конвертация позиции из position buffer в VertexAttribArray
    setPositionAttribute(gl, buffers, programInfo);

    // Конвертация цвета из color buffer в ColorAttribArray
    setColorAttribute(gl, buffers, programInfo);
  
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indexes);

    gl.useProgram(programInfo.program);
  
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix
    );
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix
    );
  
    {
      const vertexCount = 36;
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }
  }
  
  // Конвертация позиции из position buffer в VertexAttribArray
  function setPositionAttribute(gl, buffers, programInfo) {
    const numComponents = 3; // забирать 3 байта за итерацию
    const type = gl.FLOAT; // тип переменных
    const normalize = false;
    const stride = 0;
    const offset = 0; // С какого байта начинать в буфере
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }

  function setColorAttribute(gl, buffers, programInfo) {
    const numComponents = 4; // забирать 4 байта за итерацию
    const type = gl.FLOAT; // тип переменных
    const normalize = false;
    const stride = 0;
    const offset = 0; // С какого байта начинать в буфере
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexColor,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
  }
  
  export { drawScene };