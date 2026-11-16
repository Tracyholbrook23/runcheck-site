import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

/*
 * The hero court. One textured floor, painted lines and the headline lying
 * on the wood, one real ball model with its own contact shadow, window light
 * that drifts across all of it, and a camera that eases toward the cursor and
 * dives to the ball as the page scrolls.
 */

const GROUND = "#0A0A0A";
const INK = "#F2EFE7";
const BALL_RADIUS = 0.6;
const BALL_HOME = new THREE.Vector3(2.35, BALL_RADIUS, -0.9);

export type BallRect = { x: number; y: number; r: number };

export type CourtScene = {
  update: (opts: { dive: number; mouseX: number; mouseY: number; time: number; showBall?: boolean }) => void;
  resize: () => void;
  ballRect: () => BallRect;
  ready: Promise<void>;
  dispose: () => void;
};

type LightUniforms = { uTime: { value: number } };

/* Window light pattern shared by every surface, computed from world position. */
function patchWindowLight(material: THREE.Material, uniforms: LightUniforms) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vWPos;")
      .replace(
        "#include <worldpos_vertex>",
        "#include <worldpos_vertex>\nvWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;"
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
varying vec3 vWPos;
uniform float uTime;
float rcPane(vec2 p) {
  vec2 c = fract(p);
  float pane = smoothstep(0.05, 0.16, c.x) * smoothstep(0.95, 0.84, c.x)
             * smoothstep(0.06, 0.18, c.y) * smoothstep(0.94, 0.82, c.y);
  float bar = 1.0 - (1.0 - smoothstep(0.012, 0.04, abs(c.x - 0.5))) * 0.85;
  return pane * bar;
}
float rcWindowLight(vec3 w) {
  vec2 uv = w.xz * vec2(0.17, 0.11);
  vec2 wob = vec2(sin(uv.y * 9.0 + uTime * 1.3) + sin(uv.x * 5.0 - uTime * 0.8),
                  cos(uv.x * 8.0 + uTime * 1.1) + sin(uv.y * 4.0 + uTime * 0.6)) * 0.004;
  vec2 drift = vec2(uTime * 0.010, uTime * 0.003);
  float a = rcPane(uv + wob + drift + vec2(0.18, 0.31));
  float band = smoothstep(-0.2, 0.9, sin(w.x * 0.21 + w.z * 0.13 + 0.6));
  float b = smoothstep(0.2, 1.0, sin(w.x * 0.09 - w.z * 0.17 - uTime * 0.03) * 0.5 + 0.5);
  return mix(0.42, 1.28, a * band * mix(0.55, 1.0, b));
}`
      )
      .replace(
        "#include <opaque_fragment>",
        "outgoingLight *= rcWindowLight(vWPos);\n#include <opaque_fragment>"
      );
  };
}

/* Painted lines and, on wide screens, the headline, drawn worn into the wood. */
function paintCourt(size: number, withHeadline: boolean) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const S = size / 24; // 24 world units across
  const W = (x: number) => (x + 12) * S;
  ctx.clearRect(0, 0, size, size);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 0.075 * S;
  ctx.globalAlpha = 0.78;

  // Lane, free throw circle and three point arc, ball sits on the free throw line.
  const ftZ = BALL_HOME.z + 0.15;
  ctx.beginPath();
  ctx.moveTo(W(BALL_HOME.x - 2.2), W(ftZ));
  ctx.lineTo(W(BALL_HOME.x + 2.2), W(ftZ));
  ctx.moveTo(W(BALL_HOME.x - 2.2), W(ftZ));
  ctx.lineTo(W(BALL_HOME.x - 2.2), W(ftZ - 9));
  ctx.moveTo(W(BALL_HOME.x + 2.2), W(ftZ));
  ctx.lineTo(W(BALL_HOME.x + 2.2), W(ftZ - 9));
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(W(BALL_HOME.x), W(ftZ), 2.2 * S, 0, Math.PI);
  ctx.stroke();
  ctx.setLineDash([0.5 * S, 0.42 * S]);
  ctx.beginPath();
  ctx.arc(W(BALL_HOME.x), W(ftZ), 2.2 * S, Math.PI, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.arc(W(BALL_HOME.x), W(ftZ - 6.4), 8.6 * S, 0.12 * Math.PI, 0.88 * Math.PI);
  ctx.stroke();

  if (withHeadline) {
    ctx.globalAlpha = 0.95;
    ctx.fillStyle = INK;
    ctx.textBaseline = "alphabetic";
    ctx.font = `${1.5 * S}px Anton, Impact, sans-serif`;
    ctx.save();
    ctx.translate(W(-7.4), W(1.9));
    ctx.transform(1, 0, -0.16, 1, 0, 0);
    ctx.fillText("KNOW THE RUN.", 0, 0);
    ctx.fillText("BEFORE YOU GO.", 0.45 * S, 1.55 * S);
    ctx.restore();
  }

  // Wear: knock out speckles so the paint reads as years of play.
  ctx.globalCompositeOperation = "destination-out";
  ctx.globalAlpha = 1;
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 9000; i++) {
    ctx.globalAlpha = 0.1 + rand() * 0.45;
    const r = (0.004 + rand() * 0.03) * S;
    ctx.beginPath();
    ctx.arc(rand() * size, rand() * size, r, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let i = 0; i < 260; i++) {
    ctx.globalAlpha = 0.08 + rand() * 0.18;
    ctx.fillRect(rand() * size, rand() * size, (0.2 + rand() * 1.2) * S, 0.02 * S);
  }
  ctx.globalCompositeOperation = "source-over";
  return canvas;
}

function contactShadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, "rgba(0,0,0,0.92)");
  g.addColorStop(0.22, "rgba(0,0,0,0.78)");
  g.addColorStop(0.5, "rgba(0,0,0,0.28)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

const smooth = (x: number) => x * x * (3 - 2 * x);

export function createCourtScene(canvas: HTMLCanvasElement, opts: { narrow: boolean }): CourtScene {
  const narrow = opts.narrow;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, narrow ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(GROUND);
  scene.fog = new THREE.Fog(GROUND, 11, 27);

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
  const uniforms: LightUniforms = { uTime: { value: 0 } };

  scene.add(new THREE.HemisphereLight("#fff2e0", "#1a120c", 0.55));
  const key = new THREE.DirectionalLight("#ffe9cf", 2.4);
  key.position.set(-6, 11, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -6;
  key.shadow.camera.right = 6;
  key.shadow.camera.top = 6;
  key.shadow.camera.bottom = -6;
  key.shadow.radius = 5;
  key.shadow.bias = -0.0004;
  key.target.position.copy(BALL_HOME);
  scene.add(key, key.target);
  const rim = new THREE.DirectionalLight("#9fb5ff", 0.35);
  rim.position.set(7, 4, -8);
  scene.add(rim);

  const loader = new THREE.TextureLoader();
  const maxAniso = renderer.capabilities.getMaxAnisotropy();

  // Floor: the wood, tinted down so it sits in the brand's dark ground.
  const wood = loader.load("/home/court-wood.webp");
  wood.colorSpace = THREE.SRGBColorSpace;
  wood.wrapS = wood.wrapT = THREE.RepeatWrapping;
  wood.repeat.set(7, 7);
  wood.anisotropy = maxAniso;
  const floorMat = new THREE.MeshStandardMaterial({ map: wood, color: "#7a6656", roughness: 0.42, metalness: 0 });
  patchWindowLight(floorMat, uniforms);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Paint lies on the wood so the light falls across the letters too.
  const paintTex = new THREE.CanvasTexture(paintCourt(narrow ? 2048 : 3072, !narrow));
  paintTex.colorSpace = THREE.SRGBColorSpace;
  paintTex.anisotropy = maxAniso;
  const paintMat = new THREE.MeshStandardMaterial({ map: paintTex, transparent: true, roughness: 0.55, depthWrite: false });
  patchWindowLight(paintMat, uniforms);
  const paint = new THREE.Mesh(new THREE.PlaneGeometry(24, 24), paintMat);
  paint.rotation.x = -Math.PI / 2;
  paint.position.y = 0.003;
  paint.receiveShadow = true;
  scene.add(paint);

  // Tight dark contact shadow right under the ball.
  const contactMat = new THREE.MeshBasicMaterial({ map: contactShadowTexture(), transparent: true, depthWrite: false });
  const contact = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.5), contactMat);
  contact.rotation.x = -Math.PI / 2;
  contact.position.set(BALL_HOME.x, 0.006, BALL_HOME.z);
  scene.add(contact);

  const ballGroup = new THREE.Group();
  ballGroup.position.copy(BALL_HOME);
  scene.add(ballGroup);

  const ready = new Promise<void>((resolve) => {
    const gltf = new GLTFLoader();
    gltf.setMeshoptDecoder(MeshoptDecoder);
    gltf.load(
      "/home/ball.glb",
      (g) => {
        const model = g.scene;
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const s = (BALL_RADIUS * 2) / Math.max(size.x, size.y, size.z);
        model.position.sub(center.multiplyScalar(s));
        model.scale.setScalar(s);
        model.traverse((o) => {
          const mesh = o as THREE.Mesh;
          if (!mesh.isMesh) return;
          mesh.castShadow = true;
          const mat = mesh.material as THREE.MeshStandardMaterial;
          // Generated textures carry baked light; pull them back to the real ball orange.
          mat.color = new THREE.Color("#fff1e4");
          mat.emissiveMap = null;
          mat.emissive = new THREE.Color(0x000000);
          mat.roughness = 1;
          mat.metalness = 0;
          mat.envMapIntensity = 0.4;
          patchWindowLight(mat, uniforms);
        });
        ballGroup.add(model);
        resolve();
      },
      undefined,
      () => resolve()
    );
  });

  // Camera framing. Wide screens see the headline and the ball; tall screens frame the ball.
  const camStart = new THREE.Vector3();
  const lookStart = new THREE.Vector3();
  const cam = new THREE.Vector3();
  const look = new THREE.Vector3();
  const ballNow = new THREE.Vector3();
  let mx = 0;
  let my = 0;

  function frame() {
    const aspect = canvas.clientWidth / Math.max(1, canvas.clientHeight);
    camera.aspect = aspect;
    if (aspect < 0.8) {
      camera.fov = 46;
      camStart.set(BALL_HOME.x - 0.6, 9.4, BALL_HOME.z + 7.6);
      lookStart.set(BALL_HOME.x - 0.4, 0, BALL_HOME.z + 0.9);
    } else {
      // Fit the headline width: wider windows can sit closer, short wide ones pull back.
      const fitW = 14;
      const hHalf = Math.atan(fitW / 2 / 12.1);
      const vfov = 2 * Math.atan(Math.tan(hHalf) / aspect) * (180 / Math.PI);
      camera.fov = THREE.MathUtils.clamp(vfov, 26, 44);
      camStart.set(-1.7, 9.4, 8.4);
      lookStart.set(-1.5, 0, 0.75);
    }
    camera.updateProjectionMatrix();
  }

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    frame();
  }
  resize();

  function update({ dive, mouseX, mouseY, time, showBall = true }: { dive: number; mouseX: number; mouseY: number; time: number; showBall?: boolean }) {
    ballGroup.visible = showBall;
    contact.visible = showBall;
    uniforms.uTime.value = time;
    const k = smooth(Math.min(1, Math.max(0, dive)));
    const lift = smooth(Math.min(1, Math.max(0, (dive - 0.35) / 0.65)));
    ballNow.set(BALL_HOME.x, BALL_RADIUS + lift * 1.15, BALL_HOME.z + lift * 0.5);
    ballGroup.position.copy(ballNow);
    ballGroup.rotation.set(-0.35 - lift * 0.9, 0.6 + time * 0.02 + lift * 0.8, 0.1);
    contact.scale.setScalar(1 + lift * 1.6);
    contactMat.opacity = 1 - lift * 0.85;

    mx += (mouseX - mx) * 0.06;
    my += (mouseY - my) * 0.06;
    const endCam = new THREE.Vector3(ballNow.x - 0.2, ballNow.y + 2.35, ballNow.z + 2.55);
    cam.lerpVectors(camStart, endCam, k);
    look.lerpVectors(lookStart, ballNow, k);
    const sway = 1 - k * 0.8;
    cam.x += mx * 0.9 * sway;
    cam.y += -my * 0.45 * sway;
    camera.position.copy(cam);
    camera.lookAt(look);
    renderer.render(scene, camera);
  }

  const tmp = new THREE.Vector3();
  const right = new THREE.Vector3();
  function ballRect(): BallRect {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    tmp.copy(ballNow).project(camera);
    const x = (tmp.x * 0.5 + 0.5) * w;
    const y = (-tmp.y * 0.5 + 0.5) * h;
    right.setFromMatrixColumn(camera.matrixWorld, 0).multiplyScalar(BALL_RADIUS).add(ballNow).project(camera);
    const r = Math.abs((right.x * 0.5 + 0.5) * w - x);
    return { x, y, r };
  }

  function dispose() {
    renderer.dispose();
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.geometry.dispose();
        const m = mesh.material as THREE.MeshStandardMaterial;
        m.map?.dispose();
        m.dispose();
      }
    });
  }

  return { update, resize, ballRect, ready, dispose };
}
