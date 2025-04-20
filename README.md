# na-cheong-woon-nhn-injeinc
나청운 - NHN INJEINC 사전 과제

### 실행
1. ```npm install```
2. ```npm run build```
3. ```npm run serve```
4. TC 실행: ```npm run test```

### 개발 환경 구성
- webpack 설정
    - webpack.config.js entry point 설정
    - ```npm run build``` 통해 번들 파일 생성
    - 소스 맵 생성 설정
- HMR
    - webpack-dev-server 사용하여 설정
    - ```npm run serve``` 명령
- ESLint 설정
    - eslint.config.mjs 파일에서 규칙 정의
    - eslint-plugin-typescript 사용하여 TypeScript 검사
- Babel 설정
    - babel.config.json 파일에서 설정
    - babel-loader 사용
- TypeScript 환경 구성
    - tsconfig.json 파일 설정
- TC 작성
    - ```npm run test``` 명령
    - Jest 사용하여 테스트 작성, ts-jest로 TypeScript 작성 파일 테스트 실행 설정
    - jest.config.ts 설정
    - ```__tests__``` : 디렉토리 내에 테스트 파일 관리

### 폴더 구조
```
/project-root
├── /__mocks__ 
│   ├── /styleMock.ts               # Jest 에서 CSS 오류 해결을 위한 설정
├── /__tests__
│   ├── /TodoApp.test.ts            # Jest 테스트 파일
├── /dist                           # bundle 빌드 파일
├── /node_modules                   
├── /src            
│   └── components
│       └── TodoFooterInfoSection   # 하단 정보부 
│       └── TodoInput               # 입력부
│       └── TodoList                # 목록부 
│   └── TodoApp.ts                  # 메인 애플리케이션
│   └── types                       # 타입 정의
│   └── utils                       # 유틸 함수수
```