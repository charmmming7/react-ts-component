# React + TypeScript Component via Storybook
Storybook을 통해 화면을 확인 할 수 있는 React + TypeScript로 제작된 UI 컴포넌트


크로마틱 확인 경로: https://www.chromatic.com/library?appId=6336ce94bec70fd3fe9f8b2e

## Getting Started

### 패키지 설치

```zsh
npm install
or
yarn install
```

### storybook 실행

```zsh
npm run storybook
or
yarn storybook
```

### storybook 빌드
```zsh
npm run build-storybook
or
yarn build-storybook
```

chromatic


### vscode 포매터 설정
- `Preference > Settings > Workspace > settings.json`

```json
{
  "editor.formatOnSave": false,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": [
    "source.fixAll.format",
    "source.fixAll.eslint",
    "source.fixAll.stylelint",
  ],
}
```
