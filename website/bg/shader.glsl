#ifdef GL_ES
precision highp float;
#endif

#define M_PI 3.1415926

uniform float u_time;
uniform vec2 u_resolution;

// Thaitone colors
// https://www.facebook.com/thaitonecolor/
// https://unpkg.com/@onemoregroup/thaitones@1.1.3/thaitones.js
#define Khaophong rgb(241, 237, 226)
#define Chan rgb(244, 210, 93)
#define Mekkhram rgb(7, 47, 79)
#define Khiaonil rgb(0, 40, 53)
#define Nilkan rgb(0, 8, 11)
#define Khaokabang rgb(208, 207, 207)
#define Khramfarang rgb(12, 77, 162)
#define Nak rgb(203, 115, 113)

// https://gist.github.com/yiwenl/3f804e80d0930e34a0b33359259b556c
vec2 rotate(vec2 v, float a) {
  float s = sin(a);
  float c = cos(a);
  mat2 m = mat2(c, - s, s, c);
  return m * v;
}

vec4 rgb(int r, int g, int b) {
  return vec4(float(r) / 255.0, float(g) / 255.0, float(b) / 255.0, 1.0);
}

// http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float random(vec2 co) {
  highp float a = 12.9898;
  highp float b = 78.233;
  highp float c = 43758.5453;
  highp float dt = dot(co.xy , vec2(a, b));
  highp float sn = mod(dt, 3.14);
  return fract(sin(sn) * c);
}

// Concept similar to hex tiling, but it’s a square.
// Learn more: https://www.youtube.com/watch?v=VmrIDyYiJBA
vec4 lotus(vec2 grid, vec4 outside, vec4 inside, vec4 border) {
  grid = min(grid, 1.0 - grid) * 2.0;
  if (grid.x < grid.y)grid.xy = grid.yx;
  float threshold = 0.0;
  float margin = 0.25;
  float borderWidth = 0.04;
  float diagonalDistance = dot(grid - vec2(1.0 - threshold, threshold), normalize(vec2(-1.0, 1.0)));
  float minDistance = min(diagonalDistance, min(grid.x, grid.y));
  return minDistance < margin ? outside : minDistance < margin + borderWidth ? border : inside;
}

void checkShape(inout float min, float distance) {
  if (distance < min)min = distance;
}

int getColorScheme() {
  vec2 sc = (gl_FragCoord.xy / u_resolution.xy);
  vec4 basis = vec4(sc.x, sc.y, sc.x + sc.y, sc.x - sc.y);
  vec4 phase = vec4(47.0, 37.0, 59.0, 31.0) * u_time * 0.01;
  vec4 period = vec4(0.113, 0.101, 0.157, 0.127) * 16.0;
  vec4 amplitude = vec4(0.11, 0.17, 0.13, 0.19) * 0.12;
  float styleBase = u_time / 8.0 + dot(sin(basis * period + phase) * amplitude, vec4(1.0));
  return int(mod(styleBase, 3.0));
}

vec4 getColor(vec2 xy, float density, int pickedStyle) {
  vec2 uv = vec2(xy.x + xy.y, xy.x - xy.y);
  vec2 sc = (gl_FragCoord.xy / u_resolution.xy);
  vec2 grid = fract(uv);
  vec2 base = floor(uv);
  float rand1 = random(base);
  float rand2 = random(base + vec2(123.456, 789.012));
  vec4 transparent = vec4(0.0);
  if (rand1 > density)return transparent;
  rand1 /= density;
  vec4 foreground = pickedStyle == 2 ? Khaophong : rand1 < 0.5 ? Khramfarang : Nak;
  if (rand2 < 0.5) {
    foreground.a = rand2 + 0.25;
    return lotus(grid, transparent, transparent, foreground);
  } else {
    foreground.a = sqrt(rand2 - 0.25);
    return lotus(grid, transparent, foreground, foreground);
  }
}

vec4 mixColor(vec4 base, vec4 mixer) {
  return vec4(mix(base.rgb, mixer.rgb, mixer.a), 1.0);
}

vec4 getWave(vec2 screenCoord, float base, float alpha, float v1f, float v1o, float v1v, float v1a, float v2f, float v2o, float v2v, float v2a) {
  float sy = (-screenCoord.y + 0.5);
  if (sy < base - v1a - v2a)return vec4(0);
  vec4 color = mix(Nak, Khramfarang, screenCoord.x + 0.5);
  color.a = alpha;
  float x = screenCoord.x * u_resolution.x / u_resolution.y * 0.5;
  float y = base + sin(x * v1f + v1o + v1v * u_time) * v1a + sin(x * v2f + v2o + v1v * u_time) * v2a;
  return sy < y ? vec4(0.0) : color;
}

void main(void) {
  int pickedStyle = getColorScheme();
  vec2 screenCoord = (gl_FragCoord.xy / u_resolution.xy - 0.5);
  vec2 screenOffset = screenCoord * normalize(u_resolution.xy);
  vec2 baseCoord = vec2(0.0, - u_time) * 0.422;
  vec4 background;
  if (pickedStyle == 0) {
    background = Khaophong;
  } else if (pickedStyle == 1) {
    background = Nilkan;
  } else {
    background = mix(Nak, Khramfarang, dot(screenCoord * vec2(1.0, - 1.0) + 0.5, vec2(0.5)));
  }
  vec4 resultColor = background;
  resultColor = mixColor(resultColor, getColor(baseCoord + screenOffset * 16.0, 0.04, pickedStyle));
  resultColor = mixColor(resultColor, getColor(baseCoord + screenOffset * 8.0 + vec2(555.44, 333.22), 0.1, pickedStyle));
  resultColor = mixColor(resultColor, getColor(baseCoord + screenOffset * 5.0 + vec2(123.45, 67.89), 0.12, pickedStyle));
  resultColor = mixColor(resultColor, getColor(baseCoord + screenOffset * 3.0 + vec2(-234.5, - 678.9), 0.15, pickedStyle));
  
  resultColor = mixColor(resultColor, getWave(screenCoord, 0.89, 0.2, 10.0, 27.3, 0.3, 0.007, 12.0, 422.0, 0.5, 0.01));
  resultColor = mixColor(resultColor, getWave(screenCoord, 0.91, 0.3, - 13.0, - 12.3, 0.42, 0.01, - 19.0, - 34.5, 0.77, 0.01));
  resultColor = mixColor(resultColor, getWave(screenCoord, 0.95, 0.9, 11.0, 12.3, 0.42, 0.012, 17.0, 34.5, 0.77, 0.015));
  gl_FragColor = resultColor;
}