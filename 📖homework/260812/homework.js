/* 처음 화면에 보여 줄 예시 데이터예요. */
const 기본일기목록 = [
    { 번호: 1, 감정: "슬퍼요", 이모지: "🍜", 날짜: "2026. 08. 12", 제목: "비가 와서 조금 울적했던 날", 내용: "비 오는 창밖을 보며 조용히 하루를 보냈다." },
    { 번호: 2, 감정: "놀랐어요", 이모지: "🍚", 날짜: "2026. 08. 12", 제목: "친구가 깜짝 선물을 주었다", 내용: "생각하지 못한 선물을 받아서 정말 놀랐다." },
    { 번호: 3, 감정: "화나요", 이모지: "🥩", 날짜: "2026. 08. 12", 제목: "버스를 눈앞에서 놓쳤다", 내용: "조금만 빨리 나올 걸 하는 생각이 들었다." },
    { 번호: 4, 감정: "행복해요", 이모지: "🍑", 날짜: "2026. 08. 12", 제목: "좋아하는 사람들과 맛있는 저녁", 내용: "함께 이야기하고 웃어서 행복한 하루였다." },
    { 번호: 5, 감정: "기타", 이모지: "🥨", 날짜: "2026. 08. 11", 제목: "오늘은 생각이 많았던 하루", 내용: "앞으로 하고 싶은 일을 천천히 정리해 보았다." },
    { 번호: 6, 감정: "놀랐어요", 이모지: "🍚", 날짜: "2026. 08. 11", 제목: "갑자기 눈이 내리기 시작했다", 내용: "봄인 줄 알았는데 눈이 와서 신기했다." },
    { 번호: 7, 감정: "화나요", 이모지: "🥩", 날짜: "2026. 08. 11", 제목: "할 일이 한꺼번에 몰려왔다", 내용: "하나씩 차근차근 해 보기로 마음먹었다." },
    { 번호: 8, 감정: "행복해요", 이모지: "🍑", 날짜: "2026. 08. 11", 제목: "산책길에서 예쁜 꽃을 발견했다", 내용: "작은 꽃 덕분에 기분이 좋아졌다." },
]

let 일기목록 = []
let 선택한감정 = "전체"
let 입력한검색어 = ""
let 강아지사진을불러왔는지 = false

/* 감정에 맞는 배경색과 글씨색을 알려 주는 함수예요. */
function 감정배경가져오기(감정) {
    if (감정 === "행복해요") return "행복배경"
    if (감정 === "슬퍼요") return "슬픔배경"
    if (감정 === "놀랐어요") return "놀람배경"
    if (감정 === "화나요") return "화남배경"
    return "기타배경"
}

function 감정글씨가져오기(감정) {
    if (감정 === "행복해요") return "행복글씨"
    if (감정 === "슬퍼요") return "슬픔글씨"
    if (감정 === "놀랐어요") return "놀람글씨"
    if (감정 === "화나요") return "화남글씨"
    return "기타글씨"
}

/* 일기 한 개를 카드 HTML로 바꾸는 함수예요. */
function 카드한개만들기(일기) {
    return `
        <div class="카드" onclick="상세페이지가기(${일기.번호})">
            <div class="사진상자 ${감정배경가져오기(일기.감정)}">
                <div class="이모지원">${일기.이모지}</div>
                <button class="삭제버튼" onclick="일기삭제하기(event, ${일기.번호})">×</button>
            </div>
            <div class="카드정보">
                <div class="${감정글씨가져오기(일기.감정)}">${일기.감정}</div>
                <div class="날짜">${일기.날짜}</div>
            </div>
            <div class="카드제목">${일기.제목}</div>
        </div>
    `
}

/* 받은 배열을 반복해서 화면에 넣어요. */
function 일기목록그리기(보여줄목록) {
    let 카드HTML = ""

    보여줄목록.map(function (일기) {
        카드HTML = 카드HTML + 카드한개만들기(일기)
    })

    if (카드HTML === "") {
        카드HTML = '<div class="결과없음">검색 결과가 없습니다.</div>'
    }

    document.getElementById("일기목록").innerHTML = 카드HTML
}

/* 탭을 누르면 필요한 메뉴만 보여줘요. */
function 메뉴이동(메뉴이름) {
    const 일기메뉴 = document.getElementById("일기메뉴")
    const 사진메뉴 = document.getElementById("사진메뉴")
    const 일기탭 = document.getElementById("일기탭")
    const 사진탭 = document.getElementById("사진탭")

    if (메뉴이름 === "일기") {
        일기메뉴.style.display = "block"
        사진메뉴.style.display = "none"
        일기탭.className = "탭버튼 선택된탭"
        사진탭.className = "탭버튼"
    } else {
        일기메뉴.style.display = "none"
        사진메뉴.style.display = "block"
        일기탭.className = "탭버튼"
        사진탭.className = "탭버튼 선택된탭"

        if (강아지사진을불러왔는지 === false) {
            강아지사진불러오기()
        }
    }
}

/* 강아지 사진 한 장을 만드는 작은 컴포넌트예요. */
function 강아지사진컴포넌트(사진주소) {
    return `
        <div class="강아지사진상자">
            <img class="강아지사진" src="${사진주소}" alt="강아지 사진" onload="사진로딩완료(event)" />
        </div>
    `
}

function 강아지사진불러오기() {
    const 사진목록 = document.getElementById("강아지사진목록")
    강아지사진을불러왔는지 = true

    사진목록.innerHTML = `
        <div class="강아지사진상자"></div>
        <div class="강아지사진상자"></div>
        <div class="강아지사진상자"></div>
    `

    fetch("https://dog.ceo/api/breeds/image/random/10")
        .then(function (받아온결과) {
            return 받아온결과.json()
        })
        .then(function (객체만뽑힌결과) {
            사진목록.innerHTML = 객체만뽑힌결과.message.map(function (사진주소) {
                return 강아지사진컴포넌트(사진주소)
            }).join("")
        })
        .catch(function () {
            강아지사진을불러왔는지 = false
            사진목록.innerHTML = '<div class="사진오류">사진을 불러오지 못했어요.</div>'
        })
}

function 사진비율바꾸기(event) {
    document.getElementById("강아지사진목록").className = "강아지사진목록 " + event.target.value
}

function 사진로딩완료(event) {
    event.target.style.opacity = 1
}

/* localStorage에 저장된 일기를 준비해요. */
function 처음화면준비하기() {
    const 저장된일기 = localStorage.getItem("감정일기목록")

    if (저장된일기 === null) {
        일기목록 = 기본일기목록
        localStorage.setItem("감정일기목록", JSON.stringify(일기목록))
    } else {
        일기목록 = JSON.parse(저장된일기)
    }

    일기목록그리기(일기목록)
}

/* select 또는 input이 바뀌면 조건에 맞는 일기만 찾아요. */
function 일기검색하기() {
    const 검색결과 = 일기목록.filter(function (일기) {
        const 감정이맞는지 = 선택한감정 === "전체" || 일기.감정 === 선택한감정
        const 제목에있는지 = 일기.제목.indexOf(입력한검색어) !== -1
        return 감정이맞는지 && 제목에있는지
    })

    일기목록그리기(검색결과)
}

function 감정바꾸기(event) {
    선택한감정 = event.target.value
    일기검색하기()
}

function 검색어바꾸기(event) {
    입력한검색어 = event.target.value
    일기검색하기()
}

function 상세페이지가기(번호) {
    location.href = "./homework-detail.html?number=" + 번호
}

function 일기삭제하기(event, 번호) {
    event.stopPropagation()

    const 정말삭제할지 = confirm("이 일기를 삭제할까요?")
    if (정말삭제할지 === false) return

    일기목록 = 일기목록.filter(function (일기) {
        return 일기.번호 !== 번호
    })

    localStorage.setItem("감정일기목록", JSON.stringify(일기목록))
    일기검색하기()
}

function 모달열기(모달아이디) {
    window.scrollTo({ top: 0 })
    document.getElementById(모달아이디).style.display = "flex"
    document.body.style.overflow = "hidden"
}

function 모달닫기(모달아이디) {
    document.getElementById(모달아이디).style.display = "none"
    document.body.style.overflow = ""
}

function 등록모달모두닫기() {
    document.getElementById("등록완료모달배경").style.display = "none"
    document.getElementById("등록모달배경").style.display = "none"
    document.body.style.overflow = ""
}

function 선택한감정가져오기() {
    if (document.getElementById("행복").checked) return "행복해요"
    if (document.getElementById("슬픔").checked) return "슬퍼요"
    if (document.getElementById("놀람").checked) return "놀랐어요"
    if (document.getElementById("화남").checked) return "화나요"
    return "기타"
}

function 감정이모지가져오기(감정) {
    if (감정 === "행복해요") return "🍑"
    if (감정 === "슬퍼요") return "🍜"
    if (감정 === "놀랐어요") return "🍚"
    if (감정 === "화나요") return "🥩"
    return "🥨"
}

function 등록버튼확인하기() {
    const 제목 = document.getElementById("제목").value
    const 내용 = document.getElementById("내용").value
    document.getElementById("등록버튼").disabled = 제목 === "" || 내용 === ""
}

function 일기등록하기() {
    const 감정 = 선택한감정가져오기()
    const 오늘 = new Date()
    const 날짜 = 오늘.getFullYear() + ". " + (오늘.getMonth() + 1) + ". " + 오늘.getDate()

    const 새일기 = {
        번호: 오늘.getTime(),
        감정: 감정,
        이모지: 감정이모지가져오기(감정),
        날짜: 날짜,
        제목: document.getElementById("제목").value,
        내용: document.getElementById("내용").value
    }

    일기목록.push(새일기)
    localStorage.setItem("감정일기목록", JSON.stringify(일기목록))

    document.getElementById("제목").value = ""
    document.getElementById("내용").value = ""
    document.getElementById("행복").checked = true
    document.getElementById("등록버튼").disabled = true

    일기검색하기()
    모달열기("등록완료모달배경")
}

function 맨위로가기() {
    window.scrollTo({ top: 0, behavior: "smooth" })
}

/* ESC 키를 누르면 열려 있는 등록 모달을 모두 닫아요. */
window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        등록모달모두닫기()
    }
})

window.onload = function () {
    처음화면준비하기()
}

/* 다크모드 추가 */
const 다크모드기능 = () => {
            document.body.classList.toggle("다크모드만들기")
        }


/*페이지네이션*/
let 현재페이지 = 1;

const 다음페이지 = () => {
    현재페이지 = 현재페이지 + 1;

    fetch(`https://example.com/posts?page=${현재페이지}`)
        .then((응답) => 응답.json())
        .then((데이터) => {
            console.log(데이터);
        });
};