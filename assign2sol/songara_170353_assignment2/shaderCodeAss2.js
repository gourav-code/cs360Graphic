const vertexShaderCodeGourand = `#version 300 es
in vec3 aPosition;
in vec3 vertexNormal;

uniform mat4 uMMatrix;
uniform mat4 uPMatrix;
uniform mat4 uVMatrix;

uniform vec3 lightDirection;
out float surfaceBrightness;
out float specularReflection;
uniform vec3 viewVectorShader;
uniform float alpha;

uniform vec4 objColor;
out vec4 finalObjColor;

void main() {
  
  mat4 projectionModelView=uPMatrix*uVMatrix*uMMatrix;
  vec3 modifiedPosition = (uVMatrix*uMMatrix*vec4(aPosition,1.0)).xyz;

  vec3 fragNormal = (normalize(inverse(transpose(uVMatrix*uMMatrix))*(vec4(vertexNormal,0.0)))).xyz;

  vec3 modifiedLightDirection;
  modifiedLightDirection = (normalize(inverse(transpose(uVMatrix)) * vec4(lightDirection,1.0))).xyz;
  modifiedLightDirection = vec3(modifiedLightDirection.x-modifiedPosition.x,modifiedLightDirection.y-modifiedPosition.y,modifiedLightDirection.z-modifiedPosition.z);
  modifiedLightDirection = normalize(modifiedLightDirection);

  vec3 reflection;
  reflection = -reflect(modifiedLightDirection, fragNormal);

  vec3 modifiedviewVector;
  modifiedviewVector = (-normalize(uVMatrix * vec4(viewVectorShader,0.0))).xyz;

  float viewReflectionDot = dot(modifiedviewVector, normalize(reflection));

  surfaceBrightness = max(0.0, dot(normalize(modifiedLightDirection), fragNormal));
  specularReflection = pow(viewReflectionDot,alpha );
  finalObjColor = vec4(objColor.xyz * surfaceBrightness*0.8 +objColor.xyz*specularReflection*0.5 + 0.51*objColor.xyz, 1.0 );
  gl_Position = projectionModelView*vec4(aPosition,1.0);
  gl_PointSize=5.0;
}`;

// Fragment shader code
const fragShaderCodeGourand = `#version 300 es
precision mediump float;
out vec4 fragColor;
in vec4 finalObjColor;

void main() {
  fragColor = finalObjColor;
  
}`;

const vertexShaderCodePhong = `#version 300 es
in vec3 aPosition;
in vec3 vertexNormal;
uniform mat4 uMMatrix;
uniform mat4 uPMatrix;
uniform mat4 uVMatrix;

out vec3 modifiedPosition;
out mat4 viewMatrix;
out vec3 vertexNormalAll;

void main() {
  
  mat4 projectionModelView;
	projectionModelView=uPMatrix*uVMatrix*uMMatrix;
  modifiedPosition = (uVMatrix*uMMatrix*vec4(aPosition,1.0)).xyz;

  viewMatrix = uVMatrix;
  vertexNormalAll = vertexNormal;

  gl_Position = projectionModelView*vec4(aPosition,1.0);
  gl_PointSize=5.0;
}`;

// Fragment shader code
const fragShaderCodePhong = `#version 300 es
precision mediump float;
out vec4 fragColor;

in vec3 modifiedPosition;
uniform vec3 lightDirection;
uniform vec3 viewVectorShader;
in mat4 viewMatrix;
uniform float alpha;
in vec3 vertexNormalAll;

uniform vec4 objColor;
void main() {
  
  vec3 normal = normalize(vertexNormalAll);
  vec3 modifiedLightDirection;
  modifiedLightDirection = (normalize(inverse(transpose(viewMatrix)) * vec4(lightDirection,1.0))).xyz;
  modifiedLightDirection = vec3(modifiedLightDirection.x-modifiedPosition.x,modifiedLightDirection.y-modifiedPosition.y,modifiedLightDirection.z-modifiedPosition.z);
  modifiedLightDirection = normalize(modifiedLightDirection);

  float surfaceBrightness = max(0.0, dot(modifiedLightDirection, normal));

  vec3 modifiedViewVector;
  modifiedViewVector = (-normalize(inverse(transpose(viewMatrix)) * vec4(viewVectorShader,1.0))).xyz;

  vec3 halfwayVector = normalize((modifiedLightDirection+modifiedViewVector)/length(modifiedLightDirection+modifiedViewVector));

  float halfWayNormalDot = max(0.0, dot(halfwayVector,normal));

  float specularReflection = pow(halfWayNormalDot,alpha );

  fragColor = vec4(objColor.xyz * surfaceBrightness*0.6 +objColor.xyz*specularReflection*0.4 + 0.41*objColor.xyz, 1.0 );
  
}`;

const vertexShaderCodeFlat = `#version 300 es
in vec3 aPosition;

uniform mat4 uMMatrix;
uniform mat4 uPMatrix;
uniform mat4 uVMatrix;

out vec3 modifiedPosition;
out mat4 viewMatrix;


void main() {
  
  mat4 projectionModelView;
	projectionModelView=uPMatrix*uVMatrix*uMMatrix;
  modifiedPosition = (uVMatrix*uMMatrix*vec4(aPosition,1.0)).xyz;

  viewMatrix = uVMatrix;

  gl_Position = projectionModelView*vec4(aPosition,1.0);
  gl_PointSize=5.0;
}`;

// Fragment shader code
const fragShaderCodeFlat = `#version 300 es
precision mediump float;
out vec4 fragColor;

in vec3 modifiedPosition;
uniform vec3 lightDirection;
uniform vec3 viewVectorShader;
in mat4 viewMatrix;
uniform float alpha;

uniform vec4 objColor;
void main() {
  vec3 normal = normalize(cross(dFdx(modifiedPosition), dFdy(modifiedPosition)));

  vec3 modifiedLightDirection;
  modifiedLightDirection = (normalize(inverse(transpose(viewMatrix)) * vec4(lightDirection,1.0))).xyz;
  modifiedLightDirection = vec3(modifiedLightDirection.x-modifiedPosition.x,modifiedLightDirection.y-modifiedPosition.y,modifiedLightDirection.z-modifiedPosition.z);
  modifiedLightDirection = normalize(modifiedLightDirection);

  vec3 reflection;
  reflection = -reflect(modifiedLightDirection, normal);
  

  vec3 modifiedviewVector;
  modifiedviewVector = (-normalize(inverse(transpose(viewMatrix)) * vec4(viewVectorShader,1.0))).xyz;

  float viewReflectionDot = dot(modifiedviewVector, normalize(reflection));

  float surfaceBrightness = max(0.0, dot(modifiedLightDirection, normal));
  float specularReflection = pow(viewReflectionDot,alpha );

  fragColor = vec4(objColor.xyz * surfaceBrightness*0.6 +objColor.xyz*specularReflection*0.4 + 0.41*objColor.xyz, 1.0 );
  
}`;


// const vertexShaderCode2 = `#version 300 es
// in vec3 aPosition;
// in vec3 vertexNormal;

// uniform mat4 uMMatrix;
// uniform mat4 uPMatrix;
// uniform mat4 uVMatrix;

// uniform vec3 lightDirection;
// out float surfaceBrightness;
// out float specularReflection;
// uniform vec3 viewVectorShader;
// uniform float alpha;
// void main() {
  
//   mat4 projectionModelView;
// 	projectionModelView=uPMatrix*uVMatrix*uMMatrix;

//   vec3 modifiedPosition = (uVMatrix*uMMatrix*vec4(aPosition,0.0)).xyz;

//   vec3 modifiedLightDirection;
//   modifiedLightDirection = (normalize(uVMatrix * vec4(lightDirection,0.0))).xyz;
//   modifiedLightDirection = vec3(modifiedLightDirection.x-modifiedPosition.x,modifiedLightDirection.y-modifiedPosition.y,modifiedLightDirection.z-modifiedPosition.z);
//   modifiedLightDirection = normalize(-modifiedLightDirection);

//   vec3 fragNormal = (normalize(inverse(transpose(uVMatrix*uMMatrix))*(vec4(vertexNormal,1.0)))).xyz;

//   vec3 reflection;
//   reflection = reflect(modifiedLightDirection, fragNormal);

//   vec3 modifiedViewVector;
//   modifiedViewVector = (-normalize(inverse(transpose(uVMatrix)) * vec4(viewVectorShader,0.0))).xyz;

//   vec3 halfwayVector = normalize((modifiedLightDirection+modifiedViewVector)/length(modifiedLightDirection+modifiedViewVector));

//   float halfWayNormalDot = max(0.0, dot(halfwayVector,fragNormal));

//   surfaceBrightness = max(0.0, -dot(modifiedLightDirection, fragNormal));
//   specularReflection = pow(halfWayNormalDot,alpha );
//   gl_Position = projectionModelView*vec4(aPosition,1.0);
//   gl_PointSize=5.0;
// }`;

// Fragment shader code
// const fragShaderCode2 = `#version 300 es
// precision mediump float;
// out vec4 fragColor;
// in float surfaceBrightness;
// in float specularReflection;
// uniform vec4 objColor;
// void main() {
//   fragColor = vec4(objColor.xyz * surfaceBrightness*0.8 +objColor.xyz*specularReflection*0.4 + 0.31*objColor.xyz, 1.0 );
  
// }`;
