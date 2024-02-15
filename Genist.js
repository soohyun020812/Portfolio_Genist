document.addEventListener('DOMContentLoaded', function () {
    const $startBtn = document.getElementById('startConversationBtn');
    const $addBtn = document.getElementById('addScheduleBtn');
    const $viewBtn = document.getElementById('viewScheduleBtn');
    const $deleteBtn = document.getElementById('deleteScheduleBtn');
    const $answer = document.querySelector('.answer');
    const $scheduleButtons = document.querySelector('.schedule-buttons');

    // 일정 목록을 저장할 배열
    const scheduleList = [];

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
        // 일정 조회 버튼을 눌렀을 때의 동작을 정의
        handleViewSchedule();
    });

    $deleteBtn.addEventListener('click', () => {
        handleButtonClick('일정삭제');
        // 일정 삭제 버튼을 눌렀을 때의 동작을 정의
        handleDeleteSchedule();
    });

    function showScheduleButtons() {
        $scheduleButtons.style.display = 'flex';
        $startBtn.style.display = 'none';
    }

    function promptUserForSchedule() {
        const date = prompt('일정 날짜를 입력해주세요. (ex : 2024-02-16)');
        const time = prompt('일정 시간을 입력해주세요. (ex : 14:00)');
        const title = prompt('일정 제목을 입력해주세요. (ex : 미니 프로젝트)');

        if (date && time && title) {
            const scheduleInput = { date, time, title };
            
            // 중복 체크
            if (!isScheduleDuplicate(scheduleInput)) {
                handleScheduleAddition(scheduleInput);
            } else {
                appendMessage('genist', '이미 추가된 일정입니다.');
            }
        } else {
            appendMessage('user', '일정 추가 취소');
        }
    }

    function isScheduleDuplicate(newSchedule) {
        // 중복 체크를 위해 기존 일정 목록에서 동일한 날짜, 시간, 제목을 가진 일정이 있는지 확인
        return scheduleList.some(existingSchedule => 
            existingSchedule.date === newSchedule.date &&
            existingSchedule.time === newSchedule.time &&
            existingSchedule.title === newSchedule.title
        );
    }

    function handleScheduleAddition(scheduleInput) {
        scheduleList.push(scheduleInput); // 일정 목록에 추가
        appendMessage('genist', `일정이 추가되었습니다: ${scheduleInput.date} ${scheduleInput.time} - ${scheduleInput.title}`);
    }

    function handleViewSchedule() {
        // 예시: 일정 조회 API 호출 또는 다른 로직 수행
        const scheduleDisplay = scheduleList.map(schedule =>
            `${schedule.date} ${schedule.time} - ${schedule.title}`
        );
        const resultMessage = scheduleList.length > 0 ?
            `일정 조회 결과: ${scheduleDisplay.join(', ')}` :
            '일정이 없습니다.';
        appendMessage('genist', resultMessage);
    }

    function handleDeleteSchedule() {
        const scheduleToDelete = prompt('삭제할 일정을 입력해주세요.');

        if (scheduleToDelete) {
            // 예시: 일정 삭제 API 호출 또는 다른 로직 수행
            const indexToDelete = scheduleList.findIndex(schedule =>
                `${schedule.date} ${schedule.time} - ${schedule.title}` === scheduleToDelete
            );
            if (indexToDelete !== -1) {
                scheduleList.splice(indexToDelete, 1); // 일정 목록에서 삭제
                appendMessage('genist', `일정이 삭제되었습니다: ${scheduleToDelete}`);
            } else {
                appendMessage('genist', '해당 일정을 찾을 수 없습니다.');
            }
        } else {
            appendMessage('user', '일정 삭제 취소');
        }
    }

    window.handleButtonClick = function(action) {
        appendMessage('user', action);

        // '일정 추가' 버튼을 클릭한 경우에만 promptUserForSchedule 호출
        if (action === '일정추가') {
            promptUserForSchedule();
        } else {
            chatGPTAPI(action);
        }
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

            // 이전 채팅 기록 컨테이너에 새로운 메시지 추가 (맨 아래에)
            $answer.appendChild(chatMessage);
        })
        .catch(error => {
            console.error('데이터를 불러오는 중 에러 발생:', error);
            $answer.innerHTML = '<p>에러가 발생했습니다.</p>';
        });
    }

    function appendMessage(role, content) {
        const currentDateTime = new Date().toLocaleString('ko-KR');
        const chatMessage = document.createElement('p');
        chatMessage.innerHTML = `${currentDateTime} - ${role === 'user' ? '나' : '지니스트'} : ${content}`;

        if (role === 'user') {
            chatMessage.classList.add('user-message');
        } else {
            chatMessage.classList.add('genist-message');
        }

        $answer.appendChild(chatMessage);
    }
});
