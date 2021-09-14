const randomRoomID = () => {
    let x = document.getElementById('newRoomID');
    x.value = Math.random().toString(36).substring(7);
}