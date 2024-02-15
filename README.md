# 개인 비서, 지니스트 (Genist)
>**Genius와 Assist의 합성어로 스케줄 관리나 개인에게 도움을 줄 수 있는 뛰어난 개인 비서를 의미합니다.**

### 💻 소개
>**HTML / CSS / JS MINI 개인 프로젝트** <br>
>**주제는 ChatGPT를 이용한 자율 주제로 제공된 서버 API를 이용하여 간단한 서비스를 구현하는 것이 목표입니다.**

### 🕰 기간
>**2024-02-13 ~ 2024-02-16**

### ⚙ 환경
>**IDE : Visual Studio Code** <br>
>**Code : HTML, CSS, JavaScript** <br>
>**배포 URL : https://soohyun020812.github.io/Portfolio/**

### 📌 기능
>**일정 추가** <br>
>**일정 조회** <br>
>**일정 삭제** <br>
>~~**지니스트 채팅**~~ <br>
>~~**지니스트 종료**~~

### 📂 구조
📦 24.02.13_02.16_프로젝트1 <br>
 ┣ 📜index.html <br>
 ┣ 📜Genist.css <br>
 ┣ 📜Genist.js <br>
 ┗ 📜README.md

### 🔎 WBS
```mermaid
gantt
    title 지니스트 개발 세부화
    dateFormat    YYYY-MM-DD

    section 계획 단계
    프로젝트 목표 : 2024-02-13, 1d
    주요 기능 : 2024-02-13, 1d
    요구사항 수집 : 2024-02-13, 1d
    
    section 설계 단계
    WBS 작성 : 2024-02-14, 1d
    와이어프레임 작성 : 2024-02-14, 1d
    AI API 연결 : 2024-02-14, 1d

    section 개발 단계
    개발 구현 : 2024-02-14, 2d
    UI 프로토타입 : 2024-02-15, 1d
    
    section 테스팅 및 배포
    개발 테스트 : 2024-02-15, 1d
    배포 준비 : 2024-02-15, 1d
    실제 배포 : 2024-02-15, 1d

    section 발표
    기능 발표 : 2024-02-16, 1d
```

### 📏 와이어프레임
![24 02 14 미니프로젝트 와이어프레임  지니스트 처음](https://github.com/soohyun020812/Portfolio/assets/131852352/46f7633c-6965-479d-9468-54c50821059d)
![24 02 14 미니프로젝트 와이어프레임  지니스트 일정추가 (1)](https://github.com/soohyun020812/Portfolio/assets/131852352/776432ce-37c1-4584-a23d-5c8e387a6d0f)
![24 02 14 미니프로젝트 와이어프레임  지니스트 일정 조회, 삭제](https://github.com/soohyun020812/Portfolio/assets/131852352/e871f7aa-75d6-49dd-8fb3-e4fec385cd2d)

### 📱 구현 화면
![지니스트 시작화면](https://github.com/soohyun020812/Portfolio/assets/131852352/dc8eb89e-eebd-4b36-bb98-41c270162174)
![지니스트 화면](https://github.com/soohyun020812/Portfolio/assets/131852352/44caee5f-f729-49cb-86fc-5df3225487ab)

### 💥 에러와 해결
<img width="870" alt="Screenshot_2024-02-14_at_5 58 24_PM" src="https://github.com/soohyun020812/Portfolio/assets/131852352/5740a69d-dd05-47a5-8c14-31d0a6a3a681">
버튼을 구성했을 때 일정추가, 일정조회, 일정삭제 총 3개의 버튼을 생성했다. <br>
버튼의 정렬이 세로로 왼쪽에 치우쳐 있었는데 이를 일렬의 가로로 배치하는 과정에서 문제가 생겼다. <br>
해결 방법은 관련 3개의 버튼을 새로운 div로 묶고, container을 flex로 세로정렬하여 3개의 버튼을 묶고 해결되었다. <br>
<hr>
![문제해결](https://github.com/soohyun020812/Portfolio/assets/131852352/f42cc61c-8522-42c7-b0e5-7385ef347eeb)
사용자가 일정추가를 완료하고 일정조회, 일정삭제를 진행할 때 출력값과 API의 출력 2개가 겹치는 문제가 생겼다. <br>
문제 원인은 조회 버튼에 appendMessage로 일정 조회 결과를 출력한 후, fetch의 결과로 appendChild가 발생하는 것이었다. <br>
해당 부분을 제외하기 위해 $answer.appendChild(chatMessage); 코드를 주석 처리 해주었다.

### 💭 프로젝트 회고
프로젝트를 진행하며 기획 단계의 중요성을 다시 한 번 깨달을 수 있었다. <br>
팀원들과의 협업 프로젝트에서는 각자의 경험과 아이디어를 나누며 역할을 분담하는 시간이 있었지만, <br>
개인 프로젝트는 처음부터 끝까지 스스로 수행해야 하는 부분에서 첫 걸음의 중요성을 명확히 이해되었다. <br>
기획 단계를 탄탄하게 수립하면 프로젝트 진행 중에 해야 할 일들의 방향성이 명확해지고, 작업이 원활하게 진행될 수 있지만 <br>
기획이 부족하거나 미흡할 경우 프로젝트 진행 중 어려움에 부딪히는 경험을 겪게 되었다. <br>
이러한 경험을 통해 개발 과정에서 기획 단계의 중요성을 다시금 인지하며, <br>
앞으로의 프로젝트에서는 기획 단계에 더욱 신경을 쓰고 초기에 충분한 시간을 통해 목표와 방향을 명확히 정립해야겠다. <br>
다음 프로젝트를 진행하게 될 경우 예상치 못한 문제를 대처할 수 있는 능력을 키울 수 있었던 것 같다.
