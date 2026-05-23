# 📱 Personal KPI - 플레이스토어 등록 가이드

## 1단계: Google Play Console 계정
- https://play.google.com/console 에서 가입
- 등록비: **$25 (1회, 약 ₩35,000)**

---

## 2단계: AdMob 계정 생성 (광고 수익)
- https://admob.google.com 에서 가입
- 앱 등록 → 광고 단위 생성 → **ca-pub-XXXXXXX** 와 **ad-slot** 발급받기
- index.html의 `ca-pub-XXXXXXXXXXXXXXXX` 와 `XXXXXXXXXX` 교체

---

## 3단계: TWA(Trusted Web Activity)로 앱 빌드
Netlify URL을 그대로 앱으로 포장하는 방법:

### 방법 A: PWABuilder 사용 (가장 쉬움, 무료)
1. https://www.pwabuilder.com 접속
2. Netlify URL 입력 (예: https://alexcmsyij.netlify.app)
3. "Android" 선택 → APK 다운로드
4. Play Console에서 APK 업로드

### 방법 B: Bubblewrap CLI (개발자용)
```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest https://alexcmsyij.netlify.app/manifest.json
bubblewrap build
```

---

## 4단계: 플레이스토어 등록 정보

### 앱 이름
```
Personal KPI - 목표 달성 관리
```

### 짧은 설명 (80자 이내)
```
나만의 KPI를 설정하고 달성률을 추적하세요. 목표 관리의 새로운 방법.
```

### 전체 설명
```
📊 Personal KPI - 개인 목표 달성 관리 앱

당신의 목표를 KPI로 설정하고 매일 달성률을 기록해보세요.

✅ 주요 기능
• KPI 목표 설정 - 수치 목표와 마감일 설정
• 달성률 추적 - 원형 그래프와 바 차트로 시각화
• 카테고리별 관리 - 업무/개인/운동/학습/재무
• 달성이력 - 연도별 목표 달성 기록 확인
• 대시보드 - 전체 현황 한눈에 파악
• 순위 - 달성률 순서로 목표 정렬

🎯 이런 분께 추천
• 연간 목표를 체계적으로 관리하고 싶은 분
• OKR/KPI 개념을 개인 생활에 적용하고 싶은 분
• 운동, 독서, 학습 등 습관 형성을 원하는 분
• 직장인, 자기계발러, 학생

💾 개인정보 보호
모든 데이터는 기기에만 저장되며 서버로 전송되지 않습니다.
```

### 카테고리
```
생산성
```

### 키워드 (ASO 최적화)
```
KPI, 목표관리, 할일관리, 자기계발, 목표달성, 생산성, 플래너, OKR, 습관관리, 목표추적
```

### 콘텐츠 등급
- 모든 연령 (Everyone)

---

## 5단계: 필수 제출 항목 체크리스트
- [ ] APK 또는 AAB 파일
- [ ] 앱 아이콘 512×512px PNG
- [ ] 스크린샷 최소 2장 (1080×1920px 권장)
- [ ] 개인정보처리방침 URL: `https://[your-netlify-url]/privacy.html`
- [ ] 앱 설명 (한국어)
- [ ] 콘텐츠 등급 설문 완료

---

## 6단계: 스크린샷 촬영 팁
- 폰에서 앱 실행 후 `목록`, `대시보드`, `이력` 각각 캡처
- Google Play에서 요구하는 최소 크기: 320×568px
- 권장: 1080×1920px (FHD)

---

## 예상 수익 타임라인
| 기간 | 목표 | 예상 수익 |
|------|------|---------|
| 1개월 | 100명 | ₩3,000~5,000 |
| 3개월 | 1,000명 | ₩30,000~50,000 |
| 6개월 | 5,000명 | ₩150,000~250,000 |
| 1년 | 10,000명+ | ₩300,000~500,000/월 |

> 💡 **핵심**: 초기에는 SNS(인스타, 블로그, 유튜브 쇼츠)로 직접 홍보가 가장 효과적

