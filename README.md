# Lotus III: The Ultimate Challenge - Web Porting Project

1992년 Gremlin Graphics / Magnetic Fields에서 출시하고 MS-DOS로 선풍적인 인기를 끌었던 전설적인 아케이드 레이싱 게임 **Lotus III: The Ultimate Challenge**를 현대 웹 브라우저(HTML5 Canvas + Web Audio API)로 완벽하게 재현한 프로젝트입니다.

## 🏁 주요 특징
- **의사 3D 래스터 로드 엔진(Pseudo-3D Raster Road Engine)**: 스캔라인 클리핑 기반의 부드러운 60 FPS 주행
- **공사장(Roadworks) 맵**: 차선 축소 구간, 주황색 꼬깔콘, 노랑/검정 줄무늬 공사 바리케이드, 거대 타워 크레인 배경
- **3대 플레이어블 차량**:
  - **Lotus M200 Speedster (은색 컨셉카)**
  - **Lotus Esprit Turbo S4 (빨간색)**
  - **Lotus Elan SE (녹색 로드스터)**
- **6대 공식 코스 & 환경 (5,400 세그먼트 풀 챔피언십)**:
  - `🚧 ROADWORKS`: 도로 공사장 코스 (굴착기, 트렌치 복공판, 안전콘, 드럼통, 점프대)
  - `🌲 NATURE FOREST`: 알프스 고산 능선과 침엽수 숲 자연풍경 코스
  - `❄️ SNOW BLIZZARD`: 쏟아지는 눈보라 파티클과 미끄러운 블랙아이스 설원 코스
  - `🏜️ DESERT CANYON`: 붉은 사암 메사 협곡과 거대 사고아로 선인장 사막 코스
  - `🌃 NIGHT HIGHWAY`: 자정의 별무리와 메트로폴리스 네온 스카이라인 야간 코스
  - `⛈️ STORM & THUNDER`: 폭풍우 빗줄기와 전 화면 번개 섬광, 수막현상 웅덩이 코스
- **인게임 라디오 FM 시스템**: 주행 중 `[R]` 키를 눌러 Patrick Phelan의 Lotus 3 명곡 BGM 실시간 전환
- **원작 1:1 도스 HUD**: 상단 검은 바 없이 시원하게 트인 하늘 위에 `KMH`, 빨간색 RPM 게이지, `1ST` 순위, 8자리 점수, 시간, 세로 사다리꼴 게이지 탑재
- **아케이드 드라이빙 물리**: 16비트 차체 롤링 & 횡이동, 점프대 고공 도약, 오일 슬릭 360도 스핀아웃, 30대 라이벌 차량 추월

## 🕹️ 실행 방법
```bash
# 로컬 웹 서버 실행 (의존성 설치 불필요)
python3 -m http.server 8080

# 브라우저 접속
http://localhost:8080/index.html
```

## 🎮 조작법
- `↑` / `W`: 가속
- `↓` / `S` / `Space`: 브레이크 / 감속
- `←` / `→` / `A`, `D`: 조향 (핸들링)
- `Shift` / `X`: 기어 변속 (LOW / HIGH 수동 변속)
- `G`: 변속 모드 전환 (Automatic / Manual)
- `R`: 인게임 라디오 채널 변경
- `M`: 사운드 음소거
- 모바일/태블릿: 화면 하단 터치 가상 패드 & 페달 버튼

## 🌐 GitHub Pages 배포 안내
본 프로젝트는 **100% 정적 리소스(HTML5 Canvas + Vanilla ES6 Modules)**로 구성되어 있어 빌드 과정(No-Build) 없이 저장소 루트 디렉토리가 그대로 웹 호스팅됩니다:
- **공개 웹 주소**: `https://newbieski.github.io/lotus3-web/`
- **배포 설정**: GitHub Repo > `Settings` > `Pages` > Branch: `main` / `/(root)` 선택
