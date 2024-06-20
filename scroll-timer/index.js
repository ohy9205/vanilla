{
  const COUNT_TIME = 3;
  const NOTIFICATION_TEXT = {
    active: `🕖 ${COUNT_TIME}초 구경하면 보상을 받아요`, // default값
    pause: "⬇️ 스크롤해야 시간이 줄어요",
    done: "🎉 리워드가 지급되었어요",
  };

  document.addEventListener("DOMContentLoaded", () => {
    const $main = document.querySelector(".container");
    const $list = document.querySelector(".list");
    const $end = document.querySelector(".end");
    const $notification = document.querySelector(".notification");

    $notification.textContent = NOTIFICATION_TEXT.active;
    let notificationMode = undefined;

    let $listLastItem = $list.lastElementChild;

    let updatedTime = COUNT_TIME;

    // 1. 무한스크롤 (5개씩)
    // 관찰자 설정
    const intersectCallback = (
      entries, // IntersectionObserverEntry 인스턴스 배열
      observer // 콜백 실행되는 해당 인스턴스
    ) => {
      // 관찰요소가 교차되는지 판별
      if (entries[0].isIntersecting) {
        // 데이터 추가
        for (let i = 0; i < 5; i++) {
          const curIndex = Number($listLastItem.textContent) + i + 1;
          const $newListItem = makeElement("li", "list-item");
          $newListItem.setAttribute("data-index", curIndex);
          $newListItem.textContent = curIndex;

          $list.append($newListItem);
        }
        $listLastItem = $list.lastElementChild;
      }
    };
    const intersectOptions = {
      root: $main, // 교차점을 인지하기 위해 반드시 상위요소를 등록해야함
      rootMargin: `0px`, // 교차지점을 계산하기 전 root외부의 여백크기 등을 등록함
      threshold: 0.25, // 교차 가시성 퍼센트
    };

    const observer = new IntersectionObserver(
      intersectCallback,
      intersectOptions
    );

    observer.observe($end);

    // 2. 스크롤 시 타이머
    // type1. 스크롤중
    const scrollCallback = () => {
      if (notificationMode === "done") {
        return;
      }
      notificationMode = "active";
      $notification.textContent = NOTIFICATION_TEXT.active;
    };

    // type2. 스크롤멈춤
    const scrollendCallback = () => {
      if (notificationMode === "done") {
        return;
      }
      notificationMode = "pause";
      $notification.textContent = NOTIFICATION_TEXT.pause;
    };

    // type3. 타이머완료
    const timerCompleted = () => {
      $notification.textContent = NOTIFICATION_TEXT.done;
      $notification.classList.add("done");
      $main.removeEventListener("scroll", scrollCallback);
      $main.removeEventListener("scrollend", scrollendCallback);
    };

    $main.addEventListener("scroll", scrollCallback);
    $main.addEventListener("scrollend", scrollendCallback);

    let curCount = 0;
    const timer = setInterval(() => {
      if (++curCount == 2 && notificationMode === undefined) {
        $notification.textContent = NOTIFICATION_TEXT.pause;
      } else if (notificationMode === "active") {
        NOTIFICATION_TEXT.active = NOTIFICATION_TEXT.active.replace(
          updatedTime,
          --updatedTime
        );
        if (updatedTime <= 0) {
          timerCompleted();
          clearInterval(timer);
        }
      }
    }, 1000);
  });
}

const makeElement = (tag, classList) => {
  const $elem = document.createElement(tag);
  if (Array.isArray(classList)) {
    $elem.classList.add(...classList);
  } else {
    $elem.classList.add(classList);
  }
  return $elem;
};

const startTimer = (timer, callback) => {
  return setInterval(() => {
    callback();
  }, timer);
};
