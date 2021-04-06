const scrollToBottom = () => {
  var d = document.getElementById('messages');
  d.scrollIntoView(false);
};

const muteUnmute = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
  } else {
    myVideoStream.getAudioTracks()[0].enabled = true;
  }
  let btn = document.getElementById('muteUnmute');
  btn.classList.toggle('mic-off');
};

const playStop = () => {
  let enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
  } else {
    myVideoStream.getVideoTracks()[0].enabled = true;
  }
  let btn = document.getElementById('playStop');
  btn.classList.toggle('video-off');
};

window.onclick = function (e) {
  let model = document.querySelector('.display_flex');
  let participants = document.getElementById('participants');
  try {
    removeOnClickOutside(e, participants, 'width_increase');
    removeOnClickOutside(e, model, 'display_flex');
  } catch {}
};

const removeOnClickOutside = (event, element, removeThis) => {
  if (!element.contains(event.target)) {
    if (event.target != element.previousElementSibling) {
      element.classList.remove(removeThis);
    }
  }
};

const removeAllModel = (ele) => {
  let model = document.querySelectorAll('.display_flex');
  model.forEach((e) => {
    if (e == ele) return;
    e.classList.remove('display_flex');
  });
};

const muteEveryone = () => {
  socket.emit('mute-everyone');
};

const toggleChat = () => {
  let ele = document.getElementById('chat_section');
  removeAllModel(ele);
  ele.classList.toggle('display_flex');
};

const toggleOptions = () => {
  let ele = document.getElementById('options_section');
  removeAllModel(ele);
  document.getElementById('options_section').classList.toggle('display_flex');
};

function toggleParticipants() {
  document.getElementById('participants').classList.toggle('width_increase');
}


// Get the modal
var modal = document.getElementById("myModal");
let u_name = document.getElementById('u_name');
// if(u_name.value == '' || u_name.value == null) {
//   modal.style.display = "block";
// }

const guestName = () => {
  if(document.getElementById('guestName').value == "" || document.getElementById('guestName').value == null){
    return false;
  }
  let name = document.getElementById('guestName').value;
  document.getElementById('u_name').value = name;
  addNewUserName(name);
  modal.style.display = "none";
}


const addNewUserName = (name) => {
  if(name==null || name == '') name = "Guest";
  let participants = document.getElementById('p_list');
  participants.innerHTML += `<div class="participant"><img class="participant__img" src="/icons/user.svg" alt="" /><span class="participant__name">${name}</span></div>`
}