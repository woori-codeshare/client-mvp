export const INITIAL_CODE = `
function example() {
    console.log("Hello, CodeShare!");
}
`.trim();

export const INITIAL_SNAPSHOT = {
  id: 1,
  timestamp: new Date().toISOString(),
  title: "Initial Code",
  description: "Initial code setup with basic example function",
  code: INITIAL_CODE,
};

export const INITIAL_MESSAGES = [
  {
    id: 1,
    text: "CodeShare는 어떻게 사용하나요?",
    timestamp: new Date(Date.now() - 300000),
    user: { name: "Student" },
    replies: [
      {
        id: 2,
        text: "코드를 작성하고 공유할 수 있습니다. 코드 에디터에 코드를 입력하여 스냅샷을 생성하고, 왼쪽 사이드바를 통해 저장된 코드를 확인할 수 있어요.",
        timestamp: new Date(Date.now() - 180000),
        user: { name: "Instructor", isInstructor: true },
      },
      {
        id: 3,
        text: "질문이 있는경우 하단의 채팅창을 이용하시면 됩니다.",
        timestamp: new Date(Date.now() - 120000),
        user: { name: "Instructor", isInstructor: true },
      },
    ],
  },
];
