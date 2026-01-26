let appCon = document.querySelector("#AppCon");
let App = document.querySelector("#App");

let allFilterBtn = document.querySelector("#all-filter");
let pendingFilterBtn = document.querySelector("#pending-filter");
let completedFilterBtn = document.querySelector("#completed-filter");

let settingIcon = document.querySelector("#settingIcon");

let taskInput = document.querySelector(".task-input");
let addBtn = document.querySelector(".add-btn");

let tasksCon = document.querySelector(".tasks-con");

let totalCon = document.querySelector("#total");
let pendingCon = document.querySelector("#pending");

let clearBtn = document.querySelector(".clear");

let total;
let pending;

let inEdit = false,
  inSettings = false,
  inFirstSetting = false;

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

// function for delete all recoreds setting
let finalDeleteFun = () => {
  inFirstSetting = false;

  let finalDeleteCon = document.createElement("div");
  finalDeleteCon.className = "finaldeletecon";

  let headerCon = document.createElement("div");
  headerCon.className = "headercon";

  let finalDeleteImg = document.createElement("img");
  finalDeleteImg.src = "assets/trash-2.png";
  finalDeleteImg.className = "finaldelete";

  let finalTitle = document.createElement("p");
  finalTitle.textContent = "Clear All Tasks?";
  finalTitle.className = "finalmsg";

  headerCon.append(finalDeleteImg, finalTitle);

  let deleteQuestionBtn = document.createElement("div");
  deleteQuestionBtn.className = "delete-question-btn";

  let finalQuestion = document.createElement("p");
  finalQuestion.classList.add("finalquestion");
  finalQuestion.textContent = "Are you sure you want to clear all tasks?";

  let finalBtnCon = document.createElement("div");
  finalBtnCon.className = "finalbtncon";

  let finalCancel = document.createElement("button");
  finalCancel.textContent = "Cancel";
  finalCancel.className = "finalcancel";

  let finalClear = document.createElement("button");
  finalClear.textContent = "Clear All";
  finalClear.className = "finalclear";

  finalBtnCon.append(finalCancel, finalClear);

  deleteQuestionBtn.append(finalQuestion, finalBtnCon);

  finalDeleteCon.append(headerCon, deleteQuestionBtn);

  appCon.append(finalDeleteCon);

  let closeDelete = () => {
    finalDeleteCon.remove();
    headerCon.remove();
    finalDeleteImg.remove();
    finalTitle.remove();
    deleteQuestionBtn.remove();
    finalQuestion.remove();
    finalBtnCon.remove();
    finalCancel.remove();
    finalClear.remove();
  };

  // function for final cancel event
  let finalCancelEvent = () => {
    inSettings = false;

    closeDelete();

    settingFun();
  };

  let finalCancelEsc = (e) => {
    if (e.key == "Escape" && inSettings == true) {
      finalCancelEvent();

      document.removeEventListener("keydown", finalCancelEsc);
      document.removeEventListener("keyup", finalSaveEsc);
    }
  };

  // function for final cancel event
  let finalSaveEvent = () => {
    inSettings = false;

    localStorage.clear();
    localStorage.setItem("key", "1");
    key = 1;
    tasksCon.innerHTML = "";

    setTimeout(() => {
      closeDelete();
    }, 250);

    summary();
    App.classList.remove("appOnSetting");
  };

  let finalSaveEsc = (e) => {
    if (e.key == "Enter" && inSettings == true) {
      finalSaveEvent();

      document.removeEventListener("keydown", finalCancelEsc);
      document.removeEventListener("keyup", finalSaveEsc);
    }
  };

  // assigning esc function to canccl event
  document.addEventListener("keydown", finalCancelEsc);

  // event when clicked on cancel button in delete all panel
  finalCancel.addEventListener("click", finalCancelEvent);

  // assigning esc function to clear event
  document.addEventListener("keyup", finalSaveEsc);

  // to delete all records
  finalClear.addEventListener("click", finalSaveEvent);
};

// funtion when clicked on settings
let settingFun = () => {
  inSettings = true;
  inFirstSetting = true;

  let settingPopUp = document.createElement("div");
  settingPopUp.classList.add("setting-pop-up");

  let labelCon = document.createElement("div");
  labelCon.classList.add("labelcon");

  let label = document.createElement("p");
  label.classList.add("settinglabel");
  label.textContent = "App options";

  labelCon.append(label);

  let btnCon = document.createElement("div");
  btnCon.className = "btncon";

  let settingBtn = document.createElement("button");
  settingBtn.className = "setting-btn";

  let settingImg = document.createElement("ing");
  settingImg.src = "assets/trash-2.png";
  settingImg.className = "deleteimg";

  let deleteMsg = document.createElement("p");
  deleteMsg.className = "deletemsg";
  deleteMsg.textContent = "Clear all tasks";

  settingBtn.append(settingImg, deleteMsg);

  btnCon.append(settingBtn);

  let close = document.createElement("button");
  close.className = "close";

  let closeImg = document.createElement("img");
  closeImg.src = "assets/x.png";

  close.append(closeImg);

  settingPopUp.append(labelCon, btnCon, close);

  appCon.append(settingPopUp);

  let hideAppSetting = () => {
    settingPopUp.remove();
    labelCon.remove();
    label.remove();
    btnCon.remove();
    settingBtn.remove();
    settingImg.remove();
    deleteMsg.remove();
    close.remove();
    closeImg.remove();
  };

  // event funtion for close
  let closeEvent = () => {
    inSettings = false;

    App.classList.remove("appOnSetting");

    hideAppSetting();
  };

  // event function for esc close
  let closeEventEsc = (e) => {
    if (e.key == "Escape" && inFirstSetting == true) {
      closeEvent();

      document.removeEventListener("keydown", closeEventEsc);
    }
  };

  // close event assigning
  close.addEventListener("click", closeEvent);

  // esc event
  document.addEventListener("keydown", closeEventEsc);

  // event for delete button of menu
  btnCon.addEventListener("click", () => {
    hideAppSetting();

    finalDeleteFun();
  });
};

// event for setting icon / settings menu
settingIcon.addEventListener("click", () => {
  App.classList.add("appOnSetting");

  settingFun();
});

// the function for displaying summery
let summary = () => {
  let length = localStorage.length;

  total = 0;
  pending = 0;

  for (let i = 1; i <= key; i++) {
    let state = localStorage.getItem(`${i} status`);

    if (state == "completed") {
      total++;
    } else if (state == "pending") {
      pending++;
    }
  }

  totalCon.textContent = total + pending;
  pendingCon.textContent = pending;
};

function show(funkey, task) {
  dvKey = funkey;

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
  para.textContent = task;

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
  dv.id = dvKey;
  // dv.innerHTML = taskDetails;

  let statusKey = localStorage.getItem(`${dvKey} status`);

  if (statusKey == null) {
    localStorage.setItem(`${dv.id} status`, "pending");
  }

  let state = localStorage.getItem(`${dv.id} status`);
  if (state == "completed") {
    dv.classList.add("completed-dv");

    statusImg.src = "assets/check.png";
    statusImg.classList.remove("pending");
    statusImg.classList.add("completed");

    edt.src = "assets/black-check.png";
    edt.className = "pencil-img";
    edt.classList.remove("pencil-img");
    edt.classList.add("completed-edit");

    checkInput.checked = true;
  }

  dv.append(checkTask, edtDlt);

  tasksCon.append(dv);

  // delete event function
  let deleteEvent = () => {
    // id of dv to remove the task from the localstorage
    let removeId = dv.getAttribute("id");
    console.log(removeId);

    dv.remove();
    localStorage.removeItem(`${removeId} status`);

    localStorage.removeItem(removeId);
    summary();
  };

  // asigning event to delete img click
  dlt.addEventListener("click", deleteEvent);

  // checkbox event function
  let checkEvent = (e) => {
    if (checkInput.checked) {
      dv.classList.add("completed-dv");

      statusImg.src = "assets/check.png";
      statusImg.classList.remove("pending");
      statusImg.classList.add("completed");

      edt.src = "assets/black-check.png";
      edt.className = "pencil-img";
      edt.classList.remove("pencil-img");
      edt.classList.add("completed-edit");

      localStorage.setItem(`${dv.id} status`, "completed");
      summary();
    } else {
      dv.classList.remove("completed-dv");

      statusImg.src = "assets/equal.png";
      statusImg.classList.remove("completed");
      statusImg.classList.add("status-img", "pending");

      edt.src = "assets/pencil.png";
      edt.className = "pencil-img";

      localStorage.setItem(`${dv.id} status`, "pending");
      summary();
    }
  };

  // asigning event to checkbox click
  checkInput.addEventListener("change", checkEvent);

  // edit event function
  let editEvent = () => {
    if (edt.classList.contains("pencil-img")) {
      inEdit = true;

      edt.removeEventListener("click", editEvent);
      dlt.removeEventListener("click", deleteEvent);

      allFilterBtn.classList.add("in-edit");
      pendingFilterBtn.classList.add("in-edit");
      completedFilterBtn.classList.add("in-edit");
      settingIcon.classList.add("in-edit");
      taskInput.classList.add("in-edit");
      addBtn.classList.add("in-edit");
      clearBtn.classList.add("in-edit");

      tasksCon.classList.add("editing");
      dv.classList.add("editing-active");
      dlt.classList.add("delete-img-edit");

      statusImg.classList.add("pending-edt");
      para.classList.add("task-show-edt");

      checkInput.disabled = true;

      let editBox = document.createElement("div");
      editBox.classList.add("editBox");

      let editInput = document.createElement("input");
      editInput.classList.add("editinput");
      editInput.value = localStorage.getItem(dv.id);

      let cancelSaveCon = document.createElement("div");
      cancelSaveCon.classList.add("cancel-save-con");

      let cancelBtn = document.createElement("button");
      cancelBtn.classList.add("cancel");
      cancelBtn.textContent = "Cancel";

      let saveBtn = document.createElement("button");
      saveBtn.classList.add("save");
      saveBtn.textContent = "Save";

      cancelSaveCon.append(cancelBtn, saveBtn);

      editBox.append(editInput, cancelSaveCon);

      checkTask.append(editBox);

      editInput.focus();

      let cancelEvent = () => {
        inEdit = false;

        edt.addEventListener("click", editEvent);
        dlt.addEventListener("click", deleteEvent);

        allFilterBtn.classList.remove("in-edit");
        pendingFilterBtn.classList.remove("in-edit");
        completedFilterBtn.classList.remove("in-edit");
        settingIcon.classList.remove("in-edit");
        taskInput.classList.remove("in-edit");
        addBtn.classList.remove("in-edit");
        clearBtn.classList.remove("in-edit");

        tasksCon.classList.remove("editing");
        dv.classList.remove("editing-active");
        dlt.classList.remove("delete-img-edit");

        statusImg.classList.remove("pending-edt");
        para.classList.remove("task-show-edt");

        checkInput.disabled = false;

        editBox.remove();
        editInput.remove();
        cancelSaveCon.remove();
        cancelBtn.remove();
        saveBtn.remove();

        taskInput.focus();
      };

      // function for esc cancel
      let cancelEventEsc = (e) => {
        if (e.key == "Escape" && inEdit == true) {
          cancelEvent();
          document.removeEventListener("keydown", cancelEventEsc);
          document.removeEventListener("keyup", saveEventEsc);
        }
      };

      let saveEvent = () => {
        inEdit = false;

        edt.addEventListener("click", editEvent);
        dlt.addEventListener("click", deleteEvent);

        allFilterBtn.classList.remove("in-edit");
        pendingFilterBtn.classList.remove("in-edit");
        completedFilterBtn.classList.remove("in-edit");
        settingIcon.classList.remove("in-edit");
        taskInput.classList.remove("in-edit");
        addBtn.classList.remove("in-edit");
        clearBtn.classList.remove("in-edit");

        let newValue = editInput.value;

        localStorage.setItem(dv.id, newValue);
        para.textContent = localStorage.getItem(dv.id);

        tasksCon.classList.remove("editing");
        dv.classList.remove("editing-active");
        dlt.classList.remove("delete-img-edit");

        statusImg.classList.remove("pending-edt");
        para.classList.remove("task-show-edt");

        checkInput.disabled = false;

        editBox.remove();
        editInput.remove();
        cancelSaveCon.remove();
        cancelBtn.remove();
        saveBtn.remove();

        taskInput.focus();
      };

      // function for esc save
      let saveEventEsc = (e) => {
        if (e.key == "Enter" && inEdit == true) {
          saveEvent();

          document.removeEventListener("keydown", cancelEventEsc);
          document.removeEventListener("keyup", saveEventEsc);
        }
      };

      // assigning esc function to canccl event
      document.addEventListener("keydown", cancelEventEsc);

      // assigning function to canccl event
      cancelBtn.addEventListener("click", cancelEvent);

      // assigning esc function to save event
      document.addEventListener("keyup", saveEventEsc);

      // assigning function to save event
      saveBtn.addEventListener("click", saveEvent);
    }
  };

  // asigning event to edit img click
  edt.addEventListener("click", editEvent);

  summary();
}

// to fetch the data from localstorage
let length = localStorage.length;

for (let i = 1; i < key; i++) {
  let value = localStorage.getItem(i);
  let key = i;

  if (value != null) {
    show(key, value);
  }
}

// event for "all" filter button
allFilterBtn.addEventListener("click", () => {
  tasksCon.innerHTML = "";

  for (let i = 1; i <= key; i++) {
    let value = localStorage.getItem(i);

    if (value != null) {
      show(i, value);
    }
  }
});

// event for "pending" filter button
pendingFilterBtn.addEventListener("click", () => {
  tasksCon.innerHTML = "";

  for (let i = 1; i <= key; i++) {
    let value = localStorage.getItem(i);
    let status = localStorage.getItem(`${i} status`);

    if (status == "pending") {
      show(i, value);
    }
  }
});

// event for "completed" filter button
completedFilterBtn.addEventListener("click", () => {
  tasksCon.innerHTML = "";

  for (let i = 1; i <= key; i++) {
    let value = localStorage.getItem(i);
    let status = localStorage.getItem(`${i} status`);

    if (status == "completed") {
      show(i, value);
    }
  }
});

taskInput.focus();

// funtion to add task
let addTask = () => {
  let task = taskInput.value;
  taskInput.value = "";

  if (task != "") {
    show(key, task); // displaying the task on task container after add button

    localStorage.setItem(key, task);

    key++;
    localStorage.setItem("key", key);

    taskInput.focus();
  }
};

// event to be fired upon clicking the add task button
addBtn.addEventListener("click", () => {
  addTask();
});

document.addEventListener("keydown", (e) => {
  // console.log(e.key)
  if (e.key == "Enter") {
    if (inEdit == false && inSettings == false) {
      addTask();
    }
  }
});

// event to be fired upon clicking the add clear button
clearBtn.addEventListener("click", () => {
  for (let i = 1; i <= key; i++) {
    let checkstatus = localStorage.getItem(`${i} status`);
    if (checkstatus == "completed") {
      let value = localStorage.getItem(i);

      localStorage.removeItem(i);
      localStorage.removeItem(`${i} status`);
    }
  }

  let completedDiv = document.querySelectorAll(".completed-dv");
  completedDiv.forEach((div) => {
    div.remove();
  });

  summary();
});
