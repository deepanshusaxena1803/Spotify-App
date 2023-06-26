let songIndex = 0;
let audioElement = new Audio("songs/1.mpeg");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName");

let songs = [
    {songName: "Calm Down", filePath: "songs/1.mpeg", coverPath: "covers/Calm Down.jpeg", masterSongFullName: "Calm Down - Rema"},
    {songName: "People", filePath: "songs/2.mpeg", coverPath: "covers/People.jpeg", masterSongFullName: "People - Libianca Fonji" },
    {songName: "Tere Hawaale", filePath: "songs/3.mpeg", coverPath: "covers/Tere Hawaale.jpeg", masterSongFullName:  "Tere Hawaale - Arjit Singh"},
    {songName: "Maahi Ve", filePath: "songs/4.mpeg", coverPath: "covers/Maahi Ve.jpeg", masterSongFullName: "Maahi Ve - A. R. Rahman"},
    {songName: "Unstoppable", filePath: "songs/5.mpeg", coverPath: "covers/Unstoppable.jpeg", masterSongFullName:  "Unstoppable - Sia"},
    {songName: "Dusk Till Dawn", filePath: "songs/6.mpeg", coverPath: "covers/Dusk Till Dawn.jpeg", masterSongFullName:  "Dusk Till Dawn - Zayn Malik"},
    {songName: "Lonely", filePath: "songs/7.mpeg", coverPath: "covers/Lonely.jpeg", masterSongFullName: "Lonely - Justin Bieber" },
    {songName: "Until I Found You", filePath: "songs/8.mpeg", coverPath: "covers/Until I Found You.jpeg", masterSongFullName:  "Until I Found You - Stephan Sanchez"}
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
})


masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime==0){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
    }
})

audioElement.addEventListener("timeupdate", ()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})

let songItemPlay = Array.from(document.getElementsByClassName("songItemPlay"));

let makeAllPlays = ()=>{
    songItemPlay.forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}

songItemPlay.forEach((element)=>{
    element.addEventListener("click",(e)=>{
    makeAllPlays();
    e.target.classList.remove("fa-circle-play");
    e.target.classList.add("fa-circle-pause");

    let songIndex = parseInt(e.target.id);
    masterSongName.innerHTML = songs[songIndex-1].masterSongFullName;
    audioElement.src = `songs/${songIndex}.mpeg`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    })
})

document.getElementById("next").addEventListener("click",()=>{
    if(songIndex>7){
        songIndex=1;
    }
    else{
        songIndex+=1;
        masterSongName.innerHTML = songs[songIndex-1].masterSongFullName;
        audioElement.src = `songs/${songIndex}.mpeg`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");

        makeAllPlays();
        document.getElementById(`${songIndex}`).classList.remove("fa-circle-play");
        document.getElementById(`${songIndex}`).classList.add("fa-circle-pause");
    }
})

document.getElementById("previous").addEventListener("click",()=>{
    if(songIndex<=1){
        songIndex=1;
    }
    else{
        songIndex-=1;
        masterSongName.innerHTML = songs[songIndex-1].masterSongFullName;
        audioElement.src = `songs/${songIndex}.mpeg`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");

        makeAllPlays();
        document.getElementById(`${songIndex}`).classList.remove("fa-circle-play");
        document.getElementById(`${songIndex}`).classList.add("fa-circle-pause");
    }
})