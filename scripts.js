const storage = window.localStorage;
const COUNT_KEY = "COUNT";
const LIST_KEY = "DATA";

const form = document.getElementById("terefa-form");
const list = document.getElementById("tarefa-list");

window.onload = function () {
    renderList();
};

form.onsubmit = function (e) {
  e.preventDefault();
  const descricaoElement = document.querySelector("input[name=descricao]");
  const value = descricaoElement.value;

  addItem(value);

  e.currentTarget.reset();
  // list.appendChild(createItem());
};

function renderList() {
  const list = getListStorage();

  for (let item of list.data) {
    renderItem(item.id, item.descricao);
  }
}

function addItem(descricao) {
  const count = storage.getItem(COUNT_KEY) | 1;
  renderItem(count, descricao);

  const listStorage = getListStorage();
  listStorage.data.push({ id: count, descricao });

  storage.setItem(LIST_KEY, JSON.stringify(listStorage));
  storage.setItem(COUNT_KEY, count + 1);
}

function renderItem(index, descricao) {
  const item = document.createElement("li");
  item.classList.add("item");

  const itemId = document.createElement("span");
  itemId.classList.add("item-id");
  itemId.textContent = "#" + index;

  const text = document.createElement("p");
  text.textContent = descricao;

  const remove = document.createElement("a");
  remove.textContent = "X";
  remove.classList.add("remove");

  remove.onclick = function () {
    removeItemStorage(index);
    list.removeChild(item);
  };

  item.appendChild(itemId);
  item.appendChild(text);
  item.appendChild(remove);

  list.prepend(item);
  return item;
}

function getListStorage() {
    const listStr = storage.getItem(LIST_KEY);
    let listStorage = { data: [] };
  
    if (!!listStr) {
      listStorage = JSON.parse(listStr);
    }
  
    return listStorage;
  }

  function removeItemStorage(index) {
      const list = getListStorage();
      const newList = list.data.filter(l => l.id !== index);
      storage.setItem(LIST_KEY, JSON.stringify({data: newList}));
  }