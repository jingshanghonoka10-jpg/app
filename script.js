// 仮のデータ（後でGASから取得するように変更します）
const membersData = {
  student: [
    { id: 's1', name: '風間愛理' },
    { id: 's2', name: '嶋田雄太' },
    { id: 's3', name: '平田健太' }
  ],
  supporter: [
    { id: 'p1', name: '高木烈' },
    { id: 'p2', name: '上田唯' },
    { id: 'p3', name: '南理子' }
  ]
};

let currentTab = 'student';
let presentIds = new Set();

// 1. 画面のリストを描画する関数
function renderLists() {
  const absentListElement = document.getElementById('absent-list');
  const presentListElement = document.getElementById('present-list');
  
  if (!absentListElement || !presentListElement) return; // エラー回避

  absentListElement.innerHTML = '';
  presentListElement.innerHTML = '';

  membersData[currentTab].forEach(member => {
    const li = document.createElement('li');
    li.className = 'list-item';
    li.textContent = member.name;
    
    li.onclick = () => {
      if (presentIds.has(member.id)) {
        presentIds.delete(member.id);
      } else {
        presentIds.add(member.id);
      }
      renderLists();
    };

    if (presentIds.has(member.id)) {
      presentListElement.appendChild(li);
    } else {
      absentListElement.appendChild(li);
    }
  });
}

// 2. タブを切り替える関数
function switchTab(tabName) {
  currentTab = tabName;
  
  document.getElementById('tab-student').classList.remove('active');
  document.getElementById('tab-supporter').classList.remove('active');
  document.getElementById(`tab-${tabName}`).classList.add('active');
  
  renderLists();
}

// 3. 画面を切り替える関数（メニュー ⇔ 各画面）
function changeScreen(targetScreenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    screen.style.display = 'none';
  });
  
  document.getElementById(targetScreenId).style.display = 'block';
}

// 4. 決定ボタンを押した時の処理（トースト通知）
// 決定ボタンを押した時の処理（トースト通知 ＋ ホームへ戻る）
function submitData() {
  console.log("送信する出席者ID:", Array.from(presentIds));

  // 1. ポップアップ（トースト）を表示する処理
  const toast = document.getElementById("toast");
  if (toast) {
    toast.classList.add("show");
    setTimeout(() => { 
      toast.classList.remove("show"); 
    }, 3000);
  }


  changeScreen('home-screen');
}
// 最初に画面が開いた時にリストを描画
renderLists();