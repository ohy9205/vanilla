// html로드 후 동작할 수 있도록 로드 이벤트 걸어야 함
document.addEventListener("DOMContentLoaded", () => {
  const $addContainer = document.querySelector(".add-container");
  const $addInput = document.querySelector(".add-input");
  const $listContainer = document.querySelector(".list-container");

  // 기능1. +버튼을 클릭하면 입력문자가 리스트에 추가됨
  $addContainer.addEventListener("submit", (e) => {
    e.preventDefault(); // submit막기

    if ($addInput.value.trim() !== "") {
      // 추가할 list 노드 생성
      const $newListItem = document.createElement("li");
      $newListItem.classList.add("list-item");

      const $newListCheckbox = document.createElement("input");
      $newListCheckbox.classList.add("class", "list-checkbox");
      $newListCheckbox.type = "checkbox";

      const $newListText = document.createElement("div");
      $newListText.classList.add("list-text");
      $newListText.textContent = $addInput.value;

      const $newListRemoveButton = document.createElement("button");
      $newListRemoveButton.classList.add("list-remove-button");
      $newListRemoveButton.textContent = "삭제";

      // 추가할 list 구성 조합
      $newListItem.appendChild($newListCheckbox);
      $newListItem.appendChild($newListText);
      $newListItem.appendChild($newListRemoveButton);
      $listContainer.appendChild($newListItem);

      // input비우기
      $addInput.value = "";

      // 각 요소에 이벤트 추가
      // 기능2. checkbox 클릭하면 완료 스타일 on/off
      $newListCheckbox.addEventListener("change", (e) => {
        if (e.target.checked === true) {
          $newListItem.classList.add("completed");
        } else {
          $newListItem.classList.remove("completed");
        }
      });

      // 기능3. 삭제버튼 클릭하면 리스트 삭제
      $newListRemoveButton.addEventListener("click", () => {
        $listContainer.removeChild($newListItem);
      });
    }
  });
});
