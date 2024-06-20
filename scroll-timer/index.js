{
  document.addEventListener("DOMContentLoaded", () => {
    const $main = document.getElementsByTagName(".container")[0];
    const $list = document.querySelector(".list");
    const $end = document.querySelector(".end");
    let $listLastItem = $list.lastElementChild;

    // 1. 무한스크롤 (5개씩)
    // 관찰자 설정
    const intersectCallback = (
      entries, // IntersectionObserverEntry 인스턴스 배열
      observer // 콜백 실행되는 해당 인스턴스
    ) => {
      // 무한스크롤 종료
      if ($list.childElementCount >= 20) {
        observer.disconnect();
        return;
      }
      // 관찰요소가 교차되는지 판별
      if (entries[0].isIntersecting) {
        // 데이터 추가
        for (let i = 0; i < 5; i++) {
          const $newListItem = makeNewListItem(
            Number($listLastItem.textContent) + i + 1
          );
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
  });
}

const makeNewListItem = (index) => {
  const $listItem = document.createElement("li");
  $listItem.classList.add(`list-item`);
  $listItem.setAttribute("data-index", `${index}`);
  $listItem.textContent = index;
  return $listItem;
};
