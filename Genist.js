// DOMContentLoaded 이벤트가 발생하면 실행될 함수
document.addEventListener('DOMContentLoaded', function () {
    // HTML 요소들을 변수에 할당
    const $startBtn = document.getElementById('startConversationBtn');
    const $scheduleButtons = document.querySelector('.schedule-buttons');
    const $answer = document.querySelector('.answer');
    const $chattingButtons = document.querySelector('.chatting-buttons');
    const scheduleList = []; // 일정 목록을 담는 배열

    // HTML 요소를 화면에 표시하는 함수
    function showElement(element) {
        element.style.display = 'flex';
    }

    // HTML 요소를 화면에서 숨기는 함수
    function hideElement(element) {
        element.style.display = 'none';
    }

    // 대화창에 메시지를 추가하는 함수
    function appendMessage(role, content) {
        const currentDateTime = new Date().toLocaleString('ko-KR');
        const chatMessage = document.createElement('p');
        chatMessage.innerHTML = `${currentDateTime} - ${role === 'user' ? '나' : '지니스트'} : ${content}`;
        chatMessage.classList.add(role === 'user' ? 'user-message' : 'genist-message');
        $answer.appendChild(chatMessage);
    }

    // 버튼 클릭에 대한 처리를 담당하는 함수
    function handleButtonClick(action) {
        appendMessage('user', action);
        action === '일정추가' ? promptUserForSchedule() : chatGPTAPI(action);
    }

    // 사용자에게 일정 정보를 입력받는 함수
    function promptUserForSchedule() {
        const date = prompt('일정 날짜를 입력해주세요. (ex : 2024-02-16)');
        const time = prompt('일정 시간을 입력해주세요. (ex : 09:00)');
        const title = prompt('일정 제목을 입력해주세요. (ex : 미니 프로젝트)');

        if (date && time && title) {
            const scheduleInput = { date, time, title };
            isScheduleDuplicate(scheduleInput) ? appendMessage('genist', '이미 추가된 일정입니다.') : handleScheduleAddition(scheduleInput);
        } else {
            appendMessage('user', '일정 추가 취소');
        }
    }

    // 이미 추가된 일정인지 확인하는 함수
    function isScheduleDuplicate(newSchedule) {
        return scheduleList.some(existingSchedule =>
            existingSchedule.date === newSchedule.date &&
            existingSchedule.time === newSchedule.time &&
            existingSchedule.title === newSchedule.title
        );
    }

    // 일정을 추가하는 함수
    function handleScheduleAddition(scheduleInput) {
        scheduleList.push(scheduleInput);
        appendMessage('genist', `일정이 추가되었습니다: ${scheduleInput.date} ${scheduleInput.time} - ${scheduleInput.title}`);
    }

    // 일정 조회 또는 삭제에 대한 처리를 담당하는 함수
    function handleViewOrDeleteSchedule(action) {
        const scheduleOperation = action === '일정조회' ? handleViewSchedule : handleDeleteSchedule;
        handleButtonClick(action);
        scheduleOperation();
    }

    // 일정 조회 처리를 담당하는 함수
    function handleViewSchedule() {
        const resultMessage = scheduleList.length > 0 ?
            `일정 조회 결과: ${scheduleList.map(schedule => `${schedule.date} ${schedule.time} - ${schedule.title}`).join(', ')}` :
            '일정이 없습니다.';
        appendMessage('genist', resultMessage);
    }

    // 일정 삭제 처리를 담당하는 함수
    function handleDeleteSchedule() {
        const titleToDelete = prompt('삭제할 일정의 제목을 입력해주세요.');

        if (titleToDelete) {
            const indexToDelete = scheduleList.findIndex(schedule =>
                schedule.title === titleToDelete
            );

            if (indexToDelete !== -1) {
                scheduleList.splice(indexToDelete, 1);
                appendMessage('genist', `일정이 삭제되었습니다: ${titleToDelete}`);
            } else {
                // 해당 제목의 일정을 찾을 수 없을 경우
                appendMessage('genist', '해당 제목의 일정을 찾을 수 없습니다. 일정 제목을 다시 한 번 입력해주세요.');
            }
        } else {
            // 사용자가 취소한 경우
            appendMessage('user', '일정 삭제 취소');
        }
    }

    // GPT API를 호출하는 함수
    function chatGPTAPI(action) {
        const data = [
            { "role": "system", "content": "Genist는 Genius와 Assist의 합성어로 일정 관리를 도와줄 뛰어난 개인 비서 입니다." },
            { "role": "user", "content": action }
        ];

        const url = 'https://open-api.jejucodingcamp.workers.dev/';

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            redirect: 'follow'
        })
        .then(res => res.json())
        .then(res => {
            const currentDateTime = new Date().toLocaleString('ko-KR');
            const chatMessage = document.createElement('p');
            chatMessage.innerHTML = `${currentDateTime} - ${res.choices[0].role === 'genist' ? '나' : '지니스트'} : ${res.choices[0].message.content}`;
            chatMessage.classList.add(res.choices[0].role === 'user' ? 'user-message' : 'genist-message');
            // $answer.appendChild(chatMessage);
        })
        .catch(error => {
            console.error('데이터를 불러오는 중 에러 발생:', error);
            $answer.innerHTML = '<p>에러가 발생했습니다.</p>';
        });
    }

    // 시작 버튼 클릭 시 초기 설정을 변경하고 인사 메시지를 표시하는 함수
    $startBtn.addEventListener('click', () => {
        showElement($scheduleButtons);
        showElement($chattingButtons);
        hideElement($startBtn);
        appendMessage('genist', "저는 Genius와 Assist의 합성어로 당신의 일정 관리를 도와줄 뛰어난 개인 비서입니다. 어떤 도움이 필요한지 아래의 버튼을 눌러주세요.");
    });

    // 각 버튼에 이벤트 리스너 추가
    document.getElementById('addScheduleBtn').addEventListener('click', () => handleButtonClick('일정추가'));
    document.getElementById('viewScheduleBtn').addEventListener('click', () => handleViewOrDeleteSchedule('일정조회'));
    document.getElementById('deleteScheduleBtn').addEventListener('click', () => handleViewOrDeleteSchedule('일정삭제'));
});
