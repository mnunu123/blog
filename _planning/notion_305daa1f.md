# 바이브코딩 문제점 발생 및 해결


# 네이버 지도 전환 후 수정 사항 정리

## 1. 이전 vs 현재 차이
---

## 2. 발생했던 문제와 해결 방법
문제 1: 지도 이동/줌 시 경로(RouteOverlay)가 갱신되지 않음
- 원인: Leaflet용 map.on('moveend', ...) 형태만 사용하고 있었는데, 네이버 지도는 map.addListener가 없고 naver.maps.Event.addListener(map, eventName, handler)만 제공.
- 해결: Leaflet 분기 뒤, Naver 전용 분기 추가:
- 결과: 지도 이동/줌 시 updatePoints()가 호출되어 경로가 다시 그려짐.
---
문제 2: 빗물받이 보일 때 지도 드래그가 안 됨
- 원인: 빗물받이를 그리는 캔버스가 pointer-events: auto로 마우스 이벤트를 가로채고, 드래그 핸들러는 부모 div에만 연결되어 있어서 캔버스 위에서는 동작하지 않음.
- 해결 (구조 변경 전): handleDeckPointerDown/Move/Up를 Canvas2DDrainageOverlay에 props로 넘겨 캔버스에 직접 연결.
- 해결 (OverlayView 적용 후): 오버레이 컨테이너를 pointer-events: none으로 설정해, 드래그/휠 이벤트가 모두 지도로 전달되도록 변경. 별도 이벤트 전달 코드는 제거.
---
문제 3: 시·도 필터(예: 대구광역시) 선택 시 빗물받이 마커가 안 보임
- 원인: 데이터는 854건으로 넘어오지만, Canvas 뷰는 deckViewState 기준으로 그리고 있음. flyTo(대구)로 지도가 대구로 이동하기 전까지 deckViewState는 서울 중심이어서, 대구 좌표 854개가 화면 밖에 그려짐.
- 해결 (구조 변경 전): dataCenter, dataZoom props 추가. 현재 뷰 중심이 데이터 중심에서 0.5° 이상 멀면 deckViewState를 데이터 중심으로 맞춰서, 지도 이동 전에도 마커가 보이도록 처리.
- 해결 (OverlayView 적용 후): draw()에서 map.getBounds()를 직접 읽어 그리기 때문에 별도 뷰 동기화 없이, 지도가 이동하면 자동으로 올바른 bounds로 다시 그려짐.
---
문제 4: Maximum call stack size exceeded (무한 재귀)
- 원인: overlay.draw를 다음과 같이 덮어씀:
이 함수가 overlay.draw()를 호출하는데, 이 시점의 overlay.draw는 방금 대입한 함수 자신이라 자기 자신을 계속 호출함.
- 해결: 위 overlay.draw 덮어쓰기를 제거. DrainageOverlay 클래스가 이미 draw()를 가지고 있으므로 그대로 사용.
---
문제 5: bounds.getSouthwest is not a function
- 원인: 네이버 지도 API LatLngBounds는 getSouthWest / getNorthEast가 아니라 getSW() / getNE()를 제공함. 1
- 해결: 네이버 방식(getSW, getNE)을 우선 사용하고, 호환을 위해 getSouthWest, getNorthEast를 fallback으로 두고, sw/ne 존재 여부 및 lat()/lng() 호출 방식에 대한 null/타입 검사 추가.
---

## 3. 구조 변경 요약 (OverlayView 도입)
네이버 지도 API 가이드의 사용자 정의 오버레이(OverlayView) 패턴에 맞추어 전체 구조를 바꿨음:
1. src/lib/naver-drainage-overlay.ts: naver.maps.OverlayView를 상속한 DrainageOverlay 클래스 추가
- onAdd: 캔버스 생성 후 pointer-events: none으로 지도 이벤트를 막지 않음
- draw(): map.getBounds(), map.pointFromCoord()로 bounds·좌표 계산 후 빗물받이 그리기
- setData(), setMap(): 데이터/지도 인스턴스 설정 및 이벤트 리스너 등록
1. NaverMap.tsx 단순화
- 커스텀 드래그/휠 핸들러, deckViewState/deckOverlaySize/deckOverlayReady, projectToScreen, Canvas2DDrainageOverlay 제거
- createDrainageOverlay(naver, options) 호출 후 setMap(map), setData(items)로 빗물받이 표시
- 지도 클릭은 naver.maps.Event.addListener(map, 'click', ...)와 findDrainAtCoord로 처리
1. 결과
- 지도 pan/zoom은 네이티브 동작만 사용
- 빗물받이 오버레이는 지도 API가 관리
- 별도 뷰 동기화/이벤트 전달 로직이 필요 없어져 유지보수가 단순해짐