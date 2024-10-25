precision highp float;
attribute vec3 aPosition;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

uniform float time;

void main() {
  vec4 viewModelPosition = uModelViewMatrix * vec4(aPosition, 1.0);

  viewModelPosition.x += 10.0 * sin(time * 0.01 + viewModelPosition.y * 0.1) ;

  gl_Position = uProjectionMatrix * viewModelPosition;
}