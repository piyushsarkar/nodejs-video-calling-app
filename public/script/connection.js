const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myVideoGrid = document.getElementById('my-video-grid');
const myVideo = document.createElement('video');
const all_messages = document.getElementById('messages');
myVideo.muted = true;
const peers = {};

/* connecting to peer-server */
const peer = new Peer(undefined, {
  host: 'peerserver1010.herokuapp.com',
  secure: true,
  // debug: 3
});

let myVideoStream;

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addMyVideoStream(myVideo, stream);

    // 3. Waiting and Manage call stream
    peer.on('call', (call) => {
      call.answer(stream);
      const video = document.createElement('video');
      call.on('stream', (userVideoStream) => {
        removeVideo(call.peer);
        addVideoStream(video, userVideoStream, call.peer);
      });
    });

    socket.on('user-connected', (userId, userName) => {
      addNewUserName(userName);
      connectToNewUser(userId, stream);
    });

    /* code for send chat action */
    document.getElementById('send_message').addEventListener('click', () => {
      let chatText = document.getElementById('chat_message');
      if (chatText.value.length != 0) {
        socket.emit('message', chatText.value);
        chatText.value = '';
      }
    });
    document.addEventListener('keydown', (e) => {
      let chatText = document.getElementById('chat_message');
      if (e.which === 13 && chatText.value.length != 0) {
        socket.emit('message', chatText.value);
        chatText.value = '';
      }
    });

    socket.on('createMessage', (message, userName) => {
      all_messages.innerHTML += `<li class="message"><b>${userName}</b><br/>${message}</li>`;
      scrollToBottom();
    });
  });

socket.on('user-disconnected', (userId) => {
  if (peers[userId]) peers[userId].close();
  removeVideo(userId);
});

socket.on('mute-all', () => {
  myVideoStream.getAudioTracks()[0].enabled = false;
  document.getElementById('muteUnmute').classList.add('mic-off');
});

peer.on('open', (id) => {
  socket.emit('join-room', ROOM_ID, id, u_name.value);
});

// 4. Making Call
function connectToNewUser(userId, stream) {
  const call = peer.call(userId, stream);
  const video = document.createElement('video');
  call.on('stream', (userVideoStream) => {
    console.log(call.peer, userId);
    removeVideo(call.peer);
    addVideoStream(video, userVideoStream, userId);
  });
  call.on('close', () => {
    video.remove();
    console.log('removed');
    debouncedRecalculateLayout();
  });
  peers[userId] = call;
}

function addVideoStream(video, stream, userId) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  const div = document.createElement('div');
  div.setAttribute('class', 'video-container');
  div.setAttribute('id', 'video-' + userId);
  div.append(video);
  videoGrid.append(div);
  debouncedRecalculateLayout();
}

function addMyVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  myVideoGrid.append(video);
}


const removeVideo = (userId) => {
  try {
    document.getElementById('video-' + userId).remove();
  } catch {}
};

const shareScreen = () => {
  navigator.mediaDevices.getDisplayMedia({audio: true, video: true})
    .then((stream) => {
        // let myScreenStream = stream;
        const video = document.createElement('video');
        addVideoStream(video, stream, "1212");
        // peer.on('call', (call) => {
        //     call.answer(stream);
        //     const video = document.createElement('video');
        //     call.on('stream', (userVideoStream) => {
        //     addVideoStream(video, userVideoStream, call.peer);
        //     });
        // });
    })
}