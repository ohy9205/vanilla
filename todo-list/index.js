{
  document.addEventListener("DOMContentLoaded", () => {
    const $addContainer = getElement(".add-container");
    const $addInput = getElement(".add-input");
    const $listContainer = getElement(".list-container");

    // 기능1. 입력창에 글자를 입력하고 추가하면 리스트에 아이템이 추가됨
    addEvent($addContainer, "submit", (e) => {
      e.preventDefault(); // submit막기

      if ($addInput.value.trim() !== "") {
        // 추가할 list요소 생성
        const $newListItem = createElement("li");
        addClassList($newListItem, "list-item");

        const $newListCheckbox = createElement("input");
        addClassList($newListCheckbox, "list-checkbox");
        setAttribute($newListCheckbox, "type", "checkbox");

        const $newListText = createElement("span");
        addClassList($newListText, "list-text");
        $newListText.textContent = $addInput.value;

        const $newListRemoveButton = createElement("button");
        addClassList($newListRemoveButton, "list-remove-button");
        $newListRemoveButton.textContent = "삭제";

        // 추가할 list요소 조합
        appendChild($newListItem, $newListCheckbox);
        appendChild($newListItem, $newListText);
        appendChild($newListItem, $newListRemoveButton);
        appendChild($listContainer, $newListItem);

        // input비우기
        $addInput.value = "";

        // 각 요소에 이벤트 추가
        // 기능2. checkbox 클릭하면 완료 스타일 on/off
        addEvent($newListCheckbox, "change", (e) => {
          if (e.target.checked === true) {
            addClassList($newListItem, "list-item-completed", "zzz");
          } else {
            removeClassList($newListItem, "list-item-completed", "zzz");
          }
        });

        // 기능3. 삭제버튼 클릭하면 리스트 삭제
        addEvent($newListRemoveButton, "click", () => {
          $listContainer.removeChild($newListItem);
        });
      }
    });
  });

  /** 함수분리 */
  // element 추출
  const getElement = (selector) => {
    return document.querySelector(selector);
  };

  // element 생성
  const createElement = (tag) => {
    return document.createElement(tag);
  };

  // class추가
  const addClassList = (node, ...value) => {
    node.classList.add(...value);
  };

  // class제거
  const removeClassList = (node, ...value) => {
    node.classList.remove(...value);
  };

  // attribute설정
  const setAttribute = (node, attribute, value) => {
    node.setAttribute(attribute, value);
  };

  // child node 추가
  appendChild = (base, child) => {
    base.appendChild(child);
  };

  // event 추가
  addEvent = (node, eventType, callback) => {
    node.addEventListener(eventType, callback);
  };
}
