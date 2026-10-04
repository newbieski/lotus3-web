# Lotus 3 (Lotus III: The Ultimate Challenge) Web Porting Project Plan & Progress

## 1. 프로젝트 개요
1992년 Gremlin Graphics / Magnetic Fields에서 출시하고 MS-DOS로 이식되어 전 세계 및 국내에서 큰 인기를 얻은 명작 레이싱 게임 **Lotus III: The Ultimate Challenge**의 웹 브라우저 이식 프로젝트입니다.

---

## 2. 진행 상태 현황 (Status Tracker)

| 단계 | 항목 | 상태 | 주요 결과물 |
| :--- | :--- | :---: | :--- |
| **Phase 0** | 원작 에셋 & 롬 수집 | **완료 (DONE)** | Amiga ADF 롬, 사운드트랙 전곡(10곡), Nelumbo 패키지 |
| **Phase 1** | 웹 프로젝트 기반 구축 | **완료 (DONE)** | Git 초기화, 순수 ES 모듈 아키텍처, 16비트 레트로 스프라이트 생성기 |
| **Phase 2** | Pseudo-3D 도로 렌더링 코어 | **완료 (DONE)** | 스캔라인 래스터 로드 엔진, 언덕/커브 투영, 3중 패럴랙스 배경, Web Audio 엔진음/BGM |
| **Phase 3** | Lotus 3 맵 정밀화 & 장애물 판정 | **완료 (DONE)** | 점프대 도약/착지 물리, 오일 슬릭 스핀아웃, 꼬깔콘 파티클, 복공판, 트윈캠 수동/자동 변속(Low/High) |
| **Phase 4** | 라이벌 AI 레이스 & 트래픽 | **완료 (DONE)** | 5,400 세그먼트 전 구간 30대 이상 라이벌 동적 분배, 차선 변경 AI, 추월 트래픽 |
| **Phase 5** | Lotus 3 전 6개 코스 테마 & 날씨 | **완료 (DONE)** | Roadworks, Forest, Snow, Desert, Night, Storm 6개 코스 완비, 배경 테마 격리(크레인 버그 완치), 비/번개/눈 날씨 |
| **Phase 5.5** | 트랙 길이 5,400 세그먼트 확장 & 출발선 복원 | **완료 (DONE)** | 노면 체커보드 스타트라인 구현, 바닥 입간판 버그 완전 제거, 5,400 세그먼트(2.5분 챔피언십 레이스) 및 4섹터/3체크포인트 재설계, 완주 관성 감속 |
| **Phase 6** | UI 완성 & 최종 폴리싱 | 진행 대기 (READY) | 차량 선택 프리뷰 고도화, 체크포인트 팡파르 연출, 최종 모바일 터치 및 오디오 최적화 |

---

## 3. 웹 엔진 접속 정보

* **로컬 서버**: `http://localhost:8080/index.html`
* **조작법**:
  * `↑` / `W`: 가속 (Accelerate)
  * `↓` / `S` / `Space`: 브레이크 (Brake)
  * `←` / `→` / `A`, `D`: 조향 (Steering)
  * `Shift` / `X`: 기어 변속 (Shift LOW / HIGH)
  * `G`: 변속 모드 전환 (Automatic / Manual)
  * `R`: 원작 라디오 방송국 선국
  * `M`: BGM/효과음 음소거 토글
  * 모바일/태블릿: 화면 하단 가상 D-패드 & 페달 버튼
