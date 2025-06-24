//루틴 페이지 (운동일지의 습관 기록표)
// ㄴ>  습관 수정, 타이머 클릭 시 저널 비밀번호 필요 
// 수정 및 기록 시 비밀번호 확인을 전제로함
//ㄴ> 습관 수정 시 루틴 상세 페이지로 이동 
//ㄴ> 운동기록(집중 클릭 시) 운동로그 페이지로 이동
import { Link } from 'react-router-dom';

function RoutinesHome() {
    return (
    <div>

      <div>
        <Link to="/RoutinesDetail">
        <button>오늘의 습관</button>
      </Link>
      <Link to="/ExerciseLogs">
        <button>오늘의 집중</button>
      </Link>
      <h1> 운동일지 이름</h1>
      <div>
        <span className='nickName'>닉네임</span>
        의 운동일지</div>
      </div>
      
      <div className='weeklyReport'>
        <div className='weekly'>
        <span>월</span>
        <span>화</span>
        <span>수</span>
        <span>목</span>
        <span>금</span>
        <span>토</span>
        <span>일</span>
        </div>
        <div className='routinesList'>
          <p>목록</p>
          </div>
      </div>
    
      
    </div>
  );
}

export default RoutinesHome;

