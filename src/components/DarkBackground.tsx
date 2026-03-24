// 다크모드 Three.js 오로라 배경
// 최적화: 마운트 시 1회만 초기화, 테마 전환은 opacity CSS만 토글 (재컴파일 없음)
'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '@/components/ThemeProvider'

export function DarkBackground() {
  const { resolvedTheme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const frameIdRef = useRef<number>(0)
  const isAnimatingRef = useRef(false)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  // ── 마운트 시 1회 초기화 (셰이더 컴파일 선행) ──────────────────────
  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({ antialias: false }) // antialias off → 성능 향상
    // pixelRatio 1 고정: 레티나에서 2배 연산 방지
    renderer.setPixelRatio(1)
    renderer.setSize(window.innerWidth, window.innerHeight)
    rendererRef.current = renderer

    const canvas = renderer.domElement
    canvasRef.current = canvas
    canvas.style.cssText = [
      'position:fixed', 'top:0', 'left:0',
      'width:100vw', 'height:100vh',
      'z-index:0', 'pointer-events:none',
      'opacity:0', 'transition:opacity 0.6s ease',
    ].join(';')
    document.body.appendChild(canvas)

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime:       { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
      vertexShader: `void main(){gl_Position=vec4(position,1.0);}`,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;
        #define NUM_OCTAVES 3

        float rand(vec2 n){return fract(sin(dot(n,vec2(12.9898,4.1414)))*43758.5453);}
        float noise(vec2 p){
          vec2 ip=floor(p),u=fract(p);
          u=u*u*(3.0-2.0*u);
          float res=mix(mix(rand(ip),rand(ip+vec2(1,0)),u.x),mix(rand(ip+vec2(0,1)),rand(ip+vec2(1,1)),u.x),u.y);
          return res*res;
        }
        float fbm(vec2 x){
          float v=0.0,a=0.3;
          vec2 shift=vec2(100);
          mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.5));
          for(int i=0;i<NUM_OCTAVES;++i){v+=a*noise(x);x=rot*x*2.0+shift;a*=0.4;}
          return v;
        }
        void main(){
          vec2 shake=vec2(sin(iTime*1.2)*0.005,cos(iTime*2.1)*0.005);
          vec2 p=((gl_FragCoord.xy+shake*iResolution.xy)-iResolution.xy*0.5)/iResolution.y*mat2(6,-4,4,6);
          vec2 v;vec4 o=vec4(0);
          float f=2.0+fbm(p+vec2(iTime*5.0,0))*0.5;
          for(float i=0.0;i<35.0;i++){
            v=p+cos(i*i+(iTime+p.x*0.08)*0.025+i*vec2(13,11))*3.5
              +vec2(sin(iTime*3.0+i)*0.003,cos(iTime*3.5-i)*0.003);
            float tN=fbm(v+vec2(iTime*0.5,i))*0.3*(1.0-i/35.0);
            vec4 ac=vec4(
              0.1+0.3*sin(i*0.2+iTime*0.4),
              0.3+0.5*cos(i*0.3+iTime*0.5),
              0.7+0.3*sin(i*0.4+iTime*0.3),1);
            float tf=smoothstep(0.0,1.0,i/35.0)*0.6;
            o+=ac*exp(sin(i*i+iTime*0.8))/length(max(v,vec2(v.x*f*0.015,v.y*1.5)))*(1.0+tN*0.8)*tf;
          }
          o=tanh(pow(o/100.0,vec4(1.6)));
          // 밝기를 0.9로 낮춤 (원본 1.5) — 텍스트 가독성 확보
          gl_FragColor=o*0.9;
        }
      `,
    })
    materialRef.current = material

    const geometry = new THREE.PlaneGeometry(2, 2)
    scene.add(new THREE.Mesh(geometry, material))

    // 셰이더 선컴파일: 첫 전환 렉 제거
    renderer.render(scene, camera)

    // 30fps 애니메이션 (60fps 불필요, GPU 부하 절반)
    let last = 0
    const animate = (now: number) => {
      frameIdRef.current = requestAnimationFrame(animate)
      if (now - last < 33) return // ~30fps
      last = now
      material.uniforms.iTime.value += 0.033
      renderer.render(scene, camera)
    }

    const startAnimation = () => {
      if (isAnimatingRef.current) return
      isAnimatingRef.current = true
      frameIdRef.current = requestAnimationFrame(animate)
    }
    const stopAnimation = () => {
      cancelAnimationFrame(frameIdRef.current)
      isAnimatingRef.current = false
    }

    // 초기 테마 반영
    const isDark = document.documentElement.classList.contains('dark')
    if (isDark) { canvas.style.opacity = '1'; startAnimation() }

    // 테마 변화 감지
    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains('dark')
      if (dark) { canvas.style.opacity = '1'; startAnimation() }
      else      { canvas.style.opacity = '0'; stopAnimation() }
    })
    observer.observe(document.documentElement, { attributeFilter: ['class'] })

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      stopAnimation()
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      if (document.body.contains(canvas)) document.body.removeChild(canvas)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // 다크 오버레이 — 오로라 위, 콘텐츠 아래 (z-index: 1)
  // 텍스트 가독성을 위해 반투명 어두운 막을 씌움
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        background: 'rgba(6, 6, 12, 0.58)',
        pointerEvents: 'none',
        opacity: resolvedTheme === 'dark' ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    />
  )
}
