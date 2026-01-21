let taskInput = document.querySelector(".task-input");
let addBtn = document.querySelector(".add-btn");
let tasksCon = document.querySelector(".tasks-con");

let key;

if (localStorage.length < 1) {
  localStorage.setItem("key", "1");
  key = 1;
} else {
  key = localStorage.getItem("key");
  key = Number(key);
}

// event to style filter buttons

let filterBtns = document.querySelectorAll(".btn");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => {
      b.classList.remove("active");
    });
    btn.classList.add("active");
  });
});

addBtn.addEventListener("click", () => {
  let task = taskInput.value;
  taskInput.value = "";

  if (task != "") {
    let taskob = {
      key: key,

      task: task,

      completed: false,

      edit: function () {},

      delete: function () {},

      show: function () {
        let checkTask = document.createElement("div");
        checkTask.className = "check-task-con";

        let checkInput = document.createElement("input");
        checkInput.type = "checkbox";
        checkInput.className = "check";

        let statusImg = document.createElement("img");
        statusImg.src = "assets/equal.png";
        statusImg.classList.add("status-img", "pending");

        let para = document.createElement("p");
        para.className = "task-show";
        para.textContent = this.task;

        checkTask.append(checkInput, statusImg, para);

        let edtDlt = document.createElement("div");
        edtDlt.className = "edit-dlt-con";

        let edt = document.createElement("img");
        edt.src = "assets/pencil.png";
        edt.className = "pencil-img";

        let dlt = document.createElement("img");
        dlt.src = "assets/delete.png";
        dlt.className = "delete-img";

        edtDlt.append(edt, dlt);

        let dv = document.createElement("div");
        dv.classList.add("ex-task");
        // dv.innerHTML = taskDetails;

        dv.append(checkTask, edtDlt);

        tasksCon.append(dv);
      },
    };

    taskob.show(); // displaying the task on task container after add button

    localStorage.setItem(key, JSON.stringify(taskob));

    key++;
    localStorage.setItem("key", key);
  }
});

tasksCon.addEventListener("click", (e) => {
  console.log(e);
  if (e.target.classList.contains("delete-img")) {
    let task = e.target.closest(".ex-task");
    task.remove();
  }
});
