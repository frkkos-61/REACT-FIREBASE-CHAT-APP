import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";

const RoomPage = ({ setRoom }) => {
  //*Form Gönderilince
  const handleSubmit = (e) => {
    e.preventDefault();

    //* inputtaki girdiyi al
    const room = e.target[0].value.toLowerCase();

    //*Seçili oda state'ini güncelle
    setRoom(room);
  };
  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Odası</h1>
      <p>Hangi Odaya Gireceksiniz ?</p>

      <input type="text" placeholder="Ör: HaftaSonu " required />
      <button>Odaya Gir</button>

      <button onClick={() => signOut(auth)}>Çıkış Yap</button>
    </form>
  );
};

export default RoomPage;
