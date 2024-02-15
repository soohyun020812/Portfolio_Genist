document.addEventListener('DOMContentLoaded', function () {
    const $startBtn = document.getElementById('startConversationBtn');
    const $addBtn = document.getElementById('addScheduleBtn');
    const $viewBtn = document.getElementById('viewScheduleBtn');
    const $deleteBtn = document.getElementById('deleteScheduleBtn');
    const $answer = document.querySelector('.answer');
    const $scheduleButtons = document.querySelector('.schedule-buttons');
    const $chatContainer = document.createElement('div'); // 새로운 div 요소 생성

    $startBtn.addEventListener('click', () => {
        // '지니스트 시작하기' 버튼을 클릭하면 나머지 버튼들이 나타나도록 스타일 변경
        $scheduleButtons.style.display = 'flex'; // display 속성을 'flex'로 변경하여 보이도록 설정
        $startBtn.style.display = 'none'; // '지니스트 시작하기' 버튼은 숨김

        // 지니스트의 인삿말을 화면에 추가
        const genistGreeting = "저는 Genius와 Assist의 합성어로 당신의 일정 관리를 도와줄 뛰어난 개인 비서입니다. 어떤 도움이 필요한지 아래의 버튼을 눌러주세요.";
        appendMessage('genist', genistGreeting);
    });

    $addBtn.addEventListener('click', () => {
        handleButtonClick('일정추가');
    });

    $viewBtn.addEventListener('click', () => {
        handleButtonClick('일정조회');
    });

    $deleteBtn.addEventListener('click', () => {
        handleButtonClick('일정삭제');
    });

    function handleButtonClick(action) {
        // 선택된 작업을 채팅창에 표시
        appendMessage('user', action);

        // 작업에 따른 API 호출
        chatGPTAPI(action);
    }

    function chatGPTAPI(action) {
        const data = [
            {
                "role": "system",
                "content": "Genist는 Genius와 Assist의 합성어로 일정 관리를 도와줄 뛰어난 개인 비서 입니다."
            },
            {
                "role": "user",
                "content": action
            }
        ];

        const url = `https://open-api.jejucodingcamp.workers.dev/`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            redirect: 'follow'
        })
        .then(res => res.json())
        .then(res => {
            // API 응답 및 현재 날짜와 시간을 표시
            const currentDateTime = new Date().toLocaleString('ko-KR');
            const chatMessage = document.createElement('p');
            chatMessage.innerHTML = `${currentDateTime} - ${res.choices[0].role === 'genist' ? '나' : '지니스트'} : ${res.choices[0].message.content}`;

            // 사용자와 지니스트 메시지에 클래스 추가
            if (res.choices[0].role === 'user') {
                chatMessage.classList.add('user-message');
            } else {
                chatMessage.classList.add('genist-message');
            }

            // 이전 채팅 기록 컨테이너에 새로운 메시지 추가 (맨 아래에 추가)
            $answer.appendChild(chatMessage);
        })
        .catch(error => {
            console.error('데이터를 불러오는 중 에러 발생:', error);
            $answer.innerHTML = '<p>에러가 발생했습니다.</p>';
        });
    }

    // 사용자가 입력한 내용을 화면에 추가하는 함수
    function appendMessage(role, content) {
        const currentDateTime = new Date().toLocaleString('ko-KR');
        const chatMessage = document.createElement('p');
        chatMessage.innerHTML = `${currentDateTime} - ${role === 'user' ? '나' : '지니스트'} : ${content}`;

        // 사용자와 지니스트 메시지에 클래스 추가
        if (role === 'user') {
            chatMessage.classList.add('user-message');
        } else {
            chatMessage.classList.add('genist-message');
        }

        // 이전 채팅 기록 컨테이너에 새로운 메시지 추가 (맨 아래에 추가)
        $answer.appendChild(chatMessage);
    }
});