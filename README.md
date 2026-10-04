# Lotus III: The Ultimate Challenge - Web Porting Project

1992년 Gremlin Graphics / Magnetic Fields에서 출시하고 MS-DOS로 선풍적인 인기를 끌었던 전설적인 아케이드 레이싱 게임 **Lotus III: The Ultimate Challenge**를 현대 웹 브라우저(HTML5 Canvas + Web Audio API)로 완벽하게 재현한 프로젝트입니다.

## 🏁 주요 특징
- **의사 3D 래스터 로드 엔진(Pseudo-3D Raster Road Engine)**: 스캔라인 클리핑 기반의 부드러운 60 FPS 주행
- **공사장(Roadworks) 맵**: 차선 축소 구간, 주황색 꼬깔콘, 노랑/검정 줄무늬 공사 바리케이드, 거대 타워 크레인 배경
- **3대 플레이어블 차량**:
  - **Lotus M200 Speedster (은색 컨셉카)**
  - **Lotus Esprit Turbo S4 (빨간색)**
  - **Lotus Elan SE (녹색 로드스터)**
- **다양한 코스 & 환경**:
  - `🚧 ROADWORKS`: 도로 공사장 코스
  - `🌲 NATURE FOREST`: 숲과 완만한 구릉의 자연풍경 코스
  - `❄️ SNOW BLIZZARD`: 흩날리는 눈발 파티클과 빙판 코스
- **인게임 라디오 FM 시스템**: 주행 중 `[R]` 키를 눌러 Patrick Phelan의 Lotus 3 명곡 BGM 실시간 전환
- **원작 1:1 도스 HUD**: 상단 검은 바 없이 시원하게 트인 하늘 위에 `KMH`, 빨간색 RPM 게이지, `1ST` 순위, 8자리 점수, 시간, 세로 사다리꼴 게이지 탑재

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
- `R`: 인게임 라디오 채널 변경
- `M`: 사운드 음소거
