const menuList = document.getElementById("menuList");


const menuData = [
    {
        id: 1,
        menu: "한식",
        title: "불고기",
        content: "짜다 짜..\n야채가 하나도 없어서 아쉽..",
        createdAt: "2026.08.01"
    },
    {
        id: 2,
        menu: "한식",
        title: "김치찌개",
        content: "너무 많이 끓여서 내일도 먹어야겠군",
        createdAt: "2026.08.02"
    },
    {
        id: 3,
        menu: "면류",
        title: "비빔소면",
        content: "여름엔 소면이지!",
        createdAt: "2026.08.03"
    },
    {
        id: 4,
        menu: "간식",
        title: "핫도그",
        content: "JMTGR이라고 하죠?",
        createdAt: "2026.08.04"
    }
];


// 메뉴별 이모지
function getMenuEmoji(menu){

    if(menu === "한식"){
        return "🍚";
    }

    if(menu === "양식"){
        return "🥩";
    }

    if(menu === "면류"){
        return "🍜";
    }

    return "🥨";
}



// 카드 생성
function renderMenuCard(){

    menuList.innerHTML = menuData.map((menu)=>{

        return `
            <article class="menu-card">
                
            <button class="remove-card">
                    <span> 삭제 </span>
                </button>

                <div class="menu-emoji">
                    ${getMenuEmoji(menu.menu)}
                </div>

                <div class="menu-info">

                    <div class="menu-top">
                        <span>${menu.menu}</span>
                        <span>${menu.createdAt}</span>
                    </div>

                    <h3>${menu.title}</h3>

                    <p>
                        ${menu.content}
                    </p>

                </div>

            </article>
        `;

    }).join("");

}

renderMenuCard();

function 맨위로가기() {
            window.scrollTo({ top: 0, behavior: "smooth" })
        }

