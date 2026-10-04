# Lotus 2 (Lotus Turbo Challenge 2) Web Porting Project Plan & Progress

## 1. 프로젝트 개요
1991년 Gremlin Graphics / Magnetic Fields에서 출시한 명작 레이싱 게임 **Lotus Turbo Challenge 2**의 웹 브라우저 이식 프로젝트입니다.

---

## 2. 진행 상태 현황 (Status Tracker)

| 단계 | 항목 | 상태 | 주요 결과물 |
| :--- | :--- | :---: | :--- |
| **Phase 0** | 원작 에셋 & 롬 수집 | **완료 (DONE)** | Amiga ADF 롬, 사운드트랙 전곡(10곡), Nelumbo 패키지 |
| **Phase 1** | 웹 프로젝트 기반 구축 | **완료 (DONE)** | Git 초기화, 순수 ES 모듈 아키텍처, 16비트 레트로 스프라이트 생성기 |
| **Phase 2** | Pseudo-3D 도로 렌더링 코어 | **완료 (DONE)** | 스캔라인 래스터 로드 엔진, 언덕/커브 투영, 3중 패럴랙스 배경, Web Audio 엔진음/BGM |
| **Phase 3** | 물리 정밀화 & 장애물 판정 | **진행 대기 (READY)** | 오일슬릭/점프대/추돌 충돌 판정, 기어비(Low/High), 랩타임 기록 |
| **Phase 4** | 8개 코스 및 날씨 효과 | 예정 (TODO) | Night, Fog, Snow, Desert 등 전 8개 코스 및 비/눈 셰이더 |
| **Phase 5** | UI 완성 & 최종 폴리싱 | 예정 (TODO) | 인게임 미니맵, 코스 클리어 시퀀스, 모바일 터치 최적화 |

---

## 3. 웹 엔진 접속 정보

* **로컬 서버**: `http://localhost:8080/index.html`
* **조작법**:
  * `↑` / `W`: 가속 (Accelerate)
  * `↓` / `S` / `Space`: 브레이크 (Brake)
  * `←` / `→` / `A`, `D`: 조향 (Steering)
  * `M`: BGM/효과음 음소거 토글
  * 모바일/태블릿: 화면 하단 가상 D-패드 & 페달 버튼
